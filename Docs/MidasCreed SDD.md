# MidasCreed System Design Document (SDD)
Last Updated: 2026-07-12
Version: v4.1
Brief Project Description: Corporate website and internal engagement dashboard for MidasCreed — an AI consultancy based in Lilongwe, Malawi, that helps businesses adopt AI deliberately through a structured four-track framework (Audit & Awareness → Enablement → Integration → Infrastructure). The platform combines a high-fidelity public-facing marketing website with a private, Credentials-authenticated internal pipeline dashboard used to manage prospect engagement, follow-up sequences, financial tracking, and case study management.
Framework: M.A.S.T.E.R. (Model → Architecture → Scale → Tradeoffs → Execution → Resilience)

**Changelog:**
- **v4.1 (2026-07-12):** Minor Feature — Website Content Update (11.0). Updated Public Website functional requirements to reflect: four-track service model (AI Audit & Awareness / Enablement / Integration / Infrastructure), accurate AI-consultancy positioning, corrected hero copy, removal of Aurum AI nav item, renamed "AI Adoption Framework" section, full About/Why Choose Us rewrites, updated footer tagline and services list, and blog rework toward framework/case-study content. No dashboard, data model, or NFR changes.
- **v4.0 (2026-07-09):** Full SDD rewrite consolidating Dashboard Build Brief, DB Schema, and Public Positioning documents. Added complete M.A.S.T.E.R. coverage for E and R sections. Absorbed all implementation history as of Capsule 10.0.
- **v3.0 (2026-07-09):** Dashboard Expansion (Global Payments View, Reports Library, Proof Points management, and System Settings/Analytics).
- **v2.0 (2026-07-08):** Introduced Internal Engagement Tracker (Prospect and Payment data models) with progressive disclosure UI.
- **v1.0 (Base):** Initial M.A.S.T.E.R. documentation.

---

## M — MODEL THE SYSTEM (Requirements & Constraints)

### 1. Functional Requirements

#### Public Website
- Present MidasCreed's services: AI Agent Implementation, Managed AI Operations, and AI Readiness Assessment.
- Communicate the company's positioning: outcome-first, implementation-first, vendor-neutral AI automation.
- Display immersive 3D background elements and highly polished UI components (timelines, marquees).
- Allow users to submit contact inquiries. The system must:
  - Send a formatted email notification to the MidasCreed team via Resend.
  - Return an auto-reply receipt email to the enquiring user.

#### Internal Dashboard — Core Engagement Tracker
- **Authentication:** Private access via NextAuth Credentials provider. Two hardcoded users (`Michaels`, `Conrad`). No public signup, no password reset. Session carries the logged-in user identity (`assignedTo`) for filtering.
- **Prospect Management:** Create and manage client prospects through a 4-stage progressive disclosure pipeline:
  1. **Stage 1 — Engaging:** Log first contact (channel + date). Automated follow-up scheduling (FU1 at +4 days, FU2 at +7 days, Breakup at +11 days). Track `Replied` transition via "Client Replied" action.
  2. **Stage 2 — Traction:** Record meeting details (date, time, type: In-Person/Video Call/Phone, location/link). Toggle `Meeting Done` to proceed.
  3. **Stage 3 — Resolution:** Select final outcome (`ai_audit` / `agent_work` / `dead_lead`).
  4. **Stage 4 — Payment:** Log payments (amount, currency MWK/USD/GBP/EUR, type one-time/retainer, invoiced/paid booleans).
- **Prospect Metadata:** Tier, sector, country, source, assignedTo, fit score (0–5), signal score (0–5), report URL (PDF/Google Drive link).
- **Stage Edit Mode:** Clicking a historical timeline event (e.g. "· Replied: Yes") navigates via `?edit=<n>` URL parameter to re-open that stage's form pre-filled for correction without data loss.
- **Prospect List:** Table view filterable by tier, status, assigned founder. Columns: Name, Tier, Stage/Status, Contact Date, Follow-up Due, Outcome.

#### Internal Dashboard — Global Cross-Prospect Views
- **Payments tab:** Cross-prospect invoice table. Filterable by paid/unpaid and invoiced/pending. Summary cards for total revenue and outstanding amount by currency. No mixing of currencies into a single number.
- **Reports tab:** Library of engagement report PDFs archived per client. Columns: Client, Document Type, Date Generated, Download Link.
- **Proof Points tab:** Managed repository of case studies (client type, problem solved, result, client name or anonymized). Directly powers AI outreach prompt context.
- **Settings tab:** Configurable follow-up day-offset constants (currently 4/7/11). Team member list. Analytics dashboard: pipeline funnel chart, monthly prospect-vs-conversion bar chart (uses recharts).

