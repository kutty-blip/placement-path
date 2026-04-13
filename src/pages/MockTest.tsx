import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useApp, COMPANY_QUESTION_BANKS, CODING_PROBLEMS } from "@/context/AppContext";
import { toast } from "sonner";
import { CheckCircle, XCircle, RotateCcw, Building2, Clock, ArrowLeft, BookOpen, Layers, ExternalLink, Code, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";

// Extract all unique topics from all question banks
const ALL_TOPICS = [...new Set(COMPANY_QUESTION_BANKS.flatMap(b => b.questions.map(q => q.topic)))].sort();

const UNIQUE_CODING_TOPICS = [...new Set(CODING_PROBLEMS.map(p => p.topic))].sort();
const FILTER_COMPANIES = ["All", ...new Set([
  ...COMPANY_QUESTION_BANKS.map(b => b.company),
  ...CODING_PROBLEMS.flatMap(p => p.companyTags)
])].sort();

// Compute Most Asked Concepts strictly by weightage
const getMostAskedConcepts = (filterCompany: string) => {
  const counts: Record<string, number> = {};
  let totalQuestions = 0;

  COMPANY_QUESTION_BANKS.forEach(b => {
    if (filterCompany !== "All" && b.company !== filterCompany) return;
    b.questions.forEach(q => {
      counts[q.topic] = (counts[q.topic] || 0) + 1;
      totalQuestions++;
    });
  });

  CODING_PROBLEMS.forEach(p => {
    if (filterCompany !== "All" && !p.companyTags.includes(filterCompany)) return;
    counts[p.topic] = (counts[p.topic] || 0) + 1;
    totalQuestions++;
  });

  if (totalQuestions === 0) return [];

  return Object.entries(counts)
    .map(([topic, count]) => ({
      name: topic,
      weightage: Math.round((count / totalQuestions) * 100)
    }))
    .sort((a, b) => b.weightage - a.weightage)
    .slice(0, 10);
};

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
  
  // F1 & F2 Filters
  const [filterCompany, setFilterCompany] = useState<string>("All");
  const [filterConcept, setFilterConcept] = useState<string>("All");

  const CHART_DATA = getMostAskedConcepts(filterCompany);
  
  const filteredCodingProblems = CODING_PROBLEMS.filter(p => {
    if (filterCompany !== "All" && !p.companyTags.includes(filterCompany)) return false;
    if (filterConcept !== "All" && p.topic !== filterConcept) return false;
    return true;
  });
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

          {/* Filters for Chart and Problems */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-end bg-card p-4 rounded-xl border border-border shadow-sm">
            <div className="flex-1 w-full relative">
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Company Filter</label>
              <select value={filterCompany} onChange={e => setFilterCompany(e.target.value)}
                className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:ring-1 focus:ring-primary appearance-none">
                {FILTER_COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1 w-full relative">
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Concept Filter (Questions)</label>
              <select value={filterConcept} onChange={e => setFilterConcept(e.target.value)}
                className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:ring-1 focus:ring-primary appearance-none">
                <option value="All">All Concepts</option>
                {UNIQUE_CODING_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Most Asked Concepts Visualization */}
          <div className="mb-10 bg-card rounded-xl p-6 shadow-card border border-border">
            <h2 className="font-heading font-semibold text-foreground flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" /> {filterCompany === "All" ? "Most Asked Concepts Overall" : `Frequent Concepts in ${filterCompany}`}
            </h2>
            <div className="h-64 w-full">
              {CHART_DATA.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">No data available for this company.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHART_DATA} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} unit="%" />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, "Weightage"]}
                      cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }}
                    />
                    <Bar dataKey="weightage" radius={[4, 4, 0, 0]}>
                      {CHART_DATA.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={_.weightage > 15 ? "hsl(var(--destructive))" : _.weightage > 10 ? "hsl(var(--primary))" : "hsl(var(--primary), 0.6)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Coding Problems */}
          <div className="mb-10 bg-card rounded-xl p-6 shadow-card border border-border">
            <h2 className="font-heading font-semibold text-foreground flex items-center gap-2 mb-6">
              <Code className="w-5 h-5 text-primary" /> 
              {filterCompany !== "All" && filterConcept !== "All" 
                ? `${filterCompany} - ${filterConcept} Questions` 
                : "Coding Practice (LeetCode)"}
            </h2>
            {filteredCodingProblems.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
                No matching questions found for this criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Easy", "Medium", "Hard"].map(diff => {
                  const filteredDiff = filteredCodingProblems.filter(p => p.difficulty === diff);
                  if (filteredDiff.length === 0) return null;
                  return (
                    <div key={diff} className="space-y-3">
                      <h3 className={`text-sm font-semibold pb-2 border-b border-border ${diff === 'Easy' ? 'text-green-500' : diff === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>{diff}</h3>
                      {filteredDiff.map(p => (
                    <a key={p.id} href={p.leetcodeUrl} target="_blank" rel="noopener noreferrer" 
                      className="block p-3 rounded-lg bg-muted/40 hover:bg-muted transition-colors border border-border/50 group">
                      <div className="flex items-start justify-between">
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{p.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary opacity-50 shrink-0 mt-0.5" />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block">{p.topic}</span>
                    </a>
                  ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mb-10 border-t border-border pt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-6">Take a Mock Test</h2>
            
            {/* Topic-based tests */}
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-4 h-4" /> By Topic
            </h3>
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
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Your Shortlisted Companies
                </h3>
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
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
              <Building2 className="w-4 h-4" /> All Companies
            </h3>
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
