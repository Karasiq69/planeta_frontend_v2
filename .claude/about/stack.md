# Stack & Key Libraries

## Core

- **Next.js 14** — App Router, RSC, Turbopack dev server
- **React 18**, **TypeScript 5**
- **Tailwind CSS 3** + **tailwindcss-animate**

## UI

- **shadcn/ui** — stone base color, CSS variables (`components.json`)
- Components: `src/components/ui/`
- Reusable `DataTable` + `DataTablePagination`: `src/components/common/table/`
- Common layout: `src/components/common/` (PageHeader, GoBackButton, sidebar, navbar)

## Data & State

- **TanStack Query v5** — server state management
- **TanStack Table v8** — data tables with server-side pagination
- **Axios** — HTTP client with interceptors (`src/lib/auth/client.ts`)

## Forms

- **React Hook Form** + **@hookform/resolvers**
- **Zod** — schema validation

## Other

- **FullCalendar** — scheduling/calendar views
- **Recharts** — charts and dashboards
- **Sonner** — toast notifications
- **Lucide** — icons
- **date-fns** / **date-fns-tz** — date formatting
- **cmdk** — command palette
- **nookies** — cookie management

## Path Alias

`@/*` → `./src/*`