### 2. Non-Functional Requirements
- **Availability:** High availability via static edge delivery on Vercel. Target 99.9% uptime.
- **Latency:** Fast initial load using Next.js Server Components and partial static generation. Target <100ms p99 for dashboard data reads.
- **Security:** Dashboard routes protected by NextAuth middleware. Credentials stored in `.env.local`, not hardcoded in source.
- **Observability:** Vercel deployment logs. No custom logging infrastructure required at current team size.
- **Visual Fidelity:** Smooth 60fps 3D rendering for React Three Fiber scenes on modern desktop and mobile.

### 3. Constraints
- **Team:** 2 founders (Michaels, Conrad). Internal-use tool only.
- **Stack:** Fixed to Next.js 15.2.8 (App Router), Neon (Serverless Postgres), Prisma ORM, NextAuth v5 beta.
- **Budget:** Cost-optimized. Serverless-first (Vercel + Neon). No dedicated DB instance required.
- **Timeline:** Dashboard features ship incrementally via MC-DOS capsule workflow. Public website shipped and live.

### 4. Success Metrics
- 60fps 3D rendering for WebGL scenes on modern devices.
- 100% reliability for contact form email delivery via Resend.
- All prospect pipeline stages navigable without manual DB intervention.
- "What's outstanding across everyone" answerable from the Payments tab in <5 seconds.

---

## A — ARCHITECT (High-Level Architecture)

### 1. Frontend (Client-Side Rendering & UI)
- **Framework:** Next.js 15.2.8 (App Router), both Server and Client Components.
- **Styling:** Tailwind CSS, Radix UI (shadcn/ui), Framer Motion.
- **3D Graphics:** React Three Fiber, Three.js, React Drei.
- **Charts:** Recharts (BarChart, AreaChart for the Settings analytics Dashboard).
- **Routing:** `/` → public website; `/dashboard/*` → internal tool (protected by middleware).

### 2. Backend (Server Actions)
- **API / Logic:** Next.js Server Actions (no separate API server). Key action files:
  - `app/actions/contact.ts` — public contact form email via Resend.
  - `app/dashboard/prospects/actions.ts` — all dashboard mutations (create, update, stage transitions, revert, payments).
- **Email:** Resend API — contact form outbound and auto-reply.
- **ORM:** Prisma Client (generated from `prisma/schema.prisma`).
- **Auth:** NextAuth v5 beta, Credentials provider, session propagated to server actions via `auth()`.

### 3. Current Database Schema

#### `Prospect`
| Field | Type | Notes |
|---|---|---|
| `id` | String (cuid) | PK |
| `name` | String | Company or contact name |
| `tier` | String | `malawi_simple` / `african_medium` / `international_high_end` |
| `sector` | String? | Industry sector |
| `country` | String? | Country of operation |
| `source` | String | `cold` / `referral` / `inbound` / `existing_client` |
| `assignedTo` | String | `Michaels` or `Conrad` |
| `status` | String | General status label (legacy — pipeline stage is now inferred from boolean fields) |
| `contactChannel` | String? | `Email` / `LinkedIn` / `WhatsApp DM` |
| `fitScore` | Int? | 0–5 |
| `signalScore` | Int? | 0–5 |
| `firstContactDate` | DateTime? | When first outreach was made |
| `followUp1Date` | DateTime? | Auto-calculated: firstContactDate + 4 days |
| `followUp1Done` | Boolean | |
| `followUp2Date` | DateTime? | Auto-calculated: FU1Done + 7 days |
| `followUp2Done` | Boolean | |
| `breakupDate` | DateTime? | Auto-calculated: FU2Done + 11 days |
| `breakupDone` | Boolean | |
| `replied` | Boolean | Set by "Client Replied" button |
| `meetingDate` | DateTime? | |
| `meetingTime` | DateTime? | |
| `meetingType` | String? | `in_person` / `video_call` / `phone_call` |
| `meetingLocation` | String? | Address or video link |
| `meetingDone` | Boolean | |
| `outcome` | String? | `ai_audit` / `agent_work` / `dead_lead` |
| `reportUrl` | String? | Link to generated PDF report |
| `lastContactAt` | DateTime? | Updated on every interaction |
| `createdAt` | DateTime | |
| `updatedAt` | DateTime | |

