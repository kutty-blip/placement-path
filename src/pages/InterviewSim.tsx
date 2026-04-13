import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Send } from "lucide-react";

const interviewQuestions = [
  "Tell me about yourself.",
  "What is polymorphism in OOP?",
  "Explain a project you have built.",
  "What are your strengths and weaknesses?",
  "Why should we hire you?",
];

interface Message { role: "bot" | "user"; text: string }

const getFeedback = (answer: string): string => {
  const words = answer.trim().split(/\s+/).length;
  if (words < 5) return "⚠️ Too brief. Try to elaborate more with examples and details.";
  if (words < 15) return "🔸 Decent, but try to add more depth. Mention specific technologies or experiences.";
  const keywords = ["project", "experience", "team", "built", "developed", "learned", "technology", "problem", "solution"];
  const found = keywords.filter(k => answer.toLowerCase().includes(k));
  if (found.length >= 2) return `✅ Great answer! You covered key points: ${found.join(", ")}. Well structured.`;
  if (words >= 20) return "👍 Good length! Try incorporating keywords like 'project', 'experience', 'solution' for more impact.";
  return "🔸 Okay response. Consider adding specific examples to make it stronger.";
};

const InterviewSim = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Welcome to the Interview Simulator! I'll ask you common interview questions. Answer as you would in a real interview." },
    { role: "bot", text: interviewQuestions[0] },
  ]);
  const [input, setInput] = useState("");
  const [questionIdx, setQuestionIdx] = useState(0);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    const feedback = getFeedback(input);
    const feedbackMsg: Message = { role: "bot", text: feedback };
    const nextIdx = questionIdx + 1;
    const newMessages = [userMsg, feedbackMsg];
    if (nextIdx < interviewQuestions.length) {
      newMessages.push({ role: "bot", text: interviewQuestions[nextIdx] });
      setQuestionIdx(nextIdx);
    } else {
      newMessages.push({ role: "bot", text: "🎉 That's all! You've completed the mock interview. Review the feedback above to improve." });
    }
    setMessages(prev => [...prev, ...newMessages]);
    setInput("");
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl flex flex-col h-[calc(100vh-2rem)]">
        <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Interview Simulator</h1>
        <p className="text-muted-foreground mb-4">Practice with AI-powered interview questions and get instant feedback.</p>

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

        {questionIdx < interviewQuestions.length && (
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
