Student Check-in System (Minimal Full-Stack)

Structure:
- backend/   : Django REST backend (SQLite for quick testing)
- frontend/  : React frontend (minimal CRA structure)

Quick start (Linux/Mac/WSL):
1. Backend:
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver

2. Frontend:
   cd frontend
   npm install
   # optionally set API URL:
   # export REACT_APP_API_URL=http://localhost:8000/api
   npm start

Notes:
- Backend API base: http://localhost:8000/api
- Endpoints:
  POST  /api/students/      -> create student
  GET   /api/students/      -> list students
  POST  /api/checkins/      -> create checkin (body: { "studentId":"..." })
  GET   /api/checkins/      -> list checkins (with student details)

This is a minimal starter project. For production use:
- Use a proper DB (MongoDB / PostgreSQL)
- Add authentication, input sanitization, CORS settings
- Deploy backend & frontend to hosting platforms
