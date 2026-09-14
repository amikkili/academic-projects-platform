export const levels = [
  { id: 'all',    label: 'All Levels',  icon: '📚', desc: '' },
  { id: 'school', label: 'School',      icon: '🏫', desc: 'Class 8–12 · Basic programming & web' },
  { id: 'ug',     label: 'UG / B.Tech', icon: '🎓', desc: 'Final year · Core CS & engineering projects' },
  { id: 'pg',     label: 'PG / M.Tech', icon: '🔬', desc: 'Research-grade · Advanced AI & systems' },
]

export const categories = [
  {
    id: 'ml',
    label: 'Machine Learning',
    color: 'bg-cyan-100 text-cyan-700',
    icon: '🤖',
    gradient: 'from-cyan-500 to-blue-600',
    desc: 'Neural networks, NLP, computer vision, and predictive models.',
    longDesc: 'Machine Learning projects teach you to build intelligent systems that learn from data. From sentiment analysis to image recognition, these projects cover supervised learning, deep learning, NLP, and computer vision using Python, TensorFlow, and PyTorch.',
    tools: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'NLP'],
  },
  {
    id: 'web',
    label: 'Web Development',
    color: 'bg-blue-100 text-blue-700',
    icon: '🌐',
    gradient: 'from-blue-500 to-indigo-600',
    desc: 'Full-stack apps with React, Node.js, Django, and REST APIs.',
    longDesc: 'Web Development projects teach you to build modern, full-stack applications. From simple HTML/CSS pages to complex React + FastAPI systems, you\'ll learn frontend, backend, databases, authentication, and deployment — the complete web stack.',
    tools: ['React', 'HTML/CSS/JS', 'Node.js', 'FastAPI', 'SQLite'],
  },
  {
    id: 'data',
    label: 'Data Science',
    color: 'bg-purple-100 text-purple-700',
    icon: '📊',
    gradient: 'from-purple-500 to-violet-600',
    desc: 'Data cleaning, visualization, EDA, and statistical modeling.',
    longDesc: 'Data Science projects teach you to extract insights from raw data. You\'ll master data cleaning with pandas, visualization with matplotlib/seaborn, exploratory data analysis, and statistical modeling — skills critical for any analytics or data engineering role.',
    tools: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
  },
  {
    id: 'iot',
    label: 'IoT & Embedded',
    color: 'bg-green-100 text-green-700',
    icon: '🔌',
    gradient: 'from-green-500 to-emerald-600',
    desc: 'Raspberry Pi, Arduino, sensors, and real-world automation.',
    longDesc: 'IoT projects bridge the physical and digital worlds. You\'ll work with microcontrollers (Arduino, Raspberry Pi), sensors, actuators, and cloud connectivity to build smart systems for agriculture, home automation, and environmental monitoring.',
    tools: ['Raspberry Pi', 'Arduino', 'MQTT', 'Python', 'Sensors'],
  },
  {
    id: 'security',
    label: 'Cybersecurity',
    color: 'bg-red-100 text-red-700',
    icon: '🛡️',
    gradient: 'from-red-500 to-rose-600',
    desc: 'Network security, intrusion detection, encryption, and ethical hacking.',
    longDesc: 'Cybersecurity projects teach you to think like both attacker and defender. Build intrusion detection systems, implement cryptographic algorithms, analyze network traffic, and learn secure coding practices essential for modern software development.',
    tools: ['Python', 'Scapy', 'Wireshark', 'TensorFlow', 'OpenSSL'],
  },
  {
    id: 'mobile',
    label: 'Mobile Apps',
    color: 'bg-orange-100 text-orange-700',
    icon: '📱',
    gradient: 'from-orange-500 to-amber-600',
    desc: 'Cross-platform apps with Flutter, React Native, and Firebase.',
    longDesc: 'Mobile App projects take your skills to Android and iOS platforms. Using Flutter or React Native, you\'ll build cross-platform apps with real device features — camera, GPS, notifications, offline storage — and connect them to Firebase backends.',
    tools: ['Flutter', 'React Native', 'Firebase', 'Dart', 'SQLite'],
  },
]

export const difficultyColors = {
  Beginner:     'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced:     'bg-red-100 text-red-700',
}

