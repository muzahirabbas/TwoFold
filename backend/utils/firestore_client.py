
import firebase_admin
from firebase_admin import credentials, firestore
import os

# Use a service account
# In Google Cloud Run, set the GOOGLE_APPLICATION_CREDENTIALS env var
# For local development, download the service account key JSON file
try:
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred, {
        'projectId': os.environ.get('GCP_PROJECT'),
    })
except Exception as e:
    print(f"Could not initialize Firebase Admin SDK with Application Default Credentials: {e}")
    # Fallback for local dev if GOOGLE_APPLICATION_CREDENTIALS is not set
    # Ensure you have 'firebase-credentials.json' in your backend root
    if os.path.exists('firebase-credentials.json'):
        cred = credentials.Certificate('firebase-credentials.json')
        firebase_admin.initialize_app(cred)
    else:
        print("WARNING: Firebase credentials not found. Firestore client will not work.")


db = firestore.client()
