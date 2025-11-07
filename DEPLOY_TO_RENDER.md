# Deploy SCAAMS Backend to Render

**Repository**: https://github.com/heshmasree2809/Smart-Attendance-Management-System.git

## Step-by-Step Deployment Guide

### Step 1: Set Up MongoDB Atlas (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up/Login and create a **FREE** cluster
3. Click **"Database Access"** → **"Add New Database User"**
   - Username: `scaams_user`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: **Read and write to any database**
4. Click **"Network Access"** → **"Add IP Address"**
   - Click **"Allow Access from Anywhere"**
   - IP: `0.0.0.0/0`
5. Click **"Database"** → **"Connect"** → **"Connect your application"**
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://scaams_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/scaams?retryWrites=true&w=majority`

### Step 2: Generate JWT Secret

Open your terminal and run:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the output - this is your JWT secret.

### Step 3: Push Code to GitHub (if not already done)

```bash
cd backend
git add .
git commit -m "Backend ready for deployment"
git push origin main
```

### Step 4: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com) (sign up if needed)

2. Click **"New +"** → **"Web Service"**

3. Click **"Connect a repository"** → Connect your GitHub account

4. Select repository: **`heshmasree2809/Smart-Attendance-Management-System`**

5. Configure the service:
   ```
   Name: scaams-backend
   Root Directory: backend
   Environment: Node
   Region: Choose closest to you
   Branch: main
   Build Command: npm install
   Start Command: npm start
   ```

6. Select **"Free"** instance type

7. Click **"Advanced"** → **"Add Environment Variable"**

   Add these 5 variables:

   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | Your MongoDB connection string from Step 1 |
   | `JWT_SECRET` | Your generated secret from Step 2 |
   | `CORS_ORIGIN` | `*` (or your frontend URL later) |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |

8. Click **"Create Web Service"**

9. Wait 2-3 minutes for deployment to complete

### Step 5: Test Your Deployment

Once deployed, you'll get a URL like: `https://scaams-backend.onrender.com`

**Test the API:**
```bash
curl https://scaams-backend.onrender.com/
```

Expected response:
```json
{"message": "SCAAMS API is running"}
```

### Step 6: Seed Initial Data (Optional)

You can add test users directly in MongoDB Atlas:

1. Go to MongoDB Atlas → **"Database"** → **"Browse Collections"**
2. Create collection: `users`
3. Insert a test admin user (password is hashed for "admin123"):

```json
{
  "name": "Admin User",
  "email": "admin@scaams.com",
  "password": "$2a$10$rKvVLZ8Z8Z8Z8Z8Z8Z8Z8OqKvVLZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8",
  "role": "admin",
  "createdAt": {"$date": "2024-01-01T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-01-01T00:00:00.000Z"}
}
```

Or use the seed script by adding a temporary route in your backend.

## Your Deployed API

✅ **API Base URL**: `https://scaams-backend.onrender.com`

### Available Endpoints:

- `GET /` - Health check
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile (requires token)
- `GET /api/admin/users` - Get all users (admin only)
- And more...

## Update Frontend

In your frontend code, update the API base URL:

```javascript
const API_URL = "https://scaams-backend.onrender.com/api";
```

## Important Notes

⚠️ **Free Tier Limitations:**
- Service sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- 750 hours/month limit

💡 **Tips:**
- Keep the Render dashboard open to monitor logs
- Check logs if something doesn't work
- Update CORS_ORIGIN to your actual frontend URL once deployed

## Troubleshooting

### "Application failed to respond"
- Check Render logs for errors
- Verify all environment variables are set correctly

### "Cannot connect to MongoDB"
- Verify MongoDB connection string is correct
- Check password doesn't have special characters that need encoding
- Ensure IP whitelist includes `0.0.0.0/0`

### CORS errors
- Update `CORS_ORIGIN` to match your frontend URL exactly
- Include `https://` protocol

## Next Steps

1. Deploy your frontend (Vercel/Netlify)
2. Update CORS_ORIGIN with frontend URL
3. Test the full application
4. Consider upgrading to paid tier for production

---

**Need help?** Check the Render logs or MongoDB Atlas monitoring for detailed error messages.
