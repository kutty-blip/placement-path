import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { generateMockQuestions, generateMockCodingProblems, CodingProblem } from "./mockDataEngine";

export type { CodingProblem };

export interface UserProfile {
  name: string;
  email: string;
  college: string;
  branch: string;
  cgpa: number;
  skills: string[];
  targetCompanies: string[];
  resumeText: string;
  shortlistedCompanies: string[];
}

export interface TestResult {
  id: string;
  type: string;
  company?: string;
  score: number;
  total: number;
  date: string;
  weakAreas: string[];
}

export interface Experience {
  id: string;
  userId: string;
  company: string;
  content: string;
  likes: number;
  author: string;
  date: string;
  role?: string;
  tips?: string;
}

export interface Company {
  name: string;
  process: string;
  difficulty: string;
  skillsRequired: string[];
}

export interface CompanyQuestions {
  company: string;
  questions: { question: string; options: string[]; answer: string; topic: string }[];
}

export interface CompanyInterviewQs {
  company: string;
  hrQuestions: string[];
  technicalQuestions: string[];
}

// Generated dynamically: 10 coding problems per topic per company
export const CODING_PROBLEMS: CodingProblem[] = generateMockCodingProblems();

// Generated dynamically: 10 MCQ questions per topic per company
export const COMPANY_QUESTION_BANKS: CompanyQuestions[] = generateMockQuestions();

// Company-specific interview questions
export const COMPANY_INTERVIEW_QUESTIONS: CompanyInterviewQs[] = [
  {
    company: "TCS",
    hrQuestions: ["Tell me about yourself.", "Why do you want to join TCS?", "Where do you see yourself in 5 years?", "What are your strengths?", "Tell me about a challenge you faced."],
    technicalQuestions: ["What is the difference between Java and C++?", "Explain the concept of DBMS normalization.", "What is a linked list?", "Write a program to reverse a string.", "What is the difference between TCP and UDP?"],
  },
  {
    company: "Infosys",
    hrQuestions: ["Introduce yourself.", "Why Infosys?", "How do you handle pressure?", "What is your biggest achievement?", "Are you willing to relocate?"],
    technicalQuestions: ["What is OOP and its pillars?", "Explain method overloading vs overriding.", "What is a join in SQL?", "Explain the MVC architecture.", "What is the difference between array and linked list?"],
  },
  {
    company: "Wipro",
    hrQuestions: ["Tell me about yourself.", "Why should we hire you?", "What motivates you?", "Describe your ideal work environment.", "What are your salary expectations?"],
    technicalQuestions: ["What is an operating system?", "Explain process vs thread.", "What is HTML and CSS?", "What is a compiler?", "Explain the concept of virtual memory."],
  },
  {
    company: "HCL",
    hrQuestions: ["Introduce yourself briefly.", "Why HCL?", "What do you know about our company?", "How do you handle conflict?", "Where do you want to be in 3 years?"],
    technicalQuestions: ["What is a constructor?", "Explain static vs dynamic memory allocation.", "What are access modifiers in Java?", "What is a REST API?", "Explain the concept of recursion."],
  },
  {
    company: "Cognizant",
    hrQuestions: ["Tell me something about yourself.", "Why Cognizant?", "How do you prioritize tasks?", "Describe a time you worked in a team.", "What is your preferred working style?"],
    technicalQuestions: ["What is normalization?", "Explain different types of SQL joins.", "What is encapsulation?", "What is a deadlock and how to prevent it?", "Explain the 'this' keyword in Java."],
  },
  {
    company: "Accenture",
    hrQuestions: ["Walk me through your resume.", "Why Accenture?", "How do you handle stress?", "What are your career goals?", "Tell me about a project you're proud of."],
    technicalQuestions: ["What is cloud computing?", "Explain SDLC phases.", "What is Agile methodology?", "What is the purpose of a firewall?", "Explain the difference between SQL and NoSQL."],
  },
  {
    company: "Capgemini",
    hrQuestions: ["Introduce yourself.", "Why do you want to join Capgemini?", "What makes you a good fit?", "How do you handle failure?", "What do you know about digital transformation?"],
    technicalQuestions: ["Explain inheritance with an example.", "What is a primary key vs foreign key?", "How does SMTP work?", "What is abstraction?", "Explain the difference between stack and heap memory."],
  },
  {
    company: "Zoho",
    hrQuestions: ["Tell me about yourself.", "Why Zoho?", "What drives you as a developer?", "How do you approach problem-solving?", "Describe a difficult bug you fixed."],
    technicalQuestions: ["Explain time and space complexity.", "Write logic for finding the second largest element.", "What is a hash map and how does it work?", "Explain the difference between BFS and DFS.", "What is dynamic programming? Give an example.", "Design a parking lot system."],
  },
  {
    company: "Amazon",
    hrQuestions: ["Tell me about a time you showed leadership.", "Describe a situation where you disagreed with a teammate.", "How do you handle ambiguity?", "Tell me about your most challenging project.", "What does customer obsession mean to you?"],
    technicalQuestions: ["Design an LRU cache.", "Explain the CAP theorem.", "What is a load balancer?", "How would you design a URL shortener?", "Explain consistent hashing.", "What is the difference between horizontal and vertical scaling?"],
  },
  {
    company: "Flipkart",
    hrQuestions: ["Tell me about yourself.", "Why Flipkart?", "Describe a project you built end-to-end.", "How do you handle tight deadlines?", "What excites you about e-commerce?"],
    technicalQuestions: ["Explain the trie data structure.", "How does database sharding work?", "What are microservices?", "Design a notification system.", "Explain eventual consistency.", "What is memoization and where would you use it?"],
  },
];

