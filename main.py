import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import ai_engine

app = FastAPI()

# CORS Fix: Allows your GitHub/Vercel frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Connection Setup
URL: str = os.getenv("SUPABASE_URL")
KEY: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(URL, KEY)

@app.get("/")
def health_check():
    return {"status": "Sage AI is online", "database": "Connected to Supabase"}

@app.post("/whatsapp/webhook")
async def chat_with_sage(user_id: str, message: str):
    try:
        # 1. Get Real AI Response from Gemini
        ai_data = ai_engine.get_sage_response(message)
        
        # 2. Log the chat into Supabase for permanent storage
        supabase.table("chat_history").insert({
            "user_id": user_id,
            "message": message,
            "response": ai_data["reply"]
        }).execute()
        
        return ai_data
    except Exception as e:
        print(f"Server Error: {e}")
        raise HTTPException(status_code=500, detail="Sage is currently resting. Try again later.")
