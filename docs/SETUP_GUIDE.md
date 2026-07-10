# 🏥 Healthcare Assistant - Complete Setup Guide

## 📋 Table of Contents
1. [System Requirements](#requirements)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running)
5. [API Documentation](#api)
6. [Database Schema](#database)
7. [AI Models](#ai)
8. [Troubleshooting](#troubleshooting)

---

## Requirements

- **Node.js** 16.x or higher
- **Python** 3.8 or higher
- **MongoDB** 5.0 or higher (local or Atlas)
- **npm** or **yarn**
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## Installation

### Step 1: Clone Repository
```bash
cd healthcare-assistant
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install AI Service Dependencies
```bash
cd ../ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 4: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

## Configuration

### Backend Configuration (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthcare
JWT_SECRET=your_secret_key_here
AI_SERVICE_URL=http://localhost:5001
CORS_ORIGIN=http://localhost:3000
```

### AI Service Configuration (.env)
```
FLASK_ENV=development
FLASK_DEBUG=True
PORT=5001
```

### Frontend Configuration (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_AI_URL=http://localhost:5001/api
```

---

## Running the Application

### Option 1: Run All Services Manually

**Terminal 1 - MongoDB**
```bash
mongod
```

**Terminal 2 - Backend**
```bash
cd backend
npm run dev  # or npm start
```

**Terminal 3 - AI Service**
```bash
cd ai-service
source venv/bin/activate
python app.py
```

**Terminal 4 - Frontend**
```bash
cd frontend
npm start
```

### Option 2: Run with Startup Scripts

**On macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**On Windows:**
```bash
start.bat
```

### Option 3: Run with Docker
```bash
docker-compose up -d
```

---

## API Documentation

### Authentication

**Register User**
```
POST /api/auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient" | "doctor"
}
Response: { token, user }
```

**Login**
```
POST /api/auth/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: { token, user }
```

**Get Current User**
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
Response: { user_data }
```

### Diagnosis

**Get AI Prediction**
```
POST /api/diagnosis/predict
Body: {
  "symptoms": ["fever", "headache", "cough"]
}
Response: {
  "disease": "Viral Fever",
  "confidence": 92,
  "possible_causes": [...],
  "recommended_tests": [...],
  "health_advice": [...]
}
```

**Get Diagnosis History**
```
GET /api/diagnosis/history
Headers: Authorization: Bearer <token>
Response: [diagnoses_array]
```

### Appointments

**Book Appointment**
```
POST /api/appointments/book
Body: {
  "doctorId": "doctor_id",
  "appointmentDate": "2026-07-15",
  "timeSlot": "10:00 AM"
}
Response: { appointment_data }
```

**Get Appointments**
```
GET /api/appointments
Headers: Authorization: Bearer <token>
Response: [appointments_array]
```

### Doctors

**Get All Doctors**
```
GET /api/doctors
Response: [doctors_array]
```

**Get Doctor Details**
```
GET /api/doctors/:id
Response: { doctor_data }
```

### Admin

**Get Statistics**
```
GET /api/admin/statistics
Headers: Authorization: Bearer <admin_token>
Response: {
  "totalUsers": 100,
  "totalDoctors": 10,
  "totalPatients": 90,
  "totalDiagnoses": 500
}
```

---

## Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  age: Number,
  gender: String,
  role: "patient" | "doctor" | "admin",
  specialization: String,
  qualifications: [String],
  isVerified: Boolean,
  profileImage: String,
  bio: String,
  createdAt: Date
}
```

### Diagnosis Schema
```javascript
{
  _id: ObjectId,
  patientId: ObjectId,
  symptoms: [String],
  aiPrediction: {
    disease: String,
    confidence: Number,
    possibleCauses: [String],
    recommendedTests: [String],
    healthAdvice: [String]
  },
  doctorDiagnosis: {
    doctorId: ObjectId,
    diagnosis: String,
    prescription: String,
    followUpDate: Date
  },
  status: "pending" | "reviewed" | "closed",
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Schema
```javascript
{
  _id: ObjectId,
  patientId: ObjectId,
  doctorId: ObjectId,
  appointmentDate: Date,
  timeSlot: String,
  status: "scheduled" | "completed" | "cancelled",
  notes: String,
  createdAt: Date
}
```

---

## AI Models

### Symptom-Disease Mapping
The AI service uses a trained RandomForest classifier that maps symptoms to diseases:

**Supported Diseases:**
- Viral Fever
- Common Cold
- Migraine
- Asthma
- Bronchitis
- Flu
- Allergies
- Gastroenteritis
- Hypertension
- Diabetes

**Supported Symptoms:**
- Fever, Headache, Cough, Fatigue, Vomiting
- Chest Pain, Sore Throat, Nausea, Diarrhea
- Shortness of Breath, Body Aches, Runny Nose
- And more...

### Training

To train the model with new data:
```python
from ai_service.app import train_model
train_model()
```

---

## Troubleshooting

### Issue: "Port already in use"
**Solution:**
```bash
# Find and kill process on port 3000 (React)
lsof -ti:3000 | xargs kill -9

# Find and kill process on port 5000 (Backend)
lsof -ti:5000 | xargs kill -9

# Find and kill process on port 5001 (AI)
lsof -ti:5001 | xargs kill -9
```

### Issue: MongoDB connection error
**Solution:**
1. Ensure MongoDB is running: `mongod`
2. Check connection string in `.env`
3. For MongoDB Atlas, ensure IP whitelist includes your IP

### Issue: CORS error
**Solution:**
Update `CORS_ORIGIN` in backend `.env`:
```
CORS_ORIGIN=http://localhost:3000
```

### Issue: AI Service not responding
**Solution:**
1. Check if Flask app is running
2. Verify Python dependencies: `pip install -r requirements.txt`
3. Check logs for errors

### Issue: Frontend can't connect to backend
**Solution:**
1. Verify backend is running on correct port
2. Check `REACT_APP_API_URL` in frontend `.env`
3. Check browser console for CORS errors

---

## Performance Optimization

- **Frontend:** Enable code splitting, lazy loading
- **Backend:** Use caching, optimize MongoDB queries
- **AI:** Use model caching, batch predictions

---

## Security Best Practices

✅ Use strong JWT_SECRET  
✅ Enable HTTPS in production  
✅ Validate all inputs  
✅ Use environment variables  
✅ Implement rate limiting  
✅ Regular security audits  

---

## Deployment

### Deploy to Heroku
```bash
git init
heroku create
git push heroku main
```

### Deploy to AWS/GCP/Azure
Follow provider-specific deployment guides

---

## Support & Contact

- **Email:** support@healthai.com
- **GitHub Issues:** [Report bugs](/)
- **Documentation:** This guide
- **Internship Contact:** Your Mentor

---

**Built with ❤️ for AI/ML Internship - 2026**
