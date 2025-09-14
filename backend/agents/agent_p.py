
import os
from utils.gemini_client import get_gemini_pro_model

class PersonalCoachAgent:
    def __init__(self, user_id, partner_id, couple_id):
        self.user_id = user_id
        self.partner_id = partner_id
        self.couple_id = couple_id
        self.model = get_gemini_pro_model()

    def generate_reflection(self, diary_entry, user_history):
        """Generates a reflection based on a user's diary entry and historical data."""
        prompt = f"""
        You are a personal relationship coach. Your client, user {self.user_id}, is in a relationship (couple {self.couple_id}) with user {self.partner_id}.
        
        Client's historical context (summarized):
        {user_history}

        Today's diary entry from your client:
        "{diary_entry}"

        Based on this, provide a short, supportive, and insightful reflection. Focus on their feelings and experiences. Do not give direct advice unless the entry explicitly asks for it. Frame your reflection in a way that encourages self-awareness. Keep it to 2-3 sentences.
        """
        response = self.model.generate_content(prompt)
        return response.text

    def adapt_quiz(self, quiz_from_t, user_style):
        """Adapts a quiz from Agent T to the user's personal style."""
        prompt = f"""
        You are a personal relationship coach for user {self.user_id}.
        The lead strategist has provided a quiz for your client.
        
        Quiz content:
        {quiz_from_t}

        Your client's communication style is: {user_style}.

        Please adapt the wording and tone of this quiz to better suit your client's style, making it more engaging for them without changing the core questions.
        """
        response = self.model.generate_content(prompt)
        return response.text
