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
]
