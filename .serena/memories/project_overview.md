# Planeta Frontend v2

CRM system for an auto service center ("Планета Мерседес"). Manages clients, cars, orders, warehouse/inventory, appointments, products, services, mechanics, and payments.

## Tech Stack
- **Next.js 14** (App Router, RSC, Turbopack)
- **React 18**, **TypeScript 5**
- **Tailwind CSS 3** + **shadcn/ui** (stone base, CSS variables)
- **TanStack Query v5** (server state) + **TanStack Table v8** (data tables)
- **React Hook Form** + **Zod** (forms/validation)
- **Axios** (HTTP, JWT cookie auth with auto-refresh)
- **Sonner** (toasts), **Lucide** (icons), **FullCalendar** (scheduling), **Recharts** (charts)

## Path Alias
`@/*` → `./src/*`

## Backend
Runs at `localhost:8000`. Next.js rewrites `/api/*` to backend (`next.config.mjs`).
Env var: `NEXT_PUBLIC_HOST`.
