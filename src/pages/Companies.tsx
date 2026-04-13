import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { Building2, CheckCircle, Star, StarOff, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const difficultyColor: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const Companies = () => {
  const { companies, getMatchedCompanies, profile, toggleShortlist } = useApp();
  const navigate = useNavigate();
  const matched = getMatchedCompanies();
  const matchedNames = new Set(matched.map(c => c.name));
  const shortlisted = new Set(profile.shortlistedCompanies || []);
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("All");
  const [showShortlisted, setShowShortlisted] = useState(false);

  let filtered = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  if (filterDifficulty !== "All") filtered = filtered.filter(c => c.difficulty === filterDifficulty);
  if (showShortlisted) filtered = filtered.filter(c => shortlisted.has(c.name));

  const handleShortlist = (name: string) => {
    toggleShortlist(name);
    toast.success(shortlisted.has(name) ? `${name} removed from shortlist` : `${name} added to shortlist!`);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Company Insights</h1>
            <p className="text-muted-foreground">
              {profile.skills.length > 0
                ? `Matching your skills: ${profile.skills.join(", ")}`
                : "Complete your profile to see personalized matches."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{shortlisted.size} shortlisted</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies..." className="pl-9" />
          </div>
          {["All", "Easy", "Medium", "Hard"].map(d => (
            <Button key={d} variant={filterDifficulty === d ? "default" : "outline"} size="sm"
              onClick={() => setFilterDifficulty(d)} className={filterDifficulty === d ? "gradient-primary text-primary-foreground" : ""}>
              {d}
            </Button>
          ))}
          <Button variant={showShortlisted ? "default" : "outline"} size="sm"
            onClick={() => setShowShortlisted(!showShortlisted)}
            className={showShortlisted ? "gradient-primary text-primary-foreground" : ""}>
            <Star className="w-3.5 h-3.5 mr-1" /> Shortlisted
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(c => (
            <div key={c.name} className={`bg-card rounded-xl p-5 border shadow-card transition-all ${
              shortlisted.has(c.name) ? "border-primary/40 ring-1 ring-primary/20" :
              matchedNames.has(c.name) ? "border-primary/20" : "border-border"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-semibold text-foreground">{c.name}</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  {matchedNames.has(c.name) && <CheckCircle className="w-4 h-4 text-primary" />}
                  <button onClick={() => handleShortlist(c.name)} className="hover:scale-110 transition-transform">
                    {shortlisted.has(c.name) ? <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> : <StarOff className="w-5 h-5 text-muted-foreground" />}
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{c.process}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${difficultyColor[c.difficulty] || ""}`}>{c.difficulty}</span>
                {matchedNames.has(c.name) && <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">Match</span>}
                {shortlisted.has(c.name) && <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">Shortlisted</span>}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {c.skillsRequired.map(s => (
                  <span key={s} className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{s}</span>
                ))}
              </div>
              <div className="flex gap-2 pt-2 border-t border-border">
                <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => navigate("/mock-test")}>Mock Test</Button>
                <Button size="sm" className="flex-1 text-xs gradient-primary text-primary-foreground" onClick={() => navigate("/interview")}>Interview Prep</Button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No companies found. Try adjusting your filters.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Companies;
