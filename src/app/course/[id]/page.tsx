import { auth } from "@/lib/auth";
import LessonCard from "@/components/home/lesson-card";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import DropdownIcon from "@/components/home/DropdownIcon";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-pink-950/20 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Course Header */}
          <div className="mb-12 p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                      {course.title}
                    </h1>
                  </div>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {course.description}
                </p>
                
                {/* Progress Info */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>{lessons.length} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{lessons.filter(l => l.completed).length} Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Created {new Date(course.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Progress Ring */}
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${(lessons.filter(l => l.completed).length / lessons.length) * 87.96} 87.96`}
                      className="text-purple-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">
                      {Math.round((lessons.filter(l => l.completed).length / lessons.length) * 100)}%
                    </span>
                  </div>
                </div>
                <DropdownIcon courseId={course.id} />
              </div>
            </div>
          </div>

          {/* Lessons */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Course Lessons
            </h2>
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="relative ml-12">
                {/* Lesson Number */}
                <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                  {index + 1}
                </div>
                
                <LessonCard
                  id={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                  completed={lesson.completed}
                />
                
                {/* Connecting line */}
                {index < lessons.length - 1 && (
                  <div className="absolute -left-8 top-full w-0.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-24 text-center py-12 border-t border-gray-200/50 dark:border-gray-800/50">
          <p className="text-lg font-medium bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Crafted with ❤️ by Anay Paraswani
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Continue your learning journey and achieve your goals
          </p>
        </footer>
      </div>
    </div>
  );
}
