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

// Compute match score for one project given selected skills (Set of strings)
export function computeMatch(projectId, selectedSkills) {
  const { required, helpful } = projectSkills[projectId] || { required: [], helpful: [] }

  const knownRequired = required.filter(s => selectedSkills.has(s))
  const knownHelpful  = helpful.filter(s => selectedSkills.has(s))
  const missingReq    = required.filter(s => !selectedSkills.has(s))

  // Score: required skills count 80% of weight, helpful 20%
  const reqScore  = required.length  > 0 ? (knownRequired.length / required.length)  * 80 : 80
  const helpScore = helpful.length   > 0 ? (knownHelpful.length  / helpful.length)   * 20 : 20
  const total     = Math.round(reqScore + helpScore)

  return {
    score:        total,
    knownReq:     knownRequired,
    missingReq,
    knownHelpful,
    totalReq:     required.length,
  }
}

export function fitLabel(score) {
  if (score === 100) return { label: 'Perfect Match',    color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', bar: 'bg-emerald-500' }
  if (score >= 75)  return { label: 'Great Fit',         color: 'text-teal-600',    bg: 'bg-teal-50 border-teal-200',      dot: 'bg-teal-500',    bar: 'bg-teal-500' }
  if (score >= 50)  return { label: 'Good Fit',          color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200',    dot: 'bg-amber-400',   bar: 'bg-amber-400' }
  if (score >= 25)  return { label: 'Needs Some Learning',color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200',  dot: 'bg-orange-400',  bar: 'bg-orange-400' }
  return                    { label: 'Challenging',       color: 'text-red-600',     bg: 'bg-red-50 border-red-200',        dot: 'bg-red-400',     bar: 'bg-red-400' }
}
