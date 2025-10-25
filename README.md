

# TwoFold: Your AI Relationship Companion ❤

<div align="center">

[![TwoFold Demo Video](https://img.youtube.com/vi/pcbiuGlLgg8/0.jpg)](https://www.youtube.com/watch?v=pcbiuGlLgg8)

*(Click the image above to watch the demo tutorial)*
</div>

<p align="center">
  <strong>The AI-powered companion for couples, designed to deepen connection and foster growth.</strong>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
    <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Google Cloud">
</p>

---


## **Table of Contents**

* [What is TwoFold?](#what-is-twofold-)
* [Core Features](#core-features-)
* [Tech Stack](#tech-stack-)
* [Prerequisites: What You'll Need](#prerequisites-what-youll-need-)
* [Step 1: Firebase Project Setup](#step-1-firebase-project-setup-️)
* [Step 2: Local Development Setup](#step-2-local-development-setup-)
* [Step 3: Running & Testing Locally](#step-3-running--testing-locally-)
* [Step 4: Deploying the Backend Services](#step-4-deploying-the-backend-services-)
* [Step 5: Deploying the Frontend](#step-5-deploying-the-frontend-)
* [Contributing](#contributing-)
* [License](#license-)

---

## **What is TwoFold?** 🤔

TwoFold is not just another app; it's a dedicated space for you and your partner to grow together. It combines behavioral science with the power of generative AI to provide personalized insights, facilitate meaningful conversations, and make relationship growth an engaging, daily practice.

Our core philosophy is built on **privacy and partnership**. Each partner has their own secure login and a personal AI coach. Insights are shared on a couple's dashboard only when synthesized and curated by a master "Strategist" AI, ensuring personal reflections remain private while shared goals are illuminated.

---

## **Core Features** ✨

* **🤖 Personal AI Coaches:** Each partner gets a dedicated AI that understands their personal history, goals, and communication style, providing tailored daily advice and reflections.
* **🧠 Master AI Strategist:** A higher-level AI analyzes anonymized, combined data from both partners, along with academic research, to create weekly plans, quizzes, and "report cards" for the couple.
* ** dashboards Dual Dashboards:**
    * **Your Private Space:** A personal dashboard with your diary, goals, and direct advice from your AI coach.
    * **Our Shared Space:** A couple's dashboard showing AI-curated reports, shared strengths, and fun challenges. **Raw data is never shared.**
* **📝 Personalized Quizzes & Games:** Move beyond generic questionnaires. The AI generates dynamic quizzes and lighthearted games based on your unique relationship dynamics.
* **💌 Weekly Relationship Report Card:** Get a beautiful, synthesized summary of your shared strengths and opportunities for growth each week.
* **🔒 Secure & Private by Design:** Your personal entries are for your eyes and your AI coach's only. Security is not an afterthought; it's the foundation.

---

## **Tech Stack** 🛠️

| Area                  | Technology                                                                                                                              |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | [React.js](https://reactjs.org/)                                                                                                        |
| **Backend (AI Orch.)** | [Python (Flask)](https://flask.palletsprojects.com/) on [Google Cloud Run](https://cloud.google.com/run)                                |
| **Backend (Secure Ops)**| [Firebase Cloud Functions](https://firebase.google.com/docs/functions)                                                                  |
| **Database** | [Firebase Firestore](https://firebase.google.com/docs/firestore)                                                                        |
| **Authentication** | [Firebase Authentication](https://firebase.google.com/docs/auth)                                                                        |
| **AI Model** | [Google Gemini Pro](https://deepmind.google/technologies/gemini/)                                                                       |
| **Deployment** | [Google Cloud Run](https://cloud.google.com/run) (Backend) & [Cloudflare Pages](https://pages.cloudflare.com/) / Vercel / Netlify (Frontend) |

---

## **Prerequisites: What You'll Need** ✅

Before you begin, ensure you have the following accounts and tools installed:

1.  **Node.js & npm**: [Download here](https://nodejs.org/)
2.  **Python 3.9+**: [Download here](https://www.python.org/)
3.  **Google Cloud Account**: [Sign up here](https://cloud.google.com/)
4.  **Firebase Account**: Included with your Google account.
5.  **GitHub Account**: [Sign up here](https://github.com/)
6.  **Google AI Studio API Key (for Gemini)**: [Get your key here](https://aistudio.google.com/app/apikey)
7.  **Firebase CLI**: `npm install -g firebase-tools`
8.  **Google Cloud CLI (`gcloud`)**: [Installation guide](https://cloud.google.com/sdk/docs/install)

---

## **Step 1: Firebase Project Setup** ☁️

This is the backbone of your application.

1.  **Create Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Enable Firestore**:
    * Go to **Build > Firestore Database** and create a database in **production mode**.
    * Go to the **Rules** tab and paste the security rules provided in the project files to protect user data.
3.  **Enable Authentication**:
    * Go to **Build > Authentication > Sign-in method**.
    * Enable the **Email/Password** and **Google** providers.
4.  **Get Frontend Config Keys**:
    * Go to **Project Settings (⚙️) > General**.
    * Under "Your apps," click the web icon (`</>`) to create a new web app.
    * Copy the `firebaseConfig` object. You'll need this for the frontend.
5.  **Get Backend Service Account Key**:
    * Go to **Project Settings > Service accounts**.
    * Click "Generate new private key."
    * Rename the downloaded JSON file to `firebase-credentials.json` and place it in the `backend/` directory. **This file is secret and should never be committed to GitHub.**

---

## **Step 2: Local Development Setup** 💻

This section guides you through setting up all parts of the application on your local machine.

### **2a. Clone the Repository**
```bash
git clone [https://github.com/your-username/twofold-app.git](https://github.com/your-username/twofold-app.git)
cd twofold-app
````

### **2b. Backend (Flask) Setup**

This server handles the AI logic.

  * `cd backend`
  * `python -m venv venv`
  * `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
  * `pip install -r requirements.txt`
  * Create a `.env` file and add your credentials:
    ```
    GCP_PROJECT="your-firebase-project-id"
    GEMINI_API_KEY="your-gemini-api-key"
    GOOGLE_APPLICATION_CREDENTIALS="firebase-credentials.json"
    ```
  * `cd ..` (return to the root directory)

### **2c. Backend (Cloud Functions) Setup**

This server handles secure operations like the couple invitation system.

1.  **Log in to Firebase**:
    ```bash
    firebase login
    ```
2.  **Initialize Functions**: In the project's root directory, run:
    ```bash
    firebase init functions
    ```
      * Answer the prompts: Use an `existing project`, select `JavaScript`, use `ESLint`, and install dependencies now.
3.  **Add Function Code**: Replace the contents of the newly created `functions/index.js` file with the code from the project's source.
4.  **Install Dependencies**:
    ```bash
    cd functions
    npm install
    cd ..
    ```

### **2d. Local Emulator Setup**

This allows you to run a simulated Firebase environment on your machine for easy testing.

1.  **Initialize Emulators**: In the project's root directory, run:
    ```bash
    firebase init emulators
    ```
2.  **Select Emulators**: Use the spacebar to select `Functions`, `Firestore`, and `Authentication`.
3.  **Configure Ports**: Press Enter to accept the default ports for each.
4.  **Enable UI**: Select `Yes` to enable the Emulator UI, a powerful debugging tool.
5.  **Download Emulators**: Select `Yes` to download the required files.

### **2e. Frontend (React) Setup**

1.  **Install Dependencies**:
      * `cd frontend`
      * `npm install`
2.  **Create Environment File**: Create a `.env.local` file and paste your Firebase web app keys:
    ```
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    # ... and the rest of the keys
    REACT_APP_BACKEND_URL=[http://127.0.0.1:5000](http://127.0.0.1:5000)
    ```
3.  **Connect Frontend to Emulators**: **This is a crucial step for local testing.** Replace the contents of `frontend/src/api/firebase.js` with the following to ensure your app talks to the local emulators:
    ```javascript
    // File: frontend/src/api/firebase.js
    import { initializeApp } from "firebase/app";
    import { getAuth, connectAuthEmulator } from "firebase/auth";
    import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
    import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

    const firebaseConfig = { /* Your config keys here */ };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const functions = getFunctions(app);

    // Connect to emulators when running locally
    if (window.location.hostname === "localhost") {
      console.log("Testing locally: Connecting to emulators.");
      connectAuthEmulator(auth, "http://localhost:9099");
      connectFirestoreEmulator(db, "localhost", 8080);
      connectFunctionsEmulator(functions, "localhost", 5001);
    }

    export { auth, db, functions };
    ```

-----

## **Step 3: Running & Testing Locally** 🚀

To test the full app, you'll run three services simultaneously. Open three separate terminals.

  * **Terminal 1 (Root Dir): Start Firebase Emulators**

    > This runs a local version of Cloud Functions, Auth, and Firestore.

    ```bash
    firebase emulators:start
    ```

    > **View the Emulator UI at `http://localhost:4000` to see your local database, function logs, and auth state in real-time.**

  * **Terminal 2 (`backend/` Dir): Start Flask Backend**

    > This runs the Python server that handles AI agent logic.

    ```bash
    cd backend
    source venv/bin/activate
    flask run
    ```

  * **Terminal 3 (`frontend/` Dir): Start React Frontend**

    > This serves the user interface.

    ```bash
    cd frontend
    npm start
    ```

Now open `http://localhost:3000` in your browser and test the complete sign-up, couple invitation, and diary submission flow.

-----

## **Step 4: Deploying the Backend Services** 🌐

1.  **Deploy the Cloud Function**:
    ```bash
    firebase deploy --only functions
    ```
2.  **Deploy the Flask Backend to Cloud Run**:
      * Authenticate and set your project: `gcloud auth login` and `gcloud config set project your-firebase-project-id`.
      * From the `backend/` directory, run the deploy command:
        ```bash
        gcloud run deploy twofold-backend --source . --region your-region --allow-unauthenticated --set-env-vars="GEMINI_API_KEY=your-gemini-api-key"
        ```
      * **Copy the final Service URL.**

-----

## **Step 5: Deploying the Frontend** ✨

We'll use Cloudflare Pages as an example.

1.  **Push to GitHub**: Make sure your latest code is pushed to your GitHub repository.
2.  **Configure Cloudflare Pages**:
      * In the Cloudflare dashboard, go to **Workers & Pages \> Create application \> Pages \> Connect to Git**.
      * Select your repository.
      * Use the following build settings:
          * **Framework preset**: `Create React App`
          * **Root Directory**: `frontend`
          * **Build command**: `npm run build`
          * **Build output directory**: `frontend/build`
      * **Set Environment Variables**: In the settings, add all your `REACT_APP_...` variables. **Crucially, update `REACT_APP_BACKEND_URL` to the Service URL you got from Cloud Run in the previous step.**
3.  **Save and Deploy**. Your app is now live\!

-----

## **Contributing** 🤝

Contributions are welcome\! Please feel free to submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

-----

## **License** 📄

Distributed under the MIT License.

```

```






