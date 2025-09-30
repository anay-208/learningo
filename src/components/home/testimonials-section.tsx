"use client";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            From Our Creator
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A message from the developer who built Learningo to help students learn better
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-purple-200/20 dark:border-purple-700/20 shadow-xl max-w-2xl">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              "I created Learningo because I believe learning should be accessible, engaging, and completely free. 
              As a developer and student myself, I wanted to build something that could help anyone generate 
              custom quizzes and practice materials without any barriers. This is just the beginning - 
              there's so much more to come!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Anay Paraswani</h4>
                <p className="text-purple-600 dark:text-purple-400 text-sm">Creator & Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 