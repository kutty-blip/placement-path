import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Send, Building2, ArrowLeft } from "lucide-react";
import { COMPANY_INTERVIEW_QUESTIONS } from "@/context/AppContext";
import { useApp } from "@/context/AppContext";

interface Message { role: "bot" | "user"; text: string }

const getFeedback = (answer: string, questionType: "hr" | "technical"): string => {
  const words = answer.trim().split(/\s+/).length;
  if (words < 5) return "⚠️ Too brief. Try to elaborate more with examples and details.";
  if (words < 15) return "🔸 Decent start, but try to add more depth. Mention specific examples or technologies.";

  if (questionType === "hr") {
    const keywords = ["project", "experience", "team", "leadership", "challenge", "goal", "learned", "achievement", "growth", "passion"];
    const found = keywords.filter(k => answer.toLowerCase().includes(k));
    if (found.length >= 2) return `✅ Strong answer! You mentioned key themes: ${found.join(", ")}. Shows self-awareness.`;
    if (words >= 25) return "👍 Good detail! Try weaving in themes like leadership, teamwork, or personal growth.";
    return "🔸 Add personal anecdotes and reflect on what you learned from experiences.";
  } else {
    const keywords = ["complexity", "example", "because", "algorithm", "structure", "pattern", "design", "implementation", "interface", "class", "function", "method"];
    const found = keywords.filter(k => answer.toLowerCase().includes(k));
    if (found.length >= 2) return `✅ Excellent technical explanation! Key concepts covered: ${found.join(", ")}.`;
    if (words >= 25) return "👍 Good length! Try to include specific technical terms, examples, or complexity analysis.";
    return "🔸 Include more technical depth — mention algorithms, data structures, or design patterns.";
  }
};

const InterviewSim = () => {
  const { profile } = useApp();
  const shortlisted = profile.shortlistedCompanies || [];
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [interviewType, setInterviewType] = useState<"hr" | "technical">("hr");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [questionIdx, setQuestionIdx] = useState(0);

  const companyQs = COMPANY_INTERVIEW_QUESTIONS.find(c => c.company === selectedCompany);
  const questions = companyQs ? (interviewType === "hr" ? companyQs.hrQuestions : companyQs.technicalQuestions) : [];

  const startInterview = (company: string, type: "hr" | "technical") => {
    setSelectedCompany(company);
    setInterviewType(type);
    setQuestionIdx(0);
    const cq = COMPANY_INTERVIEW_QUESTIONS.find(c => c.company === company);
    const qs = cq ? (type === "hr" ? cq.hrQuestions : cq.technicalQuestions) : [];
    setMessages([
      { role: "bot", text: `Welcome to the ${company} ${type === "hr" ? "HR" : "Technical"} Interview Simulator! I'll ask you questions commonly asked at ${company}. Answer as you would in a real interview.` },
      { role: "bot", text: qs[0] || "No questions available." },
    ]);
    setInput("");
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    const feedback = getFeedback(input, interviewType);
    const feedbackMsg: Message = { role: "bot", text: feedback };
    const nextIdx = questionIdx + 1;
    const newMessages = [userMsg, feedbackMsg];
    if (nextIdx < questions.length) {
      newMessages.push({ role: "bot", text: questions[nextIdx] });
      setQuestionIdx(nextIdx);
    } else {
      newMessages.push({ role: "bot", text: `🎉 Great job! You've completed the ${selectedCompany} ${interviewType === "hr" ? "HR" : "Technical"} mock interview. Review the feedback above to prepare better!` });
    }
    setMessages(prev => [...prev, ...newMessages]);
    setInput("");
  };

  // Company selection screen
  if (!selectedCompany) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-4xl">
          <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Interview Simulator</h1>
          <p className="text-muted-foreground mb-6">Choose a company and interview type to practice.</p>

          {shortlisted.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Your Shortlisted Companies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {shortlisted.map(name => (
                  <div key={name} className="bg-primary/5 border-2 border-primary/30 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-5 h-5 text-primary" />
                      <span className="font-heading font-semibold text-foreground">{name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startInterview(name, "hr")} className="flex-1 text-xs">HR Round</Button>
                      <Button size="sm" className="flex-1 text-xs gradient-primary text-primary-foreground" onClick={() => startInterview(name, "technical")}>Technical</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">All Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMPANY_INTERVIEW_QUESTIONS.map(cq => (
              <div key={cq.company} className="bg-card border border-border rounded-xl p-5 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="font-heading font-semibold text-foreground">{cq.company}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{cq.hrQuestions.length} HR + {cq.technicalQuestions.length} Technical questions</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startInterview(cq.company, "hr")} className="flex-1 text-xs">HR Round</Button>
                  <Button size="sm" className="flex-1 text-xs gradient-primary text-primary-foreground" onClick={() => startInterview(cq.company, "technical")}>Technical</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Chat screen
  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl flex flex-col h-[calc(100vh-2rem)]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setSelectedCompany(null)} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></button>
          <div>
            <h1 className="text-xl font-bold font-heading text-foreground">{selectedCompany} — {interviewType === "hr" ? "HR" : "Technical"} Interview</h1>
            <p className="text-muted-foreground text-sm">Question {Math.min(questionIdx + 1, questions.length)} of {questions.length}</p>
          </div>
        </div>

        <div className="flex-1 bg-card rounded-xl border border-border shadow-card p-5 overflow-y-auto space-y-3 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "bot" && <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-0.5"><Bot className="w-4 h-4 text-primary-foreground" /></div>}
              <div className={`max-w-[80%] text-sm px-4 py-2.5 rounded-xl ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}>{msg.text}</div>
              {msg.role === "user" && <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5"><User className="w-4 h-4 text-muted-foreground" /></div>}
            </div>
          ))}
        </div>

        {questionIdx < questions.length && (
          <div className="flex gap-2">
            <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Type your answer..."
              rows={2} className="flex-1" onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }} />
            <Button onClick={handleSend} className="gradient-primary text-primary-foreground self-end"><Send className="w-4 h-4" /></Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InterviewSim;
