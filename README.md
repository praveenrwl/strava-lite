# strava-lite


# Strava Lite

A lightweight fitness tracker built with **Next.js (App Router)**, **Supabase**, and **local AI (Ollama)**.  
Track runs & rides, manage history, and get AI-powered daily workout suggestions.

---

## ✨ Features
<br>🔐 Authentication with Supabase (magic link / email-password)
<br>📝 Add activity (sport, title, date, duration, distance, effort, notes)
<br>📊 Derived stats (pace, avg speed)
<br>📜 Personal activity history with search & filter
<br>✏️ Edit & Delete (soft delete with optimistic UI)
<br>🤖 AI Suggestions via Ollama (Mistral/Llama3)
<br>📈 Optional weekly summary card (totals, averages, top sport)

---

## Tech Stack
**Frontend:** Next.js 14, React, TypeScript, Tailwind CSS  
**Backend:** Next.js API Routes, Supabase Postgres (with RLS)  
**Auth:** Supabase Auth  
**AI:** Ollama (local LLM inference)  
**Validation:** Zod  

---

##  Getting Started

### 1. Clone & Install
bash

git clone https://github.com/<your-username>/strava-lite.git
cd strava-lite/strava-lite
npm install



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


