import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

const Profile = () => {
  const { profile, updateProfile } = useApp();
  const [college, setCollege] = useState(profile.college);
  const [branch, setBranch] = useState(profile.branch);
  const [cgpa, setCgpa] = useState(profile.cgpa.toString());
  const [skills, setSkills] = useState(profile.skills.join(", "));
  const [targets, setTargets] = useState(profile.targetCompanies.join(", "));
  const [resumeText, setResumeText] = useState(profile.resumeText);

  useEffect(() => {
    setCollege(profile.college); setBranch(profile.branch);
    setCgpa(profile.cgpa.toString()); setSkills(profile.skills.join(", "));
    setTargets(profile.targetCompanies.join(", ")); setResumeText(profile.resumeText);
  }, [profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      college, branch,
      cgpa: parseFloat(cgpa) || 0,
      skills: skills.split(",").map(s => s.trim()).filter(Boolean),
      targetCompanies: targets.split(",").map(s => s.trim()).filter(Boolean),
      resumeText,
    });
    toast.success("Profile saved! Your dashboard will update with personalized recommendations.");
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-2xl">
        <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Your Profile</h1>
        <p className="text-muted-foreground mb-6">Fill in your details to get personalized AI recommendations.</p>
        <form onSubmit={handleSave} className="space-y-5 bg-card rounded-xl p-6 border border-border shadow-card">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>College</Label><Input value={college} onChange={e => setCollege(e.target.value)} placeholder="Your college" /></div>
            <div><Label>Branch</Label><Input value={branch} onChange={e => setBranch(e.target.value)} placeholder="CSE, ECE..." /></div>
          </div>
          <div><Label>CGPA</Label><Input type="number" step="0.1" min="0" max="10" value={cgpa} onChange={e => setCgpa(e.target.value)} placeholder="7.5" /></div>
          <div><Label>Skills (comma-separated)</Label><Input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Java, DSA, SQL, Python" /></div>
          <div><Label>Target Companies (comma-separated)</Label><Input value={targets} onChange={e => setTargets(e.target.value)} placeholder="TCS, Infosys, Zoho" /></div>
          <div><Label>Resume / About You</Label><Textarea value={resumeText} onChange={e => setResumeText(e.target.value)} placeholder="Paste your resume text or write about your experience..." rows={5} /></div>
          <Button type="submit" className="gradient-primary text-primary-foreground">Save Profile</Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
