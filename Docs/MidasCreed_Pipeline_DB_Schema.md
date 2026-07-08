# MidasCreed Pipeline Database - Schema (v1)

Built for Neon (serverless Postgres) + Prisma, matching your existing stack conventions. This replaces the spreadsheet tracker with something both founders can query for "what's mine, what's due today."

## Schema

```
model Prospect {
  id             String   @id @default(cuid())
  name           String
  tier           String   // "malawi_simple" | "african_medium" | "international_high_end"
  sector         String?
  country        String?
  source         String   // "sourced" | "referral" | "existing_client" | "cold" | "inbound"
  assignedTo     String   // "michael" | "conrad"
  status         String   @default("sourced")
  // sourced -> contacted -> replied -> meeting_booked -> audit_done -> agent_built -> won -> dead
  contactChannel String?  // "whatsapp" | "email" | "linkedin" | "in_person"
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  lastContactAt  DateTime? // updated every time a new Interaction is logged — this is what drives the "8 days, needs follow-up" flag

  interactions   Interaction[]
  followUps      FollowUp[]
  agents         AgentBuild[]
  deals          Deal[]
  reports        EngagementReport[]
}

model Interaction {
  id           String   @id @default(cuid())
  prospectId   String
  prospect     Prospect @relation(fields: [prospectId], references: [id])
  type         String   // "email" | "whatsapp" | "linkedin" | "call" | "meeting"
  direction    String   // "outbound" | "inbound"
  summary      String   // brief, not the full transcript
  occurredAt   DateTime @default(now())
  loggedBy     String   // "michael" | "conrad"
}

model FollowUp {
  id          String   @id @default(cuid())
  prospectId  String
  prospect    Prospect @relation(fields: [prospectId], references: [id])
  dueDate     DateTime
  type        String   // "follow_up_1" | "follow_up_2" | "breakup" | "custom"
  completed   Boolean  @default(false)
  completedAt DateTime?
}

model AgentBuild {
  id          String   @id @default(cuid())
  prospectId  String
  prospect    Prospect @relation(fields: [prospectId], references: [id])
  agentName   String
  description String
  status      String   // "proposed" | "building" | "live" | "maintained"
  liveDate    DateTime?
}

model Deal {
  id           String   @id @default(cuid())
  prospectId   String
  prospect     Prospect @relation(fields: [prospectId], references: [id])
  serviceType  String   // "audit" | "managed_service" | "one_time_build"
  amount       Decimal
  currency     String   // "MWK" | "USD"
  status       String   // "proposed" | "invoiced" | "paid"
  date         DateTime @default(now())
}

model EngagementReport {
  id          String   @id @default(cuid())
  prospectId  String
  prospect    Prospect @relation(fields: [prospectId], references: [id])
  summary     String   // short narrative, mirrors the PDF report content
  pdfUrl      String?
  generatedAt DateTime @default(now())
}
```

## The "what's mine, what's due today" view

This is the actual point of moving off a spreadsheet - each founder's dashboard is just a filtered query, not a separate table. Example: prospects assigned to Michael, with an incomplete follow-up whose due date has passed, ordered soonest first.

Same pattern gives you: total won this month, total pipeline value by tier, dead-lead rate by source, average days-to-close by tier - all real numbers once there's real data in it, which directly answers the "define one ICP" and "measurable outcomes" points from the critique below without guessing.

## Login

NextAuth, same as the APADTwin stack — but this doesn't need public signup, just two accounts (you and Conrad). Email/password or magic-link is enough; no need for social login or a full user-management system for a two-person internal tool.

## The entry form / checkbox UI

One prospect = one record with a status that moves forward through checkboxes, matching the `status` field on `Prospect`:

`Sourced` → `Contacted` → `Replied` → `Meeting Booked` → `Audit Done` → `Agent Built` → `Won` / `Dead`

Ticking "Meeting Booked" should prompt for a date (writes a row to `Interaction` with type `meeting`). Ticking "Won" should prompt for the deal amount and currency (writes to `Deal`). Follow-up 1 / Follow-up 2 / Breakup are their own checkboxes tied to `FollowUp` rows, each with a `completed` toggle — ticking one marks it done and can auto-generate the next `FollowUp` row with its due date pre-filled (e.g. ticking Follow-up 1 done creates a Follow-up 2 entry due in ~4 days).

## The "needs follow-up" reminder

No cron job needed for this part — it's just a computed flag on page load: if `lastContactAt` is more than ~8 days ago (make the threshold adjustable) and status isn't `Won` or `Dead`, show a "needs follow-up" badge on that row. `lastContactAt` gets updated automatically every time a new `Interaction` is logged, so it stays accurate without manual upkeep.

## Dashboard totals

All straightforward aggregate queries against the tables above, refreshed on load:
- **Total engagements** — count of all `Prospect` rows (optionally filtered by date range).
- **Leads converted** — count where `status = 'won'`.
- **Payments done** — count of `Deal` rows where `status = 'paid'`.
- **Total revenue** — sum of `Deal.amount` where `status = 'paid'`, grouped by `currency` (keep MWK and USD totals separate rather than force-converting them, since exchange rates drift and you don't want the dashboard silently making that judgment call for you).

## Monthly Excel export

A "Export to Excel" button on the dashboard that pulls all tables and writes them to a `.xlsx` with one sheet per table (Prospects, Interactions, Deals, etc.) — the `xlsx`/SheetJS library you already have access to in your stack handles this directly. Trigger it manually once a month rather than automating the download itself; automate the generation, not the decision to keep a backup, so you actually look at it each time rather than letting it pile up unopened.

## Build note

This is a small internal Next.js + Prisma page, not a new product - a table view filtered by assignedTo, with a "mark follow-up done" button that writes back. Realistically a day of work with the stack you already know. Worth treating as a background task, not something that delays outreach starting.
