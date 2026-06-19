# Nginx Reverse Proxy

Nginx should listen for public HTTP traffic on port 80 and proxy requests to the Next.js app running locally on port 3000.

Traffic flow:

```text
public internet -> EC2 port 80 -> Nginx -> http://127.0.0.1:3000 -> Next.js app
```

## Basic Server Block

Example Nginx config:

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_PUBLIC_IP;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Replace `YOUR_DOMAIN_OR_PUBLIC_IP` with the real domain name or the EC2 public IP address.

## Verification

After Nginx is configured and reloaded, verify that public HTTP traffic reaches the app:

```bash
curl http://YOUR_DOMAIN_OR_PUBLIC_IP/api/health
```

You can also test directly on the EC2 instance:

```bash
curl http://localhost:3000/api/health
```

## HTTPS Requirements

HTTPS setup requires:

- A real domain name pointed to the EC2 public IP address
- Port 443 open in the EC2 security group
- Port 80 open for initial HTTP validation
- Certbot or another SSL certificate setup

Without a domain name pointed at the EC2 instance, normal Let's Encrypt HTTPS setup cannot be completed cleanly.
