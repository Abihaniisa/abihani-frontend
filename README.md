# Abihani

The social marketplace. Nigeria first.

One account. No buyer mode. No seller mode. The feed is the center.
Every post can be bought. Escrow protects every order.

---

## WHAT THIS REPO IS

This is one of two repos that together make Abihani.

- `abihani-frontend` — the React + Vite + TypeScript + Tailwind app. Deploys to Cloudflare Pages.
- `abihani-backend` — the Fastify + TypeScript API. Deploys to Railway.

They never merge. They communicate only through the API contract at
`src/types/api.types.ts`, which is byte-identical on both sides.

If you are reading this in the frontend repo, everything below applies.
If you are reading this in the backend repo, everything below applies,
except the parts explicitly about screens, motion, and copy — those
belong only to the frontend. The backend has no UI.

---

## FILES THAT ARE LAW

Three files at the root of this repo. Read them in this order:

1. `README.md` — this file. What the repo is. How to run it. What is expected.
2. `RULES.md` — every locked decision, numbered 1 to 306. This is the law.
   If a rule is not in RULES.md, it is not locked.
3. `GAPS.md` — every open, deferred, or closed gap. Nothing is filled
   without a trigger. Nothing is invented.

Chat is not the record. These three files are.

---

## HOW TO RUN

Frontend:

    npm install
    npm run dev

Opens at http://localhost:5173 inside the Codespace. The forwarded URL
is private to the Codespace owner.

Backend:

    npm install
    npm run dev

Runs on http://localhost:3000 inside the Codespace.

During the first stages, both sides run on mock data. No Supabase. No
Cloudflare. No Railway. Fully local.

Later stages swap mock services for real Supabase and the real backend.
Only two files change: `src/services/api.service.ts` and
`src/services/auth.service.ts`.

---

## THE STANDARD

Premium. World-class. Trillion-dollar.

Every button, every label, every state, every screen. No exceptions.
No "good enough." No "fine for now." Every element earns its place.
Every word is chosen. Nothing cheap. Nothing lazy.

If a design is not bulletproof and the founder says change it — change
it. If a design is bulletproof and the founder says change it — say so
first, then change it if still asked.

Every control is wired. A bulb without electricity is a lie. A switch
that does not actually change anything does not ship.

Nothing faked. Nothing dim where it must be bright. Nothing blocked
where it must be visible. Nothing hidden where it must be reachable.

---

## THE FILTERS

Every decision passes three filters before it ships.

1. Does this make the user want to keep scrolling, or want to leave?
   If it makes them want to leave, it is removed. Even if it seemed
   good on paper.

2. Does this sound like a decision we made, or an apology we owe?
   If it sounds like an apology, it is rewritten.

3. Would a senior designer at Apple ship this word?
   If not, the word changes.

---

## THE ENGAGEMENT STANDARD

- Nothing blocks the scroll.
- Nothing taxes attention. No games. No "read this first." No streak
  guilt. No pop-ups that steal focus.
- Every interaction rewards instantly. Like pops. Save fills. Comment
  posts. Post publishes.
- Every state has motion. Loading feels alive. Success feels felt.
  Error feels honest. Nothing sits still.
- The Feed is the entertainment. Not the app. The feed itself.
- Buy is native to the post, never a floating ad.
- Nothing feels bolted on.
- The user opens with no intention. The product is built for that
  moment. Nothing forces intention. Nothing forces action.

---

## IDENTITY

- Name: Abihani. Always. Never anything else.
- Tagline: The social marketplace.
- Market: Nigeria only at launch.
- Currency: Nigerian Naira (₦). Format ₦38,500. Commas. No decimals.
- Contact email (public): abihaniexpress@gmail.com
- The string "Express" never appears in any user-facing text. Anywhere.

Colors:

- Background: #0B0B0F
- Primary text: #F5F0E6
- Secondary text: #B8B2A6
- Crimson: #C41E3A — reserved for the single most important action
  on each screen. Nothing else wears it.
- Gold: #E7C27A — reserved for prices and verified signals. Nothing
  else wears it.
- Success: #4ADE80
- Danger: #FF3B3B

Wordmark:

- Bone white, 19px, weight 800, tracking −0.6px
- A 6px crimson blinking dot to its right
- No "A" mark in the feed top-left. Word only.

Parent mark:

- The AH angular crimson mark.
- Used only in: splash screen, app icon, About sheet, download page.
- Never in the feed chrome.

Splash:

- Pure white background.
- AH mark centred.
- "from" in grey, "Abihani Isa" in crimson below.
- Under 1 second. No bounce. No sound.

Typography:

- System stack. Tight tracking on headings. Weight contrast 500/700/800.
- Line height 1.15–1.2 on headlines. 1.4–1.5 on body.

---

## MOTION

- Every screen-to-screen navigation uses a horizontal push transition.
  340ms. cubic-bezier(.32, .72, 0, 1).
  Current screen out left, new screen in right. Reverse on back.
- Profile pictures and product images use a shared element transition.
  300ms. Same curve.
