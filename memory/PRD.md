# Portfolio — Frontend Developer (Bhupinder K.)

## Original Problem Statement
Create an attractive portfolio for a frontend developer with:
- Light + dark themes, mobile responsive
- Micro-interactions to attract users/recruiters
- Animations and scroll animations
- User-friendly, high-performing
- Include 4 Netlify-hosted projects

## Design Direction
**Swiss Brutalist / High-Contrast** editorial aesthetic with oversized display typography (Clash Display / Space Grotesk), monospace body (IBM Plex Mono), harsh red accent (#FF3333), zero border-radius, hairline bento grids, dot/geometric background textures, grain overlay.

## Architecture
- **Backend** (`/app/backend/server.py`) — FastAPI + Motor (MongoDB)
  - `POST /api/contact` — save contact form submission
  - `GET /api/contact` — list submissions
  - `POST /api/analytics/track` — page-view tracking (hashes IP)
  - `GET /api/analytics/stats` — aggregate stats
- **Frontend** (`/app/frontend/src/`)
  - `App.js` — ThemeProvider + Lenis smooth scroll + visit tracker
  - `context/ThemeContext.jsx` — persisted light/dark toggle
  - `components/Portfolio.jsx` — page composition
  - `components/portfolio/*` — Navbar, Hero, Marquee, About, Skills, Projects, Experience, Testimonials, Contact, Footer, SectionHeader

## Sections
1. Sticky Navbar w/ scroll blur + light/dark toggle + mobile menu
2. Hero — giant "BHUPINDER." display type, CTAs, socials, meta bar
3. Marquee ribbon — infinite scrolling skill words
4. About — portrait + big statement + stats grid
5. Skills — 4-column bento grid (Languages / Frameworks / Motion&UI / Tooling)
6. Projects — 4 real Netlify projects (Redux Store, DevWithCode, R3 Building, NFT Landing) as full-width rows with hover preview
7. Experience — timeline (2022→present)
8. Testimonials — 3-card bento
9. Contact — form (name, email, subject, message) → backend, meta info
10. Footer — huge wordmark, nav, socials, back-to-top

## Motion Stack
`framer-motion` (scroll reveals + hovers) · `lenis` (smooth scroll) · `react-fast-marquee` (ribbon) · custom Tailwind keyframes (`blink`, `scroll-hint`)

## Implemented
- ✅ Full-stack build with Lighthouse-friendly minimal deps
- ✅ Dark + light themes with system preference detection + localStorage persistence
- ✅ Contact form → MongoDB (POST /api/contact tested via curl)
- ✅ Visitor analytics (page_view + unique sessions)
- ✅ Framer Motion scroll reveals, staggered hero, hover micro-interactions
- ✅ Mobile responsive (hamburger nav, stacked grids)
- ✅ data-testid coverage across all interactive elements

## Backlog (P1)
- P1: Resend/SendGrid email delivery for contact form (currently stored in MongoDB only)
- P1: Admin dashboard to view contacts + analytics
- P2: Blog / writing section
- P2: Resume PDF download (real file)
- P2: Project detail pages
- P2: Case-study long-form pages for each project
