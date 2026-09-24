# 💪 FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of twelve lifts, drill into detailed instructions and specs for each one, lock lifts into **Today's Plan**, save others for later, and track your day's exercises, minutes, and calories — all in a fast, fully responsive interface.

Live Link: _add after deploying_
GitHub Repository: _add your repo URL_

---

## 🛠️ Technologies Used

- **Next.js 14** (App Router) — routing, layouts, and rendering
- **React 18** — component architecture and client-side state (Context API)
- **Tailwind CSS** — utility-first styling and responsive design
- **lucide-react** — icon set
- **FitLog REST API** (`api.abcz.workers.dev`) — live workout data
- **Browser localStorage** — persists Today's Plan and Saved lists across reloads

## ✨ Features

1. **Responsive workout library** — a 3×4 grid of workout cards (image, category tags, equipment, duration/calories/rating) on desktop that collapses gracefully down to a single column on mobile.
2. **Sort by Duration, Calories, or Rating** — a custom dropdown re-sorts the entire library instantly, no page reload.
3. **Detailed workout pages** — a two-column layout with a key-specs panel and numbered step-by-step instructions for every lift, fetched live from the API with a graceful fallback if a single-item request fails.
4. **Today's Plan & Saved tracking** — add a lift to today's plan (capped at five) or save it for later, with the navbar's Plan/Saved badges and My Plan page metrics (Exercises, Minutes, Calories) updating live, persisted to localStorage.
5. **My Plan workflow** — tabbed Today's Plan / Saved views, per-item "Mark as Done" and remove actions, and a friendly empty state pointing back to the library.
6. **Toast notifications** — every plan/save/remove/done action confirms itself with an on-screen toast.
7. **Polished states throughout** — loading indicators while data fetches, a custom 404 page for unknown routes, and full keyboard-focus styling.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
app/
  layout.js            Root layout, fonts, providers
  page.js              Home page (hero + library)
  workout/[id]/page.js Workout detail page
  my-plan/page.js       My Plan page
  not-found.js          Custom 404 page
components/             Navbar, Footer, Hero, WorkoutCard, SortDropdown, Toaster, Spinner
context/PlanContext.js  Shared Plan/Saved state + toast system
lib/api.js              FitLog API helpers
```

## 📬 Deployment

Deployed on Vercel  — build command `next build`, output handled automatically for Next.js.

---

© 2026 FitLog — Workout Library. Train hard, log honest.
