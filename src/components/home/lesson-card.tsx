import { ArrowRight } from "lucide-react";



export default function LessonCard(){
    return (
        <>
        <article className="w-full mx-4 py-2 px-4 max-w-xl rounded-lg border flex items-center justify-between bg-foreground/5 group" role="button">
            {/* Text */}
            <div>
              <h2 className="text-2xl">Lesson 1</h2>
              <p>In this lesson, you&quot;ll learn the fundamentals of XYZ</p>
            </div>
            {/* Right Arrow Icon */}
            <div className="bg-foreground/10 rounded-full aspect-square size-8 flex justify-center items-center transition duration-300 group-hover:scale-110">
              <ArrowRight className="transition duration-300 group-hover:scale-125" />
            </div>
          </article>
          </>
    )
}