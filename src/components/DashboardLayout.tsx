import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Brain, BarChart3, Building2, MessageSquare, FileText, GraduationCap, Target, Users, Home, User, LogOut } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Brain, label: "AI Guidance", path: "/dashboard" },
  { icon: Target, label: "Mock Tests", path: "/mock-test" },
  { icon: Building2, label: "Companies", path: "/companies" },
  { icon: Users, label: "Experiences", path: "/experiences" },
  { icon: FileText, label: "Resume Analyzer", path: "/profile" },
  { icon: MessageSquare, label: "Interview Sim", path: "/interview" },
  { icon: BarChart3, label: "Progress", path: "/dashboard" },
  { icon: User, label: "Profile", path: "/profile" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, logout } = useApp();

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed h-full">
        <div className="p-5 flex items-center justify-between border-b border-sidebar-border">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-sidebar-foreground text-lg">PlacePrep</span>
          </div>
          <ThemeToggle />
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <button key={link.label} onClick={() => navigate(link.path)}
              className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                location.pathname === link.path ? "bg-sidebar-accent text-sidebar-primary font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}>
              <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              {link.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {profile.name?.[0]?.toUpperCase() || "S"}
              </div>
              <div className="text-sm">
                <div className="font-medium text-sidebar-foreground">{profile.name || "Student"}</div>
                <div className="text-sidebar-foreground/50 text-xs truncate max-w-[120px]">{profile.email}</div>
              </div>
            </div>
            <button onClick={() => { logout(); navigate("/login"); }} className="text-sidebar-foreground/50 hover:text-sidebar-foreground">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
