import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    redirect("/sign-in")
  }
  const courses = await db.query.courseTable.findMany({
    where: (courses, { eq }) => eq(courses.userId, session.user.id),
    orderBy: (courses, { asc }) => asc(courses.createdAt),
  })
  if (!courses || courses.length === 0) {
    redirect("/generate")
  }

  return (
    <div className="space-y-8 relative w-screen min-h-screen py-24">
      <main className="max-w-2xl mx-auto space-y-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Courses</h1>
          <Link href="/generate">
            <Button size="lg" className="text-lg">+ New Course</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/course/${course.id}`} className="no-underline">
              <article className="w-full py-4 px-6 rounded-lg border flex flex-col transition duration-300 bg-foreground/5 hover:bg-foreground/10 cursor-pointer">
                <h2 className="text-2xl font-semibold">{course.title}</h2>
                <p className="text-md text-gray-600 dark:text-gray-300">{course.description}</p>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
} 