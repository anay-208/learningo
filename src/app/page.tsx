import { auth } from "@/lib/auth";
import LessonCard from "@/components/home/lesson-card";
import SvgIcon from "@/components/home/vector";
import { ModeToggle } from "@/components/mode-toggle";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    redirect("/sign-in")
  }
  const course = await db.query.courseTable.findFirst({
    where: (courses, { eq }) => eq(courses.userId, session.user.id),
  })
  if (!course) {
    redirect("/generate")
  }
  const lessons = await db.query.lessonTable.findMany({
    where: (lessons, { eq }) => eq(lessons.courseId, course.id),
  })
  if (lessons.length === 0) {
    return ( 
      <>
      <h1>You've got an extremely rare error. Please connect me at me@anayparaswani.dev to get this resolved.</h1>
      </>
    )
  }


  return (
    <>
      <div className="space-y-8 relative w-screen min-h-screen">
        <SvgIcon />
        {/* Header: Title, Streak & Toggler */}
        <header className="px-4 py-4 flex justify-between ">
          <h1 className="text-3xl">Learningo</h1>
          <ModeToggle />
        </header>
        <main className="max-w-xl mx-auto space-y-8">
          <div>
          <h2 className="text-2xl">{course.title}</h2>
          <p className="text-md">{course.description}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-8">
            {lessons.map((lesson) => (
              <LessonCard 
                key={lesson.id} 
                title={lesson.title} 
                description={lesson.description} 
              />
            ))}



          </div>
        </main>
      </div>
    </>
  );
}
