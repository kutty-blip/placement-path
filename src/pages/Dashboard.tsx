import { motion } from "framer-motion";
import { Brain, BarChart3, Building2, BookOpen, TrendingUp, Target, AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, getAIRecommendations, getMatchedCompanies, getProgressStats, testResults } = useApp();
  const recs = getAIRecommendations();
  const matched = getMatchedCompanies();
  const stats = getProgressStats();

  return (
    <DashboardLayout>
      <div className="p-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold font-heading text-foreground mb-1">
            Welcome back, {profile.name || "Student"}! 👋
          </h1>
          <p className="text-muted-foreground mb-8">Here's your placement preparation overview.</p>
        </motion.div>

        {!profile.college && (
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-6 flex items-center gap-3 cursor-pointer hover:bg-accent/15 transition-colors" onClick={() => navigate("/profile")}>
            <AlertTriangle className="w-5 h-5 text-accent" />
            <span className="text-sm text-foreground">Complete your profile to unlock personalized AI recommendations →</span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Tests Taken", value: stats.totalTests.toString(), icon: BookOpen, change: `${stats.totalTests > 0 ? "Keep going!" : "Take your first test"}` },
            { label: "Avg Score", value: stats.avg ? `${stats.avg}%` : "—", icon: TrendingUp, change: stats.avg >= 70 ? "Great progress!" : "Room to improve" },
            { label: "Day Streak", value: stats.streak.toString(), icon: Target, change: "Stay consistent!" },
            { label: "Shortlisted", value: shortlisted.length.toString(), icon: Building2, change: `${matched.length} matched` },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-5 shadow-card border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><stat.icon className="w-5 h-5 text-primary" /></div>
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
                <Brain className="w-5 h-5 text-primary" /> AI Recommendations
              </h2>
              <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/profile")}>
                Update Profile <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {recs.map((rec, i) => (
                <div key={i} className="flex items-center p-4 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full gradient-primary mr-3 shrink-0" />
                  <span className="text-sm text-foreground">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tests */}
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" /> Recent Tests
              </h2>
              <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/mock-test")}>
                Take Test <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            {testResults.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tests taken yet. Take a mock test to see results here.</p>
            ) : (
              <div className="space-y-4">
                {testResults.slice(0, 5).map(test => (
                  <div key={test.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{test.type}</span>
                      <span className="text-muted-foreground text-xs">{test.date}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="h-2 rounded-full gradient-primary transition-all" style={{ width: `${(test.score / test.total) * 100}%` }} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{test.score}/{test.total}</div>
                  </div>
                ))}
              </div>
            )}

            {stats.weakAreas.length > 0 && (
              <div className="mt-5 pt-4 border-t border-border">
                <h3 className="text-sm font-medium text-foreground mb-2">Weak Areas</h3>
                <div className="flex flex-wrap gap-1.5">
                  {stats.weakAreas.map(a => (
                    <span key={a} className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Matched Companies */}
        <div className="mt-6 bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-foreground flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" /> Recommended Companies
            </h2>
            <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/companies")}>
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {matched.slice(0, 3).map(c => (
              <div key={c.name} className="p-4 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors" onClick={() => navigate("/companies")}>
                <div className="font-medium text-foreground text-sm">{c.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{c.difficulty} · {c.skillsRequired.join(", ")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
