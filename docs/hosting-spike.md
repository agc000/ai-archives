# Hosting Spike

## Summary

AI Archives is currently a full-stack Next.js application, not an S3-only static application.

The repo includes:

- Next.js App Router pages
- Next.js API routes
- PostgreSQL database access
- AWS S3 object storage access
- Server-side rendering and data fetching
- A Chrome extension that submits conversation HTML to the backend

Because of that, the full application needs a platform that can run server-side JavaScript and connect to backend services.

## Is S3 Alone Enough?

S3 alone can host static frontend files such as HTML, CSS, JavaScript, images, and demo pages.

S3 alone cannot run:

- Next.js API routes
- PostgreSQL connections
- Server-rendered pages
- Backend logic for uploads, parsing, or persistence
- Runtime secrets and environment-variable backed server code

For this project, S3 by itself is useful for static demos and object storage, but not for hosting the full-stack MVP.

## Recommended Full-Stack Hosting

For the MVP full-stack application, the simplest hosting options are:

- Vercel: easiest path for a Next.js application, with straightforward environment variable setup and managed deployments.
- AWS Amplify: good option when the team wants a managed AWS-aligned deployment path for a Next.js app.

## AWS-Aligned Hosting Option

If the team wants to stay fully AWS-aligned, a reasonable architecture is:

- AWS Amplify, EC2, App Runner, or ECS for the Next.js application
- Amazon RDS for PostgreSQL database hosting
- Amazon S3 for raw archived conversation files, uploaded exports, backups, and static demos
- CloudFront for HTTPS, caching, and custom domains when needed

## S3's Role In AI Archives

S3 should be used as object storage, not as the only application host.

Good uses for S3 in this project:

- Raw conversation exports
- Uploaded HTML or JSON files
- Backup files
- Static demo pages
- Public static assets

The full application still needs a compute/runtime layer for API routes, server rendering, database access, and backend logic.
