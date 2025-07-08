import HeroSection from "@/components/home/hero-section";
import TestimonialsSection from "@/components/home/testimonials-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 ">
      <HeroSection />
      <TestimonialsSection />
      {/* Add more sections here as your app grows */}
      <footer className="w-full text-center text-gray-500 py-4">
        <p className="text-sm">Crafted with ❤️ by Anay Paraswani</p>
      </footer>
    </div>
  );
}
  