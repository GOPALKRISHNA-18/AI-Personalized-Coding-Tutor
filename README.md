# AI Personalized Coding Tutor

A comprehensive AI-powered personalized coding tutor application featuring an interactive code editor, AI-guided assessment, personalized hints, adaptive learning paths, and progress analytics.

---

## Architecture Overview

The repository is organized into two independent sub-projects:

```
AI Personalized Coding Tutor/
├── backend/                  # Spring Boot 3 + Java 17 REST API
│   ├── src/
│   ├── pom.xml
│   └── target/
├── frontend/                 # React 18 + Vite Frontend Application
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── node_modules/
└── README.md                 # Project root documentation
```

---

## Getting Started

### 1. Backend (Spring Boot)

#### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL Server running on port `3306` (database: `ai_coding_tutor`)

#### Running the Backend
```bash
cd backend
mvn spring-boot:run
```
The backend server runs on `http://localhost:8080`.

---

### 2. Frontend (React + Vite)

#### Prerequisites
- Node.js (v18+)
- npm

#### Running the Frontend
```bash
cd frontend
npm install   # If installing dependencies afresh
npm run dev   # Starts Vite development server
```
The frontend application will be available at `http://localhost:5173`.

---

## Features
- **AI Skill Assessment**: Evaluates syntax, memory models, and algorithmic problem-solving across Java, Python, JavaScript, C, and C++.
- **Interactive Monaco Code Editor**: Real-time syntax detection and compilation feedback.
- **Progressive Hints (Levels 1-3)**: Conceptual nudges, pseudocode, and edge-case handling.
- **Adaptive Learning Pathways**: Dynamic progression based on quiz scores and submission history.
- **24/7 AI Tutor Chat**: Conversational AI guidance for compiler errors and algorithms.
