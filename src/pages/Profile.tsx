import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

const Profile = () => {
  const { profile, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
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
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCollege(profile.college); setBranch(profile.branch);
    setCgpa(profile.cgpa.toString()); setSkills(profile.skills.join(", "));
    setTargets(profile.targetCompanies.join(", ")); setResumeText(profile.resumeText);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-2xl">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-2xl font-bold font-heading text-foreground">Your Profile</h1>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
        <p className="text-muted-foreground mb-6">
          {isEditing ? "Update your details below." : "Your personalized AI recommendations are based on this profile."}
        </p>
        
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-5 bg-card rounded-xl p-6 border border-border shadow-card animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>College</Label><Input value={college} onChange={e => setCollege(e.target.value)} placeholder="Your college" /></div>
              <div><Label>Branch</Label><Input value={branch} onChange={e => setBranch(e.target.value)} placeholder="CSE, ECE..." /></div>
            </div>
            <div><Label>CGPA</Label><Input type="number" step="0.1" min="0" max="10" value={cgpa} onChange={e => setCgpa(e.target.value)} placeholder="7.5" /></div>
            <div><Label>Skills (comma-separated)</Label><Input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Java, DSA, SQL, Python" /></div>
            <div><Label>Target Companies (comma-separated)</Label><Input value={targets} onChange={e => setTargets(e.target.value)} placeholder="TCS, Infosys, Zoho" /></div>
            <div><Label>Resume / About You</Label><Textarea value={resumeText} onChange={e => setResumeText(e.target.value)} placeholder="Paste your resume text or write about your experience..." rows={5} /></div>
            <div className="flex space-x-3 pt-2">
              <Button type="submit" className="gradient-primary text-primary-foreground">Save Changes</Button>
              <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 bg-card rounded-xl p-6 border border-border shadow-card animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">College</h3>
                <p className="text-foreground font-medium">{profile.college || "Not specified"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Branch</h3>
                <p className="text-foreground font-medium">{profile.branch || "Not specified"}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">CGPA</h3>
              <p className="text-foreground font-medium">{profile.cgpa || "Not specified"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.skills.length > 0 ? (
                  profile.skills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-foreground">Not specified</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Target Companies</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.targetCompanies.length > 0 ? (
                  profile.targetCompanies.map((company, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                      {company}
                    </span>
                  ))
                ) : (
                  <span className="text-foreground">Not specified</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Resume / About You</h3>
              <div className="bg-muted/30 p-4 rounded-lg mt-2 text-sm text-foreground whitespace-pre-wrap">
                {profile.resumeText || "No resume details provided."}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
