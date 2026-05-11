# AI-Powered Electronic Prescription and Drug Interaction Checker

## Project Overview

A complete production-ready full-stack application for managing electronic prescriptions with AI-powered drug interaction checking. Built with React, Node.js, MongoDB, and Python FastAPI.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Zustand
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **AI Service**: Python, FastAPI, Pandas
- **Authentication**: JWT
- **PDF Generation**: PDFKit

## Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- MongoDB (local or cloud)
- npm or yarn

## Project Structure

```
ai-prescription-checker/
├── frontend/                 # React Vite app
├── backend/                  # Node.js Express API
└── ai-service/              # Python FastAPI service
```

## Installation & Setup

### 1. Clone and Setup

```bash
mkdir ai-prescription-checker
cd ai-prescription-checker
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 3. Setup Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on: `http://localhost:5000`

### 4. Setup AI Service

```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

AI Service runs on: `http://localhost:8000`

## Database Setup

### MongoDB Local Setup

```bash
# On macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Verify connection
mongo
```

### MongoDB Cloud (Atlas)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`

## Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/prescription-checker
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
PORT=5000
PYTHON_AI_SERVICE_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=AI Prescription Checker
```

### AI Service (.env)

```
FASTAPI_ENV=development
PORT=8000
CSV_DATA_PATH=./data/drug_interactions.csv
```

## User Roles & Permissions

### 1. Doctor
- Create prescriptions
- View own prescriptions
- Access patient data (if authorized)
- Receive drug interaction warnings

### 2. Patient
- View own prescriptions
- Download prescription PDFs
- Track prescription status

### 3. Pharmacist
- View prescriptions
- Update prescription status
- Verify drug interactions

### 4. Admin
- Manage all prescriptions
- Manage user accounts
- System administration

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Prescriptions
- `POST /api/prescriptions` - Create prescription (Doctor only)
- `GET /api/prescriptions/:id` - Get prescription by ID
- `GET /api/prescriptions/patient/:patientId` - Get patient's prescriptions
- `GET /api/prescriptions/doctor/all/prescriptions` - Get doctor's prescriptions
- `PUT /api/prescriptions/:id/status` - Update status (Pharmacist/Admin)
- `DELETE /api/prescriptions/:id` - Delete prescription
- `GET /api/prescriptions/:id/pdf` - Download prescription PDF

### Drug Interactions (Python API)
- `POST /api/check-interactions` - Check drug interactions
- `GET /api/drugs` - Get all available drugs
- `GET /api/interactions/:drugName` - Get interactions for specific drug

## Features

### 1. Authentication
- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcryptjs
- Secure token management

### 2. Prescription Management
- Create, read, update, delete prescriptions
- Track prescription status
- Multiple medicines per prescription
- Prescription expiry dates

### 3. Drug Interaction Checking
- Real-time interaction checking
- Severity levels (LOW, MEDIUM, HIGH)
- Recommendations for drug combinations
- CSV-based drug database

### 4. PDF Generation
- Download prescriptions as PDF
- Professional formatting
- Doctor and patient information
- Drug interaction warnings
- Digital signature placeholder

### 5. Dashboard
- Doctor dashboard with prescription list
- Patient dashboard with personal prescriptions
- Pharmacist dashboard for prescription approval
- Real-time status updates

## Testing

### Register Test User

```bash
# Doctor Account
Name: Dr. John Smith
Email: doctor@example.com
Password: password123
Role: Doctor
License: DOC12345
Specialization: Cardiology

# Patient Account
Name: Jane Doe
Email: patient@example.com
Password: password123
Role: Patient

# Pharmacist Account
Name: Bob Johnson
Email: pharmacist@example.com
Password: password123
Role: Pharmacist
License: PHARM12345
```

### Test Drug Interactions

Try these medicine combinations:
1. Aspirin + Warfarin (HIGH severity)
2. Metformin + Alcohol (MEDIUM severity)
3. Lisinopril + Potassium (HIGH severity)

## Deployment

### Deploy Backend to Heroku

```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Deploy Frontend to Vercel

```bash
cd frontend
npm run build
vercel
```

### Deploy AI Service to Heroku

```bash
cd ai-service
heroku create your-ai-service-name
git push heroku main
```

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` is correct
- For Atlas, whitelist your IP

### CORS Error
- Update `CORS_ORIGIN` in backend .env
- Ensure frontend URL matches

### JWT Token Expired
- Token expires after 7 days
- User needs to log in again
- Check `JWT_SECRET` is same on all restarts

### Python Service Not Found
- Ensure Python service is running on port 8000
- Check `PYTHON_AI_SERVICE_URL` in backend .env
- Verify CSV file path is correct

## Production Checklist

- [ ] Set strong `JWT_SECRET`
- [ ] Use production MongoDB URI
- [ ] Enable HTTPS
- [ ] Set `NODE_ENV=production`
- [ ] Use environment-specific API URLs
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Set up error logging
- [ ] Configure CORS properly
- [ ] Enable HTTPS for all APIs
- [ ] Add database backups
- [ ] Implement audit logging
- [ ] Set up monitoring and alerts

## Security Best Practices

1. **Password Security**
   - Passwords hashed with bcryptjs
   - Never store plain text passwords
   - Minimum 6 characters

2. **Token Security**
   - JWT tokens expire after 7 days
   - Tokens stored in localStorage (consider using httpOnly cookies)
   - Always send tokens with Authorization header

3. **API Security**
   - CORS enabled for frontend only
   - Role-based access control
   - Input validation on all endpoints
   - SQL injection prevention with Mongoose

4. **Data Privacy**
   - Patient data protected by RBAC
   - Doctors can only see their own prescriptions
   - Audit logging for sensitive operations

## Contributing

1. Create feature branches
2. Follow project structure
3. Test thoroughly
4. Submit pull requests

## License

MIT License

## Support

For issues and questions, please create an issue in the repository or contact support.
