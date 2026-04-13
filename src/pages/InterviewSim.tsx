import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Send, Building2, ArrowLeft, Mic, MicOff, Volume2, Sparkles } from "lucide-react";
import { COMPANY_INTERVIEW_QUESTIONS } from "@/context/AppContext";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

interface Message { role: "bot" | "user"; text: string }

// ===== SMART RESPONSE ENGINE =====
// Analyzes what the user said, extracts topics, and generates a contextual reply

const HR_TOPIC_MAP: Record<string, { followUp: string; praise: string; tip: string }> = {
  "tell me about yourself": {
    followUp: "I noticed you mentioned some key points about yourself. Could you also touch on what specifically draws you to this role?",
    praise: "Nice self-introduction! You gave a clear picture of your background.",
    tip: "💡 Tip: Structure your answer as Present → Past → Future for maximum impact."
  },
  "why": {
    followUp: "You mentioned your motivation clearly. Can you also share what specifically about the company's culture or mission excites you?",
    praise: "Good reasoning for wanting to join!",
    tip: "💡 Tip: Mention specific company projects, values, or recent news to show genuine interest."
  },
  "strength": {
    followUp: "Those are relevant strengths! Can you walk me through a specific situation where one of these strengths made a difference?",
    praise: "Good self-awareness in identifying your strengths.",
    tip: "💡 Tip: Always back up each strength with a real example from your experience."
  },
  "weakness": {
    followUp: "I appreciate your honesty. How are you actively working to improve on that weakness?",
    praise: "Good approach to frame your weakness constructively!",
    tip: "💡 Tip: Show self-improvement — mention steps you're taking to address the weakness."
  },
  "challenge": {
    followUp: "That's a compelling challenge. What was the outcome and what specifically did you learn from it?",
    praise: "Great storytelling around the challenge you faced!",
    tip: "💡 Tip: Use the STAR method — Situation, Task, Action, Result."
  },
  "team": {
    followUp: "Teamwork is crucial! Can you describe a specific conflict within a team and how you resolved it?",
    praise: "Excellent demonstration of your teamwork skills!",
    tip: "💡 Tip: Highlight your specific role and contribution in the team."
  },
  "goal": {
    followUp: "Good career vision. How does this position specifically fit into your 5-year plan?",
    praise: "Clear and focused career goals!",
    tip: "💡 Tip: Align your goals with the company's growth trajectory."
  },
  "project": {
    followUp: "Interesting project! What was the most technically challenging part, and how did you overcome it?",
    praise: "Great project showcase with relevant details!",
    tip: "💡 Tip: Quantify impact — mention users served, performance improvements, or metrics."
  },
  "leadership": {
    followUp: "Strong leadership example. How did you handle any disagreements or pushback from the team?",
    praise: "Impressive leadership qualities demonstrated!",
    tip: "💡 Tip: Show how you empowered others, not just directed them."
  },
  "pressure": {
    followUp: "Good approach to handling pressure. Can you share the specific outcome of that situation?",
    praise: "Excellent composure under pressure!",
    tip: "💡 Tip: Show your problem-solving process, not just the result."
  }
};

