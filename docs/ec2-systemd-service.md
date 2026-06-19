# EC2 systemd Service

This project is a full-stack Next.js app. A production build must exist before the production server starts.

Run this from the application directory before starting the service:

```bash
npm run build
```

The production server command is:

```bash
npm run start
```

## Service File

Create the service file on the EC2 instance at:

```text
/etc/systemd/system/aiarchives.service
```

Example service using `/home/ubuntu/app` as the deployed app directory:

```ini
[Unit]
Description=AI Archives Next.js App
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/app
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/home/ubuntu/app/.env
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Confirm the EC2 username, app path, `.env` path, and npm path before creating the service. If npm is not located at `/usr/bin/npm`, update `ExecStart`.

Check npm's path with:

```bash
which npm
```

## systemctl Commands

After creating or editing the service file, reload systemd:

```bash
sudo systemctl daemon-reload
```

Enable the service so it starts after a reboot:

```bash
sudo systemctl enable aiarchives
```

Start the service:

```bash
sudo systemctl start aiarchives
```

Check service status:

```bash
sudo systemctl status aiarchives
```

Follow logs:

```bash
journalctl -u aiarchives -f
```

## Verification

After the service starts, verify the local app is responding on port 3000:

```bash
curl http://localhost:3000/api/health
```

Expected response shape:

```json
{
  "status": "ok",
  "service": "ai-archives",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```
