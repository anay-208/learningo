"use server";
import { generateObject } from "ai"
// import { google } from "@ai-sdk/google"
import { z } from "zod";
import { db } from "@/db";
import { courseTable, lessonTable, questionsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createVertex } from '@ai-sdk/google-vertex';


const vertex = createVertex({
    googleAuthOptions: {
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_VERTEX_PRIVATE_KEY
        }
    }
  });


// Upstash rate limit: 5 course creations per day per user
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1d"),
    analytics: true,
});

const schemaLessons = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required").max(150, "Description must be brief and less than 100 characters"),
    lessons: z.array(z.object({
        name: z.string().min(1, "Name is required"), //temporaily increased max
        description: z.string().min(1, "Description is required").max(100, "Description must be brief and less than 50 characters") // max 60 incase Ai exceeds by a little
    })).min(1, "1 lesson minimum").max(15, "You can only create up to 15 lessons at a time")
}).or(z.object({
    error: z.string()
}))

export async function generateLessons(prompt: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return {
            error: "You must be signed in to generate lessons"
        }
    }


    const { success, reset } = await ratelimit.limit(`course_create_${session.user.id}`);
    if (!success) {
        return {
            error: `You can only create up to 5 courses per day(which is inclusive of failed attempts). Please try again after ${new Date(reset * 1000).toLocaleTimeString('en-GB', { timeZone: 'UTC' })} GMT or contact me@anayparaswani.dev.`
        }
    }

    const courseCount = await db.query.courseTable.findMany({
        where: (table, { eq }) => eq(table.userId, session.user.id),
    });
    if (courseCount.length >= 5) {
        return {
            error: "You can only create up to 5 courses. Please delete old courses before creating more."
        }
    }

    const response = await generateObject({
        model: vertex("gemini-2.5-flash"),
        schema: schemaLessons,
        prompt: `
        You are an expert in creating educational tests.
        So Now, You've to create a test on the following: ${prompt}
        If the prompt is inappropriate, you've to return a error message like "Inappropriate Topic", or perhaps a sarcastic message, if the topic is not appropriate depending upon user's query.
        The test will:
        - Have multiple lessons
        - each lesson will have at most 15 questions, but prefer to add around 10 questions only
        - each question will be a multiple choice question with 4 answer choices
        - each lesson will have a title and a description
        
        The title shouldn't have the letter "test", it could be similar to "mastering Topic", or something relating to topic only
        You've been provided the context to provide lesson title and description accordingly
        Make sure Description is as brief as possible, and for:

        Now when you are generating, there are certain limits to the max number of characters.
        For Description of lesson, so object.description, it should be less than 100 characters, but make it less than 50 characters, and there is some extra space just incase.
        For each lesson, so object.lessons[i].description, it should be less than 60 characters, but make it less than 30 characters, and there is some extra space just incase.
        `
    }).catch(err => {
        console.log(err)
        console.log("--- raw error end ---")
    })

    if (!response) {
        return {
            error: "An unknown error occured, which is likely caused due to high demand on the AI Model. Please try again later or contact me@anayparaswani.dev"
        }
    }



    const { object } = response;
    if ("error" in object) {
        return object
    }

    const course = await db.insert(courseTable).values({
        title: object.name,
        description: object.description,
        userId: session.user.id
    }).returning({ id: courseTable.id })

    await db.insert(lessonTable).values(
        object.lessons.map((lesson, i) => ({
            title: lesson.name,
            description: lesson.description,
            userId: session.user.id,
            courseId: course[0].id,
            questionsGenerated: false,
            completed: false,
            lessonNo: i + 1
        }))
    )





    return { success: true, id: course[0].id }
}

// For ai
const schemaQuestions = z.array(z.object({
    question: z.string().min(1, "Question is required"), // temporarily increased
    options: z.array(z.string().min(1, "An option is required").max(75, "Option should be less than 50 characters")).min(2, "At least 2 options are required").max(4, "A maximum of 4 options is allowed"),
    answer: z.number().min(0, "Answer is required").max(3, "Answer must be between 1 and 4")
}))


export async function generateQuestions(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return {
            error: "You must be signed in to generate questions"
        }
    }

    const lesson = await db.query.lessonTable.findFirst({
        where: (table, { eq, and }) => and(eq(table.id, id), eq(table.userId, session.user.id)),
    })


    if (!lesson) {
        return {
            error: "Lesson not found"
        }
    }
    if (lesson.questionsGenerated) {
        redirect(`/lesson/${id}`)
    }

    const course = await db.query.courseTable.findFirst({
        where: (table, { eq, and }) => and(eq(table.id, lesson.courseId), eq(table.userId, session.user.id)),
    })

    if (!course) {
        return {
            error: "You've encountered a very rare error, please contact me@anayparaswani.dev!"
        }
    }

    const response = await generateObject({
        model: vertex("gemini-2.5-flash"),
        schema: schemaQuestions,
        prompt: `
        You are an expert in creating educational test.
        You've to create questions on topic for course: ${course.title}, and description: ${course.description}.
        So Now, You've to create a question on the following topic: ${lesson.title}, and description: ${lesson.description}
        The question will:
        - Have a question
        - Have 2-4 answer choices, which needs to be as short as possible
        - Have 1 correct answer
        Make sure the question is clear and concise, and the answer choices are distinct and relevant.
        For Answer Choice, it needs to be between 0 & 3, so 0 Refers to first item in the array, and 1 would refer to 2nd and so on.
        You've to generate multiple question, at least 5 and at most 15 questions, but preferably around 10 questions only.
        Options should be at most 50 characters, but preferably less, DONT EXCEED THE LIMIT NO MATTER WHAT, and RESPONSE SHOULD MATCH THE SCHEMA
        DONT TRY TO EXCEED THE LIMIT AT ANY COSTS
        `
    })
    const { object } = response;

    const insertPromise = await db.insert(questionsTable).values(
        object.map((question, i) => ({
            question: question.question,
            answerChoices: question.options,
            answer: question.answer,
            userId: session.user.id,
            lessonId: lesson.id,
            questionNo: i + 1
        })))

    const completePromise = await db.update(lessonTable).set({
        questionsGenerated: true,
    }).where(eq(lessonTable.id, lesson.id))

    await Promise.all([insertPromise, completePromise])
    return {
        success: true
    }
}