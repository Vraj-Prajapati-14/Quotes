# Vercel Deployment Setup Guide

## Step 1: Add Your Domain to Environment Variables

After deploying to Vercel, you'll get a domain like: `your-project.vercel.app`

### How to Add Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Click on **Settings**
3. Go to **Environment Variables**
4. Add the following:

```
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

**OR if you have a custom domain:**

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Optional (for Google AdSense):

```
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
```

## Step 2: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click the **3 dots** (⋯) on the latest deployment
3. Click **Redeploy**

This will rebuild with your new environment variables.

## Step 3: Verify

1. Visit your site: `https://your-project.vercel.app`
2. Check that the sitemap works: `https://your-project.vercel.app/sitemap.xml`
3. Check robots.txt: `https://your-project.vercel.app/robots.txt`

## Important Notes:

- ✅ **No Cron Jobs Required** - You can manually add quotes anytime via the admin panel
- ✅ **Manual Updates** - Use the admin panel to add quotes whenever you want
- ✅ **Bulk Initialize** - Use the bulk initialize button to add 300 quotes per category at once

## Admin Access:

- URL: `https://your-project.vercel.app/admin`
- Email: `prajapativraj147@gmail.com`
- Password: `Vraj@#1234`

## Adding Quotes:

You have 3 ways to add quotes:

1. **Single Quote** - Use the form in admin panel
2. **Quick Update** - Add 2 quotes per category (10 total)
3. **Bulk Initialize** - Add 300 quotes per category (1500 total)

All updates are manual - no automatic scheduling needed!

