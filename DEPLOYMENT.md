# 🚀 Deployment Guide

## Backend Deployment (Render)

### Step 1: Prepare Backend
1. Ensure `requirements.txt` is in the root directory ✅
2. Ensure `render.yaml` configuration exists ✅

### Step 2: Deploy to Render
1. Go to [https://render.com](https://render.com) and sign in with GitHub
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository: `pashaarshad/RBAC_GP3`
4. Configure the service:
   - **Name:** `rbac-backend` (or your preferred name)
   - **Region:** Choose closest to you
   - **Branch:** `main` (or `finaly-code`)
   - **Root Directory:** Leave blank
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python "week 5/src/main.py"`
   - **Instance Type:** Free (or your preferred tier)

5. **Add Environment Variables (REQUIRED for AI responses):**
   - Click "Advanced" → "Add Environment Variable"
   - **Required for LLM:**
     - `LLM_API_KEY` = Your OpenRouter API key (get from: https://openrouter.ai/keys)
     - `LLM_BASE_URL` = `https://openrouter.ai/api/v1`
     - `LLM_MODEL` = `mistralai/mistral-7b-instruct`
   - See `LLM_SETUP.md` for detailed LLM configuration guide

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL: `https://rbac-backend-xxxx.onrender.com`

### Step 3: Update CORS in Backend
Once deployed, update the CORS origins in `week 5/src/main.py` to include your Vercel frontend URL.

---

## Frontend Deployment (Vercel)

### Step 1: Update Environment Variable
1. Open `rbac-frontend/.env.production`
2. Update `NEXT_PUBLIC_API_URL` with your Render backend URL:
   ```
   NEXT_PUBLIC_API_URL=https://rbac-backend-xxxx.onrender.com
   ```
3. Commit and push this change

### Step 2: Deploy to Vercel
1. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New"** → **"Project"**
3. Import your repository: `pashaarshad/RBAC_GP3`
4. Configure the project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `rbac-frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_API_URL` = `https://rbac-backend-xxxx.onrender.com`
   - Select "Production", "Preview", and "Development"

6. Click **"Deploy"**
7. Wait for deployment (2-5 minutes)
8. Your app will be live at: `https://your-app.vercel.app`

---

## Post-Deployment Configuration

### Update Backend CORS
Update `week 5/src/main.py` line 40:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-app.vercel.app",  # Add your Vercel URL
        "http://localhost:3000"  # Keep for local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit, push, and Render will auto-deploy the update.

---

## Testing Deployment

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Try logging in with demo credentials:
   - Admin: `admin` / `admin123`
   - Finance: `finance_user` / `pass123`
   - HR: `hr_user` / `pass123`
   - Marketing: `marketing_user` / `pass123`

3. Check backend health:
   - Visit: `https://rbac-backend-xxxx.onrender.com/health`
   - Should return: `{"status":"ok"}`

---

## Troubleshooting

### Backend Issues
- Check Render logs in the dashboard
- Ensure all dependencies are in `requirements.txt`
- Verify the start command path is correct
- Check health endpoint is accessible

### Frontend Issues
- Check Vercel deployment logs
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check browser console for CORS errors
- Ensure backend allows your Vercel domain in CORS

### Network Errors
- Verify backend is running (check health endpoint)
- Confirm CORS includes your frontend URL
- Check environment variables are set correctly
- Look for HTTPS/HTTP mismatches

---

## Quick Deploy Commands

### Push to trigger auto-deploy:
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

Both Render and Vercel will auto-deploy on push! 🚀
