import { motion } from "framer-motion";
import {
  Brain,
  BarChart3,
  Building2,
  MessageSquare,
  FileText,
  GraduationCap,
  Target,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Guidance",
    description: "Personalized roadmaps, daily plans, and skill recommendations powered by AI.",
  },
  {
    icon: Target,
    title: "Mock Tests",
    description: "Aptitude, coding, and technical MCQ tests with auto-evaluation and scoring.",
  },
  {
    icon: Building2,
    title: "Company Insights",
    description: "Selection processes, difficulty levels, and frequently asked questions for top companies.",
  },
  {
    icon: Users,
    title: "Experience Sharing",
    description: "Learn from peers who've been through the process. Post, like, and comment.",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    description: "Upload your resume and get AI-powered feedback with skill gap analysis.",
  },
  {
    icon: MessageSquare,
    title: "Interview Simulator",
    description: "Practice HR and technical questions with real-time AI feedback.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Track problems solved, test scores, weak topics, and study consistency.",
  },
  {
    icon: GraduationCap,
    title: "Smart Predictions",
    description: "AI predicts which companies match your profile and suggests preparation focus.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
            Everything You Need to <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete placement preparation ecosystem designed to maximize your chances.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group gradient-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow border border-border"
            >
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