#### `Payment`
| Field | Type | Notes |
|---|---|---|
| `id` | String (cuid) | PK |
| `prospectId` | String | FK → Prospect |
| `type` | String | `one_time` / `monthly_retainer` |
| `amount` | Float | |
| `currency` | String | `USD` / `MWK` / `GBP` / `EUR` |
| `invoiced` | Boolean | Has invoice been sent |
| `paid` | Boolean | Has payment been received |
| `date` | DateTime | |

### 4. User Flow Diagram
```
Public User:
  → / (Landing page with 3D visuals)
  → /contact form → Resend email → auto-reply

Founder:
  → /login (Credentials form)
  → /dashboard (Overview: KPIs)
  → /dashboard/prospects (List view)
    → /dashboard/prospects/new (Create prospect)
    → /dashboard/prospects/[id] (Detail / pipeline management)
      → Stage 1 → FU1 → FU2 → Breakup → Client Replied →
      → Stage 2: Meeting →
      → Stage 3: Outcome →
      → Stage 4: Payments
      → ?edit=1/2/3 (edit mode via URL param, non-destructive)
  → /dashboard/payments (Global invoices view)
  → /dashboard/reports (Reports library)
  → /dashboard/proof-points (Case study repository)
  → /dashboard/settings (Offsets, team, analytics)
```

### 5. Key Architectural Decisions
- **Flat Prospect Model over normalized pipeline tables:** Chosen for simplicity at current team scale (2 founders). Avoids join complexity for every page load. Pipeline state is inferred from boolean fields rather than separate stage entity rows.
- **Server Actions over API routes:** Collocated mutation logic reduces boilerplate. Redirect-after-mutation is used to scrub URL state after form submissions.
- **No cron jobs:** Follow-up overdue detection is computed on page load via date arithmetic. No background worker infrastructure needed.
- **Dummy Data for new tabs:** Global views (Payments tab, Reports, Proof Points, Settings) are scaffolded with inline mock arrays pending real DB aggregation queries.

### 6. Anomalies / Technical Debt
- `expo`, `expo-asset`, `expo-file-system`, `expo-gl`, and `react-native` exist in `package.json` from an earlier exploratory phase. These are unused and should be removed once a formal mobile approach is decided.
- TypeScript lint errors (`fitScore`, `payment` prisma client properties, `payments` include relation) persist due to a stale Prisma client that has not been regenerated since the schema migration added engagement fields. Running `npx prisma generate` after a successful DB push resolves these.

---

## S — SCALE THE SYSTEM (Capacity Planning & Traffic Model)

### 1. Traffic Patterns
- **Public Website:** Low-medium traffic. Primary users: potential clients evaluating MidasCreed. Peak expected around LinkedIn/outreach campaigns. No user-generated content.
- **Internal Dashboard:** Extremely low concurrency. 2 users maximum. No scaling pressure.

### 2. Capacity Planning
- **Compute:** Vercel Serverless Functions handle all API/action load. No instance management needed.
- **Database:** Neon Serverless Postgres. Auto-scales. At current data volume (<500 prospects), cold-start latency is the primary concern, not throughput.
- **Storage:** No blob storage currently. `reportUrl` field holds an external link (e.g., Google Drive). If file uploads are ever needed, Cloudflare R2 or UploadThing should be integrated.

### 3. Bottleneck Identification
- **Current bottleneck:** Neon serverless cold-start latency (~300–800ms on first request after idle). Acceptable at current usage levels.
- **Future bottleneck (at scale):** If Proof Points, Reports, and Payment data grow significantly, aggregation queries will need indexes on `prospectId`, `currency`, and `paid` fields.

---

## T — TRADEOFFS (Technology & Architecture Decisions)

