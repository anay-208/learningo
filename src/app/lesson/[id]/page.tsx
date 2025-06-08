import Questions from "@/components/lesson/questions";
import { db } from "@/db";
import { lessonTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export default async function Lesson({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session){
        redirect("/sign-in")
    }
    const { id } = await params
    if(!id){
        redirect("/")
    }


    const lesson = await db.query.lessonTable.findFirst({
        where: (lessons, { eq, and }) => and(eq(lessons.id, id), eq(lessons.userId, session.user.id)),
    })
    if(!lesson){
        redirect("/")
    }

    if(!lesson.questionsGenerated){
        redirect(`/generate/${lesson.id}`)
    }

    const questions = await db.query.questionsTable.findMany({
        where: (questions, { eq }) => eq(questions.lessonId, lesson.id),
        orderBy: (questions, { asc }) => asc(questions.questionNo)
    })

    if(questions.length === 0){
        await db.update(lessonTable).set({
            questionsGenerated: false,
            completed: false
        }).where(eq(lessonTable.id, lesson.id))
        redirect(`/generate/${lesson.id}`)
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Questions questions={questions} id={id} />
        </div>
    );
}