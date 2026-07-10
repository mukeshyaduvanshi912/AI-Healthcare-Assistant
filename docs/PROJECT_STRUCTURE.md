# Project Structure

healthcare-assistant/
├── frontend/                          # React.js Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js             # Navigation bar
│   │   │   ├── Footer.js             # Footer component
│   │   │   └── ...                   # Other reusable components
│   │   ├── pages/
│   │   │   ├── Home.js               # Landing page
│   │   │   ├── Login.js              # Login page
│   │   │   ├── Register.js           # Registration page
│   │   │   ├── PatientDashboard.js   # Patient dashboard
│   │   │   ├── DoctorDashboard.js    # Doctor dashboard
│   │   │   ├── AdminDashboard.js     # Admin dashboard
│   │   │   ├── DiagnosisForm.js      # Symptom selection
│   │   │   └── Results.js            # Diagnosis results
│   │   ├── App.js                    # Main app component
│   │   ├── index.js                  # React entry point
│   │   └── App.css                   # Global styles
│   ├── public/
│   │   └── index.html                # HTML template
│   ├── package.json                  # NPM dependencies
│   └── .env                          # Environment variables
│
├── backend/                           # Node.js/Express API
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js               # Authentication routes
│   │   │   ├── diagnosis.js          # Diagnosis prediction routes
│   │   │   ├── appointments.js       # Appointment management
│   │   │   ├── doctors.js            # Doctor listing/details
│   │   │   └── admin.js              # Admin routes
│   │   ├── models/
│   │   │   ├── User.js               # User model
│   │   │   ├── Diagnosis.js          # Diagnosis model
│   │   │   └── Appointment.js        # Appointment model
│   │   ├── middleware/
│   │   │   └── auth.js               # JWT authentication middleware
│   │   └── server.js                 # Express server
│   ├── .env                          # Environment variables
│   ├── package.json                  # NPM dependencies
│   └── .gitignore
│
├── ai-service/                        # Python Flask AI Service
│   ├── app.py                        # Flask application
│   ├── models/
│   │   ├── disease_predictor.py      # ML model
│   │   └── preprocessor.py           # Data preprocessing
│   ├── data/
│   │   ├── diseases.json             # Disease-symptom mapping
│   │   └── training_data.csv         # Training data
│   ├── requirements.txt              # Python dependencies
│   ├── .env                          # Environment variables
│   └── .gitignore
│
├── docs/
│   ├── SETUP_GUIDE.md                # Complete setup guide
│   ├── API.md                        # API documentation
│   ├── DATABASE.md                   # Database schema
│   └── DEPLOYMENT.md                 # Deployment guide
│
├── .gitignore                        # Git ignore rules
├── .env.example                      # Example environment file
├── docker-compose.yml                # Docker compose configuration
├── start.sh                          # Linux/macOS startup script
├── start.bat                         # Windows startup script
├── package.json                      # Root package.json (optional)
└── README.md                         # Project README

## Key Files Explained

### Frontend (`frontend/`)
- **components/**: Reusable UI components (Navbar, Footer, etc.)
- **pages/**: Full page components (Home, Dashboard, etc.)
- **App.js**: Main application component with routing
- **package.json**: React dependencies (react, react-router-dom, axios)

### Backend (`backend/`)
- **routes/**: API endpoints (Auth, Diagnosis, Appointments, etc.)
- **models/**: MongoDB schemas (User, Diagnosis, Appointment)
- **middleware/**: JWT authentication and validation
- **server.js**: Express server configuration
- **package.json**: Node.js dependencies (express, mongoose, jwt)

### AI Service (`ai-service/`)
- **app.py**: Flask application with prediction endpoint
- **models/**: Machine learning models for disease prediction
- **data/**: Disease-symptom mappings and training data
- **requirements.txt**: Python dependencies (flask, scikit-learn, pandas)

### Documentation (`docs/`)
- **SETUP_GUIDE.md**: Installation and configuration guide
- **API.md**: Complete API documentation
- **DATABASE.md**: MongoDB schema details
- **DEPLOYMENT.md**: Production deployment guide

## Dependencies Overview

### Frontend
- React 18.2
- React Router 6
- Axios (HTTP client)
- Tailwind CSS (Styling)
- Chart.js (Data visualization)

### Backend
- Express 4.18
- MongoDB/Mongoose
- JWT (Authentication)
- Bcrypt (Password hashing)
- Axios (AI service communication)

### AI Service
- Flask 2.3
- Scikit-learn (ML library)
- NumPy, Pandas (Data processing)
- Python 3.8+

## Environment Variables

All `.env` files are pre-configured but should be customized:

**Backend (.env)**
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `AI_SERVICE_URL`: URL of AI service

**AI Service (.env)**
- `PORT`: Flask port (default: 5001)
- `FLASK_ENV`: Development/production mode

**Frontend (.env)**
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_AI_URL`: AI service URL

## Getting Started

1. **Install dependencies** (see SETUP_GUIDE.md)
2. **Configure environment variables** (.env files)
3. **Start all services** (run start.sh or start.bat)
4. **Access application** at http://localhost:3000

## Typical Development Workflow

1. Frontend developer modifies React components
2. Backend developer adds new API endpoints
3. AI developer improves ML models
4. All services communicate via REST API
5. Data persisted in MongoDB
