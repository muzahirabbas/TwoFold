
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from agents.orchestrator import process_daily_input, run_weekly_strategist_job

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def hello():
    return "TwoFold App Backend is running!"

@app.route('/submit-daily-input', methods=['POST'])
def submit_daily_input():
    data = request.get_json()
    user_id = data.get('userId')
    diary_entry = data.get('diaryEntry')

    if not user_id or not diary_entry:
        return jsonify({"error": "Missing userId or diaryEntry"}), 400

    try:
        result = process_daily_input(user_id, diary_entry)
        return jsonify(result), 200
    except Exception as e:
        print(f"Error processing daily input: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/trigger-weekly-job', methods=['POST'])
def trigger_weekly_job():
    # This could be triggered by a Cloud Scheduler job
    data = request.get_json()
    couple_id = data.get('coupleId')

    if not couple_id:
        return jsonify({"error": "Missing coupleId"}), 400
        
    try:
        result = run_weekly_strategist_job(couple_id)
        return jsonify(result), 200
    except Exception as e:
        print(f"Error running weekly job: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
