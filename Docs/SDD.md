# MidasCreed System Design Document (SDD)
Last Updated: 2026-07-08
Version: v1.0 (Base)
Brief Project Description: Corporate website for MidasCreed conveying an innovative image (AI, AR, Web3, Business Automation) using cutting-edge web technologies, high-fidelity 3D animations, and a contact form integration.
Framework: M.A.S.T.E.R. (Model → Architecture → Scale → Tradeoffs → Execution → Resilience)

### M — MODEL THE SYSTEM (Requirements & Constraints)
1. **Functional Requirements**
   - Present MidasCreed's services (AI, AR, Web3, Business Automation).
   - Display immersive 3D background elements and highly polished UI components (timelines, marquees).
   - Allow users to submit contact inquiries which automatically send formatted emails to the MidasCreed team and an auto-reply receipt to the user.
2. **Non-Functional Requirements**
   - High availability (static edge delivery).
   - Low latency (fast initial load times utilizing Next.js Server Components and SSG).
   - High visual fidelity (WebGL/Three.js rendering performance).
3. **Constraints**
   - Currently, no relational database is provisioned.
   - Requires efficient browser rendering for the WebGL/React Three Fiber scenes across desktop and mobile devices.
4. **Success Metrics**
   - Smooth 60fps rendering for 3D elements on modern devices.
   - 100% reliability for contact form email delivery.

### A — ARCHITECT (High-Level Architecture)
1. **Frontend (Client-Side Rendering & UI)**
   - **Framework:** Next.js 15.2.8 (App Router).
   - **Styling:** Tailwind CSS, Radix UI (shadcn/ui), Framer Motion.
   - **3D Graphics:** React Three Fiber, Three.js, React Drei.
2. **Backend (Server Actions)**
   - **API / Logic:** Next.js Server Actions (`app/actions/contact.ts`).
   - **Email Service:** Integration with the **Resend** API.
3. **Data Model / Database Schema**
   - *No database is currently configured.* The application operates statelessly.
4. **Anomalies / Unexpected Components**
   - The project includes `expo` and `react-native` dependencies which are unconventional for a pure Next.js web application. These might be exploratory, an artifact of code migration, or intended for a future cross-platform architectural approach (e.g., using Solito). For now, they can be safely ignored but should be removed in the future if a mobile app is not actively being built in this repository.

### S — SCALE THE SYSTEM (Capacity Planning & Traffic Model)
1. **Traffic Patterns**
   - Expected moderate sustained load for a corporate marketing site.
   - Highly read-heavy architecture. Zero database writes.
2. **Scalability Design**
   - **Edge Caching & CDN:** Static pages and assets are pre-rendered and served via a Global CDN (e.g., Vercel Edge Network).
   - Backend logic scaling is handled serverlessly via Next.js server functions.
3. **Bottleneck Identification**
   - **Client CPU:** Rendering 3D graphics (React Three Fiber) could be a bottleneck on low-end mobile devices. Graceful degradation might be necessary if analytics show dropping frame rates.
   - **Resend API Limits:** Dependency on a 3rd-party transactional email API limits form submission throughput, which is susceptible to spam. Rate limiting should be considered in the future.

### T — TRADEOFFS (Technology & Architecture Decisions)
1. **Frontend:** Next.js (App Router) + React 19 provides state-of-the-art server components and developer experience, trading off a slightly steeper learning curve and edge-deployment complexity against immense performance benefits.
2. **Styling:** Radix UI and Tailwind CSS offer complete headless control over components rather than relying on bloated pre-styled libraries, ensuring the unique MidasCreed aesthetic is easily maintained.
3. **Database vs. Stateless:** By opting out of a database for the MVP (using Resend directly for inquiries), infrastructure overhead and operational cost are heavily reduced, trading off the ability to store inquiries internally in an Admin Dashboard.
4. **3D Interactive Graphics:** Prioritizes visual "Wow" factor and premium aesthetic over the smallest possible JS bundle size.

### E — EXECUTION PLAN (DevOps, Hosting, Domains, CI/CD)
1. **Hosting Plan**
   - **Frontend & Backend (Serverless):** Vercel (Highly recommended for Next.js App Router).
2. **Domain & DNS Setup**
   - **Domain:** `midascreed.com`.
   - **DNS Provider:** Cloudflare (Recommended) to route to Vercel A/CNAME records.
3. **CI/CD Pipeline**
   - Official Vercel GitHub integration for automatic Preview Deployments on Pull Requests and Production Deployments on `main` branch merges.
4. **Environment Variables**
   - The server requires `RESEND_API_KEY` for the contact form functionality to work.

### R — RESILIENCE (Reliability Engineering & Observability)
1. **Failovers & Healing**
   - Vercel's global CDN auto-heals and prevents region-specific failures from bringing down the static frontend site.
2. **Error Handling**
   - Graceful try/catch server error handling exists within `contact.ts` to ensure users are informed via UI toasts if the Resend API fails.
3. **Observability**
   - Currently none set up. Recommendation: Enable Vercel Speed Insights and Web Analytics to track performance metrics and real user monitoring (RUM).
