output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.ecommerce_vpc.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = [aws_subnet.private_subnet_1.id, aws_subnet.private_subnet_2.id]
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.ecommerce_alb.dns_name
}

output "alb_zone_id" {
  description = "Zone ID of the Application Load Balancer"
  value       = aws_lb.ecommerce_alb.zone_id
}

output "target_group_arn" {
  description = "ARN of the target group"
  value       = aws_lb_target_group.ecommerce_tg.arn
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = aws_ecs_cluster.ecommerce_cluster.name
}

output "backend_ecr_repository_url" {
  description = "URL of the backend ECR repository"
  value       = aws_ecr_repository.backend_ecr.repository_url
}

output "frontend_ecr_repository_url" {
  description = "URL of the frontend ECR repository"
  value       = aws_ecr_repository.frontend_ecr.repository_url
}

output "db_endpoint" {
  description = "Endpoint of the RDS instance"
  value       = aws_db_instance.ecommerce_db.endpoint
}

output "db_username" {
  description = "Username for the RDS instance"
  value       = aws_db_instance.ecommerce_db.username
  sensitive   = true
}

output "db_password" {
  description = "Password for the RDS instance"
  value       = aws_db_instance.ecommerce_db.password
  sensitive   = true
}

output "frontend_bucket_name" {
  description = "Name of the frontend S3 bucket"
  value       = aws_s3_bucket.frontend_bucket.bucket
}

output "frontend_bucket_website_endpoint" {
  description = "Website endpoint of the frontend S3 bucket"
  value       = aws_s3_bucket_website_configuration.frontend_bucket_website.website_endpoint
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend_cdn.id
}

output "cloudfront_distribution_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend_cdn.domain_name
}

output "route53_zone_id" {
  description = "ID of the Route53 zone"
  value       = var.domain_name != "" ? aws_route53_zone.ecommerce_zone[0].id : null
}