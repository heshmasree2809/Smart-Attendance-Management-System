# SCAAMS Backend

Student College Attendance and Assignment Management System - Backend API

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your values
```

3. Start MongoDB locally or use MongoDB Atlas

4. Run the server:
```bash
npm start          # Production
npm run dev        # Development with auto-reload
npm run seed       # Seed database with sample data
```

## Deploy to Render

**Repository**: https://github.com/heshmasree2809/Smart-Attendance-Management-System.git

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions or [../DEPLOY_TO_RENDER.md](../DEPLOY_TO_RENDER.md) for a complete step-by-step guide.

**Quick Deploy:**
1. Push code to GitHub
2. Create MongoDB Atlas database (free tier)
3. Generate JWT secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
4. Go to [Render Dashboard](https://dashboard.render.com)
5. New Web Service → Connect repo: `heshmasree2809/Smart-Attendance-Management-System`
6. Set Root Directory to `backend`
7. Add environment variables (MONGO_URI, JWT_SECRET, CORS_ORIGIN, NODE_ENV, PORT)
8. Deploy!

Your API will be live at: `https://your-app-name.onrender.com`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Admin
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### Attendance
- `POST /api/attendance/generate` - Generate QR code for attendance
- `POST /api/attendance/scan` - Scan QR code to mark attendance
- `POST /api/attendance/mark` - Manually mark attendance
- `GET /api/attendance/faculty` - Get attendance records (faculty)
- `GET /api/attendance/student` - Get attendance records (student)

### Assignments
- `POST /api/assignments/create` - Create assignment (faculty)
- `POST /api/assignments/submit/:id` - Submit assignment (student)
- `GET /api/assignments/faculty` - Get faculty assignments
- `GET /api/assignments/student` - Get student assignments

### Student
- `GET /api/student/dashboard` - Student dashboard

### Faculty
- `GET /api/faculty/dashboard` - Faculty dashboard

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Multer for file uploads
- Helmet for security
- CORS enabled
