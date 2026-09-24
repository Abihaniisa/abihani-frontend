Here is the final frontend README. Complete. Every rule referenced. No rushing. This is what goes into abihani-frontend/README.md.

---

Abihani — Frontend

The social marketplace. Nigeria first.

One account. No buyer mode. No seller mode. The feed is the center.
Every post can be bought. Escrow protects every order.

---

What this repo is

The frontend for Abihani. React + Vite + TypeScript + Tailwind.
Deploys to Cloudflare Pages.

The backend lives in a separate repo: abihani-backend. It is not
your concern. Every API call goes through src/services/api.service.ts.
Every response shape is defined in src/types/api.types.ts.

---

How to run

```bash
npm install
npm run dev
```

Opens at http://localhost:5173 inside the Codespace.
The forwarded URL is private to the Codespace owner.

During Preview (the first stages), the app runs on mock data. No
Supabase. No backend. No Cloudflare. Fully local. Only you can see it.

Later stages swap the mock services for real Supabase and the real
backend. Only two files change: src/services/api.service.ts and
src/services/auth.service.ts.

---

THE STANDARD

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

THE FILTERS

Every decision passes three filters before it ships:

1. Does this make the user want to keep scrolling, or want to leave?
If it makes them want to leave, it is removed. Even if it seemed good.

2. Does this sound like a decision we made, or an apology we owe?
If it sounds like an apology, it is rewritten.

3. Would a senior designer at Apple ship this word?
If not, the word changes.

---

THE ENGAGEMENT STANDARD

· Nothing blocks the scroll.
· Nothing taxes attention. No games. No "read this first." No streak
  guilt. No pop-ups that steal focus.
· Every interaction rewards instantly. Like pops. Save fills. Comment
  posts. Post publishes.
· Every state has motion. Loading feels alive. Success feels felt.
  Error feels honest. Nothing sits still.
· The Feed is the entertainment. Not the app. The feed itself.
· Buy is native to the post, never a floating ad.
· Nothing feels bolted on.
· The user opens with no intention. The product is built for that
  moment. Nothing forces intention. Nothing forces action.

---

IDENTITY

· Name: Abihani. Always. Never anything else.
· Tagline: The social marketplace.
· Market: Nigeria only at launch.
· Currency: Nigerian Naira (₦). Format ₦38,500. Commas. No decimals.
· Contact email (public): abihaniexpress@gmail.com
· "Express" never appears in any user-facing text. Anywhere.

Colors

· Background: #0B0B0F
· Primary text: #F5F0E6 — bone white
· Secondary text: #B8B2A6 — muted bone
· Crimson: #C41E3A — reserved for the single most important action
  on each screen. Nothing else wears it.
· Gold: #E7C27A — reserved for prices and verified signals. Nothing
  else wears it.
· Success: #4ADE80
· Danger: #FF3B3B

Wordmark

· Bone white, 19px, weight 800, tracking −0.6px
· A 6px crimson blinking dot to its right
· No "A" mark in the feed top-left. Word only.

Parent mark

· The AH angular crimson mark.
· Used only in: splash screen, app icon, About sheet, download page.
· Never in the feed chrome.

Splash

· Pure white background.
· AH mark centred.
· "from" in grey, "Abihani Isa" in crimson below.
· Under 1 second. No bounce. No sound.

Typography

· System stack. Tight tracking on headings. Weight contrast 500/700/800.
· Line height 1.15–1.2 on headlines. 1.4–1.5 on body.

---

MOTION

· Every screen-to-screen navigation uses a horizontal push transition.
  340ms. cubic-bezier(.32, .72, 0, 1).
  Current screen out left, new screen in right. Reverse on back.
· Profile pictures and product images use a shared element
  transition. 300ms. Same curve.
· Reduced-motion preference disables all transitions.
· No network calls during a transition.
· Sheets, toasts, and tab switches keep their own motion.
  Sheets slide up. Toasts float up. Tabs fade.

---

SMART BACK NAVIGATION

· On-screen back arrow, browser back, Android hardware back,
  iOS edge-swipe — all do the same thing. Always.
· On the home tab, back does nothing.
· On any tab other than home, back returns to home.
· On sheets and viewers, back closes them.
· One navigation stack. One navigateBack() function.
· No screen invents its own back logic.

---

COPY RULES

· The word for all text on screen is copy.
· The word for a condition is state (loading, empty, error,
  success, focused, disabled, filled).
· Together: state copy.
· Every state has copy. Never blank.
· Every state copy is hardcoded in src/labels/. Never fetched, never
  generated, never empty.
· Every state has shape — icon, motion, colour.
· No jargon. No marketing speak. No filler.
· Every word passes: would a senior designer at Apple ship this word?

---

INPUT FIELDS

· Free-text inputs get autocomplete="off", a neutral name,
  data-lpignore="true", data-form-type="other".
· No forcing of autocapitalize, autocorrect, or spellcheck.
· Let the phone's own keyboard behave as it normally does.
· Placeholder 000000 for all OTP fields. Centered. Equal padding.

