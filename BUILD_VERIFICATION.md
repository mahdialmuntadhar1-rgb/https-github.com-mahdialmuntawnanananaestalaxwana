# Build verification guide

Run this before launch from repository root:

1. `npm install`
2. `npm run lint`
3. `npm run build`
4. `./scripts/preflight.sh`

Expected outcome:
- lint/typecheck passes
- production build succeeds into `dist/`
- preflight confirms Supabase env vars are present

If any step fails, treat it as a launch blocker and resolve before publish.
