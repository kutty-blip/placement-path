import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { Heart, Plus, Search, Building2, Lightbulb, X } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Experiences = () => {
  const { experiences, addExperience, likeExperience, profile, companies } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState("");
  const [content, setContent] = useState("");
  const [role, setRole] = useState("");
  const [tips, setTips] = useState("");
  const [filterCompany, setFilterCompany] = useState<string>("All");
  const [search, setSearch] = useState("");

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !content) { toast.error("Company and experience content are required"); return; }
    addExperience({
      id: Date.now().toString(),
      userId: profile.email,
      company,
      content,
      likes: 0,
      author: profile.name || "Anonymous",
      date: new Date().toISOString().split("T")[0],
      role: role || undefined,
      tips: tips || undefined,
    });
    setCompany(""); setContent(""); setRole(""); setTips(""); setShowForm(false);
    toast.success("Experience shared! Others can now learn from you.");
  };

  const companyNames = [...new Set(experiences.map(e => e.company))];
  let filtered = experiences;
  if (filterCompany !== "All") filtered = filtered.filter(e => e.company === filterCompany);
  if (search) filtered = filtered.filter(e =>
    e.content.toLowerCase().includes(search.toLowerCase()) ||
    e.company.toLowerCase().includes(search.toLowerCase()) ||
    e.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Placement Experiences</h1>
            <p className="text-muted-foreground">Learn from peers who've been through it. Share yours to help others!</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground">
            {showForm ? <><X className="w-4 h-4 mr-1" /> Cancel</> : <><Plus className="w-4 h-4 mr-1" /> Share Experience</>}
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handlePost} className="bg-card rounded-xl p-5 border border-border shadow-card mb-6 space-y-3">
            <h3 className="font-heading font-semibold text-foreground text-sm">Share Your Experience</h3>
            <div className="grid grid-cols-2 gap-3">
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger><SelectValue placeholder="Select company" /></SelectTrigger>
                <SelectContent>
                  {companies.map(c => (
                    <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                  ))}
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input value={role} onChange={e => setRole(e.target.value)} placeholder="Role (e.g., SDE, Analyst)" />
            </div>
            <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Describe your interview process, rounds, questions asked, difficulty level..." rows={4} />
            <Textarea value={tips} onChange={e => setTips(e.target.value)} placeholder="💡 Tips for future candidates (optional)" rows={2} />
            <Button type="submit" size="sm" className="gradient-primary text-primary-foreground">Post Experience</Button>
          </form>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search experiences..." className="pl-9" />
          </div>
          <Select value={filterCompany} onValueChange={setFilterCompany}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Companies</SelectItem>
              {companyNames.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filtered.map(exp => (
            <div key={exp.id} className="bg-card rounded-xl p-5 border border-border shadow-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground text-sm">{exp.author}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{exp.company}</span>
                  {exp.role && <span className="text-xs text-muted-foreground">· {exp.role}</span>}
                </div>
                <div className="flex items-center gap-3">
                  {exp.date && <span className="text-xs text-muted-foreground">{exp.date}</span>}
                  <button onClick={() => likeExperience(exp.id)} className="flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors">
                    <Heart className={`w-4 h-4 ${exp.likes > 0 ? "fill-destructive/20" : ""}`} /> <span className="text-xs">{exp.likes}</span>
                  </button>
                </div>
              </div>
              <p className="text-sm text-foreground/80 mb-2">{exp.content}</p>
              {exp.tips && (
                <div className="flex items-start gap-2 mt-2 pt-2 border-t border-border">
                  <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground italic">{exp.tips}</p>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No experiences found. Be the first to share!</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Experiences;
