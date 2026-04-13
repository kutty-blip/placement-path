import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 gradient-hero">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-primary-foreground mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-10">
            Join thousands of students who are already preparing smarter with AI-powered guidance.
          </p>
          <Button
            variant="hero"
            size="lg"
            className="text-base px-10 py-6"
            onClick={() => navigate("/dashboard")}
          >
            Start Preparing Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