- Reduced-motion preference disables all transitions.
- No network calls during a transition.
- Sheets, toasts, and tab switches keep their own motion.
  Sheets slide up. Toasts float up. Tabs fade.

---

## SMART BACK NAVIGATION

- On-screen back arrow, browser back, Android hardware back,
  iOS edge-swipe — all do the same thing. Always.
- On the home tab, back does nothing.
- On any tab other than home, back returns to home.
- On sheets and viewers, back closes them.
- One navigation stack. One `navigateBack()` function.
- No screen invents its own back logic.

---

## COPY RULES

- The word for all text on screen is copy.
- The word for a condition is state (loading, empty, error, success,
  focused, disabled, filled).
- Together: state copy.
- Every state has copy. Never blank.
- Every state copy is hardcoded in `src/labels/`. Never fetched, never
  generated, never empty.
- Every state has shape — icon, motion, colour.
- No jargon. No marketing speak. No filler.
- Every word passes: would a senior designer at Apple ship this word?

---

## FILE DICTIONARY

When a bug appears, find its symptom below. Open that one file.
Change only that file. Nothing else.

Frontend:

- Wrong button text → `src/labels/buttons.ts`
- Wrong error or empty or loading text → `src/labels/messages.ts`
- Wrong screen title → `src/labels/headings.ts`
- Wrong notice copy → `src/labels/notices.ts`
- Wrong app name, tagline, contact email, domain → `src/config/app.config.ts`
- Wrong API base URL or CDN URL → `src/config/urls.config.ts`
- Wrong auto-release or auto-cancel timer → `src/config/timing.config.ts`
- Wrong upload or input limit → `src/config/limits.config.ts`
- Wrong colors, spacing, motion → `src/theme/tokens.css`
- Wrong order state logic → `src/engine/order.engine.ts`
- Wrong escrow rules → `src/engine/escrow.engine.ts`
- Wrong dispute rules → `src/engine/dispute.engine.ts`
- Wrong fee or price math → `src/engine/payment.engine.ts`
- Wrong input validation → `src/engine/validation.engine.ts`
- Wrong For You ranking → `src/engine/ranking.engine.ts`
- Wrong API call → `src/services/api.service.ts`
- Wrong login or signup call → `src/services/auth.service.ts`
- Wrong order call → `src/services/order.service.ts`
- Wrong media upload → `src/services/media.service.ts`
- Button looks wrong → `src/components/common/Button.tsx`
- Input field wrong → `src/components/common/Input.tsx`
- Sheet does not slide or close → `src/components/common/Sheet.tsx`
- Toast wrong → `src/components/common/Toast.tsx`
- Feed post layout wrong → `src/components/feed/Post.tsx`
- Right rail wrong → `src/components/feed/Rail.tsx`
- Info card wrong → `src/components/feed/InfoCard.tsx`
- Order row wrong → `src/components/order/OrderRow.tsx`
- Order thread wrong → `src/components/order/Thread.tsx`
- Message composer wrong → `src/components/order/Composer.tsx`
- Profile cover wrong → `src/components/profile/Cover.tsx`
- Profile avatar wrong → `src/components/profile/Avatar.tsx`
- Profile grid wrong → `src/components/profile/Grid.tsx`
- Feed screen wrong → `src/screens/Feed.tsx`
- Discover screen wrong → `src/screens/Discover.tsx`
- Orders screen wrong → `src/screens/Orders.tsx`
- Thread screen wrong → `src/screens/Thread.tsx`
- Profile screen wrong → `src/screens/Profile.tsx`
- Create screen wrong → `src/screens/Create.tsx`
- Settings screen wrong → `src/screens/Settings.tsx`
- Admin screen wrong → `src/screens/Admin.tsx`
- Support screen wrong → `src/screens/Support.tsx`
- Routing wrong → `src/router.tsx`
- Auth state wrong → `src/store/auth.store.ts`
- Order state wrong → `src/store/order.store.ts`
- Naira formatting wrong → `src/utils/formatNaira.ts`
- Date formatting wrong → `src/utils/formatDate.ts`

Backend:

- Wrong route → `src/routes/<name>.routes.ts`
- Wrong business rule → `src/engine/<name>.engine.ts`
- Wrong OTP email → `src/services/email.service.ts`
- Wrong payment split → `src/services/payment.service.ts`
- Wrong DB query → `src/services/db.service.ts`
- Wrong rate limit → `src/services/redis.service.ts`
- Wrong media storage → `src/services/media.service.ts`
- Admin-only route exposed → `src/middleware/auth.middleware.ts`
- Wrong env var read → `src/config/env.config.ts`

One symptom. One file. One fix.

---

## FOLDER STRUCTURE

