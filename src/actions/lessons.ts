"use server";
import { db } from "@/db";
import { lessonTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

export const markLessonAsCompleted = async (lessonId: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session){
        return { success: false, message: "Unauthorized" };
    }

    await db.update(lessonTable)
        .set({ completed: true })
        .where(and(eq(lessonTable.id, lessonId), eq(lessonTable.userId, session.user.id)));
    
    return { success: true, message: "Lesson marked as completed" };

}