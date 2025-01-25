from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from datetime import datetime
from transformers import pipeline
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

models = {
    "model_1": pipeline(task="text-classification", model="SamLowe/roberta-base-go_emotions", top_k=None),
    "model_2": pipeline(task="text-classification", model="nlptown/bert-base-multilingual-uncased-sentiment", top_k=None),
}

#cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),  # frontend 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

#db
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable is not set.")

try:
    client = MongoClient(MONGO_URI)
    db = client['result_storage']
    collection = db['results']
except Exception as e:
    raise RuntimeError(f"Failed to connect to MongoDB: {e}")


class TextAnalysisRequest(BaseModel):
    text: str

@app.post("/result/{model}")
def result_text(model: str, request: TextAnalysisRequest):
    print(f"Model received: {model}")
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text input cannot be empty.")
    text = request.text
    result = models[model]([text])
    analysis_result = result[0][0]

    document = {
        "model_id": model,
        "text": text,
        "analysis": {
            "label": analysis_result.get("label"),
            "score": analysis_result.get("score"),
        },
        "timestamp": datetime.utcnow(),
    }
    collection.insert_one(document)

    return {
        "text": text,
        "analysis": {
            "label": analysis_result.get("label"),
            "score": analysis_result.get("score"),
        },
    }
    
@app.get("/history")
def get_history():
    history = list(collection.find({}, {"_id": 0, "model_id": 1, "text": 1, "analysis": 1, "timestamp": 1}))
    return {"history": history}

