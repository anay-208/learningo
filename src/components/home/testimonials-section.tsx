import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-20 px-4">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-foreground tracking-tight drop-shadow-sm">
        Testimonials
      </h2>
      <div className="max-w-xl w-full bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-2xl p-10 border border-border dark:border-zinc-800 flex flex-col items-center relative">
        <Quote className="absolute -top-6 left-6 text-primary w-8 h-8 opacity-30" />
        <p className="text-xl text-foreground mb-6 text-center font-medium leading-relaxed">
          “Learningo is perfect for last-minute revision. The quick quizzes help me test my knowledge right before exams and make revision much more effective. Sometimes the AI gets an answer wrong, but overall it’s a great tool for fast, focused practice!”
        </p>
        <div className="flex flex-col items-center mb-2">
          <img
            src="https://avatars.githubusercontent.com/u/96932471?v=4"
            alt="Anay Paraswani avatar"
            className="w-14 h-14 rounded-full border-2 border-primary mb-2 shadow"
          />
          <span className="font-semibold text-primary text-lg">Anay Paraswani</span>
          <span className="text-sm text-muted-foreground">Founder & Developer, Student at JPIS</span>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-6">
          If you&apos;d like to share your experience with Learningo, feel free to email your testimonial to{' '}
          <a
            href="mailto:me@anayparaswani.dev"
            className="underline text-primary hover:text-primary/80 transition-colors duration-150"
          >
            me@anayparaswani.dev
          </a>
          !
        </p>
      </div>
    </section>
  );
} 