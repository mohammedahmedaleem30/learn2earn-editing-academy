# Learn2Earn Affiliate Opportunity Vault

A premium Vite + React + TypeScript dashboard for curated Learn2Earn affiliate opportunities, commission blueprints, and earnings projections.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React icons

## Local Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local preview:

```text
http://localhost:5173
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Admin-Editable Vault Data

Offer data and unlock-system settings are currently hardcoded in:

```text
src/App.tsx
```

Look for the admin comments near the top of the file to update:

- Affiliate offers
- Current vault funds
- Next milestone amount
- Next unlock label
- Update cadence
- Upcoming opportunity categories

## Vercel Deployment

Recommended Vercel settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