const SEED_COMPANIES: Company[] = [
  { name: "TCS", process: "Aptitude + Technical + HR", difficulty: "Easy", skillsRequired: ["aptitude", "basic programming"] },
  { name: "Infosys", process: "Aptitude + Coding + HR", difficulty: "Easy", skillsRequired: ["aptitude", "OOP"] },
  { name: "Wipro", process: "Aptitude + Technical + HR", difficulty: "Easy", skillsRequired: ["aptitude"] },
  { name: "HCL", process: "Aptitude + Technical + HR", difficulty: "Easy", skillsRequired: ["basic programming"] },
  { name: "Cognizant", process: "Aptitude + Coding + HR", difficulty: "Medium", skillsRequired: ["OOP", "SQL"] },
  { name: "Accenture", process: "Aptitude + Communication + HR", difficulty: "Medium", skillsRequired: ["aptitude", "communication"] },
  { name: "Capgemini", process: "Aptitude + Technical + HR", difficulty: "Medium", skillsRequired: ["OOP", "logic"] },
  { name: "Zoho", process: "Coding + Advanced Technical", difficulty: "Hard", skillsRequired: ["DSA"] },
  { name: "Amazon", process: "Coding + System Design + Bar Raiser", difficulty: "Hard", skillsRequired: ["DSA"] },
  { name: "Flipkart", process: "Coding + System Design + HR", difficulty: "Hard", skillsRequired: ["DSA"] },
];

