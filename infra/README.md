# Infrastructure — Space Postman

AWS SAM/CloudFormation infrastructure for the backend.

## Resources

| Resource | Type | Purpose |
|---|---|---|
| `LettersBucket` | S3 Bucket | Stores letter JSON objects |
| `SpacePostmanFunction` | Lambda Function | Handles API requests |
| `SpacePostmanApi` | API Gateway (REST) | HTTP endpoint for frontend |
| `SpacePostmanFunctionLogGroup` | CloudWatch Log Group | Lambda execution logs |

## Free Tier Guardrails

### Lambda
- **Memory:** 128 MB (minimum)
- **Timeout:** 5 seconds
- **Runtime:** Node.js 18
- **Free tier:** 1M requests + 400K GB-sec/month

### S3
- **Lifecycle:** Auto-delete `letters/*` after 30 days
- **Encryption:** AES-256 server-side
- **Access:** Private (no public access)
- **Free tier:** 5 GB storage, 20K GET, 2K PUT/month

### API Gateway
- **Throttling:** 50 req/s steady, 100 burst
- **Stage:** `prod`
- **Free tier:** 1M calls/month (first 12 months)

### CloudWatch
- **Log retention:** 7 days
- **Free tier:** 5 GB logs

### Budget Alert
- **Threshold:** $0.01/month
- **Notifications:** Email at 80% and 100% of threshold
- **Config:** `budget-alert.json`

## Deployment

### First Time Setup

```bash
# Install AWS SAM CLI
# https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

# Configure AWS credentials
aws configure

# Deploy (guided mode — creates samconfig.toml)
cd infra
sam build
sam deploy --guided
```

### Subsequent Deploys

```bash
cd infra
sam build
sam deploy
```

### Apply S3 Lifecycle (if not using SAM)

```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket space-postman-letters \
  --lifecycle-configuration file://s3-lifecycle.json
```

### Create Budget Alert

```bash
# First: Replace REPLACE_WITH_YOUR_EMAIL in budget-alert.json
aws budgets create-budget \
  --account-id YOUR_ACCOUNT_ID \
  --budget file://budget-alert.json
```

## Design Decisions

| Decision | Rationale |
|---|---|
| SAM over CDK | Simpler for a small project, YAML template is self-documenting |
| 128MB Lambda | Minimum memory; sufficient for JSON parsing + S3 I/O |
| 5s timeout | Letters are small; S3 operations complete in < 1s |
| 7-day log retention | Minimizes CloudWatch storage; sufficient for debugging |
| REST API over HTTP API | Better SAM integration, more throttling controls |
| AES-256 over KMS | Free (KMS adds cost per key usage) |
| 30-day lifecycle | Balances usability with free tier storage (5 GB limit) |
