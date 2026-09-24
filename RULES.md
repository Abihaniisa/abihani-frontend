# Abihani — RULES.md

Every locked decision. Numbered. Concise. The law.

If a rule is not here, it is not locked. Chat is not the record.
This file is. Read it before every stage. Change nothing without
founder approval.

---

## IDENTITY

1. Name: Abihani. Tagline: The social marketplace. Market: Nigeria only at launch. Currency: Nigerian Naira (₦). Format ₦38,500. Commas. No decimals.
2. Background #0B0B0F. Primary text #F5F0E6. Secondary #B8B2A6. Crimson #C41E3A. Gold #E7C27A. Success #4ADE80. Danger #FF3B3B.
3. Crimson is reserved for the single most important action on each screen. Gold is reserved for prices and verified signals. Nothing else wears them.
4. Wordmark: bone white, 19px, weight 800, tracking −0.6px, with a 6px crimson blinking dot to its right. No "A" mark in the feed top-left. Word only.
5. Parent mark: the AH angular crimson mark. Used in splash, app icon, About sheet, download page. Never in the feed chrome.
6. Splash: pure white background. AH mark centred. "from" in grey, "Abihani Isa" in crimson below. Under 1 second. No bounce. No sound.
7. Font stack: system stack. Tight tracking on headings. Weight contrast 500/700/800. Line height 1.15–1.2 on headlines, 1.4–1.5 on body.

---

## PRODUCT THESIS

8. Social marketplace. Not a store with a social layer. A social feed where every post can be bought.
9. One account for everyone. No buyer mode. No seller mode. Anyone can post, buy, sell.
10. Feed is the center. Full-screen vertical scroll-snap. One post per viewport.
11. Posts without a price are social posts. Posts with a price are shoppable.
12. Hashtags do all classification. No global categories.
13. Comments are the reviews. One thread per post. Buyers who paid carry "Verified Purchase." Sellers carry "Seller."
14. No wallet. No balance. No general DM. Conversation lives inside order threads or pre-order negotiations.
15. Demo content is labelled "Demo" everywhere. Buy greyed. Never hidden. Stop using demo at 50 real sellers or 500 real posts.

---

## ACCOUNTS

16. Signup is email-only at launch. Field label: Email. Placeholder: you@example.com. Button: Continue.
17. No phone OTP at launch. Africa's Talking is not free.
18. Email OTP via Supabase Auth + Resend (free 3,000/month).
19. Recovery code: 8 digits. Shown once. Last door. Hashed server-side. Rotates on use.
20. Add account, switch account: only accounts on this device, only accounts sharing the same person. Relationship-locked.
21. Log out clears added accounts from this device.
22. Admin account and personal account are the same human, linked in Settings by OTP.
23. Country picker shows Nigeria only. Every country shown must be fully servable. Never a placeholder country.
24. Signup flow: country (Nigeria only) → email → OTP → recovery code → feed.
25. One-tap login. No passwords at launch.

---

## ACCOUNT SECURITY

26. No email, phone number, API key, password, service-role key, admin number, JWT secret, Resend key, R2 secret, payment provider secret is ever hardcoded.
27. Everything comes from environment variables. .env.local in development. Dashboard in production. Never committed.
28. Any file the frontend reads contains only public-safe values. Every API response is free of secrets, tokens, recovery codes, admin data.
29. Even in development, behave like production with respect to secrets.
30. Every route that touches money or admin actions requires auth and authorization middleware.
31. Every public endpoint is rate-limited via Redis.

---

## FEED

32. Full-screen vertical scroll-snap. One post per viewport.
33. Right rail anchored above the info card. Items: avatar+plus, follow, like, comment, share, save, more.
34. Info card bottom-anchored. Collapsed + expanded. Price and Buy together. Never separated.
35. Swipe left on the last image, or on a single-image post, opens the seller's profile. Real horizontal slide.
36. Post viewer: vertical scroll through that seller's posts. Never a single post.
37. Media: vertical fills. Square centres with blur backdrop. Horizontal letterboxes. Never crop the seller's work.
38. Carousel: up to 5 photos. Dots at the bottom of the media area.
39. Tap-to-like. Double-tap for heart burst. Tap-to-comment, tap-to-save, tap-to-share all work with feedback.
40. Following tab = followed accounts, most recent first. For You tab = ranking engine, all posts, ranked by score.

