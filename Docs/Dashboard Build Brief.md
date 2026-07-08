# MidasCreed Pipeline Dashboard — Build Brief

Hand this to your coding AI as-is. It specifies a small internal tool, not a public product — optimize for "working for two people this week," not scalability.

## Stack

Next.js on Vercel, Neon (serverless Postgres), Prisma, NextAuth — matching the existing MidasCreed/APADTwin stack conventions. Use the `xlsx` (SheetJS) library for the export feature.

## Auth

Two hardcoded users, no signup flow, no public registration:

| Username | Password |
|---|---|
| Michaels | midasmichael |
| Conrad | midasconrad |

Implement via NextAuth's Credentials provider, validating against these two pairs. **Store the actual password values in environment variables (`.env`), not typed directly into the source file** — same login behavior, but it means the repo can be pushed to GitHub or shared without the passwords sitting in plain text in version history. The session should carry which of the two users is logged in, since that identity drives the "assigned to me" filtering everywhere else.

## Data model

Use the Prisma schema already defined in `MidasCreed_Pipeline_DB_Schema.md` (Prospect, Interaction, FollowUp, AgentBuild, Deal, EngagementReport). Map `assignedTo` on `Prospect` to the logged-in username (`"Michaels"` or `"Conrad"`).

## Field taxonomy — must match the Prospect Engagement Prompt v2 exactly

This matters: the dashboard's fields, dropdowns, and enums should mirror the prompt template's structure, so a prospect can move between "chat" and "dashboard entry" without translation.

**Tier** (dropdown): `Tier 1 — Malawi Simple` / `Tier 2 — African Medium` / `Tier 3 — International High-end`

**Prospect info fields** (from the `[PROSPECT INFO]` block — one text field each): Business name, What they do, Location, Size, How we're reaching them, Current tools/workflow, AI exposure/attitude, Signal to anchor on, Prior contact history.

**Fit + Signal score**: two small number inputs (0–5 each), auto-summed and displayed as X/10, plus a short text field for the one-line verdict.

**Status** (matches the engagement report prompt's stages exactly): `Sourced` → `Contacted` → `Replied` → `Meeting Booked` → `Audit Done` → `Agent Built` → `Won` / `Dead`. Render as either a dropdown or a horizontal checklist the user clicks through in order.

**Follow-up tracking**: three checkboxes — Follow-up 1, Follow-up 2, Breakup — each with a due-date field and a completed toggle. Checking one off should auto-create the next one with a suggested due date (Follow-up 1 → 4 days out, Follow-up 2 → 7 days after that, Breakup → 4 days after that), editable before saving.

**Meeting**: checkbox for "Meeting scheduled," reveals a date field when checked, writes an `Interaction` row of type `meeting`.

**Deal / payment**: checkbox for "Client paid," reveals amount and currency (MWK/USD) fields when checked, writes a `Deal` row with status `paid`. Also allow logging a deal as `proposed` or `invoiced` before it's actually paid, so pipeline value is visible before revenue is.

**Agent built**: free-text field(s) for agent name/description and a status (`proposed` / `building` / `live` / `maintained`), tied to `AgentBuild`.

## Pages

1. **Login** — username/password form, redirects to dashboard on success.
2. **Dashboard (home)** — the four headline numbers: Total Engagements, Leads Converted (status = Won), Payments Done (count of paid Deals), Total Revenue (sum of paid Deals, shown separately by currency — don't combine MWK and USD into one number). Below that, a list of prospects flagged "needs follow-up" (last contact 8+ days ago, status not Won/Dead) across both users, plus a toggle to filter to "mine only."
3. **Prospect list** — table view, filterable by tier, status, and assigned founder. Row click opens the detail view.
4. **Prospect detail / entry form** — all fields above, editable in place, with the status checklist prominent at the top.
5. **New prospect** — same form, empty, pre-fills `assignedTo` with the logged-in user.

## Reminder logic

No background job required. On every page load that lists prospects, compute `daysSinceLastContact = today - lastContactAt` and flag anything ≥ 8 days (make this threshold a constant, easy to change later) where status isn't Won or Dead. `lastContactAt` updates automatically whenever a new `Interaction` row is created for that prospect — wire that up as a side effect of logging any interaction, not something entered manually.

## Export

A button on the dashboard: "Export to Excel." Pulls all `Prospect` rows (with related `Deal` and `AgentBuild` data flattened in) into a `.xlsx` file, one sheet per table, downloaded on click. Manual trigger only — no scheduled/automatic export.

## Out of scope for this build

No public signup, no password reset flow, no email notifications, no mobile app — two people, two hardcoded logins, one shared view of the pipeline. Keep it simple enough to ship in days.
