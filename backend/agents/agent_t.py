
import os
from utils.gemini_client import get_gemini_pro_model

class StrategistAgent:
    def __init__(self):
        self.model = get_gemini_pro_model()

    def create_weekly_plan(self, couple_history, research_docs):
        """Creates a weekly plan of quizzes, games, and tips for the couple."""
        prompt = f"""
        You are a master relationship strategist, Agent T. Your role is to create a weekly engagement plan for a couple based on their history and proven relationship research.

        Couple's historical summary (data from both partners combined and anonymized):
        {couple_history}

        Relevant research snippets and resources:
        {research_docs}

        Based on the provided data, generate a weekly plan consisting of:
        1.  **A Theme of the Week:** A central topic for the couple to focus on (e.g., 'Financial Intimacy', 'Conflict Resolution Styles', 'Shared Future Goals').
        2.  **Two AI-Generated Quizzes:** Create two short, insightful quizzes (3-5 questions each) related to the theme. For each quiz, provide a title and the questions.
        3.  **One Partner Game/Challenge:** Design a lighthearted, collaborative game or challenge that helps them practice the week's theme. Provide a name and simple instructions.
        4.  **Three Actionable Tips:** Provide three concise tips related to the theme that the partners can easily implement.

        Format your output as a JSON object with keys: "theme", "quizzes", "game", "tips".
        The "quizzes" key should be a list of objects, each with "title" and "questions" (a list of strings).
        The "game" key should be an object with "name" and "instructions".
        The "tips" key should be a list of strings.
        """
        response = self.model.generate_content(prompt)
        return response.text

    def generate_relationship_report(self, couple_history):
        """Generates a weekly relationship report card."""
        prompt = f"""
        You are a master relationship strategist, Agent T.
        You are analyzing the combined inputs from a couple over the last week.

        Couple's historical summary for the week:
        {couple_history}

        Generate a "Relationship Report Card" for the couple. This report should be positive, encouraging, and forward-looking. NEVER reveal raw data from one partner to the other. Synthesize the combined data into insights.

        The report should include:
        1.  **A Shared Strength:** Identify one area where the couple seems to be connecting well.
        2.  **An Opportunity for Growth:** Gently highlight a potential area for improvement or deeper connection.
        3.  **A Conversation Starter:** Suggest one open-ended question for the couple to discuss together.

        Format your output as a JSON object with keys: "strength", "growth_opportunity", "conversation_starter".
        """
        response = self.model.generate_content(prompt)
        return response.text
