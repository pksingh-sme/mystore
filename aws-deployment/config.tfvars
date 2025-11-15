# AWS Deployment Configuration

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

# Tags for resources
tags = {
  Project     = "Ecommerce"
  Environment = "Production"
  Owner       = "Your Name"
}