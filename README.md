# ScentMart

ScentMart is an order-placing PWA for a hypothetical scent reselling business. Built with Next.js (App Router) + TypeScript, Clerk (auth) and Supabase (backend/storage). It includes ordering, order history, quantity selection, Telegram notification to admin on order placement, Docker containerization and Nginx proxy example support.

Short description: An opinionated PWA that demonstrates product listing, ordering flow, Clerk-based authentication and Supabase-backed data, ready for containerized deployment.

---

## Key features

- Product collection and ordering UI (Next.js / React)
- Clerk authentication (sign-in / sign-up flows)
- Order placement + order history
- Telegram notification to admin when an order is placed
- Quantity selection and simple product detail flows
- PWA-ready: manifest + service worker scaffolding (see `app/layout.tsx`, `manifest.json`)
- Dockerfile included and intended for containerized deployment
- Nginx used as a reverse-proxy in deployment setups

---

## Tech stack

- Next.js (App Router) + TypeScript
- Clerk (authentication)
- Supabase (database / storage / auth integration)
- Docker + Nginx for containerization & reverse proxy
- CSS (global / utility classes)
- Small JS/CSS assets and Dockerfile configuration

---

## Repo layout (high-level)

- app/ — Next.js App Router pages & layout (entry: `app/page.tsx`, `app/layout.tsx`)
- components/ — React UI components (Navbar, ScentCollection, Dashboard components, etc.)
- public/ — PWA assets, manifest (if present)
- Dockerfile, nginx config (if included)
- README.md — this file

(If you need a precise file map, run: ls or inspect the repository in your editor.)

---

## Prerequisites

- Node.js 18+ (or the version recommended by Next.js)
- npm / pnpm / yarn
- A Supabase project (for DB/storage) or equivalent backend
- Clerk account (for authentication)
- Telegram bot + chat id (for admin notifications), if you want that feature working
- Docker (optional) if you want to build/run containers
- An environment host or platform for deployment (Vercel, Fly, Render, Railway, Docker Compose, etc.)

---

## Local development — quickstart

1. Clone the repository
   ```bash
   git clone https://github.com/prashant348/ScentMart.git
   cd ScentMart
   ```

2. Install dependencies
   ```bash
   # using npm
   npm install

   # or using pnpm
   pnpm install

   # or yarn
   yarn
   ```

3. Create environment variables

   Create a `.env.local` (or follow your local env convention). The repository references Supabase and Clerk; common env variables you will likely need (verify exact names in code by searching for `process.env.`):

   - NEXT_PUBLIC_SUPABASE_URL="https://<your-supabase>.supabase.co"
   - NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"
   - SUPABASE_SERVICE_ROLE_KEY="<service-role-key>" (if server-side functions require it)
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<clerk-publishable-key>"
   - CLERK_SECRET_KEY="<clerk-secret-key>" (for server)
   - TELEGRAM_BOT_TOKEN="<telegram-bot-token>"
   - TELEGRAM_CHAT_ID="<admin-chat-id>"
   - NEXT_PUBLIC_BASE_URL="http://localhost:3000" (or your domain)

   NOTE: Search the repository for exact env var names and usages (e.g., `process.env.NEXT_PUBLIC_...`) and populate accordingly.

4. Run development server
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

   Open http://localhost:3000 (or the port printed by Next) in your browser.

---

## Docker & production

A Dockerfile is included in the repository. Typical workflow:

1. Build the image
   ```bash
   docker build -t scentmart .
   ```

2. Run the container (example)
   ```bash
   docker run -e NEXT_PUBLIC_SUPABASE_URL="..." \
     -e NEXT_PUBLIC_SUPABASE_ANON_KEY="..." \
     -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..." \
     -p 3000:3000 \
     scentmart
   ```

If you use Docker Compose, include your supabase/other services and an nginx service for TLS and reverse-proxy. The repo references Nginx for proxying — point Nginx upstream to the Next.js server (the container) and configure HTTPS via Let's Encrypt or your provider.

Deployment recommendations:
- Vercel: easiest for Next.js App Router. Set environment variables in the Vercel project settings.
- Docker-based hosts (Render, Railway, Fly): build and set env vars there.
- Ensure Clerk & Supabase redirect/allowed origins are updated to your deployed domain.

---

## Telegram notification (admin)

This project sends Telegram messages to an admin when an order is placed (there is code referencing Telegram integration). Typical setup:
- Create a Telegram bot using BotFather → obtain BOT_TOKEN.
- Obtain the admin chat id (usually by messaging the bot or via a helper endpoint).
- Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to server or next.js env variables used by the notification code.

Search the project for the Telegram usage to find exact environment variable keys and the function that posts the message (e.g., fetch or axios endpoint).

---

## PWA notes

- `manifest.json` and service worker registration are referenced in the layout (see `app/layout.tsx`).
- To enable full offline/support features, configure service worker and caching strategy according to Next.js PWA guidance or use a plugin like next-pwa.

---

## Useful commands (typical)

- Development:
  - npm run dev
- Build:
  - npm run build
  - npm start (or `npm run start` depending on package.json)
- Docker:
  - docker build -t scentmart .
  - docker run -p 3000:3000 --env-file .env.production scentmart

(Confirm exact script names in package.json and adjust commands if different.)

---

## Troubleshooting

- Auth issues: verify Clerk publishable key (client) and secret key (server); check Clerk dashboard redirect/allowed origins.
- Supabase / DB errors: verify Supabase URL and keys; check Supabase policies and table permissions (RLS).
- Telegram notifications not arriving: verify BOT token and chat id; test with curl:
  ```bash
  curl -s "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage" \
    -d chat_id=<CHAT_ID> \
    -d text="Test message"
  ```
- Docker issues: verify build logs, and ensure environment variables are passed into container.

---

## Contributing

- If you plan to accept contributions later, consider adding a CONTRIBUTING.md and a CODE_OF_CONDUCT.md.
- Keep branches per feature, provide clear PR descriptions, and write tests for critical logic.
- If you want other developers to run the app locally, include an example `.env.example` with placeholder keys and clear instructions.

---

## License

This project is proprietary. All rights reserved. See LICENSE.md for details.
Viewing the repository does not grant permission to copy, modify, distribute, or claim the project as your own.

---

