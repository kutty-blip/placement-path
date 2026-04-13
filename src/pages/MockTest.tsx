import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useApp, COMPANY_QUESTION_BANKS } from "@/context/AppContext";
import { toast } from "sonner";
import { CheckCircle, XCircle, RotateCcw, Building2, Clock, ArrowLeft, BookOpen, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Extract all unique topics from all question banks
const ALL_TOPICS = [...new Set(COMPANY_QUESTION_BANKS.flatMap(b => b.questions.map(q => q.topic)))].sort();

// Topic categories with display names and icons
const TOPIC_CATEGORIES: { label: string; topics: string[] }[] = [
  { label: "DSA", topics: ["DSA"] },
  { label: "Databases / SQL", topics: ["SQL", "Database"] },
  { label: "Operating Systems", topics: ["OS"] },
  { label: "Computer Networks", topics: ["Networking"] },
  { label: "OOP", topics: ["OOP"] },
  { label: "System Design", topics: ["System Design"] },
  { label: "Programming", topics: ["Programming", "Java", "Python"] },
  { label: "Aptitude", topics: ["Aptitude"] },
  { label: "Web Development", topics: ["Web"] },
  { label: "Software Engineering", topics: ["SE", "Cloud"] },
];

type ViewMode = "selection" | "company" | "topic" | "test";

const MockTest = () => {
  const { addTestResult, profile } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>("selection");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<{ question: string; options: string[]; answer: string; topic: string }[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerRef, setTimerRef] = useState<ReturnType<typeof setInterval> | null>(null);

  const shortlisted = profile.shortlistedCompanies || [];

  // Auto-start if company param is in URL
  useEffect(() => {
    const companyParam = searchParams.get("company");
    if (companyParam) {
      const bank = COMPANY_QUESTION_BANKS.find(b => b.company === companyParam);
      if (bank) {
        startCompanyTest(companyParam);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCompanyTest = (company: string) => {
    const bank = COMPANY_QUESTION_BANKS.find(b => b.company === company);
    if (!bank) return;
    setSelectedCompany(company);
    setSelectedTopic(null);
    setQuestions(bank.questions);
    resetTestState(bank.questions.length);
    setViewMode("test");
  };

  const startTopicTest = (categoryLabel: string, topicList: string[]) => {
    const topicQuestions = COMPANY_QUESTION_BANKS.flatMap(b =>
      b.questions.filter(q => topicList.some(t => q.topic === t))
    );
    // Deduplicate by question text
    const unique = topicQuestions.filter((q, i, arr) => arr.findIndex(x => x.question === q.question) === i);
    if (unique.length === 0) {
      toast.error("No questions available for this topic.");
      return;
    }
    // Shuffle and pick up to 10
    const shuffled = [...unique].sort(() => Math.random() - 0.5).slice(0, 10);
    setSelectedCompany(null);
    setSelectedTopic(categoryLabel);
    setQuestions(shuffled);
    resetTestState(shuffled.length);
    setViewMode("test");
  };

  const resetTestState = (count: number) => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    const totalTime = count * 45;
    setTimeLeft(totalTime);
    setTimerActive(true);
    if (timerRef) clearInterval(timerRef);
    const ref = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(ref);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerRef(ref);
  };

  const handleSelect = (qi: number, opt: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qi]: opt }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Please answer all questions");
      return;
    }
    if (timerRef) clearInterval(timerRef);
    setTimerActive(false);
    let s = 0;
    const wrongTopics: string[] = [];
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) s++;
      else wrongTopics.push(q.topic);
    });
    setScore(s);
    setSubmitted(true);
    addTestResult({
      id: Date.now().toString(),
      type: selectedCompany ? `${selectedCompany} Mock Test` : `${selectedTopic} Topic Test`,
      company: selectedCompany || undefined,
      score: s,
      total: questions.length,
      date: new Date().toLocaleDateString(),
      weakAreas: [...new Set(wrongTopics)],
    });
    toast.success(`Test completed! Score: ${s}/${questions.length}`);
  };

  const handleBack = () => {
    if (timerRef) clearInterval(timerRef);
    setTimerActive(false);
    setViewMode("selection");
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  // Get question count for a topic category
  const getTopicCount = (topicList: string[]) => {
    const qs = COMPANY_QUESTION_BANKS.flatMap(b => b.questions.filter(q => topicList.some(t => q.topic === t)));
    return new Set(qs.map(q => q.question)).size;
  };

  // ====== SELECTION SCREEN ======
  if (viewMode === "selection") {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-5xl">
          <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Mock Tests</h1>
          <p className="text-muted-foreground mb-6">Practice by company or by topic category.</p>

          {/* Topic-based tests */}
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
            <Layers className="w-4 h-4" /> By Topic
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {TOPIC_CATEGORIES.map(cat => {
              const count = getTopicCount(cat.topics);
              if (count === 0) return null;
              return (
                <button key={cat.label} onClick={() => startTopicTest(cat.label, cat.topics)}
                  className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary/50 transition-colors shadow-card">
                  <BookOpen className="w-5 h-5 text-primary mb-2" />
                  <span className="font-heading font-semibold text-foreground text-sm block">{cat.label}</span>
                  <span className="text-xs text-muted-foreground">{count} questions</span>
                </button>
              );
            })}
          </div>

          {/* Shortlisted companies */}
          {shortlisted.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Your Shortlisted Companies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {shortlisted.map(name => {
                  const bank = COMPANY_QUESTION_BANKS.find(b => b.company === name);
                  return (
                    <button key={name} onClick={() => startCompanyTest(name)}
                      className="bg-primary/5 border-2 border-primary/30 rounded-xl p-5 text-left hover:bg-primary/10 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        <span className="font-heading font-semibold text-foreground">{name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{bank?.questions.length || 0} questions · Previous year pattern</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* All companies */}
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
            <Building2 className="w-4 h-4" /> All Companies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMPANY_QUESTION_BANKS.map(bank => (
              <button key={bank.company} onClick={() => startCompanyTest(bank.company)}
                className="bg-card border border-border rounded-xl p-5 text-left hover:border-primary/50 transition-colors shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="font-heading font-semibold text-foreground">{bank.company}</span>
                </div>
                <p className="text-xs text-muted-foreground">{bank.questions.length} questions · {Math.ceil(bank.questions.length * 0.75)} min</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {[...new Set(bank.questions.map(q => q.topic))].slice(0, 3).map(t => (
                    <span key={t} className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{t}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ====== TEST SCREEN ======
  const testTitle = selectedCompany ? `${selectedCompany} Mock Test` : `${selectedTopic} Topic Test`;

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></button>
            <div>
              <h1 className="text-2xl font-bold font-heading text-foreground mb-0.5">{testTitle}</h1>
              <p className="text-muted-foreground text-sm">
                {selectedCompany ? "Previous year pattern questions" : `Questions from ${selectedTopic} across all companies`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {timerActive && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${timeLeft < 60 ? "bg-destructive/10 text-destructive" : "bg-muted text-foreground"}`}>
                <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
              </div>
            )}
            {submitted && (
              <Button onClick={() => selectedCompany ? startCompanyTest(selectedCompany) : startTopicTest(selectedTopic!, TOPIC_CATEGORIES.find(c => c.label === selectedTopic)!.topics)}
                variant="outline" size="sm"><RotateCcw className="w-4 h-4 mr-1" /> Retake</Button>
            )}
          </div>
        </div>

        {submitted && (
          <div className="bg-card rounded-xl p-5 border border-border shadow-card mb-6 text-center">
            <div className="text-4xl font-bold font-heading text-foreground">{score}/{questions.length}</div>
            <p className="text-muted-foreground text-sm mt-1">
              {score >= questions.length * 0.75 ? `Excellent! You're well prepared!` :
               score >= questions.length * 0.5 ? "Good job! Keep practicing." :
               "Needs improvement. Review the topics below."}
            </p>
            <Button onClick={() => navigate("/dashboard")} variant="outline" size="sm" className="mt-3">View Dashboard</Button>
          </div>
        )}

        <div className="space-y-4">
          {questions.map((q, qi) => (
            <div key={qi} className="bg-card rounded-xl p-5 border border-border shadow-card">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium text-foreground text-sm">{qi + 1}. {q.question}</p>
                <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground shrink-0 ml-2">{q.topic}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map(opt => {
                  const isSelected = answers[qi] === opt;
                  const isCorrect = submitted && opt === q.answer;
                  const isWrong = submitted && isSelected && opt !== q.answer;
                  return (
                    <button key={opt} onClick={() => handleSelect(qi, opt)}
                      className={`text-left text-sm px-4 py-2.5 rounded-lg border transition-colors flex items-center gap-2 ${
                        isCorrect ? "border-green-500 bg-green-50 text-green-700" :
                        isWrong ? "border-destructive bg-destructive/5 text-destructive" :
                        isSelected ? "border-primary bg-primary/5 text-primary" :
                        "border-border hover:border-primary/50 text-foreground"
                      }`}>
                      {isCorrect && <CheckCircle className="w-4 h-4 shrink-0" />}
                      {isWrong && <XCircle className="w-4 h-4 shrink-0" />}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!submitted && (
          <Button onClick={handleSubmit} className="mt-6 gradient-primary text-primary-foreground w-full">Submit Test</Button>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MockTest;
