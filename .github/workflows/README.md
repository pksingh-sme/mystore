# GitHub Actions Workflows

This directory contains the CI/CD workflows for the e-commerce application.

## Workflows

### Continuous Integration (ci.yml)

This workflow runs on every push to the `develop` branch and on every pull request to `main` or `develop` branches. It performs the following steps:

1. Checks out the code
2. Sets up Node.js environment
3. Installs dependencies for both frontend and backend
4. Runs linting for both frontend and backend
5. Runs tests for both frontend and backend
6. Builds both frontend and backend applications

### Continuous Deployment (cd.yml)

This workflow runs only on pushes to the `main` branch. It performs the following steps:

1. Checks out the code
2. Sets up Node.js environment
3. Configures AWS credentials
4. Logs in to Amazon ECR
5. Builds, tags, and pushes Docker images for both frontend and backend to ECR
6. Deploys the backend to ECS
7. Builds and deploys the frontend to S3
8. Invalidates the CloudFront cache

## Required Secrets

The following secrets need to be configured in your GitHub repository:

1. `AWS_ACCESS_KEY_ID` - AWS access key ID for deployment
2. `AWS_SECRET_ACCESS_KEY` - AWS secret access key for deployment
3. `FRONTEND_BUCKET_NAME` - Name of the S3 bucket for frontend assets
4. `CLOUDFRONT_DISTRIBUTION_ID` - ID of the CloudFront distribution

## Environment Variables

The workflows use the following environment variables:

- `NODE_VERSION` - Set to '18' for Node.js version
- `AWS_REGION` - Set to 'us-east-1' for AWS region

## Workflow Triggers

- **CI Workflow**: Triggers on pushes to `develop` branch and pull requests to `main` or `develop`
- **CD Workflow**: Triggers only on pushes to `main` branch

## Customization

You can customize the workflows by modifying the following:

1. Branch names in the `on` section
2. Node.js version in the `actions/setup-node` step
3. AWS region in the `aws-actions/configure-aws-credentials` step
4. Docker build arguments
5. Deployment commands

## Troubleshooting

If the workflows fail, check the following:

1. Ensure all required secrets are configured in GitHub
2. Verify AWS credentials have appropriate permissions
3. Check that the ECR repositories exist
4. Verify the ECS cluster and service names are correct
5. Ensure the S3 bucket name is correct and accessible
6. Check that the CloudFront distribution ID is correct