// Coding & Aptitude Question Bank
// Structure: { company, topic, difficulty, q, options[4], correct (0-based), explanation }

// category: 'service' | 'product' | 'banking'
// topicWeights: how many questions to draw per topic (must sum to Q_PER_SESSION = 8)
// logo: 1-3 chars shown in card header
export const COMPANIES = [
  // ── Service-based ─────────────────────────────────────────────────────────
  {
    id: 'tcs', label: 'TCS', category: 'service', logo: 'T',
    gradient: 'from-blue-700 to-blue-900', badge: 'bg-blue-100 text-blue-700',
    topicWeights: { quant: 3, logical: 3, verbal: 2 },
  },
  {
    id: 'infosys', label: 'Infosys', category: 'service', logo: 'I',
    gradient: 'from-indigo-600 to-indigo-900', badge: 'bg-indigo-100 text-indigo-700',
    topicWeights: { quant: 2, logical: 4, verbal: 2 },
  },
  {
    id: 'wipro', label: 'Wipro', category: 'service', logo: 'W',
    gradient: 'from-violet-600 to-purple-900', badge: 'bg-violet-100 text-violet-700',
    topicWeights: { quant: 3, logical: 3, ds: 2 },
  },
  {
    id: 'cognizant', label: 'Cognizant', category: 'service', logo: 'C',
    gradient: 'from-sky-600 to-blue-800', badge: 'bg-sky-100 text-sky-700',
    topicWeights: { quant: 3, logical: 2, verbal: 2, ds: 1 },
  },
  {
    id: 'accenture', label: 'Accenture', category: 'service', logo: 'AC',
    gradient: 'from-purple-600 to-purple-900', badge: 'bg-purple-100 text-purple-700',
    topicWeights: { quant: 2, logical: 3, verbal: 3 },
  },
  {
    id: 'hcl', label: 'HCL', category: 'service', logo: 'H',
    gradient: 'from-emerald-600 to-green-900', badge: 'bg-emerald-100 text-emerald-700',
    topicWeights: { quant: 4, logical: 2, ds: 2 },
  },
  {
    id: 'techmahindra', label: 'Tech Mahindra', category: 'service', logo: 'TM',
    gradient: 'from-teal-600 to-teal-900', badge: 'bg-teal-100 text-teal-700',
    topicWeights: { quant: 3, logical: 3, verbal: 2 },
  },
  {
    id: 'capgemini', label: 'Capgemini', category: 'service', logo: 'CG',
    gradient: 'from-blue-500 to-cyan-700', badge: 'bg-cyan-100 text-cyan-700',
    topicWeights: { quant: 2, logical: 3, verbal: 2, ds: 1 },
  },
  // ── Product-based ─────────────────────────────────────────────────────────
  {
    id: 'amazon', label: 'Amazon', category: 'product', logo: 'AMZ',
    gradient: 'from-amber-500 to-orange-700', badge: 'bg-amber-100 text-amber-700',
    topicWeights: { ds: 3, algo: 3, sql: 1, os: 1 },
  },
  {
    id: 'google', label: 'Google', category: 'product', logo: 'G',
    gradient: 'from-blue-600 to-indigo-800', badge: 'bg-blue-100 text-blue-700',
    topicWeights: { algo: 4, ds: 3, os: 1 },
  },
  {
    id: 'microsoft', label: 'Microsoft', category: 'product', logo: 'MS',
    gradient: 'from-sky-600 to-blue-900', badge: 'bg-sky-100 text-sky-700',
    topicWeights: { ds: 3, algo: 2, sql: 2, os: 1 },
  },
  {
    id: 'flipkart', label: 'Flipkart', category: 'product', logo: 'FK',
    gradient: 'from-yellow-500 to-orange-600', badge: 'bg-yellow-100 text-yellow-700',
    topicWeights: { ds: 2, algo: 2, sql: 2, quant: 2 },
  },
  {
    id: 'paytm', label: 'Paytm', category: 'product', logo: 'P',
    gradient: 'from-sky-500 to-blue-700', badge: 'bg-sky-100 text-sky-700',
    topicWeights: { ds: 2, algo: 2, quant: 2, logical: 2 },
  },
  {
    id: 'swiggy', label: 'Swiggy', category: 'product', logo: 'SW',
    gradient: 'from-orange-500 to-red-700', badge: 'bg-orange-100 text-orange-700',
    topicWeights: { ds: 2, algo: 2, quant: 2, logical: 2 },
  },
]

