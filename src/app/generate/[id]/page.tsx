import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Client from "./client";



export default async function GenerateLessons({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        redirect("/sign-in")
    }
    const { id } = await params
    if (!id) {
        redirect("/")
    }


    const lesson = await db.query.lessonTable.findFirst({
        where: (lessons, { eq, and }) => and(eq(lessons.id, id), eq(lessons.userId, session.user.id)),
    })
    if (!lesson) {
        redirect("/")
    }

    if (lesson.questionsGenerated) {
        redirect(`/lesson/${lesson.id}`)
    }

    return (
            <Client id={id} />
    );
}