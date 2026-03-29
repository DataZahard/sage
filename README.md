# Sage AI – Intelligent Sustainable Commerce Engine
**Developer:** DataZahard  
**Status:** Production-Ready Portfolio Project  
**Core Stack:** FastAPI (Python) | Google Gemini 1.5 Flash | Supabase (PostgreSQL)

## 🌿 Project Overview
Sage is an advanced AI assistant built to bridge the gap between e-commerce and sustainability. It provides real-time insights into eco-friendly products, evaluates sustainability metrics, and features an automated escalation logic for complex customer queries.

## 🛠️ Technical Architecture
- **Backend:** High-performance **FastAPI** server hosted on Render.
- **AI Brain:** **Google Gemini 1.5 Flash** integrated via Generative AI SDK for natural language understanding.
- **Database:** **Supabase (PostgreSQL)** for persistent, secure storage of user chat history.
- **Security:** Implemented **Environment Variables** (OS-level) to protect sensitive API credentials.
- **Frontend:** Responsive Glassmorphism UI hosted on GitHub Pages.

## ⚙️ Key Features
- **Contextual Reasoning:** Sage understands the nuances of "Greenwashing" and sustainable materials.
- **Intent Detection:** Automatically flags "refund" or "complaint" intents for human agent escalation.
- **Chat Persistence:** Every interaction is logged with a unique User ID in the PostgreSQL database.

## 🚀 How to Run Locally
1. Clone the repo: `git clone https://github.com/DataZahard/sage.git`
2. Install dependencies: `pip install -r requirements.txt`
3. Set up `.env` file with `GEMINI_API_KEY`, `SUPABASE_URL`, and `SUPABASE_KEY`.
4. Run: `uvicorn main:app --reload`
