📘 DSA Sheet Web App - Frontend

This is the frontend application for the DSA Sheet Tracker, developed using React with TypeScript.
It allows users to register/login, track their progress across DSA topics, and view analytics for completed problems.
🚀 Features

    🔐 Authentication: Login with email and password

    🧠 Chapter-wise Problems: View DSA chapters and expand to see related problems

    ✅ Progress Tracking: Mark problems as complete/incomplete

    📊 Dashboard Analytics: Visual progress stats by difficulty and chapters

    👤 User Profile: See user details and total progress

    📦 API Integration: Communicates with a Node.js backend (hosted on Railway)

🖼️ Screens Overview

    Login Page

    Dashboard

    Chapter List

    Expand to see problems

    Checkbox to track progress

    Header: Profile, Progress, Logout

    Progress Page: Easy/Medium/Hard breakdown, Completion percentage

🛠️ Tech Stack

    ⚛️ React (with TypeScript)

    🎨 Tailwind CSS

    📡 Axios (API calls)

    🔐 JWT Auth

    🌍 React Router DOM

    🍪 LocalStorage (for token)

🧑‍💻 Setup Instructions

1. Clone the Repository

git clone https://github.com/YashuSingla/apna-college-frontend.git

2. Install Dependencies

npm install

3. Create .env File

REACT_API_BASE_URL=https://apanacollege-backend-production.up.railway.app

4. Run Locally

npm run dev

5. Build for Production

npm run build

🔗 Deployment

This app is optimized for deployment on Vercel.
Push to GitHub and import into Vercel → connect your repo → Vercel auto-deploys it.
📂 Folder Structure

src/
├── components/        # Reusable UI components (Header, Layout, etc.)
├── pages/             # Route pages (Login, Dashboard, Profile, Progress)
├── services/          # API functions (authService, dashboardService)
├── types/             # TypeScript interfaces
├── App.tsx            # Root component
└── main.tsx           # Entry point

📧 Feedback or Issues?

If you encounter any bugs or have feature requests, feel free to open an issue or pull request.
🧑‍💻 Developed by

Yashu Singla – [LinkedIn](https://www.linkedin.com/in/yashu-singla-8b0a95153/)