---

## FOR YOU RANKING ENGINE

41. Every post has a score. Higher score = higher position in For You.
42. Score = (likes × 1) + (comments × 3) + (shares × 5) + (saves × 4) + (views × 0.05) + (full watch time × 0.5) + (followers × 0.1) + (verified ? 5 : 0), all multiplied by a freshness multiplier.
43. Freshness: last 24h × 1.5, last 7d × 1.2, older × 1.0.
44. Posts with an open report are pulled from For You until reviewed.
45. Ranking engine never uses money, personal data, or past purchase history.
46. Small scale: compute on request via SQL. Large scale: precompute every 15 minutes into a post_scores table with an index on score.
47. No black box. Every post's score is viewable in the admin panel.

---

## CREATE POST

48. Media picker is the first element on the screen. Photos or a video, up to 5 photos or 1 video.
49. Description optional. Price optional. Stock optional. Ship-from pre-fills from Settings Location. Hashtags required.
50. Hashtags missing → inline error. Not a toast. Not a modal.
51. Ship-from shows a quiet gold chip "Ships from X" on the post only if it differs from the profile location.
52. Publish. Then navigate to the user's own profile, Posts tab.
53. Media Picker rules: photos multi-select, minimum 1, maximum 5. Video single-select, 1 per post. Never mix photos and video in the same post.
54. Over-limit copy: "Up to 5 photos. You selected 6." / "One video per post."
55. Placeholder when empty: "Add photos or a video." When partial: "Add more photos (n/5)."

---

## COMMENTS AND CHAT

56. Every comment sheet and thread uses skeleton loaders while loading.
57. Error state: icon + "Something went wrong" + "Try again later" + full-width Retry button. Never blank. Never silent.
58. Empty state: icon + message + soft call to action.
59. No network → same error state. Never silent failure.
60. Composer pinned above the keyboard. Text input always visible while typing. Send button always visible.
61. Attach button always visible on the left. Preview stacks above the composer row, never replacing it.
62. Optimistic send. Comment or message appears immediately. On failure, a retry chip appears on that item only.
63. Order thread composer: attach, text input, send. All three always visible.
64. Enter sends the message. Shift+Enter adds a newline.

---

## ORDERS AND ESCROW

65. Three order states only: Paid → Shipped → Done. Never more. Never "Delivered."
66. Escrow: money holds in escrow from Paid until buyer confirms or timer expires.
67. Seller has 3 days to mark Shipped. Otherwise auto-cancel and refund.
68. Seller picks delivery days (2, 3, 5, 7, 10, 14). Default 5.
69. Timer starts on Shipped. Buyer confirms → Done. Otherwise auto-releases at timer end.
70. 24 hours before auto-release, the buyer gets a push notification.
71. Buyer can dispute while Shipped, before auto-release.
72. Dispute freezes money. Admin reviews within 3 days.
73. Cannot skip states. Buyer cannot confirm before seller ships.
74. Confirm-received gate: sheet explains what will happen → 6-digit OTP to buyer's email → confirm releases.
75. Countdown in thread header. Crimson normally. Gold under 48h. Crimson-danger under 24h.
76. Help question-mark icon in thread header, same position as Orders list.
77. Order list row: avatar, name, product name, status word. Crimson dot if unread. No price on the row.
78. Order thread never closes. Conversation continues after Done.
79. Launch period: escrow release timer is 3 days. Grows back to 7 once trust is built.

---

## OFFERS / NEGOTIATION

80. Buyer taps "Ask about this" → private thread tied to that post.
81. Seller taps "Send an offer" → private price.
82. Offer appears only to that buyer. Post price unchanged for everyone else.
83. If buyer never buys, thread archives after 30 days silence. If buyer buys, thread becomes the order thread.
84. Offer also appears as a small banner on that post in the feed, only for that buyer.
85. No public offers at launch. No discount codes. Ever.

---

## PROFILES

