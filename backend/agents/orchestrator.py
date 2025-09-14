
from utils.firestore_client import db
from agents.agent_p import PersonalCoachAgent
from agents.agent_t import StrategistAgent
import json
import datetime

def process_daily_input(user_id, diary_entry):
    """Orchestrates the response to a user's daily input."""
    # 1. Fetch user and couple data
    user_ref = db.collection('users').document(user_id)
    user_doc = user_ref.get()
    if not user_doc.exists:
        raise ValueError("User not found")
    user_data = user_doc.to_dict()
    couple_id = user_data.get('coupleId')

    couple_ref = db.collection('couples').document(couple_id)
    couple_doc = couple_ref.get()
    if not couple_doc.exists:
        raise ValueError("Couple not found")
    couple_data = couple_doc.to_dict()
    partner_id = [uid for uid in couple_data.get('memberIds') if uid != user_id][0]

    # TODO: Fetch user history (summaries/embeddings)
    user_history_summary = f"User {user_id} has been focusing on communication and future planning."

    # 2. Trigger Personal Coach Agent (P1/P2)
    agent_p = PersonalCoachAgent(user_id, partner_id, couple_id)
    reflection = agent_p.generate_reflection(diary_entry, user_history_summary)

    # 3. Save input and generated report
    input_ref = db.collection('inputs').add({
        'uid': user_id,
        'coupleId': couple_id,
        'type': 'diary',
        'content': diary_entry,
        'createdAt': datetime.datetime.now()
    })

    report_ref = db.collection('reports').add({
        'uid': user_id,
        'coupleId': couple_id,
        'type': 'personal_reflection',
        'content': reflection,
        'sourceInputId': input_ref[1].id,
        'createdAt': datetime.datetime.now()
    })

    return {"status": "success", "reflection": reflection, "reportId": report_ref[1].id}

def run_weekly_strategist_job(couple_id):
    """Orchestrates the weekly job for Agent T."""
    # 1. Fetch relevant data for the couple
    # TODO: This should be a sophisticated query for summaries/embeddings over the last week/month
    couple_history_summary = f"Couple {couple_id} has been discussing work-life balance and showing strength in mutual support."
    
    # Fetch research docs from Firestore
    resources_docs = db.collection('resources').stream()
    research_docs = "\n".join([doc.to_dict().get('content', '') for doc in resources_docs])

    # 2. Trigger Strategist Agent (T)
    agent_t = StrategistAgent()
    
    # Generate weekly plan
    plan_str = agent_t.create_weekly_plan(couple_history_summary, research_docs)
    plan_data = json.loads(plan_str)

    # Generate report card
    report_str = agent_t.generate_relationship_report(couple_history_summary)
    report_data = json.loads(report_str)

    # 3. Save the generated content to Firestore
    # Save quizzes
    for quiz in plan_data.get('quizzes', []):
        db.collection('quizzes').add({
            'coupleId': couple_id,
            'title': quiz['title'],
            'questions': quiz['questions'],
            'createdBy': 'agent_t',
            'assignedAt': datetime.datetime.now(),
            'status': 'pending'
        })
    
    # Save game
    game = plan_data.get('game')
    if game:
        db.collection('games').add({
            'coupleId': couple_id,
            'name': game['name'],
            'instructions': game['instructions'],
            'createdBy': 'agent_t',
            'assignedAt': datetime.datetime.now(),
            'status': 'pending'
        })
        
    # Save shared report
    db.collection('reports').add({
        'coupleId': couple_id,
        'type': 'weekly_summary',
        'content': report_data,
        'createdBy': 'agent_t',
        'createdAt': datetime.datetime.now()
    })

    return {"status": "success", "coupleId": couple_id}
