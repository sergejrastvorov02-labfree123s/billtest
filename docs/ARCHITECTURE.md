# Part 1. Overview
Production-oriented modular monolith for SaaS/game hosting billing. Current GA scope provisions Minecraft servers in Pterodactyl after payment activation. Core is provider-agnostic: billing/order/invoice/service lifecycle orchestration is isolated from provider adapters.

# Part 2. Tech Stack
- Frontend: Next.js App Router + TypeScript + Tailwind-ready structure.
- Backend: NestJS + Prisma + PostgreSQL + Redis + BullMQ queues.
- Infra: Docker Compose + Nginx reverse proxy.
- Security baseline: JWT access/refresh rotation model, rate-limit-ready module boundaries, audit/provider events, validation pipeline.

# Part 3. Architecture
Layers:
1. Core domains: Auth, Billing, Catalog, Services, Support, CMS, Notifications.
2. Orchestration layer: lifecycle state machine + queue jobs.
3. Provider layer: GameServerProvider (Pterodactyl now), VmProvider (VMmanager future).
4. Delivery layer: REST controllers + admin UI/web.

# Part 4. Database Design
Prisma schema includes: users/sessions/social auth, balances+ledger, plans+prices, services+provider links, jobs/events, orders/invoices/payments, tickets.
Status enums enforce atomic transitions and consistent querying.

Text ERD:
- User 1..n Session
- User 1..n UserSocialAccount
- User 1..1 UserBalance 1..n BalanceLedger
- ProductPlan 1..n PlanPrice
- User 1..n Service n..1 ProductPlan 1..1 ServiceProviderLink
- Service 1..n ProvisioningJob
- User 1..n Order 1..n Invoice 1..n Payment
- User 1..n Ticket 1..n TicketMessage

# Part 5. Pterodactyl Integration Design
- `GameServerProvider` abstraction in service domain.
- `PterodactylApiClient` handles authenticated application/client API calls.
- `PterodactylProviderAdapter` maps billing plan resources to Pterodactyl payloads:
  - nest/egg/startup/env/docker image/location/resources/feature limits.
- Provisioning queue job receives `serviceId`; orchestration performs create/suspend/unsuspend/delete/reinstall/resource-change/sync.
- Provider event table stores payloads for retries/manual intervention.

# Part 6. Future VMmanager Design
- `VmProvider` interface introduced now.
- `VmManagerAdapter` skeleton defines VM lifecycle contract.
- Existing orchestration queue can execute VM actions with same retry/error model.

# Part 7. User Flows
1. Signup/Login (email/password + social links).
2. Currency auto-detection by geo rule then user override.
3. Select Minecraft plan and billing period.
4. Create order+invoice.
5. Payment success triggers service activation.
6. Orchestrator enqueues provisioning, adapter creates server in Pterodactyl.
7. Service shows provider state and external ID in panel.
8. Renewals/autorenew create next invoice and repeat lifecycle.

# Part 8. Roadmap
- Phase 1 (implemented foundation): schema, modules, queue orchestration, Pterodactyl adapter, infra.
- Phase 2: full controllers/use-cases, payment providers, Telegram auth + Discord OAuth, admin RBAC UI.
- Phase 3: VMmanager provider, advanced anti-fraud, observability dashboards.

# Part 9. Code Implementation
See:
- Backend bootstrap and module wiring: `apps/api/src`.
- Provider abstractions/orchestration: `apps/api/src/modules/services/*`.
- Pterodactyl integration: `apps/api/src/modules/providers/pterodactyl/*`.
- Future VM layer: `apps/api/src/modules/providers/vmmanager/*`.
- Database: `apps/api/prisma/schema.prisma`.
- Frontend starting point: `apps/web/app/[locale]/page.tsx`.
- Infra/deploy: `docker-compose.yml`, `Dockerfile.*`, `infra/nginx/nginx.conf`, `.env.example`.
