# SMANSABA Web Project

A modern web application for SMAN 1 Bangsri, featuring a Laravel backend API and a React (Vite) frontend. This project is production-ready and includes full documentation for installation, configuration, and deployment.

---

## 🚀 Features
- Admin dashboard for managing news, gallery, teachers, achievements, extracurriculars, and courses
- Public-facing website for school information
- RESTful API (Laravel)
- Modern React frontend (Vite, MUI, Tailwind)
- File upload & image management
- Authentication & password reset
- Ready for Railway (backend) & Vercel (frontend) deployment

---

## 📁 Project Structure
```
backend/   # Laravel API backend
frontend/  # React + Vite frontend
flowcharts/ # System diagrams
*.md       # Documentation
```

---

## ⚡ Quick Start

### 1. Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 18 & npm
- MySQL/MariaDB

### 2. Backend Setup
See [backend/README.md](backend/README.md) and [backend/DATABASE_SETUP.md](backend/DATABASE_SETUP.md) for full details.

```bash
cd backend
cp .env.example .env   # Copy env config
composer install       # Install PHP dependencies
npm install            # Install JS dependencies (for Vite)
php artisan key:generate
# Edit .env for your DB credentials
php artisan migrate --seed
php artisan storage:link
php artisan serve      # Start local server
```

### 3. Frontend Setup
See [frontend/README.md](frontend/README.md) for details.

```bash
cd frontend
cp .env.example .env   # Copy env config
npm install            # Install dependencies
npm run dev            # Start local dev server
```

---

## ⚙️ Environment Configuration
- **Backend:** Edit `backend/.env` (see `.env.example` for template)
- **Frontend:** Edit `frontend/.env` (set `VITE_API_URL` to your backend API URL)

---

## 📦 Deployment
- Full deployment guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- Backend: Railway (free tier supported)
- Frontend: Vercel (free tier supported)

---

## 📚 Additional Documentation
- [DATABASE_SETUP.md](backend/DATABASE_SETUP.md): Database & API setup
- [EMAIL_SETUP_GUIDE.md](backend/EMAIL_SETUP_GUIDE.md): Email configuration (Gmail SMTP, Mailtrap, etc.)
- [FILE_UPLOAD_GUIDE.md](FILE_UPLOAD_GUIDE.md): File & image upload
- [TESTING_GUIDE.md](TESTING_GUIDE.md): Testing instructions
- [PERFORMANCE_OPTIMIZATION.md](PERFORMANCE_OPTIMIZATION.md): Optimization tips
- [FLOWCHART_USER_ADMIN.md](FLOWCHART_USER_ADMIN.md): System flowcharts

---

## 🛠️ Troubleshooting
- See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md#🐛-troubleshooting) and [DATABASE_SETUP.md](backend/DATABASE_SETUP.md#🔧-troubleshooting)
- Common issues: CORS, database connection, storage link, email setup

---

## 📄 License
This project is open-source and MIT licensed. See [backend/README.md](backend/README.md) for details.

---
     
## 🙋 Need Help?
- Read the full documentation above
- Check logs on Railway/Vercel
- Google specific error messages
- Join Railway/Vercel Discord communities

--- 

**Happy Coding & Deploying!** 🚀
