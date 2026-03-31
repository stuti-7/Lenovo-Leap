# EduReach — Free Learning Resources Platform

**SDG 4: Quality Education** | Capstone Project | Lenovo LEAP Next Gen Scholar Program

## Problem Statement
Millions of students in rural and semi-urban India lack access to structured, quality study materials. 
Without proper resources, students fall behind academically, widening the education gap.

## Solution
EduReach is a full-stack web application that provides free, organized study resources for students across all subjects and difficulty levels. Admins can add resources; students can browse, search, and filter them — all for free.

## Features
- User Registration & Login (Student / Educator / Admin roles)
- Browse resources by subject, type, and difficulty level
- Search resources by title
- Admin panel to add and delete resources
- Student dashboard with stats and recent resources
- Resource types: Video, PDF, Article, Quiz, Notes

## Tech Stack
- **Frontend:** React.js, React Router, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT + bcrypt

## Project Structure
```
edureach/
├── backend/
│   ├── models/         # User, Resource schemas
│   ├── routes/         # auth, resources, subjects
│   ├── middleware/     # JWT auth middleware
│   └── server.js
└── frontend/
    └── src/
        ├── pages/      # Home, Login, Register, Resources, Dashboard, Admin
        ├── components/ # Navbar
        └── context/    # AuthContext
```

## Setup & Run

### Prerequisites
- Node.js v16+
- MongoDB running locally (or MongoDB Atlas URI)

### Backend
```bash
cd backend
npm install
# Edit .env: set MONGO_URI and JWT_SECRET
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

App runs at `http://localhost:3000`, API at `http://localhost:5000`.

## SDG Alignment
This project directly supports **UN Sustainable Development Goal 4 — Quality Education** by providing free, accessible, structured learning materials to students who otherwise lack access to quality resources.