| Decision | Choice Made | Rationale |
|---|---|---|
| Frontend framework | Next.js 15.2.8 (App Router) | Matched existing public website stack; SSR + server actions eliminate need for separate API |
| Database | Neon (Serverless Postgres) | Cost-efficient, no standby instances, familiar SQL schema |
| Auth | NextAuth v5 beta, Credentials | Hardcoded 2-user flow, no public signup needed |
| ORM | Prisma | Type-safe queries, migration management |
| Data model style | Flat Prospect model | Avoids join complexity for a 2-person internal tool at current scale |
| Pipeline state | Boolean fields on Prospect | Simple to read and reason about; not normalized for flexibility |
| Charts | Recharts | Already in repo dependencies; sufficient for internal-use analytics |
| File storage for reports | External URL only (string field) | No upload infrastructure needed now; defer to R2/UploadThing if native uploads required |
| Consistency model | Strong (Postgres transactions) | Required for payment status integrity |

---

## E — EXECUTION PLAN (DevOps, Hosting, Domains, CI/CD)

### 1. Hosting
- **Frontend + API:** Vercel (Next.js native). Automatic deploys from `main` branch on GitHub.
- **Database:** Neon Serverless Postgres. Connection string in `.env.local` (`DATABASE_URL`).
- **Email:** Resend API. API key in `.env.local` (`RESEND_API_KEY`).

### 2. Environment Variables Required
```
DATABASE_URL=           # Neon Postgres connection string
NEXTAUTH_SECRET=        # NextAuth signing secret
AUTH_SECRET=            # Auth.js signing secret (v5)
DASHBOARD_USER_1_NAME=  # First founder username
DASHBOARD_USER_1_PASS=  # First founder password
DASHBOARD_USER_2_NAME=  # Second founder username
DASHBOARD_USER_2_PASS=  # Second founder password
RESEND_API_KEY=         # Resend email API key
```

### 3. CI/CD
- **Source control:** GitHub (`6a6aQth/Company-Website`).
- **Deployment:** Vercel GitHub integration. Push to `main` triggers automatic production deploy.
- **Branch strategy:** Feature/fix branches per MC-DOS capsule (`feature/10.0-...`, `fix/F2.0-...`). Merge via GitHub PR into `main`.

### 4. Database Operations
```bash
# Sync schema to DB
npx prisma db push

# Regenerate Prisma client after schema changes
npx prisma generate

# Run local dev server
pnpm dev
```

### 5. Process: MC-DOS Capsule Workflow
All development follows the MC-DOS pipeline:
1. `@intake` — Classify the change and update SDD/workstream.
2. `@tasklist` — Generate subtasks from SDD if fresh.
3. `@setup <id>` — Implement, test, and produce the capsule log.

---

## R — RESILIENCE (Reliability Engineering & Observability)

### 1. Current Reliability Posture
- **Vercel:** Auto-redundancy via edge network. Zero-downtime deploys.
- **Neon:** Managed Postgres with automatic backups. Point-in-time recovery available on paid plans.
- **Error handling in Server Actions:** Actions validate session via `auth()` before any DB mutation. Unauthorized calls throw immediately.

### 2. Known Failure Modes & Mitigations
| Risk | Likelihood | Mitigation |
|---|---|---|
| Neon cold-start timeout | Medium | Acceptable at 2-user scale. Upgrade to a fixed compute plan if latency becomes disruptive |
| Stale Prisma client post-migration | High | Always run `npx prisma generate` after schema changes. Tracked in capsule logs |
| URL state (`?edit=`) persists after form error | Low | Server actions now issue `redirect()` after DB mutations, scrubbing the param |
| Contact form email failure | Low | Resend handles retries. Alert visible in Resend dashboard |

### 3. Observability
- **Vercel Logs:** Full request and function logs available in Vercel dashboard.
- **Resend Dashboard:** Email delivery and failure tracking included.
- **No dedicated monitoring stack** (Prometheus, Datadog, etc.) — appropriate for current scale.

### 4. Disaster Recovery
- **RTO target:** <1 hour (redeploy from GitHub + restore from Neon backup).
- **RPO target:** <24 hours (Neon automated daily backup).
- **Backups:** Neon automatic backups + periodic manual `.xlsx` Excel export available via the export feature.

### 5. Future Resilience Improvements (when scale demands)
- Add Redis caching layer for dashboard aggregate queries (Payments totals, pipeline counts).
- Add application-level error boundary components to gracefully handle DB unavailability in the UI.
- Integrate UploadThing or Cloudflare R2 for native PDF report uploads with signed URL delivery.

---

*This SDD is the single source of truth for the MidasCreed system. Only `@intake` (via MC-DOS) may modify it.*