86. Own profile: cover band ~140px. Avatar overlaps bottom edge. Everything else sits below.
87. Cover tap opens file picker. Saving shows it immediately.
88. Own profile: Edit, Share. Tabs: Posts, Liked, Saved.
89. Other profile: Follow, View posts. Tab: Posts only.
90. Three-dot menu on other profiles only. Never on own.
91. Sales always shows. Rating only after 3 sales. Disputes only if greater than 0.
92. Avatar must not collapse. Fixed width and height. No clipping. No slivers.
93. Trust row: Sales · Rating · Disputes. All tappable to a list.
94. Verified badge: earned after 3–5 successful orders. Never bought. Never requested.
95. New seller chip: "New seller · 0 completed orders." Disappears after 5 orders.
96. No "buyer" or "seller" labels. Roles are contextual.
97. No public phone, email, or contact info. Contact sharing only inside an order thread.

---

## SEARCH

98. One search bar. No global filters. No category tabs.
99. Search understands hashtags, captions, seller names. Results merge all three, ranked together.
100. Empty state: recent searches + trending searches.
101. Tapping any hashtag jumps to search results for that tag.

---

## SETTINGS

102. Account, Location, Payout method, Recovery code, Add account, Switch account (only if related).
103. Notifications: five toggles, all on. Orders · Messages · Offers · Follows · Comments.
104. Support: Help sheet, Blocked accounts.
105. Danger zone: Log out (clears added accounts), Delete account (blocked if open orders).
106. No password field. No 2FA setup. No theme toggle. No language toggle at launch.

---

## PAYOUT / BANK

107. Choose bank → picker opens → bank selected → account number field auto-focuses.
108. Enter 10 digits → "Verify account" enables.
109. Tap Verify → spinner → account name appears in a gold verification block above the confirm button.
110. Then a separate "Confirm and save" button appears.
111. Editing the account number after verify clears the verified block and disables Confirm until re-verified.
112. No OTP in the bank flow. It is a lookup, not a challenge.
113. Abihani's own fee destination bank account is configured only inside the payment provider's dashboard. It is never stored in Abihani's database. It is never displayed in the admin panel. It is never entered through any screen. No file in the repository contains it. No AI working on Abihani ever sees it, guesses it, or writes it.

---

## BOTTOM NAV

114. Solid crimson capsule. Fully opaque. No glass. No blur. No white line. No gradient veil.
115. Icons and labels: bone white. Inactive 92%. Active 100% and larger.
116. Active indicator: 5px bone-white dot under the active label.
117. Center plus button: gold background, crimson plus sign. Slightly raised.
118. Orders unread dot: bone white, slow 2s pulse.
119. No darkness behind the capsule. Feed runs edge to edge.
120. Five items: Home, Discover, Plus, Orders, You. No labels that imply a mode.

---

## MOTION

121. Every screen-to-screen navigation uses a horizontal push transition. 340ms, cubic-bezier(.32, .72, 0, 1). Current screen out left, new screen in right. Reverse on back.
122. Profile pictures and product images use a shared element transition. 300ms, same curve.
123. Reduced-motion preference disables all transitions.
124. No network calls during a transition.
125. Sheets, toasts, and tab switches keep their own motion. Sheets slide up. Toasts float up. Tabs fade.

---

## SMART BACK NAVIGATION

126. On-screen back arrow, browser back, Android hardware back, iOS edge-swipe — all do the same thing. Always.
127. On the home tab, back does nothing. On any tab other than home, back returns to home.
128. On sheets and viewers, back closes them.
129. One navigation stack. One navigateBack() function. No screen invents its own back logic.

---

## COPY RULES

130. The word for all text on screen is copy. The word for a condition is state. Together: state copy.
131. Every state has copy. Never blank.
132. Every state copy is hardcoded in src/labels/. Never fetched, never generated, never empty.
133. Every state has shape — icon, motion, colour.
134. The filter: does this sound like a decision we made, or an apology we owe?
135. No jargon. No marketing speak. No filler. Every word passes: would a senior designer at Apple ship this word?

---

## INPUT FIELDS

136. Free-text inputs get autocomplete="off", a neutral name, data-lpignore="true", data-form-type="other".
137. No forcing of autocapitalize, autocorrect, or spellcheck. Let the phone decide.
138. Placeholder 000000 for all OTP fields. Centered. Equal left and right padding.

---

## DISMISSAL RULES

