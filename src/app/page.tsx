import { auth } from "@/lib/auth"; 
import LessonCard from "@/components/home/lesson-card";
import SvgIcon from "@/components/home/vector";
import { ModeToggle } from "@/components/mode-toggle";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if(!session) {
    redirect("/sign-in")
  }
  console.log(session)
  return (
    <>
      <div className="space-y-8 relative w-screen min-h-screen">
        <SvgIcon />
        {/* Header: Title, Streak & Toggler */}
        <header className="px-4 py-4 flex justify-between ">
          <h1 className="text-3xl">Learningo</h1>
          <ModeToggle />
        </header>
        <main className="flex flex-col items-center justify-center gap-12">
            <LessonCard/>



        </main>
      </div>
    </>
  );
}
