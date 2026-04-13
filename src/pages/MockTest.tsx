import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

const questions = [
  { question: "What is time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: "O(log n)", topic: "DSA" },
  { question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue", topic: "DSA" },
  { question: "What does OOP stand for?", options: ["Object Oriented Programming", "Open Online Platform", "Operator Overloading Process", "None"], answer: "Object Oriented Programming", topic: "OOP" },
  { question: "Which SQL keyword is used to retrieve data?", options: ["GET", "FETCH", "SELECT", "RETRIEVE"], answer: "SELECT", topic: "SQL" },
  { question: "What is the default value of a boolean in Java?", options: ["true", "false", "null", "0"], answer: "false", topic: "Java" },
  { question: "Which sorting algorithm has best average case?", options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"], answer: "Merge Sort", topic: "DSA" },
  { question: "What is normalization in databases?", options: ["Making data faster", "Reducing redundancy", "Adding indexes", "Encrypting data"], answer: "Reducing redundancy", topic: "SQL" },
  { question: "What is polymorphism?", options: ["One form", "Many forms", "No form", "Two forms"], answer: "Many forms", topic: "OOP" },
];

const MockTest = () => {
  const { addTestResult } = useApp();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qi: number, opt: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qi]: opt }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Please answer all questions");
      return;
    }
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
      type: "Technical MCQ",
      score: s,
      total: questions.length,
      date: new Date().toLocaleDateString(),
      weakAreas: [...new Set(wrongTopics)],
    });
    toast.success(`Test completed! Score: ${s}/${questions.length}`);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Mock Test</h1>
            <p className="text-muted-foreground">Test your technical knowledge. Score updates your dashboard.</p>
          </div>
          {submitted && (
            <Button onClick={handleReset} variant="outline" size="sm"><RotateCcw className="w-4 h-4 mr-1" /> Retake</Button>
          )}
        </div>

        {submitted && (
          <div className="bg-card rounded-xl p-5 border border-border shadow-card mb-6 text-center">
            <div className="text-4xl font-bold font-heading text-foreground">{score}/{questions.length}</div>
            <p className="text-muted-foreground text-sm mt-1">
              {score >= 6 ? "Excellent! Keep it up!" : score >= 4 ? "Good job, keep practicing!" : "Needs improvement. Review weak areas."}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {questions.map((q, qi) => (
            <div key={qi} className="bg-card rounded-xl p-5 border border-border shadow-card">
              <p className="font-medium text-foreground text-sm mb-3">{qi + 1}. {q.question}</p>
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
