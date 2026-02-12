# Task Completion Checklist

When a task is completed:

1. **Run lint**: `npm run lint` — fix any errors before finishing
2. **Check types**: `npm run build` — ensures no TypeScript errors (no separate tsc command)
3. **Verify no `any`** in new/changed code
4. **Ensure Russian** for any new UI text or messages
5. **Follow import order** — ESLint will catch violations
6. **Use type imports** where applicable
7. No test framework — no tests to run