const TECH_TOPIC_MAP: Record<string, { followUp: string; praise: string; tip: string }> = {
  "array": {
    followUp: "Good understanding of arrays. What would be the time complexity if we used a different approach, say a hash map?",
    praise: "Solid array fundamentals!",
    tip: "💡 Tip: Always discuss time and space trade-offs when explaining array operations."
  },
  "linked list": {
    followUp: "Nice explanation! How would the approach change for a doubly linked list?",
    praise: "Good grasp of linked list concepts!",
    tip: "💡 Tip: Draw out pointer movements when explaining — interviewers love visual thinkers."
  },
  "tree": {
    followUp: "Good! Can you explain the difference between a balanced BST and a regular BST in terms of performance?",
    praise: "Strong tree knowledge!",
    tip: "💡 Tip: Mention traversal types (inorder, preorder, postorder) and when each is useful."
  },
  "graph": {
    followUp: "Excellent! When would you choose BFS over DFS, and vice versa?",
    praise: "Great graph algorithm understanding!",
    tip: "💡 Tip: Always clarify if the graph is directed/undirected, weighted/unweighted."
  },
  "hash": {
    followUp: "Good point about hashing! How do you handle hash collisions in practice?",
    praise: "Nice understanding of hash-based data structures!",
    tip: "💡 Tip: Mention collision resolution strategies — chaining vs. open addressing."
  },
  "sort": {
    followUp: "Good comparison! When would you prefer quicksort over merge sort in practice?",
    praise: "Solid sorting algorithm knowledge!",
    tip: "💡 Tip: Discuss stability, in-place vs. extra space, and best/worst cases."
  },
  "dynamic programming": {
    followUp: "Nice! Can you walk through the recurrence relation and how you'd optimize it with tabulation?",
    praise: "Great DP explanation with good structure!",
    tip: "💡 Tip: Start with brute force, add memoization, then optimize to tabulation."
  },
  "complexity": {
    followUp: "Good complexity analysis! Can you also analyze the space complexity of your approach?",
    praise: "Excellent analytical thinking about complexity!",
    tip: "💡 Tip: Always state both time AND space complexity — interviewers expect both."
  },
  "sql": {
    followUp: "Good SQL knowledge! Can you write a query to find the nth highest salary using a subquery or window function?",
    praise: "Strong database querying skills!",
    tip: "💡 Tip: Practice window functions (ROW_NUMBER, RANK) — they're frequently asked."
  },
  "oop": {
    followUp: "Good OOP explanation! Can you give a real-world example of polymorphism in code?",
    praise: "Solid object-oriented design understanding!",
    tip: "💡 Tip: Use real-world analogies and then map them to code — it impresses interviewers."
  },
  "design": {
    followUp: "Interesting design choices! How would you handle scaling this system to millions of users?",
    praise: "Great system design thinking!",
    tip: "💡 Tip: Discuss trade-offs, bottlenecks, and how you'd monitor the system."
  },
  "api": {
    followUp: "Good understanding of APIs! Can you explain REST vs. GraphQL and when you'd pick each?",
    praise: "Nice API design knowledge!",
    tip: "💡 Tip: Mention authentication, rate limiting, and versioning in API discussions."
  }
};

const generateSmartResponse = (answer: string, question: string, questionType: "hr" | "technical"): string[] => {
  const lowerAnswer = answer.toLowerCase().trim();
  const lowerQuestion = question.toLowerCase();
  const words = answer.trim().split(/\s+/).length;
  const responses: string[] = [];

  // ===== Too short =====
  if (words < 5) {
    responses.push("⚠️ Your answer is very brief. In a real interview, this would not leave a strong impression.");
    responses.push("Try expanding your answer with specific examples, numbers, or experiences. Even 2-3 sentences can make a big difference.");
    return responses;
  }

  // ===== Contextual analysis =====
  const topicMap = questionType === "hr" ? HR_TOPIC_MAP : TECH_TOPIC_MAP;
  let matchedTopic: { followUp: string; praise: string; tip: string } | null = null;
  let matchKey = "";

  // Check question context first
  for (const [key, value] of Object.entries(topicMap)) {
    if (lowerQuestion.includes(key) || lowerAnswer.includes(key)) {
      matchedTopic = value;
      matchKey = key;
      break;
    }
  }

  // ===== Build contextual response =====
  
  // 1. Acknowledge what they said by extracting key phrases
  const userPhrases = lowerAnswer.match(/\b\w{5,}\b/g) || [];
  const significantWords = userPhrases.filter(w => 
    !["about", "which", "there", "their", "where", "would", "could", "should", "think", "because", "really", "other"].includes(w)
  ).slice(0, 3);

  if (significantWords.length > 0 && words >= 10) {
    responses.push(`📝 I see you touched on ${significantWords.map(w => `"${w}"`).join(", ")}. Let me give you detailed feedback.`);
  }

  // 2. Quality-based praise
  if (matchedTopic && words >= 15) {
    responses.push(`✅ ${matchedTopic.praise}`);
  } else if (words >= 25) {
    responses.push("✅ Good depth in your answer! You provided enough detail to demonstrate understanding.");
  } else if (words >= 15) {
    responses.push("👍 Decent answer with relevant points. Adding more specifics would strengthen it further.");
  } else {
    responses.push("🔸 Your answer covers the basics but could benefit from more depth and examples.");
  }

  // 3. Content-specific feedback for HR
  if (questionType === "hr") {
    const hrKeywords = ["project", "experience", "team", "leadership", "challenge", "goal", "learned", "achievement", "growth", "passion", "motivated", "contribute", "result", "impact", "improved"];
    const found = hrKeywords.filter(k => lowerAnswer.includes(k));
    if (found.length >= 3) {
      responses.push(`🌟 Strong themes detected: ${found.join(", ")}. This shows strong self-awareness and professionalism!`);
    } else if (found.length >= 1) {
      responses.push(`Good that you mentioned: ${found.join(", ")}. Try also incorporating words like "result", "impact", or "achievement" to add weight.`);
    }

    // Check for STAR method
    const hasSTAR = lowerAnswer.includes("situation") || lowerAnswer.includes("task") || lowerAnswer.includes("action") || lowerAnswer.includes("result");
    if (hasSTAR) {
      responses.push("⭐ Great use of the STAR method structure! This is exactly how interviewers like answers framed.");
    }
  }

  // 4. Content-specific feedback for Technical
  if (questionType === "technical") {
    const techKeywords = ["complexity", "o(", "algorithm", "structure", "pattern", "implementation", "interface", "class", "function", "method", "example", "time", "space", "log", "linear"];
    const found = techKeywords.filter(k => lowerAnswer.includes(k));
    if (found.length >= 3) {
      responses.push(`🌟 Excellent technical depth! Key concepts: ${found.join(", ")}. This would impress in a real interview.`);
    } else if (found.length >= 1) {
      responses.push(`Technical concepts mentioned: ${found.join(", ")}. Consider also discussing complexity analysis or providing a code example to strengthen your answer.`);
    } else {
      responses.push("Consider adding technical specifics — mention data structures, algorithms, complexity (Big O), or code examples.");
    }
  }

  // 5. Contextual follow-up question
  if (matchedTopic) {
    responses.push(matchedTopic.tip);
    if (words >= 10) {
      responses.push(`\n🤔 Follow-up: ${matchedTopic.followUp}`);
    }
  }

  // 6. Confidence/delivery tips based on patterns
  if (lowerAnswer.includes("i think") || lowerAnswer.includes("maybe") || lowerAnswer.includes("i guess")) {
    responses.push("🗣️ Delivery tip: Avoid hedging words like \"I think\" or \"maybe\". Speak with confidence — \"I believe\" or \"In my experience\" sounds stronger.");
  }
  if (lowerAnswer.includes("i don't know") || lowerAnswer.includes("not sure")) {
    responses.push("🗣️ It's okay to not know everything, but try saying: \"I haven't worked with this directly, but I would approach it by...\" — this shows problem-solving attitude.");
  }

  return responses;
};

