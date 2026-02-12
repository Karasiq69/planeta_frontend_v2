# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint check
npm run lint:fix # ESLint autofix
npm run format   # Prettier format all src/
```

## Quick Reference

- [Architecture](.claude/about/architecture.md) — API layer, feature modules, routing, auth, shared types
- [Conventions & Rules](.claude/about/conventions.md) — YAGNI/KISS, code style, formatting, patterns
- [Stack & Libraries](.claude/about/stack.md) — Next.js 14, shadcn/ui, TanStack, key dependencies

Feature specs go in `.claude/features/`.

## Rules

- **YAGNI/KISS** — no over-engineering, no premature abstractions
- **No `any`** — use proper types, `unknown`, or generics
- **No excessive comments** — only comment non-obvious "why"
- **No redundant code** — don't add error handling or validation for impossible scenarios
- Russian for all UI text and messages
- Use Serena MCP tools for file search and manipulation
