import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CTASection from "@/components/landing/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <CTASection />
      <footer className="py-8 bg-foreground text-primary-foreground/40 text-center text-sm border-t border-primary-foreground/10">
        <p>© 2026 PlacePrep. Built to help you succeed.</p>
      </footer>
    </div>
  );
};

export default Index;