// Check for Web Speech API support
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const speechSynthesis = window.speechSynthesis;

const InterviewSim = () => {
  const { profile } = useApp();
  const shortlisted = profile.shortlistedCompanies || [];
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [interviewType, setInterviewType] = useState<"hr" | "technical">("hr");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const companyQs = COMPANY_INTERVIEW_QUESTIONS.find(c => c.company === selectedCompany);
  const questions = companyQs ? (interviewType === "hr" ? companyQs.hrQuestions : companyQs.technicalQuestions) : [];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speakText = (text: string) => {
    if (!voiceEnabled || !speechSynthesis) return;
    speechSynthesis.cancel();
    const cleanText = text.replace(/[✅🔸⚠️👍🌟⭐🤔💡🗣️📝🎉🎤]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  const startInterview = (company: string, type: "hr" | "technical") => {
    setSelectedCompany(company);
    setInterviewType(type);
    setQuestionIdx(0);
    const cq = COMPANY_INTERVIEW_QUESTIONS.find(c => c.company === company);
    const qs = cq ? (type === "hr" ? cq.hrQuestions : cq.technicalQuestions) : [];
    const welcomeText = `Welcome to the ${company} ${type === "hr" ? "HR" : "Technical"} Interview Simulator! I'll be your interviewer today. I'll ask you questions commonly asked at ${company}, and I'll give you detailed feedback on each answer. ${type === "hr" ? "You can use the microphone to answer with your voice — just like a real interview! 🎤" : "Take your time and answer as you would in a real interview. 💻"}`;
    const firstQ = qs[0] || "No questions available.";
    setMessages([
      { role: "bot", text: welcomeText },
      { role: "bot", text: `📋 Question 1/${qs.length}: ${firstQ}` },
    ]);
    setInput("");
    if (type === "hr") {
      setTimeout(() => speakText(firstQ), 1000);
    }
  };

  const startListening = () => {
    if (!SpeechRecognition) {
      toast.error("Voice input is not supported in your browser. Please use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interim = transcript;
        }
      }
      setInput(finalTranscript + interim);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === "not-allowed") {
        toast.error("Microphone access denied. Please allow microphone permissions.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    toast.info("🎤 Listening... Speak your answer clearly");
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    if (isListening) stopListening();

    const userMsg: Message = { role: "user", text: input };
    const currentQuestion = questions[questionIdx] || "";
    
    // Show typing indicator
    setIsTyping(true);
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate "thinking" delay for realism
    setTimeout(() => {
      const feedbackParts = generateSmartResponse(input, currentQuestion, interviewType);
      const feedbackMessages: Message[] = feedbackParts.map(text => ({ role: "bot", text }));
      
      const nextIdx = questionIdx + 1;

      if (nextIdx < questions.length) {
        feedbackMessages.push({ role: "bot", text: `\n📋 Question ${nextIdx + 1}/${questions.length}: ${questions[nextIdx]}` });
        setQuestionIdx(nextIdx);
        if (interviewType === "hr") {
          setTimeout(() => speakText(questions[nextIdx]), 500);
        }
      } else {
        const score = messages.filter(m => m.text.includes("✅")).length;
        const total = questions.length;
        feedbackMessages.push({ 
          role: "bot", 
          text: `🎉 Interview Complete!\n\nYou answered all ${total} questions for the ${selectedCompany} ${interviewType === "hr" ? "HR" : "Technical"} round.\n\n${score >= total * 0.7 ? "🌟 Excellent performance! You're well-prepared." : score >= total * 0.4 ? "👍 Good effort! Review the tips above to improve further." : "📚 Keep practicing! Focus on the tips and follow-up questions above."}\n\nScroll up to review all feedback and practice the follow-up questions.` 
        });
      }

      setMessages(prev => [...prev, ...feedbackMessages]);
      setIsTyping(false);
    }, 600 + Math.random() * 400); // 600-1000ms delay
  };

  // Company selection screen
  if (!selectedCompany) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-4xl">
          <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Interview Simulator</h1>
          <p className="text-muted-foreground mb-6">Choose a company and interview type to practice. HR rounds support <strong>voice input</strong> 🎤</p>

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
                      <Button size="sm" variant="outline" onClick={() => startInterview(name, "hr")} className="flex-1 text-xs">
                        <Mic className="w-3 h-3 mr-1" /> HR Round
                      </Button>
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
                  <Button size="sm" variant="outline" onClick={() => startInterview(cq.company, "hr")} className="flex-1 text-xs">
                    <Mic className="w-3 h-3 mr-1" /> HR Round
                  </Button>
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => { setSelectedCompany(null); stopListening(); speechSynthesis?.cancel(); }} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold font-heading text-foreground">{selectedCompany} — {interviewType === "hr" ? "HR" : "Technical"} Interview</h1>
              <p className="text-muted-foreground text-sm">
                Question {Math.min(questionIdx + 1, questions.length)} of {questions.length}
                {interviewType === "hr" && " · 🎤 Voice enabled"}
              </p>
            </div>
          </div>
          {interviewType === "hr" && (
            <Button variant="outline" size="sm" onClick={() => { setVoiceEnabled(!voiceEnabled); if (voiceEnabled) speechSynthesis?.cancel(); }}
              className={voiceEnabled ? "text-primary border-primary/30" : "text-muted-foreground"}>
              <Volume2 className="w-4 h-4 mr-1" /> {voiceEnabled ? "Voice On" : "Voice Off"}
            </Button>
          )}
        </div>

        <div className="flex-1 bg-card rounded-xl border border-border shadow-card p-5 overflow-y-auto space-y-3 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-1 duration-300`}>
              {msg.role === "bot" && <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-0.5"><Bot className="w-4 h-4 text-primary-foreground" /></div>}
              <div className={`max-w-[80%] text-sm px-4 py-2.5 rounded-xl whitespace-pre-line ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}>{msg.text}</div>
              {msg.role === "user" && <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5"><User className="w-4 h-4 text-muted-foreground" /></div>}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2 justify-start animate-in fade-in">
              <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-0.5"><Bot className="w-4 h-4 text-primary-foreground" /></div>
              <div className="bg-muted text-foreground text-sm px-4 py-2.5 rounded-xl flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-primary" />
                <span className="text-muted-foreground">Analyzing your response...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {questionIdx < questions.length && (
          <div className="space-y-2">
            {/* Voice indicator */}
            {isListening && (
              <div className="flex items-center gap-2 px-3 py-2 bg-destructive/10 rounded-lg text-sm text-destructive animate-pulse">
                <Mic className="w-4 h-4" />
                <span>Recording... Speak your answer clearly</span>
              </div>
            )}
            {isSpeaking && (
              <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg text-sm text-primary">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Interviewer is speaking...</span>
              </div>
            )}
            <div className="flex gap-2">
              <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder={interviewType === "hr" ? "Type or use voice to answer..." : "Type your answer..."}
                rows={2} className="flex-1" onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }} />
              <div className="flex flex-col gap-1.5 self-end">
                {interviewType === "hr" && (
                  <Button onClick={isListening ? stopListening : startListening} variant="outline" size="icon"
                    className={isListening ? "border-destructive text-destructive animate-pulse" : "border-primary/30 text-primary"}>
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                )}
                <Button onClick={handleSend} className="gradient-primary text-primary-foreground" size="icon" disabled={isTyping}><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InterviewSim;
