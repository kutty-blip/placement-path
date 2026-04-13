import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { Building2, CheckCircle } from "lucide-react";

const difficultyColor: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const Companies = () => {
  const { companies, getMatchedCompanies, profile } = useApp();
  const matched = getMatchedCompanies();
  const matchedNames = new Set(matched.map(c => c.name));

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Company Insights</h1>
        <p className="text-muted-foreground mb-6">
          {profile.skills.length > 0
            ? `Showing companies matching your skills: ${profile.skills.join(", ")}`
            : "Complete your profile to see personalized company matches."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map(c => (
            <div key={c.name} className={`bg-card rounded-xl p-5 border shadow-card ${matchedNames.has(c.name) ? "border-primary/30 ring-1 ring-primary/20" : "border-border"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-semibold text-foreground">{c.name}</h3>
                </div>
                {matchedNames.has(c.name) && <CheckCircle className="w-5 h-5 text-primary" />}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{c.process}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${difficultyColor[c.difficulty] || ""}`}>{c.difficulty}</span>
                {matchedNames.has(c.name) && <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">Match</span>}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.skillsRequired.map(s => (
                  <span key={s} className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Companies;
