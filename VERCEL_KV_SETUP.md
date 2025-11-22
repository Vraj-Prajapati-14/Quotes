# Vercel KV Setup Guide

## Problem
Vercel's serverless functions have a **read-only file system**. When you try to add quotes via the admin panel, they appear to be saved but don't persist because file writes don't work on Vercel.

## Solution: Use Vercel KV (Redis)

Vercel KV is a Redis database that works perfectly with Vercel and has a **free tier**.

## Step 1: Install Required Packages

```bash
npm install @upstash/redis @vercel/kv
```

**Note:** We use `@upstash/redis` as the primary client (supports REST API) with `@vercel/kv` as fallback.

## Step 2: Create Vercel KV Database

1. Go to your Vercel Dashboard
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **KV** (Redis)
6. Choose a name (e.g., `quotes-db`)
7. Select a region (choose closest to your users)
8. Click **Create**

## Step 3: Add Environment Variables

After creating the KV database, Vercel will automatically add these environment variables:

- `KV_REST_API_URL` - Your KV database URL
- `KV_REST_API_TOKEN` - Your KV authentication token

These are automatically available in your Vercel project.

## Step 4: Update Your Code

The code has been updated to use Vercel KV automatically. The `lib/quotes-kv.js` file will:
- Use Vercel KV if environment variables are set
- Fall back to file system for local development

## Step 5: Redeploy

After setting up KV:

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**

## Step 6: Test

1. Go to `/admin` and login
2. Try adding a quote
3. Check if it persists after page refresh

## Alternative: Use a Database

If you prefer a full database, you can use:

### Option 1: Supabase (PostgreSQL) - Free Tier
- Go to [supabase.com](https://supabase.com)
- Create a free account
- Create a new project
- Get connection string
- Add to Vercel environment variables

### Option 2: MongoDB Atlas - Free Tier
- Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get connection string
- Add to Vercel environment variables

### Option 3: PlanetScale (MySQL) - Free Tier
- Go to [planetscale.com](https://planetscale.com)
- Create a free database
- Get connection string
- Add to Vercel environment variables

## Current Status

✅ Code updated to support Vercel KV
✅ Automatic fallback to file system for local dev
✅ No code changes needed - just set up KV!

## Troubleshooting

**Quotes still not saving?**
- Check if `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set in Vercel
- Check Vercel deployment logs for errors
- Make sure you've redeployed after adding KV

**Local development not working?**
- File system fallback should work locally
- Check if `data/quotes.json` exists
- Make sure you have write permissions

