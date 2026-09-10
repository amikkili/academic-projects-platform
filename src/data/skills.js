// Skill categories shown in the quiz
export const skillCategories = [
  {
    id: 'languages',
    label: 'Programming Languages',
    icon: '💻',
    skills: ['Python', 'Java', 'JavaScript', 'Dart', 'C / C++'],
  },
  {
    id: 'web',
    label: 'Web & Backend',
    icon: '🌐',
    skills: ['React', 'Node.js / Express', 'Spring Boot', 'Flask / FastAPI', 'REST APIs'],
  },
  {
    id: 'database',
    label: 'Databases',
    icon: '🗄️',
    skills: ['MongoDB', 'MySQL / PostgreSQL', 'SQLite'],
  },
  {
    id: 'ml',
    label: 'ML & Data Science',
    icon: '🧠',
    skills: ['TensorFlow / Keras', 'Scikit-learn', 'Pandas / NumPy', 'NLP / NLTK', 'OpenCV'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: '📱',
    skills: ['Flutter / Dart', 'Android Studio'],
  },
  {
    id: 'iot',
    label: 'IoT & Hardware',
    icon: '⚡',
    skills: ['Arduino / C++', 'NodeMCU / ESP8266', 'Sensors & Modules', 'MQTT Protocol'],
  },
  {
    id: 'tools',
    label: 'Tools & Concepts',
    icon: '🔧',
    skills: ['Git / GitHub', 'Linux / Terminal', 'JWT / Auth', 'OOP Concepts'],
  },
]

// Required skills per project (must match skill strings above)
export const projectSkills = {
  'sentiment-analysis': {
    required: ['Python', 'TensorFlow / Keras', 'Pandas / NumPy', 'NLP / NLTK'],
    helpful:  ['Scikit-learn', 'Linux / Terminal'],
  },
  'student-result-portal': {
    required: ['JavaScript', 'React', 'Node.js / Express', 'MongoDB', 'JWT / Auth'],
    helpful:  ['REST APIs', 'MySQL / PostgreSQL'],
  },
  'smart-irrigation': {
    required: ['Arduino / C++', 'NodeMCU / ESP8266', 'MQTT Protocol', 'Sensors & Modules'],
    helpful:  ['Python', 'Flask / FastAPI', 'REST APIs'],
  },
  'house-price-prediction': {
    required: ['Python', 'Scikit-learn', 'Pandas / NumPy'],
    helpful:  ['Linux / Terminal', 'Git / GitHub'],
  },
  'expense-tracker-app': {
    required: ['Flutter / Dart', 'Dart', 'SQLite'],
    helpful:  ['OOP Concepts', 'REST APIs'],
  },
  'network-intrusion-detection': {
    required: ['Python', 'Scikit-learn', 'Pandas / NumPy', 'Linux / Terminal'],
    helpful:  ['Flask / FastAPI', 'REST APIs', 'Git / GitHub'],
  },
  'face-recognition-attendance': {
    required: ['Python', 'OpenCV', 'SQLite', 'Flask / FastAPI'],
    helpful:  ['REST APIs', 'Linux / Terminal'],
  },
  'library-management': {
    required: ['Java', 'Spring Boot', 'MySQL / PostgreSQL', 'OOP Concepts'],
    helpful:  ['React', 'REST APIs', 'JWT / Auth'],
  },
}

// Compute Jaccard-based match score for one project given selected skills (Set of strings).
// Jaccard(user ∩ required) / |required| measures "coverage of what the project needs".
// Helpful skills add a 20-point bonus on top of the 80-point required score.
export function computeMatch(projectId, selectedSkills) {
  const { required, helpful } = projectSkills[projectId] || { required: [], helpful: [] }

  const knownRequired = required.filter(s => selectedSkills.has(s))
  const knownHelpful  = helpful.filter(s => selectedSkills.has(s))
  const missingReq    = required.filter(s => !selectedSkills.has(s))

  // Jaccard coverage: intersection / |required|  (0-100)
  const jaccard = required.length > 0
    ? Math.round((knownRequired.length / required.length) * 100)
    : 100

  // Full score = required coverage (80 pts) + helpful bonus (20 pts)
  const reqScore  = required.length > 0 ? (knownRequired.length / required.length) * 80 : 80
  const helpScore = helpful.length  > 0 ? (knownHelpful.length  / helpful.length)  * 20 : 20
  const score     = Math.round(reqScore + helpScore)

  return {
    score,
    jaccard,
    knownReq:  knownRequired,
    missingReq,
    knownHelpful,
    totalReq:  required.length,
  }
}

// Three-zone system: 🟢 Perfect Fit ≥80%, 🟡 Stretch Project 50-79%, 🔴 Too Advanced <50%
export function fitLabel(score) {
  if (score >= 80) return {
    label:  'Perfect Fit',
    zone:   'perfect',
    emoji:  '🟢',
    color:  'text-emerald-600',
    bg:     'bg-emerald-50 border-emerald-200',
    dot:    'bg-emerald-500',
    bar:    'bg-emerald-500',
    tagBg:  'bg-emerald-100 text-emerald-700 border-emerald-200',
  }
  if (score >= 50) return {
    label:  'Stretch Project',
    zone:   'stretch',
    emoji:  '🟡',
    color:  'text-amber-600',
    bg:     'bg-amber-50 border-amber-200',
    dot:    'bg-amber-400',
    bar:    'bg-amber-400',
    tagBg:  'bg-amber-100 text-amber-700 border-amber-200',
  }
  return {
    label:  'Too Advanced',
    zone:   'advanced',
    emoji:  '🔴',
    color:  'text-red-500',
    bg:     'bg-red-50 border-red-200',
    dot:    'bg-red-400',
    bar:    'bg-red-400',
    tagBg:  'bg-red-100 text-red-600 border-red-200',
  }
}
