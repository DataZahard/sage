import google.generativeai as genai
import os

# Configure Gemini using the Environment Variable from Render
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

def get_sage_response(user_message):
    # System Instruction: Tells the AI how to behave
    chat = model.start_chat(history=[])
    
    context_prompt = (
        "You are Sage, the intelligent assistant for Rayeva Sustainable Commerce. "
        "Your goal is to help users understand eco-friendly products and sustainable living. "
        "Keep responses professional, concise, and helpful. "
        f"User says: {user_message}"
    )
    
    response = chat.send_message(context_prompt)
    
    # Escalation Logic: Triggers if specific 'high-priority' words are used
    priority_keywords = ["refund", "human", "talk to agent", "scam", "complaint"]
    should_escalate = any(word in user_message.lower() for word in priority_keywords)
    
    return {
        "reply": response.text,
        "escalate": should_escalate
    }

