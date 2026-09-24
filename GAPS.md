# Abihani — GAPS.md

Everything not yet decided. A worklist, not a wishlist.

A gap is not a decision against something. It is something we have
not decided yet. Nothing is built for a gap unless a real trigger
exists and the founder approves.

Read this before every stage. Add new gaps here. Never fill a gap
without a trigger.

---

## HOW TO READ THIS FILE

Each gap has:

- Status: OPEN, DEFERRED, or CLOSED — no action needed.
- Why it exists.
- Trigger: what has to be true for it to be filled.

If the trigger does not happen, the gap stays as it is. Nothing is
built for it. Nothing is invented for it.

If a stage opens a new gap, it goes in this file. Marked OPEN. With a
trigger.

The file is appended to. Nothing is deleted. A closed gap stays closed
forever.

---

## OPEN — waiting on a trigger

### Payment provider

- Status: OPEN
- Why it exists: three candidates (Paystack, Flutterwave, Monnify). The right choice depends on split settlement cost, webhook reliability, refund API quality, and settlement timing.
- Trigger: launch week. When the founder is ready to accept real money.
- What happens then: create merchant account, register settlement bank account, configure split (99% seller, 1% Abihani), integrate in payment.service.ts.

### Custom domain

- Status: OPEN
- Why it exists: `abihani.pages.dev` is free and works. A custom domain is optional and chosen later.
- Trigger: launch day, when the product is working and the founder decides whether to buy or keep the free URL.
- What happens then: point domain DNS to Cloudflare. Add domain in Cloudflare Pages. Done.

### Nigerian lawyer review of Terms and Privacy Policy

- Status: OPEN
- Why it exists: escrow and consumer protection are regulated in Nigeria. Legal soundness requires a real lawyer.
- Trigger: before public launch.
- What happens then: send the drafts to a Nigerian lawyer. Receive edits. Apply the edits. Set the effective date.

### Seed content — first sellers and posts

- Status: OPEN
- Why it exists: a social marketplace with no content on day one is a dead marketplace. Five to ten labelled demo sellers make it feel alive.
- Trigger: launch week.
- What happens then: source stock photos (Unsplash) and videos (Pexels or Storyblocks). Label every demo post "Demo — for display only." Grey the Buy button on demo posts. Seed the accounts via one script. Never fake likes, followers, purchases, or real-looking sellers.

### Supervisor rotation / support staffing

- Status: OPEN
- Why it exists: the founder personally answers every support message for the first months. This does not scale.
- Trigger: after the first one hundred orders, or when response times exceed 24 hours.
- What happens then: define a support rotation. Document the process. Hire or delegate.

### Play Store listing

- Status: DEFERRED
- Why it exists: the PWA works on Android without a store. Play Store listing is optional and adds value later.
- Trigger: after product-market fit. After the founder decides the app is stable enough for the store.
- What happens then: use PWABuilder to wrap the PWA as a TWA. Publish on Google Play. Apple App Store is a separate decision later.

### Second country

- Status: DEFERRED
- Why it exists: Abihani launches Nigeria-only. Serving another country requires its own banks, KYC rules, payout rails, tax registration, and escrow compliance.
- Trigger: after Nigeria is fully served and revenue justifies expansion.
- What happens then: add the country to constants/countries.ts, add its banks, add its payment provider coverage, register the legal entity in that country. Serve it fully. Do not show a placeholder country in the picker.

### Phone OTP

- Status: DEFERRED
- Why it exists: Africa's Talking is not free. Email OTP is free via Resend. Email OTP is the correct launch path.
- Trigger: when revenue justifies the SMS cost, and when phone OTP adds real value.
- What happens then: integrate Africa's Talking. Add phone as a second identity channel. The signup label becomes "Phone or email."

---

## CLOSED — no action needed

### NIN or identity verification for signup

- Status: CLOSED — no action needed
- Why: a social marketplace does not require NIN for signup. Requiring NIN adds friction that kills the feed. It is not a legal requirement in Nigeria for a general marketplace. If a payment provider ever requires KYC for payouts above a threshold, that KYC applies only to the payout flow, not to signup.
- Trigger: only if a law or payment provider contract mandates it.
- Decision if that happens: apply KYC only at the payout step. Never at signup. Never at the feed.

