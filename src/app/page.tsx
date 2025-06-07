import LessonCard from "@/components/home/lesson-card";
import SvgIcon from "@/components/home/vector";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <>
      <div className="space-y-8 relative w-screen min-h-screen">
        <SvgIcon />
        {/* Header: Title, Streak & Toggler */}
        <header className="px-4 py-4 flex justify-between ">
          <h1 className="text-3xl">Learningo</h1>
          <ModeToggle />
        </header>
        <main className="flex flex-col items-center justify-center gap-8">
            <LessonCard/>



        </main>
      </div>
    </>
  );
}