139. Every dismissible surface has a visible X or Cancel. Important ones have both.
140. Tapping the scrim outside closes informational sheets and action panels.
141. Destructive confirmations (delete, ban, confirm received, release money, delete account) do not close on outside tap. User must choose.
142. Toasts auto-dismiss at 2.4s (short) or 4s (long). Never tapped to dismiss. Never stacked more than 2.
143. Informational sheets dismiss on swipe-down. Confirmations do not.
144. Back gesture closes topmost sheet → then modal → then navigates back one screen.
145. Nothing refuses to close. No trap sheets. In-progress payments or uploads ask before cancelling.
146. Every sheet that collects input has a Cancel or X.
147. Every toast under 60 characters. Longer text is a sheet, not a toast.

---

## SECURITY

148. No secret ever hardcoded. Ever. In any environment.
149. No API returns sensitive data to the client.
150. Admin data, dispute notes, recovery codes, service keys — never returned to the client.
151. Frontend talks to Supabase directly only for auth (OTP verify, session token). Everything else through the backend.

---

## TERMS AND CONSENT

152. One line on signup, above Continue: "By continuing, you agree to our Terms and Privacy Policy."
153. "Terms" and "Privacy Policy" are tappable. Open as sheets.
154. Tapping Continue = acceptance. Logged. Version-dated.
155. No checkbox. No separate screen. No "I have read" theatre.
156. If a user does not accept, they do not proceed. No soft wall. No hidden allow.
157. If Terms materially change, users re-accept once on next open. No continue button until they do.
158. Terms sheet: under 800 words. Human voice. Readable in under 3 minutes. Reviewed by a Nigerian lawyer before launch.

---

## ADMIN DASHBOARD — MASTER SWITCHES

159. Buy and Sell: Active / Paused. Paused greys every Buy button platform-wide. Gold banner at top of feed: "Buy and sell is paused. Browse freely. We will resume soon." Existing escrow untouched. Journaled.
160. Seller default: Restricted / Open. Determines new signups' ability to sell. Journaled.
161. Disputes: Accepting / Frozen. Freezes new disputes. Existing continue. Journaled.
162. New signups: Open / Closed. Journaled.

---

## ADMIN DASHBOARD — METRICS

163. Users today / this week / this month.
164. Orders today / this week / this month.
165. GMV today / this week / this month.
166. Open disputes. Revenue (1%). Tickets open. Reports open.

---

## ADMIN DASHBOARD — TABS

167. Users. Orders. Tickets. Reports. Journal. Founder.
168. Every row is a record. Tapping opens the full record.
169. Nothing crammed. Scroll is the answer. Never glue every control onto one screen.

---

## ADMIN DASHBOARD — PER-USER CONTROLS

170. Can buy — on/off. Journaled.
171. Can sell — on/off. Journaled.
172. Can post — on/off. Journaled.
173. Can comment — on/off. Journaled.
174. Can message — on/off. Journaled.
175. Verified badge — on/off. Journaled.
176. Suspend — reversible lockout. Journaled.
177. Ban — permanent. Journaled.
178. Reset phone / email. Journaled.
179. Send official notice — via support ticket, professional tone. Journaled.
180. Add private note — admin-only, invisible to user. Journaled.
181. View all orders. View all disputes. View all messages.

---

## ADMIN DASHBOARD — SELLER OVERRIDES

182. Two controls: "Seller default" and "Seller overrides." Both always present. Never mixed.
183. Default Restricted → new signups cannot sell until approved.
184. Default Open → new signups can sell immediately.
185. Override Allow → this user can sell, always, regardless of default.
186. Override Block → this user cannot sell, always, regardless of default.
187. Search for a user by display name, username, or phone. Results show avatar, name, handle. One tap to approve or revoke.
188. Approving sends a support ticket: "Your seller access has been approved."
189. Revoking sends a support ticket: "Your seller access has been paused. Existing orders continue."

---

## ADMIN DASHBOARD — DISPUTES

190. Three actions only: Release to seller, Refund buyer, Hold for more info.
191. Each writes to the journal. Each sends a support ticket to both parties explaining the outcome.

---

## ADMIN DASHBOARD — JOURNAL

192. Every action, immutable, searchable, downloadable as CSV. Never deletable.
193. Every toggle, every decision, every change. Timestamp, admin ID, action, result.

---

## OFFICIAL NOTICES