---

DISMISSAL RULES

Applies to every sheet, modal, dialog, action panel, and toast — now
and forever.

1. Every dismissible surface has a visible X or Cancel. Important ones
   have both.
2. Tapping outside closes informational sheets and action panels.
3. Destructive confirmations (delete, ban, confirm received, release
   money, delete account) do not close on outside tap. The user must
   choose.
4. Toasts auto-dismiss at 2.4s (short) or 4s (long). Never tapped to
   dismiss. Never stacked more than 2.
5. Informational sheets dismiss on swipe-down. Confirmations do not.
6. Back gesture closes topmost sheet → then modal → then navigates
   back one screen.
7. Nothing refuses to close. No trap sheets. In-progress payments or
   uploads ask before cancelling.
8. Every sheet that collects input has a Cancel or X.
9. Every toast under 60 characters. Longer text is a sheet, not a toast.

---

MEDIA PICKER

· Photos: multi-select. Minimum 1. Maximum 5. In one gesture.
· Video: single select only. 1 video per post.
· No mixing photos and video in the same post.
· Over-limit copy: "Up to 5 photos. You selected 6."
· Second video: "One video per post."
· Photo added to a video post: "This post already has a video."
· Placeholder when empty: "Add photos or a video."
· Placeholder when partial: "Add more photos (n/5)."

---

TERMS AND CONSENT

· One line on the signup screen, above the Continue button:
  By continuing, you agree to our Terms and Privacy Policy.
· "Terms" and "Privacy Policy" are tappable. Open as sheets.
· Tapping Continue = acceptance. Logged. Version-dated.
· No checkbox. No separate screen. No "I have read" theatre.
· If a user does not accept, they do not proceed. There is no soft
  wall. There is no hidden allow.
· If Terms materially change, users are asked to re-accept once on
  next open. No continue button until they do.
· Terms sheet: under 800 words. Human voice. Readable in under 3
  minutes. Reviewed by a Nigerian lawyer before launch.

---

THE WIRED BULB RULE

Every control must satisfy all seven. If any fails, the control does
not ship.

1. Connected — actually does the thing.
2. Shows it happened — visible feedback.
3. Shows its state — on/off, mode, expanded.
4. Tells the affected user — inline message, ticket, or state.
5. Label matches action — no vague words.
6. Right scope — per-user vs global. Never mixed.
7. Writes to the journal — who, what, when, why.

---

SCREEN ORGANIZATION

· Never cram. If content does not fit cleanly, split into scrollable
  sections. Each section has one clear purpose. Generous spacing.
· Scroll is premium. Clutter is not.
· On desktop, if two columns fit cleanly without clutter, use them.
  If not, stay single-column with whitespace.
· Every sheet and screen declares before it is built:
  · Trigger — what makes it appear
  · Position — where it appears
  · Priority — if two could appear, which wins
  · Exit — how it is dismissed

---

FOLDER STRUCTURE

```
src/
├── config/        app, urls, features, timing, limits, env
├── labels/        buttons, messages, headings, notices
├── theme/         tokens, base, utilities
├── constants/     countries, banks, nigeria-locations
├── engine/        order, escrow, dispute, payment, validation, ranking
├── services/      api, auth, order, post, media
├── hooks/         useAuth, useOrder, useTimer, useToast
├── components/
│   ├── common/    Button, Input, Sheet, Toast, Spinner, Skeleton, EmptyState, ErrorState
│   ├── feed/      Post, Rail, InfoCard, Carousel
│   ├── order/     OrderRow, Thread, Composer, Countdown
│   ├── profile/   Cover, Avatar, Stats, TrustRow, Grid
│   ├── create/    MediaPicker, PriceField, ShipFromField
│   ├── settings/  BankSetup, CityPicker, RegionManager
│   └── admin/     MetricTile, UserRow, ReportCard
├── screens/       Feed, Discover, Orders, Thread, Profile, Create,
│                  Settings, Admin, Support, Signup, Splash
├── store/         auth, feed, order
├── types/         user, post, order, message, api
├── utils/         formatNaira, formatDate, parseError, normalizePhone
├── router.tsx
├── App.tsx
└── main.tsx
```

Every file under 300 lines. Every function under 50 lines. No magic
numbers. No magic strings.

---

ENVIRONMENT VARIABLES

Read from .env.local in development and from the Cloudflare Pages
dashboard in production. Only public-safe values. Never a secret.

Required keys:

· VITE_API_BASE_URL
· VITE_SUPABASE_URL
· VITE_SUPABASE_ANON_KEY
· VITE_R2_PUBLIC_URL

---

SEO AND PWA

· index.html includes meta title, description, og:image,
  twitter:card, canonical, theme colour, viewport.
· OG title: "Abihani — The social marketplace"
· OG description: "Discover. Like. Buy. Inside one feed."
· OG image: 1200×630 PNG. Crimson background, bone-white "Abihani"
  centred. /public/og-image.png.