interface AppState {
  isLoggedIn: boolean;
  profile: UserProfile;
  testResults: TestResult[];
  experiences: Experience[];
  companies: Company[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (p: Partial<UserProfile>) => void;
  addTestResult: (r: TestResult) => void;
  addExperience: (e: Experience) => void;
  likeExperience: (id: string) => void;
  toggleShortlist: (companyName: string) => void;
  getAIRecommendations: () => string[];
  getMatchedCompanies: () => Company[];
  getProgressStats: () => { avg: number; totalTests: number; weakAreas: string[]; problemsSolved: number; streak: number };
}

const defaultProfile: UserProfile = {
  name: "", email: "", college: "", branch: "", cgpa: 0,
  skills: [], targetCompanies: [], resumeText: "", shortlistedCompanies: [],
};

const AppContext = createContext<AppState>({} as AppState);

export const useApp = () => useContext(AppContext);

const load = <T,>(key: string, fallback: T): T => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => load("isLoggedIn", false));
  const [profile, setProfile] = useState<UserProfile>(() => load("profile", defaultProfile));
  const [testResults, setTestResults] = useState<TestResult[]>(() => load("testResults", []));
  const [experiences, setExperiences] = useState<Experience[]>(() => load("experiences", [
    { id: "seed1", userId: "system", company: "TCS", content: "The process was straightforward. Aptitude round followed by a technical interview on basic Java and SQL. HR was relaxed. Focus on basics and you'll clear it.", likes: 5, author: "Rahul S.", date: "2024-12-15", role: "Software Developer", tips: "Practice aptitude daily for 2 weeks before the test." },
    { id: "seed2", userId: "system", company: "Infosys", content: "Coding round had 2 medium-level problems. Focus on arrays and strings. HR asked about projects. Be confident and know your resume well.", likes: 3, author: "Priya M.", date: "2024-11-20", role: "Systems Engineer", tips: "Revise OOP concepts thoroughly." },
    { id: "seed3", userId: "system", company: "Amazon", content: "Very intense process. 3 coding rounds + system design + bar raiser. They focus heavily on leadership principles. Prepare behavioral answers using STAR method.", likes: 12, author: "Vikram K.", date: "2025-01-10", role: "SDE-1", tips: "Solve at least 200 LeetCode problems. Focus on trees, graphs, and DP." },
    { id: "seed4", userId: "system", company: "Zoho", content: "Zoho has its own unique test format. Heavy focus on programming logic, not just DSA. They give real-world coding problems. No MCQs — all coding rounds.", likes: 8, author: "Ananya R.", date: "2025-02-05", role: "Member Technical Staff", tips: "Practice on Zoho's previous papers. Build small projects to show thinking ability." },
    { id: "seed5", userId: "system", company: "Wipro", content: "Wipro's process is relatively easy. Online aptitude test, then group discussion and HR. Technical questions were basic — OS, DBMS, networking.", likes: 4, author: "Sneha D.", date: "2024-10-30", role: "Project Engineer", tips: "Be good at communication. GD round matters a lot." },
  ]));

  useEffect(() => { localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn)); }, [isLoggedIn]);
  useEffect(() => { localStorage.setItem("profile", JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem("testResults", JSON.stringify(testResults)); }, [testResults]);
  useEffect(() => { localStorage.setItem("experiences", JSON.stringify(experiences)); }, [experiences]);

  const login = (email: string, _password: string) => {
    const saved = localStorage.getItem("registeredUser");
    if (saved) {
      const user = JSON.parse(saved);
      if (user.email === email) {
        setProfile(p => ({ ...p, name: user.name, email: user.email }));
        setIsLoggedIn(true);
        return true;
      }
    }
    setProfile(p => ({ ...p, email, name: email.split("@")[0] }));
    setIsLoggedIn(true);
    return true;
  };

  const signup = (name: string, email: string, password: string) => {
    localStorage.setItem("registeredUser", JSON.stringify({ name, email, password }));
    setProfile(p => ({ ...p, name, email }));
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => { setIsLoggedIn(false); };

  const updateProfile = (p: Partial<UserProfile>) => setProfile(prev => ({ ...prev, ...p }));

  const addTestResult = (r: TestResult) => setTestResults(prev => [r, ...prev]);

  const addExperience = (e: Experience) => setExperiences(prev => [e, ...prev]);

  const likeExperience = (id: string) => setExperiences(prev => prev.map(e => e.id === id ? { ...e, likes: e.likes + 1 } : e));

  const toggleShortlist = (companyName: string) => {
    setProfile(prev => {
      const list = prev.shortlistedCompanies || [];
      const exists = list.includes(companyName);
      return { ...prev, shortlistedCompanies: exists ? list.filter(c => c !== companyName) : [...list, companyName] };
    });
  };

  const getAIRecommendations = (): string[] => {
    const recs: string[] = [];
    if (profile.skills.length === 0) {
      recs.push("Start with basic programming and aptitude practice.");
    } else {
      if (profile.cgpa > 0 && profile.cgpa < 7) recs.push("Practice aptitude daily + basic coding to strengthen fundamentals.");
      if (profile.skills.some(s => s.toLowerCase().includes("java"))) recs.push("Practice arrays and strings for 5 days.");
      if (profile.skills.some(s => s.toLowerCase().includes("dsa"))) recs.push("Solve 2 medium-level DSA problems daily.");
      if (profile.skills.some(s => s.toLowerCase().includes("python"))) recs.push("Build a mini-project in Python to strengthen fundamentals.");
      if (profile.skills.some(s => s.toLowerCase().includes("sql"))) recs.push("Practice complex SQL joins and subqueries.");
      if (profile.skills.some(s => s.toLowerCase().includes("oop"))) recs.push("Review OOP concepts: inheritance, polymorphism, encapsulation.");
    }
    // Company-specific recommendations based on shortlisted companies
    const shortlisted = profile.shortlistedCompanies || [];
    if (shortlisted.length > 0) {
      const hardCompanies = shortlisted.filter(c => SEED_COMPANIES.find(sc => sc.name === c)?.difficulty === "Hard");
      if (hardCompanies.length > 0) recs.push(`You've shortlisted ${hardCompanies.join(", ")} — focus heavily on DSA and system design.`);
      const easyCompanies = shortlisted.filter(c => SEED_COMPANIES.find(sc => sc.name === c)?.difficulty === "Easy");
      if (easyCompanies.length > 0) recs.push(`For ${easyCompanies.join(", ")}, practice aptitude tests and brush up on basics.`);
    }
    if (testResults.length > 0) {
      const avg = testResults.reduce((s, t) => s + (t.score / t.total) * 100, 0) / testResults.length;
      if (avg < 50) recs.push("Your test scores are low. Revise fundamentals before attempting more tests.");
      if (avg >= 70) recs.push("Great scores! Try harder problems to push your limits.");
    }
    if (recs.length === 0) recs.push("Complete your profile to get personalized AI recommendations.");
    return recs;
  };

  const getMatchedCompanies = (): Company[] => {
    if (profile.skills.length === 0) return SEED_COMPANIES;
    const userSkills = profile.skills.map(s => s.toLowerCase());
    return SEED_COMPANIES.filter(c =>
      c.skillsRequired.some(req => userSkills.some(us => us.includes(req.toLowerCase()) || req.toLowerCase().includes(us)))
    );
  };

  const getProgressStats = () => {
    const totalTests = testResults.length;
    const avg = totalTests > 0 ? Math.round(testResults.reduce((s, t) => s + (t.score / t.total) * 100, 0) / totalTests) : 0;
    const allWeak = testResults.flatMap(t => t.weakAreas);
    const weakAreas = [...new Set(allWeak)];
    return { avg, totalTests, weakAreas, problemsSolved: totalTests * 5, streak: Math.min(totalTests * 2 + 1, 30) };
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn, profile, testResults, experiences, companies: SEED_COMPANIES,
      login, signup, logout, updateProfile, addTestResult, addExperience,
      likeExperience, toggleShortlist, getAIRecommendations, getMatchedCompanies, getProgressStats,
    }}>
      {children}
    </AppContext.Provider>
  );
};
