import { useState } from "react";
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
  Home,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const sidebarLinks = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Brain, label: "AI Guidance" },
  { icon: Target, label: "Mock Tests" },
  { icon: Building2, label: "Companies" },
  { icon: Users, label: "Experiences" },
  { icon: FileText, label: "Resume Analyzer" },
  { icon: MessageSquare, label: "Interview Sim" },
  { icon: BarChart3, label: "Progress" },
];

const recommendations = [
  { title: "Practice Arrays & Strings", type: "DSA", priority: "High" },
  { title: "SQL Joins Masterclass", type: "Database", priority: "Medium" },
  { title: "System Design Basics", type: "Design", priority: "Low" },
];

const recentTests = [
  { name: "Aptitude Test #3", score: 78, total: 100, date: "Today" },
  { name: "Java MCQ", score: 85, total: 100, date: "Yesterday" },
  { name: "Coding Challenge", score: 3, total: 5, date: "2 days ago" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed h-full">
        <div className="p-5 flex items-center gap-2 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span
            className="font-heading font-bold text-sidebar-foreground text-lg cursor-pointer"
            onClick={() => navigate("/")}
          >
            PlacePrep
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                link.active
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              S
            </div>
            <div className="text-sm">
              <div className="font-medium text-sidebar-foreground">Student</div>
              <div className="text-sidebar-foreground/50 text-xs">student@email.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3 bg-muted rounded-lg px-4 py-2 w-80">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search topics, companies..."
              className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
          </button>
        </header>

        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold font-heading text-foreground mb-1">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground mb-8">
              Here's your placement preparation overview.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Problems Solved", value: "142", icon: BookOpen, change: "+12 this week" },
              { label: "Test Score Avg", value: "82%", icon: TrendingUp, change: "+5% improvement" },
              { label: "Days Streak", value: "23", icon: Target, change: "Keep going!" },
              { label: "Companies Explored", value: "18", icon: Building2, change: "3 new this week" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-5 shadow-card border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold font-heading text-foreground">{stat.value}</div>
                <div className="text-xs text-accent mt-1">{stat.change}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Recommendations */}
            <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-card border border-border">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading font-semibold text-foreground flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Recommendations
                </h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <div
                    key={rec.title}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="font-medium text-foreground text-sm">{rec.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{rec.type}</div>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        rec.priority === "High"
                          ? "bg-destructive/10 text-destructive"
                          : rec.priority === "Medium"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tests */}
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h2 className="font-heading font-semibold text-foreground mb-5 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Recent Tests
              </h2>
              <div className="space-y-4">
                {recentTests.map((test) => (
                  <div key={test.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{test.name}</span>
                      <span className="text-muted-foreground text-xs">{test.date}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full gradient-primary transition-all"
                        style={{ width: `${(test.score / test.total) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {test.score}/{test.total}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