Frontend:

    src/
      config/        app, urls, features, timing, limits, env
      labels/        buttons, messages, headings, notices
      theme/         tokens, base, utilities
      constants/     countries, banks, nigeria-locations
      engine/        order, escrow, dispute, payment, validation, ranking
      services/      api, auth, order, post, media
      hooks/         useAuth, useOrder, useTimer, useToast
      components/    common, feed, order, profile, create, settings, admin
      screens/       Feed, Discover, Orders, Thread, Profile, Create,
                     Settings, Admin, Support, Signup, Splash
      store/         auth, feed, order
      types/         user, post, order, message, api
      utils/         formatNaira, formatDate, parseError, normalizePhone
      router.tsx
      App.tsx
      main.tsx

Backend:

    src/
      config/        env, timing, limits, fees
      constants/     countries, banks
      engine/        order, escrow, dispute, fee
      services/      db, redis, email, media, payment
      routes/        auth, user, post, order, dispute, media, admin, health
      middleware/    auth, rate, error
      types/         user, order, request, api
      utils/         logger, hash, validation
      seeds/         seed, seed-data
      migrations/    001_initial.sql
      server.ts
      index.ts

Every file under 300 lines. Every function under 50 lines.
No magic numbers. No magic strings.

---

## ENVIRONMENT VARIABLES

Frontend reads from `.env.local` in development and from the
Cloudflare Pages dashboard in production. Only public-safe values.
Never a secret.

Frontend keys:

- `VITE_API_BASE_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_R2_PUBLIC_URL`

Backend reads from `.env` in development and from the Railway
dashboard in production. All secrets. Never committed.

Backend keys:

- `NODE_ENV`
- `PORT`
- `DATABASE_URL`
- `REDIS_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `RESEND_API_KEY`
- `SUPPORT_EMAIL`
- `JWT_SECRET`
- `R2_ACCESS_KEY`
- `R2_SECRET_KEY`
- `R2_BUCKET`
- `R2_ENDPOINT`
- `PAYMENT_PROVIDER`
- `PAYMENT_SECRET_KEY`

---

## SECURITY

- No email, phone number, API key, password, service-role key, admin
  number, JWT secret, Resend key, R2 secret, payment provider secret
  is ever hardcoded.
- Everything comes from environment variables.
- `.env.local` and `.env` are never committed. In `.gitignore`.
- Any file the frontend reads contains only public-safe values.
- Frontend talks to Supabase directly only for auth. Everything else
  through the backend.
- No API returns secrets, tokens, recovery codes, or admin data to
  the client.
- Even in development, behave like production with respect to secrets.

---

## THE COMPLETE-PRODUCT RULE

Not mentioned does not mean not needed. Every omission is a gap to be
filled, not a decision to skip.

Before any stage begins, every possible state, action, failure, and
context is listed. Every one gets an answer. Only then does the stage
prompt get written.

- Every screen has every state: loading, empty, error, success,
  focused, disabled, filled, partial, offline, slow network,
  permission denied.
- Every control has every state: normal, pressed, focused, disabled,
  loading, success, failure.
- Every flow has every branch: offline, timeout, API failure, double
  tap, back mid-flight, rotate, background, session expiry, dead
  link, deleted post with open order, duplicate dispute, failed bank
  lookup, duplicate webhook, expired OTP, wrong recovery code,
  duplicate signup, self-linking as second account.

---

## WHAT NOT TO DO

- Do not add features not asked for.
- Do not remove features that were asked for.
- Do not redesign. Do not invent colours. Do not invent copy. Do not
  invent motion.
- Do not skip testing because a fix looks obvious.
- Do not fill gaps that have no trigger. A social marketplace does not
  require NIN for signup.
- Do not use "Express" in any user-facing text.
- Do not put secrets in code. Ever.
- Do not fake a state. If it says it worked, it worked.

---

## STAGES (in order)

1. Setup — folders, configs, tailwind, tokens, README, RULES, GAPS.
2. Shell — bottom nav, tabs, routing, push transition, empty screens.
3. Accounts — signup, email OTP, recovery code, add/switch account,
   relationship lock.
4. Ranking Engine — pure logic. No UI.
5. Feed — post render, rail, info card, viewer, swipe-to-profile.
6. Settings — location, payout method, delivery regions,
   notifications.
7. Create — media picker, price, stock, ship-from, hashtags, publish.
8. Orders — buy, escrow, thread, composer, countdown, disputes.
9. Profile — cover, avatar, stats, trust row, tabs, edit, lists.
10. Seed & Polish — demo data labelled. Every state verified.
11. Admin & Support — kill switches, seller gating, notices,
    superpowers, algorithm tuning, journal, tickets, reports.

Every stage depends only on the stages before it. No carpenter before
the walls. Every stage has a checklist. Every stage is tested against
its checklist only. A bug fix touches only the files owned by the
stage where the bug lives.

A stage is only "done" when the founder has tapped it on a real phone
and confirmed it feels right.

---

## RULES AND GAPS

- `RULES.md` — every locked decision, numbered 1 to 306. The law.
  Read it before every stage.
- `GAPS.md` — every open, deferred, or closed gap. Never fill a gap
  that has no trigger. Never invent a requirement.

---

## Build what is true. Not what sounds good.