import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useApp, COMPANY_QUESTION_BANKS } from "@/context/AppContext";
import { toast } from "sonner";
import { CheckCircle, XCircle, RotateCcw, Building2, Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MockTest = () => {
  const { addTestResult, profile } = useApp();
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerRef, setTimerRef] = useState<ReturnType<typeof setInterval> | null>(null);

  const currentBank = COMPANY_QUESTION_BANKS.find(b => b.company === selectedCompany);
  const questions = currentBank?.questions || [];
  const shortlisted = profile.shortlistedCompanies || [];

  const startTest = (company: string) => {
    setSelectedCompany(company);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    const bank = COMPANY_QUESTION_BANKS.find(b => b.company === company);
    const totalTime = (bank?.questions.length || 8) * 45; // 45 sec per question
    setTimeLeft(totalTime);
    setTimerActive(true);
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
      type: `${selectedCompany} Mock Test`,
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
    setSelectedCompany(null);
    setTimerActive(false);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  // Company selection screen
  if (!selectedCompany) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-4xl">
          <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Mock Tests</h1>
          <p className="text-muted-foreground mb-6">Choose a company to attempt their previous year questions.</p>

          {shortlisted.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Your Shortlisted Companies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {shortlisted.map(name => {
                  const bank = COMPANY_QUESTION_BANKS.find(b => b.company === name);
                  return (
                    <button key={name} onClick={() => startTest(name)}
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

          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">All Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMPANY_QUESTION_BANKS.map(bank => (
              <button key={bank.company} onClick={() => startTest(bank.company)}
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

  // Test screen
  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></button>
            <div>
              <h1 className="text-2xl font-bold font-heading text-foreground mb-0.5">{selectedCompany} Mock Test</h1>
              <p className="text-muted-foreground text-sm">Previous year pattern questions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {timerActive && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${timeLeft < 60 ? "bg-destructive/10 text-destructive" : "bg-muted text-foreground"}`}>
                <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
              </div>
            )}
            {submitted && (
              <Button onClick={() => startTest(selectedCompany)} variant="outline" size="sm"><RotateCcw className="w-4 h-4 mr-1" /> Retake</Button>
            )}
          </div>
        </div>

        {submitted && (
          <div className="bg-card rounded-xl p-5 border border-border shadow-card mb-6 text-center">
            <div className="text-4xl font-bold font-heading text-foreground">{score}/{questions.length}</div>
            <p className="text-muted-foreground text-sm mt-1">
              {score >= questions.length * 0.75 ? "Excellent! You're well prepared for " + selectedCompany + "!" :
               score >= questions.length * 0.5 ? "Good job! Keep practicing for " + selectedCompany + "." :
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