194. Appears once every 15 posts. At most once per user per day.
195. Shape: like a post. Thin gold line on left edge. Small gold circle with megaphone icon. No sender. No likes. No comments. No saves.
196. Title, message, optional single CTA. Swipe left to dismiss.
197. Authoring: Admin → Notices. Title, message, CTA label, CTA link, schedule, scope.
198. Publish requires at least one of: title, message, or CTA. Nothing else is mandatory.
199. Journaled. Analytics: users saw, dismissed, tapped CTA.

---

## FOUNDER SUPERPOWERS — PERSONAL ACCOUNT ONLY

200. Add followers to your own profile. Invisible. Own account only.
201. Add likes to your own posts. Invisible. Own posts only.
202. Add comments to your own posts. Invisible. Own posts only.
203. Feature one of your own posts. Pins to top of For You for set days. Journaled.
204. Boost one of your own posts. Score multiplier for set days. No visible badge. Journaled.
205. Rule: only on your own account. Never on a fake account. Never to make a small seller look bigger than a real one.

---

## ADMIN SUPERPOWERS

206. Feature any post platform-wide. Small gold "Featured" badge. Journaled.
207. Push any post to go viral. Score multiplier for a window. No badge. Journaled.
208. Push any user's profile to viral. Posts get a boost for a window. Journaled.
209. Promote a post to a specific user group (for example, Lagos only). Journaled.
210. Pin a support ticket to top of a user's Orders list. Journaled.
211. Reply as "Abihani" (founder) not as "Abihani Support." Used sparingly. Journaled.
212. Mark a user as "Trusted." Unlocks higher limits. Admin-visible only. Journaled.
213. No shadow bans. Ever. If a user is being hidden, they are being blocked or reported. Never silently hidden.

---

## THE WIRED BULB RULE

214. Every control must satisfy all seven. Connected. Shows it happened. Shows its state. Tells the affected user. Label matches action. Right scope. Writes to the journal.
215. A control that fails any one of the seven does not ship. It is removed until wired.

---

## ELEGANCE RULE

216. One button where one button is enough. Two buttons where two are truly needed. Destructive or rare → one tap deeper. Common or safe → surface. Never crammed. Never scattered.
217. Scroll is not a failure. Scroll is premium. Nothing is glued into one crowded screen.
218. If a control feels wrong in Preview, it moves. No control is stuck because "it was designed that way."

---

## PREMIUM STANDARD

219. Premium. World-class. Trillion-dollar standard. Every button, every label, every state, every screen. No exceptions.
220. Every element earns its place. Every word is chosen. Nothing cheap. Nothing lazy. Nothing "fine for now."
221. If a design is not bulletproof and the founder says change it, change it. If a design is bulletproof and the founder says change it, say so first, then change it if still asked.

---

## RESPONSIVENESS

222. Every screen works on 320, 375, 414, 768, 1024, 1280, 1440, 1920.
223. Mobile-first. Tablet adapts. Desktop centred with sensible max-width.
224. Safe-area-inset respected on iPhone notch and Android cutouts.
225. Nothing clips, nothing overflows horizontally, nothing breaks on rotation.

---

## SEO AND PWA

226. index.html includes meta title, description, og:image, twitter:card, canonical, theme colour, viewport.
227. robots.txt allows Googlebot on public pages. Blocks admin and private routes.
228. sitemap.xml generated at build time. Every public seller and post.
229. Real alt text on every image — product name and seller.
230. Structured data: Product, Person, Organization schemas.
231. One h1 per page. Real h2, h3.
232. Clean slugs. Never query parameters.
233. Canonical tag on every page.
234. Core Web Vitals green: LCP < 2.5s, CLS < 0.1, INP < 200ms.
235. HTTPS enforced. HSTS header.
236. PWA manifest: name, short_name, description, theme_color #0B0B0F, background_color #FFFFFF, display standalone, orientation portrait, icons 192/512 maskable.
237. Service worker caches the app shell.
238. Installable on Android Chrome, iOS Safari, desktop Chrome, desktop Edge.
239. Wrappable as TWA for Play Store. Wrappable as iOS app.
240. APK download page at /download. Title: "Download Abihani for Android." OG description: "The social marketplace. Discover. Like. Buy." Content: AH mark 64px crimson centred, "Abihani" 22px bone white weight 800, "The social marketplace" 13.5px muted bone, "Download for Android" full-width crimson pill, "Free. Android 8 and above.", two small lines "Using an iPhone? Open the web version." and "By downloading, you agree to the Terms." Button downloads APK from R2. APK never shared as raw file link.
241. Open Graph meta tags on index.html: title "Abihani — The social marketplace", description "Discover. Like. Buy. Inside one feed.", image 1200×630 crimson background with bone-white "Abihani" centred.

