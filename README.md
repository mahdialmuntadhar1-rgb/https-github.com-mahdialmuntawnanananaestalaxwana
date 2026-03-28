<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Iraq Compass (Supabase-only)

This project now runs on a single backend: **Supabase** (database + auth + realtime).

## Required environment variables

Create a `.env.local` file with:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

> `VITE_GEMINI_API_KEY` is still required for AI-powered UI helpers (Data Architect / City Guide).

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run type-check + build preflight:
   ```bash
   ./scripts/preflight.sh
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Architecture notes

- Supabase client initialization: `services/supabase.ts`
- Main data access layer: `services/api.ts`
- Auth flow (Google OAuth via Supabase): `components/AuthModal.tsx` + `App.tsx`
- Base schema and seed migration: `supabase/migrations/20260328_bootstrap_public_tables.sql`
- Auth write policy migration: `supabase/migrations/20260328_auth_write_policies.sql`

## Deployment verification

Use:

```bash
./scripts/verify-deploy.sh
```

This checks type safety, production build output, and scans generated assets for forbidden legacy `businesses.verified` filters.
