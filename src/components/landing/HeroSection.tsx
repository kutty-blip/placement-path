import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/90" />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground/80 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            AI-Powered Placement Preparation
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-primary-foreground leading-tight mb-6">
            Crack Your Dream
            <br />
            <span className="text-gradient">Placement</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 font-body">
            Personalized AI guidance, mock tests, company insights, and community experiences — everything you need to land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              className="text-base px-8 py-6"
              onClick={() => navigate("/dashboard")}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              className="text-base px-8 py-6"
            >
              Explore Features
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 flex justify-center gap-12 text-primary-foreground/50 text-sm"
        >
          {["10K+ Students", "500+ Companies", "95% Success Rate"].map((stat) => (
            <div key={stat} className="text-center">
              <div className="text-2xl font-bold text-primary-foreground font-heading">
                {stat.split(" ")[0]}
              </div>
              <div>{stat.split(" ").slice(1).join(" ")}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
