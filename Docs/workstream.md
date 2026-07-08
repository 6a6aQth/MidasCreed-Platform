# MidasCreed Workstream
This file combines the planned development roadmap and the reactive work log (fixes & debug sessions). It is managed by `@tasklist` (Planned Roadmap section only) and `@intake` (Reactive Log section only — `@tasklist` never writes here). It does not carry its own version number; git history and the `[x]` markers are sufficient. The SDD (`/Docs/SDD.md`) is versioned and is the contract this roadmap implements.

---
## Planned Roadmap
2026-07-08 — Initial roadmap generated (5 parent tasks, against SDD v1.0)

### 1.0 Website Pivot & Public Copy Updates (generated against SDD v1.0)
- [x] Audit and remove aspirational "Emerging Tech/Web3/AR" content from the current landing page.
- [x] Write and implement real, actionable copy focusing on AI Agent implementation and operations (`app/page.tsx`).
- [x] Add the MidasCreed Enterprise AI Adoption Framework service tier descriptions (Awareness, Enablement, Integration, Infrastructure).
- [x] Enforce the direct, founder-led voice constraint across all visible static text.

### 2.0 Internal Dashboard: Database & Prisma Setup (generated against SDD v1.0)
- [x] Install Prisma and strictly configure connection to Neon (serverless Postgres).
- [x] Define the Prisma Schema to cover Prospect, Interaction, FollowUp, AgentBuild, Deal, and EngagementReport models based on the schema definition. [SUPERSEDED BY 6.0]
- [x] Run initial generation and setup database migrations.

### 3.0 Internal Dashboard: Authentication Implementation (generated against SDD v1.0)
- [x] Install `next-auth` and set up the Credentials provider block.
- [x] Read 'Michaels' and 'Conrad' credentials from `.env.local` strictly, avoiding plain text. 
- [x] Create the `/login` Next.js route with a simple username and password entry form.
- [x] Create middleware to protect all internal dashboard routes and inject the current user identity (`assignedTo`) into the session.

### 4.0 Internal Dashboard: User Interfaces & Layout (generated against SDD v1.0)
- [x] Build the main Dashboard (home) view with headline metrics (Total Engagements, Leads Converted, Payments Done, MWK/USD Revenue breakdown).
- [x] Build the "needs follow-up" widget on the Dashboard (filtering >8 days without interaction) with a "mine only" toggle.
- [x] Implement the Prospect List table view (tier, status, assigned founder filtering).
- [x] Build the Prospect Details / Entry Form containing the specific prompt-aligned taxonomy (Pipeline Status checklist, text fields, Fit/Signal score out of 10). [SUPERSEDED BY 6.0]
- [x] Implement the New Prospect creation view (auto-assigning the Prospect to the active session user).

### 5.0 Internal Dashboard: Backend Logic & Exports (generated against SDD v1.0)
- [x] Implement logic side-effect: dynamically creating an Interaction row when the meeting checkbox is clicked. [SUPERSEDED BY 6.0]
- [x] Implement logic side-effect: dynamically creating a Deal row with an amount and currency (MWK/USD) when the "Client paid" checkbox is toggled. [SUPERSEDED BY 6.0]
- [x] Wire up the Follow-up check logic (automatically scheduling Follow-up 1 for +4 days, Follow-up 2 for +7 days, Breakup for +4 days). [SUPERSEDED BY 6.0]
- [x] Wire up the `lastContactAt` dynamic update trigger whenever a new interaction row is logged.
- [x] Install the `xlsx` library and build the 'Export to Excel' action, fetching and flattening pipeline data across multiple sheets.

### 6.0 Engagement Tracker Data Model & UI Overhaul (generated against SDD v2.0)
- [ ] Update Prisma schema to replace existing `Prospect` fields and related tables with the new `Prospect` schema (plain fields for sequence: firstContactDate, followUp1Date, etc.).
- [ ] Add `Payment` model with one-to-many relation to `Prospect`.
- [ ] Migrate existing database data according to the mapped `status` rules and clean up unused models.
- [ ] Rebuild the Prospect Details UI with progressive disclosure logic (Stages 1 through 4: Engaging, Traction, Resolution, Payment).
- [ ] Implement data fetching and update server actions to support the new stage-based fields and multiple Payments per prospect.
- [ ] Update the Dashboard/List view to calculate "needs follow-up" based on the new date/done fields.
- [ ] Update revenue calculations on the Dashboard to sum from the new `Payment` table (`paid = true`) grouped by currency.

### 7.0 Follow-up Auto-Scheduling & Auto-Dead Logic (generated against SDD v2.0)
- [x] Define 4, 7, and 11-day offsets as named configurable constants.
- [x] Update `setFirstContact` to automatically calculate and set `followUp1Date` (First Contact + 4 days).
- [x] Update `markFollowUpDone` to dynamically schedule the next step on completion (FU1 -> setup FU2 at +7d, FU2 -> setup Breakup at +11d).
- [x] Implement auto-dead logic when Breakup is marked done (set outcome="dead").
- [x] Implement UI masking to enforce read-only calculated dates on the engagement form.
- [x] Ensure `markReplied` halts all auto-logic and moves the prospect into Stage 2.

### 8.0 Stage 2 Meeting Section Details (generated against SDD v2.0)
- [x] Update Prisma schema: add `meetingTime` (DateTime?), `meetingType` (String?), and `meetingLocation` (String?) to `Prospect`.
- [x] Update Stage 2 Traction UI in `app/dashboard/prospects/[id]/page.tsx` to include the new meeting fields and dynamic location label.
- [x] Update `saveMeeting` server action to persist the new fields.
- [x] Update the prospect details historical context summary to show full meeting details once done.

### 9.0 Prospect Pipeline & UI Enhancements (generated against SDD v2.1)
- [ ] Make Fit and Signal scores read-only in the metadata section if they are greater than 0.
- [ ] Add `contactChannel` (String?) to `Prospect` schema and a dropdown (Email, LinkedIn, WhatsApp DM) to the First Contact logging UI.
- [ ] Add `reportUrl` (String?) to `Prospect` schema and a Report section to the metadata card.
- [ ] Enable clicking on historical timeline events (First Contact, Replied, Outcome) to revert the prospect pipeline back to that exact stage.

### 10.0 Dashboard Global Views & Management (generated against SDD v3.0)
- [ ] Scaffold generic side-bar navigation structure (Payments, Reports, Proof Points, Settings) with dummy route pages.
- [ ] Implement `Payments` tab with dummy cross-prospect data: table view showing invoices (filterable by invoiced/paid) and running total cards by currency.
- [ ] Implement `Reports` tab displaying dummy entries (client, date generated, mock PDF link).
- [ ] Implement `Proof Points` tab showing dummy case-study components (client type, problem solved, result).
- [ ] Implement `Settings` tab providing a basic analytics dashboard chart UI and mock setting toggles for team management and workflow offsets.

---
## Reactive Log
<!-- @intake manages this section -->

## Recent Activity Index
2026-07-09 — 10.0 Dashboard Global Views & Management — added
2026-07-08 — 9.0 Prospect Pipeline & UI Enhancements — added
2026-07-08 — 8.0 Stage 2 Meeting Section Details — complete
2026-07-08 — 7.0 Follow-up Auto-Scheduling & Auto-Dead Logic — added
2026-07-08 — 6.0 Engagement Tracker Data Model & UI Overhaul — added
2026-07-08 — 5.0 Internal Dashboard: Backend Logic & Exports — complete

