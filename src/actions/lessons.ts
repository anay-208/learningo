"use server";
import { db } from "@/db";
import { courseTable, lessonTable, user } from "@/db/schema";
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

        
    const userData = await db.query.user.findFirst({
        where: eq(user.id, session.user.id),
    })
    
    const currentDate = new Date();
    
    if(userData?.lastPracticed) {
        const lastPracticedDate = new Date(userData.lastPracticed);
        // Check if the last practiced date is not today
        if (lastPracticedDate.toDateString() !== currentDate.toDateString()) {
            await db.update(user)
                .set({ streak: (userData?.streak ?? 0) + 1, lastPracticed: currentDate })
                .where(eq(user.id, session.user.id));
        }
    } else {
        // If lastPracticed is null, set it to the current date and increment streak
        await db.update(user)
            .set({ streak: 1, lastPracticed: currentDate })
            .where(eq(user.id, session.user.id));
    }


    return { success: true, message: "Lesson marked as completed" };

}

export const deleteCourse = async (courseId: string) => {
    await db.delete(courseTable).where(eq(courseTable.id, courseId))
    return {
        success: true
    }
}