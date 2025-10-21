"use client";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { ArrowRigh, BookOpen, Zap } from "lucide-react";

export default function HeroSection() {
  const { data, isPending } = useSession();
  
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 py-24 overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-60 h-60 bg-purple-200 rounded-full filter blur-2xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-32 w-60 h-60 bg-blue-200 rounded-full filter blur-2xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200/50 dark:border-purple-800/50 mb-8">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
            AI-Powered Learning Revolution
          </span>
        </div> */}

        {/* Main heading */}
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 dark:from-white dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
            Learn Anything,
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Anytime
          </span>
        </h1>        {/* Subtitle */}
        <p className="text-xl sm:text-2xl lg:text-3xl text-center max-w-4xl mx-auto mb-12 text-gray-700 dark:text-gray-200 leading-relaxed">
          The fastest way to revise for your next test. Instantly generate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold">
            last-minute revision courses
          </span>{" "}
          and quizzes on any topic.
        </p>

        {/* Feature highlights */}
                {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>AI-Generated Content</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Instant Quiz Creation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Progress Tracking</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={isPending || data ? "/dashboard" : "/sign-in"}>
            <button className="group relative px-8 py-4 text-xl font-bold text-white rounded-2xl bg-purple-600 hover:bg-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Start Revising Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </Link>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float animation-delay-2000">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </main>
  );
} 