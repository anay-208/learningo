
# Learningo 🎓

[![Hacktoberfest 2025](https://img.shields.io/badge/Hacktoberfest-2025-orange.svg)](https://hacktoberfest.com/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)
[![License](https://img.shields.io/github/license/anay-208/learningo)](LICENSE)

> AI-powered quiz and lesson generator for last-minute revision - completely free! 🚀

---


## 🧭 Table of Contents

- [Inspiration](#inspiration)
- [File Structure](#file-structure)
- [What it does](#what-it-does)
- [How I built it](#how-i-built-it)
- [Setup Instructions](#setup-instructions)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting API Keys](#getting-api-keys)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [What's next for Learningo](#whats-next-for-learningo)


---

## Inspiration

As a high school student, One of my struggles is last minute revision. Thinking about this Problem, I developed a solution for it.

I've noticed similar apps, but I've noticed they're like $5-10/mo, which is a lot in India considering I'm a student. I realized if I develop the app myself, it would cost me <$1 in AI Costs(For my personal use), if I exceed the free tier.


---
## File Structure

```bash
learningo/
├── src/
│   ├── actions/
│   │   ├── generate.ts
│   │   ├── lessons.ts
│   ├── app/
│   │   ├── auth/
│   │   │   └── sign-in/
│   │   ├── api/
│   │   │   ├──auth/
│   │   │   │  └── all/
│   │   │   └── sentry-example-api/
│   │   ├── course/
│   │   │   └──id/
│   │   ├── dashboard/
│   │   ├── generate/
│   │   │   ├── id/
│   │   ├── lesson/
│   │   │   └── id/
│   ├── components/
│   │   ├── home/
│   │   ├── lesson/
│   │   └── ui/
│   ├── db/
│   ├── emails/
│   ├── lib/
│   └── styles/
├── .gitignore
├── auth-schema.ts
├── components.json
└── CONTRIBUTING.md
├── drizzle.config.ts
├── eslint.config.mjs
├── LICENSE
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── sentry.edge.config.ts
├── sentry.server.config.ts
└── tsconfig.json

```



---

## What it does

The Web App, Powered by Gemini Generates Lessons & Questions based on your topic, and helps you revise with MCQ Questions.

---


## How I built it

I Used Next.js, which is a React.js framework to build it. How it works is when you go to sign-in route, It is using Magic links for authentication, powered by better-auth0, and uses resend1 to send the email. After verification, you'll be signed in, where you can generate a lesson. When you generate a lesson, it is using the Vercel's AI SDK2 to generate Lessons with Gemini API3 which'll then display in the Home Page. You can click any lesson on Home page, and once you click, It'll generate Questions using the same way, and then you can practice.

---

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- pnpm package manager (`npm install -g pnpm`)
- A PostgreSQL database (or use a service like Neon, Supabase, etc.)
- Google Gemini API key
- Resend API key for email authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anay-208/learningo.git
   cd learningo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="your_postgresql_connection_string"
   
   # Better Auth
   BETTER_AUTH_SECRET="your_secret_key_here"
   BETTER_AUTH_URL="http://localhost:3000"
   
   # Resend (for magic link emails)
   RESEND_API_KEY="your_resend_api_key"
   
   # Google Gemini AI
   GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"
   
   # Sentry (optional - only needed if you want error tracking)
   # Leave this unset for local development to prevent sending alerts
   NEXT_PUBLIC_SENTRY_DSN="your_sentry_dsn_url"
   ```
4. In the production, Vertex AI is used, which most of the people likely won't use, so feel free to change the [code](src/actions/generate.ts) in your local system to use it 

5. **Set up the database**
   ```bash
   pnpm db:push
   ```

6. **Run the development server**
   ```bash
   pnpm dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Getting API Keys

- **Gemini API**: Get your free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Resend API**: Sign up at [Resend](https://resend.com) for email services
- **Database**: You can use [Neon](https://neon.tech), [Supabase](https://supabase.com), or any PostgreSQL provider

---

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with Magic Links
- **AI**: Google Gemini API via Vercel AI SDK
- **Email**: Resend
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

---

## Contributing

We welcome contributions for Hacktoberfest and beyond! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

---

## What's next for Learningo

As of now, the app will remain completely free.

[🔝 Back to Top](#learningo-)