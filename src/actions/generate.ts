"use server";
import { generateObject, generateText } from "ai"
import { google } from "@ai-sdk/google"
import { z  } from "zod";
import { db } from "@/db";
import { courseTable, lessonTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const model = google('gemini-1.5-flash');

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required").max(100, "Description must be brief and less than 100 characters"),
    lessons: z.array(z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required").max(50, "Description must be brief and less than 50 characters")
    })).min(1, "1 lesson minimum").max(15, "You can only create up to 15 lessons at a time")
}).or(z.object({
    error: z.string()
}))

export async function generateLessons(prompt: string){
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        return {
            error: "You must be signed in to generate lessons"
        }
    }

    const response = await generateObject({
        model,
        schema,
        prompt: `
        You are an expert in creating educational test.
        So Now, You've to create a test on the following: ${prompt}
        If the prompt is inappropriate, you've to return a error message like "Inappropriate Topic", or "Invalid Topic".
        The test will:
        - Have multiple lessons
        - each lesson will have at most 15 questions, but prefer to add around 10 questions only
        - each question will be a multiple choice question with 4 answer choices
        - each lesson will have a title and a description
        
        The title shouldn't have the letter "test", it could be similar to "mastering Topic", or something relating to topic only
        You've been provided the context to provide lesson title and description accordingly
        Make sure Description is as brief as possible, and for:
        - courses: Description should be less than 100 characters, but It should be around 50-70 characters preferably.
        - lessons: Description should just state the syllabus of the lesson, less than 50 characters, but It should be around 30-40 characters preferably.
        `
    })


    const { object } = response;
    if("error" in object){
        return object
    }

    const course = await db.insert(courseTable).values({
        title: object.name,
        description: object.description,
        userId: session.user.id
    }).returning({id: courseTable.id})

    await db.insert(lessonTable).values(
        object.lessons.map((lesson: any) => ({
            title: lesson.name,
            description: lesson.description,
            userId: session.user.id,
            courseId: course[0].id, // Assuming the course ID is returned in the object
            questionsGenerated: false, // Initial state
            completed: false, // Initial state
        }))
    )





    return response.object
}