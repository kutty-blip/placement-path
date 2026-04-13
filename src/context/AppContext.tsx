import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  name: string;
  email: string;
  college: string;
  branch: string;
  cgpa: number;
  skills: string[];
  targetCompanies: string[];
  resumeText: string;
}

export interface TestResult {
  id: string;
  type: string;
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
}

export interface Company {
  name: string;
  process: string;
  difficulty: string;
  skillsRequired: string[];
}

const SEED_COMPANIES: Company[] = [
  { name: "TCS", process: "Aptitude + Technical + HR", difficulty: "Easy", skillsRequired: ["aptitude", "basic programming"] },
  { name: "Infosys", process: "Aptitude + Coding + HR", difficulty: "Medium", skillsRequired: ["DSA", "OOP"] },
  { name: "Zoho", process: "Coding + Advanced Technical", difficulty: "Hard", skillsRequired: ["DSA", "problem solving"] },
  { name: "Wipro", process: "Aptitude + Technical + HR", difficulty: "Easy", skillsRequired: ["aptitude", "basic programming", "SQL"] },
  { name: "Cognizant", process: "Aptitude + Coding + HR", difficulty: "Medium", skillsRequired: ["Java", "OOP", "SQL"] },
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
  getAIRecommendations: () => string[];
  getMatchedCompanies: () => Company[];
  getProgressStats: () => { avg: number; totalTests: number; weakAreas: string[]; problemsSolved: number; streak: number };
}

const defaultProfile: UserProfile = {
  name: "", email: "", college: "", branch: "", cgpa: 0,
  skills: [], targetCompanies: [], resumeText: "",
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
    { id: "seed1", userId: "system", company: "TCS", content: "The process was straightforward. Aptitude round followed by a technical interview on basic Java and SQL. HR was relaxed.", likes: 5, author: "Rahul S." },
    { id: "seed2", userId: "system", company: "Infosys", content: "Coding round had 2 medium-level problems. Focus on arrays and strings. HR asked about projects.", likes: 3, author: "Priya M." },
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
    // Demo login
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

  const getAIRecommendations = (): string[] => {
    const recs: string[] = [];
    if (profile.cgpa > 0 && profile.cgpa < 7) recs.push("Focus on aptitude and basic programming daily.");
    if (profile.skills.some(s => s.toLowerCase().includes("java"))) recs.push("Practice arrays and strings for 5 days.");
    if (profile.skills.some(s => s.toLowerCase().includes("dsa"))) recs.push("Solve 2 medium-level DSA problems daily.");
    if (profile.skills.some(s => s.toLowerCase().includes("python"))) recs.push("Build a mini-project in Python to strengthen fundamentals.");
    if (profile.skills.some(s => s.toLowerCase().includes("sql"))) recs.push("Practice complex SQL joins and subqueries.");
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
      likeExperience, getAIRecommendations, getMatchedCompanies, getProgressStats,
    }}>
      {children}
    </AppContext.Provider>
  );
};
