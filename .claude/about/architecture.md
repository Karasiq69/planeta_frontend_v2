# Architecture

## API Layer

Backend runs at `localhost:8000`. Next.js rewrites `/api/*` to the backend (`next.config.mjs`).

Axios client (`src/lib/auth/client.ts`):
- Base URL from `NEXT_PUBLIC_HOST` env var (defaults to `http://localhost:8000`)
- Automatic 401 handling with token refresh via mutex
- Error normalization into `ApiError` (`src/types/api-error.ts`)

API endpoint URL constants: `src/lib/constants.ts`

## Feature Modules (`src/features/<domain>/`)

Each feature follows this structure:
```
features/<domain>/
  api/
    actions.ts      # Raw API calls (axios)
    queries.ts      # useQuery hooks
    mutations.ts    # useMutation hooks
    query-keys.ts   # Query key factory (all > lists > list(params) > details > detail(id))
  types/
  components/
    forms/          # Form components + Zod schema (schema.ts)
    table/          # Column definitions (columns.tsx) + DataTable wrapper
  hooks/            # e.g. useXxxForm — combines RHF + mutations
```

## Routing

Two route groups under `src/app/`:
- `(auth)/` — login, register, no-access (public)
- `(crm)/` — authenticated pages (dashboard, clients, orders, warehouse, etc.)

CRM layout (`src/app/(crm)/layout.tsx`): sidebar (`AppSidebar`) + navbar.

## Auth

Middleware (`src/middleware.ts`) handles auth redirects based on JWT cookies (access/refresh).

Providers chain: `SidebarProvider` > `QueryProvider` > `AuthProvider`
- Auth context via `useAuth()` hook (`src/providers/AuthProvider.tsx`)
- Auth API calls: `src/lib/auth/auth.ts`

## Shared Types

`src/types/params.ts` — generic `ListParams` and `ListResponse<T>` for paginated API responses.
