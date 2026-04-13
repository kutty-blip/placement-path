// ===== REAL QUESTION BANKS BY TOPIC =====
// 10 meaningful MCQ questions per topic

const DSA_QUESTIONS = [
  { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: "O(log n)" },
  { question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
  { question: "What is the worst case of quicksort?", options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], answer: "O(n²)" },
  { question: "Which traversal gives sorted output for BST?", options: ["Preorder", "Postorder", "Inorder", "Level order"], answer: "Inorder" },
  { question: "What is a hash collision?", options: ["Two keys map to same index", "Key not found", "Table overflow", "Empty bucket"], answer: "Two keys map to same index" },
  { question: "Which graph algorithm finds shortest path?", options: ["DFS", "BFS", "Dijkstra", "Prim's"], answer: "Dijkstra" },
  { question: "What is dynamic programming?", options: ["Random solving", "Breaking into overlapping subproblems", "Brute force", "Greedy approach"], answer: "Breaking into overlapping subproblems" },
  { question: "What is the space complexity of merge sort?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: "O(n)" },
  { question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Array", "LinkedList"], answer: "Stack" },
  { question: "What is the time complexity of accessing a HashMap?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: "O(1)" },
];

const SQL_QUESTIONS = [
  { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Sequential Query Language"], answer: "Structured Query Language" },
  { question: "Which SQL keyword removes duplicate rows?", options: ["UNIQUE", "DISTINCT", "REMOVE", "FILTER"], answer: "DISTINCT" },
  { question: "What is a foreign key?", options: ["Primary key of same table", "Key from another table", "Unique key", "Auto key"], answer: "Key from another table" },
  { question: "Which join returns all rows from both tables?", options: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"], answer: "FULL OUTER JOIN" },
  { question: "What is normalization in databases?", options: ["Making data faster", "Reducing redundancy", "Adding indexes", "Encrypting data"], answer: "Reducing redundancy" },
  { question: "What is a primary key?", options: ["Any column", "Unique identifier for a row", "Foreign reference", "Index column"], answer: "Unique identifier for a row" },
  { question: "Which SQL statement is used to update data?", options: ["MODIFY", "ALTER", "UPDATE", "CHANGE"], answer: "UPDATE" },
  { question: "What does GROUP BY do in SQL?", options: ["Sorts rows", "Groups rows with same values", "Filters rows", "Joins tables"], answer: "Groups rows with same values" },
  { question: "Which clause filters grouped results?", options: ["WHERE", "HAVING", "FILTER", "GROUP BY"], answer: "HAVING" },
  { question: "What is the difference between DELETE and TRUNCATE?", options: ["No difference", "DELETE is DDL", "TRUNCATE is DDL, DELETE is DML", "TRUNCATE can be rolled back"], answer: "TRUNCATE is DDL, DELETE is DML" },
];

const DATABASE_QUESTIONS = [
  { question: "What is ACID in databases?", options: ["A programming language", "Atomicity, Consistency, Isolation, Durability", "A type of index", "A query optimizer"], answer: "Atomicity, Consistency, Isolation, Durability" },
  { question: "What is a NoSQL database?", options: ["A relational DB", "Non-relational database", "A SQL variant", "A backup system"], answer: "Non-relational database" },
  { question: "What is indexing in databases?", options: ["Slows queries", "Creates a data structure to quickly locate data", "Deletes data", "No effect"], answer: "Creates a data structure to quickly locate data" },
  { question: "What is a transaction in databases?", options: ["A single query", "A unit of work that is atomic", "A table", "A view"], answer: "A unit of work that is atomic" },
  { question: "What is database sharding?", options: ["Replication", "Horizontal partitioning across servers", "Indexing", "Caching"], answer: "Horizontal partitioning across servers" },
  { question: "What is a stored procedure?", options: ["A saved query", "Precompiled SQL code stored in the database", "A table type", "An index"], answer: "Precompiled SQL code stored in the database" },
  { question: "What is a database view?", options: ["A physical table", "A virtual table based on a query", "An index", "A trigger"], answer: "A virtual table based on a query" },
  { question: "What type of database is MongoDB?", options: ["Relational", "Document-oriented NoSQL", "Graph database", "Key-value store"], answer: "Document-oriented NoSQL" },
  { question: "What is referential integrity?", options: ["Data encryption", "Ensuring foreign keys point to valid records", "Data compression", "Query optimization"], answer: "Ensuring foreign keys point to valid records" },
  { question: "What is a B-Tree used for in databases?", options: ["Sorting data", "Indexing for fast lookups", "Encryption", "Compression"], answer: "Indexing for fast lookups" },
];

const OS_QUESTIONS = [
  { question: "What is a deadlock in OS?", options: ["Fast execution", "Circular wait among processes", "Memory leak", "Buffer overflow"], answer: "Circular wait among processes" },
  { question: "What is virtual memory?", options: ["Physical RAM", "Technique using disk as extended memory", "Cache memory", "ROM"], answer: "Technique using disk as extended memory" },
  { question: "What is a semaphore?", options: ["A CPU register", "A synchronization tool for processes", "A memory unit", "A file system"], answer: "A synchronization tool for processes" },
  { question: "What is paging in OS?", options: ["Memory management dividing into fixed-size blocks", "A scheduling algorithm", "File system", "I/O operation"], answer: "Memory management dividing into fixed-size blocks" },
  { question: "What is thrashing?", options: ["Fast processing", "Excessive paging reducing performance", "CPU overclocking", "Disk formatting"], answer: "Excessive paging reducing performance" },
  { question: "What scheduling algorithm is FCFS?", options: ["Shortest Job First", "First Come First Served", "Priority Based", "Round Robin"], answer: "First Come First Served" },
  { question: "What is a process in OS?", options: ["A file", "A program in execution", "A thread", "A register"], answer: "A program in execution" },
  { question: "What is the difference between process and thread?", options: ["Same thing", "Process has own memory, thread shares", "Thread has own memory", "No difference"], answer: "Process has own memory, thread shares" },
  { question: "What is context switching?", options: ["Switching users", "Saving/restoring state when switching processes", "Changing OS", "Disk swap"], answer: "Saving/restoring state when switching processes" },
  { question: "What is a mutex?", options: ["A data type", "A mutual exclusion lock for threads", "A memory block", "A CPU instruction"], answer: "A mutual exclusion lock for threads" },
];

const NETWORKING_QUESTIONS = [
  { question: "Which protocol is used for secure web browsing?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], answer: "HTTPS" },
  { question: "What does DNS stand for?", options: ["Domain Name System", "Data Network Service", "Digital Name Server", "Domain Network System"], answer: "Domain Name System" },
  { question: "What is the difference between TCP and UDP?", options: ["UDP is reliable", "TCP is connection-oriented, UDP is connectionless", "They are identical", "TCP is connectionless"], answer: "TCP is connection-oriented, UDP is connectionless" },
  { question: "Which protocol sends email?", options: ["HTTP", "FTP", "SMTP", "POP3"], answer: "SMTP" },
  { question: "What layer does IP belong to in OSI model?", options: ["Transport", "Network", "Data Link", "Application"], answer: "Network" },
  { question: "What is a MAC address?", options: ["An IP address", "Physical hardware address of a NIC", "A software ID", "A port number"], answer: "Physical hardware address of a NIC" },
  { question: "What is the purpose of a firewall?", options: ["Speed up internet", "Block unauthorized access", "Store data", "Compress files"], answer: "Block unauthorized access" },
  { question: "What does ARP do?", options: ["Resolves IP to MAC address", "Sends emails", "Encrypts data", "Routes packets"], answer: "Resolves IP to MAC address" },
  { question: "What is a subnet mask used for?", options: ["Encryption", "Dividing network into subnetworks", "DNS resolution", "File sharing"], answer: "Dividing network into subnetworks" },
  { question: "What port does HTTP use by default?", options: ["21", "25", "80", "443"], answer: "80" },
];

const OOP_QUESTIONS = [
  { question: "What are the four pillars of OOP?", options: ["Inheritance, Polymorphism, Encapsulation, Abstraction", "Classes, Objects, Methods, Variables", "C, C++, Java, Python", "None"], answer: "Inheritance, Polymorphism, Encapsulation, Abstraction" },
  { question: "What is polymorphism?", options: ["One form", "Many forms — same interface, different behavior", "No form", "Two forms"], answer: "Many forms — same interface, different behavior" },
  { question: "What is encapsulation?", options: ["Hiding internal data and exposing methods", "Inheriting data", "Overloading data", "Destroying data"], answer: "Hiding internal data and exposing methods" },
  { question: "What is inheritance in OOP?", options: ["Creating new classes from existing ones", "Hiding data", "Method overloading", "Object destruction"], answer: "Creating new classes from existing ones" },
  { question: "What is abstraction?", options: ["Showing all details", "Hiding complexity and showing only essentials", "Data duplication", "Method chaining"], answer: "Hiding complexity and showing only essentials" },
  { question: "What is a constructor?", options: ["A destructor", "A method called on object creation", "A variable", "A loop"], answer: "A method called on object creation" },
  { question: "What is method overloading?", options: ["Same name, different parameters", "Same name, same parameters", "Overriding parent method", "Static method"], answer: "Same name, different parameters" },
  { question: "What is method overriding?", options: ["Same name in same class", "Redefining parent class method in child class", "Creating a new method", "Deleting a method"], answer: "Redefining parent class method in child class" },
  { question: "What is an interface in OOP?", options: ["A class with implementations", "A contract with method signatures only", "A variable type", "A loop structure"], answer: "A contract with method signatures only" },
  { question: "What is the difference between abstract class and interface?", options: ["No difference", "Abstract class can have implementations, interface cannot (traditional)", "Interface has constructors", "Abstract class supports multiple inheritance"], answer: "Abstract class can have implementations, interface cannot (traditional)" },
];

const SYSTEM_DESIGN_QUESTIONS = [
  { question: "What is CAP theorem?", options: ["Consistency, Availability, Partition tolerance", "Cache, API, Protocol", "Compute, Access, Performance", "None"], answer: "Consistency, Availability, Partition tolerance" },
  { question: "What is the purpose of a load balancer?", options: ["Store data", "Distribute traffic across servers", "Encrypt data", "Compress files"], answer: "Distribute traffic across servers" },
  { question: "What is a microservice?", options: ["Monolithic app", "Small independent service", "Database", "Frontend framework"], answer: "Small independent service" },
  { question: "What is eventual consistency?", options: ["Immediate sync", "Data syncs over time across nodes", "No consistency", "Random sync"], answer: "Data syncs over time across nodes" },
  { question: "What is database replication?", options: ["Deleting data", "Copying data across multiple servers", "Indexing", "Compression"], answer: "Copying data across multiple servers" },
  { question: "What is a CDN?", options: ["Central Data Network", "Content Delivery Network for caching content closer to users", "Cloud Data Node", "Compute Distribution Network"], answer: "Content Delivery Network for caching content closer to users" },
  { question: "What is horizontal scaling?", options: ["Adding more RAM", "Adding more server instances", "Upgrading CPU", "Adding more disk"], answer: "Adding more server instances" },
  { question: "What is an API gateway?", options: ["A database", "Entry point that routes requests to microservices", "A CDN", "A firewall"], answer: "Entry point that routes requests to microservices" },
  { question: "What is rate limiting?", options: ["Speeding up requests", "Controlling the number of requests per time window", "Caching", "Load balancing"], answer: "Controlling the number of requests per time window" },
  { question: "What is a message queue used for?", options: ["Storing files", "Asynchronous communication between services", "DNS resolution", "Authentication"], answer: "Asynchronous communication between services" },
];

const PROGRAMMING_QUESTIONS = [
  { question: "What is the output of 2 + '2' in JavaScript?", options: ["4", "22", "NaN", "Error"], answer: "22" },
  { question: "What is recursion?", options: ["A loop", "A function calling itself", "An array", "A class"], answer: "A function calling itself" },
  { question: "What is the result of 15 / 4 in integer division?", options: ["3", "3.75", "4", "3.5"], answer: "3" },
  { question: "What is a pointer?", options: ["A data type", "A variable that holds a memory address", "A function", "A class"], answer: "A variable that holds a memory address" },
  { question: "Which loop guarantees at least one execution?", options: ["for", "while", "do-while", "foreach"], answer: "do-while" },
  { question: "What is garbage collection?", options: ["Deleting files", "Automatic memory management reclaiming unused objects", "Disk cleanup", "Cache clearing"], answer: "Automatic memory management reclaiming unused objects" },
  { question: "What is the difference between == and === in JavaScript?", options: ["No difference", "=== checks type and value, == only value", "== is stricter", "=== is assignment"], answer: "=== checks type and value, == only value" },
  { question: "What is a callback function?", options: ["A recursive function", "A function passed as argument to another function", "A constructor", "A destructor"], answer: "A function passed as argument to another function" },
  { question: "What is Big O notation?", options: ["A programming language", "Describes algorithm's time/space complexity upper bound", "A data structure", "A design pattern"], answer: "Describes algorithm's time/space complexity upper bound" },
  { question: "What is the difference between compiled and interpreted languages?", options: ["No difference", "Compiled converts to machine code before running; interpreted runs line by line", "Interpreted is faster", "Compiled runs line by line"], answer: "Compiled converts to machine code before running; interpreted runs line by line" },
];

const JAVA_QUESTIONS = [
  { question: "What is the JVM?", options: ["Just a compiler", "Executes Java bytecode", "A text editor", "A database"], answer: "Executes Java bytecode" },
  { question: "Which keyword is used to create an object in Java?", options: ["class", "new", "create", "object"], answer: "new" },
  { question: "What is the default value of a boolean in Java?", options: ["true", "false", "null", "0"], answer: "false" },
  { question: "What is the use of 'this' keyword in Java?", options: ["Refers to parent class", "Refers to current object", "Creates new object", "Destroys object"], answer: "Refers to current object" },
  { question: "What is the difference between JDK, JRE, and JVM?", options: ["All same", "JDK has compiler+tools, JRE has libraries, JVM executes bytecode", "JVM has compiler", "JRE has compiler"], answer: "JDK has compiler+tools, JRE has libraries, JVM executes bytecode" },
  { question: "What are access modifiers in Java?", options: ["Data types", "public, private, protected, default — control visibility", "Loop types", "Exception types"], answer: "public, private, protected, default — control visibility" },
  { question: "What is the difference between String, StringBuilder, and StringBuffer?", options: ["No difference", "String is immutable; StringBuilder is mutable, not thread-safe; StringBuffer is mutable, thread-safe", "All are mutable", "All are immutable"], answer: "String is immutable; StringBuilder is mutable, not thread-safe; StringBuffer is mutable, thread-safe" },
  { question: "What is exception handling in Java?", options: ["Ignoring errors", "Using try-catch-finally to handle runtime errors", "A loop type", "A data type"], answer: "Using try-catch-finally to handle runtime errors" },
  { question: "What is the final keyword in Java?", options: ["Makes variable changeable", "Prevents modification — final variable, method, or class", "Creates objects", "Deletes objects"], answer: "Prevents modification — final variable, method, or class" },
  { question: "What is multithreading in Java?", options: ["Single execution path", "Concurrent execution of multiple threads", "Multiple JVMs", "Multiple compilations"], answer: "Concurrent execution of multiple threads" },
];

const PYTHON_QUESTIONS = [
  { question: "What is the output of print(type([]))?", options: ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "<class 'set'>"], answer: "<class 'list'>" },
  { question: "What is a list comprehension in Python?", options: ["A loop", "Concise way to create lists: [x for x in range(10)]", "A function", "A module"], answer: "Concise way to create lists: [x for x in range(10)]" },
  { question: "What is the difference between list and tuple?", options: ["No difference", "List is mutable, tuple is immutable", "Tuple is mutable", "Both are immutable"], answer: "List is mutable, tuple is immutable" },
  { question: "What is a decorator in Python?", options: ["A class", "A function that modifies another function's behavior", "A variable", "A loop"], answer: "A function that modifies another function's behavior" },
  { question: "What is PEP 8?", options: ["A Python version", "Python style guide for writing clean code", "A library", "A framework"], answer: "Python style guide for writing clean code" },
  { question: "What is a generator in Python?", options: ["A class", "A function that yields values lazily using yield", "A list", "A module"], answer: "A function that yields values lazily using yield" },
  { question: "What does *args mean in Python?", options: ["A pointer", "Allows passing variable number of positional arguments", "A fixed argument", "A keyword"], answer: "Allows passing variable number of positional arguments" },
  { question: "What is the GIL in Python?", options: ["A library", "Global Interpreter Lock preventing true multithreading", "A function", "A data type"], answer: "Global Interpreter Lock preventing true multithreading" },
  { question: "What is a lambda function?", options: ["A named function", "Anonymous single-expression function", "A class method", "A module"], answer: "Anonymous single-expression function" },
  { question: "How is memory managed in Python?", options: ["Manual only", "Automatic garbage collection with reference counting", "No management", "Stack only"], answer: "Automatic garbage collection with reference counting" },
];

const APTITUDE_QUESTIONS = [
  { question: "A train 150m long passes a pole in 15 seconds. Its speed is?", options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"], answer: "10 m/s" },
  { question: "If 30% of a number is 45, what is the number?", options: ["135", "150", "120", "100"], answer: "150" },
  { question: "If the ratio of ages of A and B is 3:4 and sum is 28, find A's age.", options: ["12", "16", "21", "24"], answer: "12" },
  { question: "Two numbers are in ratio 3:5. If their sum is 64, find the smaller.", options: ["24", "30", "32", "40"], answer: "24" },
  { question: "If a pipe can fill a tank in 6 hours, how much fills in 2 hours?", options: ["1/6", "1/3", "1/2", "2/3"], answer: "1/3" },
  { question: "What is 25% of 200?", options: ["25", "50", "75", "100"], answer: "50" },
  { question: "A man walks 5 km North, 3 km East. Distance from start?", options: ["8 km", "√34 km", "2 km", "4 km"], answer: "√34 km" },
  { question: "If a = 5, b = 3, what is a % b?", options: ["1", "2", "3", "5"], answer: "2" },
  { question: "A boat goes 20 km upstream and 40 km downstream taking 8 hours each. Speed of current?", options: ["5 km/h", "2.5 km/h", "3 km/h", "1.25 km/h"], answer: "1.25 km/h" },
  { question: "If a pipe fills a tank in 10 hrs and another empties in 15 hrs, how long to fill with both open?", options: ["20 hours", "30 hours", "40 hours", "5 hours"], answer: "30 hours" },
];

const WEB_QUESTIONS = [
  { question: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<h1>", "<head>", "<big>"], answer: "<h1>" },
  { question: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "foreground"], answer: "color" },
  { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Module", "Display Output Manager", "Document Order Method"], answer: "Document Object Model" },
  { question: "What is the purpose of the <meta> tag?", options: ["Styling", "Providing metadata about the document", "Creating links", "Adding scripts"], answer: "Providing metadata about the document" },
  { question: "What is responsive design?", options: ["Fast loading", "Design that adapts to different screen sizes", "Server-side rendering", "Database design"], answer: "Design that adapts to different screen sizes" },
  { question: "What does CSS flexbox do?", options: ["Creates tables", "Provides a flexible layout model for arranging items", "Adds animations", "Handles events"], answer: "Provides a flexible layout model for arranging items" },
  { question: "What is CORS?", options: ["A CSS property", "Cross-Origin Resource Sharing — allows cross-domain requests", "A JavaScript framework", "A server type"], answer: "Cross-Origin Resource Sharing — allows cross-domain requests" },
  { question: "What is a REST API?", options: ["A database", "Architectural style for web services using HTTP methods", "A frontend framework", "A CSS library"], answer: "Architectural style for web services using HTTP methods" },
  { question: "What is the purpose of localStorage?", options: ["Server storage", "Client-side key-value storage that persists across sessions", "Database", "Cookie replacement that expires"], answer: "Client-side key-value storage that persists across sessions" },
  { question: "What is the difference between GET and POST?", options: ["No difference", "GET retrieves data, POST sends data; GET has URL length limits", "POST is faster", "GET sends data"], answer: "GET retrieves data, POST sends data; GET has URL length limits" },
];

const SE_QUESTIONS = [
  { question: "What does SDLC stand for?", options: ["Software Development Life Cycle", "System Data Logic Control", "Software Design Logic Chart", "None"], answer: "Software Development Life Cycle" },
  { question: "What is Agile methodology?", options: ["Waterfall model", "Iterative and incremental development", "Big bang approach", "V-model"], answer: "Iterative and incremental development" },
  { question: "What is the Waterfall model?", options: ["Iterative approach", "Sequential linear development process", "Agile variant", "Spiral model"], answer: "Sequential linear development process" },
  { question: "What is a design pattern?", options: ["A UI template", "Reusable solution to common software design problems", "A programming language", "A testing method"], answer: "Reusable solution to common software design problems" },
  { question: "What is unit testing?", options: ["Testing the UI", "Testing individual components in isolation", "Testing the entire system", "Performance testing"], answer: "Testing individual components in isolation" },
  { question: "What is CI/CD?", options: ["A programming language", "Continuous Integration and Continuous Deployment", "A design pattern", "A database"], answer: "Continuous Integration and Continuous Deployment" },
  { question: "What is version control?", options: ["File backup", "Tracking and managing changes to code over time", "Code compilation", "Code encryption"], answer: "Tracking and managing changes to code over time" },
  { question: "What is a code review?", options: ["Compiling code", "Systematic examination of source code by peers", "Running tests", "Deploying code"], answer: "Systematic examination of source code by peers" },
  { question: "What is the Singleton design pattern?", options: ["Multiple instances", "Ensures only one instance of a class exists", "A factory method", "Observer pattern"], answer: "Ensures only one instance of a class exists" },
  { question: "What is technical debt?", options: ["Budget overrun", "Cost of rework from choosing quick solutions over better approaches", "Hardware cost", "Training cost"], answer: "Cost of rework from choosing quick solutions over better approaches" },
];

const CLOUD_QUESTIONS = [
  { question: "What is cloud computing?", options: ["Local storage", "On-demand computing resources over internet", "Hardware setup", "Offline computing"], answer: "On-demand computing resources over internet" },
  { question: "What is IaaS?", options: ["Internet as a Service", "Infrastructure as a Service — virtual machines, storage", "Integration as a Service", "Interface as a Service"], answer: "Infrastructure as a Service — virtual machines, storage" },
  { question: "What is PaaS?", options: ["Program as a Service", "Platform as a Service — managed runtime for apps", "Process as a Service", "Protocol as a Service"], answer: "Platform as a Service — managed runtime for apps" },
  { question: "What is SaaS?", options: ["Storage as a Service", "Software as a Service — fully managed applications", "Security as a Service", "System as a Service"], answer: "Software as a Service — fully managed applications" },
  { question: "What is serverless computing?", options: ["No servers exist", "Cloud provider manages servers; you only deploy code", "Peer-to-peer computing", "Edge computing"], answer: "Cloud provider manages servers; you only deploy code" },
  { question: "What is a container?", options: ["A virtual machine", "Lightweight isolated environment for running applications", "A database", "A network device"], answer: "Lightweight isolated environment for running applications" },
  { question: "What is Docker?", options: ["A programming language", "Platform for building and running containers", "A cloud provider", "A database"], answer: "Platform for building and running containers" },
  { question: "What is Kubernetes?", options: ["A programming language", "Container orchestration platform", "A database", "A web framework"], answer: "Container orchestration platform" },
  { question: "What is auto-scaling?", options: ["Manual scaling", "Automatically adjusting resources based on demand", "Fixed capacity", "Static allocation"], answer: "Automatically adjusting resources based on demand" },
  { question: "What is a VPC?", options: ["Virtual Personal Computer", "Virtual Private Cloud — isolated network in cloud", "Very Private Connection", "Virtual Protocol Channel"], answer: "Virtual Private Cloud — isolated network in cloud" },
];

const ARRAYS_QUESTIONS = [
  { question: "What is the time complexity of array access by index?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], answer: "O(1)" },
  { question: "What is the Two Sum problem about?", options: ["Finding max element", "Finding two numbers that add up to a target", "Sorting an array", "Reversing an array"], answer: "Finding two numbers that add up to a target" },
  { question: "What is the Kadane's algorithm used for?", options: ["Sorting", "Finding maximum subarray sum", "Binary search", "Merge arrays"], answer: "Finding maximum subarray sum" },
  { question: "How does the sliding window technique work?", options: ["Uses recursion", "Maintains a window of elements that slides across the array", "Divides array in half", "Uses hash map"], answer: "Maintains a window of elements that slides across the array" },
  { question: "What is the time complexity of linear search?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: "O(n)" },
  { question: "What does the Dutch National Flag algorithm solve?", options: ["Sorting", "Partitioning array into 3 groups (0s, 1s, 2s)", "Finding duplicates", "Merging arrays"], answer: "Partitioning array into 3 groups (0s, 1s, 2s)" },
  { question: "What is prefix sum used for?", options: ["Sorting", "Efficiently computing range sum queries", "Finding minimum", "Binary search"], answer: "Efficiently computing range sum queries" },
  { question: "How to find duplicates in an array in O(n)?", options: ["Sort first", "Use a hash set to track seen elements", "Nested loops", "Binary search"], answer: "Use a hash set to track seen elements" },
  { question: "What is the merge intervals problem?", options: ["Sorting numbers", "Combining overlapping intervals into one", "Finding gaps", "Array rotation"], answer: "Combining overlapping intervals into one" },
  { question: "What is the best time complexity for sorting an array?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: "O(n log n)" },
];

const DP_QUESTIONS = [
  { question: "What is the key idea behind dynamic programming?", options: ["Greedy choice", "Storing solutions to overlapping subproblems", "Divide and conquer", "Random approach"], answer: "Storing solutions to overlapping subproblems" },
  { question: "What is memoization?", options: ["Memory allocation", "Caching function results to avoid recomputation", "Garbage collection", "Stack overflow"], answer: "Caching function results to avoid recomputation" },
  { question: "What is tabulation in DP?", options: ["Top-down approach", "Bottom-up approach building a table iteratively", "Recursion", "Backtracking"], answer: "Bottom-up approach building a table iteratively" },
  { question: "What is the Coin Change problem?", options: ["Counting coins", "Finding minimum coins to make a given amount", "Sorting coins", "Exchanging coins"], answer: "Finding minimum coins to make a given amount" },
  { question: "What is the Longest Common Subsequence (LCS)?", options: ["Longest substring", "Longest subsequence common to two sequences", "Shortest path", "Maximum sum"], answer: "Longest subsequence common to two sequences" },
  { question: "What is the 0/1 Knapsack problem?", options: ["Packing items", "Maximizing value with weight constraint, items used once", "Sorting items", "Minimum cost"], answer: "Maximizing value with weight constraint, items used once" },
  { question: "What is the time complexity of the Fibonacci DP solution?", options: ["O(2^n)", "O(n)", "O(n²)", "O(log n)"], answer: "O(n)" },
  { question: "What is the Edit Distance problem?", options: ["Counting characters", "Minimum operations to convert one string to another", "String matching", "String sorting"], answer: "Minimum operations to convert one string to another" },
  { question: "What is optimal substructure?", options: ["Best data structure", "Optimal solution built from optimal solutions of subproblems", "Greedy property", "Random property"], answer: "Optimal solution built from optimal solutions of subproblems" },
  { question: "What is the Longest Increasing Subsequence?", options: ["Sorting", "Finding longest subsequence where elements are strictly increasing", "Maximum sum", "Minimum path"], answer: "Finding longest subsequence where elements are strictly increasing" },
];

const GRAPHS_QUESTIONS = [
  { question: "What is BFS time complexity?", options: ["O(V)", "O(E)", "O(V+E)", "O(V*E)"], answer: "O(V+E)" },
  { question: "Which data structure is used in BFS?", options: ["Stack", "Queue", "Heap", "Tree"], answer: "Queue" },
  { question: "Which data structure is used in DFS?", options: ["Queue", "Stack (or recursion)", "Heap", "Array"], answer: "Stack (or recursion)" },
  { question: "What is a topological sort?", options: ["Sorting numbers", "Linear ordering of vertices in a DAG", "Graph coloring", "Minimum spanning tree"], answer: "Linear ordering of vertices in a DAG" },
  { question: "What is Dijkstra's algorithm used for?", options: ["DFS", "Finding shortest path from a source in weighted graph", "Topological sort", "Graph coloring"], answer: "Finding shortest path from a source in weighted graph" },
  { question: "What is a minimum spanning tree?", options: ["Shortest path", "Tree connecting all vertices with minimum total edge weight", "BFS tree", "DFS tree"], answer: "Tree connecting all vertices with minimum total edge weight" },
  { question: "What is cycle detection in graphs?", options: ["Finding shortest path", "Determining if a graph contains a cycle", "Topological sort", "Graph coloring"], answer: "Determining if a graph contains a cycle" },
  { question: "What is the difference between directed and undirected graph?", options: ["No difference", "Directed edges have direction, undirected don't", "Undirected have direction", "Both have direction"], answer: "Directed edges have direction, undirected don't" },
  { question: "What is Union-Find used for?", options: ["Sorting", "Detecting connected components and cycles efficiently", "Shortest path", "Graph coloring"], answer: "Detecting connected components and cycles efficiently" },
  { question: "What is Bellman-Ford algorithm?", options: ["BFS variant", "Finds shortest paths even with negative weights", "Minimum spanning tree", "Topological sort"], answer: "Finds shortest paths even with negative weights" },
];

const LINKED_LIST_QUESTIONS = [
  { question: "What is a linked list?", options: ["An array", "Linear data structure with nodes connected by pointers", "A tree", "A graph"], answer: "Linear data structure with nodes connected by pointers" },
  { question: "What is the time complexity of inserting at the head?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], answer: "O(1)" },
  { question: "How do you detect a cycle in a linked list?", options: ["Sort it", "Use Floyd's fast and slow pointer algorithm", "Use BFS", "Use stack"], answer: "Use Floyd's fast and slow pointer algorithm" },
  { question: "What is a doubly linked list?", options: ["Two lists", "Each node has pointers to both next and previous nodes", "Two head pointers", "Circular list"], answer: "Each node has pointers to both next and previous nodes" },
  { question: "How to reverse a linked list?", options: ["Sort it", "Iterate and reverse pointers one by one", "Use array", "Delete and recreate"], answer: "Iterate and reverse pointers one by one" },
  { question: "What is the advantage of linked list over array?", options: ["Faster access", "Dynamic size and O(1) insertion/deletion at known position", "Less memory", "Better cache performance"], answer: "Dynamic size and O(1) insertion/deletion at known position" },
  { question: "How to find the middle of a linked list?", options: ["Count all nodes first", "Use slow and fast pointers", "Binary search", "Sort first"], answer: "Use slow and fast pointers" },
  { question: "What is a circular linked list?", options: ["A doubly linked list", "Last node points back to the first node", "A tree structure", "An array"], answer: "Last node points back to the first node" },
  { question: "How to merge two sorted linked lists?", options: ["Concatenate", "Compare nodes one by one and build merged list", "Sort after merge", "Use stack"], answer: "Compare nodes one by one and build merged list" },
  { question: "What is the time complexity of searching in a linked list?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: "O(n)" },
];

const STACK_QUESTIONS = [
  { question: "What operations does a stack support?", options: ["Enqueue/Dequeue", "Push/Pop", "Insert/Delete", "Add/Remove"], answer: "Push/Pop" },
  { question: "What is the time complexity of push and pop?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], answer: "O(1)" },
  { question: "How to check balanced parentheses?", options: ["Count characters", "Use a stack to match opening and closing brackets", "Use array", "Use queue"], answer: "Use a stack to match opening and closing brackets" },
  { question: "What is a monotonic stack?", options: ["A sorted array", "Stack maintaining elements in increasing/decreasing order", "A queue variant", "A heap"], answer: "Stack maintaining elements in increasing/decreasing order" },
  { question: "What is the Next Greater Element problem?", options: ["Finding max", "For each element, find the next larger element to its right", "Sorting", "Binary search"], answer: "For each element, find the next larger element to its right" },
  { question: "How is function call stack used?", options: ["For loops", "Stores return addresses and local variables during recursion", "For sorting", "For searching"], answer: "Stores return addresses and local variables during recursion" },
  { question: "What is stack overflow?", options: ["Full heap", "When stack exceeds its memory limit (e.g., infinite recursion)", "Empty stack", "Memory leak"], answer: "When stack exceeds its memory limit (e.g., infinite recursion)" },
  { question: "How to implement a queue using stacks?", options: ["Not possible", "Use two stacks — push to one, pop from another", "Use one stack", "Use array"], answer: "Use two stacks — push to one, pop from another" },
  { question: "What is the Min Stack problem?", options: ["Finding max", "Design stack that supports getMin() in O(1)", "Sorting stack", "Reversing stack"], answer: "Design stack that supports getMin() in O(1)" },
  { question: "How to evaluate a postfix expression?", options: ["Use queue", "Use a stack to process operands and operators", "Use recursion only", "Use array"], answer: "Use a stack to process operands and operators" },
];

const STRINGS_QUESTIONS = [
  { question: "What is the time complexity of string concatenation in a loop?", options: ["O(n)", "O(n²) due to creating new strings each time", "O(1)", "O(log n)"], answer: "O(n²) due to creating new strings each time" },
  { question: "What is the KMP algorithm used for?", options: ["Sorting strings", "Efficient pattern matching in strings", "String reversal", "String compression"], answer: "Efficient pattern matching in strings" },
  { question: "How to check if a string is a palindrome?", options: ["Sort it", "Compare characters from both ends moving inward", "Count characters", "Use stack only"], answer: "Compare characters from both ends moving inward" },
  { question: "What is an anagram?", options: ["A palindrome", "Two strings with same characters in different order", "A substring", "A prefix"], answer: "Two strings with same characters in different order" },
  { question: "What is the Longest Substring Without Repeating Characters?", options: ["Longest palindrome", "Longest window with all unique characters using sliding window", "Longest word", "Longest prefix"], answer: "Longest window with all unique characters using sliding window" },
  { question: "What is string hashing used for?", options: ["Encryption", "Fast string comparison using hash values", "Sorting", "Compression"], answer: "Fast string comparison using hash values" },
  { question: "What is the difference between substring and subsequence?", options: ["No difference", "Substring is contiguous; subsequence can skip characters", "Subsequence is contiguous", "Both skip characters"], answer: "Substring is contiguous; subsequence can skip characters" },
  { question: "How to find all permutations of a string?", options: ["Sort it", "Use backtracking to generate all arrangements", "Use hash map", "Use stack"], answer: "Use backtracking to generate all arrangements" },
  { question: "What is a trie data structure?", options: ["A binary tree", "Tree-like structure for efficient string prefix matching", "A hash table", "A graph"], answer: "Tree-like structure for efficient string prefix matching" },
  { question: "What is the Rabin-Karp algorithm?", options: ["Sorting algorithm", "String matching using rolling hash function", "Graph algorithm", "DP algorithm"], answer: "String matching using rolling hash function" },
];

const BACKTRACKING_QUESTIONS = [
  { question: "What is backtracking?", options: ["A sorting technique", "Exploring all solutions and abandoning invalid paths", "A greedy approach", "Dynamic programming"], answer: "Exploring all solutions and abandoning invalid paths" },
  { question: "What is the N-Queens problem?", options: ["Sorting queens", "Placing N queens on NxN board with no attacks", "Finding shortest path", "Graph coloring"], answer: "Placing N queens on NxN board with no attacks" },
  { question: "What is the Sudoku solver approach?", options: ["Greedy", "Backtracking — try digits and undo if invalid", "Dynamic programming", "BFS"], answer: "Backtracking — try digits and undo if invalid" },
  { question: "What is the subset sum problem?", options: ["Finding max sum", "Finding if a subset with given sum exists", "Sorting subsets", "Counting subsets"], answer: "Finding if a subset with given sum exists" },
  { question: "How does Word Search work on a grid?", options: ["Binary search", "DFS/backtracking exploring adjacent cells", "BFS only", "Sorting"], answer: "DFS/backtracking exploring adjacent cells" },
  { question: "What is the time complexity of generating all subsets?", options: ["O(n)", "O(2^n)", "O(n²)", "O(n log n)"], answer: "O(2^n)" },
  { question: "What is the difference between backtracking and brute force?", options: ["No difference", "Backtracking prunes invalid paths early", "Brute force is faster", "Backtracking checks all paths"], answer: "Backtracking prunes invalid paths early" },
  { question: "What is the combination sum problem?", options: ["Adding numbers", "Finding combinations that sum to target, elements reusable", "Sorting combinations", "Minimum sum"], answer: "Finding combinations that sum to target, elements reusable" },
  { question: "What is the permutation problem?", options: ["Sorting", "Generating all possible arrangements of elements", "Finding subsets", "Graph traversal"], answer: "Generating all possible arrangements of elements" },
  { question: "What is constraint satisfaction in backtracking?", options: ["Ignoring constraints", "Ensuring each step satisfies problem constraints before proceeding", "Random choices", "Greedy selection"], answer: "Ensuring each step satisfies problem constraints before proceeding" },
];

// ===== MAP OF ALL TOPICS =====
const TOPIC_QUESTION_MAP: Record<string, { question: string; options: string[]; answer: string }[]> = {
  "DSA": DSA_QUESTIONS,
  "SQL": SQL_QUESTIONS,
  "Database": DATABASE_QUESTIONS,
  "OS": OS_QUESTIONS,
  "Networking": NETWORKING_QUESTIONS,
  "OOP": OOP_QUESTIONS,
  "System Design": SYSTEM_DESIGN_QUESTIONS,
  "Programming": PROGRAMMING_QUESTIONS,
  "Java": JAVA_QUESTIONS,
  "Python": PYTHON_QUESTIONS,
  "Aptitude": APTITUDE_QUESTIONS,
  "Web": WEB_QUESTIONS,
  "SE": SE_QUESTIONS,
  "Cloud": CLOUD_QUESTIONS,
  "Arrays": ARRAYS_QUESTIONS,
  "DP": DP_QUESTIONS,
  "Graphs": GRAPHS_QUESTIONS,
  "Linked List": LINKED_LIST_QUESTIONS,
  "Stack": STACK_QUESTIONS,
  "Strings": STRINGS_QUESTIONS,
  "Backtracking": BACKTRACKING_QUESTIONS,
};

export const COMPANIES = ["Amazon", "TCS", "Infosys", "Zoho", "Wipro", "HCL", "Cognizant", "Accenture", "Capgemini", "Flipkart"];
export const TOPICS = Object.keys(TOPIC_QUESTION_MAP);

// ===== GENERATE MCQ QUESTION BANKS =====
// Each company gets all topics with 10 real questions each
export const generateMockQuestions = () => {
  return COMPANIES.map(company => ({
    company,
    questions: TOPICS.flatMap(topic =>
      TOPIC_QUESTION_MAP[topic].map(q => ({ ...q, topic }))
    ),
  }));
};

// ===== CODING PROBLEMS =====
export interface CodingProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  leetcodeUrl: string;
  companyTags: string[];
}

const REAL_CODING_PROBLEMS: CodingProblem[] = [
  // Arrays
  { id: "1", title: "Two Sum", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/two-sum/", companyTags: ["Amazon", "TCS", "Infosys"] },
  { id: "2", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", companyTags: ["Amazon", "Flipkart", "Capgemini"] },
  { id: "3", title: "Contains Duplicate", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/", companyTags: ["TCS", "Infosys", "Wipro"] },
  { id: "4", title: "3Sum", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/3sum/", companyTags: ["Flipkart", "Amazon", "Zoho"] },
  { id: "5", title: "Merge Intervals", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/merge-intervals/", companyTags: ["Amazon", "Zoho"] },
  { id: "6", title: "Product of Array Except Self", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/", companyTags: ["Amazon", "Flipkart"] },
  { id: "7", title: "Maximum Subarray", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/", companyTags: ["Amazon", "TCS", "HCL"] },
  { id: "8", title: "Trapping Rain Water", difficulty: "Hard", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/", companyTags: ["Amazon", "Flipkart", "Zoho"] },
  { id: "9", title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/", companyTags: ["Amazon", "Flipkart"] },
  { id: "10", title: "First Missing Positive", difficulty: "Hard", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/first-missing-positive/", companyTags: ["Amazon", "Zoho"] },

  // Strings  
  { id: "11", title: "Valid Anagram", difficulty: "Easy", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/valid-anagram/", companyTags: ["TCS", "Infosys", "Wipro"] },
  { id: "12", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", companyTags: ["Amazon", "Zoho", "HCL"] },
  { id: "13", title: "Longest Palindromic Substring", difficulty: "Medium", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/", companyTags: ["Amazon", "Flipkart"] },
  { id: "14", title: "Group Anagrams", difficulty: "Medium", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/group-anagrams/", companyTags: ["Amazon", "Zoho"] },
  { id: "15", title: "Minimum Window Substring", difficulty: "Hard", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/", companyTags: ["Amazon", "Flipkart"] },

  // Linked List
  { id: "16", title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List", leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/", companyTags: ["TCS", "Infosys", "Wipro"] },
  { id: "17", title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked List", leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/", companyTags: ["Zoho", "TCS", "Accenture"] },
  { id: "18", title: "Linked List Cycle", difficulty: "Easy", topic: "Linked List", leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/", companyTags: ["Amazon", "Wipro"] },
  { id: "19", title: "Add Two Numbers", difficulty: "Medium", topic: "Linked List", leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/", companyTags: ["Amazon", "Flipkart"] },
  { id: "20", title: "Merge k Sorted Lists", difficulty: "Hard", topic: "Linked List", leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/", companyTags: ["Amazon", "Zoho"] },

  // Stack
  { id: "21", title: "Valid Parentheses", difficulty: "Easy", topic: "Stack", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/", companyTags: ["Amazon", "Wipro", "Cognizant"] },
  { id: "22", title: "Min Stack", difficulty: "Medium", topic: "Stack", leetcodeUrl: "https://leetcode.com/problems/min-stack/", companyTags: ["Amazon", "Zoho"] },
  { id: "23", title: "Daily Temperatures", difficulty: "Medium", topic: "Stack", leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/", companyTags: ["Amazon", "Flipkart"] },
  { id: "24", title: "Largest Rectangle in Histogram", difficulty: "Hard", topic: "Stack", leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/", companyTags: ["Amazon", "Zoho"] },

  // Graphs
  { id: "25", title: "Number of Islands", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/number-of-islands/", companyTags: ["Amazon", "Flipkart"] },
  { id: "26", title: "Course Schedule", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/course-schedule/", companyTags: ["Amazon", "Zoho"] },
  { id: "27", title: "Clone Graph", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/clone-graph/", companyTags: ["Amazon", "Flipkart"] },
  { id: "28", title: "Word Ladder", difficulty: "Hard", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/word-ladder/", companyTags: ["Amazon", "Cognizant"] },

  // DP
  { id: "29", title: "Climbing Stairs", difficulty: "Easy", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/", companyTags: ["TCS", "Infosys", "Wipro"] },
  { id: "30", title: "Coin Change", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/coin-change/", companyTags: ["Amazon", "Flipkart", "Infosys"] },
  { id: "31", title: "Longest Increasing Subsequence", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/", companyTags: ["Amazon", "Zoho"] },
  { id: "32", title: "House Robber", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/house-robber/", companyTags: ["Amazon", "Flipkart"] },
  { id: "33", title: "Edit Distance", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/edit-distance/", companyTags: ["Amazon", "Zoho"] },

  // Backtracking
  { id: "34", title: "Word Search", difficulty: "Medium", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/word-search/", companyTags: ["Amazon", "Wipro"] },
  { id: "35", title: "N-Queens", difficulty: "Hard", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/n-queens/", companyTags: ["Amazon", "Zoho"] },
  { id: "36", title: "Combination Sum", difficulty: "Medium", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/combination-sum/", companyTags: ["Amazon", "Flipkart"] },
  { id: "37", title: "Permutations", difficulty: "Medium", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/permutations/", companyTags: ["Amazon", "Zoho"] },
  { id: "38", title: "Subsets", difficulty: "Medium", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/subsets/", companyTags: ["Amazon", "Flipkart", "TCS"] },

  // System Design (conceptual)
  { id: "39", title: "Design HashMap", difficulty: "Easy", topic: "System Design", leetcodeUrl: "https://leetcode.com/problems/design-hashmap/", companyTags: ["Amazon", "TCS"] },
  { id: "40", title: "LRU Cache", difficulty: "Medium", topic: "System Design", leetcodeUrl: "https://leetcode.com/problems/lru-cache/", companyTags: ["Amazon", "Flipkart", "Zoho"] },
];

export const generateMockCodingProblems = (): CodingProblem[] => {
  return REAL_CODING_PROBLEMS;
};