export const projects = [
  {
    id: 'sentiment-analysis',
    level: 'ug',
    title: 'Sentiment Analysis using LSTM',
    category: 'ml',
    difficulty: 'Intermediate',
    duration: '3-4 weeks',
    tech: ['Python', 'TensorFlow', 'Keras', 'NLTK', 'Pandas'],
    summary: 'Build a deep learning model that classifies movie reviews as positive or negative using Long Short-Term Memory networks.',
    description: `This project implements a sentiment analysis system using LSTM (Long Short-Term Memory) networks to classify text reviews into positive or negative categories. You will learn text preprocessing, word embeddings, and sequence modeling — core skills for any NLP engineer.

The dataset used is the IMDB movie reviews dataset containing 50,000 labeled reviews. We preprocess the text, convert words to embeddings using Keras Embedding layer, pass them through LSTM layers, and output a binary classification.`,
    steps: [
      'Load and explore the IMDB dataset',
      'Preprocess text (tokenization, padding)',
      'Build LSTM model architecture',
      'Train and evaluate the model',
      'Deploy a simple prediction API',
    ],
    sourceCode: `import tensorflow as tf
from tensorflow.keras.datasets import imdb
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout

# Load dataset
vocab_size = 10000
max_len    = 200
(X_train, y_train), (X_test, y_test) = imdb.load_data(num_words=vocab_size)

# Pad sequences
X_train = pad_sequences(X_train, maxlen=max_len)
X_test  = pad_sequences(X_test,  maxlen=max_len)

# Build LSTM model
model = Sequential([
    Embedding(vocab_size, 128, input_length=max_len),
    LSTM(64, dropout=0.2, recurrent_dropout=0.2),
    Dense(32, activation='relu'),
    Dropout(0.3),
    Dense(1, activation='sigmoid'),
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.summary()

# Train
history = model.fit(
    X_train, y_train,
    epochs=5,
    batch_size=64,
    validation_split=0.2,
)

# Evaluate
loss, acc = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {acc:.4f}")`,
    vivaQA: [
      { q: 'What is LSTM and how does it differ from a simple RNN?', a: 'LSTM (Long Short-Term Memory) is a special type of RNN that uses gates (input, forget, output) to control the flow of information, solving the vanishing gradient problem that standard RNNs suffer from with long sequences.' },
      { q: 'Why do we use word embeddings instead of one-hot encoding?', a: 'Word embeddings represent words as dense low-dimensional vectors that capture semantic relationships (similar words are close in vector space), whereas one-hot encoding is sparse and captures no semantic similarity.' },
      { q: 'What is the purpose of padding sequences?', a: 'Neural networks require fixed-size inputs. Padding ensures all sequences have the same length by appending zeros to shorter sequences.' },
      { q: 'What is the vanishing gradient problem?', a: 'During backpropagation through many time steps, gradients can shrink exponentially to near zero, making it impossible for early layers to learn. LSTM\'s gating mechanism mitigates this.' },
      { q: 'How would you handle class imbalance in sentiment data?', a: 'Use techniques like oversampling (SMOTE), undersampling, class weights in the loss function, or data augmentation to balance the distribution.' },
    ],
  },
  {
    id: 'student-result-portal',
    level: 'ug',
    title: 'Student Result Management Portal',
    category: 'web',
    difficulty: 'Beginner',
    duration: '2-3 weeks',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    summary: 'A full-stack web portal where admins manage student marks and students view their results with grade analytics.',
    description: `This project builds a complete full-stack Student Result Management System. Admins can add students, enter marks for multiple subjects, and generate reports. Students can log in to view their marks, grades, GPA, and rank.

The system uses React for the frontend, Node.js/Express for the REST API, MongoDB for storing data, and JWT for authentication. It demonstrates CRUD operations, role-based access control, and data visualization.`,
    steps: [
      'Set up Node.js/Express REST API',
      'Connect MongoDB with Mongoose',
      'Implement JWT authentication & roles',
      'Build React frontend with protected routes',
      'Add charts for grade analytics',
    ],
    sourceCode: `// backend/routes/results.js
const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const Result  = require('../models/Result');

// Get all results for a student
router.get('/student/:id', auth, async (req, res) => {
  try {
    const results = await Result.find({ student: req.params.id })
      .populate('subject', 'name code credits');

    const gpa = results.reduce((sum, r) => sum + r.gradePoints, 0) / results.length;
    res.json({ results, gpa: gpa.toFixed(2) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: add/update result
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: 'Access denied' });

  const { student, subject, marks, maxMarks } = req.body;
  const percentage  = (marks / maxMarks) * 100;
  const gradePoints = getGradePoints(percentage);
  const grade       = getGrade(percentage);

  const result = new Result({ student, subject, marks, maxMarks, percentage, grade, gradePoints });
  await result.save();
  res.status(201).json(result);
});

function getGrade(pct) {
  if (pct >= 90) return 'O';
  if (pct >= 80) return 'A+';
  if (pct >= 70) return 'A';
  if (pct >= 60) return 'B+';
  if (pct >= 50) return 'B';
  return 'F';
}

function getGradePoints(pct) {
  if (pct >= 90) return 10;
  if (pct >= 80) return 9;
  if (pct >= 70) return 8;
  if (pct >= 60) return 7;
  if (pct >= 50) return 6;
  return 0;
}

module.exports = router;`,
    vivaQA: [
      { q: 'What is JWT and why is it used for authentication?', a: 'JSON Web Token is a compact, URL-safe token that encodes user claims. It\'s stateless — the server doesn\'t store sessions — making it ideal for scalable REST APIs.' },
      { q: 'Explain the difference between authentication and authorization.', a: 'Authentication verifies identity (who you are), while authorization determines permissions (what you can do). JWT handles authentication; role-based middleware handles authorization.' },
      { q: 'What is CORS and why might you encounter it in this project?', a: 'Cross-Origin Resource Sharing is a browser security mechanism. When the React frontend (port 3000) calls the Express API (port 5000), the browser blocks it unless the server sets CORS headers explicitly.' },
      { q: 'What is the difference between SQL and NoSQL databases?', a: 'SQL databases (MySQL, PostgreSQL) use structured tables with fixed schemas and support JOIN operations. NoSQL databases (MongoDB) store flexible documents and scale horizontally more easily.' },
      { q: 'How would you calculate CGPA from individual subject results?', a: 'CGPA = Σ(Grade Points × Credits) / Σ(Credits). Each subject\'s grade points are weighted by its credit hours to produce the cumulative average.' },
    ],
  },
  {
    id: 'smart-irrigation',
    level: 'ug',
    title: 'Smart Irrigation System using IoT',
    category: 'iot',
    difficulty: 'Intermediate',
    duration: '4-5 weeks',
    tech: ['Arduino', 'NodeMCU ESP8266', 'MQTT', 'Python', 'React'],
    summary: 'Automate farm irrigation based on real-time soil moisture and weather data using IoT sensors and a web dashboard.',
    description: `This IoT project automates agricultural irrigation by monitoring soil moisture levels with sensors connected to a NodeMCU ESP8266. The device publishes data via MQTT to a Python backend, which decides whether to trigger the relay (water pump). A React dashboard shows live sensor readings and manual override controls.

The system significantly reduces water waste and improves crop yield by watering only when needed, based on actual soil conditions and weather forecast data.`,
    steps: [
      'Wire soil moisture sensor to NodeMCU',
      'Flash NodeMCU with Arduino firmware',
      'Set up MQTT broker (Mosquitto)',
      'Build Python subscriber to control relay',
      'Create React dashboard for monitoring',
    ],
    sourceCode: `// NodeMCU Firmware (Arduino C++)
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid     = "YOUR_WIFI";
const char* password = "YOUR_PASS";
const char* mqtt_server = "192.168.1.100";

const int MOISTURE_PIN = A0;
const int RELAY_PIN    = D1;

WiFiClient   espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void callback(char* topic, byte* payload, unsigned int len) {
  String msg = "";
  for (int i = 0; i < len; i++) msg += (char)payload[i];
  if (msg == "ON")  digitalWrite(RELAY_PIN, HIGH);
  if (msg == "OFF") digitalWrite(RELAY_PIN, LOW);
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();

  int raw = analogRead(MOISTURE_PIN);
  int pct = map(raw, 1023, 0, 0, 100); // convert to percentage

  char buf[10];
  sprintf(buf, "%d", pct);
  client.publish("farm/moisture", buf);
  delay(5000);
}`,
    vivaQA: [
      { q: 'What is MQTT and why is it preferred for IoT over HTTP?', a: 'MQTT (Message Queuing Telemetry Transport) is a lightweight publish-subscribe protocol designed for constrained devices. It uses far less bandwidth and power than HTTP, making it ideal for IoT sensors on limited hardware.' },
      { q: 'Explain the role of the MQTT broker.', a: 'The broker (e.g., Mosquitto) is the central server that receives messages from publishers and routes them to all subscribers on the same topic. Clients don\'t communicate directly.' },
      { q: 'What is a relay module and how does it work?', a: 'A relay is an electrically operated switch that allows a low-power microcontroller signal to control a high-power device (like a water pump). It uses an electromagnet to open/close the circuit.' },
      { q: 'How does a soil moisture sensor work?', a: 'Resistive sensors measure the electrical resistance between two probes inserted in soil — wet soil conducts better (lower resistance). Capacitive sensors measure dielectric permittivity changes, which is more accurate and doesn\'t corrode.' },
      { q: 'What is the difference between NodeMCU and Arduino Uno?', a: 'NodeMCU (ESP8266-based) has built-in WiFi capability and runs at 80MHz with 4MB flash, whereas Arduino Uno has no wireless support and is slower. NodeMCU is preferred for IoT connectivity.' },
    ],
  },
  {
    id: 'house-price-prediction',
    level: 'ug',
    title: 'House Price Prediction',
    category: 'data',
    difficulty: 'Beginner',
    duration: '1-2 weeks',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
    summary: 'Predict house prices using regression models, feature engineering, and exploratory data analysis on real estate data.',
    description: `A classic data science project that walks you through the complete ML pipeline: loading data, EDA (Exploratory Data Analysis), feature engineering, model training, evaluation, and interpretation.

Using the Boston Housing or California Housing dataset, you'll apply multiple regression algorithms, compare their performance, and use techniques like cross-validation and hyperparameter tuning to build the best model.`,
    steps: [
      'Load and explore dataset (EDA)',
      'Handle missing values and outliers',
      'Feature engineering and selection',
      'Train and compare regression models',
      'Evaluate with RMSE, MAE, R² metrics',
    ],
    sourceCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score

# Load dataset
data = fetch_california_housing(as_frame=True)
df   = data.frame

# EDA
print(df.describe())
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.show()

# Prepare features
X = df.drop('MedHouseVal', axis=1)
y = df['MedHouseVal']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler  = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)

# Compare models
models = {
    'Linear Regression': LinearRegression(),
    'Ridge':             Ridge(alpha=1.0),
    'Random Forest':     RandomForestRegressor(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingRegressor(n_estimators=200, random_state=42),
}

results = {}
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    rmse   = np.sqrt(mean_squared_error(y_test, y_pred))
    r2     = r2_score(y_test, y_pred)
    results[name] = {'RMSE': rmse, 'R²': r2}
    print(f"{name:25s} RMSE={rmse:.4f}  R²={r2:.4f}")

# Best model
best = max(results, key=lambda k: results[k]['R²'])
print(f"\\nBest model: {best}")`,
    vivaQA: [
      { q: 'What is the difference between R² and RMSE for model evaluation?', a: 'R² (coefficient of determination) measures the proportion of variance explained by the model (0–1, higher is better). RMSE measures the average prediction error in the same units as the target variable (lower is better).' },
      { q: 'Why do we scale features before training?', a: 'Many algorithms (Linear Regression, Ridge, SVR) are sensitive to feature scale. Without scaling, a feature with large values dominates the gradient updates. StandardScaler normalizes each feature to zero mean and unit variance.' },
      { q: 'What is the difference between Ridge and Lasso regression?', a: 'Ridge (L2 regularization) shrinks coefficients but keeps all features. Lasso (L1 regularization) can drive some coefficients to exactly zero, effectively performing feature selection.' },
      { q: 'What is overfitting and how do you detect it?', a: 'Overfitting occurs when a model performs well on training data but poorly on unseen test data. Detect it by comparing train vs. test scores — a large gap indicates overfitting.' },
      { q: 'Explain cross-validation and why it is used.', a: 'Cross-validation splits data into k folds, trains on k-1 folds, tests on 1 fold, rotating k times. It gives a more reliable performance estimate than a single train/test split and detects overfitting.' },
    ],
  },
  {
    id: 'expense-tracker-app',
    level: 'ug',
    title: 'Personal Expense Tracker App',
    category: 'mobile',
    difficulty: 'Beginner',
    duration: '2-3 weeks',
    tech: ['Flutter', 'Dart', 'SQLite', 'Provider', 'Charts Flutter'],
    summary: 'A cross-platform mobile app to track daily income and expenses with categories, charts, and budget alerts.',
    description: `Build a fully functional cross-platform expense tracker app using Flutter and Dart. Users can add income/expense transactions with categories, view spending analytics through charts, and set monthly budget limits with notifications.

The app uses SQLite for local persistence, Provider for state management, and Flutter's fl_chart library for beautiful pie and bar charts. It runs natively on both Android and iOS.`,
    steps: [
      'Set up Flutter project and packages',
      'Design database schema with SQLite',
      'Implement CRUD for transactions',
      'Add state management with Provider',
      'Build charts and dashboard screen',
    ],
    sourceCode: `// lib/models/transaction.dart
class Transaction {
  final int?   id;
  final String title;
  final double amount;
  final String category;
  final String type; // 'income' or 'expense'
  final DateTime date;

  Transaction({
    this.id,
    required this.title,
    required this.amount,
    required this.category,
    required this.type,
    required this.date,
  });

  Map<String, dynamic> toMap() => {
    'id':       id,
    'title':    title,
    'amount':   amount,
    'category': category,
    'type':     type,
    'date':     date.toIso8601String(),
  };

  factory Transaction.fromMap(Map<String, dynamic> m) => Transaction(
    id:       m['id'],
    title:    m['title'],
    amount:   m['amount'],
    category: m['category'],
    type:     m['type'],
    date:     DateTime.parse(m['date']),
  );
}

// lib/providers/transaction_provider.dart
import 'package:flutter/material.dart';
import '../database/db_helper.dart';
import '../models/transaction.dart';

class TransactionProvider with ChangeNotifier {
  List<Transaction> _transactions = [];

  List<Transaction> get transactions => _transactions;

  double get totalIncome  => _transactions
      .where((t) => t.type == 'income').fold(0, (s, t) => s + t.amount);

  double get totalExpense => _transactions
      .where((t) => t.type == 'expense').fold(0, (s, t) => s + t.amount);

  double get balance => totalIncome - totalExpense;

  Future<void> loadTransactions() async {
    _transactions = await DBHelper.instance.getAllTransactions();
    notifyListeners();
  }

  Future<void> addTransaction(Transaction t) async {
    await DBHelper.instance.insertTransaction(t);
    await loadTransactions();
  }

  Future<void> deleteTransaction(int id) async {
    await DBHelper.instance.deleteTransaction(id);
    await loadTransactions();
  }
}`,
    vivaQA: [
      { q: 'What is Flutter and what are its key advantages?', a: 'Flutter is Google\'s open-source UI toolkit for building natively compiled applications from a single codebase for mobile, web, and desktop. Key advantages: hot reload, rich widget library, native performance via Dart AOT compilation.' },
      { q: 'What is the difference between StatefulWidget and StatelessWidget?', a: 'StatelessWidget is immutable — it rebuilds only when its parent changes. StatefulWidget maintains internal state that can change over time using setState(), triggering a rebuild of the widget tree.' },
      { q: 'What is the Provider package and why is it used?', a: 'Provider is a state management solution for Flutter that uses InheritedWidget under the hood. It allows you to share state across the widget tree without passing data manually through constructors.' },
      { q: 'What is SQLite and when would you use it over a cloud database?', a: 'SQLite is a lightweight embedded relational database stored as a single file. It\'s ideal for local offline-first apps where data doesn\'t need to sync across devices, reducing latency and network dependency.' },
      { q: 'How would you implement budget alerts/notifications in Flutter?', a: 'Use the flutter_local_notifications package to schedule or trigger notifications. When the user\'s expense in a category exceeds the set budget threshold, fire a local notification with the alert message.' },
    ],
  },
  {
    id: 'network-intrusion-detection',
    level: 'ug',
    title: 'Network Intrusion Detection System',
    category: 'security',
    difficulty: 'Advanced',
    duration: '5-6 weeks',
    tech: ['Python', 'Scikit-learn', 'Scapy', 'XGBoost', 'FastAPI'],
    summary: 'Build an ML-based system that analyzes network traffic and detects anomalies, DoS attacks, and port scans in real time.',
    description: `This advanced project combines cybersecurity knowledge with machine learning to build a Network Intrusion Detection System (NIDS). Using the NSL-KDD or CICIDS dataset, you'll train classifiers to detect various attack types including DoS, Probe, R2L, and U2R attacks.

The system uses Scapy to capture live network packets, extracts features, and runs them through a trained XGBoost classifier in real time, with results displayed on a FastAPI-powered dashboard.`,
    steps: [
      'Explore and preprocess NSL-KDD dataset',
      'Train multi-class classification models',
      'Build real-time packet sniffer with Scapy',
      'Feature extraction from captured packets',
      'Deploy detection API with FastAPI',
    ],
    sourceCode: `import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix

# Load NSL-KDD dataset
cols = ['duration','protocol_type','service','flag','src_bytes','dst_bytes',
        'land','wrong_fragment','urgent','hot','num_failed_logins','logged_in',
        'num_compromised','root_shell','su_attempted','num_root','num_file_creations',
        'num_shells','num_access_files','num_outbound_cmds','is_host_login',
        'is_guest_login','count','srv_count','serror_rate','srv_serror_rate',
        'rerror_rate','srv_rerror_rate','same_srv_rate','diff_srv_rate',
        'srv_diff_host_rate','dst_host_count','dst_host_srv_count',
        'dst_host_same_srv_rate','dst_host_diff_srv_rate',
        'dst_host_same_src_port_rate','dst_host_srv_diff_host_rate',
        'dst_host_serror_rate','dst_host_srv_serror_rate',
        'dst_host_rerror_rate','dst_host_srv_rerror_rate','label','difficulty']

df = pd.read_csv('KDDTrain+.txt', names=cols)

# Encode categorical features
le = LabelEncoder()
for col in ['protocol_type', 'service', 'flag']:
    df[col] = le.fit_transform(df[col])

# Binary classification: normal vs attack
df['label'] = df['label'].apply(lambda x: 0 if x == 'normal' else 1)

X = df.drop(['label', 'difficulty'], axis=1)
y = df['label']

scaler  = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train XGBoost
xgb = XGBClassifier(n_estimators=200, max_depth=6, learning_rate=0.1, random_state=42)
xgb.fit(X_train, y_train)

y_pred = xgb.predict(X_test)
print(classification_report(y_test, y_pred, target_names=['Normal', 'Attack']))`,
    vivaQA: [
      { q: 'What is the difference between IDS and IPS?', a: 'Intrusion Detection System (IDS) monitors traffic and generates alerts but takes no action. Intrusion Prevention System (IPS) can actively block or drop suspicious traffic in real time.' },
      { q: 'What is the NSL-KDD dataset and what attack types does it contain?', a: 'NSL-KDD is a refined version of the KDD Cup 1999 dataset for intrusion detection research. It contains 4 attack categories: DoS (Denial of Service), Probe (reconnaissance), R2L (Remote to Local), and U2R (User to Root privilege escalation).' },
      { q: 'What is XGBoost and why does it perform well on tabular data?', a: 'XGBoost is a gradient boosting ensemble that builds trees sequentially, each correcting the previous one\'s errors. It handles mixed feature types well, includes built-in regularization, and is highly optimized for speed.' },
      { q: 'What is the false positive rate and why does it matter for NIDS?', a: 'False positive rate is the fraction of legitimate traffic flagged as attacks. A high false positive rate in NIDS causes alert fatigue, overwhelming security analysts with noise and causing them to ignore real threats.' },
      { q: 'What is Scapy and what can you do with it?', a: 'Scapy is a powerful Python library for network packet manipulation. You can craft, send, sniff, and analyze packets at any protocol layer — useful for network testing, traffic analysis, and building custom network tools.' },
    ],
  },
  {
    id: 'face-recognition-attendance',
    level: 'ug',
    title: 'Face Recognition Attendance System',
    category: 'ml',
    difficulty: 'Advanced',
    duration: '4-5 weeks',
    tech: ['Python', 'OpenCV', 'face_recognition', 'Flask', 'SQLite'],
    summary: 'Automate classroom attendance by detecting and recognizing student faces via webcam using the dlib face recognition library.',
    description: `This project automates attendance marking using facial recognition. A webcam stream is processed by OpenCV, faces are detected and encoded using the face_recognition library (built on dlib), and recognized students are automatically marked present in a SQLite database.

A Flask web interface displays real-time attendance records and allows administrators to register new students by uploading photos. The system achieves >95% accuracy under controlled lighting.`,
    steps: [
      'Collect and preprocess face images',
      'Generate 128-d face encodings with dlib',
      'Build real-time recognition with OpenCV',
      'Store attendance records in SQLite',
      'Create Flask admin dashboard',
    ],
    sourceCode: `import cv2
import face_recognition
import numpy as np
import sqlite3
from datetime import datetime

# Load known faces from database
def load_known_faces(db_path='attendance.db'):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name, encoding FROM students")
    rows = cursor.fetchall()
    conn.close()

    names     = [r[0] for r in rows]
    encodings = [np.frombuffer(r[1], dtype=np.float64) for r in rows]
    return names, encodings

def mark_attendance(name, db_path='attendance.db'):
    conn   = sqlite3.connect(db_path)
    cursor = conn.cursor()
    today  = datetime.now().strftime('%Y-%m-%d')
    now    = datetime.now().strftime('%H:%M:%S')

    # Prevent duplicate entries
    cursor.execute(
        "SELECT id FROM attendance WHERE name=? AND date=?", (name, today)
    )
    if not cursor.fetchone():
        cursor.execute(
            "INSERT INTO attendance (name, date, time) VALUES (?, ?, ?)",
            (name, today, now)
        )
        conn.commit()
        print(f"[MARKED] {name} at {now}")
    conn.close()

# Real-time recognition
known_names, known_encodings = load_known_faces()

cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    if not ret: break

    small = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb   = cv2.cvtColor(small, cv2.COLOR_BGR2RGB)

    face_locs  = face_recognition.face_locations(rgb)
    face_encs  = face_recognition.face_encodings(rgb, face_locs)

    for enc, loc in zip(face_encs, face_locs):
        matches   = face_recognition.compare_faces(known_encodings, enc, tolerance=0.5)
        distances = face_recognition.face_distance(known_encodings, enc)
        best      = np.argmin(distances)
        name      = known_names[best] if matches[best] else "Unknown"

        mark_attendance(name)

        top, right, bottom, left = [v * 4 for v in loc]
        color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)
        cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
        cv2.putText(frame, name, (left, top - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

    cv2.imshow('Attendance System', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break

cap.release()
cv2.destroyAllWindows()`,
    vivaQA: [
      { q: 'How does the face_recognition library encode a face?', a: 'It uses a deep neural network (ResNet, trained by dlib) to project a face image into a 128-dimensional embedding vector. Faces of the same person produce similar vectors; different people produce distant ones.' },
      { q: 'What is the Euclidean distance threshold and why does it matter?', a: 'The tolerance (typically 0.6) is the Euclidean distance threshold between two face encodings. A distance below the threshold is considered a match. Lower tolerance = more strict = fewer false positives but more false negatives.' },
      { q: 'What are the limitations of face recognition in real-world conditions?', a: 'Performance degrades with: poor lighting, extreme angles (occlusion), low camera resolution, twins, identical uniforms, face masks, and spoofing attacks (using photos). Liveness detection and multi-factor auth address some of these.' },
      { q: 'What is OpenCV and what does it do in this project?', a: 'OpenCV (Open Source Computer Vision Library) provides tools for capturing video streams, resizing frames, drawing rectangles/text on frames, and color-space conversion (BGR to RGB). It handles the real-time video pipeline.' },
      { q: 'How would you prevent someone from spoofing the system with a photograph?', a: 'Implement liveness detection: check for eye blinking (using facial landmark tracking), ask the user to perform a random action (head turn), or use 3D depth sensors (IR cameras like those in Face ID). Challenge-response methods are effective.' },
    ],
  },
  {
    id: 'library-management',
    level: 'ug',
    title: 'Library Management System',
    category: 'web',
    difficulty: 'Beginner',
    duration: '2-3 weeks',
    tech: ['Java', 'Spring Boot', 'MySQL', 'React', 'Thymeleaf'],
    summary: 'A full-featured library management system with book catalog, member management, issue/return tracking, and fine calculation.',
    description: `A comprehensive Library Management System built with Spring Boot and React. Librarians can manage book inventory, register members, issue and return books, and the system automatically calculates fines for overdue returns.

The project demonstrates OOP principles in Java, JPA/Hibernate for database operations, REST API design, and a clean React frontend with role-based views for librarians and members.`,
    steps: [
      'Design database schema (ERD)',
      'Build Spring Boot entities and repositories',
      'Implement service layer with business logic',
      'Create REST API controllers',
      'Build React frontend with Axios',
    ],
    sourceCode: `// BookIssuanceService.java
@Service
@Transactional
public class BookIssuanceService {

    @Autowired private IssuanceRepository issuanceRepo;
    @Autowired private BookRepository     bookRepo;
    @Autowired private MemberRepository   memberRepo;

    private static final int MAX_ISSUE_DAYS  = 14;
    private static final double FINE_PER_DAY = 2.0;

    public Issuance issueBook(Long bookId, Long memberId) {
        Book   book   = bookRepo.findById(bookId)
            .orElseThrow(() -> new RuntimeException("Book not found"));
        Member member = memberRepo.findById(memberId)
            .orElseThrow(() -> new RuntimeException("Member not found"));

        if (book.getAvailableCopies() <= 0)
            throw new RuntimeException("No copies available");
        if (member.getActiveIssuances() >= 3)
            throw new RuntimeException("Member has reached issuance limit");

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepo.save(book);

        Issuance issuance = new Issuance();
        issuance.setBook(book);
        issuance.setMember(member);
        issuance.setIssueDate(LocalDate.now());
        issuance.setDueDate(LocalDate.now().plusDays(MAX_ISSUE_DAYS));
        issuance.setStatus("ISSUED");
        return issuanceRepo.save(issuance);
    }

    public ReturnResult returnBook(Long issuanceId) {
        Issuance issuance = issuanceRepo.findById(issuanceId)
            .orElseThrow(() -> new RuntimeException("Issuance not found"));

        LocalDate today     = LocalDate.now();
        LocalDate dueDate   = issuance.getDueDate();
        double    fine      = 0;

        if (today.isAfter(dueDate)) {
            long overdueDays = ChronoUnit.DAYS.between(dueDate, today);
            fine = overdueDays * FINE_PER_DAY;
        }

        issuance.setReturnDate(today);
        issuance.setFine(fine);
        issuance.setStatus("RETURNED");
        issuanceRepo.save(issuance);

        Book book = issuance.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepo.save(book);

        return new ReturnResult(issuance, fine);
    }
}`,
    vivaQA: [
      { q: 'What is Spring Boot and how does it differ from the Spring Framework?', a: 'Spring Boot is an opinionated wrapper around the Spring Framework that provides auto-configuration, embedded servers (Tomcat), and starter dependencies, eliminating most boilerplate XML configuration.' },
      { q: 'What is JPA and what is the difference between JPA and Hibernate?', a: 'JPA (Java Persistence API) is a specification for ORM in Java. Hibernate is the most popular implementation of JPA. JPA defines the interface; Hibernate provides the actual SQL generation, caching, and connection pooling.' },
      { q: 'What is the @Transactional annotation and why is it important?', a: '@Transactional wraps a method in a database transaction. If any exception occurs, all changes are rolled back atomically, ensuring data consistency (e.g., book copies don\'t get decremented without an issuance record being created).' },
      { q: 'Explain the N+1 query problem in ORM.', a: 'When loading a list of N entities and lazily fetching a related entity for each, it produces 1 query for the list + N queries for the related entities. Fix with JOIN FETCH or @EntityGraph to load associations in one query.' },
      { q: 'What is the difference between @OneToMany and @ManyToOne?', a: '@OneToMany defines the "one" side of a one-to-many relationship (e.g., one Member has many Issuances). @ManyToOne is placed on the "many" side (each Issuance has one Member). The foreign key lives on the @ManyToOne side.' },
    ],
  },

  {
    id: 'attendance-tracker',
    level: 'ug',
    title: 'Student Attendance Management System',
    category: 'web',
    difficulty: 'Beginner',
    duration: '2-3 weeks',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    summary: 'A web-based attendance tracker where teachers manage students and lectures, mark attendance per session, and view per-student attendance reports with low-attendance alerts.',
    description: `This project builds a complete classroom attendance management system. Teachers can add students (with class and roll number), create lecture sessions with subject/topic/time, and mark each student as Present, Absent, or Late for every lecture.

The dashboard displays live statistics — total students, lectures today, present/absent/late counts — and flags students with attendance below 75% with a warning panel. The Reports page shows each student's running attendance percentage with a colour-coded progress bar. All data is persisted in MongoDB via a Node.js/Express REST API, with JWT-protected routes.`,
    steps: [
      'Design MongoDB schemas: Student, Lecture, AttendanceRecord',
      'Build REST API: CRUD for students, lectures, and attendance marking',
      'Implement JWT auth with teacher login',
      'Build React dashboard with stat tiles and low-attendance warnings',
      'Create Students and Lectures management pages (add, edit, delete)',
      'Build Reports page with per-student attendance % and progress bars',
    ],
    screenshots: [
      { url: '/previews/attendance-tracker/01_dashboard.png', label: 'Dashboard — live stats, warnings & recent lectures' },
      { url: '/previews/attendance-tracker/02_students.png',  label: 'Students — add, edit, delete with class filter' },
      { url: '/previews/attendance-tracker/03_lectures.png',  label: 'Lectures — session list with P/A/L counts' },
      { url: '/previews/attendance-tracker/04_reports.png',   label: 'Reports — per-student attendance % with progress bars' },
    ],
    sourceCode: `// models/AttendanceRecord.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  status:  { type: String, enum: ['present','absent','late'], required: true },
}, { timestamps: true });

AttendanceSchema.index({ lecture: 1, student: 1 }, { unique: true });
module.exports = mongoose.model('AttendanceRecord', AttendanceSchema);

// routes/reports.js — Attendance percentage per student
router.get('/summary', auth, async (req, res) => {
  const students = await Student.find().sort('name');
  const lectures  = await Lecture.countDocuments();

  const report = await Promise.all(students.map(async (s) => {
    const present = await AttendanceRecord.countDocuments({
      student: s._id,
      status:  { $in: ['present', 'late'] },
    });
    return {
      student:     s,
      present,
      absent:      lectures - present,
      percentage:  lectures ? Math.round((present / lectures) * 100) : 0,
    };
  }));

  res.json(report);
});

// routes/attendance.js — Mark bulk attendance for a lecture
router.post('/mark', auth, async (req, res) => {
  const { lectureId, records } = req.body;
  // records = [{ studentId, status }]

  const ops = records.map(r => ({
    updateOne: {
      filter: { lecture: lectureId, student: r.studentId },
      update: { $set: { status: r.status } },
      upsert: true,
    },
  }));

  await AttendanceRecord.bulkWrite(ops);
  res.json({ marked: records.length });
});`,
    vivaQA: [
      { q: 'What is the purpose of the unique compound index on lecture + student?', a: 'It ensures each student can only have one attendance record per lecture — preventing duplicate entries when the teacher accidentally marks the same student twice. The upsert in bulkWrite then safely updates the existing record instead of throwing an error.' },
      { q: 'What does bulkWrite() do and why is it better than looping insert?', a: 'bulkWrite() sends all write operations to MongoDB in a single network round-trip instead of one request per student. For a class of 60 students it reduces 60 database round-trips to 1, significantly reducing latency when marking attendance for a full class.' },
      { q: 'How would you implement the 75% low-attendance alert?', a: 'In the summary API, compute percentage = (present / totalLectures) * 100 for each student. On the frontend, filter students where percentage < 75 and render them in a highlighted warning table. This threshold could be made configurable per institution.' },
      { q: 'What is the difference between present and late in attendance?', a: 'Both present and late are counted as attendance (student was physically in class). Late is a separate status to flag habitual tardiness. The attendance percentage formula counts both: present + late / total lectures. A separate report can show late frequency as a discipline metric.' },
      { q: 'How would you export attendance reports to Excel?', a: 'Use the exceljs or xlsx npm package on the backend: create a workbook, add a worksheet, write column headers and student rows (name, class, present, absent, percentage), then send the file as a Buffer with Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.' },
    ],
  },

  {
    id: 'shopzone-ecommerce',
    level: 'ug',
    title: 'ShopZone — E-Commerce Web Application',
    category: 'web',
    difficulty: 'Intermediate',
    duration: '4-5 weeks',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Razorpay'],
    summary: 'A full-featured e-commerce platform with a product shop, shopping cart, order management, and an admin panel to manage inventory — built with the MERN stack.',
    description: `ShopZone is a complete e-commerce web application built on the MERN stack (MongoDB, Express, React, Node.js). Customers can browse products by category, search by name, add items to a cart, and place orders with payment integration via Razorpay.

The admin panel allows the store owner to add/edit/delete products with images, view all orders (filterable by status), update order status (Pending → Shipped → Delivered), and monitor store metrics. JWT authentication handles both customer and admin roles with role-based route protection.`,
    steps: [
      'Design MongoDB schemas: Product, User, Cart, Order',
      'Build REST API: auth, products CRUD, cart, order placement',
      'Create Shop page with search, category filter, and product cards',
      'Implement Cart: add/remove items, quantity update, price totals',
      'Integrate Razorpay for payment and create order on success',
      'Build Admin panel: product management + order status tracking',
    ],
    screenshots: [
      { url: '/previews/shopzone/01_shop.png',   label: 'Shop — browse products with search and category filter' },
      { url: '/previews/shopzone/02_cart.png',   label: 'Cart — manage items and proceed to checkout' },
      { url: '/previews/shopzone/03_orders.png', label: 'Orders — track all orders with status and actions' },
    ],
    sourceCode: `// models/Order.js
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name:     String,
  price:    Number,
  qty:      Number,
  image:    String,
});

const OrderSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:     [OrderItemSchema],
  total:     { type: Number, required: true },
  status:    { type: String, enum: ['pending','processing','shipped','delivered','cancelled'], default: 'pending' },
  paymentId: { type: String },
  address:   { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);

// routes/cart.js
router.post('/add', auth, async (req, res) => {
  const { productId, qty = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (product.stock < qty) return res.status(400).json({ error: 'Insufficient stock' });

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = new Cart({ user: req.user.id, items: [] });

  const existing = cart.items.find(i => i.product.toString() === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.items.push({ product: productId, name: product.name, price: product.price, qty, image: product.image });
  }
  await cart.save();
  res.json(cart);
});

// routes/orders.js — Place order + Razorpay
router.post('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart || !cart.items.length) return res.status(400).json({ error: 'Cart is empty' });

  const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const razorpayOrder = await razorpay.orders.create({
    amount:   Math.round(total * 100),
    currency: 'INR',
    receipt:  \`order_\${Date.now()}\`,
  });

  const order = await Order.create({
    user:      req.user.id,
    items:     cart.items,
    total,
    paymentId: razorpayOrder.id,
    address:   req.body.address,
  });

  await Cart.deleteOne({ user: req.user.id });
  res.json({ order, razorpayOrder });
});`,
    vivaQA: [
      { q: 'What is the MERN stack and what does each letter stand for?', a: 'MERN is MongoDB (NoSQL database), Express (Node.js web framework), React (frontend UI library), Node.js (JavaScript runtime). It allows full-stack development entirely in JavaScript, sharing types/logic between frontend and backend.' },
      { q: 'How does cart management work — should it be stored in the database or browser?', a: 'Storing the cart in MongoDB (linked to user ID) persists it across devices and sessions — the user can add items on mobile and checkout on a laptop. Browser localStorage-only carts are lost when the user logs out or switches devices. A hybrid approach stores in DB for logged-in users and localStorage for guests, merging on login.' },
      { q: 'What is Razorpay and how does its payment verification work?', a: 'Razorpay is an Indian payment gateway. Flow: (1) Backend creates a Razorpay order with amount. (2) Frontend opens Razorpay checkout modal. (3) On success, Razorpay returns payment_id, order_id, signature. (4) Backend verifies the signature using HMAC-SHA256 to confirm the payment is genuine before marking the order as paid.' },
      { q: 'How do you handle stock management when multiple users buy the same product simultaneously?', a: 'Use MongoDB\'s atomic $inc operator with a condition: Product.findOneAndUpdate({ _id: id, stock: { $gte: qty } }, { $inc: { stock: -qty } }). The condition ensures stock doesn\'t go negative. If no document is returned, the stock was insufficient and the purchase fails — preventing overselling without locks.' },
      { q: 'What is the difference between authentication and role-based authorization in this project?', a: 'Authentication confirms who you are (JWT validates the token on every request). Authorization determines what you can do — customers can place orders and view their own orders, but only users with role: "admin" can access product management and see all orders. Middleware checks req.user.role before allowing access to admin routes.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SCHOOL PROJECTS (Class 8–12)
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'simple-calculator',
    level: 'school',
    title: 'Simple Calculator (Python)',
    category: 'web',
    difficulty: 'Beginner',
    duration: '1 week',
    tech: ['Python', 'Tkinter'],
    summary: 'Build a fully functional GUI calculator with addition, subtraction, multiplication, and division using Python Tkinter.',
    description: `This is a great first project for beginners. You will build a graphical calculator using Python's built-in Tkinter library — no extra installations needed.

The project teaches you how to design a grid-based GUI layout, handle button click events, evaluate arithmetic expressions safely, and manage basic error handling (e.g., division by zero).`,
    steps: [
      'Install Python and understand the Tkinter module',
      'Design the calculator layout with buttons in a grid',
      'Link each button to an event handler function',
      'Parse and evaluate the expression on "=" click',
      'Handle errors like division by zero gracefully',
    ],
    sourceCode: `import tkinter as tk

class Calculator:
    def __init__(self, root):
        self.expression = ""
        self.display_var = tk.StringVar(value="0")

        display = tk.Entry(root, textvariable=self.display_var,
                           font=("Arial", 24), justify="right",
                           bd=10, relief="sunken", bg="#222", fg="white")
        display.grid(row=0, column=0, columnspan=4, sticky="nsew", padx=5, pady=5)

        buttons = [
            ("7","8","9","/"),
            ("4","5","6","*"),
            ("1","2","3","-"),
            ("C","0","=","+"),
        ]
        for r, row in enumerate(buttons, 1):
            for c, label in enumerate(row):
                tk.Button(root, text=label, font=("Arial", 18),
                          command=lambda l=label: self.click(l),
                          bg="#333", fg="white", activebackground="#555",
                          relief="raised", bd=3
                ).grid(row=r, column=c, sticky="nsew", padx=2, pady=2)

        for i in range(5):
            root.rowconfigure(i, weight=1)
        for i in range(4):
            root.columnconfigure(i, weight=1)

    def click(self, label):
        if label == "C":
            self.expression = ""
            self.display_var.set("0")
        elif label == "=":
            try:
                result = eval(self.expression)
                self.display_var.set(result)
                self.expression = str(result)
            except ZeroDivisionError:
                self.display_var.set("Error")
                self.expression = ""
        else:
            self.expression += label
            self.display_var.set(self.expression)

root = tk.Tk()
root.title("Calculator")
root.geometry("320x420")
root.configure(bg="#111")
Calculator(root)
root.mainloop()`,
    vivaQA: [
      { q: 'What is Tkinter?', a: 'Tkinter is Python\'s standard GUI (Graphical User Interface) library. It comes bundled with Python and provides tools to build windows, buttons, labels, and other UI elements without any extra installation.' },
      { q: 'Why do we use eval() and what is the risk?', a: 'eval() parses and executes a Python expression from a string, making it easy to compute arithmetic. The risk is code injection — if user input is not sanitized, malicious expressions could execute harmful code. For a personal calculator it is acceptable; in production use a safe parser.' },
      { q: 'What is the grid layout manager in Tkinter?', a: 'Grid is a geometry manager that places widgets in rows and columns like a table. It gives precise control over widget placement, making it ideal for calculator-style layouts.' },
      { q: 'What is an event-driven program?', a: 'An event-driven program waits for user events (clicks, key presses) and executes the corresponding callback function. GUIs are inherently event-driven — the mainloop() method keeps the window open and listens for events.' },
      { q: 'How would you extend this project?', a: 'Add keyboard input support, scientific functions (sin, cos, sqrt), a calculation history panel, or convert it to a web app using Flask + JavaScript.' },
    ],
  },

  {
    id: 'student-grade-calculator',
    level: 'school',
    title: 'Student Grade Calculator',
    category: 'data',
    difficulty: 'Beginner',
    duration: '1 week',
    tech: ['Python'],
    summary: 'A Python program that takes marks in multiple subjects, calculates total, average, percentage, and assigns a grade automatically.',
    description: `This project is perfect for absolute beginners. You will write a Python program that accepts student marks across multiple subjects, computes the total, average, and percentage, and assigns a letter grade (A, B, C, D, F) based on predefined rules.

You will practice taking user input, performing arithmetic, using conditional statements, and formatting output — the four pillars of any programming beginner.`,
    steps: [
      'Accept number of subjects and subject names as input',
      'Take marks for each subject from the user',
      'Calculate total, average, and percentage',
      'Implement grade logic using if-elif-else',
      'Display a formatted result report',
    ],
    sourceCode: `def get_grade(pct):
    if pct >= 90: return 'A+'
    elif pct >= 80: return 'A'
    elif pct >= 70: return 'B'
    elif pct >= 60: return 'C'
    elif pct >= 50: return 'D'
    else: return 'F'

def calculate_result():
    print("=== Student Grade Calculator ===")
    name = input("Enter student name: ")
    n = int(input("Number of subjects: "))

    marks = []
    subjects = []
    for i in range(n):
        sub = input(f"Subject {i+1} name: ")
        mark = float(input(f"Marks for {sub} (out of 100): "))
        subjects.append(sub)
        marks.append(mark)

    total = sum(marks)
    average = total / n
    percentage = (total / (n * 100)) * 100
    grade = get_grade(percentage)

    print("\\n" + "="*40)
    print(f"  Result Card — {name}")
    print("="*40)
    for sub, mark in zip(subjects, marks):
        print(f"  {sub:<20} {mark:>6.1f}")
    print("-"*40)
    print(f"  Total        : {total:.1f} / {n*100}")
    print(f"  Average      : {average:.2f}")
    print(f"  Percentage   : {percentage:.2f}%")
    print(f"  Grade        : {grade}")
    print("="*40)

calculate_result()`,
    vivaQA: [
      { q: 'What is the difference between int() and float() in Python?', a: 'int() converts a value to an integer (whole number, e.g., 5), while float() converts to a decimal number (e.g., 5.0). For marks, we use float() to allow decimal scores.' },
      { q: 'What is the purpose of if-elif-else?', a: 'It creates a chain of mutually exclusive conditions. Python checks each condition top to bottom and executes the first block whose condition is True, skipping all others.' },
      { q: 'What is the difference between / and // in Python?', a: '/ performs true division and always returns a float (e.g., 7/2 = 3.5). // performs floor division and returns an integer (e.g., 7//2 = 3).' },
      { q: 'How would you store the results to a file?', a: 'Use Python\'s open() function with mode "w" to write the result to a .txt file: open("result.txt", "w").write(output_string).' },
      { q: 'What is a function and why should we use them?', a: 'A function is a reusable block of code that performs a specific task. Functions improve readability, avoid repetition (DRY principle), and make large programs easier to manage.' },
    ],
  },

  {
    id: 'todo-list-app',
    level: 'school',
    title: 'To-Do List Web App',
    category: 'web',
    difficulty: 'Beginner',
    duration: '1 week',
    tech: ['HTML', 'CSS', 'JavaScript'],
    summary: 'A browser-based To-Do list where you can add, complete, and delete tasks — built with pure HTML, CSS, and JavaScript.',
    description: `This project introduces you to the three building blocks of the web: HTML for structure, CSS for styling, and JavaScript for interactivity. No frameworks, no server — just a single HTML file that runs in any browser.

You will learn how to manipulate the DOM (Document Object Model), handle events, use localStorage to persist tasks across page reloads, and style a clean modern UI.`,
    steps: [
      'Create the HTML structure (input box + task list)',
      'Style the page with CSS (dark theme, rounded cards)',
      'Write JavaScript to add tasks on button click or Enter key',
      'Add "complete" toggle and "delete" functionality',
      'Persist tasks using localStorage',
    ],
    sourceCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>To-Do List</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #1a1a2e; color: #eee; min-height: 100vh; display: flex; justify-content: center; padding: 40px 16px; }
    .container { width: 100%; max-width: 480px; }
    h1 { font-size: 2rem; margin-bottom: 24px; color: #e94560; text-align: center; }
    .input-row { display: flex; gap: 8px; margin-bottom: 20px; }
    input { flex: 1; padding: 12px 16px; border-radius: 8px; border: none; background: #16213e; color: #eee; font-size: 15px; outline: 2px solid transparent; }
    input:focus { outline-color: #e94560; }
    button.add { padding: 12px 20px; background: #e94560; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
    .task { display: flex; align-items: center; gap: 10px; background: #16213e; border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; }
    .task span { flex: 1; font-size: 15px; }
    .task.done span { text-decoration: line-through; color: #666; }
    .task button { background: none; border: none; cursor: pointer; font-size: 18px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📝 My Tasks</h1>
    <div class="input-row">
      <input id="taskInput" placeholder="Add a new task..." />
      <button class="add" onclick="addTask()">Add</button>
    </div>
    <div id="taskList"></div>
  </div>
  <script>
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    function save() { localStorage.setItem('tasks', JSON.stringify(tasks)); }

    function render() {
      const list = document.getElementById('taskList');
      list.innerHTML = tasks.map((t, i) => \`
        <div class="task \${t.done ? 'done' : ''}">
          <span onclick="toggle(\${i})" style="cursor:pointer">\${t.text}</span>
          <button onclick="toggle(\${i})">\${t.done ? '↩' : '✓'}</button>
          <button onclick="remove(\${i})">🗑</button>
        </div>\`).join('');
    }

    function addTask() {
      const input = document.getElementById('taskInput');
      const text = input.value.trim();
      if (!text) return;
      tasks.push({ text, done: false });
      input.value = '';
      save(); render();
    }

    function toggle(i) { tasks[i].done = !tasks[i].done; save(); render(); }
    function remove(i) { tasks.splice(i, 1); save(); render(); }

    document.getElementById('taskInput').addEventListener('keypress', e => {
      if (e.key === 'Enter') addTask();
    });

    render();
  </script>
</body>
</html>`,
    vivaQA: [
      { q: 'What is the DOM?', a: 'DOM (Document Object Model) is a programming interface for HTML documents. It represents the page as a tree of objects that JavaScript can read and modify dynamically without reloading the page.' },
      { q: 'What is localStorage and how is it different from sessionStorage?', a: 'localStorage persists data in the browser indefinitely until explicitly cleared. sessionStorage only lasts for the current browser tab/session and is cleared when the tab is closed.' },
      { q: 'What is JSON.parse() and JSON.stringify()?', a: 'JSON.stringify() converts a JavaScript object to a JSON string (for storage). JSON.parse() converts a JSON string back to a JavaScript object (for use). We need both because localStorage only stores strings.' },
      { q: 'What is an event listener?', a: 'An event listener is a function that waits for a specific event (like a click or keypress) on a DOM element and executes when it occurs. It separates logic from HTML (better than inline onclick).' },
      { q: 'How would you improve this project?', a: 'Add task categories, due dates, drag-to-reorder, a progress bar showing completion %, or convert it to a PWA so it works offline on mobile.' },
    ],
  },

  {
    id: 'number-guessing-game',
    level: 'school',
    title: 'Number Guessing Game',
    category: 'web',
    difficulty: 'Beginner',
    duration: '1 week',
    tech: ['Python', 'HTML', 'CSS', 'JavaScript'],
    summary: 'The computer picks a random number and the player guesses it with hints. Build it in both Python (console) and as a browser game.',
    description: `A classic beginner game that teaches random number generation, loops, conditionals, and user interaction. You build it first as a Python console app, then as an interactive browser game with a modern UI.

The browser version adds visual feedback (hot/cold hints), a guess counter, high score tracking via localStorage, and a colorful animated interface.`,
    steps: [
      'Build the Python console version with while loop and hints',
      'Design the HTML/CSS game interface',
      'Add JavaScript random number generation',
      'Implement hint system (Too High / Too Low / Correct)',
      'Track number of attempts and store high score',
    ],
    sourceCode: `# Python console version
import random

def play():
    secret = random.randint(1, 100)
    attempts = 0
    print("🎯 Guess the number between 1 and 100!")

    while True:
        try:
            guess = int(input("Your guess: "))
        except ValueError:
            print("Please enter a valid number.")
            continue

        attempts += 1

        if guess < secret:
            print(f"📉 Too low! Try higher. (Attempt {attempts})")
        elif guess > secret:
            print(f"📈 Too high! Try lower. (Attempt {attempts})")
        else:
            print(f"🎉 Correct! The number was {secret}.")
            print(f"   You got it in {attempts} attempt{'s' if attempts > 1 else ''}!")
            break

    again = input("Play again? (y/n): ")
    if again.lower() == 'y':
        play()

play()`,
    vivaQA: [
      { q: 'What does random.randint(1, 100) do?', a: 'It generates a random integer between 1 and 100 inclusive. The random module uses a pseudo-random number generator (Mersenne Twister algorithm) seeded from the system clock.' },
      { q: 'What is the difference between a while loop and a for loop?', a: 'A for loop iterates over a known sequence or a fixed number of times. A while loop continues as long as a condition is True — used when the number of iterations is unknown (like waiting for a correct guess).' },
      { q: 'Why do we use try-except around int(input())?', a: 'If the user types text instead of a number, int() raises a ValueError and crashes the program. try-except catches that error and lets us show a friendly message instead of crashing.' },
      { q: 'What is a pseudo-random number?', a: 'Computers cannot generate truly random numbers — they use deterministic algorithms seeded with an initial value (like system time). The sequence looks random but is reproducible with the same seed, hence "pseudo-random".' },
      { q: 'How would you make the game harder?', a: 'Reduce the number of allowed guesses, increase the range (1–1000), add a time limit, or implement a multiplayer mode where two players take turns guessing each other\'s numbers.' },
    ],
  },

  {
    id: 'weather-app',
    level: 'school',
    title: 'Weather App using OpenWeather API',
    category: 'web',
    difficulty: 'Beginner',
    duration: '1-2 weeks',
    tech: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    summary: 'Search any city and display real-time weather — temperature, humidity, wind speed, and condition icon — using the OpenWeatherMap free API.',
    description: `This project introduces you to working with external APIs — a core skill in modern web development. You will call the OpenWeatherMap API from JavaScript using the Fetch API, parse the JSON response, and display the data in a beautifully styled weather card.

You will learn about API keys, HTTP GET requests, JSON parsing, async/await, and dynamic DOM updates. The OpenWeatherMap free tier supports 1000 API calls/day, more than enough for a project.`,
    steps: [
      'Sign up at openweathermap.org and get a free API key',
      'Build the HTML layout (search bar + weather card)',
      'Style the card with CSS gradients and icons',
      'Fetch weather data using fetch() and async/await',
      'Display city, temperature, condition, and humidity',
    ],
    sourceCode: `const API_KEY = 'YOUR_API_KEY_HERE';

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`;

  try {
    document.getElementById('result').innerHTML = '<p>Loading...</p>';
    const res  = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();

    const { name, main, weather, wind } = data;
    document.getElementById('result').innerHTML = \`
      <div class="card">
        <h2>\${name}</h2>
        <img src="https://openweathermap.org/img/wn/\${weather[0].icon}@2x.png" alt="icon" />
        <p class="temp">\${Math.round(main.temp)}°C</p>
        <p class="desc">\${weather[0].description}</p>
        <div class="details">
          <span>💧 \${main.humidity}%</span>
          <span>💨 \${wind.speed} m/s</span>
          <span>🌡️ Feels \${Math.round(main.feels_like)}°C</span>
        </div>
      </div>\`;
  } catch (err) {
    document.getElementById('result').innerHTML = \`<p class="error">\${err.message}</p>\`;
  }
}

document.getElementById('cityInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') getWeather();
});`,
    vivaQA: [
      { q: 'What is a REST API?', a: 'REST (Representational State Transfer) is an architectural style for web APIs. It uses standard HTTP methods (GET, POST, PUT, DELETE) on URLs (endpoints) that represent resources. The server returns data (usually JSON) — it doesn\'t care what the client is.' },
      { q: 'What is async/await and why do we use it?', a: 'async/await is syntactic sugar over Promises. Network requests take time; async/await lets us write asynchronous code that reads like synchronous code. The await keyword pauses execution until the Promise resolves, without blocking the browser.' },
      { q: 'What is JSON?', a: 'JSON (JavaScript Object Notation) is a lightweight data format used to send and receive structured data over the web. It looks like a JavaScript object with keys and values, but as a string. The API returns JSON; we parse it with res.json().' },
      { q: 'What is an API key and why is it needed?', a: 'An API key is a unique identifier that authenticates your application to the API provider. It lets the provider track usage, rate-limit requests, and prevent unauthorized access. Never expose API keys in public repositories.' },
      { q: 'How would you add a 5-day forecast?', a: 'Use the OpenWeatherMap /forecast endpoint which returns weather data for every 3 hours over 5 days. Filter by noon timestamps, group by date, and display each day as a forecast card below the current weather.' },
    ],
  },

  {
    id: 'qr-code-generator',
    level: 'school',
    title: 'QR Code Generator',
    category: 'web',
    difficulty: 'Beginner',
    duration: '1 week',
    tech: ['Python', 'qrcode', 'Pillow'],
    summary: 'Generate QR codes for URLs, text, or contact info using Python. Save them as images or display them in a simple GUI.',
    description: `QR codes are everywhere — menus, payments, business cards. In this project you will generate them programmatically using Python's qrcode library. You will create QR codes for URLs, plain text, and vCard contacts, and optionally add a logo in the center.

This project teaches you how to install and use third-party Python libraries, work with images using Pillow, and build a simple file-saving workflow.`,
    steps: [
      'Install qrcode and Pillow: pip install qrcode[pil]',
      'Generate a basic QR code for a URL',
      'Customize colors, box size, and border',
      'Add a center logo using Pillow image compositing',
      'Build a Tkinter GUI to let users enter text and generate live',
    ],
    sourceCode: `import qrcode
from PIL import Image

def generate_qr(data, filename="qrcode.png", logo_path=None):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#1a1a2e", back_color="white").convert("RGB")

    if logo_path:
        logo = Image.open(logo_path).convert("RGBA")
        # Resize logo to 25% of QR size
        qr_w, qr_h = img.size
        logo_size = qr_w // 4
        logo = logo.resize((logo_size, logo_size), Image.LANCZOS)
        pos = ((qr_w - logo_size) // 2, (qr_h - logo_size) // 2)
        img.paste(logo, pos, logo)

    img.save(filename)
    print(f"QR code saved as {filename}")
    return img

# Examples
generate_qr("https://github.com",  "github_qr.png")
generate_qr("Hello, World!",        "text_qr.png")

# vCard contact QR
vcard = """BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:AcademiCode
TEL:+919999999999
EMAIL:john@example.com
END:VCARD"""
generate_qr(vcard, "contact_qr.png")`,
    vivaQA: [
      { q: 'How does a QR code store data?', a: 'A QR code encodes data as a matrix of black and white squares. Different regions serve different purposes: finder patterns (the 3 corner squares) help scanners locate the code, timing patterns define the grid, and data modules store the actual encoded information in binary.' },
      { q: 'What is error correction in QR codes?', a: 'QR codes use Reed-Solomon error correction which allows them to be scanned even if partially damaged or obscured. Level H (High) can restore up to 30% of the code — this is why you can put a logo in the center.' },
      { q: 'What is pip and why do we use it?', a: 'pip is Python\'s package installer. It downloads and installs third-party libraries from PyPI (Python Package Index). Unlike the standard library (built-in), libraries like qrcode must be installed first.' },
      { q: 'What is Pillow?', a: 'Pillow (PIL fork) is a Python imaging library that lets you open, create, edit, and save image files in many formats (PNG, JPEG, etc.). We use it to composite the logo onto the QR code and save the result.' },
      { q: 'How would you build a web version of this?', a: 'Use a Python Flask backend to generate the QR code server-side (return it as a base64 PNG), and a simple HTML/JavaScript frontend that calls the Flask API and displays the image.' },
    ],
  },

  {
    id: 'basic-chatbot',
    level: 'school',
    title: 'Rule-based Chatbot',
    category: 'ml',
    difficulty: 'Beginner',
    duration: '1-2 weeks',
    tech: ['Python'],
    summary: 'Build a simple conversational chatbot using if-else rules and keyword matching — your first step into AI and NLP.',
    description: `Before neural network chatbots like ChatGPT, rule-based systems were the standard. In this project you will build a Python chatbot that responds to user inputs by matching keywords and patterns. It is a perfect introduction to string operations, dictionaries, and the concept of natural language processing.

You will then upgrade it using Python's re (regular expressions) module for smarter pattern matching, making the bot handle variations in phrasing.`,
    steps: [
      'Define a dictionary of patterns and responses',
      'Write a function to match user input to patterns',
      'Build a conversation loop that runs until the user exits',
      'Improve with synonym handling and fallback responses',
      'Add a simple greeting with name recognition',
    ],
    sourceCode: `import re
import random

RESPONSES = {
    r"hello|hi|hey": ["Hello! How can I help you?", "Hi there!", "Hey! What's up?"],
    r"how are you": ["I'm just a bot, but I'm doing great!", "All good on my end!"],
    r"your name|who are you": ["I'm AcaBot, your study assistant!", "Call me AcaBot."],
    r"help": ["I can answer basic questions. Try asking me something!"],
    r"bye|goodbye|exit": ["Goodbye! Study hard 📚", "See you later!"],
    r"weather": ["I don't know the weather, but you can check openweathermap.org!"],
    r"joke": ["Why do programmers prefer dark mode? Because light attracts bugs! 🐛"],
    r"thank": ["You're welcome!", "Happy to help!", "Anytime!"],
}

FALLBACK = [
    "I'm not sure I understand. Could you rephrase that?",
    "Hmm, I don't have an answer for that yet.",
    "That's beyond my knowledge! Try Googling it.",
]

def get_response(user_input):
    text = user_input.lower().strip()
    for pattern, replies in RESPONSES.items():
        if re.search(pattern, text):
            return random.choice(replies)
    return random.choice(FALLBACK)

def chat():
    print("AcaBot: Hi! I'm AcaBot. Type 'bye' to exit.")
    while True:
        user = input("You: ").strip()
        if not user:
            continue
        reply = get_response(user)
        print(f"AcaBot: {reply}")
        if re.search(r"bye|goodbye|exit", user.lower()):
            break

chat()`,
    vivaQA: [
      { q: 'What is the difference between a rule-based and an AI chatbot?', a: 'A rule-based chatbot uses predefined patterns and responses — it only knows what you program it to know. An AI chatbot (like ChatGPT) uses machine learning trained on massive text data to generate responses dynamically, handling inputs it has never seen before.' },
      { q: 'What is a regular expression?', a: 'A regular expression (regex) is a pattern used to match strings. For example, r"hello|hi" matches any string containing "hello" or "hi". The re module in Python implements regex matching.' },
      { q: 'What is a Python dictionary?', a: 'A dictionary is a key-value data structure. Keys are unique identifiers (strings, numbers) and values can be anything. It provides O(1) average lookup time, making it ideal for mapping patterns to responses.' },
      { q: 'What is NLP (Natural Language Processing)?', a: 'NLP is a branch of AI that deals with the interaction between computers and human language. It involves tasks like sentiment analysis, translation, text classification, and building chatbots. Libraries like NLTK and spaCy help with NLP in Python.' },
      { q: 'How would you upgrade this to a smarter chatbot?', a: 'Integrate an intent classification model (using sklearn or HuggingFace), or call the OpenAI API. You could also add a knowledge base (FAQ dataset) and use TF-IDF similarity to find the closest matching answer.' },
    ],
  },

  {
    id: 'contact-book',
    level: 'school',
    title: 'Contact Book App',
    category: 'web',
    difficulty: 'Beginner',
    duration: '1-2 weeks',
    tech: ['Python', 'SQLite', 'Tkinter'],
    summary: 'A desktop contact manager where you can add, search, update, and delete contacts — stored persistently in an SQLite database.',
    description: `This project teaches you database fundamentals with SQLite — the most widely deployed database engine in the world. You will use Python's built-in sqlite3 module (no installation needed) to create a contacts table, insert records, query by name, update phone numbers, and delete entries.

The Tkinter GUI makes it interactive, and the SQLite file persists your data between runs — just like a real app.`,
    steps: [
      'Create an SQLite database and contacts table',
      'Write functions for CRUD operations (Create, Read, Update, Delete)',
      'Build a Tkinter window with a form and a listbox',
      'Connect form submission to database insert',
      'Add search and delete features',
    ],
    sourceCode: `import sqlite3
import tkinter as tk
from tkinter import messagebox, ttk

DB = "contacts.db"

def init_db():
    with sqlite3.connect(DB) as conn:
        conn.execute("""CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT,
            email TEXT
        )""")

def add_contact(name, phone, email):
    with sqlite3.connect(DB) as conn:
        conn.execute("INSERT INTO contacts(name,phone,email) VALUES(?,?,?)",
                     (name, phone, email))

def get_all():
    with sqlite3.connect(DB) as conn:
        return conn.execute("SELECT id,name,phone,email FROM contacts ORDER BY name").fetchall()

def delete_contact(cid):
    with sqlite3.connect(DB) as conn:
        conn.execute("DELETE FROM contacts WHERE id=?", (cid,))

def search_contacts(query):
    with sqlite3.connect(DB) as conn:
        return conn.execute(
            "SELECT id,name,phone,email FROM contacts WHERE name LIKE ?",
            (f"%{query}%",)
        ).fetchall()

init_db()
print("Database ready. Use add_contact(), get_all(), delete_contact(), search_contacts().")
# Example:
add_contact("Alice", "+91-9000000001", "alice@example.com")
add_contact("Bob",   "+91-9000000002", "bob@example.com")
print(get_all())`,
    vivaQA: [
      { q: 'What is SQLite and how is it different from MySQL?', a: 'SQLite is a serverless, file-based relational database — the entire database is a single .db file. MySQL is a full client-server database requiring a running server process. SQLite is ideal for small apps; MySQL for large multi-user applications.' },
      { q: 'What are CRUD operations?', a: 'CRUD stands for Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE) — the four fundamental database operations. Almost every application is built on these four operations.' },
      { q: 'What is SQL injection and how do we prevent it?', a: 'SQL injection is an attack where malicious SQL code is inserted into a query through user input (e.g., entering \' OR 1=1 -- as a name). We prevent it using parameterized queries (?, ?) instead of string formatting — the sqlite3 module does this for us.' },
      { q: 'What is a PRIMARY KEY?', a: 'A primary key is a column (or set of columns) that uniquely identifies each row in a table. With AUTOINCREMENT, SQLite automatically assigns a unique integer ID to each new row.' },
      { q: 'What is a context manager (with statement)?', a: 'A context manager (the with keyword) automatically handles setup and teardown. For sqlite3.connect(), it ensures the transaction is committed and the connection is closed properly, even if an error occurs.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PG PROJECTS (M.Tech / Research)
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'federated-learning',
    level: 'pg',
    title: 'Federated Learning for Privacy-Preserving ML',
    category: 'ml',
    difficulty: 'Advanced',
    duration: '6-8 weeks',
    tech: ['Python', 'TensorFlow', 'Flower (flwr)', 'NumPy'],
    summary: 'Implement a federated learning system where multiple clients train local models and aggregate updates on a central server — without sharing raw data.',
    description: `Federated Learning (FL) is a cutting-edge paradigm where a model is trained across multiple decentralized devices without transferring raw data to a central server. Each client trains on local data and sends only model weight updates (gradients), preserving data privacy.

This project uses the Flower (flwr) framework to simulate a federated setup with multiple clients. You will implement FedAvg (Federated Averaging), the seminal algorithm by McMahan et al. (2017), on the MNIST dataset distributed across 10 simulated clients.

This is a standard research topic for M.Tech theses in ML privacy and distributed systems.`,
    steps: [
      'Understand the FedAvg algorithm and federated vs. centralized training',
      'Set up Flower server and client architecture',
      'Implement local model training on partitioned MNIST data',
      'Aggregate model updates on the server using weighted averaging',
      'Compare federated vs. centralized accuracy over rounds',
      'Experiment with non-IID data distribution (realistic scenario)',
    ],
    sourceCode: `import flwr as fl
import tensorflow as tf
import numpy as np

# Load and partition MNIST
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

def build_model():
    return tf.keras.Sequential([
        tf.keras.layers.Flatten(input_shape=(28,28)),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(10, activation='softmax'),
    ])

class MNISTClient(fl.client.NumPyClient):
    def __init__(self, client_id, num_clients=10):
        self.model = build_model()
        self.model.compile(optimizer='adam',
                           loss='sparse_categorical_crossentropy',
                           metrics=['accuracy'])
        # Partition data across clients
        shard = len(x_train) // num_clients
        self.x = x_train[client_id*shard:(client_id+1)*shard]
        self.y = y_train[client_id*shard:(client_id+1)*shard]

    def get_parameters(self, config):
        return self.model.get_weights()

    def fit(self, parameters, config):
        self.model.set_weights(parameters)
        self.model.fit(self.x, self.y, epochs=1, batch_size=32, verbose=0)
        return self.model.get_weights(), len(self.x), {}

    def evaluate(self, parameters, config):
        self.model.set_weights(parameters)
        loss, acc = self.model.evaluate(x_test, y_test, verbose=0)
        return loss, len(x_test), {"accuracy": acc}

# Simulate federation with client_id = 0
fl.client.start_numpy_client(server_address="localhost:8080",
                              client=MNISTClient(client_id=0))`,
    vivaQA: [
      { q: 'What is Federated Learning and why is it important?', a: 'Federated Learning is a distributed ML approach where the model is trained across multiple clients (hospitals, phones, etc.) without centralizing raw data. It is important for privacy compliance (GDPR, HIPAA), reducing data transfer costs, and enabling ML on sensitive data like medical records.' },
      { q: 'Explain the FedAvg algorithm.', a: 'FedAvg (McMahan et al., 2017) works as follows: (1) Server sends global model weights to all clients. (2) Each client trains locally for E epochs on its data. (3) Clients send updated weights back. (4) Server aggregates by weighted average (weighted by dataset size). Steps repeat for R rounds.' },
      { q: 'What is the IID vs non-IID data problem in FL?', a: 'IID (Independent and Identically Distributed) means each client\'s data has the same distribution as the global dataset. In reality (non-IID), clients have heterogeneous data (e.g., a hospital specializing in cardiac cases). Non-IID data causes client drift and slower convergence.' },
      { q: 'What are the privacy guarantees of federated learning?', a: 'Basic FL protects raw data but is still vulnerable to gradient inversion attacks (recovering training data from gradients). Stronger guarantees require Differential Privacy (adding calibrated noise to gradients) or Secure Aggregation (cryptographic protocols).' },
      { q: 'What is differential privacy?', a: 'Differential privacy (DP) is a mathematical framework that guarantees an algorithm\'s output changes negligibly whether or not any single individual\'s data is included. In FL, DP is applied by clipping gradient norms and adding Gaussian noise before sending updates to the server.' },
    ],
  },

  {
    id: 'yolo-object-detection',
    level: 'pg',
    title: 'Real-Time Object Detection with YOLOv8',
    category: 'ml',
    difficulty: 'Advanced',
    duration: '4-6 weeks',
    tech: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'CUDA'],
    summary: 'Train and deploy a YOLOv8 model to detect custom objects in real-time from webcam or video — including fine-tuning on your own dataset.',
    description: `YOLO (You Only Look Once) is the gold standard for real-time object detection. YOLOv8 by Ultralytics is the state-of-the-art version that achieves 50+ FPS on a GPU with high accuracy.

In this project you will start with the pretrained YOLOv8n model on COCO (80 classes), then fine-tune it on a custom dataset (e.g., face mask detection, PPE detection, or road signs). You will annotate training images using Roboflow, export in YOLO format, train for 50 epochs, and deploy a real-time inference pipeline using OpenCV.`,
    steps: [
      'Install ultralytics: pip install ultralytics',
      'Run inference on pretrained YOLOv8n (COCO 80 classes)',
      'Collect and annotate custom images using Roboflow',
      'Export dataset in YOLOv8 format and configure data.yaml',
      'Fine-tune: model.train(data="data.yaml", epochs=50)',
      'Build real-time webcam inference with OpenCV',
    ],
    sourceCode: `from ultralytics import YOLO
import cv2

# ── 1. Pretrained inference ────────────────────────────────────────────────
model = YOLO("yolov8n.pt")
results = model("https://ultralytics.com/images/bus.jpg")
results[0].show()

# ── 2. Fine-tune on custom dataset ────────────────────────────────────────
# Assumes dataset prepared in YOLOv8 format with data.yaml
model = YOLO("yolov8n.pt")
model.train(
    data   = "data.yaml",
    epochs = 50,
    imgsz  = 640,
    batch  = 16,
    name   = "custom_detector",
    device = "cuda",   # use 'cpu' if no GPU
)

# ── 3. Real-time webcam inference ─────────────────────────────────────────
trained_model = YOLO("runs/detect/custom_detector/weights/best.pt")
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break

    results = trained_model(frame, stream=True)
    for r in results:
        annotated = r.plot()   # Draw boxes + labels on frame
    cv2.imshow("YOLOv8 Detection", annotated)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()`,
    vivaQA: [
      { q: 'How does YOLO differ from two-stage detectors like Faster R-CNN?', a: 'YOLO is a single-stage detector — it predicts bounding boxes and class probabilities in a single forward pass, making it very fast (real-time). Two-stage detectors like Faster R-CNN first propose regions of interest (RPN), then classify each — more accurate but slower.' },
      { q: 'What is the anchor-free approach in YOLOv8?', a: 'Earlier YOLO versions (v3–v5) used predefined anchor boxes of fixed sizes. YOLOv8 is anchor-free — it directly predicts the center point and size of objects without anchors, simplifying training and improving generalization to small objects.' },
      { q: 'What is IoU (Intersection over Union)?', a: 'IoU measures overlap between a predicted bounding box and the ground truth box: IoU = Area(Intersection) / Area(Union). A prediction is considered correct (true positive) if IoU > 0.5 (standard threshold). It is used to compute mAP (mean Average Precision).' },
      { q: 'What is transfer learning and why is it used here?', a: 'Transfer learning reuses a model pretrained on a large dataset (COCO) as a starting point for a new task. The model already has learned low-level features (edges, textures) — fine-tuning only adapts the later layers to the new domain, requiring far less data and compute than training from scratch.' },
      { q: 'What is mAP and how is it calculated?', a: 'mAP (mean Average Precision) is the standard metric for object detection. For each class, compute the precision-recall curve by varying the confidence threshold, then calculate the area under the curve (Average Precision). mAP averages this across all classes. mAP@0.5 is the most common variant.' },
    ],
  },

  {
    id: 'bert-text-classification',
    level: 'pg',
    title: 'BERT-based Text Classification Pipeline',
    category: 'ml',
    difficulty: 'Advanced',
    duration: '4-5 weeks',
    tech: ['Python', 'HuggingFace Transformers', 'PyTorch', 'BERT', 'scikit-learn'],
    summary: 'Fine-tune a pre-trained BERT model for multi-class text classification (news categorization, spam detection, or emotion analysis).',
    description: `BERT (Bidirectional Encoder Representations from Transformers) by Google revolutionized NLP in 2018. Unlike RNNs, BERT reads text bidirectionally and captures deep contextual relationships between words through the self-attention mechanism.

In this project you will fine-tune bert-base-uncased for a 4-class news categorization task (AG News dataset). You will set up the HuggingFace Transformers training pipeline, implement a custom PyTorch DataLoader, and achieve 94%+ accuracy — significantly outperforming traditional ML approaches like TF-IDF + Logistic Regression.`,
    steps: [
      'Install transformers: pip install transformers datasets',
      'Load AG News dataset from HuggingFace Hub',
      'Tokenize text using BertTokenizer with padding/truncation',
      'Build PyTorch Dataset and DataLoader',
      'Fine-tune bert-base-uncased with AdamW optimizer for 3 epochs',
      'Evaluate with accuracy, F1-score, and confusion matrix',
    ],
    sourceCode: `from transformers import BertTokenizer, BertForSequenceClassification, get_scheduler
from datasets import load_dataset
from torch.utils.data import DataLoader
from torch.optim import AdamW
import torch

# ── Setup ─────────────────────────────────────────────────────────────────
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=4).to(device)

# ── Data ──────────────────────────────────────────────────────────────────
dataset = load_dataset("ag_news")

def tokenize(batch):
    return tokenizer(batch["text"], truncation=True, padding="max_length", max_length=128)

tokenized = dataset.map(tokenize, batched=True)
tokenized.set_format("torch", columns=["input_ids", "attention_mask", "label"])

train_loader = DataLoader(tokenized["train"].select(range(4000)), batch_size=16, shuffle=True)
test_loader  = DataLoader(tokenized["test"].select(range(800)),  batch_size=16)

# ── Train ─────────────────────────────────────────────────────────────────
optimizer = AdamW(model.parameters(), lr=2e-5)
scheduler = get_scheduler("linear", optimizer, num_warmup_steps=50,
                           num_training_steps=len(train_loader)*3)

model.train()
for epoch in range(3):
    total_loss = 0
    for batch in train_loader:
        input_ids      = batch["input_ids"].to(device)
        attention_mask = batch["attention_mask"].to(device)
        labels         = batch["label"].to(device)

        outputs = model(input_ids, attention_mask=attention_mask, labels=labels)
        loss = outputs.loss
        loss.backward()
        optimizer.step(); scheduler.step(); optimizer.zero_grad()
        total_loss += loss.item()
    print(f"Epoch {epoch+1} | Loss: {total_loss/len(train_loader):.4f}")`,
    vivaQA: [
      { q: 'What is the self-attention mechanism in BERT?', a: 'Self-attention allows each token to attend to every other token in the sequence when computing its representation. For each token, it computes Query, Key, and Value vectors; attention scores are dot products of Q and K (scaled by sqrt(d_k)), softmaxed, then used to weight sum the Values. This captures long-range dependencies.' },
      { q: 'What is the difference between BERT and GPT?', a: 'BERT is an encoder-only model trained with Masked Language Modeling (MLM) and Next Sentence Prediction — it sees the full context bidirectionally. GPT is a decoder-only model trained autoregressively (predicting the next token). BERT excels at classification/NLU tasks; GPT at generation tasks.' },
      { q: 'What is fine-tuning vs. training from scratch?', a: 'Training from scratch requires millions of data points and weeks of GPU time (BERT was trained on Wikipedia + BookCorpus). Fine-tuning starts from pretrained weights and adapts them to a downstream task with far less data (thousands of examples) and time (hours), leveraging already-learned language representations.' },
      { q: 'What is the AdamW optimizer?', a: 'AdamW is Adam with decoupled weight decay. Standard Adam applies L2 regularization inside the gradient update (conflating regularization with gradient adaptation). AdamW applies weight decay separately, leading to better generalization — the standard choice for fine-tuning Transformers.' },
      { q: 'What are attention heads and why use multiple?', a: 'Multi-head attention runs several attention operations in parallel, each learning to attend to different types of relationships (e.g., one head may focus on syntax, another on co-reference). The outputs are concatenated and projected. BERT-base uses 12 attention heads per layer across 12 layers.' },
    ],
  },

  {
    id: 'blockchain-certificate',
    level: 'pg',
    title: 'Blockchain-based Certificate Verification',
    category: 'security',
    difficulty: 'Advanced',
    duration: '6-8 weeks',
    tech: ['Solidity', 'Ethereum', 'Web3.js', 'React', 'MetaMask', 'Hardhat'],
    summary: 'Issue tamper-proof academic certificates as smart contracts on the Ethereum blockchain — verifiable by anyone without a central authority.',
    description: `Certificate fraud is a global problem. This project solves it by storing certificate hashes on the Ethereum blockchain — immutable, transparent, and decentralized. Universities can issue certificates, and anyone can verify authenticity by computing the hash and checking the blockchain.

You will write a Solidity smart contract that stores certificate hashes, deploy it to a local Hardhat network (and optionally to the Goerli testnet), and build a React frontend using Web3.js and MetaMask for wallet-based signing.`,
    steps: [
      'Install Hardhat: npm install --save-dev hardhat',
      'Write the CertificateRegistry Solidity smart contract',
      'Compile and deploy to local Hardhat network',
      'Write unit tests using Chai/Ethers.js',
      'Build React frontend with MetaMask wallet connection',
      'Issue and verify certificates via the UI',
    ],
    sourceCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateRegistry {
    address public owner;

    struct Certificate {
        string  studentName;
        string  courseName;
        uint256 issueDate;
        bool    isValid;
    }

    // certHash => Certificate
    mapping(bytes32 => Certificate) private certificates;
    // certHash => issuer address
    mapping(bytes32 => address) public issuers;

    event CertificateIssued(bytes32 indexed certHash, string studentName, address indexed issuer);
    event CertificateRevoked(bytes32 indexed certHash);

    modifier onlyOwner() { require(msg.sender == owner, "Not authorized"); _; }

    constructor() { owner = msg.sender; }

    function issueCertificate(
        bytes32 certHash,
        string calldata studentName,
        string calldata courseName
    ) external onlyOwner {
        require(certificates[certHash].issueDate == 0, "Certificate already exists");
        certificates[certHash] = Certificate(studentName, courseName, block.timestamp, true);
        issuers[certHash] = msg.sender;
        emit CertificateIssued(certHash, studentName, msg.sender);
    }

    function verifyCertificate(bytes32 certHash)
        external view returns (bool valid, string memory studentName, string memory courseName, uint256 issueDate)
    {
        Certificate memory c = certificates[certHash];
        return (c.isValid, c.studentName, c.courseName, c.issueDate);
    }

    function revokeCertificate(bytes32 certHash) external onlyOwner {
        require(certificates[certHash].issueDate != 0, "Certificate not found");
        certificates[certHash].isValid = false;
        emit CertificateRevoked(certHash);
    }
}`,
    vivaQA: [
      { q: 'What is a smart contract?', a: 'A smart contract is self-executing code deployed on a blockchain. Once deployed, it runs exactly as programmed without any possibility of downtime, fraud, censorship, or third-party interference. The Ethereum Virtual Machine (EVM) executes smart contract bytecode deterministically across all nodes.' },
      { q: 'Why is the blockchain suitable for certificate verification?', a: 'Blockchain is immutable (records cannot be altered), transparent (anyone can verify), decentralized (no single point of failure or authority), and timestamped. These properties make it ideal for any trust-critical record-keeping including academic credentials, land records, and supply chain provenance.' },
      { q: 'What is a mapping in Solidity?', a: 'A mapping is a hash table data structure in Solidity: mapping(KeyType => ValueType). It stores key-value pairs with O(1) lookup. Unlike arrays, all unmapped keys default to zero/empty values, and mappings cannot be iterated — you must track keys separately if iteration is needed.' },
      { q: 'What is the difference between storage, memory, and calldata in Solidity?', a: 'storage is persistent on-chain (expensive to write). memory is temporary within a function call (cheaper). calldata is read-only, non-modifiable data passed to external functions — the cheapest option for function parameters. Using calldata instead of memory for input parameters saves gas.' },
      { q: 'What is gas in Ethereum?', a: 'Gas is the unit of computational work in Ethereum. Every EVM operation costs a fixed amount of gas. The total gas used multiplied by the gas price (in Gwei) is the transaction fee paid to validators. Storage operations are the most expensive (SSTORE costs 20,000 gas), while reads are cheaper (SLOAD costs 800).' },
    ],
  },

  {
    id: 'distributed-task-scheduler',
    level: 'pg',
    title: 'Distributed Task Scheduler with Redis & Celery',
    category: 'web',
    difficulty: 'Advanced',
    duration: '5-6 weeks',
    tech: ['Python', 'FastAPI', 'Celery', 'Redis', 'Docker', 'Flower'],
    summary: 'Build a scalable distributed task queue where a FastAPI server enqueues jobs, Celery workers process them asynchronously, and Redis acts as the message broker.',
    description: `Distributed task queues are at the heart of scalable systems — used by Instagram, Pinterest, and thousands of companies for background processing (sending emails, processing images, generating reports).

In this project you build a complete system: a FastAPI REST API that accepts task requests, a Redis broker that queues them, multiple Celery workers that process tasks in parallel, and a Flower dashboard for real-time monitoring. Docker Compose ties everything together.`,
    steps: [
      'Set up Docker Compose with FastAPI, Redis, and Celery worker services',
      'Configure Celery with Redis as broker and result backend',
      'Define Celery tasks (image resize, email send simulation, report generation)',
      'Build FastAPI endpoints to enqueue tasks and poll results',
      'Scale workers: docker-compose up --scale worker=4',
      'Monitor with Flower dashboard and implement task retry logic',
    ],
    sourceCode: `# tasks.py
from celery import Celery
import time, random

app = Celery(
    "tasks",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1",
)
app.conf.task_serializer = "json"
app.conf.result_expires  = 3600

@app.task(bind=True, max_retries=3, default_retry_delay=5)
def process_report(self, report_id: str, data: dict):
    try:
        # Simulate time-consuming work
        time.sleep(random.uniform(1, 3))
        result = {"report_id": report_id, "rows": len(data), "status": "completed"}
        return result
    except Exception as exc:
        raise self.retry(exc=exc)

# main.py (FastAPI)
from fastapi import FastAPI
from tasks import process_report

api = FastAPI()

@api.post("/reports")
async def create_report(report_id: str, rows: int):
    data = {"rows": list(range(rows))}
    task = process_report.delay(report_id, data)
    return {"task_id": task.id, "status": "queued"}

@api.get("/reports/{task_id}")
async def get_result(task_id: str):
    task = process_report.AsyncResult(task_id)
    if task.state == "SUCCESS":
        return {"status": "done", "result": task.result}
    return {"status": task.state}`,
    vivaQA: [
      { q: 'What is a message broker and why do we use Redis for it?', a: 'A message broker is middleware that accepts messages from producers (FastAPI) and routes them to consumers (Celery workers). Redis is used because it supports pub/sub, list-based queues (LPUSH/BRPOP), and is extremely fast (in-memory). RabbitMQ is the alternative for more complex routing needs.' },
      { q: 'What is the difference between synchronous and asynchronous processing?', a: 'Synchronous: the client waits for the server to complete the task before getting a response (blocking). Asynchronous: the server immediately returns a task ID; the client polls for the result later (non-blocking). Async is essential for long-running tasks to avoid HTTP timeouts and improve throughput.' },
      { q: 'What is idempotency and why does it matter in task queues?', a: 'An idempotent operation produces the same result regardless of how many times it is executed. In distributed systems, tasks may be retried due to worker failures, so tasks must be idempotent to avoid side effects (e.g., sending an email twice). Use unique IDs and check-before-execute patterns.' },
      { q: 'What is Docker Compose and why is it useful here?', a: 'Docker Compose defines and runs multi-container applications with a single YAML file. Here we define 4 services: FastAPI, Redis, Celery worker, and Flower. Compose handles networking, startup order, and scaling (--scale worker=4 spawns 4 worker containers) — eliminating "works on my machine" problems.' },
      { q: 'How would you handle task prioritization?', a: 'Celery supports multiple queues with different priorities: route high-priority tasks (e.g., user-facing actions) to a high queue processed by dedicated workers, and low-priority tasks (batch reports) to a low queue. Use route_task to map task types to queues and assign worker queues with -Q high,low flags.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BOOKING / RESERVATION PROJECTS (UG)
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'hotel-room-booking',
    level: 'ug',
    title: 'Hotel Room Booking System',
    category: 'web',
    difficulty: 'Intermediate',
    duration: '3-4 weeks',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe'],
    summary: 'A full-stack hotel booking platform where guests search available rooms by date, book and pay online, and hotel admins manage reservations and revenue.',
    description: `Build a production-grade hotel booking system with real-world features: date-range availability search, room filtering by type and price, online payment via Stripe, booking confirmation emails, and an admin panel for property management.

The frontend uses React with a date-picker calendar component. The backend is a Node.js/Express REST API with MongoDB storing rooms, bookings, and users. JWT authentication protects routes, and Stripe handles secure payments.`,
    steps: [
      'Design MongoDB schemas: Room, Booking, User',
      'Build authentication API (register, login, JWT middleware)',
      'Implement availability search with date-range overlap logic',
      'Create booking flow: select dates → review → pay via Stripe',
      'Build admin dashboard: manage rooms, view bookings, revenue chart',
      'Add booking confirmation with Nodemailer email',
    ],
    sourceCode: `// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  room:      { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  checkIn:   { type: Date, required: true },
  checkOut:  { type: Date, required: true },
  guests:    { type: Number, default: 1 },
  totalPrice:{ type: Number, required: true },
  status:    { type: String, enum: ['pending','confirmed','cancelled'], default: 'pending' },
  paymentId: { type: String },
}, { timestamps: true });

// Prevent double-booking: index for fast overlap queries
BookingSchema.index({ room: 1, checkIn: 1, checkOut: 1 });
module.exports = mongoose.model('Booking', BookingSchema);

// routes/bookings.js — Check availability
router.get('/available', async (req, res) => {
  const { checkIn, checkOut, guests } = req.query;

  // Find rooms with NO overlapping confirmed bookings
  const bookedRoomIds = await Booking.distinct('room', {
    status: 'confirmed',
    $or: [
      { checkIn:  { $lt: new Date(checkOut) },
        checkOut: { $gt: new Date(checkIn)  } },
    ],
  });

  const rooms = await Room.find({
    _id:      { $nin: bookedRoomIds },
    capacity: { $gte: Number(guests) },
  });
  res.json(rooms);
});

// routes/bookings.js — Create booking + Stripe payment intent
router.post('/', auth, async (req, res) => {
  const { roomId, checkIn, checkOut, guests } = req.body;
  const room  = await Room.findById(roomId);
  const nights = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );
  const total  = room.pricePerNight * nights;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100, // paise/cents
    currency: 'inr',
    metadata: { roomId, userId: req.user.id },
  });

  const booking = await Booking.create({
    room: roomId, user: req.user.id,
    checkIn, checkOut, guests, totalPrice: total,
    paymentId: paymentIntent.id,
  });
  res.json({ booking, clientSecret: paymentIntent.client_secret });
});`,
    vivaQA: [
      { q: 'How do you prevent double-booking for the same room?', a: 'Query existing confirmed bookings where the date ranges overlap: a new booking [checkIn, checkOut) conflicts if existing.checkIn < newCheckOut AND existing.checkOut > newCheckIn. Exclude rooms with such conflicts using $nin on the room IDs. Use a database-level unique index or optimistic locking for race condition safety.' },
      { q: 'What is Stripe and how does its payment flow work?', a: 'Stripe is a payment processing platform. The server creates a PaymentIntent (specifying amount and currency) and returns a client_secret to the frontend. The React frontend uses Stripe.js to collect card details and confirm the payment with the client_secret — card data never touches your server, reducing PCI compliance scope.' },
      { q: 'What is the difference between $in and $nin in MongoDB?', a: '$in matches documents where a field\'s value is in a given array. $nin matches documents where the value is NOT in the array. We use $nin to exclude rooms that already have confirmed bookings overlapping the requested dates.' },
      { q: 'How would you handle cancellation and refunds?', a: 'Update the booking status to "cancelled" in the database. For refunds, call stripe.refunds.create({ payment_intent: booking.paymentId }) — Stripe credits the customer. Define a cancellation policy (e.g., full refund if cancelled 48h before check-in, 50% within 24h) enforced at the API level.' },
      { q: 'What is JWT and how is it used for route protection?', a: 'JSON Web Token is a signed, stateless token issued on login. It encodes the user ID and role. Protected routes run a middleware that verifies the token signature using the secret key and attaches req.user — no database lookup needed per request, making it scalable.' },
    ],
  },

  {
    id: 'bus-ticket-booking',
    level: 'ug',
    title: 'Online Bus Ticket Booking System',
    category: 'web',
    difficulty: 'Intermediate',
    duration: '3-4 weeks',
    tech: ['React', 'Django', 'PostgreSQL', 'REST API', 'Razorpay'],
    summary: 'Search bus routes by source/destination and date, pick seats on an interactive seat map, book tickets, and download a PDF e-ticket with a QR code.',
    description: `A real-world bus reservation platform modelled after redBus. Users search available buses between two cities on a chosen date, view seat layouts with available/booked indicators, select seats, provide passenger details, and complete payment via Razorpay.

The backend is Django REST Framework with PostgreSQL managing routes, schedules, seats, and bookings. The seat map is rendered dynamically in React, showing real-time seat status with colour coding.`,
    steps: [
      'Design database: Route, Bus, Schedule, Seat, Booking, Passenger',
      'Build Django REST API for search, seat status, and booking',
      'Create React seat-selector component (grid layout, colour codes)',
      'Implement booking flow: seat selection → passenger form → payment',
      'Generate PDF e-ticket with QR code using ReportLab / pdfkit',
      'Send booking confirmation SMS via Twilio (optional)',
    ],
    sourceCode: `# models.py
from django.db import models

class Route(models.Model):
    source      = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    distance_km = models.FloatField()

class Bus(models.Model):
    TYPES = [('AC Sleeper','AC Sleeper'),('Non-AC Seater','Non-AC Seater'),('Volvo','Volvo')]
    route       = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='buses')
    name        = models.CharField(max_length=100)
    bus_type    = models.CharField(max_length=20, choices=TYPES)
    total_seats = models.IntegerField(default=40)
    departure   = models.TimeField()
    arrival     = models.TimeField()
    price       = models.DecimalField(max_digits=8, decimal_places=2)

class Booking(models.Model):
    STATUS = [('pending','Pending'),('confirmed','Confirmed'),('cancelled','Cancelled')]
    user         = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    bus          = models.ForeignKey(Bus, on_delete=models.CASCADE)
    travel_date  = models.DateField()
    seats        = models.JSONField()      # e.g. ["A1","A2","B3"]
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status       = models.CharField(max_length=15, choices=STATUS, default='pending')
    pnr          = models.CharField(max_length=12, unique=True)
    booked_at    = models.DateTimeField(auto_now_add=True)

# views.py — seat availability
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def seat_status(request, bus_id, travel_date):
    booked = Booking.objects.filter(
        bus_id=bus_id, travel_date=travel_date, status='confirmed'
    ).values_list('seats', flat=True)

    booked_seats = set()
    for seat_list in booked:
        booked_seats.update(seat_list)

    bus = Bus.objects.get(pk=bus_id)
    all_seats = [f"{row}{col}" for row in 'ABCDE' for col in range(1, 9)]

    return Response({
        'total': bus.total_seats,
        'booked': list(booked_seats),
        'available': [s for s in all_seats if s not in booked_seats],
    })`,
    vivaQA: [
      { q: 'How do you prevent two users from booking the same seat simultaneously?', a: 'Use database-level locking: wrap the seat check and booking creation in a SELECT FOR UPDATE (PostgreSQL row-level lock) within a transaction. Django ORM: Booking.objects.select_for_update().filter(...). This blocks concurrent transactions from reading the same seats until the first transaction commits.' },
      { q: 'What is a PNR number and how would you generate it?', a: 'PNR (Passenger Name Record) is a unique booking identifier. Generate it by combining a prefix, date, and random alphanumeric characters: e.g., import secrets; pnr = "BUS" + datetime.now().strftime("%m%d") + secrets.token_hex(3).upper(). Ensure uniqueness with a UNIQUE database constraint.' },
      { q: 'How does Django REST Framework differ from plain Django?', a: 'Plain Django renders HTML templates (server-side rendering). Django REST Framework (DRF) builds JSON APIs consumed by any frontend (React, mobile). DRF provides Serializers (schema + validation), ViewSets (CRUD in fewer lines), and authentication classes (JWT, Session, Token).' },
      { q: 'What is JSONField in Django and when should you use it?', a: 'JSONField stores Python dicts or lists as JSON in the database (PostgreSQL native JSONB, SQLite as text). Use it for flexible, schema-less data — like a list of selected seat codes — that doesn\'t need to be queried field by field. Avoid it for data you need to filter or aggregate by individual properties.' },
      { q: 'How would you implement a ticket cancellation and refund policy?', a: 'Define time-based refund tiers: >24h before departure = 80% refund, 12–24h = 50%, <12h = 0%. Implement a cancel endpoint that checks remaining time, calculates refund, updates booking status to "cancelled", initiates Razorpay refund via API, and releases the seats (removes from booked list).' },
    ],
  },

  {
    id: 'doctor-appointment-booking',
    level: 'ug',
    title: 'Doctor Appointment Booking System',
    category: 'web',
    difficulty: 'Intermediate',
    duration: '3-4 weeks',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Nodemailer', 'JWT'],
    summary: 'Patients search doctors by specialization and location, view available time slots, book appointments, and receive email reminders — all managed through a clinic dashboard.',
    description: `A healthcare appointment management system used in clinics and hospitals. Patients register, browse doctors by specialty (Cardiologist, Dentist, Dermatologist, etc.), view their weekly availability calendar, and book 30-minute slots. Doctors get a dashboard showing their daily appointments.

The system sends automated email reminders 24 hours before appointments using Nodemailer + node-cron, and supports appointment rescheduling and cancellation.`,
    steps: [
      'Design schemas: Doctor, Patient, Appointment, Schedule',
      'Build authentication for both patient and doctor roles',
      'Implement weekly slot generation from doctor availability rules',
      'Create booking API with conflict detection',
      'Build patient search + booking UI and doctor dashboard',
      'Set up cron job for automated 24h email reminders',
    ],
    sourceCode: `// models/Doctor.js
const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  dayOfWeek:  { type: Number, min: 0, max: 6 }, // 0=Sun, 6=Sat
  startTime:  { type: String },  // "09:00"
  endTime:    { type: String },  // "17:00"
  slotMinutes:{ type: Number, default: 30 },
});

const DoctorSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  specialization:{ type: String, required: true },
  experience:   { type: Number },
  fee:          { type: Number },
  availability: [AvailabilitySchema],
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Doctor', DoctorSchema);

// utils/slotGenerator.js
function generateSlots(availability, date) {
  const day    = new Date(date).getDay();
  const avail  = availability.find(a => a.dayOfWeek === day);
  if (!avail) return [];

  const slots  = [];
  const [sh, sm] = avail.startTime.split(':').map(Number);
  const [eh, em] = avail.endTime.split(':').map(Number);
  let   current  = sh * 60 + sm;
  const end      = eh * 60 + em;

  while (current + avail.slotMinutes <= end) {
    const hh = String(Math.floor(current / 60)).padStart(2, '0');
    const mm = String(current % 60).padStart(2, '0');
    slots.push(\`\${hh}:\${mm}\`);
    current += avail.slotMinutes;
  }
  return slots;
}

// routes/appointments.js — Get available slots
router.get('/slots/:doctorId', async (req, res) => {
  const { date } = req.query;
  const doctor   = await Doctor.findById(req.params.doctorId);
  const allSlots = generateSlots(doctor.availability, date);

  const booked   = await Appointment.find({
    doctor: req.params.doctorId,
    date,
    status: { $ne: 'cancelled' },
  }).select('time');

  const bookedTimes = booked.map(a => a.time);
  const available   = allSlots.filter(s => !bookedTimes.includes(s));
  res.json({ available, booked: bookedTimes });
});`,
    vivaQA: [
      { q: 'How do you generate time slots dynamically from a doctor\'s availability?', a: 'Store the doctor\'s availability as rules (day of week, start time, end time, slot duration in minutes). On a given date, find the matching day rule, then iterate from start to end time, adding slot-duration minutes each iteration, producing an array of slot strings like "09:00", "09:30", etc.' },
      { q: 'How do you send automated appointment reminders?', a: 'Use node-cron to schedule a job (e.g., cron.schedule("0 8 * * *")) that runs daily at 8 AM. The job queries appointments scheduled for the next day, fetches patient email addresses, and sends reminder emails via Nodemailer with appointment details and a cancellation link.' },
      { q: 'What is role-based access control (RBAC) and how is it implemented here?', a: 'RBAC restricts API access based on the user\'s role (patient, doctor, admin). During login, the role is embedded in the JWT payload. Middleware checks req.user.role before allowing access to protected routes — patients can book appointments, doctors can view their schedules, admins can manage the system.' },
      { q: 'What is mongoose populate() and when is it used?', a: 'populate() replaces a stored ObjectId reference with the actual document from the referenced collection. For example, Appointment.find().populate("doctor") replaces the doctor field (an ObjectId) with the full Doctor document. It is similar to a JOIN in SQL.' },
      { q: 'How would you add video consultation support to this system?', a: 'Integrate a WebRTC library (Daily.co, Agora, or Jitsi) or a video API. When a confirmed appointment starts, generate a unique room URL and share it via email/SMS with both doctor and patient. WebRTC provides peer-to-peer encrypted video — no media passes through your server, reducing infrastructure cost.' },
    ],
  },

  {
    id: 'movie-ticket-booking',
    level: 'ug',
    title: 'Movie Ticket Booking App',
    category: 'web',
    difficulty: 'Intermediate',
    duration: '3-4 weeks',
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'Sequelize', 'Razorpay'],
    summary: 'A BookMyShow-style app where users browse movies and showtimes, pick seats on a theatre seat map, pay, and receive a QR-code ticket.',
    description: `A cinema booking platform inspired by BookMyShow. Users browse now-showing movies, select a multiplex, choose a showtime, pick seats on a colour-coded seat map (gold, silver, recliner tiers), and complete payment. A QR-code ticket is generated for entry.

The backend uses Node.js with Sequelize ORM on MySQL. Real-time seat locking (seats are held for 5 minutes during checkout to prevent double-booking) is implemented with Redis TTL keys.`,
    steps: [
      'Design database: Movie, Theatre, Screen, Show, Seat, Booking',
      'Build REST API with Sequelize for movies, shows, and seats',
      'Create interactive seat map in React (tiers + live status)',
      'Implement Redis-based temporary seat locking (5-min TTL)',
      'Integrate Razorpay payment and generate QR code ticket',
      'Add admin panel to manage movies and shows',
    ],
    sourceCode: `// models/Show.js (Sequelize)
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Show', {
  movieId:    { type: DataTypes.INTEGER, allowNull: false },
  screenId:   { type: DataTypes.INTEGER, allowNull: false },
  showDate:   { type: DataTypes.DATEONLY, allowNull: false },
  showTime:   { type: DataTypes.TIME, allowNull: false },
  language:   { type: DataTypes.STRING, defaultValue: 'English' },
  format:     { type: DataTypes.ENUM('2D','3D','IMAX'), defaultValue: '2D' },
  isActive:   { type: DataTypes.BOOLEAN, defaultValue: true },
});

// Seat locking with Redis (5-minute hold)
const redis = require('../config/redis');

async function lockSeats(showId, seatIds, userId) {
  const pipeline = redis.pipeline();
  for (const seatId of seatIds) {
    const key = \`lock:\${showId}:\${seatId}\`;
    const existing = await redis.get(key);
    if (existing && existing !== userId) {
      throw new Error(\`Seat \${seatId} is being booked by another user\`);
    }
    pipeline.set(key, userId, 'EX', 300); // 5-minute TTL
  }
  await pipeline.exec();
}

async function releaseLocks(showId, seatIds) {
  const keys = seatIds.map(id => \`lock:\${showId}:\${id}\`);
  await redis.del(...keys);
}

// routes/bookings.js
router.post('/lock', auth, async (req, res) => {
  const { showId, seatIds } = req.body;
  try {
    await lockSeats(showId, seatIds, req.user.id);
    res.json({ locked: true, expiresIn: 300 });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});`,
    vivaQA: [
      { q: 'How does temporary seat locking prevent double-booking during checkout?', a: 'When a user selects seats, a Redis key per seat (lock:showId:seatId) is set with a 5-minute TTL and their user ID. Any concurrent request for the same seat checks for this key — if it exists with a different user ID, the request is rejected (409 Conflict). The lock auto-expires if payment isn\'t completed, releasing the seats.' },
      { q: 'What is Sequelize and how does it differ from Mongoose?', a: 'Sequelize is an ORM for relational databases (MySQL, PostgreSQL, SQLite). It uses tables, foreign keys, and SQL under the hood. Mongoose is an ODM for MongoDB (NoSQL). Sequelize enforces strict schemas and relations; Mongoose allows flexible, schema-less documents. Use Sequelize when data relationships are complex and transactional integrity matters.' },
      { q: 'What is a database transaction and why is it needed for ticket booking?', a: 'A transaction groups multiple database operations that must all succeed or all fail together (ACID properties). For ticket booking: (1) lock seats, (2) create booking record, (3) update seat status, (4) process payment. If step 4 fails, steps 1–3 must be rolled back to avoid selling seats without payment.' },
      { q: 'What is a Redis TTL and why is it used instead of a database timer?', a: 'TTL (Time to Live) is a Redis feature that automatically deletes a key after a specified number of seconds. It is used instead of a database cron job because: Redis operates in memory (microsecond latency), TTL deletion is atomic and guaranteed, and it avoids polling overhead. Perfect for short-lived lock states.' },
      { q: 'How would you generate and validate QR code tickets?', a: 'Generate a ticket token: JWT or HMAC-SHA256 of (bookingId + userId + showId). Store the token hash in the database. Generate a QR code image from the token using the qrcode library. At the venue, scan the QR, decode the token, verify the hash matches the database record, and mark the ticket as used to prevent reuse.' },
    ],
  },

  {
    id: 'restaurant-reservation',
    level: 'ug',
    title: 'Restaurant Table Reservation System',
    category: 'web',
    difficulty: 'Beginner',
    duration: '2-3 weeks',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Nodemailer'],
    summary: 'Customers browse the menu, reserve a table for a specific date/time and party size, and get a confirmation email — while restaurant staff manage bookings from a dashboard.',
    description: `A complete restaurant reservation web app where customers can view the restaurant menu, check table availability, book a table for a specific date, time, and party size, and instantly receive a booking confirmation via email.

The restaurant staff dashboard shows all reservations, allows walk-in table assignment, and lets staff update booking status (seated, completed, no-show). The project demonstrates full-stack MERN development with a clean, practical use case perfect for a final year project.`,
    steps: [
      'Set up MongoDB schemas: Table, Reservation, MenuItem',
      'Build availability API (check if tables free for date/time/party)',
      'Create customer booking form (date picker, time, party size)',
      'Send confirmation email with booking details via Nodemailer',
      'Build staff dashboard for managing reservations',
      'Add reservation cancellation with email notification',
    ],
    sourceCode: `// models/Reservation.js
const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  customer: {
    name:  { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  table:       { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  date:        { type: Date, required: true },
  time:        { type: String, required: true },   // "19:30"
  partySize:   { type: Number, required: true },
  specialNote: { type: String },
  status:      {
    type: String,
    enum: ['confirmed','seated','completed','cancelled','no-show'],
    default: 'confirmed'
  },
  confirmCode: { type: String, unique: true },
}, { timestamps: true });
module.exports = mongoose.model('Reservation', ReservationSchema);

// routes/reservations.js
const nodemailer = require('nodemailer');
const crypto     = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

router.post('/', async (req, res) => {
  const { customerName, email, phone, date, time, partySize, note } = req.body;

  // Find an available table
  const bookedTables = await Reservation.distinct('table', {
    date: new Date(date), time, status: { $ne: 'cancelled' }
  });

  const table = await Table.findOne({
    _id:      { $nin: bookedTables },
    capacity: { $gte: partySize },
  }).sort('capacity');

  if (!table) return res.status(400).json({ error: 'No tables available for this time slot.' });

  const confirmCode = crypto.randomBytes(4).toString('hex').toUpperCase();

  const reservation = await Reservation.create({
    customer: { name: customerName, email, phone },
    table: table._id, date, time, partySize,
    specialNote: note, confirmCode,
  });

  await transporter.sendMail({
    from: '"The Restaurant" <noreply@restaurant.com>',
    to:   email,
    subject: \`Reservation Confirmed — \${confirmCode}\`,
    html: \`<h2>Hi \${customerName}!</h2>
           <p>Your table for <b>\${partySize}</b> is confirmed for
           <b>\${new Date(date).toDateString()}</b> at <b>\${time}</b>.</p>
           <p>Confirmation Code: <b>\${confirmCode}</b></p>
           <p>To cancel: reply to this email or call us.</p>\`,
  });

  res.status(201).json({ reservation, confirmCode });
});`,
    vivaQA: [
      { q: 'How do you check table availability for a given time slot?', a: 'Query the Reservation collection for all non-cancelled bookings on the same date and time to get a list of booked table IDs. Then query the Table collection for tables NOT in that list whose capacity is >= the requested party size. Sort by capacity ascending to assign the smallest fitting table (efficient use of tables).' },
      { q: 'What is Nodemailer and how does it send emails?', a: 'Nodemailer is a Node.js library for sending emails. It connects to an SMTP server (Gmail, SendGrid, AWS SES) using credentials, composes an email (from, to, subject, html body), and delivers it. For production, use an email service like SendGrid rather than Gmail (which has low send limits and security restrictions).' },
      { q: 'What is crypto.randomBytes() and why use it for confirmation codes?', a: 'crypto.randomBytes(n) generates n cryptographically random bytes from the OS entropy source. Converting to hex gives a random string. It\'s used for confirmation codes because it\'s unpredictable (unlike Math.random()), preventing customers from guessing others\' codes to cancel or manipulate their reservations.' },
      { q: 'How would you handle time zones for reservations?', a: 'Store all datetimes in UTC in MongoDB. Accept reservation time as a combination of a local date and time string plus the restaurant\'s timezone (e.g., "Asia/Kolkata"). Convert to UTC before storing using a library like Luxon or date-fns-tz. Display times in the customer\'s local timezone on the frontend using the Intl.DateTimeFormat API.' },
      { q: 'What additional features would make this production-ready?', a: 'SMS confirmation via Twilio, Google Calendar integration, a floor map for drag-and-drop table assignment, waitlist management for fully-booked slots, analytics dashboard (occupancy rate, peak hours, no-show rate), online menu ordering integration, and POS system integration.' },
    ],
  },

  {
    id: 'unet-medical-segmentation',
    level: 'pg',
    title: 'Medical Image Segmentation with U-Net',
    category: 'ml',
    difficulty: 'Advanced',
    duration: '6-8 weeks',
    tech: ['Python', 'PyTorch', 'U-Net', 'OpenCV', 'albumentations', 'DICOM'],
    summary: 'Train a U-Net architecture to segment tumors or organs in medical images — a foundational task in medical AI used in clinical diagnosis.',
    description: `Medical image segmentation is one of the highest-impact applications of deep learning. U-Net (Ronneberger et al., 2015) is the dominant architecture — its encoder-decoder structure with skip connections allows precise pixel-level segmentation even with limited training data.

In this project you will train U-Net on the DRIVE retinal vessel dataset (or the Carvana dataset as an accessible alternative), implement IoU and Dice coefficient evaluation metrics, apply medical-grade data augmentation using albumentations, and generate segmentation masks with visual overlays.`,
    steps: [
      'Implement the U-Net architecture from scratch in PyTorch',
      'Load and preprocess the DRIVE dataset (TIFF/PNG medical images)',
      'Apply augmentations: random flips, elastic transform, color jitter',
      'Implement Dice loss and IoU metric for segmentation evaluation',
      'Train for 50 epochs with early stopping on validation Dice score',
      'Visualize predictions as color overlays on original images',
    ],
    sourceCode: `import torch
import torch.nn as nn

class DoubleConv(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
        )
    def forward(self, x): return self.conv(x)

class UNet(nn.Module):
    def __init__(self, in_channels=3, out_channels=1, features=[64,128,256,512]):
        super().__init__()
        self.downs = nn.ModuleList()
        self.ups   = nn.ModuleList()
        self.pool  = nn.MaxPool2d(2, 2)

        for f in features:
            self.downs.append(DoubleConv(in_channels, f))
            in_channels = f

        self.bottleneck = DoubleConv(features[-1], features[-1]*2)

        for f in reversed(features):
            self.ups.append(nn.ConvTranspose2d(f*2, f, 2, 2))
            self.ups.append(DoubleConv(f*2, f))

        self.final = nn.Conv2d(features[0], out_channels, 1)

    def forward(self, x):
        skips = []
        for down in self.downs:
            x = down(x); skips.append(x); x = self.pool(x)
        x = self.bottleneck(x)
        skips = skips[::-1]
        for i in range(0, len(self.ups), 2):
            x = self.ups[i](x)
            skip = skips[i//2]
            if x.shape != skip.shape:
                x = torch.nn.functional.interpolate(x, size=skip.shape[2:])
            x = self.ups[i+1](torch.cat([skip, x], dim=1))
        return self.final(x)

# Dice loss for segmentation
def dice_loss(pred, target, smooth=1e-6):
    pred   = torch.sigmoid(pred)
    inter  = (pred * target).sum(dim=(2,3))
    return 1 - (2*inter + smooth) / (pred.sum(dim=(2,3)) + target.sum(dim=(2,3)) + smooth)`,
    vivaQA: [
      { q: 'What is the U-Net architecture and what makes it suitable for medical imaging?', a: 'U-Net has an encoder (contracting path) that captures context through convolution and max-pooling, and a decoder (expansive path) that reconstructs spatial information through transposed convolutions. Skip connections concatenate encoder feature maps to decoder layers, preserving fine-grained spatial details lost during downsampling. This is critical in medical imaging where precise boundary delineation matters.' },
      { q: 'Why use Dice loss instead of Binary Cross-Entropy for segmentation?', a: 'Medical images are highly imbalanced — tumor pixels may represent less than 1% of the image. BCE treats each pixel independently and is dominated by the background class, causing the model to predict all-background (high accuracy, zero recall). Dice loss directly optimizes the overlap between prediction and ground truth, handling class imbalance naturally.' },
      { q: 'What are skip connections and what problem do they solve?', a: 'Skip connections directly link encoder layers to corresponding decoder layers by concatenation. During downsampling, spatial information (exact locations of edges, boundaries) is progressively lost. Skip connections bypass this loss by routing high-resolution feature maps from the encoder directly to the decoder, enabling precise localization.' },
      { q: 'What is the Dice coefficient?', a: 'Dice = 2 × |Prediction ∩ Ground Truth| / (|Prediction| + |Ground Truth|). It measures the overlap between predicted and true segmentation masks, ranging from 0 (no overlap) to 1 (perfect). It is equivalent to the F1-score applied to pixel-level binary classification.' },
      { q: 'What data augmentation techniques are appropriate for medical images?', a: 'Medical images require careful augmentation: random horizontal/vertical flips, random rotation (±30°), elastic deformation (realistic tissue deformation), random brightness/contrast, and Gaussian noise. Unlike natural images, vertical flips may be clinically meaningful (an upside-down chest X-ray), so augmentations should be clinically validated for each modality.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // COMING SOON — Stubs (all topics, 5 per navbar topic)
  // ══════════════════════════════════════════════════════════════════════════
  { id: "cs-ug-cnn-image-classification", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "3-4 weeks", title: "Image Classification with CNN", tech: ["Python","TensorFlow","Keras","OpenCV"], summary: "Build a CNN to classify images into multiple categories using the CIFAR-10 dataset.", topicTags: ["Deep Learning / CNN","Computer Vision"] },
  { id: "cs-ug-stock-lstm", comingSoon: true, level: "ug", category: "ml", difficulty: "Advanced", duration: "3-5 weeks", title: "Stock Price Forecasting with LSTM", tech: ["Python","TensorFlow","Pandas","yfinance"], summary: "Predict future stock prices using LSTM time-series models trained on historical market data.", topicTags: ["Deep Learning / CNN","Predictive Analytics"] },
  { id: "cs-ug-mnist-nn", comingSoon: true, level: "ug", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "Handwritten Digit Recognition (MNIST)", tech: ["Python","PyTorch","NumPy","Matplotlib"], summary: "Classify handwritten digits 0–9 from the MNIST dataset using a multi-layer neural network.", topicTags: ["Neural Networks","Deep Learning / CNN"] },
  { id: "cs-ug-market-basket", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "2-3 weeks", title: "Market Basket Analysis — Apriori", tech: ["Python","mlxtend","Pandas","Matplotlib"], summary: "Discover association rules between products in a retail dataset to recommend frequently bought-together items.", topicTags: ["Data Mining","Predictive Analytics"] },
  { id: "cs-ug-ml-05", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "3-4 weeks", title: "Transfer Learning with VGG16", tech: ["Python","TensorFlow","Keras","ImageNet"], summary: "Fine-tune VGG16 pretrained on ImageNet to classify a custom image dataset with fewer training samples.", topicTags: ["Deep Learning / CNN","Computer Vision"] },
  { id: "cs-ug-ml-06", comingSoon: true, level: "ug", category: "ml", difficulty: "Advanced", duration: "4-5 weeks", title: "Face Generation with DCGANs", tech: ["Python","PyTorch","NumPy","Matplotlib"], summary: "Build a Deep Convolutional GAN to synthesize realistic face images from random noise vectors.", topicTags: ["Deep Learning / CNN","Neural Networks"] },
  { id: "cs-ug-ml-07", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "3-4 weeks", title: "Real-Time Object Detection with YOLOv5", tech: ["Python","PyTorch","OpenCV","Roboflow"], summary: "Train YOLOv5 on a custom dataset and run real-time object detection on webcam or video streams.", topicTags: ["Computer Vision"] },
  { id: "cs-ug-ml-08", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "3-4 weeks", title: "Face Recognition Attendance System", tech: ["Python","face_recognition","OpenCV","SQLite"], summary: "Automatically mark attendance by recognising student faces from a live camera feed.", topicTags: ["Computer Vision"] },
  { id: "cs-ug-ml-09", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "2-3 weeks", title: "Hand Gesture Recognition using CNN", tech: ["Python","TensorFlow","MediaPipe","OpenCV"], summary: "Recognise hand gestures in real time to control a computer or trigger actions.", topicTags: ["Computer Vision"] },
  { id: "cs-ug-ml-10", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "3-4 weeks", title: "Chatbot with BERT Intent Classification", tech: ["Python","HuggingFace","Transformers","Flask"], summary: "Fine-tune BERT to classify user intents and build a smart FAQ chatbot with a REST API.", topicTags: ["Natural Language Processing"] },
  { id: "cs-ug-ml-11", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "3-4 weeks", title: "Automatic Text Summarization with T5", tech: ["Python","HuggingFace","Transformers","Pandas"], summary: "Fine-tune T5 to generate concise summaries of long articles using the CNN/DailyMail dataset.", topicTags: ["Natural Language Processing"] },
  { id: "cs-ug-ml-12", comingSoon: true, level: "ug", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "Spam Email Classifier with NLP", tech: ["Python","scikit-learn","NLTK","Pandas"], summary: "Build a Naive Bayes / SVM classifier using TF-IDF features to detect spam emails.", topicTags: ["Natural Language Processing"] },
  { id: "cs-ug-ml-13", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "2-3 weeks", title: "Named Entity Recognition (NER) with spaCy", tech: ["Python","spaCy","Pandas","Streamlit"], summary: "Extract people, organisations, and locations from news articles using spaCy NER and visualise results.", topicTags: ["Natural Language Processing"] },
  { id: "cs-ug-ml-14", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "2-3 weeks", title: "Twitter Sentiment Analysis Dashboard", tech: ["Python","Tweepy","VADER","Streamlit"], summary: "Stream tweets in real time, score sentiment with VADER, and display live charts in a Streamlit app.", topicTags: ["Natural Language Processing"] },
  { id: "cs-ug-ml-15", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "2-3 weeks", title: "Diabetes Risk Prediction with ML", tech: ["Python","scikit-learn","Pandas","Seaborn"], summary: "Train Random Forest & XGBoost models on the PIMA dataset to predict diabetes likelihood.", topicTags: ["Predictive Analytics"] },
  { id: "cs-ug-ml-16", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "2-3 weeks", title: "Customer Churn Prediction", tech: ["Python","XGBoost","scikit-learn","SHAP"], summary: "Predict which telecom customers will churn using gradient boosting and explain decisions with SHAP.", topicTags: ["Predictive Analytics"] },
  { id: "cs-ug-ml-17", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "2-3 weeks", title: "Credit Risk Scoring Model", tech: ["Python","scikit-learn","Pandas","Flask"], summary: "Build a logistic regression credit scoring model and serve predictions via a Flask API.", topicTags: ["Predictive Analytics"] },
  { id: "cs-ug-ml-18", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "3-4 weeks", title: "Autoencoder for Anomaly Detection", tech: ["Python","TensorFlow","Keras","Pandas"], summary: "Train an autoencoder on normal credit card transactions to flag anomalies as potential fraud.", topicTags: ["Neural Networks"] },
  { id: "cs-ug-ml-19", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "2-3 weeks", title: "BiLSTM Text Classification", tech: ["Python","TensorFlow","Keras","NLTK"], summary: "Classify news categories using a Bidirectional LSTM that captures context from both directions.", topicTags: ["Neural Networks"] },
  { id: "cs-ug-ml-20", comingSoon: true, level: "ug", category: "ml", difficulty: "Advanced", duration: "4-5 weeks", title: "Siamese Network for One-Shot Learning", tech: ["Python","PyTorch","Pandas","OpenCV"], summary: "Build a Siamese network to determine whether two images belong to the same class with minimal training data.", topicTags: ["Neural Networks"] },
  { id: "cs-ug-ml-21", comingSoon: true, level: "ug", category: "ml", difficulty: "Advanced", duration: "4-5 weeks", title: "Deep Q-Network (DQN) Game Agent", tech: ["Python","PyTorch","OpenAI Gym","NumPy"], summary: "Train a DQN agent to play CartPole and LunarLander using experience replay and target networks.", topicTags: ["Neural Networks"] },
  { id: "cs-ug-ml-22", comingSoon: true, level: "ug", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "Association Rule Mining for Retail", tech: ["Python","mlxtend","Pandas","Matplotlib"], summary: "Find frequent itemsets and association rules in a grocery dataset using FP-Growth algorithm.", topicTags: ["Data Mining"] },
  { id: "cs-ug-ml-23", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "2-3 weeks", title: "Customer Segmentation with K-Means", tech: ["Python","scikit-learn","Pandas","Seaborn"], summary: "Segment e-commerce customers by RFM features using K-Means and visualise clusters.", topicTags: ["Data Mining"] },
  { id: "cs-ug-ml-24", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "3-4 weeks", title: "Web Scraping & Analytics Pipeline", tech: ["Python","BeautifulSoup","Pandas","Selenium"], summary: "Scrape product data from an e-commerce site, clean it, and derive pricing insights.", topicTags: ["Data Mining"] },
  { id: "cs-ug-ml-25", comingSoon: true, level: "ug", category: "ml", difficulty: "Intermediate", duration: "3-4 weeks", title: "Collaborative Filtering Recommendation Engine", tech: ["Python","Surprise","Pandas","Flask"], summary: "Build a movie recommendation system using SVD collaborative filtering on the MovieLens dataset.", topicTags: ["Data Mining"] },
  { id: "cs-ug-react-portfolio", comingSoon: true, level: "ug", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "Developer Portfolio Website with React", tech: ["React","Tailwind CSS","Framer Motion","Vite"], summary: "A responsive single-page portfolio site with animated sections, a project showcase, and a contact form.", topicTags: ["React / Frontend"] },
  { id: "cs-ug-node-restapi", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "RESTful API with Node.js, Express & JWT", tech: ["Node.js","Express","MongoDB","JWT"], summary: "Build a production-ready REST API with authentication, role-based access, and CRUD operations.", topicTags: ["Node.js / Backend","REST APIs"] },
  { id: "cs-ug-php-blog", comingSoon: true, level: "ug", category: "web", difficulty: "Beginner", duration: "2-3 weeks", title: "Blog Platform with PHP & MySQL", tech: ["PHP","MySQL","HTML/CSS","Bootstrap"], summary: "A classic blog CMS where admins write and publish posts, and visitors can read and comment.", topicTags: ["PHP & MySQL"] },
  { id: "cs-ug-django-inventory", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "3-4 weeks", title: "Inventory Management System with Django", tech: ["Python","Django","PostgreSQL","Bootstrap"], summary: "Track products, stock levels, suppliers, and sales reports in a Django-powered web application.", topicTags: ["Django / Flask"] },
  { id: "cs-ug-web-05", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "E-Commerce UI with React & Redux", tech: ["React","Redux Toolkit","Tailwind CSS","Axios"], summary: "Build a product listing, cart, and checkout UI with state management using Redux Toolkit.", topicTags: ["React / Frontend"] },
  { id: "cs-ug-web-06", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "Admin Dashboard with React & Chart.js", tech: ["React","Chart.js","React Router","REST API"], summary: "A data-rich admin panel with KPI tiles, bar/line charts, and a filterable table from a live API.", topicTags: ["React / Frontend"] },
  { id: "cs-ug-web-07", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "3-4 weeks", title: "Real-Time Collaboration Whiteboard (React + WS)", tech: ["React","Socket.io","Canvas API","Node.js"], summary: "A shared drawing canvas where multiple users see each other's strokes in real time via WebSockets.", topicTags: ["React / Frontend"] },
  { id: "cs-ug-web-08", comingSoon: true, level: "ug", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "News Aggregator SPA with React", tech: ["React","RSS Parser","Vite","Tailwind CSS"], summary: "Fetch and display news from multiple RSS feeds, filter by category, and save bookmarks locally.", topicTags: ["React / Frontend"] },
  { id: "cs-ug-web-09", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "Express.js Auth Microservice", tech: ["Node.js","Express","JWT","bcrypt","Redis"], summary: "Standalone authentication service with register, login, token refresh, and Redis session blacklist.", topicTags: ["Node.js / Backend"] },
  { id: "cs-ug-web-10", comingSoon: true, level: "ug", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "File Upload Server with Node.js & Multer", tech: ["Node.js","Multer","Express","AWS S3"], summary: "Accept file uploads via REST, validate types/sizes, and store to S3 with signed URL generation.", topicTags: ["Node.js / Backend"] },
  { id: "cs-ug-web-11", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "Real-Time Notification Service (Node + SSE)", tech: ["Node.js","Express","Server-Sent Events","MongoDB"], summary: "Push live notifications to connected clients using Server-Sent Events without WebSocket overhead.", topicTags: ["Node.js / Backend"] },
  { id: "cs-ug-web-12", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "Job Board API with Node.js & PostgreSQL", tech: ["Node.js","Express","PostgreSQL","pg"], summary: "Full CRUD API for job listings with search, filters, pagination, and employer/applicant roles.", topicTags: ["Node.js / Backend"] },
  { id: "cs-ug-web-13", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "3-4 weeks", title: "MERN Stack Blog Platform", tech: ["MongoDB","Express","React","Node.js"], summary: "Full-featured blog with WYSIWYG editor, tags, comments, likes, and author dashboards.", topicTags: ["Full-Stack MERN"] },
  { id: "cs-ug-web-14", comingSoon: true, level: "ug", category: "web", difficulty: "Beginner", duration: "2-3 weeks", title: "Expense Tracker — MERN", tech: ["MongoDB","Express","React","Node.js","Chart.js"], summary: "Track income and expenses, categorise transactions, and visualise monthly spending with charts.", topicTags: ["Full-Stack MERN"] },
  { id: "cs-ug-web-15", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "3-4 weeks", title: "Task Management App with MERN", tech: ["MongoDB","Express","React","Node.js","Socket.io"], summary: "Kanban board with drag-and-drop, real-time updates, user assignments, and deadline alerts.", topicTags: ["Full-Stack MERN"] },
  { id: "cs-ug-web-16", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "4-5 weeks", title: "Hospital Management System — MERN", tech: ["MongoDB","Express","React","Node.js","JWT"], summary: "Manage patients, doctors, appointments, billing, and lab reports in a full-stack MERN app.", topicTags: ["Full-Stack MERN"] },
  { id: "cs-ug-web-17", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "3-4 weeks", title: "Gym Management System — MERN", tech: ["MongoDB","Express","React","Node.js"], summary: "Member registration, subscription plans, attendance tracking, and trainer assignment portal.", topicTags: ["Full-Stack MERN"] },
  { id: "cs-ug-web-18", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "GraphQL vs REST API Comparison", tech: ["Node.js","Apollo Server","Express","MongoDB"], summary: "Implement the same data model twice — once with REST and once with GraphQL — and benchmark them.", topicTags: ["REST APIs"] },
  { id: "cs-ug-web-19", comingSoon: true, level: "ug", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "Weather REST API Integration", tech: ["Node.js","Express","OpenWeather API","Redis"], summary: "Proxy and cache OpenWeatherMap responses, add rate-limiting, and expose a clean REST endpoint.", topicTags: ["REST APIs"] },
  { id: "cs-ug-web-20", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "Library REST API with Swagger Docs", tech: ["Node.js","Express","MongoDB","Swagger"], summary: "Full CRUD REST API for books and members with auto-generated Swagger/OpenAPI documentation.", topicTags: ["REST APIs"] },
  { id: "cs-ug-web-21", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "OAuth2 & JWT Authentication API", tech: ["Node.js","Passport.js","JWT","MongoDB"], summary: "Implement Google/GitHub OAuth2 social login alongside traditional JWT auth in a single API.", topicTags: ["REST APIs"] },
  { id: "cs-ug-web-22", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "Hotel Booking Site with PHP & MySQL", tech: ["PHP","MySQL","Bootstrap","PDO"], summary: "Browse rooms, check availability by date, and make reservations with admin confirmation flow.", topicTags: ["PHP & MySQL"] },
  { id: "cs-ug-web-23", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "3-4 weeks", title: "College ERP in PHP & MySQL", tech: ["PHP","MySQL","Bootstrap","Chart.php"], summary: "Manage students, staff, timetables, marks, and fee records in a full college ERP system.", topicTags: ["PHP & MySQL"] },
  { id: "cs-ug-web-24", comingSoon: true, level: "ug", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "Online Quiz System with PHP", tech: ["PHP","MySQL","Bootstrap","jQuery"], summary: "Admin creates quizzes with timed questions; students take tests and get instant score reports.", topicTags: ["PHP & MySQL"] },
  { id: "cs-ug-web-25", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "E-Commerce Cart with PHP & MySQL", tech: ["PHP","MySQL","Bootstrap","Razorpay"], summary: "Product catalogue, shopping cart with session, checkout, and Razorpay payment integration.", topicTags: ["PHP & MySQL"] },
  { id: "cs-ug-web-26", comingSoon: true, level: "ug", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "Todo App with Django REST Framework", tech: ["Python","Django","DRF","React"], summary: "Classic todo CRUD built as a DRF API consumed by a React frontend — full-stack starter.", topicTags: ["Django / Flask"] },
  { id: "cs-ug-web-27", comingSoon: true, level: "ug", category: "web", difficulty: "Beginner", duration: "2-3 weeks", title: "Flask Blog with SQLAlchemy & Jinja2", tech: ["Python","Flask","SQLAlchemy","Jinja2"], summary: "A multi-user blog where authors write Markdown posts rendered with syntax highlighting.", topicTags: ["Django / Flask"] },
  { id: "cs-ug-web-28", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "3-4 weeks", title: "Django Online Learning Platform", tech: ["Python","Django","PostgreSQL","Celery"], summary: "Course catalogue with video lessons, quizzes, progress tracking, and certificate generation.", topicTags: ["Django / Flask"] },
  { id: "cs-ug-web-29", comingSoon: true, level: "ug", category: "web", difficulty: "Intermediate", duration: "2-3 weeks", title: "Flask ML Prediction API", tech: ["Python","Flask","scikit-learn","Gunicorn"], summary: "Wrap a trained sklearn model in a Flask REST API with input validation and JSON responses.", topicTags: ["Django / Flask"] },
  { id: "cs-ug-covid-analysis", comingSoon: true, level: "ug", category: "data", difficulty: "Beginner", duration: "1-2 weeks", title: "COVID-19 Global Trend Analysis", tech: ["Python","Pandas","Matplotlib","Seaborn"], summary: "Analyze global COVID-19 case, death, and vaccination trends with interactive visualizations.", topicTags: ["Data Analytics"] },
  { id: "cs-ug-sales-dashboard", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "Interactive Sales Dashboard (Plotly & Dash)", tech: ["Python","Plotly","Dash","Pandas"], summary: "Build a live, filterable business dashboard showing KPIs, trend charts, and regional breakdowns.", topicTags: ["Data Visualization","Business Intelligence"] },
  { id: "cs-ug-regression-comparison", comingSoon: true, level: "ug", category: "data", difficulty: "Beginner", duration: "1-2 weeks", title: "Regression Analysis — Linear vs Polynomial", tech: ["Python","scikit-learn","Matplotlib","NumPy"], summary: "Compare linear and polynomial regression on real datasets and understand underfitting vs overfitting.", topicTags: ["Statistical Modelling"] },
  { id: "cs-ug-hr-attrition", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "HR Employee Attrition Analysis", tech: ["Python","Pandas","scikit-learn","Seaborn"], summary: "Predict which employees are likely to leave using ML on the IBM HR Analytics dataset.", topicTags: ["EDA & Feature Engineering"] },
  { id: "cs-ug-data-05", comingSoon: true, level: "ug", category: "data", difficulty: "Beginner", duration: "1-2 weeks", title: "E-Commerce Sales Analytics", tech: ["Python","Pandas","Matplotlib","Jupyter"], summary: "Analyse order data to find top products, peak seasons, and revenue trends using pandas groupby.", topicTags: ["Data Analytics"] },
  { id: "cs-ug-data-06", comingSoon: true, level: "ug", category: "data", difficulty: "Beginner", duration: "1-2 weeks", title: "Netflix Movie Dataset Analysis", tech: ["Python","Pandas","Seaborn","WordCloud"], summary: "Explore Netflix titles by genre, rating, country, and year — uncover viewing patterns with charts.", topicTags: ["Data Analytics"] },
  { id: "cs-ug-data-07", comingSoon: true, level: "ug", category: "data", difficulty: "Beginner", duration: "1-2 weeks", title: "Uber Ride Data Analytics", tech: ["Python","Pandas","Folium","Matplotlib"], summary: "Analyse Uber pickup data to find peak hours, busiest zones, and weekly demand patterns.", topicTags: ["Data Analytics"] },
  { id: "cs-ug-data-08", comingSoon: true, level: "ug", category: "data", difficulty: "Beginner", duration: "1-2 weeks", title: "IPL Cricket Data Analysis", tech: ["Python","Pandas","Matplotlib","Seaborn"], summary: "Explore player performance, team win rates, and toss effects in IPL seasons data.", topicTags: ["Data Analytics"] },
  { id: "cs-ug-data-09", comingSoon: true, level: "ug", category: "data", difficulty: "Beginner", duration: "1-2 weeks", title: "Stock Market Visualisation with Matplotlib", tech: ["Python","yfinance","Matplotlib","mplfinance"], summary: "Plot candlestick charts, moving averages, and volume histograms for any stock ticker.", topicTags: ["Data Visualization"] },
  { id: "cs-ug-data-10", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "World Population Treemap with Plotly", tech: ["Python","Plotly","Pandas","Gapminder"], summary: "Create interactive treemaps and choropleth maps of world population trends over decades.", topicTags: ["Data Visualization"] },
  { id: "cs-ug-data-11", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "Animated Gapminder Chart (Plotly Express)", tech: ["Python","Plotly Express","Pandas"], summary: "Recreate the famous animated bubble chart showing life expectancy vs GDP over 60 years.", topicTags: ["Data Visualization"] },
  { id: "cs-ug-data-12", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "Geospatial Heatmap with Folium", tech: ["Python","Folium","Pandas","GeoPandas"], summary: "Map crime, property, or health data on an interactive leaflet heatmap with drill-down tooltips.", topicTags: ["Data Visualization"] },
  { id: "cs-ug-data-13", comingSoon: true, level: "ug", category: "data", difficulty: "Beginner", duration: "1-2 weeks", title: "Titanic Dataset EDA", tech: ["Python","Pandas","Seaborn","Matplotlib"], summary: "Explore the Titanic dataset to find survival patterns by class, sex, age, and embarkation point.", topicTags: ["EDA & Feature Engineering"] },
  { id: "cs-ug-data-14", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "House Price Feature Engineering", tech: ["Python","Pandas","scikit-learn","XGBoost"], summary: "Create new features, handle missing values, and encode categoricals to maximise model accuracy.", topicTags: ["EDA & Feature Engineering"] },
  { id: "cs-ug-data-15", comingSoon: true, level: "ug", category: "data", difficulty: "Beginner", duration: "1-2 weeks", title: "Zomato Restaurant EDA", tech: ["Python","Pandas","Seaborn","WordCloud"], summary: "Explore Zomato listings by cuisine, cost, ratings, and online ordering trends with visualisations.", topicTags: ["EDA & Feature Engineering"] },
  { id: "cs-ug-data-16", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "Missing Value Imputation Strategies", tech: ["Python","scikit-learn","Pandas","MissingNo"], summary: "Compare mean, median, KNN, and MICE imputation methods on a real dataset with missing patterns.", topicTags: ["EDA & Feature Engineering"] },
  { id: "cs-ug-data-17", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "Hypothesis Testing on A/B Test Data", tech: ["Python","SciPy","Pandas","Seaborn"], summary: "Perform t-tests, chi-squared tests, and effect size calculations on real A/B experiment results.", topicTags: ["Statistical Modelling"] },
  { id: "cs-ug-data-18", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "ARIMA Time Series Forecasting", tech: ["Python","statsmodels","Pandas","Matplotlib"], summary: "Fit ARIMA/SARIMA models to monthly sales data, diagnose residuals, and forecast 6 months ahead.", topicTags: ["Statistical Modelling"] },
  { id: "cs-ug-data-19", comingSoon: true, level: "ug", category: "data", difficulty: "Beginner", duration: "1-2 weeks", title: "Logistic Regression from Scratch", tech: ["Python","NumPy","Matplotlib","Pandas"], summary: "Implement logistic regression with gradient descent without sklearn to understand the maths.", topicTags: ["Statistical Modelling"] },
  { id: "cs-ug-data-20", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "SVM Classification & Kernel Trick", tech: ["Python","scikit-learn","Matplotlib","NumPy"], summary: "Compare linear, RBF, and polynomial SVM kernels on non-linearly separable datasets.", topicTags: ["Statistical Modelling"] },
  { id: "cs-ug-data-21", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "Power BI Sales Dashboard", tech: ["Power BI","DAX","Excel","SQL"], summary: "Build an executive sales dashboard with slicers, KPIs, and drill-through pages in Power BI.", topicTags: ["Business Intelligence"] },
  { id: "cs-ug-data-22", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "Tableau Customer Analytics Dashboard", tech: ["Tableau","Excel","SQL"], summary: "Visualise customer lifetime value, churn segments, and cohort retention in Tableau Public.", topicTags: ["Business Intelligence"] },
  { id: "cs-ug-data-23", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "2-3 weeks", title: "KPI Reporting App with Python & Dash", tech: ["Python","Dash","Plotly","Pandas"], summary: "Build a configurable KPI dashboard that reads from a CSV/DB and renders cards, gauges, and trendlines.", topicTags: ["Business Intelligence"] },
  { id: "cs-ug-data-24", comingSoon: true, level: "ug", category: "data", difficulty: "Intermediate", duration: "3-4 weeks", title: "Retail BI System with Apache Superset", tech: ["Apache Superset","PostgreSQL","dbt","SQL"], summary: "Set up Superset, connect to a retail database, build semantic layer with dbt, and publish reports.", topicTags: ["Business Intelligence"] },
  { id: "cs-ug-rpi-energy", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Smart Home Energy Monitor (Raspberry Pi)", tech: ["Raspberry Pi","Python","InfluxDB","Grafana"], summary: "Monitor home power consumption in real time with current sensors and a Grafana dashboard.", topicTags: ["Raspberry Pi","Home Automation"] },
  { id: "cs-ug-voice-home", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Voice-Controlled Home Automation", tech: ["Raspberry Pi","Python","speech_recognition","GPIO"], summary: "Control household appliances using voice commands processed locally on a Raspberry Pi.", topicTags: ["Home Automation"] },
  { id: "cs-ug-pulse-monitor", comingSoon: true, level: "ug", category: "iot", difficulty: "Beginner", duration: "2-3 weeks", title: "Pulse Rate Monitor with Arduino", tech: ["Arduino","Pulse Sensor","LCD","Processing"], summary: "Build a wearable heart rate monitor that displays BPM on an LCD and alerts on abnormal values.", topicTags: ["Arduino Projects","Wearables"] },
  { id: "cs-ug-iot-04", comingSoon: true, level: "ug", category: "iot", difficulty: "Beginner", duration: "1-2 weeks", title: "LED Matrix Scrolling Display (Arduino)", tech: ["Arduino","MAX7219","LED Matrix","C++"], summary: "Scroll text and patterns on an 8×8 LED matrix driven by MAX7219 shift registers via SPI.", topicTags: ["Arduino Projects"] },
  { id: "cs-ug-iot-05", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "2-3 weeks", title: "Smart Parking System (Arduino + Servo)", tech: ["Arduino","IR Sensor","Servo","LCD"], summary: "Count available parking slots with IR sensors and raise/lower a servo barrier gate automatically.", topicTags: ["Arduino Projects"] },
  { id: "cs-ug-iot-06", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Line Follower Robot (Arduino)", tech: ["Arduino","IR Array Sensor","L298N","DC Motors"], summary: "Build a robot that follows a black line on white surface using PID control for smooth tracking.", topicTags: ["Arduino Projects"] },
  { id: "cs-ug-iot-07", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "2-3 weeks", title: "RFID Door Lock System (Arduino)", tech: ["Arduino","MFRC522","Servo","LCD"], summary: "Grant or deny entry based on RFID card UIDs stored in EEPROM — like a mini access control system.", topicTags: ["Arduino Projects"] },
  { id: "cs-ug-iot-08", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Raspberry Pi Security Camera", tech: ["Raspberry Pi","Python","OpenCV","Telegram Bot"], summary: "Detect motion with a Pi Camera, capture snapshots, and send Telegram alerts to your phone.", topicTags: ["Raspberry Pi"] },
  { id: "cs-ug-iot-09", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Pi-Hole Network Ad Blocker with Dashboard", tech: ["Raspberry Pi","Pi-Hole","Python","Grafana"], summary: "Set up Pi-Hole as a DNS ad blocker and build a Grafana dashboard showing blocked query stats.", topicTags: ["Raspberry Pi"] },
  { id: "cs-ug-iot-10", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "2-3 weeks", title: "Pi Weather Station with Sense HAT", tech: ["Raspberry Pi","Sense HAT","Python","InfluxDB"], summary: "Log temperature, humidity, pressure, and air quality from Sense HAT to InfluxDB with trend charts.", topicTags: ["Raspberry Pi"] },
  { id: "cs-ug-iot-11", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "2-3 weeks", title: "Retro Gaming Console with Raspberry Pi", tech: ["Raspberry Pi","RetroPie","Python","GPIO"], summary: "Build a hand-held retro console with RetroPie, custom 3D-printed case, and GPIO button controls.", topicTags: ["Raspberry Pi"] },
  { id: "cs-ug-iot-12", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Smart Light Control App + Relay", tech: ["NodeMCU","Python","Flask","React"], summary: "Control AC lights wirelessly via a web app — NodeMCU switches relay, Flask logs usage history.", topicTags: ["Home Automation"] },
  { id: "cs-ug-iot-13", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "2-3 weeks", title: "Automated Plant Watering System", tech: ["Arduino","Soil Sensor","Water Pump","Relay"], summary: "Monitor soil moisture and automatically trigger a pump when it drops below the set threshold.", topicTags: ["Home Automation"] },
  { id: "cs-ug-iot-14", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Smart Doorbell with Camera & Notification", tech: ["Raspberry Pi","Python","Telegram Bot","GPIO"], summary: "Detect door button press, capture a photo, and send an instant Telegram message with image.", topicTags: ["Home Automation"] },
  { id: "cs-ug-iot-15", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Drip Irrigation Controller with Soil Sensors", tech: ["Arduino","Soil Sensor","Relay","MQTT"], summary: "Automate field irrigation by comparing real-time soil moisture against crop-specific thresholds.", topicTags: ["Smart Agriculture"] },
  { id: "cs-ug-iot-16", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Greenhouse Climate Monitor (Temp/Humidity)", tech: ["Raspberry Pi","DHT22","Python","ThingSpeak"], summary: "Log and visualise greenhouse temperature and humidity; trigger fans and heaters automatically.", topicTags: ["Smart Agriculture"] },
  { id: "cs-ug-iot-17", comingSoon: true, level: "ug", category: "iot", difficulty: "Advanced", duration: "4-5 weeks", title: "Crop Disease Detection with Camera + ML", tech: ["Raspberry Pi","TFLite","OpenCV","Python"], summary: "Deploy a MobileNet classifier on Pi to detect leaf diseases from a camera stream in real time.", topicTags: ["Smart Agriculture"] },
  { id: "cs-ug-iot-18", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "2-3 weeks", title: "Animal Intrusion Alert for Farmland", tech: ["Arduino","PIR Sensor","GSM Module","Buzzer"], summary: "Detect animal movement at farm boundaries with PIR sensors and send SMS alerts via GSM.", topicTags: ["Smart Agriculture"] },
  { id: "cs-ug-iot-19", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Weather Predictor for Farm (IoT + ML)", tech: ["Raspberry Pi","BME280","Python","scikit-learn"], summary: "Collect micro-climate data with sensors and train a model to predict rain/sun the next day.", topicTags: ["Smart Agriculture"] },
  { id: "cs-ug-iot-20", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "2-3 weeks", title: "Fitness Band with Step Counter & BPM", tech: ["Arduino","MPU6050","Pulse Sensor","OLED"], summary: "Count daily steps with an accelerometer and display heart rate on an OLED wristband.", topicTags: ["Wearables"] },
  { id: "cs-ug-iot-21", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Fall Detection Alert for Elderly (MPU6050)", tech: ["Arduino","MPU6050","GSM Module","Python"], summary: "Detect sudden falls via accelerometer thresholds and send SMS emergency alerts automatically.", topicTags: ["Wearables"] },
  { id: "cs-ug-iot-22", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Smart Helmet with Accident Alert", tech: ["Arduino","MPU6050","Neo-6M GPS","GSM"], summary: "Detect a crash with IMU, record GPS coordinates, and send location to emergency contacts.", topicTags: ["Wearables"] },
  { id: "cs-ug-iot-23", comingSoon: true, level: "ug", category: "iot", difficulty: "Beginner", duration: "2-3 weeks", title: "UV Exposure Monitor Wristband", tech: ["Arduino","VEML6070","OLED","Buzzer"], summary: "Track cumulative UV index on a wristband and alert the user before sunburn threshold is reached.", topicTags: ["Wearables"] },
  { id: "cs-ug-iot-24", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "MQTT Temperature Dashboard (ESP32 + AWS IoT)", tech: ["ESP32","MQTT","AWS IoT Core","Python"], summary: "Publish sensor readings from ESP32 to AWS IoT Core via MQTT and visualise in a web dashboard.", topicTags: ["MQTT & Cloud IoT"] },
  { id: "cs-ug-iot-25", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Cloud-Connected Air Quality Monitor", tech: ["NodeMCU","MQ135","MQTT","ThingSpeak"], summary: "Stream CO2 and smoke sensor readings via MQTT to ThingSpeak and trigger alerts on thresholds.", topicTags: ["MQTT & Cloud IoT"] },
  { id: "cs-ug-iot-26", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Industrial Vibration Monitor with MQTT", tech: ["ESP32","MPU6050","MQTT","Grafana"], summary: "Detect equipment vibration anomalies in real time, publish to a broker, and alert on Grafana.", topicTags: ["MQTT & Cloud IoT"] },
  { id: "cs-ug-iot-27", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "2-3 weeks", title: "Smart Water Meter (NodeMCU + ThingSpeak)", tech: ["NodeMCU","Flow Sensor","MQTT","ThingSpeak"], summary: "Measure water consumption with a flow sensor, log to ThingSpeak via MQTT, and alert on overuse.", topicTags: ["MQTT & Cloud IoT"] },
  { id: "cs-ug-iot-28", comingSoon: true, level: "ug", category: "iot", difficulty: "Intermediate", duration: "3-4 weeks", title: "Vehicle Tracking with GPS & MQTT", tech: ["ESP32","Neo-6M GPS","MQTT","Leaflet.js"], summary: "Stream live GPS coordinates to a Node.js server via MQTT and render vehicle position on a map.", topicTags: ["MQTT & Cloud IoT"] },
  { id: "cs-ug-aes-encryption", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "AES File Encryption & Decryption Tool", tech: ["Python","PyCryptodome","Tkinter"], summary: "Encrypt and decrypt files using AES-256 with a password-derived key as a desktop GUI app.", topicTags: ["Cryptography"] },
  { id: "cs-ug-port-scanner", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "Port Scanner & Vulnerability Detector", tech: ["Python","socket","Nmap","threading"], summary: "Scan a target IP for open ports and banner-grab services — for authorised systems only.", topicTags: ["Network Security","Ethical Hacking"] },
  { id: "cs-ug-phishing-detector", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "Phishing URL Detector using ML", tech: ["Python","scikit-learn","XGBoost","Flask"], summary: "Train a classifier on URL features to detect phishing sites and serve predictions via API.", topicTags: ["Malware Analysis"] },
  { id: "cs-ug-sec-04", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "WiFi Packet Sniffer & Analyser", tech: ["Python","Scapy","Wireshark","socket"], summary: "Capture and decode 802.11 frames in monitor mode; extract SSIDs, MACs, and protocol types.", topicTags: ["Network Security"] },
  { id: "cs-ug-sec-05", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "SSL/TLS Certificate Checker", tech: ["Python","ssl","socket","requests"], summary: "Check expiry, cipher suites, and certificate chain validity for any HTTPS domain.", topicTags: ["Network Security"] },
  { id: "cs-ug-sec-06", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "3-4 weeks", title: "Firewall Rule Analyser (iptables)", tech: ["Python","iptables","Linux","Paramiko"], summary: "Parse iptables rules, flag redundant or conflicting entries, and suggest cleanup recommendations.", topicTags: ["Network Security"] },
  { id: "cs-ug-sec-07", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "3-4 weeks", title: "Honeypot Network Trap System", tech: ["Python","socket","logging","SQLite"], summary: "Deploy a low-interaction honeypot on common ports, log attacker IPs, and visualise attack maps.", topicTags: ["Network Security"] },
  { id: "cs-ug-sec-08", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "3-4 weeks", title: "Anomaly-Based IDS with Machine Learning", tech: ["Python","scikit-learn","Pandas","Scapy"], summary: "Train an Isolation Forest on network flow features to detect unusual traffic patterns in real time.", topicTags: ["Intrusion Detection System"] },
  { id: "cs-ug-sec-09", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "Snort Signature-Based IDS Lab", tech: ["Snort","Python","Wireshark","Kali Linux"], summary: "Configure Snort rules to detect port scans, SQL injection, and DoS patterns in a lab environment.", topicTags: ["Intrusion Detection System"] },
  { id: "cs-ug-sec-10", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "Log Analysis IDS with Python", tech: ["Python","Pandas","regex","ELK Stack"], summary: "Parse Apache/Nginx access logs to flag brute-force, path traversal, and scanning attempts.", topicTags: ["Intrusion Detection System"] },
  { id: "cs-ug-sec-11", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "3-4 weeks", title: "DDoS Detection via Traffic Analytics", tech: ["Python","Scapy","scikit-learn","Pandas"], summary: "Detect volumetric DDoS attacks by classifying packet rate bursts using ML on live traffic.", topicTags: ["Intrusion Detection System"] },
  { id: "cs-ug-sec-12", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "SSH Brute-Force Detection with fail2ban", tech: ["Python","fail2ban","Pandas","systemd"], summary: "Analyse SSH auth logs, flag brute-force IPs, auto-ban via fail2ban, and send alert emails.", topicTags: ["Intrusion Detection System"] },
  { id: "cs-ug-sec-13", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "RSA Encryption from Scratch in Python", tech: ["Python","NumPy","math"], summary: "Implement RSA key generation, encryption, and decryption from first principles without libraries.", topicTags: ["Cryptography"] },
  { id: "cs-ug-sec-14", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "Password Manager with AES & PBKDF2", tech: ["Python","PyCryptodome","SQLite","Tkinter"], summary: "Securely store and retrieve passwords encrypted with AES-256 and a PBKDF2-stretched master key.", topicTags: ["Cryptography"] },
  { id: "cs-ug-sec-15", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "Digital Signature Tool (ECDSA)", tech: ["Python","cryptography","FastAPI"], summary: "Sign documents and verify authenticity using ECDSA — build a REST API for signature workflows.", topicTags: ["Cryptography"] },
  { id: "cs-ug-sec-16", comingSoon: true, level: "ug", category: "security", difficulty: "Beginner", duration: "1-2 weeks", title: "File Integrity Monitor (SHA-256)", tech: ["Python","hashlib","SQLite","schedule"], summary: "Hash all files in a directory at baseline; alert when any hash changes on subsequent scans.", topicTags: ["Cryptography"] },
  { id: "cs-ug-sec-17", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "3-4 weeks", title: "Web App Pen-Test Lab (DVWA)", tech: ["Kali Linux","Burp Suite","Python","DVWA"], summary: "Exploit OWASP Top-10 vulnerabilities in a controlled DVWA environment and write a pentest report.", topicTags: ["Ethical Hacking"] },
  { id: "cs-ug-sec-18", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "SQL Injection Attack & Defence Demo", tech: ["Python","Flask","SQLite","sqlmap"], summary: "Demonstrate SQL injection on a vulnerable Flask app, then patch it with parameterised queries.", topicTags: ["Ethical Hacking"] },
  { id: "cs-ug-sec-19", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "XSS Vulnerability Scanner", tech: ["Python","requests","BeautifulSoup","Selenium"], summary: "Scan a web application for reflected and stored XSS vulnerabilities with automated payloads.", topicTags: ["Ethical Hacking"] },
  { id: "cs-ug-sec-20", comingSoon: true, level: "ug", category: "security", difficulty: "Advanced", duration: "4-5 weeks", title: "Metasploit Vulnerability Assessment Lab", tech: ["Metasploit","Kali Linux","Nmap","Python"], summary: "Perform a full pentest cycle — recon, scan, exploit, post-exploit — on a Metasploitable target VM.", topicTags: ["Ethical Hacking"] },
  { id: "cs-ug-sec-21", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "3-4 weeks", title: "Static Malware Analysis with YARA Rules", tech: ["Python","YARA","pefile","Ghidra"], summary: "Write YARA rules to detect malware families and analyse PE headers and strings of suspicious binaries.", topicTags: ["Malware Analysis"] },
  { id: "cs-ug-sec-22", comingSoon: true, level: "ug", category: "security", difficulty: "Advanced", duration: "4-5 weeks", title: "Ransomware Detection using ML", tech: ["Python","scikit-learn","Pandas","Cuckoo"], summary: "Extract dynamic API call features from sandboxed samples to classify ransomware vs benign.", topicTags: ["Malware Analysis"] },
  { id: "cs-ug-sec-23", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "3-4 weeks", title: "Trojan Behaviour Analysis (API Calls)", tech: ["Python","Frida","Wireshark","Ghidra"], summary: "Trace system API calls of a trojan using Frida instrumentation and map them to MITRE ATT&CK.", topicTags: ["Malware Analysis"] },
  { id: "cs-ug-sec-24", comingSoon: true, level: "ug", category: "security", difficulty: "Intermediate", duration: "2-3 weeks", title: "Browser Extension Malware Detector", tech: ["Python","JavaScript","ChromeDriver","Selenium"], summary: "Analyse Chrome extension permissions and background scripts to flag over-privileged or malicious ones.", topicTags: ["Malware Analysis"] },
  { id: "cs-ug-android-quiz", comingSoon: true, level: "ug", category: "mobile", difficulty: "Beginner", duration: "2-3 weeks", title: "Quiz App for Android (Kotlin)", tech: ["Kotlin","Android Studio","SQLite","Material UI"], summary: "A multi-category quiz with timed questions, score tracking, and a leaderboard — built natively.", topicTags: ["Android (Java/Kotlin)"] },
  { id: "cs-ug-rn-food-delivery", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "4-5 weeks", title: "Food Delivery App with React Native", tech: ["React Native","Expo","Firebase","Redux"], summary: "Cross-platform food ordering app with restaurant listings, cart, order tracking, and auth.", topicTags: ["React Native","Firebase Backend"] },
  { id: "cs-ug-firebase-chat", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "2-3 weeks", title: "Real-Time Chat App with Firebase", tech: ["Flutter","Firebase","Firestore","Cloud Messaging"], summary: "WhatsApp-style chat with real-time messaging, online status, and push notifications.", topicTags: ["Flutter / Dart","Firebase Backend"] },
  { id: "cs-ug-offline-notes", comingSoon: true, level: "ug", category: "mobile", difficulty: "Beginner", duration: "2-3 weeks", title: "Notes App with Offline-First Sync", tech: ["React Native","SQLite","AsyncStorage","Expo"], summary: "Note-taking app that works fully offline and syncs to the cloud when connectivity returns.", topicTags: ["Offline-First Apps","React Native"] },
  { id: "cs-ug-mob-05", comingSoon: true, level: "ug", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "Flutter Expense Tracker", tech: ["Flutter","Dart","Hive","Provider"], summary: "Log income and expenses, categorise transactions, and view monthly spending charts in Flutter.", topicTags: ["Flutter / Dart"] },
  { id: "cs-ug-mob-06", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "2-3 weeks", title: "Flutter E-Commerce UI (GetX)", tech: ["Flutter","Dart","GetX","REST API"], summary: "Product catalogue, cart, wishlist, and checkout screens with GetX state management.", topicTags: ["Flutter / Dart"] },
  { id: "cs-ug-mob-07", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "3-4 weeks", title: "Flutter Fitness Tracker with Health Plugin", tech: ["Flutter","Dart","Health Plugin","Firebase"], summary: "Track steps, calories, and workouts using the device Health API with charts and weekly goals.", topicTags: ["Flutter / Dart"] },
  { id: "cs-ug-mob-08", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "3-4 weeks", title: "Flutter Movie Booking App", tech: ["Flutter","Dart","Firebase","Razorpay"], summary: "Browse movies, choose seats on an interactive layout, and pay with Razorpay integration.", topicTags: ["Flutter / Dart"] },
  { id: "cs-ug-mob-09", comingSoon: true, level: "ug", category: "mobile", difficulty: "Beginner", duration: "2-3 weeks", title: "Android Todo App (Room + Jetpack Compose)", tech: ["Kotlin","Room","Jetpack Compose","ViewModel"], summary: "Build a modern Android todo app using Room database and Jetpack Compose declarative UI.", topicTags: ["Android (Java/Kotlin)"] },
  { id: "cs-ug-mob-10", comingSoon: true, level: "ug", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "Android Weather App (Retrofit)", tech: ["Kotlin","Retrofit","OkHttp","MVVM"], summary: "Fetch weather data from OpenWeatherMap with Retrofit and display forecast in a clean MVVM app.", topicTags: ["Android (Java/Kotlin)"] },
  { id: "cs-ug-mob-11", comingSoon: true, level: "ug", category: "mobile", difficulty: "Beginner", duration: "2-3 weeks", title: "Android News Reader (RecyclerView)", tech: ["Kotlin","RecyclerView","Retrofit","Room"], summary: "Fetch news from RSS/API, display in a RecyclerView, and save articles offline with Room.", topicTags: ["Android (Java/Kotlin)"] },
  { id: "cs-ug-mob-12", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "3-4 weeks", title: "Android Camera App with Filters", tech: ["Kotlin","CameraX","RenderScript","OpenGL ES"], summary: "Capture photos with CameraX, apply real-time colour filters using RenderScript, and save to gallery.", topicTags: ["Android (Java/Kotlin)"] },
  { id: "cs-ug-mob-13", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "3-4 weeks", title: "React Native Social App (Redux Toolkit)", tech: ["React Native","Redux Toolkit","Firebase","Expo"], summary: "Photo-sharing social app with post feed, likes, comments, and Firebase Firestore backend.", topicTags: ["React Native"] },
  { id: "cs-ug-mob-14", comingSoon: true, level: "ug", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "React Native Blog Reader", tech: ["React Native","Expo","REST API","AsyncStorage"], summary: "Browse blog posts from a WordPress/Ghost API, save favourites offline with AsyncStorage.", topicTags: ["React Native"] },
  { id: "cs-ug-mob-15", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "2-3 weeks", title: "React Native Maps & Location App", tech: ["React Native","Expo","react-native-maps","Google Places"], summary: "Show nearby places on a map, get directions, and save favourite locations with geolocation.", topicTags: ["React Native"] },
  { id: "cs-ug-mob-16", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "2-3 weeks", title: "Firebase Realtime Quiz App", tech: ["Flutter","Firebase RTDB","Dart"], summary: "Multiplayer quiz where questions are served from Firebase Realtime Database with live scoring.", topicTags: ["Firebase Backend"] },
  { id: "cs-ug-mob-17", comingSoon: true, level: "ug", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "Firebase Auth + Firestore CRUD App", tech: ["Flutter","Firebase Auth","Firestore","Dart"], summary: "A simple notes app that authenticates with Firebase and stores/retrieves notes from Firestore.", topicTags: ["Firebase Backend"] },
  { id: "cs-ug-mob-18", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "2-3 weeks", title: "Firebase Push Notification System", tech: ["Flutter","FCM","Firebase Functions","Dart"], summary: "Send targeted push notifications via Firebase Cloud Messaging triggered by Firestore events.", topicTags: ["Firebase Backend"] },
  { id: "cs-ug-mob-19", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "2-3 weeks", title: "PouchDB Offline-First Shopping List", tech: ["React Native","PouchDB","CouchDB","Expo"], summary: "A shared shopping list that syncs peer-to-peer via CouchDB when online, works fully offline.", topicTags: ["Offline-First Apps"] },
  { id: "cs-ug-mob-20", comingSoon: true, level: "ug", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "SQLite Offline Journal with Auto-Sync", tech: ["Flutter","SQLite","Dart","REST API"], summary: "Personal diary that saves entries locally in SQLite and syncs to a REST backend when connected.", topicTags: ["Offline-First Apps"] },
  { id: "cs-ug-mob-21", comingSoon: true, level: "ug", category: "mobile", difficulty: "Intermediate", duration: "3-4 weeks", title: "Offline Map App (Mapbox Tile Cache)", tech: ["React Native","Mapbox","SQLite","Expo"], summary: "Download and cache map tiles for offline use — display routes and POIs without internet.", topicTags: ["Offline-First Apps"] },
  { id: "cs-ug-mob-22", comingSoon: true, level: "ug", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "Offline-First Student Marks App", tech: ["Flutter","Hive","Dart","REST API"], summary: "Teachers enter marks offline in Hive local storage; syncs to the server on reconnection.", topicTags: ["Offline-First Apps"] },
  { id: "cs-pg-transformer-forecast", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Time Series Forecasting with Transformer", tech: ["Python","PyTorch","HuggingFace","Pandas"], summary: "Apply Temporal Fusion Transformer to multi-horizon energy demand forecasting.", topicTags: ["Transformer & BERT Models"] },
  { id: "cs-pg-gnn-social", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "GNN for Social Network Analysis", tech: ["Python","PyTorch Geometric","NetworkX","DGL"], summary: "Use GNN to predict community membership and detect fake accounts in social graphs.", topicTags: ["Graph Neural Networks"] },
  { id: "cs-pg-rl-trading", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Reinforcement Learning for Algorithmic Trading", tech: ["Python","Stable-Baselines3","Gym","Pandas"], summary: "Train DQN/PPO agent for buy/sell decisions on stock data vs benchmark strategy.", topicTags: ["Reinforcement Learning"] },
  { id: "cs-pg-ml-04", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Federated Learning for Medical Imaging", tech: ["Python","PySyft","TensorFlow","Pandas"], summary: "Train a diagnostic model across simulated hospital nodes without sharing patient data centrally.", topicTags: ["Federated Learning"] },
  { id: "cs-pg-ml-05", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Federated NLP on Edge Devices", tech: ["Python","Flower","PyTorch","HuggingFace"], summary: "Fine-tune a text classifier across multiple edge clients using the Flower FL framework.", topicTags: ["Federated Learning"] },
  { id: "cs-pg-ml-06", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Federated Learning with Differential Privacy", tech: ["Python","Opacus","PySyft","PyTorch"], summary: "Add differential privacy noise to FL gradients to guarantee client-level privacy guarantees.", topicTags: ["Federated Learning"] },
  { id: "cs-pg-ml-07", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Cross-Silo FL for Financial Fraud Detection", tech: ["Python","Flower","XGBoost","Pandas"], summary: "Federated gradient boosting for fraud detection across bank silos — no raw data sharing.", topicTags: ["Federated Learning"] },
  { id: "cs-pg-ml-08", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "FL Smart Grid Energy Optimisation", tech: ["Python","Flower","TensorFlow","MQTT"], summary: "Optimise energy consumption across smart buildings using privacy-preserving federated RL.", topicTags: ["Federated Learning"] },
  { id: "cs-pg-ml-09", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "5-7 weeks", title: "BERT Fine-Tuning for Question Answering", tech: ["Python","HuggingFace","Transformers","SQuAD"], summary: "Fine-tune BERT on SQuAD v2 for extractive QA and serve a REST inference API with FastAPI.", topicTags: ["Transformer & BERT Models"] },
  { id: "cs-pg-ml-10", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "5-7 weeks", title: "GPT-2 Fine-Tuning for Domain Text", tech: ["Python","HuggingFace","Transformers","Pandas"], summary: "Fine-tune GPT-2 on legal/medical text to generate domain-specific content with low perplexity.", topicTags: ["Transformer & BERT Models"] },
  { id: "cs-pg-ml-11", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "4-6 weeks", title: "Document Classification with RoBERTa", tech: ["Python","HuggingFace","Transformers","scikit-learn"], summary: "Fine-tune RoBERTa on a multi-class document corpus with class-imbalance techniques.", topicTags: ["Transformer & BERT Models"] },
  { id: "cs-pg-ml-12", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "5-7 weeks", title: "Vision Transformer (ViT) Image Classification", tech: ["Python","PyTorch","timm","Pandas"], summary: "Train a ViT from scratch and compare patch-embedding approach vs CNN on ImageNet subset.", topicTags: ["Transformer & BERT Models"] },
  { id: "cs-pg-ml-13", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "GNN for Drug Discovery (Molecular Graphs)", tech: ["Python","RDKit","PyTorch Geometric","DGL"], summary: "Predict molecular properties using Message-Passing GNN on QM9 molecular graph dataset.", topicTags: ["Graph Neural Networks"] },
  { id: "cs-pg-ml-14", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Heterogeneous GNN for Recommendation", tech: ["Python","DGL","PyTorch","MovieLens"], summary: "Build a heterogeneous graph (user-item-tag) for collaborative filtering with RGCN layers.", topicTags: ["Graph Neural Networks"] },
  { id: "cs-pg-ml-15", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Temporal GNN for Traffic Prediction", tech: ["Python","PyTorch","STGCN","Pandas"], summary: "Model road networks as graphs with temporal edges to predict junction-level traffic flow.", topicTags: ["Graph Neural Networks"] },
  { id: "cs-pg-ml-15b", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "GNN-Based Fake News Detection", tech: ["Python","PyTorch Geometric","DGL","Pandas"], summary: "Model a news propagation graph and classify articles as real or fake using graph attention networks.", topicTags: ["Graph Neural Networks"] },
  { id: "cs-pg-ml-16", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "5-7 weeks", title: "RL for Robot Navigation (OpenAI Gym)", tech: ["Python","Stable-Baselines3","Gym","NumPy"], summary: "Train a PPO agent to navigate a 2D maze with obstacles using curriculum learning.", topicTags: ["Reinforcement Learning"] },
  { id: "cs-pg-ml-17", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Multi-Agent RL for Traffic Signal Control", tech: ["Python","SUMO","Ray RLlib","PyTorch"], summary: "Coordinate multiple traffic lights as cooperative agents to minimise city-wide waiting time.", topicTags: ["Reinforcement Learning"] },
  { id: "cs-pg-ml-18", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "5-6 weeks", title: "PPO Game-Playing Agent (Atari)", tech: ["Python","Stable-Baselines3","Gym","OpenCV"], summary: "Train a Proximal Policy Optimisation agent on Atari games using pixel observations.", topicTags: ["Reinforcement Learning"] },
  { id: "cs-pg-ml-19", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "RL for Supply Chain Optimisation", tech: ["Python","Ray RLlib","Gymnasium","Pandas"], summary: "Frame inventory replenishment as an MDP and train an SAC agent to minimise stockouts.", topicTags: ["Reinforcement Learning"] },
  { id: "cs-pg-ml-20", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "5-7 weeks", title: "YOLOv8 Custom Object Detector", tech: ["Python","Ultralytics","OpenCV","Roboflow"], summary: "Annotate a custom dataset, train YOLOv8, evaluate mAP, and deploy as a FastAPI endpoint.", topicTags: ["Advanced Computer Vision (YOLO)"] },
  { id: "cs-pg-ml-21", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "5-7 weeks", title: "Instance Segmentation with Mask R-CNN", tech: ["Python","Detectron2","COCO","PyTorch"], summary: "Train Mask R-CNN on a custom dataset for pixel-level instance segmentation.", topicTags: ["Advanced Computer Vision (YOLO)"] },
  { id: "cs-pg-ml-22", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Real-Time Face Anti-Spoofing Detection", tech: ["Python","PyTorch","OpenCV","FaceNet"], summary: "Detect presentation attacks (print/video) with a depth-estimation + texture analysis model.", topicTags: ["Advanced Computer Vision (YOLO)"] },
  { id: "cs-pg-ml-23", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Multi-Camera People Tracking System", tech: ["Python","DeepSORT","YOLOv8","OpenCV"], summary: "Re-identify pedestrians across non-overlapping cameras using appearance and motion cues.", topicTags: ["Advanced Computer Vision (YOLO)"] },
  { id: "cs-pg-ml-24", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Satellite Image Change Detection", tech: ["Python","PyTorch","Sentinel-2","rasterio"], summary: "Detect land-use changes between multi-date satellite images using Siamese U-Net.", topicTags: ["Advanced Computer Vision (YOLO)"] },
  { id: "cs-pg-ml-25", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Multilingual NLP Translation Pipeline", tech: ["Python","HuggingFace","Helsinki-NLP","FastAPI"], summary: "Fine-tune mBART for domain-specific low-resource translation and deploy a scalable API.", topicTags: ["Advanced NLP Pipelines"] },
  { id: "cs-pg-ml-26", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Knowledge Graph Extraction from Text", tech: ["Python","spaCy","Neo4j","HuggingFace"], summary: "Extract named entities and relations from documents and store them as a queryable knowledge graph.", topicTags: ["Advanced NLP Pipelines"] },
  { id: "cs-pg-ml-27", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "RAG-Based Question Answering System", tech: ["Python","LangChain","FAISS","HuggingFace"], summary: "Build a Retrieval-Augmented Generation pipeline over a PDF corpus with chunking and reranking.", topicTags: ["Advanced NLP Pipelines"] },
  { id: "cs-pg-ml-28", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "6-8 weeks", title: "Advanced Coreference Resolution Pipeline", tech: ["Python","AllenNLP","spaCy","HuggingFace"], summary: "Resolve pronouns and noun phrases to entities in legal/clinical documents using neural coref.", topicTags: ["Advanced NLP Pipelines"] },
  { id: "cs-pg-ml-29", comingSoon: true, level: "pg", category: "ml", difficulty: "Advanced", duration: "5-7 weeks", title: "Bias Detection in NLP Datasets", tech: ["Python","HuggingFace","Pandas","scikit-learn"], summary: "Measure gender, racial, and occupational biases in text corpora with debiasing techniques.", topicTags: ["Advanced NLP Pipelines"] },
  { id: "cs-pg-microservices", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "8-10 weeks", title: "Microservices Architecture with Docker & K8s", tech: ["Node.js","Docker","Kubernetes","RabbitMQ"], summary: "Decompose a monolith into microservices, containerise, and orchestrate with Kubernetes.", topicTags: ["Microservices & Kubernetes"] },
  { id: "cs-pg-fastapi-ml", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "4-6 weeks", title: "ML Model Serving API with FastAPI & Docker", tech: ["Python","FastAPI","Docker","Redis","Celery"], summary: "Production-grade REST API for ML predictions with async workers, caching, and monitoring.", topicTags: ["ML Model Serving (FastAPI)"] },
  { id: "cs-pg-graphql-saas", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "6-8 weeks", title: "Multi-Tenant SaaS with GraphQL & PostgreSQL", tech: ["Node.js","GraphQL","PostgreSQL","Prisma"], summary: "Multi-tenant SaaS platform with row-level security, subscription billing, and GraphQL API.", topicTags: ["GraphQL / Multi-Tenant SaaS"] },
  { id: "cs-pg-django-rest", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "4-5 weeks", title: "Django REST Framework — Advanced API Design", tech: ["Python","Django","DRF","Celery","Redis"], summary: "Scalable REST API with rate limiting, background tasks, full-text search, and API versioning.", topicTags: ["Django REST (Advanced)"] },
  { id: "cs-pg-web-05", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "6-8 weeks", title: "Service Mesh with Istio on Kubernetes", tech: ["Kubernetes","Istio","Prometheus","Grafana"], summary: "Add mTLS, circuit breaking, and distributed tracing to a microservices cluster using Istio.", topicTags: ["Microservices & Kubernetes"] },
  { id: "cs-pg-web-06", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "6-8 weeks", title: "Event-Driven Microservices with Kafka", tech: ["Node.js","Apache Kafka","Docker","PostgreSQL"], summary: "Build a saga pattern order system where services communicate exclusively via Kafka events.", topicTags: ["Microservices & Kubernetes"] },
  { id: "cs-pg-web-07", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "5-7 weeks", title: "Distributed Tracing with Jaeger & OpenTelemetry", tech: ["Node.js","Jaeger","OpenTelemetry","Docker"], summary: "Instrument microservices with OpenTelemetry and visualise traces, latency, and errors in Jaeger.", topicTags: ["Microservices & Kubernetes"] },
  { id: "cs-pg-web-08", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "5-7 weeks", title: "Blue-Green Deployment CI/CD Pipeline", tech: ["GitHub Actions","Docker","Kubernetes","Helm"], summary: "Automate zero-downtime blue-green deployments with Helm charts and GitHub Actions CI/CD.", topicTags: ["Microservices & Kubernetes"] },
  { id: "cs-pg-web-09", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "4-6 weeks", title: "Async ML Inference with Celery & Redis", tech: ["Python","FastAPI","Celery","Redis"], summary: "Queue long-running inference jobs with Celery, cache results in Redis, poll for completion.", topicTags: ["ML Model Serving (FastAPI)"] },
  { id: "cs-pg-web-10", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "4-6 weeks", title: "Model Monitoring API with MLflow", tech: ["Python","MLflow","FastAPI","Prometheus"], summary: "Track model drift, log predictions, and serve metrics from MLflow tracking server via API.", topicTags: ["ML Model Serving (FastAPI)"] },
  { id: "cs-pg-web-11", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "5-7 weeks", title: "A/B Testing Framework for ML Models", tech: ["Python","FastAPI","PostgreSQL","Grafana"], summary: "Serve two model variants, split traffic by percentage, log outcomes, and measure winner.", topicTags: ["ML Model Serving (FastAPI)"] },
  { id: "cs-pg-web-12", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "5-7 weeks", title: "Batch Inference Pipeline (FastAPI + Spark)", tech: ["Python","FastAPI","PySpark","Celery"], summary: "Schedule nightly batch scoring of millions of records with Spark and expose results via API.", topicTags: ["ML Model Serving (FastAPI)"] },
  { id: "cs-pg-web-13", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "5-7 weeks", title: "GraphQL Real-Time Subscriptions", tech: ["Node.js","GraphQL","Apollo","WebSocket"], summary: "Add live updates to a SaaS dashboard using GraphQL subscriptions over WebSocket.", topicTags: ["GraphQL / Multi-Tenant SaaS"] },
  { id: "cs-pg-web-14", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "5-7 weeks", title: "Role-Based Access Control in GraphQL", tech: ["Node.js","GraphQL","Casbin","JWT"], summary: "Field-level authorization where tenant admins, members, and guests see different schema fields.", topicTags: ["GraphQL / Multi-Tenant SaaS"] },
  { id: "cs-pg-web-15", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "5-7 weeks", title: "Stripe Billing Integration for SaaS", tech: ["Node.js","GraphQL","Stripe","PostgreSQL"], summary: "Free/Pro/Enterprise plans with Stripe Checkout, webhooks for subscription lifecycle events.", topicTags: ["GraphQL / Multi-Tenant SaaS"] },
  { id: "cs-pg-web-16", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "6-8 weeks", title: "White-Label SaaS with Subdomain Routing", tech: ["Next.js","PostgreSQL","Prisma","Vercel"], summary: "Each tenant gets a custom subdomain, isolated Postgres schema, and brandable theme.", topicTags: ["GraphQL / Multi-Tenant SaaS"] },
  { id: "cs-pg-web-17", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "4-6 weeks", title: "Django REST with Elasticsearch Search", tech: ["Python","Django","DRF","Elasticsearch"], summary: "Add full-text search, facets, and autocomplete to a Django REST API via Elasticsearch DSL.", topicTags: ["Django REST (Advanced)"] },
  { id: "cs-pg-web-18", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "4-5 weeks", title: "Django OAuth2 Social Auth & Multi-Factor", tech: ["Python","Django","OAuth2","TOTP"], summary: "Integrate Google/GitHub social login and TOTP two-factor authentication in a DRF project.", topicTags: ["Django REST (Advanced)"] },
  { id: "cs-pg-web-19", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "4-6 weeks", title: "Django Channels WebSocket API", tech: ["Python","Django","Channels","Redis"], summary: "Real-time bidirectional communication in Django using Channels and Redis channel layers.", topicTags: ["Django REST (Advanced)"] },
  { id: "cs-pg-web-20", comingSoon: true, level: "pg", category: "web", difficulty: "Advanced", duration: "4-5 weeks", title: "Multi-Language Django REST Platform", tech: ["Python","Django","DRF","i18n"], summary: "Internationalize a REST API — translated error messages, locale-aware dates, and content negotiation.", topicTags: ["Django REST (Advanced)"] },
  { id: "cs-pg-spark-bigdata", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "6-8 weeks", title: "Big Data Analytics with Apache Spark", tech: ["Apache Spark","PySpark","Hadoop","Hive"], summary: "Process a 10 GB+ dataset with Spark RDDs/DataFrames and build an ML pipeline with MLlib.", topicTags: ["Big Data with Apache Spark"] },
  { id: "cs-pg-bayesian", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-6 weeks", title: "Bayesian Statistical Inference with PyMC", tech: ["Python","PyMC","ArviZ","NumPy"], summary: "Apply Bayesian methods with MCMC sampling to model uncertainty in A/B tests and trials.", topicTags: ["Bayesian Statistical Inference"] },
  { id: "cs-pg-etl-pipeline", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-7 weeks", title: "ETL Pipeline — Airflow + dbt", tech: ["Apache Airflow","dbt","PostgreSQL","Metabase"], summary: "Scheduled ETL from raw CSV to cleaned data warehouse with dbt models and Airflow DAGs.", topicTags: ["ETL & Data Pipelines (Airflow)"] },
  { id: "cs-pg-realtime-analytics", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "6-8 weeks", title: "Real-Time Streaming Analytics (Kafka & Flink)", tech: ["Apache Kafka","Apache Flink","Python","Elasticsearch"], summary: "Stream clickstream events through Kafka, process with Flink, visualise in Kibana dashboards.", topicTags: ["Real-Time Streaming (Kafka)"] },
  { id: "cs-pg-data-05", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "6-8 weeks", title: "Delta Lake Data Lakehouse on AWS", tech: ["Apache Spark","Delta Lake","AWS S3","Databricks"], summary: "Build a lakehouse with Delta Lake ACID transactions, time travel, and schema enforcement.", topicTags: ["Big Data with Apache Spark"] },
  { id: "cs-pg-data-06", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-7 weeks", title: "Spark Structured Streaming ETL", tech: ["Apache Spark","Kafka","Delta Lake","PySpark"], summary: "Ingest Kafka events into Delta tables with Spark Structured Streaming and upsert semantics.", topicTags: ["Big Data with Apache Spark"] },
  { id: "cs-pg-data-07", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-6 weeks", title: "Distributed ML Pipeline with Spark MLlib", tech: ["PySpark","MLlib","Hadoop","Python"], summary: "Train a gradient-boosted tree on a 50 million row dataset using Spark MLlib pipelines.", topicTags: ["Big Data with Apache Spark"] },
  { id: "cs-pg-data-08", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-6 weeks", title: "Hadoop MapReduce Log Analytics", tech: ["Hadoop","Java","Hive","Python"], summary: "Analyse terabytes of web server logs with MapReduce and query results via Hive SQL.", topicTags: ["Big Data with Apache Spark"] },
  { id: "cs-pg-data-09", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-6 weeks", title: "Bayesian A/B Testing with PyMC", tech: ["Python","PyMC","ArviZ","Matplotlib"], summary: "Model conversion rate uplift with Beta-Binomial posteriors and make go/no-go decisions.", topicTags: ["Bayesian Statistical Inference"] },
  { id: "cs-pg-data-10", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-6 weeks", title: "Hierarchical Bayesian Sales Model", tech: ["Python","PyMC","NumPy","Pandas"], summary: "Model regional sales with partial-pooling across stores using a hierarchical Bayesian structure.", topicTags: ["Bayesian Statistical Inference"] },
  { id: "cs-pg-data-11", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-7 weeks", title: "Bayesian Network for Disease Diagnosis", tech: ["Python","pgmpy","Pandas","NetworkX"], summary: "Build a belief network from clinical data and perform probabilistic inference for diagnosis.", topicTags: ["Bayesian Statistical Inference"] },
  { id: "cs-pg-data-12", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "4-6 weeks", title: "MCMC Sampling from Scratch", tech: ["Python","NumPy","Matplotlib","SciPy"], summary: "Implement Metropolis-Hastings and HMC samplers from scratch to estimate complex posteriors.", topicTags: ["Bayesian Statistical Inference"] },
  { id: "cs-pg-data-13", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-7 weeks", title: "Data Quality Pipeline with Great Expectations", tech: ["Python","Great Expectations","Airflow","PostgreSQL"], summary: "Validate data contracts at every ETL stage and auto-generate HTML data quality reports.", topicTags: ["ETL & Data Pipelines (Airflow)"] },
  { id: "cs-pg-data-14", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-7 weeks", title: "Incremental ETL with dbt + Snowflake", tech: ["dbt","Snowflake","Python","Airflow"], summary: "Design incremental dbt models on Snowflake with surrogate keys and slowly changing dimensions.", topicTags: ["ETL & Data Pipelines (Airflow)"] },
  { id: "cs-pg-data-15", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-7 weeks", title: "ML Feature Store with Feast + Airflow", tech: ["Python","Feast","Airflow","Redis"], summary: "Compute, store, and serve ML features on-demand and in batch using Feast feature store.", topicTags: ["ETL & Data Pipelines (Airflow)"] },
  { id: "cs-pg-data-16", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-7 weeks", title: "Event Sourcing ETL for CQRS Architecture", tech: ["Python","Kafka","PostgreSQL","Airflow"], summary: "Build a CQRS read-model pipeline that replays Kafka events to reconstruct query-optimised views.", topicTags: ["ETL & Data Pipelines (Airflow)"] },
  { id: "cs-pg-data-17", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "6-8 weeks", title: "Flink Complex Event Processing Pipeline", tech: ["Apache Flink","Kafka","Java","Elasticsearch"], summary: "Detect multi-step fraud patterns (e.g., rapid account changes) using Flink CEP patterns.", topicTags: ["Real-Time Streaming (Kafka)"] },
  { id: "cs-pg-data-18", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "6-8 weeks", title: "Change Data Capture with Debezium & Kafka", tech: ["Debezium","Kafka","PostgreSQL","Elasticsearch"], summary: "Stream database row-level changes into Kafka and sync to Elasticsearch for search use cases.", topicTags: ["Real-Time Streaming (Kafka)"] },
  { id: "cs-pg-data-19", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-7 weeks", title: "Real-Time Fraud Detection (Kafka Streams)", tech: ["Apache Kafka","Kafka Streams","Java","Redis"], summary: "Apply per-user sliding-window velocity checks in Kafka Streams to flag fraudulent transactions.", topicTags: ["Real-Time Streaming (Kafka)"] },
  { id: "cs-pg-data-20", comingSoon: true, level: "pg", category: "data", difficulty: "Advanced", duration: "5-7 weeks", title: "Kafka Connect Pipeline to Data Warehouse", tech: ["Kafka Connect","Snowflake","PostgreSQL","Kafka"], summary: "Sink real-time CDC events from Kafka into Snowflake using the Kafka Connect Snowflake connector.", topicTags: ["Real-Time Streaming (Kafka)"] },
  { id: "cs-pg-edge-ai", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "6-8 weeks", title: "Edge AI Inference on Raspberry Pi (TFLite)", tech: ["Raspberry Pi","TensorFlow Lite","Python","OpenCV"], summary: "Deploy a quantized MobileNet for real-time object classification at the edge.", topicTags: ["Edge AI on Raspberry Pi"] },
  { id: "cs-pg-precision-agri", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "6-8 weeks", title: "Precision Agriculture (Drone + Multi-Sensor)", tech: ["Raspberry Pi","NDVI Camera","MQTT","Python"], summary: "Fuse NDVI imagery with ground sensors to predict crop health and irrigation needs.", topicTags: ["Precision Agriculture (Drone+Sensors)"] },
  { id: "cs-pg-ecg-processing", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "5-7 weeks", title: "ECG Signal Processing for Arrhythmia", tech: ["Python","SciPy","TensorFlow","Arduino"], summary: "Acquire ECG with AD8232, apply DSP filters, and classify arrhythmias with a CNN.", topicTags: ["ECG Signal Processing"] },
  { id: "cs-pg-iot-04", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "5-7 weeks", title: "TFLite Object Detection on NVIDIA Jetson", tech: ["Jetson Nano","TFLite","OpenCV","Python"], summary: "Deploy YOLOv5 with TensorRT optimisation on Jetson Nano for 30 fps edge inference.", topicTags: ["Edge AI on Raspberry Pi"] },
  { id: "cs-pg-iot-05", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "6-8 weeks", title: "Federated Learning on IoT Edge Nodes", tech: ["Raspberry Pi","Flower","TFLite","Python"], summary: "Coordinate on-device FL training across a cluster of Raspberry Pis without central data.", topicTags: ["Edge AI on Raspberry Pi"] },
  { id: "cs-pg-iot-06", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "5-6 weeks", title: "Edge Inference Optimisation (Quantisation & Pruning)", tech: ["Python","TFLite","ONNX","Raspberry Pi"], summary: "Reduce model size by 4× via int8 quantisation and structured pruning with <1% accuracy loss.", topicTags: ["Edge AI on Raspberry Pi"] },
  { id: "cs-pg-iot-07", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "5-7 weeks", title: "ONNX Runtime CV Inference on Raspberry Pi", tech: ["Python","ONNX Runtime","OpenCV","Raspberry Pi"], summary: "Convert PyTorch model to ONNX and benchmark inference latency on Raspberry Pi 4.", topicTags: ["Edge AI on Raspberry Pi"] },
  { id: "cs-pg-iot-08", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "6-8 weeks", title: "UAV Path Planning for Crop Field Mapping", tech: ["Python","ArduPilot","OpenCV","NDVI"], summary: "Plan autonomous drone survey paths to cover fields and stitch orthophoto mosaics.", topicTags: ["Precision Agriculture (Drone+Sensors)"] },
  { id: "cs-pg-iot-09", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "6-8 weeks", title: "Hyperspectral Imaging for Soil Analysis", tech: ["Python","Spectral","scikit-learn","NumPy"], summary: "Classify soil types and nutrient levels from hyperspectral camera data using PCA + SVM.", topicTags: ["Precision Agriculture (Drone+Sensors)"] },
  { id: "cs-pg-iot-10", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "5-7 weeks", title: "LoRaWAN Multi-Sensor Farm Network", tech: ["Raspberry Pi","LoRaWAN","TTN","Python"], summary: "Deploy a star-topology LoRa sensor network spanning 5 km to log field micro-climate data.", topicTags: ["Precision Agriculture (Drone+Sensors)"] },
  { id: "cs-pg-iot-11", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "5-7 weeks", title: "Precision Fertigation System (IoT + ML)", tech: ["Arduino","Soil Sensors","MQTT","Python"], summary: "Close the loop on nutrient delivery by predicting daily fertiliser dose from sensor trends.", topicTags: ["Precision Agriculture (Drone+Sensors)"] },
  { id: "cs-pg-iot-12", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "5-7 weeks", title: "PPG Signal Processing for SpO2 Estimation", tech: ["Python","SciPy","Arduino","MAX30102"], summary: "Acquire photoplethysmogram signals, extract SpO2 and heart rate with peak-detection algorithms.", topicTags: ["ECG Signal Processing"] },
  { id: "cs-pg-iot-13", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "6-8 weeks", title: "EEG-Based Emotion Recognition System", tech: ["Python","MNE","TensorFlow","OpenBCI"], summary: "Record EEG signals, extract band-power features, and classify valence/arousal states.", topicTags: ["ECG Signal Processing"] },
  { id: "cs-pg-iot-14", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "5-7 weeks", title: "Real-Time ECG Anomaly Alert System", tech: ["Python","TFLite","Raspberry Pi","MQTT"], summary: "Stream ECG samples to a Pi, run CNN inference, and push alerts via MQTT on arrhythmia.", topicTags: ["ECG Signal Processing"] },
  { id: "cs-pg-iot-15", comingSoon: true, level: "pg", category: "iot", difficulty: "Advanced", duration: "6-8 weeks", title: "EMG Signal Classification for Prosthetic Control", tech: ["Python","SciPy","TensorFlow","OpenBCI"], summary: "Decode forearm EMG patterns to identify hand gestures for prosthetic finger control.", topicTags: ["ECG Signal Processing"] },
  { id: "cs-pg-zero-trust", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "8-10 weeks", title: "Zero-Trust Network Architecture", tech: ["Linux","WireGuard","Nginx","OAuth2"], summary: "Design and implement Zero-Trust where every request is authenticated regardless of source.", topicTags: ["Zero-Trust Architecture"] },
  { id: "cs-pg-homomorphic-enc", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "Homomorphic Encryption for Privacy-Preserving ML", tech: ["Python","TenSEAL","PyTorch","CKKS"], summary: "Train logistic regression on encrypted data with CKKS — computation without decryption.", topicTags: ["Homomorphic Encryption"] },
  { id: "cs-pg-pentest-auto", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "Penetration Testing Automation Framework", tech: ["Python","Metasploit","Nmap","SQLmap"], summary: "Automate recon, scanning, and exploitation steps in a controlled lab environment.", topicTags: ["Penetration Testing Automation"] },
  { id: "cs-pg-dynamic-malware", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "Dynamic Malware Analysis Sandbox", tech: ["Python","Cuckoo Sandbox","VirtualBox","Yara"], summary: "Execute suspected malware and report API calls, network behaviour, and file artefacts.", topicTags: ["Malware Sandbox"] },
  { id: "cs-pg-sec-05", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "BeyondCorp Zero-Trust Implementation", tech: ["Python","Nginx","Keycloak","Docker"], summary: "Enforce identity-aware proxying for internal apps — no VPN, every request authenticated.", topicTags: ["Zero-Trust Architecture"] },
  { id: "cs-pg-sec-06", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "Micro-Segmentation with Calico on Kubernetes", tech: ["Kubernetes","Calico","Prometheus","eBPF"], summary: "Apply network policy micro-segmentation in a K8s cluster using eBPF-based Calico.", topicTags: ["Zero-Trust Architecture"] },
  { id: "cs-pg-sec-07", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "5-7 weeks", title: "Identity-Aware Proxy with OAuth2 Proxy", tech: ["Python","OAuth2 Proxy","Keycloak","Nginx"], summary: "Front internal services with OAuth2 Proxy — unauthenticated requests redirect to IdP.", topicTags: ["Zero-Trust Architecture"] },
  { id: "cs-pg-sec-08", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "5-7 weeks", title: "Zero-Trust Remote Access (WireGuard + MFA)", tech: ["WireGuard","Authelia","Docker","Nginx"], summary: "Layer TOTP multi-factor authentication on WireGuard VPN for zero-trust remote access.", topicTags: ["Zero-Trust Architecture"] },
  { id: "cs-pg-sec-09", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "Encrypted ML Training with FHE", tech: ["Python","TenSEAL","scikit-learn","NumPy"], summary: "Perform linear regression gradient descent entirely on CKKS-encrypted feature vectors.", topicTags: ["Homomorphic Encryption"] },
  { id: "cs-pg-sec-10", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "Private Set Intersection Protocol", tech: ["Python","OpenMined","PySyft"], summary: "Compute the intersection of two datasets without revealing non-matching records to either party.", topicTags: ["Homomorphic Encryption"] },
  { id: "cs-pg-sec-11", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "Secure Multi-Party Computation Demo", tech: ["Python","MP-SPDZ","NumPy"], summary: "Evaluate a function over secret-shared inputs where no party sees the other's raw data.", topicTags: ["Homomorphic Encryption"] },
  { id: "cs-pg-sec-12", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "BFV Scheme for Privacy-Preserving Analytics", tech: ["Python","SEAL","TenSEAL"], summary: "Aggregate encrypted survey data with BFV homomorphic addition — the data owner never decrypts.", topicTags: ["Homomorphic Encryption"] },
  { id: "cs-pg-sec-13", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "5-7 weeks", title: "OSINT Automation (Shodan & Maltego)", tech: ["Python","Shodan API","Maltego","requests"], summary: "Automate open-source intelligence gathering on a target domain using Shodan and social graphs.", topicTags: ["Penetration Testing Automation"] },
  { id: "cs-pg-sec-14", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "5-6 weeks", title: "API Fuzzing with OWASP ZAP + CI Pipeline", tech: ["OWASP ZAP","Python","GitHub Actions","Docker"], summary: "Integrate ZAP DAST scanning into CI to auto-fuzz REST API endpoints on every PR.", topicTags: ["Penetration Testing Automation"] },
  { id: "cs-pg-sec-15", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "Cloud Penetration Test Lab (AWS)", tech: ["AWS","Terraform","Kali Linux","Metasploit"], summary: "Provision a deliberately vulnerable AWS environment and perform a full pentest lifecycle.", topicTags: ["Penetration Testing Automation"] },
  { id: "cs-pg-sec-16", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "Red Team C2 Lab with Havoc Framework", tech: ["Python","Havoc C2","Kali Linux","Wireshark"], summary: "Set up a command-and-control red team lab, execute payloads, and practice detection evasion.", topicTags: ["Penetration Testing Automation"] },
  { id: "cs-pg-sec-17", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "5-7 weeks", title: "Kernel-Level Rootkit Detection with Volatility", tech: ["Python","Volatility3","Windows","VMware"], summary: "Acquire memory dumps of infected VMs and hunt for rootkit artefacts with Volatility plugins.", topicTags: ["Malware Sandbox"] },
  { id: "cs-pg-sec-18", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "5-7 weeks", title: "Memory Forensics Pipeline", tech: ["Python","Volatility3","YARA","Rekall"], summary: "Automate memory acquisition, carve processes and network connections, and flag IOCs.", topicTags: ["Malware Sandbox"] },
  { id: "cs-pg-sec-19", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "5-7 weeks", title: "Network Traffic Malware Classifier", tech: ["Python","Wireshark","scikit-learn","Pandas"], summary: "Classify malware C2 traffic from benign using flow-level features extracted from pcap files.", topicTags: ["Malware Sandbox"] },
  { id: "cs-pg-sec-20", comingSoon: true, level: "pg", category: "security", difficulty: "Advanced", duration: "6-8 weeks", title: "Anti-Evasion Technique Analysis in Sandbox", tech: ["Python","Cuckoo","x64dbg","YARA"], summary: "Study and counter common sandbox-evasion tricks (sleep calls, anti-debug, VM checks).", topicTags: ["Malware Sandbox"] },
  { id: "cs-pg-flutter-ehr", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "6-8 weeks", title: "Electronic Health Record App with Flutter", tech: ["Flutter","Dart","Firebase","HL7 FHIR"], summary: "HIPAA-aware EHR supporting patient records, appointments, and HL7 FHIR data exchange.", topicTags: ["EHR App with Flutter"] },
  { id: "cs-pg-ar-navigation", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "5-7 weeks", title: "AR Campus Navigation App (Android)", tech: ["Kotlin","ARCore","Android Studio","Google Maps SDK"], summary: "Overlay directional arrows on the camera view to guide users through campus indoors.", topicTags: ["AR Campus Navigation (Android)"] },
  { id: "cs-pg-telemedicine", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "6-8 weeks", title: "Telemedicine App with WebRTC Video Calls", tech: ["React Native","WebRTC","Node.js","Socket.io"], summary: "Secure telemedicine with real-time video, e-prescriptions, and medical record storage.", topicTags: ["Telemedicine with WebRTC"] },
  { id: "cs-pg-mob-04", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "5-7 weeks", title: "Flutter EMR with FHIR R4 Integration", tech: ["Flutter","FHIR R4","Dart","Firebase"], summary: "Consume and post HL7 FHIR R4 resources for appointments, observations, and medication orders.", topicTags: ["EHR App with Flutter"] },
  { id: "cs-pg-mob-05", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "5-7 weeks", title: "Offline-Capable EHR with Realm Sync", tech: ["Flutter","Realm","Dart","REST API"], summary: "Patient records stored in Realm offline-first and synced to the server using Atlas App Services.", topicTags: ["EHR App with Flutter"] },
  { id: "cs-pg-mob-06", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "4-6 weeks", title: "Patient Vitals Dashboard (Flutter + BLE)", tech: ["Flutter","BLE","Dart","Firebase"], summary: "Connect to BLE pulse oximeter and BP cuff, display live vitals, and alert on threshold breach.", topicTags: ["EHR App with Flutter"] },
  { id: "cs-pg-mob-07", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "4-6 weeks", title: "Prescription Management App (Flutter)", tech: ["Flutter","Dart","Firestore","PDF Generation"], summary: "Digitise prescriptions with doctor e-signature, QR code dispensing, and pharmacy portal.", topicTags: ["EHR App with Flutter"] },
  { id: "cs-pg-mob-08", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "5-7 weeks", title: "ARCore Museum Audio Guide App", tech: ["Kotlin","ARCore","Sceneform","Firebase"], summary: "Trigger 3D model pop-ups and audio narratives when phone camera detects exhibit markers.", topicTags: ["AR Campus Navigation (Android)"] },
  { id: "cs-pg-mob-09", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "5-7 weeks", title: "Indoor Positioning with BLE Beacons", tech: ["Kotlin","BLE","Trilateration","Android"], summary: "Position users within 1 m using BLE beacon RSSI trilateration for indoor navigation.", topicTags: ["AR Campus Navigation (Android)"] },
  { id: "cs-pg-mob-10", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "5-7 weeks", title: "AR Wayfinding with Google Maps Live View", tech: ["Kotlin","ARCore","Google Maps","Places API"], summary: "Overlay walking directions as AR arrows on the live camera using Maps AR Live View SDK.", topicTags: ["AR Campus Navigation (Android)"] },
  { id: "cs-pg-mob-11", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "5-6 weeks", title: "AR Product Visualisation (Sceneform)", tech: ["Kotlin","Sceneform","ARCore","Firebase"], summary: "Place true-to-scale 3D product models in real space so customers can see fit before buying.", topicTags: ["AR Campus Navigation (Android)"] },
  { id: "cs-pg-mob-12", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "5-7 weeks", title: "P2P Video Consultation (WebRTC + React Native)", tech: ["React Native","WebRTC","Socket.io","Node.js"], summary: "End-to-end encrypted peer-to-peer video calls for secure doctor–patient consultations.", topicTags: ["Telemedicine with WebRTC"] },
  { id: "cs-pg-mob-13", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "5-7 weeks", title: "HIPAA-Compliant Encrypted Messaging", tech: ["Flutter","Signal Protocol","Firebase","Dart"], summary: "End-to-end encrypted chat with forward secrecy for patient–provider communication.", topicTags: ["Telemedicine with WebRTC"] },
  { id: "cs-pg-mob-14", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "4-6 weeks", title: "AI Symptom Checker App (Flutter + LLM)", tech: ["Flutter","Dart","OpenAI API","Firebase"], summary: "Patients describe symptoms; the app asks clarifying questions and suggests possible conditions.", topicTags: ["Telemedicine with WebRTC"] },
  { id: "cs-pg-mob-15", comingSoon: true, level: "pg", category: "mobile", difficulty: "Advanced", duration: "4-6 weeks", title: "E-Prescription with Digital Signature", tech: ["Flutter","Dart","ECDSA","PDF"], summary: "Doctors sign prescriptions with ECDSA private key; pharmacies verify before dispensing.", topicTags: ["Telemedicine with WebRTC"] },
  { id: "cs-sc-teachable-machine", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1 week", title: "Image Classifier with Teachable Machine", tech: ["Teachable Machine","HTML","JavaScript","TensorFlow.js"], summary: "Train a no-code image classifier with Google Teachable Machine and embed it in a web page.", topicTags: ["Teachable Machine (No-Code)"] },
  { id: "cs-sc-grade-predictor", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1 week", title: "Grade Predictor using Linear Regression", tech: ["Python","scikit-learn","Matplotlib"], summary: "Predict your exam score from study hours using linear regression with a visual plot.", topicTags: ["Grade Predictor"] },
  { id: "cs-sc-spam-sms", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "SMS Spam Detector with Naive Bayes", tech: ["Python","scikit-learn","NLTK","Pandas"], summary: "Classify SMS as spam or ham using a Naive Bayes classifier on the UCI SMS dataset.", topicTags: ["Spam SMS Detector"] },
  { id: "cs-sc-ml-04", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1 week", title: "Animal Classifier with Teachable Machine", tech: ["Teachable Machine","JavaScript","HTML"], summary: "Train a 5-class animal image classifier in Teachable Machine and test it with your webcam.", topicTags: ["Teachable Machine (No-Code)"] },
  { id: "cs-sc-ml-05", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1 week", title: "Rock Paper Scissors Gesture Classifier", tech: ["Teachable Machine","JavaScript","HTML","p5.js"], summary: "Classify hand gestures (rock/paper/scissors) live in the browser — no Python needed.", topicTags: ["Teachable Machine (No-Code)"] },
  { id: "cs-sc-ml-06", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1 week", title: "Sound Classifier with Teachable Machine", tech: ["Teachable Machine","JavaScript","HTML"], summary: "Train a model to recognise clapping, snapping, and silence directly in your browser.", topicTags: ["Teachable Machine (No-Code)"] },
  { id: "cs-sc-ml-07", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1 week", title: "Posture Detector (Sitting vs Standing)", tech: ["Teachable Machine","TensorFlow.js","HTML"], summary: "Detect whether a student is sitting or standing using pose classification in the browser.", topicTags: ["Teachable Machine (No-Code)"] },
  { id: "cs-sc-ml-08", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1 week", title: "Python FAQ Chatbot with Pattern Matching", tech: ["Python","re","JSON"], summary: "Build a simple FAQ bot that matches user questions to keyword patterns and returns answers.", topicTags: ["Rule-Based Chatbot"] },
  { id: "cs-sc-ml-09", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1 week", title: "Customer Service Chatbot (Keyword Rules)", tech: ["Python","Flask","JSON","HTML"], summary: "A rule-based bot for a fictional shop — answers stock, price, and return queries.", topicTags: ["Rule-Based Chatbot"] },
  { id: "cs-sc-ml-10", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "Decision Tree Chatbot for Restaurant Orders", tech: ["Python","Flask","JSON","Bootstrap"], summary: "Chatbot that walks the user through a menu decision tree and confirms their order.", topicTags: ["Rule-Based Chatbot"] },
  { id: "cs-sc-ml-11", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1 week", title: "Eliza-Style Therapy Bot in Python", tech: ["Python","re","CLI"], summary: "Recreate the classic Eliza psychotherapist chatbot using reflection patterns in Python.", topicTags: ["Rule-Based Chatbot"] },
  { id: "cs-sc-ml-12", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "Simple NLP Chatbot with NLTK", tech: ["Python","NLTK","TF-IDF","Flask"], summary: "A basic chatbot that matches user questions to a FAQ corpus using cosine similarity.", topicTags: ["Rule-Based Chatbot"] },
  { id: "cs-sc-ml-13", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "WhatsApp Spam Message Classifier", tech: ["Python","scikit-learn","NLTK","Pandas"], summary: "Classify forwarded WhatsApp messages as spam or genuine using a Naive Bayes model.", topicTags: ["Spam SMS Detector"] },
  { id: "cs-sc-ml-14", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "Email Phishing vs Ham Detector", tech: ["Python","scikit-learn","Pandas"], summary: "Detect phishing emails from legitimate ones using a bag-of-words TF-IDF classifier.", topicTags: ["Spam SMS Detector"] },
  { id: "cs-sc-ml-15", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "Fake News Headline Classifier", tech: ["Python","scikit-learn","NLTK","Pandas"], summary: "Train a logistic regression model on LIAR dataset headlines to detect fake news.", topicTags: ["Spam SMS Detector"] },
  { id: "cs-sc-ml-16", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "Clickbait Detector with Logistic Regression", tech: ["Python","scikit-learn","Pandas"], summary: "Classify news titles as clickbait or genuine using TF-IDF and logistic regression.", topicTags: ["Spam SMS Detector"] },
  { id: "cs-sc-ml-17", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1 week", title: "Marks-to-Grade Calculator (Python)", tech: ["Python","Pandas","Matplotlib"], summary: "Map raw marks to letter grades using thresholds, and plot grade distribution as a bar chart.", topicTags: ["Grade Predictor"] },
  { id: "cs-sc-ml-18", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1 week", title: "Study Hours vs Score Regression", tech: ["Python","NumPy","Matplotlib"], summary: "Plot study hours against exam scores, fit a regression line, and predict a score for any hour.", topicTags: ["Grade Predictor"] },
  { id: "cs-sc-ml-19", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "Student Pass/Fail Predictor (Decision Tree)", tech: ["Python","scikit-learn","Matplotlib"], summary: "Train a decision tree on attendance and test scores to predict if a student passes the exam.", topicTags: ["Grade Predictor"] },
  { id: "cs-sc-ml-20", comingSoon: true, level: "school", category: "ml", difficulty: "Beginner", duration: "1-2 weeks", title: "Attendance Impact on Grades Analyser", tech: ["Python","Pandas","Seaborn"], summary: "Correlate attendance percentage with final marks and visualise the relationship with scatter plots.", topicTags: ["Grade Predictor"] },
  { id: "cs-sc-portfolio", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Personal Portfolio Website (HTML & CSS)", tech: ["HTML","CSS","JavaScript"], summary: "Build your own portfolio page with name, photo, skills, and projects with a stylish CSS layout.", topicTags: ["HTML/CSS Portfolio"] },
  { id: "cs-sc-quiz-web", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Interactive Quiz Web App", tech: ["HTML","CSS","JavaScript"], summary: "A multiple-choice quiz game that keeps score, shows correct answers, and has a timer.", topicTags: ["Interactive Quiz"] },
  { id: "cs-sc-web-03", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Dark Mode Portfolio with CSS Animations", tech: ["HTML","CSS","JavaScript"], summary: "A personal portfolio with CSS keyframe animations, dark/light toggle, and smooth scrolling.", topicTags: ["HTML/CSS Portfolio"] },
  { id: "cs-sc-web-04", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Responsive CV in HTML & CSS", tech: ["HTML","CSS","Print CSS"], summary: "A clean one-page CV layout with print stylesheet so it also exports beautifully to PDF.", topicTags: ["HTML/CSS Portfolio"] },
  { id: "cs-sc-web-05", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Blog Landing Page (HTML/CSS/JS)", tech: ["HTML","CSS","JavaScript"], summary: "A static blog home with featured post cards, pagination links, and a newsletter signup form.", topicTags: ["HTML/CSS Portfolio"] },
  { id: "cs-sc-web-06", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "School Project Showcase Website", tech: ["HTML","CSS","JavaScript"], summary: "A gallery page showcasing your class science fair projects with images and descriptions.", topicTags: ["HTML/CSS Portfolio"] },
  { id: "cs-sc-web-07", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Simple To-Do List App (JavaScript)", tech: ["HTML","CSS","JavaScript"], summary: "Add, complete, and delete tasks — your first full CRUD app in pure vanilla JavaScript.", topicTags: ["To-Do App"] },
  { id: "cs-sc-web-08", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "To-Do App with LocalStorage", tech: ["HTML","CSS","JavaScript","LocalStorage"], summary: "A to-do app that remembers your tasks even after closing the browser tab using LocalStorage.", topicTags: ["To-Do App"] },
  { id: "cs-sc-web-09", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "Kanban Board (HTML + JS Drag & Drop)", tech: ["HTML","CSS","JavaScript"], summary: "Drag tasks between To-Do, In Progress, and Done columns using the HTML5 Drag & Drop API.", topicTags: ["To-Do App"] },
  { id: "cs-sc-web-10", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Habit Tracker App (Vanilla JS)", tech: ["HTML","CSS","JavaScript"], summary: "Mark daily habits as done on a grid calendar and see your streak count grow.", topicTags: ["To-Do App"] },
  { id: "cs-sc-web-11", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Daily Planner Web App", tech: ["HTML","CSS","JavaScript"], summary: "Plan your day by hour — click a slot to add a task and save the schedule to LocalStorage.", topicTags: ["To-Do App"] },
  { id: "cs-sc-web-12", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Science Quiz with Timer & Score", tech: ["HTML","CSS","JavaScript"], summary: "A 10-question science quiz with a countdown timer per question and a final score screen.", topicTags: ["Interactive Quiz"] },
  { id: "cs-sc-web-13", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "GK Quiz with Leaderboard (LocalStorage)", tech: ["HTML","CSS","JavaScript"], summary: "A general knowledge quiz that saves high scores to LocalStorage and shows a leaderboard.", topicTags: ["Interactive Quiz"] },
  { id: "cs-sc-web-14", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Flag Quiz — Guess the Country", tech: ["HTML","CSS","JavaScript","REST Countries API"], summary: "Show a flag image fetched from REST Countries API and ask the player to name the country.", topicTags: ["Interactive Quiz"] },
  { id: "cs-sc-web-15", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Math Challenge Game", tech: ["HTML","CSS","JavaScript"], summary: "Randomly generated arithmetic problems with difficulty levels and a time-attack mode.", topicTags: ["Interactive Quiz"] },
  { id: "cs-sc-web-16", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Weather App with OpenWeatherMap API", tech: ["HTML","CSS","JavaScript","Fetch API"], summary: "Get current weather for any city — shows temperature, humidity, and weather icon via API.", topicTags: ["Weather App"] },
  { id: "cs-sc-web-17", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "5-Day Forecast App with Chart", tech: ["HTML","CSS","JavaScript","Chart.js"], summary: "Display a 5-day temperature forecast fetched from OpenWeatherMap as a bar chart.", topicTags: ["Weather App"] },
  { id: "cs-sc-web-18", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Weather App with Geolocation", tech: ["HTML","CSS","JavaScript","Geolocation API"], summary: "Detect the user's location automatically and show local weather without any city input.", topicTags: ["Weather App"] },
  { id: "cs-sc-web-19", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "City Comparison Weather Dashboard", tech: ["HTML","CSS","JavaScript","Chart.js"], summary: "Compare temperature and humidity across 3 cities on bar charts fetched from a weather API.", topicTags: ["Weather App"] },
  { id: "cs-sc-web-20", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "Forecast Widget (Embeddable HTML)", tech: ["HTML","CSS","JavaScript"], summary: "A compact 3-day weather widget designed to be embedded in any webpage as an iframe.", topicTags: ["Weather App"] },
  { id: "cs-sc-web-21", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "QR Code Generator (qrcode.js)", tech: ["HTML","CSS","JavaScript","qrcode.js"], summary: "Type any text or URL and instantly generate a downloadable QR code in the browser.", topicTags: ["QR Code Generator"] },
  { id: "cs-sc-web-22", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "QR Code Scanner with Camera", tech: ["HTML","JavaScript","jsQR"], summary: "Open the device camera, scan a QR code in real time, and display the decoded content.", topicTags: ["QR Code Generator"] },
  { id: "cs-sc-web-23", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1-2 weeks", title: "Batch QR Code Generator (CSV Input)", tech: ["HTML","JavaScript","qrcode.js","Papa Parse"], summary: "Upload a CSV of names or URLs and generate a QR code for every row in one click.", topicTags: ["QR Code Generator"] },
  { id: "cs-sc-web-24", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "vCard QR Code Maker", tech: ["HTML","CSS","JavaScript","qrcode.js"], summary: "Enter your contact details and generate a vCard QR code that adds you to any address book.", topicTags: ["QR Code Generator"] },
  { id: "cs-sc-web-25", comingSoon: true, level: "school", category: "web", difficulty: "Beginner", duration: "1 week", title: "QR Code Art Generator with Logo", tech: ["HTML","Canvas API","JavaScript"], summary: "Overlay a logo image on a generated QR code canvas while maintaining scanability.", topicTags: ["QR Code Generator"] },
  { id: "cs-sc-marks-chart", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Class Marks Analysis with Matplotlib", tech: ["Python","Matplotlib","Pandas"], summary: "Read exam scores from a CSV, compute stats, and plot bar and pie charts of results.", topicTags: ["Class Marks Chart"] },
  { id: "cs-sc-survey-eda", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Your Own Survey — EDA in Python", tech: ["Python","Pandas","Seaborn"], summary: "Collect a small survey, clean it in pandas, and create visualisations about your class.", topicTags: ["Survey Analysis"] },
  { id: "cs-sc-data-03", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Subject-Wise Marks Comparison Chart", tech: ["Python","Matplotlib","Pandas"], summary: "Compare average marks across subjects for a class using a grouped horizontal bar chart.", topicTags: ["Class Marks Chart"] },
  { id: "cs-sc-data-04", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Top Students Bar Chart Maker", tech: ["Python","Matplotlib","Pandas"], summary: "Rank students by total score and display the top 10 as a colour-coded horizontal bar chart.", topicTags: ["Class Marks Chart"] },
  { id: "cs-sc-data-05", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Exam Score Distribution Histogram", tech: ["Python","Matplotlib","NumPy"], summary: "Plot a histogram of exam scores to reveal normal distribution, outliers, and pass/fail zones.", topicTags: ["Class Marks Chart"] },
  { id: "cs-sc-data-06", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Multi-Year Class Performance Tracker", tech: ["Python","Matplotlib","Pandas"], summary: "Plot three years of class averages on a line chart to see improvement trends over time.", topicTags: ["Class Marks Chart"] },
  { id: "cs-sc-data-07", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Study Hours Survey Visualiser", tech: ["Python","Pandas","Matplotlib"], summary: "Survey classmates on study hours per day and plot findings as pie and bar charts.", topicTags: ["Survey Analysis"] },
  { id: "cs-sc-data-08", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Hobby & Interest Survey Chart", tech: ["Python","Pandas","Seaborn"], summary: "Collect hobby data from 30 classmates and display frequencies as a styled horizontal bar chart.", topicTags: ["Survey Analysis"] },
  { id: "cs-sc-data-09", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Mobile App Usage Survey Analysis", tech: ["Python","Pandas","Seaborn"], summary: "Survey screen time data, clean responses, and visualise top apps and daily hours used.", topicTags: ["Survey Analysis"] },
  { id: "cs-sc-data-10", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Career Interest Survey Dashboard", tech: ["Python","Pandas","Matplotlib"], summary: "Visualise which careers classmates are interested in as an interactive pie chart dashboard.", topicTags: ["Survey Analysis"] },
  { id: "cs-sc-data-11", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Pie Chart of Monthly Expenses (Python)", tech: ["Python","Matplotlib"], summary: "Manually enter expense categories and draw a labelled pie chart with percentage annotations.", topicTags: ["Bar & Pie Charts with Matplotlib"] },
  { id: "cs-sc-data-12", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Grouped Bar Chart with Matplotlib", tech: ["Python","Matplotlib","NumPy"], summary: "Plot two datasets side-by-side as grouped bars — compare boys vs girls marks by subject.", topicTags: ["Bar & Pie Charts with Matplotlib"] },
  { id: "cs-sc-data-13", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Population Growth Line Chart", tech: ["Python","Matplotlib","Pandas"], summary: "Plot India's population growth year-by-year as an annotated line chart with milestone labels.", topicTags: ["Bar & Pie Charts with Matplotlib"] },
  { id: "cs-sc-data-14", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Stacked Bar Chart of Market Share", tech: ["Python","Matplotlib","Pandas"], summary: "Show smartphone brand market share over 5 years as a stacked bar chart with a legend.", topicTags: ["Bar & Pie Charts with Matplotlib"] },
  { id: "cs-sc-data-15", comingSoon: true, level: "school", category: "data", difficulty: "Beginner", duration: "1 week", title: "Donut Chart Dashboard (Python + Seaborn)", tech: ["Python","Matplotlib","Seaborn"], summary: "Create a multi-subplot dashboard with donut and bar charts for a class performance report.", topicTags: ["Bar & Pie Charts with Matplotlib"] },
  { id: "cs-sc-traffic-light", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Traffic Light Simulator with Arduino", tech: ["Arduino","LEDs","Resistors","Tinkercad"], summary: "Simulate a traffic light sequence using three LEDs — your first hardware + code project.", topicTags: ["LED & Traffic Light (Arduino)"] },
  { id: "cs-sc-temp-sensor", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Temperature & Humidity Display (DHT11)", tech: ["Arduino","DHT11","LCD 16x2","C++"], summary: "Connect a DHT11 sensor and display live temperature and humidity on an LCD screen.", topicTags: ["Temp & Humidity Sensor"] },
  { id: "cs-sc-soil-moisture", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Soil Moisture Meter with Arduino", tech: ["Arduino","Soil Sensor","Buzzer","LED"], summary: "Build a plant watering alert that beeps and lights up when moisture falls below threshold.", topicTags: ["Soil Moisture Meter"] },
  { id: "cs-sc-ir-obstacle", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Obstacle Detector with IR Sensor", tech: ["Arduino","IR Sensor","Buzzer","LED"], summary: "Detect nearby obstacles with an IR sensor and trigger a buzzer — robot navigation basics.", topicTags: ["Obstacle Detector"] },
  { id: "cs-sc-iot-05", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "RGB LED Blinking Patterns (Arduino)", tech: ["Arduino","RGB LED","C++"], summary: "Control an RGB LED to cycle through colours with different blink patterns using millis().", topicTags: ["LED & Traffic Light (Arduino)"] },
  { id: "cs-sc-iot-06", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Countdown Timer with LED Bar (Arduino)", tech: ["Arduino","LEDs","Button","C++"], summary: "Press a button to start a visual countdown — LEDs turn off one by one until time runs out.", topicTags: ["LED & Traffic Light (Arduino)"] },
  { id: "cs-sc-iot-07", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Pedestrian Crossing Simulator", tech: ["Arduino","LEDs","Button","Buzzer"], summary: "Press the pedestrian button to turn the traffic light red and give walkers safe crossing time.", topicTags: ["LED & Traffic Light (Arduino)"] },
  { id: "cs-sc-iot-08", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "LED Dice Game with Button", tech: ["Arduino","LEDs","Button","C++"], summary: "Roll a virtual dice — press a button to flash an LED pattern showing numbers 1–6.", topicTags: ["LED & Traffic Light (Arduino)"] },
  { id: "cs-sc-iot-09", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Automatic Fan Speed Control (DHT22)", tech: ["Arduino","DHT22","DC Fan","PWM"], summary: "Read temperature and use PWM to ramp a fan speed up as the room gets hotter.", topicTags: ["Temp & Humidity Sensor"] },
  { id: "cs-sc-iot-10", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Cold Storage Alert (DHT11 + Buzzer)", tech: ["Arduino","DHT11","Buzzer","LCD"], summary: "Beep and display a warning when storage temperature rises above the set safe limit.", topicTags: ["Temp & Humidity Sensor"] },
  { id: "cs-sc-iot-11", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Room Comfort Monitor (Temperature Range)", tech: ["Arduino","DHT11","RGB LED","LCD"], summary: "Show a green LED when the room is comfortable, yellow when warm, and red when too hot.", topicTags: ["Temp & Humidity Sensor"] },
  { id: "cs-sc-iot-12", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Mini Weather Station (Serial Monitor)", tech: ["Arduino","DHT11","BMP180","C++"], summary: "Log temperature, humidity, and barometric pressure to the Arduino Serial Monitor every 5 s.", topicTags: ["Temp & Humidity Sensor"] },
  { id: "cs-sc-iot-13", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Self-Watering Plant System", tech: ["Arduino","Soil Sensor","Water Pump","Relay"], summary: "Auto-water a potted plant by switching a relay pump on when soil moisture is too low.", topicTags: ["Soil Moisture Meter"] },
  { id: "cs-sc-iot-14", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1-2 weeks", title: "Soil Moisture Data Logger to SD Card", tech: ["Arduino","Soil Sensor","SD Module","RTC"], summary: "Timestamp and log moisture readings every hour to an SD card for trend analysis.", topicTags: ["Soil Moisture Meter"] },
  { id: "cs-sc-iot-15", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1-2 weeks", title: "Wireless Soil Alert via Bluetooth", tech: ["Arduino","Soil Sensor","HC-05","MIT App Inventor"], summary: "Send low-moisture alerts from Arduino to an Android phone via Bluetooth.", topicTags: ["Soil Moisture Meter"] },
  { id: "cs-sc-iot-16", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Irrigation On/Off Relay with Soil Sensor", tech: ["Arduino","Soil Sensor","Relay","LCD"], summary: "Control a relay-switched irrigation valve based on live soil moisture readings.", topicTags: ["Soil Moisture Meter"] },
  { id: "cs-sc-iot-17", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Ultrasonic Distance Meter (Arduino)", tech: ["Arduino","HC-SR04","LCD","C++"], summary: "Measure distance to an object with the HC-SR04 ultrasonic sensor and display cm on LCD.", topicTags: ["Obstacle Detector"] },
  { id: "cs-sc-iot-18", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1-2 weeks", title: "Blind Stick with Vibration Alert", tech: ["Arduino","HC-SR04","Vibration Motor"], summary: "Detect obstacles within 50 cm and vibrate a motor strapped to a walking stick.", topicTags: ["Obstacle Detector"] },
  { id: "cs-sc-iot-19", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Reverse Parking Alert System", tech: ["Arduino","HC-SR04","Buzzer","LED"], summary: "Simulate a car park assist — buzzer beeps faster as the obstacle gets closer.", topicTags: ["Obstacle Detector"] },
  { id: "cs-sc-iot-20", comingSoon: true, level: "school", category: "iot", difficulty: "Beginner", duration: "1 week", title: "Smart Trash Bin (Ultrasonic Level Sensor)", tech: ["Arduino","HC-SR04","Servo","LED"], summary: "Open the bin lid automatically when a hand is detected above it using ultrasonic sensing.", topicTags: ["Obstacle Detector"] },
  { id: "cs-sc-caesar-cipher", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "Caesar Cipher Encoder / Decoder", tech: ["Python"], summary: "Implement the Caesar shift cipher — encode secret messages and crack them by brute-force.", topicTags: ["Caesar Cipher Encoder"] },
  { id: "cs-sc-password-checker", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "Password Strength Checker", tech: ["Python","regex","Tkinter"], summary: "Analyse a password for length, uppercase, digits, and symbols and display a strength meter.", topicTags: ["Password Strength Checker"] },
  { id: "cs-sc-login-monitor", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "Login Attempt Monitor in Python", tech: ["Python","SQLite","logging"], summary: "Lock an account after 3 failed attempts and log all events — your first security project.", topicTags: ["Login Attempt Monitor"] },
  { id: "cs-sc-sec-04", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "Vigenère Cipher Encoder in Python", tech: ["Python","CLI"], summary: "Implement the polyalphabetic Vigenère cipher and break it with Kasiski examination.", topicTags: ["Caesar Cipher Encoder"] },
  { id: "cs-sc-sec-05", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "Rail Fence (Zigzag) Cipher Tool", tech: ["Python","Tkinter"], summary: "Encode and decode messages using the Rail Fence transposition cipher in a GUI app.", topicTags: ["Caesar Cipher Encoder"] },
  { id: "cs-sc-sec-06", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "XOR Cipher for Text Files", tech: ["Python","CLI"], summary: "XOR-encrypt a text file with a key and decrypt it again — see why XOR is symmetric.", topicTags: ["Caesar Cipher Encoder"] },
  { id: "cs-sc-sec-07", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "Crack a Caesar Cipher (Frequency Analysis)", tech: ["Python","Matplotlib"], summary: "Use English letter frequency analysis to automatically find the Caesar shift without the key.", topicTags: ["Caesar Cipher Encoder"] },
  { id: "cs-sc-sec-08", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "Password Generator with Entropy Score", tech: ["Python","secrets","Tkinter"], summary: "Generate strong random passwords and display their entropy in bits as a strength indicator.", topicTags: ["Password Strength Checker"] },
  { id: "cs-sc-sec-09", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "Password Rules Validator (Web Form)", tech: ["HTML","CSS","JavaScript"], summary: "Validate passwords against rules in real time as the user types — tick boxes appear for each rule.", topicTags: ["Password Strength Checker"] },
  { id: "cs-sc-sec-10", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "Bcrypt Password Hashing Demo", tech: ["Python","bcrypt"], summary: "Hash passwords with bcrypt and verify them — explain salting and work factors to students.", topicTags: ["Password Strength Checker"] },
  { id: "cs-sc-sec-11", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "Have I Been Pwned API Checker", tech: ["Python","requests","k-Anonymity"], summary: "Check a password against the HIBP database using k-anonymity so the full hash never leaves.", topicTags: ["Password Strength Checker"] },
  { id: "cs-sc-sec-12", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1-2 weeks", title: "Two-Factor OTP Login System", tech: ["Python","pyotp","Flask","QR Code"], summary: "Add a TOTP second factor to a login form — scan the QR with Google Authenticator to verify.", topicTags: ["Login Attempt Monitor"] },
  { id: "cs-sc-sec-13", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1-2 weeks", title: "Web Login Rate Limiter (Flask)", tech: ["Python","Flask","Redis","flask-limiter"], summary: "Limit login attempts to 5 per minute per IP using flask-limiter and return 429 on breach.", topicTags: ["Login Attempt Monitor"] },
  { id: "cs-sc-sec-14", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "CAPTCHA Generator for Login Forms", tech: ["Python","Pillow","Flask"], summary: "Generate distorted text CAPTCHAs and validate user input before processing login.", topicTags: ["Login Attempt Monitor"] },
  { id: "cs-sc-sec-15", comingSoon: true, level: "school", category: "security", difficulty: "Beginner", duration: "1 week", title: "Suspicious IP Block List from Login Logs", tech: ["Python","Pandas","SQLite"], summary: "Parse login logs, count failures per IP, and automatically add repeat offenders to a blocklist.", topicTags: ["Login Attempt Monitor"] },
  { id: "cs-sc-flutter-converter", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1 week", title: "Unit Converter App with Flutter", tech: ["Flutter","Dart"], summary: "Convert length, weight, temperature, and speed units — your first Flutter mobile project.", topicTags: ["Unit Converter App"] },
  { id: "cs-sc-firebase-noticeboard", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "School Noticeboard App with Firebase", tech: ["Flutter","Firebase","Firestore"], summary: "Teachers post notices; students see them in real time via Firebase Firestore.", topicTags: ["School Noticeboard (Firebase)"] },
  { id: "cs-sc-flashcards", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1 week", title: "Flashcard Study App", tech: ["React Native","AsyncStorage","Expo"], summary: "Create digital study flashcards, flip them to reveal answers, and track mastered cards.", topicTags: ["Flashcard Study App"] },
  { id: "cs-sc-mob-04", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1 week", title: "BMI Calculator App in Flutter", tech: ["Flutter","Dart"], summary: "Enter height and weight in any unit, calculate BMI, and display health category with colour.", topicTags: ["Unit Converter App"] },
  { id: "cs-sc-mob-05", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1 week", title: "Currency Converter App (Flutter + API)", tech: ["Flutter","Dart","Exchange Rate API"], summary: "Fetch live exchange rates and convert between currencies with a clean Flutter UI.", topicTags: ["Unit Converter App"] },
  { id: "cs-sc-mob-06", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1 week", title: "Number System Converter App", tech: ["Flutter","Dart"], summary: "Convert between binary, octal, decimal, and hexadecimal — perfect for CS class practice.", topicTags: ["Unit Converter App"] },
  { id: "cs-sc-mob-07", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1 week", title: "Cooking Measurement Converter", tech: ["Flutter","Dart"], summary: "Convert cups, tablespoons, grams, and ml for recipes — with a search-by-ingredient feature.", topicTags: ["Unit Converter App"] },
  { id: "cs-sc-mob-08", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "Class Schedule Noticeboard App", tech: ["Flutter","Firestore","Dart"], summary: "Post and display the weekly class timetable in real time so students always have the latest.", topicTags: ["School Noticeboard (Firebase)"] },
  { id: "cs-sc-mob-09", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "Exam Countdown App with Firebase", tech: ["Flutter","Firebase RTDB","Dart"], summary: "Teachers add exam dates to Firebase; students see a live countdown to each upcoming exam.", topicTags: ["School Noticeboard (Firebase)"] },
  { id: "cs-sc-mob-10", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "Lost & Found Noticeboard", tech: ["Flutter","Firestore","Firebase Storage"], summary: "Students post lost-item photos to Firestore; others browse and claim found items.", topicTags: ["School Noticeboard (Firebase)"] },
  { id: "cs-sc-mob-11", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "Exam Timetable App (Firebase Firestore)", tech: ["Flutter","Firestore","Dart"], summary: "Admin edits the exam schedule in Firestore and all students see updates instantly.", topicTags: ["School Noticeboard (Firebase)"] },
  { id: "cs-sc-mob-12", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1 week", title: "Vocabulary Flashcard App with Progress", tech: ["React Native","AsyncStorage","Expo"], summary: "Learn new words with flip cards — mark cards as learnt and track your vocabulary growth.", topicTags: ["Flashcard Study App"] },
  { id: "cs-sc-mob-13", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1 week", title: "Science Formula Flashcard App", tech: ["React Native","Expo","AsyncStorage"], summary: "Memorise physics and chemistry formulae with front/back flip cards and a progress bar.", topicTags: ["Flashcard Study App"] },
  { id: "cs-sc-mob-14", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1-2 weeks", title: "Spaced Repetition Study App", tech: ["React Native","AsyncStorage","Expo"], summary: "Review cards using the SM-2 algorithm — difficult cards come back sooner for better retention.", topicTags: ["Flashcard Study App"] },
  { id: "cs-sc-mob-15", comingSoon: true, level: "school", category: "mobile", difficulty: "Beginner", duration: "1 week", title: "Language Learning Flashcard App", tech: ["Flutter","Dart","Hive"], summary: "Learn a new language with flip cards, audio pronunciation, and a streak counter.", topicTags: ["Flashcard Study App"] },
]