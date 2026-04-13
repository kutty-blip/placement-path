import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";

const Experiences = () => {
  const { experiences, addExperience, likeExperience, profile } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState("");
  const [content, setContent] = useState("");

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !content) { toast.error("Fill all fields"); return; }
    addExperience({ id: Date.now().toString(), userId: profile.email, company, content, likes: 0, author: profile.name || "Anonymous" });
    setCompany(""); setContent(""); setShowForm(false);
    toast.success("Experience shared!");
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Experiences</h1>
            <p className="text-muted-foreground">Learn from peers' placement experiences.</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-1" /> Share
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handlePost} className="bg-card rounded-xl p-5 border border-border shadow-card mb-6 space-y-3">
            <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company name" />
            <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Share your experience..." rows={4} />
            <Button type="submit" size="sm" className="gradient-primary text-primary-foreground">Post</Button>
          </form>
        )}

        <div className="space-y-4">
          {experiences.map(exp => (
            <div key={exp.id} className="bg-card rounded-xl p-5 border border-border shadow-card">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium text-foreground text-sm">{exp.author}</span>
                  <span className="text-xs text-muted-foreground ml-2">@ {exp.company}</span>
                </div>
                <button onClick={() => likeExperience(exp.id)} className="flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors">
                  <Heart className="w-4 h-4" /> <span className="text-xs">{exp.likes}</span>
                </button>
              </div>
              <p className="text-sm text-foreground/80">{exp.content}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Experiences;
