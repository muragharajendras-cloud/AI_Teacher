# AI Tutor Platform - Project Summary

## 📌 Overview
The AI Tutor Platform is a full-stack, real-time educational ecosystem designed to provide students with personalized, conversational tutoring while keeping parents informed of their progress and focus. The platform utilizes advanced AI to teach, grade, and adapt to individual student needs based on their actual school textbooks.

## 👥 User Portals
1. **Public Portal:** High-converting landing pages, registration, and onboarding flows.
2. **Student Portal:** The core learning environment. Features a personalized dashboard, subject selection, mock tests, and the immersive real-time AI tutoring interface.
3. **Parent Portal:** A monitoring hub where parents can view real-time behavioral alerts, track study streaks, and download automated weekly academic reports.
4. **Admin Portal:** Centralized management system to monitor platform metrics (DAU, MRR), manage student profiles, and oversee the OCR processing pipeline.

## 🚀 Core Features
*   **Conversational AI Tutoring:** Real-time, voice-enabled chat interface where the AI acts as a warm, patient teacher. It guides students using the Socratic method rather than just giving answers.
*   **RAG-Based Textbook Learning:** Students upload PDF textbooks which are processed via OCR (Tesseract), chunked, and embedded into a vector database. The AI tutor only teaches using the context from these uploaded books to prevent hallucinations.
*   **Adaptive Testing Engine:** Automatically generates MCQs, short answers, and descriptive questions based on textbook chapters. It utilizes an Elo rating system to track student proficiency.
*   **Behavioral Monitoring:** Simulates computer vision to detect if a student is "gazing away" or "not present," generating alerts for the Parent Portal to ensure focused study sessions.
*   **Automated Weekly Reports:** Celery background workers compile test scores, study hours, and AI-generated recommendations into PDF reports emailed directly to parents.

## 🛠️ Tech Stack (Zero-Cost MVP Architecture)
*   **Frontend:** Next.js 14 (App Router), Tailwind CSS, Lucide React, and shadcn/ui for a premium, responsive design.
*   **Backend API:** FastAPI (Python) for asynchronous, high-speed request handling and WebSocket streaming.
*   **Database & Auth:** Supabase (PostgreSQL) for user authentication, relational data, and file storage.
*   **Caching & Tasks:** Redis and Celery for managing background OCR tasks and report generation.
*   **Containerization:** Fully containerized using Docker Compose for seamless orchestration across frontend, backend, database, and workers.

## 🧠 AI Infrastructure
The platform recently migrated to a highly optimized, low-cost AI stack:
*   **LLM Engine:** **Groq Cloud** running **Gemma 2 (9B)** for lightning-fast, free-tier educational inference.
*   **Vector Database:** **Supabase `pgvector`** for semantic search and retrieval.
*   **Embeddings:** Local **HuggingFace Sentence Transformers** (`all-MiniLM-L6-v2`) to eliminate embedding costs.
*   **Speech-to-Text (STT):** Local **faster-whisper** processing audio on the server.
*   **Text-to-Speech (TTS):** Browser **Web Speech API** handling voice synthesis natively on the client device.
*   **Email Notifications:** **Resend API** for zero-cost transactional emails.
