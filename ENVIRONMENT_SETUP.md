# Environment Variables Setup for Vercel

## Required Environment Variables

After deploying to Vercel, add these in your project settings:

### 1. Site URL (REQUIRED)

**Variable Name:** `NEXT_PUBLIC_SITE_URL`

**Value:** Your Vercel domain (or custom domain)

**Examples:**
- `https://your-project.vercel.app` (Vercel default domain)
- `https://yourdomain.com` (if you have a custom domain)

**Where to add:**
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Name: `NEXT_PUBLIC_SITE_URL`
6. Value: `https://your-project.vercel.app`
7. Click **Save**

### 2. Google AdSense ID (Optional)

**Variable Name:** `NEXT_PUBLIC_ADSENSE_ID`

**Value:** Your AdSense Publisher ID

**Example:** `ca-pub-1234567890123456`

**Where to get it:**
1. Go to Google AdSense dashboard
2. Copy your Publisher ID (starts with `ca-pub-`)

### 3. API Secret (Optional - for protecting update endpoint)

**Variable Name:** `API_SECRET`

**Value:** Any random string (for API protection)

**Example:** `your-secret-key-12345`

## After Adding Variables

1. **Redeploy your project:**
   - Go to **Deployments** tab
   - Click **⋯** (three dots) on latest deployment
   - Click **Redeploy**

2. **Verify it works:**
   - Visit your site
   - Check sitemap: `https://your-domain.com/sitemap.xml`
   - Check robots.txt: `https://your-domain.com/robots.txt`

## Important Notes

- ✅ Environment variables are case-sensitive
- ✅ `NEXT_PUBLIC_*` variables are exposed to the browser
- ✅ Regular variables (without `NEXT_PUBLIC_`) are server-only
- ✅ After adding variables, you must redeploy for changes to take effect

## Quick Checklist

- [ ] Added `NEXT_PUBLIC_SITE_URL` with your Vercel domain
- [ ] (Optional) Added `NEXT_PUBLIC_ADSENSE_ID` if using AdSense
- [ ] Redeployed the project
- [ ] Verified sitemap works
- [ ] Tested admin login

