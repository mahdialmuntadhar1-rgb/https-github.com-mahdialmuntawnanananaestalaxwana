<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your app (Supabase-only stack)

This is a Vite + React frontend-only app.

- **Authentication:** Supabase Auth
- **Data layer:** Supabase (`@supabase/supabase-js`)
- **No Firebase SDK/config in runtime**
- **No Cloudflare Worker backend/proxy layer**

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in `.env.local`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Run the app:
   ```bash
   npm run dev
   ```

## Authentication flows

The app now uses Supabase Auth for:

- Email/password sign up
- Email/password sign in
- Google OAuth sign in
- Session persistence and auth state listening via `supabase.auth.onAuthStateChange`
- Sign out

## Migration status

- Legacy auth/data dependencies are fully removed from this frontend.
- Runtime auth state is provided through `hooks/useAuth.tsx` and `AuthProvider` in `index.tsx`.
- Profile creation/sync is handled with Supabase Auth user identities (`services/api.ts#getOrCreateProfile`).

## Manual verification checklist (post-merge)

1. `npm install`
2. Set `.env.local`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Verify:
   - Sign up with email/password creates a profile in `users`.
   - Sign in with email/password works.
   - Google OAuth sign in works (with dashboard redirect URLs configured).
   - Sign out locks protected pages.
   - Data operations still work (business fetch, post creation).

## Deployment notes (Vercel)

- Deploy only the frontend build output (`vite build` => `dist/`).
- Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Vercel project environment variables.
- Enable the desired auth providers (e.g. Google) in the Supabase dashboard.
