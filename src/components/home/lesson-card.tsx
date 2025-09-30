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
    <article 
      onClick={() => router.push(`/lesson/${id}`)} 
      className={cn(
        "w-full mx-4 p-6 max-w-2xl rounded-2xl border-2 flex items-center justify-between transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-2xl relative overflow-hidden",
        completed 
          ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700" 
          : "bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
      )} 
      role="button"
    >
      {/* Gradient overlay on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
        completed 
          ? "bg-gradient-to-r from-green-500 to-emerald-500" 
          : "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
      )} />

      {/* Content */}
      <div className="flex items-center gap-6 relative z-10 flex-1">
        {/* Icon */}
        <div className={cn(
          "p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300",
          completed 
            ? "bg-gradient-to-r from-green-500 to-emerald-500" 
            : "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
        )}>
          {completed ? (
            <Check className="w-6 h-6 text-white" />
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h2 className={cn(
            "text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300",
            completed 
              ? "text-green-800 dark:text-green-200 group-hover:from-green-600 group-hover:to-emerald-600" 
              : "text-gray-900 dark:text-white group-hover:from-purple-600 group-hover:to-pink-600"
          )}>
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Status and Arrow */}
      <div className="flex items-center gap-4 relative z-10">
        {completed && (
          <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
            Completed
          </div>
        )}
        
        <div className={cn(
          "rounded-full p-3 flex justify-center items-center transition-all duration-300 group-hover:scale-125 shadow-lg",
          completed 
            ? "bg-green-100 dark:bg-green-900/30 text-green-600" 
            : "bg-purple-100 dark:bg-purple-900/30 text-purple-600"
        )}>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
    </article>
  )
}