"use client";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";



interface Props {
  title: string;
  description: string;
  id: string;
  completed: boolean;
}

export default function LessonCard({ title, description, id, completed }: Props) {
  const router = useRouter();
  return (
    <>
      <article onClick={() => router.push(`/lesson/${id}`)} className={cn("w-full mx-4 py-2 px-4 max-w-xl rounded-lg border flex items-center justify-between transition duration-300 group", completed ? "bg-green-500/5 hover:bg-green-500/10" : "bg-foreground/5 hover:bg-foreground/10")} role="button">
        {/* Text */}
        <div className="flex">
        <div>
          <h2 className="text-2xl">{title}</h2>
          <p>{description}</p>
          </div>
          <div>
            
          </div>
        </div>
        {/* Right Arrow Icon */}
        <div className={cn("rounded-full aspect-square size-8 flex justify-center items-center transition duration-300 group-hover:scale-125", completed ? "bg-green-500/10" : "bg-foreground/10")}>
          {completed ?
            <Check className="transition duration-300 group-hover:scale-110" /> :
            <ArrowRight className="transition duration-300 group-hover:scale-110" />
          }
        </div>
      </article>
    </>
  )
}