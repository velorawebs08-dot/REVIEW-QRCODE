# Customer Review App (Client 1: False Nine)

A lightning-fast, mobile-first Google Review web app with interactive templates, customizable notepad draft, and direct Google Review linking. Built with TypeScript, Tailwind CSS, and Framer Motion.

---

## Customer Flow (3 Taps)
1. Customer opens the page.
2. Selects a category and taps **COPY** on an experience message (or edits directly in **YOUR REVIEW** notepad).
3. Taps **OPEN GOOGLE REVIEW →**, pastes (long-press, Paste), and taps **Post**.

---

## Onboarding a New Client

To rebrand this application for any new client (gym, salon, clinic, restaurant, boutique):

1. **Edit `siteData.ts`**:
   - Update `business.name`, `tagline`, and `city`.
   - Update `reviewMessages` with 4 natural, positive review sentences per category matching the client's industry. Placeholders `{shop}` and `{city}` are replaced automatically.

2. **Add the Business Logo**:
   - Place the client's logo SVG or PNG into `/public/logo.svg` (or update `business.logo` in `siteData.ts`).

3. **Set the Direct Google Review Link**:
   - In Google Business Profile, go to **Ask for reviews** and copy the direct review box link (e.g., `https://search.google.com/local/writereview?placeid=...`).
   - Paste it into `review.googleReviewUrl` in `siteData.ts`.
   - Set the client's Instagram handle and WhatsApp phone number.

4. **Deploy**:
   - Deploy the project to Cloud Run, Vercel, Netlify, or your preferred host.
