# Conventions & Rules

## Core Principles

- **YAGNI** — don't add functionality until it's needed
- **KISS** — prefer the simplest solution that works
- No over-engineering, no premature abstractions

## Code Style

- **No `any`** — use proper types, `unknown`, or generics instead
- **No excessive comments** — code should be self-explanatory; only comment non-obvious "why", never "what"
- **No redundant type annotations** — trust TypeScript inference where it's clear
- **Russian** for all UI text, validation messages, and toasts
- Import order enforced by ESLint (`import/order`): builtin > external > internal > parent/sibling > index > type
- Use `type` imports for type-only imports (`@typescript-eslint/consistent-type-imports`)

## Formatting

ESLint 9 (flat config) + Prettier:
- Config files: `eslint.config.mjs`, `.prettierrc`
- Format-on-save configured in `.vscode/settings.json` (VSCode). For JetBrains: Settings > Tools > Actions on Save > enable "Run eslint --fix" and "Run Prettier"
- Single quotes, no semicolons, 100 char print width, trailing commas in ES5 positions

## Patterns

- **Forms**: Zod schema in `schema.ts` alongside form components; custom `useXxxForm` hook wraps `useForm` + mutations
- **Mutations**: invalidate related query keys on success; show toast via Sonner
- **Query keys**: always use factory from `query-keys.ts` — never hardcode arrays
- **API calls**: keep in `actions.ts`, never call axios directly from components
- **shadcn/ui**: don't edit `src/components/ui/` manually — use `npx shadcn@latest add`
