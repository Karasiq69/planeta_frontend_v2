# CLAUDE.md


## Quick Reference

- [Architecture](.claude/about/architecture.md) — API layer, feature modules, routing, auth, shared types
- [Conventions & Rules](.claude/about/conventions.md) — YAGNI/KISS, code style, formatting, patterns
- [Stack & Libraries](.claude/about/stack.md) — Next.js 14, shadcn/ui, TanStack, key dependencies

Feature specs and tasks are tracked in Obsidian vault: `~/Documents/my-tasks/planeta-crm/frontend/`.
Cross-service specs (API contracts, shared types): `~/Documents/my-tasks/planeta-crm/shared/specs/`.
Backend features and tasks: `~/Documents/my-tasks/planeta-crm/backend/`.
Backend modules (endpoints, tables, deps): `~/Documents/my-tasks/planeta-crm/backend/modules/`.

### After completing any work:
1. Update task file in Obsidian (status, completed date, what was done)
2. If no task exists — create one (conventions: `~/Documents/my-tasks/CLAUDE.md`)

## Rules

- **YAGNI/KISS** — no over-engineering, no premature abstractions
- **No `any`** — use proper types, `unknown`, or generics
- **No excessive comments** — only comment non-obvious "why"
- **No redundant code** — don't add error handling or validation for impossible scenarios
- Russian for all UI text and messages
