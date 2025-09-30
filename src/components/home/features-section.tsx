"use client";
import { BookOpen, Zap, Users, Shield, Sparkles, Heart } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Completely Free",
    description: "Access all features without any cost. No subscriptions, no hidden fees - just pure learning.",
    gradient: "from-red-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "AI-Powered Generation",
    description: "Generate custom quizzes and practice materials instantly using advanced AI technology.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: BookOpen,
    title: "Custom Learning Paths",
    description: "Create personalized courses and lessons tailored to your specific learning needs.",
    gradient: "from-green-500 to-teal-500"
  },
  {
    icon: Users,
    title: "Easy to Use",
    description: "Simple, intuitive interface that gets you learning immediately without complicated setup.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Sparkles,
    title: "Instant Quiz Creation",
    description: "Transform any topic into engaging quizzes within seconds using our smart AI system.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Shield,
    title: "Progress Tracking",
    description: "Keep track of your learning journey with basic progress indicators and completion status.",
    gradient: "from-pink-500 to-rose-500"
  }
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-24 px-4 bg-gradient-to-b from-transparent via-purple-50/50 to-transparent dark:via-purple-950/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Why Choose Learningo?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A free, simple, and effective way to create custom learning materials and track your progress
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative h-full p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="inline-flex p-4 rounded-2xl bg-purple-600 shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}