---

## SPEED

242. Initial load under 500KB.
243. Under 2s on 4G. Under 1s on WiFi.
244. Lazy images below fold. Preloaded hero.
245. WebP images. Quality 80.
246. CDN edge everywhere. Cloudflare.
247. No heavy libraries. No jQuery. No moment.js. No lodash.

---

## CODE STRUCTURE

248. Every file under 300 lines. Every function under 50 lines.
249. Every file has one job. Every name tells the truth.
250. No magic numbers. No magic strings.
251. Types are strict. No any. Every function has a return type.
252. One shell (index.html). Per-screen logic and styles in separate files.
253. Folder structure: config, labels, theme, constants, engine, services, hooks, components, screens, store, types, utils.

---

## BACKEND STACK

254. Fastify + TypeScript on Node.
255. Postgres via Supabase. UUIDs. Foreign keys with on-delete-restrict. Indexes on lookup columns.
256. Redis via Upstash for rate limiting.
257. Resend for email.
258. Cloudflare R2 for media.
259. Payment provider chosen from Paystack / Flutterwave / Monnify at launch week.
260. Backend handles only what Supabase cannot: escrow rules, order lifecycle, payment webhooks, bank lookup, admin actions, rate limiting.

---

## FRONTEND STACK

261. React + Vite + TypeScript + Tailwind.
262. Deploys to Cloudflare Pages.
263. Env vars: VITE_API_BASE_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_R2_PUBLIC_URL.
264. During development, mock services. Production swaps api.service.ts and auth.service.ts for real.

---

## API CONTRACT

265. Lives in src/types/api.types.ts on both sides. Byte-identical.
266. Never invented by an AI. Written once, copied to both repos.
267. Neither AI changes the contract without approval.
268. Connection strings live only in dashboards. Never in code.

---

## CHRONOLOGICAL STAGES (11 total)

269. Stage 1 — Setup. Folders, configs, tailwind, tokens, README, RULES, GAPS.
270. Stage 2 — Shell. Bottom nav, tabs, routing, push transition, empty screens.
271. Stage 3 — Accounts. Signup, email OTP, recovery code, add/switch account.
272. Stage 4 — Ranking Engine. Pure logic. No UI.
273. Stage 5 — Feed. Post render, rail, info card, viewer, swipe-to-profile.
274. Stage 6 — Settings. Location, payout method, delivery regions, notifications.
275. Stage 7 — Create. Media picker, price, stock, ship-from, hashtags, publish.
276. Stage 8 — Orders. Buy, escrow, thread, composer, countdown, disputes.
277. Stage 9 — Profile. Cover, avatar, stats, trust row, tabs, edit, lists.
278. Stage 10 — Seed & Polish. Demo data labelled. Every state verified.
279. Stage 11 — Admin & Support. Kill switches, seller gating, notices, superpowers, algorithm tuning, journal, tickets, reports.
280. Every stage depends only on the stages before it. No carpenter before the walls.
281. Every stage has a checklist. Every stage is tested against its checklist only. Missing features from later stages are not bugs.
282. A bug fix touches only the files owned by the stage where the bug lives.
283. A stage is only "done" when the founder has tapped it on a real phone and confirmed it feels right.

---

## FILES AND NAMING

284. Two folders. abihani-frontend/ and abihani-backend/. Never merged.
285. Two GitHub repos. Two Codespaces. Two Antigravity sessions.
286. They communicate only through the API contract. Byte-identical file on both sides.
287. Every locked decision lives in this RULES.md. One copy in each repo.
288. Antigravity creates folders and files from prompts. Founder verifies. Nothing hand-created.

---

## AI BEHAVIOUR RULES