### Shadow bans

- Status: CLOSED — no action needed
- Why: a shadow ban is a lie. If a user is being hidden from the feed, they are being blocked or reported. Never silently hidden.
- Trigger: none. This does not become necessary.
- Decision if it ever is proposed: refuse. Use block or report controls instead.

### Watermarks on downloads

- Status: CLOSED — no action needed
- Why: watermarks degrade the user's experience and offer no security benefit that the OG tags and content do not already provide.
- Trigger: none.
- Decision if it ever is proposed: refuse.

### Fake likes, fake followers, fake purchases, fake users

- Status: CLOSED — no action needed
- Why: they are lies. They destroy trust. They do not help the platform.
- Trigger: none.
- Decision if it ever is proposed: refuse.

### Wallet / stored balance / "fund your account"

- Status: CLOSED — no action needed
- Why: unnecessary. Escrow holds money per order. Nothing else needs a balance.
- Trigger: none.
- Decision if it ever is proposed: refuse.

### Cart

- Status: CLOSED — no action needed
- Why: one item, one order, one escrow. A cart multiplies complexity with no real benefit.
- Trigger: none.
- Decision if it ever is proposed: refuse.

### General DM / inbox

- Status: CLOSED — no action needed
- Why: conversation belongs inside order threads and pre-order negotiations. A general inbox would become a spam channel and an abuse vector.
- Trigger: none.
- Decision if it ever is proposed: refuse.

### Categories / taxonomy dropdowns

- Status: CLOSED — no action needed
- Why: hashtags do all classification. Categories introduce taxonomy maintenance, category-trolls, and division of discovery.
- Trigger: none.
- Decision if it ever is proposed: refuse.

### Discount codes

- Status: CLOSED — no action needed
- Why: they invite abuse and complicate escrow math. Private offers cover negotiation. Nothing else is needed.
- Trigger: none.
- Decision if it ever is proposed: refuse.

### Auto-payment on R2 overage

- Status: CLOSED — no action needed
- Why: no surprise bills. Ever. Manual founder decision only when upgrading from free tier.
- Trigger: none.
- Decision if it ever is proposed: refuse.

---

## DEFERRED — not launch, but will exist later

### Phase 2 courier partnership

- Status: DEFERRED
- Why it exists: at launch, sellers use local bus parks (Nigeria's real logistics network). Phase 2 is a partner with one courier for API-driven tracking and cheaper rates.
- Trigger: after the first five hundred orders, or when the founder identifies a courier that covers most of Nigeria reliably.
- What happens then: integrate the courier's API. Add tracking IDs to order threads. Only for sellers who opt in.

### Phase 3 Abihani pickup points

- Status: DEFERRED
- Why it exists: owned pickup points in major cities reduce cost and increase trust. They require capital, staff, and legal presence.
- Trigger: after Phase 2 is stable and revenue justifies physical presence.
- What happens then: lease points in Lagos, Abuja, Kano, Port Harcourt. Add pickup-as-delivery-option in checkout.

### Pinned support ticket notifications

- Status: DEFERRED
- Why it exists: pinning a ticket to the top of a user's Orders list is useful for urgent cases but adds surface area.
- Trigger: after the first one hundred orders, if the founder finds it necessary.
- What happens then: add the pin control to Admin → User → Send notice.

### Support context auto-tagging

- Status: DEFERRED
- Why it exists: opening a support ticket from inside an order thread should pre-tag it with that order's number.
- Trigger: when support volume justifies the convenience.
- What happens then: add the auto-tag in the ticket creation flow.

---

## RULES FOR ADDING A NEW GAP

1. Write one line that names it.
2. State why it exists.
3. State what has to be true for it to be filled (the trigger).
4. If nothing triggers it, mark it CLOSED — no action needed. Never build for it.
5. Never fill a gap without the founder's approval, even if the trigger has happened.
6. Never delete a gap. Appended only.

---

## THE RULE THAT PROTECTS THE PRODUCT

Never fill a gap that has no trigger. Never invent a requirement. A
social marketplace does not require NIN for signup. It does not need
a wallet. It does not need a cart. It does not need a general inbox.

If a gap has no trigger, it stays closed. Nothing is built for it.

---

## Build what is true. Not what sounds good.