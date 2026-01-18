export const subjects = [
  {
    id: 1,
    name: "Data Structures & Algorithms",
    code: "CS201",
    progress: 65,
    topics: [
      { id: 1, name: "Arrays & Strings", completed: true },
      { id: 2, name: "Linked Lists", completed: true },
      { id: 3, name: "Stacks & Queues", completed: true },
      { id: 4, name: "Trees & Graphs", completed: false },
      { id: 5, name: "Dynamic Programming", completed: false },
      { id: 6, name: "Sorting Algorithms", completed: true },
    ],
  },
  {
    id: 2,
    name: "Database Management Systems",
    code: "CS301",
    progress: 80,
    topics: [
      { id: 1, name: "ER Diagrams", completed: true },
      { id: 2, name: "Normalization", completed: true },
      { id: 3, name: "SQL Queries", completed: true },
      { id: 4, name: "Transactions", completed: true },
      { id: 5, name: "Indexing", completed: false },
    ],
  },
  {
    id: 3,
    name: "Operating Systems",
    code: "CS302",
    progress: 45,
    topics: [
      { id: 1, name: "Process Management", completed: true },
      { id: 2, name: "Memory Management", completed: true },
      { id: 3, name: "File Systems", completed: false },
      { id: 4, name: "Deadlocks", completed: false },
      { id: 5, name: "CPU Scheduling", completed: false },
    ],
  },
  {
    id: 4,
    name: "Computer Networks",
    code: "CS303",
    progress: 30,
    topics: [
      { id: 1, name: "OSI Model", completed: true },
      { id: 2, name: "TCP/IP", completed: false },
      { id: 3, name: "Routing Protocols", completed: false },
      { id: 4, name: "Network Security", completed: false },
    ],
  },
  {
    id: 5,
    name: "Software Engineering",
    code: "CS401",
    progress: 55,
    topics: [
      { id: 1, name: "SDLC Models", completed: true },
      { id: 2, name: "Agile Methodology", completed: true },
      { id: 3, name: "UML Diagrams", completed: false },
      { id: 4, name: "Testing Strategies", completed: false },
    ],
  },
]

export const examPrepData = {
  revisionChecklist: [
    { id: 1, task: "Review DSA concepts", completed: true },
    { id: 2, task: "Practice SQL queries", completed: true },
    { id: 3, task: "Study OS scheduling algorithms", completed: false },
    { id: 4, task: "Revise networking protocols", completed: false },
    { id: 5, task: "Complete mock tests", completed: false },
  ],
  previousYearPapers: [
    { id: 1, name: "DSA Mid-Semester 2024", downloaded: true },
    { id: 2, name: "DBMS End-Semester 2024", downloaded: false },
    { id: 3, name: "OS Mid-Semester 2023", downloaded: true },
    { id: 4, name: "CN End-Semester 2023", downloaded: false },
  ],
  importantTopics: [
    { id: 1, topic: "Binary Trees", subject: "DSA", priority: "high" },
    { id: 2, topic: "Normalization", subject: "DBMS", priority: "high" },
    { id: 3, topic: "Deadlock Prevention", subject: "OS", priority: "medium" },
    { id: 4, topic: "TCP/IP Model", subject: "CN", priority: "medium" },
    { id: 5, topic: "Agile Scrum", subject: "SE", priority: "low" },
  ],
}

export const interviewPrepData = {
  dsaPractice: [
    { id: 1, topic: "Array Problems", completed: 15, total: 25 },
    { id: 2, topic: "String Manipulation", completed: 10, total: 20 },
    { id: 3, topic: "Tree Traversals", completed: 5, total: 15 },
    { id: 4, topic: "Graph Algorithms", completed: 3, total: 20 },
    { id: 5, topic: "Dynamic Programming", completed: 8, total: 30 },
  ],
  coreSubjects: [
    { id: 1, subject: "Operating Systems", confidence: 70 },
    { id: 2, subject: "DBMS", confidence: 85 },
    { id: 3, subject: "Computer Networks", confidence: 55 },
    { id: 4, subject: "OOP Concepts", confidence: 90 },
  ],
  mockInterviews: [
    { id: 1, type: "Technical Round", date: "2024-01-15", score: 7 },
    { id: 2, type: "HR Round", date: "2024-01-18", score: 8 },
    { id: 3, type: "System Design", date: "2024-01-20", score: 6 },
  ],
  readinessScore: 68,
}

export const resources = [
  {
    category: "YouTube",
    items: [
      { id: 1, name: "Abdul Bari - Algorithms", url: "#", description: "Best for DSA concepts" },
      { id: 2, name: "Gate Smashers - DBMS", url: "#", description: "Complete DBMS playlist" },
      { id: 3, name: "Jenny's Lectures - OS", url: "#", description: "Operating Systems tutorials" },
    ],
  },
  {
    category: "Notes",
    items: [
      { id: 1, name: "DSA Handwritten Notes", url: "#", description: "Community notes" },
      { id: 2, name: "DBMS Quick Reference", url: "#", description: "Cheat sheet for exams" },
      { id: 3, name: "OS One-Shot Notes", url: "#", description: "Last minute revision" },
    ],
  },
  {
    category: "Books",
    items: [
      { id: 1, name: "CLRS - Introduction to Algorithms", url: "#", description: "The DSA bible" },
      { id: 2, name: "Database System Concepts", url: "#", description: "Silberschatz textbook" },
      { id: 3, name: "Operating System Concepts", url: "#", description: "Galvin textbook" },
    ],
  },
  {
    category: "Practice",
    items: [
      { id: 1, name: "LeetCode", url: "#", description: "Coding practice platform" },
      { id: 2, name: "HackerRank", url: "#", description: "Interview prep challenges" },
      { id: 3, name: "GeeksforGeeks", url: "#", description: "CS theory & practice" },
    ],
  },
]
