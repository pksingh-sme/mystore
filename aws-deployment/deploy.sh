#!/bin/bash

# AWS Deployment Script for E-commerce Application

set -e  # Exit on any error

# Variables
AWS_REGION="us-east-1"
TF_STATE_BUCKET="ecommerce-terraform-state"
TF_STATE_KEY="terraform.tfstate"
ECR_REPOSITORY_BACKEND="ecommerce-backend"
ECR_REPOSITORY_FRONTEND="ecommerce-frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

# Function to print warning messages
print_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to print error messages
print_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
  print_status "Checking prerequisites..."
  
  if ! command_exists aws; then
    print_error "AWS CLI is not installed. Please install it first."
    exit 1
  fi
  
  if ! command_exists terraform; then
    print_error "Terraform is not installed. Please install it first."
    exit 1
  fi
  
  if ! command_exists docker; then
    print_error "Docker is not installed. Please install it first."
    exit 1
  fi
  
  # Check AWS credentials
  if ! aws sts get-caller-identity >/dev/null 2>&1; then
    print_error "AWS credentials not configured. Please configure them first."
    exit 1
  fi
  
  print_status "All prerequisites met."
}

# Initialize Terraform
init_terraform() {
  print_status "Initializing Terraform..."
  
  # Create S3 bucket for Terraform state if it doesn't exist
  if ! aws s3api head-bucket --bucket $TF_STATE_BUCKET --region $AWS_REGION 2>/dev/null; then
    print_status "Creating S3 bucket for Terraform state..."
    aws s3api create-bucket --bucket $TF_STATE_BUCKET --region $AWS_REGION \
      --create-bucket-configuration LocationConstraint=$AWS_REGION
  fi
  
  # Initialize Terraform with remote backend
  cat > backend.tf << EOF
terraform {
  backend "s3" {
    bucket = "$TF_STATE_BUCKET"
    key    = "$TF_STATE_KEY"
    region = "$AWS_REGION"
  }
}
EOF
  
  terraform init
  print_status "Terraform initialized successfully."
}

# Build and push Docker images
build_and_push_images() {
  print_status "Building and pushing Docker images..."
  
  # Get ECR login
  aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
  
  # Build backend image
  print_status "Building backend image..."
  cd ../backend
  docker build -t $ECR_REPOSITORY_BACKEND .
  
  # Tag and push backend image
  docker tag $ECR_REPOSITORY_BACKEND:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_BACKEND:latest
  docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_BACKEND:latest
  
  # Build frontend image
  print_status "Building frontend image..."
  cd ../frontend
  docker build -t $ECR_REPOSITORY_FRONTEND .
  
  # Tag and push frontend image
  docker tag $ECR_REPOSITORY_FRONTEND:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_FRONTEND:latest
  docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_FRONTEND:latest
  
  cd ../aws-deployment
  print_status "Docker images built and pushed successfully."
}

# Deploy infrastructure with Terraform
deploy_infrastructure() {
  print_status "Deploying infrastructure with Terraform..."
  
  # Plan and apply Terraform configuration
  terraform plan -out=tfplan
  terraform apply tfplan
  
  print_status "Infrastructure deployed successfully."
}

# Deploy application to ECS
deploy_to_ecs() {
  print_status "Deploying application to ECS..."
  
  # Force new deployment of ECS service
  aws ecs update-service --cluster ecommerce-cluster --service ecommerce-backend-service --force-new-deployment
  
  print_status "Application deployed to ECS successfully."
}

# Deploy frontend to S3
deploy_frontend_to_s3() {
  print_status "Deploying frontend to S3..."
  
  # Build frontend
  cd ../frontend
  npm run build
  
  # Sync build files to S3
  aws s3 sync dist/ s3://$FRONTEND_BUCKET_NAME --delete
  
  # Invalidate CloudFront cache
  CLOUDFRONT_DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)
  aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
  
  cd ../aws-deployment
  print_status "Frontend deployed to S3 successfully."
}

# Store secrets in Secrets Manager
store_secrets() {
  print_status "Storing secrets in Secrets Manager..."
  
  # Store database password
  aws secretsmanager put-secret-value \
    --secret-id ecommerce/db_password \
    --secret-string "$DB_PASSWORD"
  
  # Store JWT secret
  aws secretsmanager put-secret-value \
    --secret-id ecommerce/jwt_secret \
    --secret-string "$JWT_SECRET"
  
  # Store Google OAuth credentials
  aws secretsmanager put-secret-value \
    --secret-id ecommerce/google_client_id \
    --secret-string "$GOOGLE_CLIENT_ID"
  
  aws secretsmanager put-secret-value \
    --secret-id ecommerce/google_client_secret \
    --secret-string "$GOOGLE_CLIENT_SECRET"
  
  print_status "Secrets stored successfully."
}

# Main deployment function
main() {
  print_status "Starting AWS deployment process..."
  
  check_prerequisites
  init_terraform
  build_and_push_images
  deploy_infrastructure
  store_secrets
  deploy_to_ecs
  deploy_frontend_to_s3
  
  print_status "AWS deployment completed successfully!"
  
  # Output important information
  echo ""
  print_status "Application URLs:"
  echo "  API: http://$(terraform output -raw alb_dns_name)/api"
  echo "  Frontend: http://$(terraform output -raw cloudfront_distribution_domain_name)"
  echo ""
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi