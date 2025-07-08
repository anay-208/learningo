import { auth } from "@/lib/auth";
import LessonCard from "@/components/home/lesson-card";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    redirect("/sign-in")
  }
  const paramsObj = await params;
  const course = await db.query.courseTable.findFirst({
    where: (courses, { eq, and }) => and(eq(courses.id, paramsObj.id), eq(courses.userId, session.user.id)),
  })
  if (!course) {
    redirect("/")
  }
  const lessons = await db.query.lessonTable.findMany({
    where: (lessons, { eq }) => eq(lessons.courseId, course.id),
    orderBy: (lessons, { asc }) => asc(lessons.lessonNo),
  })
  if (lessons.length === 0) {
    return (
      <>
        <h1>You&apos;ve got an extremely rare error. Please connect me at me@anayparaswani.dev to get this resolved.</h1>
      </>
    )
  }

  return (
    <>
      <div className="space-y-8 relative w-screen min-h-screen py-24">
        <main className="max-w-xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl">{course.title}</h2>
            <p className="text-md">{course.description}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                description={lesson.description}
                completed={lesson.completed}
              />
            ))}
          </div>
        </main>
        <footer className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-100 dark:from-gray-900 to-transparent h-18">
          <div className="max-w-xl mx-auto text-center text-gray-500">
            <p className="text-sm">Crafted with ❤️ by Anay Paraswani</p>
          </div>
        </footer>
      </div>
    </>
  );
}
