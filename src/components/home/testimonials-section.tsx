export default function TestimonialsSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Testimonials</h2>
      <div className="max-w-xl w-full bg-gray-50 dark:bg-zinc-900 rounded-xl shadow-lg p-8 border border-border dark:border-zinc-800 flex flex-col items-center">
        <p className="text-lg text-foreground mb-4 text-center">
          “Learningo is perfect for last-minute revision. The quick quizzes help me test my knowledge right before exams and make revision much more effective. Sometimes the AI gets an answer wrong, but overall it’s a great tool for fast, focused practice!”
        </p>
        <div className="flex flex-col items-center mb-2">
          <span className="font-semibold text-primary">Anay Paraswani</span>
          <span className="text-sm text-muted-foreground">Founder & Developer, Student at JPIS</span>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          If you&apos;d like to share your experience with Learningo, feel free to email your testimonial to <a href="mailto:me@anayparaswani.dev" className="underline">me@anayparaswani.dev</a>!
        </p>
      </div>
    </section>
  );
} 