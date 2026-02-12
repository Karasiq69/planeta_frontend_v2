# Codebase Structure

```
src/
  app/
    (auth)/          # Public pages: login, register, no-access
    (crm)/           # Authenticated CRM pages
      layout.tsx     # Sidebar + Navbar layout
      dashboard/
      clients/
      orders/
      cars/
      warehouse/
      products/
      calendar/
      inventory-documents/
      ...
    layout.tsx       # Root layout (RootProvider, Toaster)
  features/          # Feature modules (see pattern below)
    clients/
    orders/
    cars/
    warehouse/
    stock-movements/
    products/
    services/
    appointments/
    mechanics/
    ...
  components/
    ui/              # shadcn/ui primitives (don't edit manually)
    common/          # Shared: DataTable, PageHeader, sidebar, navbar
    tables/          # Faceted filters, toolbar, view options
  providers/         # RootProvider > QueryProvider > AuthProvider
  lib/
    auth/
      client.ts      # Axios instance with JWT interceptors
      auth.ts         # Auth API calls
    constants.ts      # API URL constants
    utils.ts          # cn() utility
  hooks/             # Shared hooks (useAuth, useDebounce, etc.)
  types/             # Shared types (ListParams, ListResponse<T>, etc.)
  helpers/           # Utility functions
  middleware.ts      # Auth redirect middleware
```

## Feature Module Pattern
```
features/<domain>/
  api/
    actions.ts       # Raw axios calls
    queries.ts       # useQuery hooks
    mutations.ts     # useMutation hooks
    query-keys.ts    # Query key factory
  types/
  components/
    forms/           # Form + Zod schema (schema.ts)
    table/           # columns.tsx + DataTable wrapper
  hooks/             # useXxxForm etc.
```
