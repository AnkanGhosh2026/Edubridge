# EduBridge Overseas — Website

A modern, colourful website for a company that helps Indian students apply to
US colleges and universities. Built as two apps:

- **`frontend/`** — React (Vite) public site + admin dashboard
- **`backend/`** — FastAPI API that stores contact-form enquiries and powers
  the admin dashboard

## What's included

**Public site** (colourful, image/illustration-driven, no login needed):
- Home — hero, "why choose us", services preview, stats, CTA
- About Us — story, timeline, team
- Services — full service list grouped by category + counselling process
- Study in USA — costs, popular fields, FAQ
- Contact Us — contact form, phone, email, address, office hours, social links

**Admin site** (`/admin`, password-protected):
- Login screen
- Dashboard listing every enquiry submitted through the Contact form, with
  stats, filters (pending / reviewed), status toggling, and delete

## 1. Run the backend (FastAPI)

Requires Python 3.10+.

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# open .env and set a real ADMIN_USERNAME, ADMIN_PASSWORD, and JWT_SECRET

uvicorn app.main:app --reload --port 8000
```

The API now runs at `http://localhost:8000`. Interactive API docs are at
`http://localhost:8000/docs`.

## 2. Run the frontend (React)

Requires Node.js 18+.

```bash
cd frontend
npm install

cp .env.example .env
# VITE_API_URL should point at your backend, e.g. http://localhost:8000

npm run dev
```

The site now runs at `http://localhost:5173`. The admin dashboard is at
`http://localhost:5173/admin` — log in with the `ADMIN_USERNAME` /
`ADMIN_PASSWORD` you set in `backend/.env`.

## 3. Building for production

```bash
cd frontend
npm run build     # outputs static files to frontend/dist
```

Deploy `frontend/dist` to any static host (Netlify, Vercel, S3 + CloudFront,
etc.) and set `VITE_API_URL` (at build time) to your live backend URL. Deploy
the `backend/` app to any Python host (Render, Railway, a VPS with
gunicorn/uvicorn, etc.) and set real values for `ADMIN_USERNAME`,
`ADMIN_PASSWORD`, `JWT_SECRET`, and `CORS_ORIGINS` in its environment.

## Before going live — a few things to change

- **Replace the placeholder content.** Phone number, email, office address,
  team names, and social links in `frontend/src/pages` and
  `frontend/src/components/Footer.jsx` are placeholders — swap in the real
  company details.
- **Add real photography.** The site currently uses illustration/colour
  instead of stock photos so nothing breaks or looks generic. Drop real
  campus/team/student photos into `frontend/src/assets` and reference them
  from the relevant pages for an even more personal feel.
- **Set strong admin credentials** and a long random `JWT_SECRET` in
  `backend/.env` — never deploy with the example values.
- **Contact form emails:** submissions are currently only stored in the
  database and visible in the admin dashboard. If you'd also like an email
  notification sent to your team the moment someone submits the form, that's
  a small addition to `backend/app/main.py` (e.g. using an SMTP provider or a
  transactional email API).

## Tech stack

- Frontend: React 19, React Router, Vite, plain CSS (custom design system,
  no framework lock-in)
- Backend: FastAPI, SQLAlchemy, SQLite (swap the `DATABASE_URL` in
  `backend/app/database.py` for Postgres/MySQL in production), JWT auth for
  the admin dashboard
