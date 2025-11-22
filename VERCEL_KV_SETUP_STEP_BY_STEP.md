# Vercel KV Setup - Step by Step Guide

## ⚠️ Current Error
You're seeing: `KV_REST_API_URL: Not set, KV_REST_API_TOKEN: Not set`

This means Vercel KV is not configured yet. Follow these steps:

## Step 1: Go to Vercel Dashboard

1. Open your browser and go to: **https://vercel.com/dashboard**
2. Log in to your Vercel account
3. Find and click on your project: **quotes-lines** (or whatever your project name is)

## Step 2: Navigate to Storage

1. In your project dashboard, look at the top menu
2. Click on the **"Storage"** tab (next to Deployments, Settings, etc.)
3. If you don't see a Storage tab, click on **"Settings"** first, then look for **"Storage"** in the sidebar

## Step 3: Create KV Database

1. Click the **"Create Database"** button (usually a big blue button)
2. You'll see different database options:
   - **Postgres** (SQL database)
   - **KV** (Key-Value / Redis) ← **SELECT THIS ONE**
   - **Blob** (File storage)
3. Click on **"KV"** option
4. You'll see a form to configure:
   - **Name**: Enter a name like `quotes-db` or `quotes-kv`
   - **Region**: Choose the closest region to your users (e.g., `us-east-1`, `eu-west-1`, `ap-south-1`)
5. Click **"Create"** button

## Step 4: Wait for Creation

- Vercel will create the KV database (takes 10-30 seconds)
- Once created, you'll see it in your Storage list

## Step 5: Environment Variables are Auto-Added

✅ **Good News**: When you create a KV database, Vercel **automatically** adds these environment variables to your project:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

You don't need to manually add them!

## Step 6: Verify Environment Variables

1. In your project dashboard, go to **"Settings"**
2. Click on **"Environment Variables"** in the sidebar
3. You should see:
   - `KV_REST_API_URL` (with a value starting with `https://`)
   - `KV_REST_API_TOKEN` (with a long token string)

If you see these, you're good! ✅

## Step 7: Redeploy Your Project

**Important**: After creating KV, you MUST redeploy for the environment variables to be available:

### Option A: Redeploy from Dashboard
1. Go to **"Deployments"** tab
2. Find your latest deployment
3. Click the **"⋯"** (three dots) menu
4. Click **"Redeploy"**
5. Wait for deployment to complete

### Option B: Push to Git (if using Git)
1. Make a small change (or just commit current changes)
2. Push to your Git repository
3. Vercel will auto-deploy

## Step 8: Test the Setup

After redeploying, test if KV is working:

1. Visit: `https://quotes-lines.vercel.app/api/test-kv`
   - Should show: `"status": "success"` and `"client": "upstash-redis"`

2. Visit: `https://quotes-lines.vercel.app/api/health`
   - Should show: `"kvConfigured": true` and `"kvConnected": true`

3. Try adding quotes in `/admin`:
   - Go to `/admin` and login
   - Click "Add 2 Quotes Per Category"
   - Should work without errors!

## Troubleshooting

### Problem: I don't see "Storage" tab
**Solution**: 
- Make sure you're on the project page (not the team/organization page)
- Try clicking "Settings" first, then look for "Storage" in the sidebar
- If still not visible, you might need to upgrade your Vercel plan (KV is available on Hobby plan and above)

### Problem: I created KV but environment variables are not showing
**Solution**:
1. Go to Settings → Environment Variables
2. Check if they're there but hidden (click to reveal)
3. If not there, try:
   - Refreshing the page
   - Creating the KV database again
   - Check if you're in the correct project

### Problem: Still getting "Not set" error after redeploy
**Solution**:
1. Make sure you **redeployed** after creating KV (environment variables only apply to new deployments)
2. Check Vercel deployment logs for any errors
3. Visit `/api/health` to see current status
4. Try creating KV database again

### Problem: "Storage" option is not available
**Solution**:
- Vercel KV requires a paid plan (Hobby plan starts at $20/month)
- Free plan doesn't include Storage
- Alternative: Use a free external database like:
  - **Supabase** (PostgreSQL) - Free tier available
  - **MongoDB Atlas** - Free tier available
  - **Upstash Redis** - Free tier available (separate from Vercel)

## Alternative: Use External Database (If KV Not Available)

If you can't use Vercel KV, you can use a free external database:

### Option 1: Upstash Redis (Free Tier)
1. Go to https://upstash.com
2. Sign up for free account
3. Create a Redis database
4. Get REST API URL and token
5. Add to Vercel environment variables:
   - `KV_REST_API_URL` = Your Upstash REST URL
   - `KV_REST_API_TOKEN` = Your Upstash token

### Option 2: Supabase (PostgreSQL)
1. Go to https://supabase.com
2. Create free project
3. Get connection string
4. We'll need to update the code to use PostgreSQL instead

## Need Help?

If you're stuck, check:
1. Vercel Dashboard → Your Project → Storage (should show your KV database)
2. Vercel Dashboard → Your Project → Settings → Environment Variables (should show KV variables)
3. Visit `/api/health` endpoint to see current status

