# Render Deployment Checklist

## Repository
**GitHub URL**: https://github.com/heshmasree2809/Smart-Attendance-Management-System.git

## Before You Deploy

- [ ] Code is pushed to GitHub
- [ ] MongoDB Atlas database is created
- [ ] MongoDB connection string is ready
- [ ] JWT secret is generated (use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)

## Render Configuration

### Basic Settings
- [ ] **Name**: `scaams-backend` (or your preferred name)
- [ ] **Repository**: `heshmasree2809/Smart-Attendance-Management-System`
- [ ] **Root Directory**: `backend`
- [ ] **Environment**: `Node`
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`
- [ ] **Branch**: `main` (or your default branch)

### Environment Variables (Required)

Add these in Render dashboard under "Environment":

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/scaams?retryWrites=true&w=majority
JWT_SECRET=<your-generated-secret-here>
CORS_ORIGIN=https://your-frontend-url.vercel.app
NODE_ENV=production
PORT=5000
```

- [ ] `MONGO_URI` added
- [ ] `JWT_SECRET` added (generate with crypto)
- [ ] `CORS_ORIGIN` added (your frontend URL)
- [ ] `NODE_ENV` set to `production`
- [ ] `PORT` set to `5000`

## MongoDB Atlas Setup

- [ ] Cluster created
- [ ] Database user created with password
- [ ] Network Access: IP Whitelist set to `0.0.0.0/0` (allow all)
- [ ] Connection string copied

## After Deployment

- [ ] Deployment successful (check Render logs)
- [ ] Test API endpoint: `https://your-app.onrender.com/`
- [ ] Test login endpoint: `POST https://your-app.onrender.com/api/auth/login`
- [ ] Update frontend API URL to Render URL
- [ ] Test CORS by making request from frontend

## Testing Your Deployed API

### Test Health Check
```bash
curl https://your-app.onrender.com/
```

Expected response:
```json
{"message": "SCAAMS API is running"}
```

### Test Login (after seeding data)
```bash
curl -X POST https://your-app.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'
```

## Common Issues

### Issue: "Application failed to respond"
- Check Render logs for errors
- Verify PORT environment variable is set
- Ensure server.js uses `process.env.PORT`

### Issue: "Cannot connect to MongoDB"
- Verify MONGO_URI is correct
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Ensure database user has read/write permissions

### Issue: "CORS error from frontend"
- Verify CORS_ORIGIN matches your frontend URL exactly
- Include protocol (https://)
- No trailing slash

### Issue: "JWT errors"
- Verify JWT_SECRET is set in Render
- Ensure it's the same secret used to generate tokens

## Free Tier Limitations

⚠️ **Important**: Render free tier services:
- Spin down after 15 minutes of inactivity
- Take 30-60 seconds to wake up on first request
- Have 750 hours/month limit

Consider upgrading to paid tier for production use.

## Next Steps

- [ ] Set up custom domain (optional)
- [ ] Configure auto-deploy on git push
- [ ] Set up monitoring/alerts
- [ ] Add health check endpoint
- [ ] Configure backup strategy for MongoDB
