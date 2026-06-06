# S3 Static Hosting

This repo includes a small static demo page in:

```bash
static-site/
```

The demo is separate from the main Next.js full-stack application. It can be uploaded to S3 because it is plain static HTML and CSS with no external dependencies.

## Upload To S3

From the repo root, upload the static demo folder with:

```bash
aws s3 sync static-site/ s3://YOUR_BUCKET_NAME --delete
```

Replace `YOUR_BUCKET_NAME` with the team's S3 bucket name.

## S3 Website Settings

When using S3 static website hosting, set the index document to:

```text
index.html
```

Public access and bucket policy settings depend on the team's AWS account setup and security requirements. Some teams allow public S3 website hosting directly, while others keep the bucket private and serve traffic through CloudFront.

## HTTPS And Custom Domains

For production HTTPS, caching, and custom domains, use CloudFront or a managed hosting layer in front of the static files.

S3 is enough for this static demo, but it is not enough to host the full AI Archives application because the full app needs a runtime for Next.js API routes, server rendering, database connections, and backend logic.
