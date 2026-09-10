export const categories = [
  { id: 'all',      label: 'All Projects',     color: 'bg-slate-100 text-slate-700' },
  { id: 'ml',       label: 'Machine Learning', color: 'bg-cyan-100 text-cyan-700' },
  { id: 'web',      label: 'Web Development',  color: 'bg-blue-100 text-blue-700' },
  { id: 'iot',      label: 'IoT',              color: 'bg-green-100 text-green-700' },
  { id: 'data',     label: 'Data Science',     color: 'bg-purple-100 text-purple-700' },
  { id: 'mobile',   label: 'Mobile Apps',      color: 'bg-orange-100 text-orange-700' },
  { id: 'security', label: 'Cybersecurity',    color: 'bg-red-100 text-red-700' },
]

export const difficultyColors = {
  Beginner:     'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced:     'bg-red-100 text-red-700',
}

export const projects = [
  {
    id: 'sentiment-analysis',
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
]
