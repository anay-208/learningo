import HeroSection from "@/components/home/hero-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import FeaturesSection from "@/components/home/features-section";
import StatsSection from "@/components/home/stats-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full overflow-hidden pt-20">
      <HeroSection />   
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <footer className="w-full text-center py-12 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950 dark:via-blue-950 dark:to-pink-950 border-t border-purple-200/20 dark:border-purple-800/20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-lg font-medium bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Crafted with ❤️ by Anay Paraswani
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Empowering students worldwide with AI-powered learning
          </p>
        </div>
      </footer>
    </div>
  );
}
    