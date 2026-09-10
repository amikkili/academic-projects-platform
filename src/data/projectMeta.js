// Extra delivery/setup metadata per project.
// setupVideoUrl: paste a YouTube embed URL when available (null = shows placeholder).
// WHATSAPP: update to your actual number (country code + number, no +).

export const WHATSAPP = '919866376367'

export const projectMeta = {
  'sentiment-analysis': {
    repoUrl: null,   // e.g. 'https://github.com/your-username/sentiment-analysis'
    prerequisites: [
      'Python 3.8 or higher',
      'pip / pip3 (comes with Python)',
      'VS Code + Python Extension (Microsoft)',
      'Git (for cloning)',
    ],
    ideSteps: [
      'Download / clone the project and open the folder in VS Code',
      'Open the VS Code terminal (Ctrl + `) and run: pip install tensorflow keras pandas nltk',
      'Run the script: python sentiment_model.py',
      'IMDB dataset downloads automatically on first run (~80 MB)',
      'Training logs appear in terminal — takes 5-10 min on CPU',
    ],
    setupVideoUrl: null,
    deployPlatform: 'Streamlit Cloud',
    deployNote: 'Free tier — no credit card needed. Model loads from a saved .h5 file.',
    deploySteps: [
      'Add a requirements.txt to your project root: tensorflow, keras, pandas, nltk, streamlit',
      'Create app.py — a Streamlit wrapper that loads your saved model.h5 and takes text input',
      'Push your project folder to a public GitHub repository',
      'Go to share.streamlit.io → Sign in with GitHub → New app → select your repo',
      'Set the main file path to app.py → click Deploy',
      'Your app gets a live URL like https://your-name-sentiment.streamlit.app — share this in your viva',
    ],
  },

  'student-result-portal': {
    repoUrl: null,
    prerequisites: [
      'Node.js 18+ (includes npm)',
      'MongoDB Community Server 6+',
      'VS Code',
      'Git',
    ],
    ideSteps: [
      'Open project folder in VS Code',
      'Terminal → go to backend folder: cd backend → npm install → node server.js',
      'Open a second terminal → go to frontend: cd frontend → npm install → npm start',
      'MongoDB must be running (mongod service / MongoDB Compass)',
      'Open http://localhost:3000 in your browser',
    ],
    setupVideoUrl: null,
    deployPlatform: 'Railway (backend + DB) · Vercel (frontend)',
    deployNote: 'Railway gives you $5 free credit monthly — enough for a demo. MongoDB Atlas free tier is 512 MB.',
    deploySteps: [
      'Create a free MongoDB Atlas cluster at mongodb.com/atlas → get the connection string',
      'In your backend, replace the local MongoDB URL with the Atlas connection string in .env',
      'Push your project to GitHub (keep .env in .gitignore)',
      'Go to railway.app → New Project → Deploy from GitHub → select your repo → choose the backend folder',
      'Add environment variable MONGO_URI in Railway dashboard → your Atlas connection string',
      'Go to vercel.com → New Project → import the frontend folder → add REACT_APP_API_URL = your Railway backend URL → Deploy',
      'Share the Vercel URL as your live demo link',
    ],
  },

  'smart-irrigation': {
    repoUrl: null,
    prerequisites: [
      'Arduino IDE 2.x',
      'CH340 USB driver (for NodeMCU — download from WCH website)',
      'Python 3.8+ with pip',
      'Mosquitto MQTT Broker (free, mosquitto.org)',
    ],
    ideSteps: [
      'Install CH340 driver → plug NodeMCU via USB → check Device Manager for COM port',
      'Open .ino file in Arduino IDE → Board: NodeMCU 1.0 (ESP-12E), Port: your COM port',
      'Install libraries: PubSubClient, ESP8266WiFi (Arduino Library Manager)',
      'Update WiFi SSID/password in firmware → Upload to NodeMCU',
      'Run Python subscriber: python mqtt_subscriber.py (controls the relay)',
    ],
    setupVideoUrl: null,
    deployPlatform: 'HiveMQ Cloud (MQTT) · Railway (dashboard)',
    deployNote: 'IoT projects cannot be deployed like web apps — the hardware runs locally. Deploy the monitoring dashboard and use a cloud MQTT broker instead.',
    deploySteps: [
      'Create a free HiveMQ Cloud account at hivemq.com/mqtt-cloud — get your broker host, username, and password',
      'Update your NodeMCU .ino file: replace local broker IP with your HiveMQ host, add username/password to the MQTT connect call',
      'Re-upload the updated firmware to NodeMCU — it will now publish sensor data to the cloud broker',
      'If you have a web dashboard (HTML + MQTT.js), push it to GitHub and deploy to Vercel',
      'Share the dashboard URL as your demo — show live sensor readings in your viva',
      'Record a short screen + hardware recording as backup proof of the system working end-to-end',
    ],
  },

  'house-price-prediction': {
    repoUrl: null,
    prerequisites: [
      'Python 3.8 or higher',
      'pip / pip3',
      'VS Code + Python Extension',
      'Jupyter Notebook (optional, for interactive exploration)',
    ],
    ideSteps: [
      'Open project folder in VS Code',
      'Terminal: pip install scikit-learn pandas matplotlib seaborn numpy',
      'Run: python house_price.py',
      'Charts open in separate windows; model accuracy prints in terminal',
      'Open house_price.ipynb in Jupyter for step-by-step exploration',
    ],
    setupVideoUrl: null,
    deployPlatform: 'Streamlit Cloud',
    deployNote: 'Free tier. Save your trained model as model.pkl using joblib — Streamlit loads it on each request.',
    deploySteps: [
      'After training, save your model: import joblib → joblib.dump(model, "model.pkl")',
      'Create app.py: import streamlit, joblib → add input sliders for features → predict and display price',
      'Add requirements.txt: streamlit, scikit-learn, pandas, joblib, numpy',
      'Push the entire project (including model.pkl) to a public GitHub repo',
      'Go to share.streamlit.io → sign in → New App → select your repo → main file: app.py → Deploy',
      'Your live predictor URL is ready to share — enter BHK, area, location and see predicted price in real time',
    ],
  },

  'expense-tracker-app': {
    repoUrl: null,
    prerequisites: [
      'Flutter SDK 3.10+ (flutter.dev/docs/get-started)',
      'Android Studio (for emulator) OR physical Android device',
      'VS Code + Flutter + Dart extensions',
      'Git',
    ],
    ideSteps: [
      'Open project folder in VS Code',
      'Terminal: flutter pub get (downloads all packages)',
      'Start Android emulator in Android Studio OR connect a real device via USB (enable USB debugging)',
      'Terminal: flutter run',
      'App launches on the device/emulator',
    ],
    setupVideoUrl: null,
    deployPlatform: 'APK (Android) · Firebase Hosting (web build)',
    deployNote: 'No server needed — Flutter builds a self-contained APK. Share the APK file directly for demos.',
    deploySteps: [
      'Build a release APK: flutter build apk --release (output is build/app/outputs/flutter-apk/app-release.apk)',
      'Transfer the APK to your Android phone → tap to install (enable "Install from unknown sources" in settings)',
      'For a web demo: flutter build web → this creates a build/web/ folder',
      'Go to console.firebase.google.com → create a project → go to Hosting → run firebase init in your project folder',
      'Choose the build/web directory as the public folder → firebase deploy',
      'You get a live URL like https://your-app.web.app — works in any browser, shareable instantly',
    ],
  },

  'network-intrusion-detection': {
    repoUrl: null,
    prerequisites: [
      'Python 3.8 or higher',
      'pip / pip3',
      'VS Code + Python Extension',
      'Linux or WSL (Windows Subsystem for Linux) — recommended for Scapy',
    ],
    ideSteps: [
      'Terminal: pip install scikit-learn xgboost pandas numpy scapy fastapi uvicorn',
      'Download NSL-KDD dataset (KDDTrain+.txt) from Kaggle and place in project root',
      'Train model: python train_model.py (saves model.pkl)',
      'Start detection API: uvicorn main:app --reload',
      'Open http://localhost:8000/docs for the API dashboard',
    ],
    setupVideoUrl: null,
    deployPlatform: 'Render (FastAPI) · Hugging Face Spaces',
    deployNote: 'Deploy the prediction API — live packet capture cannot run in cloud, but the ML model API can. Use a Gradio demo on Hugging Face for the interactive part.',
    deploySteps: [
      'Ensure your model.pkl is committed to your GitHub repo (keep it under 100 MB)',
      'Add a requirements.txt: fastapi, uvicorn, scikit-learn, xgboost, pandas, numpy',
      'Add a Procfile in the root: web: uvicorn main:app --host 0.0.0.0 --port $PORT',
      'Go to render.com → New → Web Service → connect your GitHub repo → Runtime: Python 3 → Start command: uvicorn main:app --host 0.0.0.0 --port $PORT',
      'Render deploys your API — you get a URL like https://your-ids.onrender.com/docs',
      'For a visual demo: create a Gradio app on Hugging Face Spaces — upload network feature values and see NORMAL / ATTACK prediction live',
    ],
  },

  'face-recognition-attendance': {
    repoUrl: null,
    prerequisites: [
      'Python 3.8 or higher (3.10 recommended)',
      'cmake — required to compile dlib (cmake.org/download)',
      'VS Code + Python Extension',
      'Working webcam',
    ],
    ideSteps: [
      'Install cmake first, then: pip install dlib face_recognition opencv-python flask',
      'If dlib install fails on Windows, install Visual C++ Build Tools first',
      'Run: python register.py to register student faces via webcam',
      'Run: python app.py to start the Flask attendance server',
      'Open http://localhost:5000 to view live attendance',
    ],
    setupVideoUrl: null,
    deployPlatform: 'Local Network (LAN) · ngrok for live demo',
    deployNote: 'Face recognition needs a webcam — true cloud deployment is not possible. Use ngrok to expose your local server with a public URL during demos.',
    deploySteps: [
      'Make sure your Flask app is running locally: python app.py (server at http://localhost:5000)',
      'Download ngrok from ngrok.com → sign up free → copy your auth token',
      'In a new terminal: ngrok config add-authtoken YOUR_TOKEN → then: ngrok http 5000',
      'ngrok gives you a public URL like https://abc123.ngrok.io — this tunnels to your local machine',
      'Share this URL with your evaluator — they can see the live attendance dashboard from any device',
      'For the viva, keep your laptop open with the webcam active — demonstrate face registration and attendance marking live',
    ],
  },

  'library-management': {
    repoUrl: null,
    prerequisites: [
      'Java 17 or higher (JDK, not just JRE)',
      'Maven 3.6+',
      'MySQL 8.0 + MySQL Workbench',
      'VS Code + Extension Pack for Java (Microsoft)',
    ],
    ideSteps: [
      'Create a MySQL database named library_db in MySQL Workbench',
      'Open src/main/resources/application.properties → update spring.datasource.username and password',
      'Open project in VS Code → Maven automatically resolves dependencies',
      'Run: mvn spring-boot:run (or use VS Code Spring Boot Dashboard)',
      'Open http://localhost:8080 in browser — tables auto-created by Hibernate',
    ],
    setupVideoUrl: null,
    deployPlatform: 'Railway (Spring Boot + MySQL)',
    deployNote: 'Railway supports Java and managed MySQL in one project — the easiest full-stack Java deployment.',
    deploySteps: [
      'Go to railway.app → New Project → Add a MySQL database service → copy the connection URL from Variables tab',
      'Update application.properties: spring.datasource.url = your Railway MySQL URL, username and password from Railway',
      'Add a Procfile to your project root: web: java -jar target/library-management-0.0.1-SNAPSHOT.jar',
      'Build the JAR: mvn clean package -DskipTests (creates target/*.jar)',
      'Push everything to GitHub including the JAR (or configure Railway to build with Maven)',
      'Railway → New Service → GitHub Repo → select your repo → it auto-detects Java and deploys',
      'Open the Railway-generated URL — your full Spring Boot + MySQL app is live with all tables auto-created',
    ],
  },
}
