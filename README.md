# Team Task Manager (Full-Stack Web App)

A modern full-stack web application that allows teams to manage projects, assign tasks, and track progress with role-based access control.

---

## Features

###  Authentication
- User Signup & Login
- Secure password hashing
- JWT-based authentication

###  Role-Based Access Control
- **Admin**
  - Create projects
  - Assign tasks
- **Member**
  - View assigned tasks
  - Update task status

###  Project Management
- Create and manage projects
- View all projects

### Task Management
- Create tasks under projects
- Assign tasks to users
- Update task status:
  - To Do
  - In Progress
  - Done

###  Dashboard
- Total tasks
- Completed tasks
- Pending tasks
- Overdue tasks

---

##  Tech Stack

### Frontend
- React.js
- Axios
- React Router

### Backend
- Flask
- Flask SQLAlchemy
- Flask Bcrypt
- JWT Authentication

### Database
- MySQL (Railway)

### Deployment
- Backend: Railway
- Frontend: Vercel / Railway

---

## Installation (Local Setup)

### Clone Repository
```bash
git clone https://github.com/yourusername/team-task-manager.git
cd team-task-manager