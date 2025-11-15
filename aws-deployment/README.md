# AWS Deployment for E-commerce Application

This directory contains all the necessary configurations and scripts to deploy the e-commerce application to AWS.

## Architecture Overview

The application is deployed using the following AWS services:

1. **Networking**
   - VPC with public and private subnets
   - Internet Gateway for public access
   - Security groups for network access control

2. **Compute**
   - ECS Fargate for containerized backend services
   - Application Load Balancer for traffic distribution

3. **Database**
   - RDS PostgreSQL for data storage

4. **Storage & Content Delivery**
   - S3 for frontend static assets
   - CloudFront CDN for global content delivery

5. **Security & Configuration**
   - Secrets Manager for sensitive configuration
   - IAM roles and policies for secure access

6. **DNS (Optional)**
   - Route53 for domain management

## Prerequisites

1. AWS CLI installed and configured with appropriate credentials
2. Terraform installed (v1.0+)
3. Docker installed
4. Node.js and npm installed

## Deployment Steps

### 1. Configure Deployment Settings

Update the `config.tfvars` file with your specific configuration:

```hcl
# AWS region
aws_region = "us-east-1"

# Database configuration
db_instance_class = "db.t3.micro"
db_username       = "ecommerce_user"
db_password       = "your_secure_password_here"

# Frontend S3 bucket name (must be globally unique)
frontend_bucket_name = "ecommerce-frontend-assets-yourname"

# Domain name (optional, leave empty if not using a custom domain)
domain_name = ""
```

### 2. Deploy Infrastructure

```bash
# Navigate to the aws-deployment directory
cd aws-deployment

# Initialize Terraform
terraform init

# Review the planned changes
terraform plan -var-file=config.tfvars

# Apply the infrastructure changes
terraform apply -var-file=config.tfvars
```

### 3. Build and Push Docker Images

```bash
# Build and push the backend image
cd ../backend
docker build -t ecommerce-backend .
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag ecommerce-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/ecommerce-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/ecommerce-backend:latest

# Build and push the frontend image
cd ../frontend
docker build -t ecommerce-frontend .
docker tag ecommerce-frontend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/ecommerce-frontend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/ecommerce-frontend:latest
```

### 4. Store Secrets in Secrets Manager

After deploying the infrastructure, store your sensitive configuration in AWS Secrets Manager:

```bash
# Store database password
aws secretsmanager put-secret-value \
  --secret-id ecommerce/db_password \
  --secret-string "your_actual_db_password"

# Store JWT secret
aws secretsmanager put-secret-value \
  --secret-id ecommerce/jwt_secret \
  --secret-string "your_jwt_secret_key"

# Store Google OAuth credentials
aws secretsmanager put-secret-value \
  --secret-id ecommerce/google_client_id \
  --secret-string "your_google_client_id"

aws secretsmanager put-secret-value \
  --secret-id ecommerce/google_client_secret \
  --secret-string "your_google_client_secret"
```

### 5. Deploy Application to ECS

Update the ECS service to use the new task definition:

```bash
aws ecs update-service \
  --cluster ecommerce-cluster \
  --service ecommerce-backend-service \
  --force-new-deployment
```

### 6. Deploy Frontend to S3

```bash
# Build the frontend
cd ../frontend
npm run build

# Sync files to S3
aws s3 sync dist/ s3://your-frontend-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_CLOUDFRONT_DISTRIBUTION_ID \
  --paths "/*"
```

## Deployment Script

Alternatively, you can use the provided deployment script:

```bash
cd aws-deployment
./deploy.sh
```

Before running the script, make sure to update the variables at the top of the script with your specific values.

## CI/CD Pipeline

For automated deployments, you can set up a GitHub Actions workflow that:

1. Builds Docker images on code changes
2. Runs tests
3. Pushes images to ECR
4. Updates ECS services
5. Deploys frontend to S3
6. Invalidates CloudFront cache

## Cost Considerations

The default configuration uses cost-effective AWS resources:

- t3.micro RDS instance (eligible for free tier)
- Fargate spot instances for ECS tasks
- S3 Standard storage class
- CloudFront with pay-as-you-go pricing

## Security Considerations

- All sensitive data is stored in AWS Secrets Manager
- Database is in private subnets with no public access
- ECS tasks run in private subnets
- Security groups restrict access to only necessary ports
- HTTPS is enforced through ALB and CloudFront

## Monitoring and Logging

- CloudWatch logs for ECS tasks
- ALB access logs
- RDS performance insights
- CloudFront access logs

## Cleanup

To remove all AWS resources:

```bash
cd aws-deployment
terraform destroy -var-file=config.tfvars
```

Note: This will permanently delete all data. Make sure to backup any important data before proceeding.