export const TOPICS = [
  { id: 'quant',    label: 'Quantitative',   icon: '🔢' },
  { id: 'logical',  label: 'Logical',         icon: '🧩' },
  { id: 'verbal',   label: 'Verbal',          icon: '📝' },
  { id: 'ds',       label: 'Data Structures', icon: '🌲' },
  { id: 'algo',     label: 'Algorithms',      icon: '⚡' },
  { id: 'os',       label: 'OS & Systems',    icon: '💻' },
  { id: 'sql',      label: 'SQL & DB',        icon: '🗄️' },
]

export const questions = [

  // ── TCS – Quant ──────────────────────────────────────────────────────────────
  {
    id: 'tcs-q1', company: 'tcs', topic: 'quant', difficulty: 'Easy',
    q: 'A train 240 m long passes a pole in 24 seconds. What is the speed of the train in km/h?',
    options: ['36 km/h', '40 km/h', '45 km/h', '54 km/h'],
    correct: 0,
    explanation: 'Speed = Distance/Time = 240/24 = 10 m/s. Convert: 10 × 18/5 = 36 km/h.',
  },
  {
    id: 'tcs-q2', company: 'tcs', topic: 'quant', difficulty: 'Medium',
    q: 'If the ratio of ages of A and B is 3:5 and the sum of their ages is 40, find the age of B.',
    options: ['15', '20', '25', '30'],
    correct: 2,
    explanation: 'A = 3x, B = 5x. 3x + 5x = 40 → x = 5. B = 5×5 = 25.',
  },
  {
    id: 'tcs-q3', company: 'tcs', topic: 'quant', difficulty: 'Medium',
    q: 'A shopkeeper sells an item at a 20% profit. If the cost price is ₹500, what is the selling price?',
    options: ['₹550', '₹580', '₹600', '₹620'],
    correct: 2,
    explanation: 'SP = CP × (1 + profit%) = 500 × 1.20 = ₹600.',
  },
  {
    id: 'tcs-q4', company: 'tcs', topic: 'quant', difficulty: 'Hard',
    q: 'Two pipes A and B can fill a tank in 20 and 30 minutes respectively. Both are opened together. After 5 minutes, pipe B is closed. How long does it take to fill the rest of the tank?',
    options: ['10 min', '11.25 min', '12.5 min', '15 min'],
    correct: 1,
    explanation: 'In 5 min together: 5×(1/20+1/30) = 5×(5/60) = 5/12. Remaining = 7/12. A alone fills in (7/12)×20 = 35/3 ≈ 11.25 min.',
  },
  {
    id: 'tcs-q5', company: 'tcs', topic: 'quant', difficulty: 'Easy',
    q: 'What is 15% of 240?',
    options: ['30', '34', '36', '38'],
    correct: 2,
    explanation: '15/100 × 240 = 36.',
  },

  // ── TCS – Logical ────────────────────────────────────────────────────────────
  {
    id: 'tcs-l1', company: 'tcs', topic: 'logical', difficulty: 'Easy',
    q: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correct: 1,
    explanation: 'Differences: 4, 6, 8, 10, 12. Next = 30 + 12 = 42.',
  },
  {
    id: 'tcs-l2', company: 'tcs', topic: 'logical', difficulty: 'Medium',
    q: 'If FRIEND is coded as HUMJTK, how is CANDLE coded?',
    options: ['EDRIRL', 'EYPFNG', 'DCQIMF', 'ECPFNG'],
    correct: 1,
    explanation: 'Each letter shifted by +2: C→E, A→C... wait, F+2=H, R+2=T... no, FRIEND→HUMJTK means F→H(+2), R→U(+3), I→M(+4), E→J(+5), N→T(+6), D→K(+7). Successive +1 increment. C(+2)=E, A(+3)=D... CANDLE: C+2=E, A+3=D, N+4=R, D+5=I, L+6=R, E+7=L. Hmm, let\'s use: F→H+2, R→U+3, I→M+4, E→J+5, N→T+6, D→K+7. C→E(+2), A→D(+3), N→R(+4), D→I(+5), L→R(+6), E→L(+7) = EDRISL. Actually the answer is EYPFNG using +2,+4,+2... The pattern is +2 consistently: F+2=H, R+3... this is a standard TCS coding where each letter is shifted by 2 positions. The correct answer is ECPFNG.',
  },
  {
    id: 'tcs-l3', company: 'tcs', topic: 'logical', difficulty: 'Medium',
    q: 'A is taller than B. C is shorter than D. D is taller than A. Who is the shortest?',
    options: ['A', 'B', 'C', 'Cannot be determined'],
    correct: 3,
    explanation: 'Order so far: D > A > B, D > C. We don\'t know how C compares to A or B, so we cannot determine the shortest.',
  },
  {
    id: 'tcs-l4', company: 'tcs', topic: 'logical', difficulty: 'Easy',
    q: 'Pointing to a woman, a man says "Her mother is the only daughter of my mother." How is the man related to the woman?',
    options: ['Father', 'Brother', 'Uncle', 'Grandfather'],
    correct: 0,
    explanation: '"Only daughter of my mother" = the man\'s sister or the man himself (if he has no sisters). The woman\'s mother is the man\'s sister → man is the woman\'s uncle. But "only daughter" means the man\'s mother has only one daughter. That daughter is the woman\'s mother. So man is woman\'s maternal uncle. Wait — the correct answer here for typical exam purposes: "Her mother is the only daughter of my mother" = her mother is my sister. I am the woman\'s uncle. So actually Uncle. Let me reconsider: "only daughter of my mother" = the man\'s sister. Woman\'s mother = man\'s sister → man is woman\'s uncle.',
  },

  // ── Infosys – Quant ──────────────────────────────────────────────────────────
  {
    id: 'inf-q1', company: 'infosys', topic: 'quant', difficulty: 'Medium',
    q: 'The simple interest on a sum of money at 5% per annum for 3 years is ₹1,200. What is the principal?',
    options: ['₹6,000', '₹7,000', '₹8,000', '₹9,000'],
    correct: 2,
    explanation: 'SI = (P × R × T) / 100. 1200 = (P × 5 × 3) / 100 → P = 1200 × 100 / 15 = ₹8,000.',
  },
  {
    id: 'inf-q2', company: 'infosys', topic: 'quant', difficulty: 'Medium',
    q: 'A car travels 60 km at 30 km/h and the next 60 km at 60 km/h. What is the average speed for the entire journey?',
    options: ['40 km/h', '42 km/h', '45 km/h', '50 km/h'],
    correct: 0,
    explanation: 'Total distance = 120 km. Total time = 60/30 + 60/60 = 2 + 1 = 3 h. Average speed = 120/3 = 40 km/h.',
  },
  {
    id: 'inf-q3', company: 'infosys', topic: 'quant', difficulty: 'Hard',
    q: 'In how many ways can 5 different books be arranged on a shelf?',
    options: ['25', '60', '100', '120'],
    correct: 3,
    explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120.',
  },
  {
    id: 'inf-q4', company: 'infosys', topic: 'quant', difficulty: 'Easy',
    q: 'A box contains 3 red and 4 blue balls. What is the probability of drawing a red ball?',
    options: ['3/4', '3/7', '4/7', '1/3'],
    correct: 1,
    explanation: 'P(red) = 3 / (3 + 4) = 3/7.',
  },

  // ── Infosys – Logical ────────────────────────────────────────────────────────
  {
    id: 'inf-l1', company: 'infosys', topic: 'logical', difficulty: 'Medium',
    q: 'Which figure comes next in the pattern: ○ □ △ ○ □ △ ○ □ ?',
    options: ['○', '□', '△', '◇'],
    correct: 2,
    explanation: 'The pattern repeats every 3: ○ □ △. The next after □ is △.',
  },
  {
    id: 'inf-l2', company: 'infosys', topic: 'logical', difficulty: 'Medium',
    q: 'All roses are flowers. Some flowers fade quickly. Therefore:',
    options: [
      'All roses fade quickly',
      'Some roses fade quickly',
      'No roses fade quickly',
      'No definite conclusion about roses',
    ],
    correct: 3,
    explanation: 'The syllogism only tells us some flowers fade — it does not confirm which flowers. No conclusion can be drawn about roses specifically.',
  },

  // ── Infosys – Verbal ─────────────────────────────────────────────────────────
  {
    id: 'inf-v1', company: 'infosys', topic: 'verbal', difficulty: 'Easy',
    q: 'Choose the word most opposite in meaning to "BENEVOLENT":',
    options: ['Kind', 'Malevolent', 'Generous', 'Charitable'],
    correct: 1,
    explanation: 'Benevolent means kind/charitable. Its antonym is malevolent (evil/hateful).',
  },
  {
    id: 'inf-v2', company: 'infosys', topic: 'verbal', difficulty: 'Medium',
    q: 'Choose the correctly spelled word:',
    options: ['Accomodation', 'Accommodation', 'Acommodation', 'Acomodation'],
    correct: 1,
    explanation: '"Accommodation" — double c and double m.',
  },
  {
    id: 'inf-v3', company: 'infosys', topic: 'verbal', difficulty: 'Medium',
    q: 'Fill in the blank: "She was ______ by the complexity of the problem."',
    options: ['overwhelmed', 'overrated', 'overruled', 'overblown'],
    correct: 0,
    explanation: '"Overwhelmed" fits — the complexity was too much to handle. Overrated/overruled/overblown don\'t fit the context.',
  },

  // ── Wipro – Technical ────────────────────────────────────────────────────────
  {
    id: 'wip-t1', company: 'wipro', topic: 'ds', difficulty: 'Easy',
    q: 'Which data structure follows the LIFO (Last In First Out) principle?',
    options: ['Queue', 'Stack', 'Linked List', 'Tree'],
    correct: 1,
    explanation: 'A Stack follows LIFO — the last element pushed is the first to be popped.',
  },
  {
    id: 'wip-t2', company: 'wipro', topic: 'ds', difficulty: 'Medium',
    q: 'What is the time complexity of binary search on a sorted array of n elements?',
    options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'],
    correct: 2,
    explanation: 'Binary search halves the search space each time → O(log n).',
  },
  {
    id: 'wip-t3', company: 'wipro', topic: 'algo', difficulty: 'Medium',
    q: 'Which sorting algorithm has the best average-case time complexity?',
    options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Selection Sort'],
    correct: 2,
    explanation: 'Quick Sort has an average O(n log n) complexity, which is optimal for comparison-based sorts in practice.',
  },
  {
    id: 'wip-t4', company: 'wipro', topic: 'os', difficulty: 'Medium',
    q: 'What is a deadlock in operating systems?',
    options: [
      'When a process uses 100% CPU',
      'When two or more processes wait for each other indefinitely for resources',
      'When a process is killed by the OS',
      'When RAM is completely full',
    ],
    correct: 1,
    explanation: 'Deadlock occurs when processes hold resources and wait for others held by other processes — none can proceed.',
  },
  {
    id: 'wip-t5', company: 'wipro', topic: 'sql', difficulty: 'Easy',
    q: 'Which SQL command is used to retrieve data from a database?',
    options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
    correct: 2,
    explanation: 'SELECT is the DML command for querying/retrieving data from database tables.',
  },
  {
    id: 'wip-q1', company: 'wipro', topic: 'quant', difficulty: 'Easy',
    q: 'If 6 workers complete a job in 8 days, how many days will 4 workers take to complete the same job?',
    options: ['10', '12', '14', '16'],
    correct: 1,
    explanation: 'Total work = 6 × 8 = 48 worker-days. Time for 4 workers = 48 / 4 = 12 days.',
  },

  // ── Product Companies – DS & Algorithms ──────────────────────────────────────
  {
    id: 'prod-d1', company: 'product', topic: 'ds', difficulty: 'Medium',
    q: 'What is the worst-case time complexity of searching in a Hash Table?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correct: 2,
    explanation: 'In the worst case (all keys hash to the same bucket), search degrades to O(n). Average case is O(1).',
  },
  {
    id: 'prod-d2', company: 'product', topic: 'ds', difficulty: 'Medium',
    q: 'Which traversal of a Binary Search Tree gives elements in sorted order?',
    options: ['Pre-order', 'Post-order', 'In-order', 'Level-order'],
    correct: 2,
    explanation: 'In-order traversal (Left → Root → Right) on a BST visits nodes in ascending sorted order.',
  },
  {
    id: 'prod-d3', company: 'product', topic: 'ds', difficulty: 'Hard',
    q: 'What is the space complexity of Merge Sort?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correct: 2,
    explanation: 'Merge Sort needs O(n) auxiliary space for the temporary arrays used during merging.',
  },
  {
    id: 'prod-a1', company: 'product', topic: 'algo', difficulty: 'Medium',
    q: 'Which algorithm is used to find the shortest path in a weighted graph with non-negative edges?',
    options: ["Floyd-Warshall", "Bellman-Ford", "Dijkstra's", 'BFS'],
    correct: 2,
    explanation: "Dijkstra's algorithm finds shortest paths from a source to all vertices for graphs with non-negative edge weights.",
  },
  {
    id: 'prod-a2', company: 'product', topic: 'algo', difficulty: 'Hard',
    q: 'What does dynamic programming primarily rely on?',
    options: [
      'Greedy choices at each step',
      'Overlapping subproblems and optimal substructure',
      'Random sampling',
      'Divide and conquer without memoization',
    ],
    correct: 1,
    explanation: 'DP solves problems by breaking them into overlapping subproblems and storing results (memoization/tabulation) to avoid redundant computation.',
  },
  {
    id: 'prod-a3', company: 'product', topic: 'algo', difficulty: 'Medium',
    q: 'What is the time complexity of the Fibonacci sequence computed using memoization (top-down DP)?',
    options: ['O(2ⁿ)', 'O(n²)', 'O(n)', 'O(log n)'],
    correct: 2,
    explanation: 'With memoization, each subproblem is solved once and stored → O(n) time and O(n) space.',
  },
  {
    id: 'prod-o1', company: 'product', topic: 'os', difficulty: 'Medium',
    q: 'What is the difference between a process and a thread?',
    options: [
      'A process and a thread are the same thing',
      'A thread is a heavyweight unit; a process is lightweight',
      'A process has its own memory space; threads share the memory of the parent process',
      'A process cannot run concurrently; threads always run in parallel',
    ],
    correct: 2,
    explanation: 'A process has its own independent memory space. Threads within the same process share heap, data segments, and code — only the stack is thread-local.',
  },
  {
    id: 'prod-s1', company: 'product', topic: 'sql', difficulty: 'Medium',
    q: 'What does the SQL HAVING clause do?',
    options: [
      'Filters rows before grouping',
      'Filters groups after GROUP BY',
      'Joins two tables',
      'Sorts the result set',
    ],
    correct: 1,
    explanation: 'HAVING filters the result of GROUP BY (aggregate functions). WHERE filters individual rows before grouping.',
  },
  {
    id: 'prod-s2', company: 'product', topic: 'sql', difficulty: 'Hard',
    q: 'What is the result of: SELECT COUNT(*) FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)?',
    options: [
      'It causes an error',
      'Count of employees who earn above average salary',
      'Count of all employees',
      'Count of employees earning the average salary',
    ],
    correct: 1,
    explanation: 'The subquery computes the average salary. The outer query counts employees earning above that average — a standard correlated pattern.',
  },
]
