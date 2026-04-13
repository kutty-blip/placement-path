import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary-foreground/10 bg-foreground/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-primary-foreground text-lg">PlacePrep</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-primary-foreground/70">
          <a href="#features" className="hover:text-primary-foreground transition-colors">Features</a>
          <a href="#" className="hover:text-primary-foreground transition-colors">Companies</a>
          <a href="#" className="hover:text-primary-foreground transition-colors">Experiences</a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate("/login")}>
            Log in
          </Button>
          <Button variant="hero" size="sm" onClick={() => navigate("/login")}>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
