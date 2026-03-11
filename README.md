# billtest-platform

## Local setup
1. `cp .env.example .env`
2. `docker compose up -d --build`
3. Run prisma migrations in API container: `docker compose exec api npx prisma migrate deploy`

## Production deploy (Ubuntu/VDS)
1. Install Docker + Compose plugin.
2. Configure DNS and TLS termination (Nginx + certbot or Cloudflare).
3. Fill `.env` with production secrets.
4. Build and run: `docker compose -f docker-compose.yml up -d --build`.
5. Enable backups for postgres volume and offsite artifact storage.

## Environment variables
See `.env.example`.

## Security checklist
- Rotate JWT, API, and OAuth secrets.
- Restrict Pterodactyl API key by IP where possible.
- Enable WAF/rate limiting at Nginx and application layers.
- Enable audit log retention and alerting.
- Use object storage antivirus scan for attachments.
- Enforce 2FA for admin accounts.

## Remaining production integrations
- Real payment provider adapters/webhooks/signature verification.
- Telegram login callback and widget validation.
- Discord OAuth callback + refresh token storage.
- SMTP templates and notification fanout pipeline.
- Full CMS and admin UI forms/tables.
