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

// Company-specific previous year question banks
export const COMPANY_QUESTION_BANKS: CompanyQuestions[] = [
  {
    company: "TCS",
    questions: [
      { question: "What is the output of 2 + '2' in JavaScript?", options: ["4", "22", "NaN", "Error"], answer: "22", topic: "Programming" },
      { question: "Which protocol is used for secure web browsing?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], answer: "HTTPS", topic: "Networking" },
      { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Sequential Query Language"], answer: "Structured Query Language", topic: "SQL" },
      { question: "What is the time complexity of linear search?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: "O(n)", topic: "DSA" },
      { question: "Which of these is not an OOPS concept?", options: ["Inheritance", "Encapsulation", "Compilation", "Polymorphism"], answer: "Compilation", topic: "OOP" },
      { question: "A train 150m long passes a pole in 15 seconds. Its speed is?", options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"], answer: "10 m/s", topic: "Aptitude" },
      { question: "If a = 5, b = 3, what is a % b?", options: ["1", "2", "3", "5"], answer: "2", topic: "Programming" },
      { question: "Which keyword is used to create an object in Java?", options: ["class", "new", "create", "object"], answer: "new", topic: "Java" },
    ],
  },
  {
    company: "Infosys",
    questions: [
      { question: "What is the default value of a boolean in Java?", options: ["true", "false", "null", "0"], answer: "false", topic: "Java" },
      { question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Array", "LinkedList"], answer: "Stack", topic: "DSA" },
      { question: "What does OOP stand for?", options: ["Object Oriented Programming", "Open Online Platform", "Operator Overloading Process", "None"], answer: "Object Oriented Programming", topic: "OOP" },
      { question: "Which SQL keyword removes duplicate rows?", options: ["UNIQUE", "DISTINCT", "REMOVE", "FILTER"], answer: "DISTINCT", topic: "SQL" },
      { question: "What is polymorphism?", options: ["One form", "Many forms", "No form", "Two forms"], answer: "Many forms", topic: "OOP" },
      { question: "If 30% of a number is 45, what is the number?", options: ["135", "150", "120", "100"], answer: "150", topic: "Aptitude" },
      { question: "Which loop guarantees at least one execution?", options: ["for", "while", "do-while", "foreach"], answer: "do-while", topic: "Programming" },
      { question: "What is a foreign key?", options: ["Primary key of same table", "Key from another table", "Unique key", "Auto key"], answer: "Key from another table", topic: "SQL" },
    ],
  },
  {
    company: "Wipro",
    questions: [
      { question: "What is the result of 15 / 4 in integer division?", options: ["3", "3.75", "4", "3.5"], answer: "3", topic: "Programming" },
      { question: "Which sorting has O(n²) worst case?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"], answer: "Bubble Sort", topic: "DSA" },
      { question: "RAM stands for?", options: ["Read Access Memory", "Random Access Memory", "Run Access Memory", "Real Access Memory"], answer: "Random Access Memory", topic: "Computer Basics" },
      { question: "A boat goes 20 km upstream and 40 km downstream in 8 hours each. Speed of current?", options: ["5 km/h", "2.5 km/h", "3 km/h", "1.25 km/h"], answer: "1.25 km/h", topic: "Aptitude" },
      { question: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<h1>", "<head>", "<big>"], answer: "<h1>", topic: "Web" },
      { question: "What does DNS stand for?", options: ["Domain Name System", "Data Network Service", "Digital Name Server", "Domain Network System"], answer: "Domain Name System", topic: "Networking" },
    ],
  },
  {
    company: "HCL",
    questions: [
      { question: "Which language is used for Android development?", options: ["Swift", "Kotlin", "C#", "Ruby"], answer: "Kotlin", topic: "Programming" },
      { question: "What is the full form of API?", options: ["Application Programming Interface", "Applied Programming Integration", "Application Process Interface", "None"], answer: "Application Programming Interface", topic: "Programming" },
      { question: "What is 25% of 200?", options: ["25", "50", "75", "100"], answer: "50", topic: "Aptitude" },
      { question: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "foreground"], answer: "color", topic: "Web" },
      { question: "What is a constructor?", options: ["A destructor", "A method called on object creation", "A variable", "A loop"], answer: "A method called on object creation", topic: "OOP" },
      { question: "Which command shows files in Linux?", options: ["dir", "ls", "show", "list"], answer: "ls", topic: "OS" },
    ],
  },
  {
    company: "Cognizant",
    questions: [
      { question: "What is normalization in databases?", options: ["Making data faster", "Reducing redundancy", "Adding indexes", "Encrypting data"], answer: "Reducing redundancy", topic: "SQL" },
      { question: "Which join returns all rows from both tables?", options: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"], answer: "FULL OUTER JOIN", topic: "SQL" },
      { question: "What is encapsulation?", options: ["Hiding data", "Inheriting data", "Overloading data", "Destroying data"], answer: "Hiding data", topic: "OOP" },
      { question: "What is a deadlock?", options: ["Fast execution", "Circular wait", "Memory leak", "Buffer overflow"], answer: "Circular wait", topic: "OS" },
      { question: "What is the use of 'this' keyword in Java?", options: ["Refers to parent class", "Refers to current object", "Creates new object", "Destroys object"], answer: "Refers to current object", topic: "Java" },
      { question: "If a pipe can fill a tank in 6 hours, how much fills in 2 hours?", options: ["1/6", "1/3", "1/2", "2/3"], answer: "1/3", topic: "Aptitude" },
    ],
  },
  {
    company: "Accenture",
    questions: [
      { question: "What is cloud computing?", options: ["Local storage", "On-demand computing over internet", "Hardware setup", "Offline computing"], answer: "On-demand computing over internet", topic: "Cloud" },
      { question: "What does SDLC stand for?", options: ["Software Development Life Cycle", "System Data Logic Control", "Software Design Logic Chart", "None"], answer: "Software Development Life Cycle", topic: "SE" },
      { question: "Which is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: "MongoDB", topic: "Database" },
      { question: "Two numbers are in ratio 3:5. If their sum is 64, find the smaller number.", options: ["24", "30", "32", "40"], answer: "24", topic: "Aptitude" },
      { question: "What is Agile methodology?", options: ["Waterfall model", "Iterative development", "Big bang approach", "V-model"], answer: "Iterative development", topic: "SE" },
      { question: "What is the purpose of a firewall?", options: ["Speed up internet", "Block unauthorized access", "Store data", "Compress files"], answer: "Block unauthorized access", topic: "Networking" },
    ],
  },
  {
    company: "Capgemini",
    questions: [
      { question: "What is inheritance in OOP?", options: ["Creating new classes from existing", "Hiding data", "Method overloading", "Object destruction"], answer: "Creating new classes from existing", topic: "OOP" },
      { question: "What is a primary key?", options: ["Any column", "Unique identifier for a row", "Foreign reference", "Index column"], answer: "Unique identifier for a row", topic: "SQL" },
      { question: "Which protocol sends email?", options: ["HTTP", "FTP", "SMTP", "POP3"], answer: "SMTP", topic: "Networking" },
      { question: "What is the output of print(type([])) in Python?", options: ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "<class 'set'>"], answer: "<class 'list'>", topic: "Python" },
      { question: "What is abstraction?", options: ["Showing all details", "Hiding complexity", "Data duplication", "Method chaining"], answer: "Hiding complexity", topic: "OOP" },
      { question: "A man walks 5 km North, 3 km East. Distance from start?", options: ["8 km", "√34 km", "2 km", "4 km"], answer: "√34 km", topic: "Aptitude" },
    ],
  },
  {
    company: "Zoho",
    questions: [
      { question: "What is time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: "O(log n)", topic: "DSA" },
      { question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue", topic: "DSA" },
      { question: "What is the space complexity of merge sort?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: "O(n)", topic: "DSA" },
      { question: "Which traversal gives sorted output for BST?", options: ["Preorder", "Postorder", "Inorder", "Level order"], answer: "Inorder", topic: "DSA" },
      { question: "What is a hash collision?", options: ["Two keys map to same index", "Key not found", "Table overflow", "Empty bucket"], answer: "Two keys map to same index", topic: "DSA" },
      { question: "Which graph algorithm finds shortest path?", options: ["DFS", "BFS", "Dijkstra", "Prim's"], answer: "Dijkstra", topic: "DSA" },
      { question: "What is dynamic programming?", options: ["Random solving", "Breaking into overlapping subproblems", "Brute force", "Greedy approach"], answer: "Breaking into overlapping subproblems", topic: "DSA" },
      { question: "What is the worst case of quicksort?", options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], answer: "O(n²)", topic: "DSA" },
    ],
  },
  {
    company: "Amazon",
    questions: [
      { question: "Which sorting algorithm has best average case?", options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"], answer: "Merge Sort", topic: "DSA" },
      { question: "What is the time complexity of accessing a HashMap?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: "O(1)", topic: "DSA" },
      { question: "What is a balanced BST?", options: ["All leaves at same level", "Height difference ≤ 1", "Complete binary tree", "Full binary tree"], answer: "Height difference ≤ 1", topic: "DSA" },
      { question: "Which design pattern is Singleton?", options: ["Creational", "Structural", "Behavioral", "Functional"], answer: "Creational", topic: "System Design" },
      { question: "What is CAP theorem?", options: ["Consistency, Availability, Partition tolerance", "Cache, API, Protocol", "Compute, Access, Performance", "None"], answer: "Consistency, Availability, Partition tolerance", topic: "System Design" },
      { question: "What is the purpose of a load balancer?", options: ["Store data", "Distribute traffic", "Encrypt data", "Compress files"], answer: "Distribute traffic", topic: "System Design" },
      { question: "What is an LRU cache?", options: ["Least Recently Updated", "Least Recently Used", "Last Random Update", "Least Required Usage"], answer: "Least Recently Used", topic: "DSA" },
      { question: "What is amortized time complexity?", options: ["Worst case always", "Average over sequence of operations", "Best case", "Random case"], answer: "Average over sequence of operations", topic: "DSA" },
    ],
  },
  {
    company: "Flipkart",
    questions: [
      { question: "What is a trie data structure used for?", options: ["Sorting", "String prefix matching", "Graph traversal", "Hashing"], answer: "String prefix matching", topic: "DSA" },
      { question: "What is the time complexity of BFS?", options: ["O(V)", "O(E)", "O(V+E)", "O(V*E)"], answer: "O(V+E)", topic: "DSA" },
      { question: "What is sharding in databases?", options: ["Replication", "Horizontal partitioning", "Indexing", "Caching"], answer: "Horizontal partitioning", topic: "System Design" },
      { question: "What is a microservice?", options: ["Monolithic app", "Small independent service", "Database", "Frontend framework"], answer: "Small independent service", topic: "System Design" },
      { question: "What is memoization?", options: ["Memory allocation", "Caching function results", "Garbage collection", "Stack overflow"], answer: "Caching function results", topic: "DSA" },
      { question: "Which data structure is used in BFS?", options: ["Stack", "Queue", "Heap", "Tree"], answer: "Queue", topic: "DSA" },
      { question: "What is eventual consistency?", options: ["Immediate sync", "Data syncs over time", "No consistency", "Random sync"], answer: "Data syncs over time", topic: "System Design" },
      { question: "What is the difference between process and thread?", options: ["Same thing", "Process has own memory, thread shares", "Thread has own memory", "No difference"], answer: "Process has own memory, thread shares", topic: "OS" },
    ],
  },
];

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
