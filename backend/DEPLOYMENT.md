# Deploy to Render

## Prerequisites

1. Create a [Render account](https://render.com)
2. Set up a MongoDB database (MongoDB Atlas recommended)

## Deployment Steps

### Option 1: Using Render Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Create MongoDB Database**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/scaams`)
   - Whitelist all IPs (0.0.0.0/0) for Render access

3. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository with your backend code
   - Configure:
     - **Name**: `scaams-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

4. **Add Environment Variables**
   Click "Advanced" and add:
   - `MONGO_URI` = Your MongoDB connection string
   - `JWT_SECRET` = A random secure string (generate one)
   - `CORS_ORIGIN` = Your frontend URL (e.g., `https://your-frontend.vercel.app`)
   - `NODE_ENV` = `production`

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your API will be available at: `https://scaams-backend.onrender.com`

### Option 2: Using Render Blueprint (render.yaml)

1. Push code to GitHub with the `render.yaml` file
2. Go to Render Dashboard → "New +" → "Blueprint"
3. Connect repository and select `backend/render.yaml`
4. Add environment variables manually
5. Deploy

## Environment Variables

Required environment variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/scaams
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
CORS_ORIGIN=https://your-frontend-url.vercel.app
NODE_ENV=production
PORT=5000
```

## Generate JWT Secret

Run this in your terminal to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Post-Deployment

1. **Test your API**
   ```bash
   curl https://scaams-backend.onrender.com/
   ```

2. **Seed the database** (optional)
   - Add a temporary route or use MongoDB Compass to add initial data

3. **Update frontend**
   - Update your frontend API base URL to point to Render URL
   - Update CORS_ORIGIN in Render dashboard if frontend URL changes

## Important Notes

- **Free tier sleeps after 15 minutes of inactivity** - First request may take 30-60 seconds
- **Upgrade to paid plan** for always-on service
- **Monitor logs** in Render dashboard for errors
- **Set up custom domain** (optional) in Render settings

## Troubleshooting

### Deployment fails
- Check build logs in Render dashboard
- Verify all dependencies are in `package.json`
- Ensure Node version is compatible

### Can't connect to MongoDB
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas (should include 0.0.0.0/0)
- Ensure database user has proper permissions

### CORS errors
- Verify CORS_ORIGIN matches your frontend URL exactly
- Check if frontend is using HTTPS

### API not responding
- Check Render logs for errors
- Verify environment variables are set correctly
- Test with curl or Postman first
