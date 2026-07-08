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
- [ ] Install Prisma and strictly configure connection to Neon (serverless Postgres).
- [ ] Define the Prisma Schema to cover Prospect, Interaction, FollowUp, AgentBuild, Deal, and EngagementReport models based on the schema definition.
- [ ] Run initial generation and setup database migrations.

### 3.0 Internal Dashboard: Authentication Implementation (generated against SDD v1.0)
- [ ] Install `next-auth` and set up the Credentials provider block.
- [ ] Read 'Michaels' and 'Conrad' credentials from `.env.local` strictly, avoiding plain text. 
- [ ] Create the `/login` Next.js route with a simple username and password entry form.
- [ ] Create middleware to protect all internal dashboard routes and inject the current user identity (`assignedTo`) into the session.

### 4.0 Internal Dashboard: User Interfaces & Layout (generated against SDD v1.0)
- [ ] Build the main Dashboard (home) view with headline metrics (Total Engagements, Leads Converted, Payments Done, MWK/USD Revenue breakdown).
- [ ] Build the "needs follow-up" widget on the Dashboard (filtering >8 days without interaction) with a "mine only" toggle.
- [ ] Implement the Prospect List table view (tier, status, assigned founder filtering).
- [ ] Build the Prospect Details / Entry Form containing the specific prompt-aligned taxonomy (Pipeline Status checklist, text fields, Fit/Signal score out of 10).
- [ ] Implement the New Prospect creation view (auto-assigning the Prospect to the active session user).

### 5.0 Internal Dashboard: Backend Logic & Exports (generated against SDD v1.0)
- [ ] Implement logic side-effect: dynamically creating an Interaction row when the meeting checkbox is clicked.
- [ ] Implement logic side-effect: dynamically creating a Deal row with an amount and currency (MWK/USD) when the "Client paid" checkbox is toggled.
- [ ] Wire up the Follow-up check logic (automatically scheduling Follow-up 1 for +4 days, Follow-up 2 for +7 days, Breakup for +4 days).
- [ ] Wire up the `lastContactAt` dynamic update trigger whenever a new interaction row is logged.
- [ ] Install the `xlsx` library and build the 'Export to Excel' action, fetching and flattening pipeline data across multiple sheets.
