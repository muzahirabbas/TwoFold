
import google.generativeai as genai
import os

def get_gemini_pro_model():
    """Initializes and returns the Gemini Pro model instance."""
    # In Google Cloud Run, set the GEMINI_API_KEY env var
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set.")
        
    genai.configure(api_key=api_key)
    
    model = genai.GenerativeModel('gemini-pro')
    return model
