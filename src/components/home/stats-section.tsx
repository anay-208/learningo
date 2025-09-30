"use client";
import { TrendingUp, Users, BookOpen } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "5+",
    label: "Early Users",
    description: "Students already using Learningo",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: BookOpen,
    number: "25+",
    label: "Lessons Created",
    description: "AI-powered content generated",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: TrendingUp,
    number: "100%",
    label: "Free Forever",
    description: "Always accessible to everyone",
    gradient: "from-green-500 to-teal-500"
  }
];

export default function StatsSection() {
  return (
    <section className="w-full py-20 px-4 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950/30 dark:via-blue-950/30 dark:to-pink-950/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Trusted by Students Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who have transformed their learning experience with Learningo
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-md mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>

                {/* Number */}
                <div className={`text-4xl sm:text-5xl font-extrabold mb-2 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>      

                {/* Label */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>

                {/* Decorative pulse */}
                <div className={`absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br ${stat.gradient} rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300`} />
              </div>
            </div>
          ))}
        </div>

        {/* Asterisk note */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            *Based on 25th September 2025
          </p>
        </div>
      </div>
    </section>
  );
}