· robots.txt allows Googlebot on public pages. Blocks admin.
· sitemap.xml generated at build time. Every public seller and post.
· Real alt text on every image — product name and seller.
· Structured data: Product, Person, Organization schemas.
· One <h1> per page. Real <h2>, <h3>.
· Clean slugs. Never query parameters.
· Canonical tag on every page.
· Core Web Vitals green: LCP < 2.5s, CLS < 0.1, INP < 200ms.
· HTTPS enforced. HSTS header.
· PWA manifest: name, short_name, description, theme_color
  (#0B0B0F), background_color (#FFFFFF), display standalone,
  orientation portrait, icons 192/512 maskable.
· Service worker caches the app shell.
· Installable on Android Chrome, iOS Safari, desktop Chrome, desktop
  Edge.
· Wrappable as TWA for Play Store. Wrappable as iOS app.

APK download page

· Path: /download
· Title tag: "Download Abihani for Android"
· OG description: "The social marketplace. Discover. Like. Buy."
· Content:
  · AH mark 64px, crimson, centred
  · "Abihani" 22px, bone white, weight 800
  · "The social marketplace" 13.5px, muted bone
  · Button: "Download for Android" — full-width crimson pill
  · Small text: "Free. Android 8 and above."
  · Two small lines: "Using an iPhone? Open the web version." and
    "By downloading, you agree to the Terms."
· The button downloads the APK from Cloudflare R2.
· The APK is never shared as a raw file link. Always via this page.

---

SPEED

· Initial load under 500KB.
· Under 2s on 4G. Under 1s on WiFi.
· Lazy images below fold. Preloaded hero.
· WebP images. Quality 80.
· CDN edge everywhere. Cloudflare.
· No heavy libraries. No jQuery. No moment.js. No lodash.

---

SECURITY

· No email, phone number, API key, password, service-role key, admin
  number, JWT secret, Resend key, R2 secret is ever hardcoded.
· Everything comes from environment variables.
· .env.local never committed. In .gitignore.
· Any file the frontend reads contains only public-safe values.
· Frontend talks to Supabase directly only for auth (OTP verify,
  session token). Everything else goes through the backend.
· No API returns secrets, tokens, recovery codes, or admin data to
  the client.
· Even in development, behave like production with respect to
  secrets.

---

THE COMPLETE-PRODUCT RULE

Not mentioned does not mean not needed. Every omission is a gap to be
filled, not a decision to skip.

Before any stage begins, every possible state, action, failure, and
context is listed. Every one gets an answer. Only then does the stage
prompt get written.

· Every screen has every state: loading, empty, error, success,
  focused, disabled, filled, partial, offline, slow network,
  permission denied.
· Every control has every state: normal, pressed, focused, disabled,
  loading, success, failure.
· Every flow has every branch: offline, timeout, API failure, double
  tap, back mid-flight, rotate, background, session expiry, dead
  link, deleted post with open order, duplicate dispute, failed bank
  lookup, duplicate webhook, expired OTP, wrong recovery code,
  duplicate signup, self-linking as second account.

---

WHAT NOT TO DO

· Do not add features not asked for.
· Do not remove features that were asked for.
· Do not redesign. Do not invent colours. Do not invent copy. Do not
  invent motion.
· Do not skip testing because a fix looks obvious.
· Do not fill gaps that have no trigger. A social marketplace does not
  require NIN for signup.
· Do not use "Express" in any user-facing text.
· Do not put secrets in code. Ever.
· Do not fake a state. If it says it worked, it worked.

---

STAGES (in order)

1. Setup — folders, configs, tailwind, tokens, README, RULES.
2. Shell — bottom nav, tabs, routing, push transition, empty
   screens.
3. Accounts — signup, email OTP, recovery code, add/switch
   account, relationship lock.
4. Ranking Engine — pure logic. No UI.
5. Feed — post render, rail, info card, viewer, swipe-to-profile.
6. Settings — location, payout method, delivery regions,
   notifications.
7. Create — media picker, price, stock, ship-from, hashtags,
   publish.
8. Orders — buy, escrow, thread, composer, countdown, disputes.
9. Profile — cover, avatar, stats, trust row, tabs, edit, lists.
10. Seed & Polish — demo data labelled. Every state verified.
11. Admin & Support — kill switches, seller gating, notices,
    superpowers, algorithm tuning, journal, tickets, reports.

Every stage depends only on the stages before it. No carpenter before
the walls. Every stage has a checklist. Every stage is tested against
its checklist only. A bug fix touches only the files owned by the
stage where the bug lives.

---

RULES AND GAPS

· RULES.md — every locked decision, numbered 1 through 306.
  This is the law. Read it before every stage.
· GAPS.md — every open, deferred, or closed gap. Never fill a gap
  that has no trigger. Never invent a requirement.

---

Build what is true. Not what sounds good.

---

That is the README. Save it as abihani-frontend/README.md. Commit.

The backend README follows the same discipline but shorter — it only handles what Supabase cannot. I will write it in the next message if you say the word.

Then we begin Setup.