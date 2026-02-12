# Code Style & Conventions

## Principles
- **YAGNI** — don't add functionality until needed
- **KISS** — simplest solution that works
- No over-engineering, no premature abstractions

## TypeScript
- **No `any`** — use proper types, `unknown`, or generics
- Use `type` imports for type-only imports (enforced by ESLint)
- Unused vars prefixed with `_` (warning, not error)

## Comments
- No excessive comments — code should be self-explanatory
- Only comment non-obvious "why", never "what"

## Formatting (Prettier)
- No semicolons, single quotes, JSX single quotes
- 2-space indent, 100 char print width
- Trailing commas in ES5 positions

## Import Order (ESLint enforced)
builtin > external > internal > parent/sibling > index > type
Alphabetized within groups, newlines between groups.

## UI Language
All UI text, validation messages, and toasts in **Russian**.

## Patterns
- Forms: Zod schema in `schema.ts` + custom `useXxxForm` hook (RHF + mutations)
- Mutations: invalidate query keys on success, show Sonner toast
- Query keys: always use factory from `query-keys.ts`
- API calls: keep in `actions.ts`, never call axios from components
- shadcn/ui: don't edit `src/components/ui/` manually
