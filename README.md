

## TrustWise Project

TrustWise is a full-stack application that performs text analysis using machine learning models. It consists of a **FastAPI backend** for text analysis and a **React frontend** for user interaction. The application uses pre-trained models from the `transformers` library and stores analysis results in a **MongoDB** database.

---

## **Features**
- **Text Analysis**: Analyze text using two pre-trained models:
  1. **Roberta Base Go Emotions**: For emotion analysis.
  2. **Bert Base Multilingual Sentiment**: For sentiment analysis.
- **History**: View past analysis results in a table and visualize them using charts.
- **Graphs**: View past analysis graphed too.
- **Docker Support**: Run the application locally or in Docker containers.

## **Prerequisites**
1. **Python 3.11**: For the FastAPI backend.
2. **Node.js**: For the React frontend.
3. **MongoDB**: For the database (optional if using Docker).
4. **Docker** (Optional): For containerized deployment.

---

## **How to Run Locally**

### **1. Backend (FastAPI)**
1. Navigate to the backend directory:
   ```bash
   cd /path/to/trust_wise_project

I have already provide the .env files( I know I should'nt , it not safe , but I did'nt have any means to share the mongo_connection url)

## Install dependencies:
pip install -r requirements.txt


## run backend:
uvicorn mode_fastapi:app --reload

## for frontend :

# go the folder:
cd /path/to/trust_wise_project/my-app

# install dependencies
npm install

## run frontend: npm start

## for docker :
# to build
docker compose build
# to get it up and running 
docker compose up

## Access the application:

Frontend: http://localhost:3000
Backend API: http://localhost:8000