289. Every chapter prompt begins with: "Treat this as a trillion-dollar product. Do not change the design. Do not invent new colors. Do not invent new copy. Do not invent new motion. If you believe a design change would be more bulletproof, propose it first and wait for approval. Security is non-negotiable: no secret is ever hardcoded."
290. Every chapter prompt lists the exact folders and files the stage may create. Nothing else.
291. Antigravity must confirm it has read RULES.md and README before writing code.
292. Antigravity must self-report the checklist with DONE or NOT DONE for each item.
293. The founder verifies every checklist item personally. No item is accepted on the AI's word alone.
294. Every stage prompt ends with the stage's checklist embedded.

---

## TRUST AND REACHABILITY

295. In the first months, the founder personally answers every support message within 24 hours.
296. The first fifty sellers are personally known to the founder. Trust earned, not assumed.
297. Escrow release timer for the first months: 3 days, not 7. Grows back to 7 once trust is built.

---

## PRODUCT NAME AND DOMAIN

298. Every user-facing name is Abihani. Nothing else.
299. The product is called Abihani everywhere. Prefer abihani.ng or abihani.com.ng. Use abihaniexpress.com.ng only if neither is available. The domain does not change the product name.
300. The string "Express" never appears in any user-facing text, heading, title, meta tag, or notice.

---

## PLATFORM FEE

301. The escrow fee lives in platform_settings in the database.
302. Editable from Admin → Settings → Platform Fee.
303. Minimum 0.5%, maximum 5%. Outside that range, refuse to save with copy: "Fee must be between 0.5% and 5%."
304. Every order snapshots the fee at creation. Order fees never change retroactively.
305. Every fee change is written to the journal with old value, new value, admin ID, timestamp.
306. Default at launch: 1%.

---

## MONEY FLOW

307. Order completes → provider splits the payment.
308. Seller receives (order total − platform fee) directly in their bank account.
309. Abihani receives the platform fee directly in its registered bank account.
310. Abihani never holds seller money in its own account.
311. Provider chosen at launch week from Paystack / Flutterwave / Monnify based on split settlement quality, webhook reliability, and refund API.
312. Nothing about this flow is manual. Not for sellers. Not for the founder.
313. The founder's fee destination bank account is configured only inside the payment provider's dashboard. Never in Abihani's code, database, admin panel, or any screen.

---

## FINAL STANDARD

314. Build what is true. Not what sounds good.
315. Every control is wired. Every bulb has electricity.
316. Nothing faked. Nothing dim where it must be bright. Nothing blocked where it must be visible. Nothing hidden where it must be reachable.
317. Every state has shape and copy. Every tap has feedback. Every load has motion. Every error is human. Every state is honest.
318. Premium. Trillion-dollar. World-class. Not decoration. Not "good enough." Not "fine for now."
319. This file is the law. If a rule is not here, it is not locked. Chat is not the record. This file is.

---

## THE COMPLETE-PRODUCT RULE

320. Not mentioned does not mean not needed. Every omission is a gap to be filled, not a decision to skip.
321. Every screen has every state: loading, empty, error, success, focused, disabled, filled, partial, offline, slow network, permission denied.
322. Every control has every state: normal, pressed, focused, disabled, loading, success, failure.
323. Every flow has every branch: offline, timeout, API failure, double tap, back mid-flight, rotate, background, session expiry, dead link, deleted post with open order, duplicate dispute, failed bank lookup, duplicate webhook, expired OTP, wrong recovery code, duplicate signup, self-linking as second account.
324. Every button, sheet, modal, toast, and screen is checked for what it does when tapped, not tapped, scrolled away, dismissed, when offline, when it is the last item on a list.
325. Every admin control is wired to a real circuit. Not a decoration.
326. Every piece of copy is read aloud. If it does not sound like a decision we made, it is rewritten.
327. Every motion curve is felt. If it is not swift, not smooth, not settled, it is fixed.
328. Every edge case is considered — even the ones that occur once in a hundred thousand uses — and every one is answered with a real state, real copy, real shape.
329. Nothing is skipped because we did not talk about it. Nothing is invented because it was not forbidden. Everything is either locked or proposed for locking.
330. This rule applies forever. Before any stage begins, the stage's scope is reviewed against everything a product of this class needs, even the parts not yet thought of, and every gap is surfaced. The stage does not begin until the gaps are locked or explicitly deferred with a reason.

---

## END OF RULES.md

This file is the law. Read it before every stage.
Change nothing without founder approval.