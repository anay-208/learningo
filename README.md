
## Inspiration

As a high school student, One of my struggles is last minute revision. Thinking about this Problem, I developed a solution for it.

I've noticed similar apps, but I've noticed they're like $5-10/mo, which is a lot in India considering I'm a student. I realized if I develop the app myself, it would cost me <$1 in AI Costs(For my personal use), if I exceed the free tier.
## What it does

The Web App, Powered by Gemini Generates Lessons & Questions based on your topic, and helps you revise with MCQ Questions.
## How I built it

I Used Next.js, which is a React.js framework to build it. How it works is when you go to sign-in route, It is using Magic links for authentication, powered by better-auth0, and uses resend1 to send the email. After verification, you'll be signed in, where you can generate a lesson. When you generate a lesson, it is using the Vercel's AI SDK2 to generate Lessons with Gemini API3 which'll then display in the Home Page. You can click any lesson on Home page, and once you click, It'll generate Questions using the same way, and then you can practice.
## What's next for Learningo

As of now, the app will remain completely free.

In the future however, things might change a little, incase I exceed my Gemini Free Limit.
