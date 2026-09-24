# Abihani — Frontend

The social marketplace. Nigeria first.

One account. No buyer mode. No seller mode. The feed is the center.
Every post can be bought. Escrow protects every order.

---

## What This Repo Is

The frontend for Abihani. Built with React, Vite, TypeScript, and
Tailwind. Deploys to Cloudflare Pages.

---

## READ FIRST — FROZEN DECISIONS

Every decision below is law. Do not change it. Do not invent around
it. Do not redesign it. If you believe something should change,
propose it in your reply, explain why, and wait for approval. Only
proceed after the founder says yes.

### Identity

- Name: Abihani
- Tagline: The social marketplace
- Market: Nigeria only at launch
- Currency: Nigerian Naira (₦). Format ₦38,500. Commas. No decimals.

### Colors

- Background: #0B0B0F
- Primary text: #F5F0E6 (bone white)
- Secondary text: #B8B2A6 (muted bone)
- Crimson: #C41E3A — reserved for the single most important action on each screen
- Gold: #E7C27A — reserved for prices and verified signals
- Success: #4ADE80
- Danger: #FF3B3B

Crimson is never scattered. When it appears, it means something.
Gold is only for money and verified signals.

### Wordmark

- Bone white, 19px, weight 800, tracking −0.6px
- A 6px crimson blinking dot to its right
- No "A" mark in the feed top-left. Word only.

### Product

- One account for everyone. No buyer mode, no seller mode.
- Feed is the center. Full-screen vertical scroll-snap. One post per viewport.
- Posts without a price are just social posts. Posts with a price are shoppable.
- Hashtags do all classification. No categories.
- Three order states only: Paid → Shipped → Done.
- Three escrow states only: Paid → Shipped → Done. No "Delivered."
- Money releases only when buyer confirms. Otherwise auto-releases after the delivery window.
- No wallet. No balance. No general DM. Conversation lives inside order threads or pre-order negotiations.
- Disputes freeze money. Admin reviews.
- Demo content, if any, is labelled "Demo" everywhere. Buy greyed.

### Accounts

- Signup is email-only for launch. Field label: Email. Placeholder: you@example.com. Button: Continue.
- No phone OTP at launch.
- Email OTP via Supabase Auth + Resend.
- Recovery code, 8 digits, shown once.
- Add account, switch account: only accounts on this device, only accounts sharing the same person.
- Log out clears added accounts from this device.
- Country picker shows Nigeria only.

### Feed

- Right rail sits above the info card, shifted down. Items: avatar+plus, follow, like, comment, share, save, more.
- Info card bottom-anchored. Collapsed + expanded. Price and Buy together.
- Swipe left on the last image (or on a single-image post) opens the seller's profile. Real horizontal slide.
- Post viewer: vertical scroll through that seller's posts.

### Create Post

- Media picker first. Up to 5 photos or 1 video.
- Description, price, stock, ship-from, hashtags.
- Hashtags required. Inline error if missing.
- Ship-from pre-fills from Settings Location. Quiet gold chip "Ships from X" only if it differs from the profile location.

### Orders

- Three statuses. Never more.
- Order thread has composer: attach left, input middle, send right. All three always visible.
- Countdown in thread header. Crimson normally, gold under 48h, crimson-danger under 24h.
- Help question-mark icon in thread header, same position as Orders list.
- Attach button in every composer.

### Profile

- Cover band ~140px, avatar overlaps bottom edge, everything else sits below.
- Cover tap opens file picker.
- Own profile: Edit, Share. Tabs: Posts, Liked, Saved.
- Other profile: Follow, View posts. Tab: Posts only.
- Three-dot menu on other profiles only. Never on own.
- Sales always shows. Rating only after 3 sales. Disputes only if > 0.
- Avatar must not collapse. Fixed width and height. No clipping.

### Bottom Nav

- Solid crimson capsule. Fully opaque. No glass. No blur. No white line. No gradient veil.
- Icons and labels: bone white. Inactive 92%. Active 100% and larger.
- Active indicator: 5px bone-white dot under the active label.
- Center plus button: gold background, crimson plus sign. Slightly raised.
- Orders unread dot: bone white, slow 2s pulse.
- No darkness behind the capsule. Feed runs edge to edge.

### Motion

- Every screen-to-screen navigation uses a horizontal push transition. 340ms, cubic-bezier(.32, .72, 0, 1). Current screen out left, new screen in right. Reverse on back.
- Profile pictures and product images use a shared element transition. 300ms, same curve.
- Reduced-motion preference disables all transitions.
- No network calls during a transition.
- Sheets, toasts, and tab switches keep their own motion.

### Smart Back Navigation

- Every screen with an on-screen back arrow: phone native back does the same thing as that arrow.
- Browser back button: same as arrow.
- Android hardware back: same as arrow.
- iOS swipe-from-edge: same as arrow.
- On the home tab, back does nothing.
- On any tab other than home, back returns to home.
- On sheets and viewers, back closes them.
- One navigation stack. One `navigateBack()` function. No screen invents its own back logic.

### Copy Rules

- The word for all text on screen is **copy**.
- The word for a condition is **state** (loading, empty, error, success, focused, disabled, filled).
- Together: **state copy**.
- Every state has copy. Never blank.
- Every state copy is hardcoded in `src/labels/`. Never fetched, never generated, never empty.
- Every state has shape — icon, motion, colour.
- The filter: does this sound like a decision we made, or an apology we owe?
- No jargon. No marketing speak. No filler.

### Input Fields

- Free-text inputs get `autocomplete="off"`, a neutral `name`, `data-lpignore="true"`, `data-form-type="other"`.
- No forcing of autocapitalize, autocorrect, or spellcheck.
- Placeholder 000000 for all OTP fields. Centered. Equal left and right padding.

### Security — Non-Negotiable

- No email, phone number, API key, password, service-role key, admin number, JWT secret, Resend key, R2 secret is ever hardcoded.
- Everything comes from environment variables.
- `.env.local` never committed. In `.gitignore`.
- Any file the frontend reads contains only public-safe values.
- No API returns secrets, tokens, recovery codes, or admin data to the client.
- Even in development, behave like production with respect to secrets.

### Standards

- Every file under 300 lines. Every function under 50 lines.
- No magic numbers. No magic strings.
- Every file has one job. Every name tells the truth.
- Every state has shape and copy.
- Nothing faked. Nothing dim where it must be bright. Nothing blocked where it must be visible.

---

## Folder Structure

src/config/        — app, urls, features, timing, limits
src/labels/        — buttons, messages, headings, notices
src/theme/         — tokens, base, utilities
src/constants/     — countries, banks, nigeria-locations
src/engine/        — order, escrow, dispute, payment, validation
src/services/      — api, auth, order, post, media
src/hooks/         — useAuth, useOrder, useTimer, useToast
src/components/    — common, feed, order, profile, create, settings, admin
src/screens/       — Feed, Discover, Orders, Thread, Profile, Create, Settings, Admin, Support, Signup, Splash
src/store/         — auth, feed, order
src/types/         — user, post, order, message
src/utils/         — formatNaira, formatDate, parseError, normalizePhone

Every file under 300 lines. Every file name tells you what lives inside.

---

## Environment Variables

Frontend reads from `.env.local` in development, and from the
Cloudflare Pages dashboard in production.

Required keys:
- VITE_API_BASE_URL
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_R2_PUBLIC_URL

Only public-safe values. Never a secret.

---

## Development

```bash
npm install
npm run dev