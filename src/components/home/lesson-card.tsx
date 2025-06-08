"use client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";



interface Props {
  title: string;
  description: string;
  id: string;
}

export default function LessonCard({ title, description, id }: Props){
  const router = useRouter();
    return (
        <>
        <article onClick={() => router.push(`/lesson/${id}`)} className="w-full mx-4 py-2 px-4 max-w-xl rounded-lg border flex items-center justify-between transition duration-300 bg-foreground/5 hover:bg-foreground/10 group" role="button">
            {/* Text */}
            <div>
              <h2 className="text-2xl">{title}</h2>
              <p>{description}</p>
            </div>
            {/* Right Arrow Icon */}
            <div className="bg-foreground/10 rounded-full aspect-square size-8 flex justify-center items-center transition duration-300 group-hover:scale-125">
              <ArrowRight className="transition duration-300 group-hover:scale-110" />
            </div>
          </article>
          </>
    )
}