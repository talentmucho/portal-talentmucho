# TalentMucho ~ AI Bootcamp Portal

A web portal for TalentMucho's Claude AI bootcamp. Participants enroll, work through a 9-session cohort, track progress, and earn a certificate. Admins manage participants, course content, and onboarding intake responses.

## What this app does

- **Participants** sign up, fill out an onboarding intake, work through cohort lessons, and download a certificate when they finish.
- **Admins** review participant intake answers, edit course content, and configure site settings.

That's it. One cohort (`cohort-1`) is live today; the structure is set up to add more later.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19, TailwindCSS 4, Radix UI, shadcn |
| Animations | Framer Motion 12 |
| Auth + DB | Supabase (`@supabase/ssr`) |
| Tables | `@tanstack/react-table` |
| State | Zustand |
| Code highlighting | Shiki |
| PDF (certificates) | jsPDF + html2canvas |
| Toasts | Sonner / goey-toast |
| Theme | next-themes |

## Getting Started

```bash
npm install
npm run dev
```

Runs at `http://localhost:3000`.

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Routes

```
/                                  ~ landing
/login /register                   ~ auth
/forgot-password /reset-password
/auth/callback                     ~ Supabase OAuth callback

/onboarding                        ~ intake form (required on first login)

/participant                       ~ dashboard home
/participant/courses               ~ cohort overview
/participant/courses/cohort-1      ~ session list
/participant/settings              ~ profile + intake answers tab
/participant/certificates          ~ earned certificates
/participant/certificates/[id]     ~ single certificate (PDF download)

/(lesson)/participant/courses/cohort-1/session-1..9   ~ lesson pages (dedicated layout)

/admin                             ~ admin home
/admin/participants                ~ table + detail panel + intake responses
/admin/courses                     ~ course content management
/admin/courses/cohort-1/introductions
/admin/settings                    ~ site-wide config
```

Route groups in parentheses (`(auth)`, `(dashboard)`, `(lesson)`) don't affect the URL ~ they just swap layouts.

## Project Structure

```
src/
├── app/
│   ├── (auth)/                   # login, register, password flows
│   ├── (dashboard)/              # participant + admin dashboards
│   │   ├── participant/
│   │   └── admin/
│   ├── (lesson)/                 # immersive lesson layout
│   ├── onboarding/               # first-login intake
│   ├── auth/callback/            # Supabase OAuth handler
│   ├── actions/                  # server actions
│   │   ├── auth.ts
│   │   ├── intake.ts
│   │   ├── enrollment.ts
│   │   ├── certificates.ts
│   │   ├── settings.ts
│   │   └── admin-settings.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn primitives
│   ├── animate-ui/               # animated Radix wrappers
│   ├── dashboard/
│   ├── cohort1/
│   └── provider/
├── utils/supabase/               # SSR + browser Supabase clients
├── hooks/
├── lib/
└── store/                        # Zustand stores
```

## How the pieces fit

1. **Auth (Supabase SSR).** All auth runs through `@supabase/ssr`. Server components read the session from cookies; route layouts gate access by role.
2. **Onboarding.** New users land on `/onboarding`. Answers are saved via `actions/intake.ts` and gate entry to `/participant`.
3. **Lessons.** Cohort sessions live in `(lesson)/participant/courses/cohort-1/session-N`. Completion writes progress back via server actions.
4. **Certificates.** Once a participant completes the cohort, `actions/certificates.ts` issues a certificate row. The `[id]` page renders it and exports to PDF.
5. **Admin.** `/admin/participants` uses `@tanstack/react-table` to list users, with a side panel for intake responses. `/admin/courses` and `/admin/settings` are the CMS surfaces.

## Data Model (Supabase)

Schema is still being built out. The tables in use / expected:

- `profiles` ~ user + role (`participant` | `admin`)
- `intake_responses` ~ onboarding answers
- `enrollments` ~ user × cohort
- `session_progress` ~ user × session, completed_at
- `certificates` ~ issued per user × cohort
- `site_settings` ~ admin-managed config

All access is enforced by Supabase **RLS policies** ~ participants can only read/write their own rows; admins have elevated policies.

## Conventions

- Next.js **App Router** only (no Pages Router).
- Use `@supabase/ssr` ~ never `@supabase/auth-helpers-nextjs`.
- TailwindCSS v4 ~ config lives in CSS (`globals.css`), not `tailwind.config.js`.
- Server Actions live under `src/app/actions/` and are called from forms/components directly.
- File names: kebab-case.
- Use tilde (`~`) instead of em dash.
- See `AGENTS.md` for AI agent coding rules (this is **not** the Next.js your training data knows ~ check `node_modules/next/dist/docs/` before guessing APIs).

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # serve production build
```

## Roadmap / Open Questions

- Make cohort + session schema data-driven (replace hard-coded `cohort-1` routes).
- Public certificate verification URLs.
- Email notifications (session reminders, completion) ~ likely Resend.
- Admin role assignment flow (currently manual via Supabase).
- Payments / checkout for enrollment.
