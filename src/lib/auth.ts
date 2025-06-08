import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/"
import { Resend } from 'resend';
import MagicLinkHTML from "@/emails/magic-link";
const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, url, }) => {
                console.log(email, url)
                const { data, error } = await resend.emails.send({
                    from: "Learningo <learningo@anayparaswani.dev>",
                    to: email,
                    subject: "Your Magic Link to login to Learningo",
                    html: MagicLinkHTML.replaceAll("{{URL}}", url), 
                })
                console.log(data, error)
            }
        })
    ],
    user: {
        additionalFields: {
            streak: {
                type: "number",
                defaultValue: "0",
            },
            lastPracticed: {
                type: "date",
            }
        }
    }
})