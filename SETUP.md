# Setup Guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your values:
   - `NEXT_PUBLIC_SITE_URL`: Your website URL (e.g., https://yourdomain.com)
   - `NEXT_PUBLIC_ADSENSE_ID`: Your Google AdSense Publisher ID
   - `API_SECRET`: Secret key for protecting the update API endpoint

## Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Auto-Update Setup

The website is configured to auto-update with 2 new quotes per category every day at midnight.

### For Vercel Deployment:

The `vercel.json` file is already configured with a cron job. Just deploy to Vercel and the cron will run automatically.

### For Other Platforms:

1. Set up a cron job to call `POST /api/update` daily at midnight (00:00)
2. Protect the endpoint with authentication by uncommenting the auth check in `app/api/update/route.js`
3. Use a service like:
   - GitHub Actions (with scheduled workflows)
   - External cron services (cron-job.org, EasyCron, etc.)
   - Your server's cron system

### Manual Update:

You can manually trigger updates by:
1. Visiting `/admin` and clicking "Run Auto Update"
2. Making a POST request to `/api/update`

## Google AdSense Setup

1. Get your AdSense Publisher ID from your AdSense dashboard
2. Add it to `.env.local` as `NEXT_PUBLIC_ADSENSE_ID`
3. Add AdSense units to pages using the `<AdUnit>` component:

```jsx
import AdUnit from '@/components/AdUnit'

<AdUnit slot="1234567890" />
```

## SEO Optimization

The website includes:
- ✅ Dynamic meta tags for all pages
- ✅ Open Graph tags for social sharing
- ✅ Structured data (JSON-LD) for search engines
- ✅ Automatic sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)
- ✅ Canonical URLs
- ✅ Semantic HTML

## Admin Panel

Access the admin panel at `/admin` to:
- Add new quotes manually
- View statistics
- Trigger manual updates

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── category/          # Category pages
│   ├── quote/             # Individual quote pages
│   ├── search/            # Search page
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── sitemap.js         # Dynamic sitemap
│   └── robots.js          # Robots.txt
├── components/            # Reusable React components
│   ├── Header.js
│   ├── Footer.js
│   ├── QuoteCard.js
│   ├── SearchBar.js
│   ├── ShareButtons.js
│   ├── CategoryGrid.js
│   ├── Hero.js
│   ├── AdSense.js
│   └── AdUnit.js
├── lib/                   # Utility functions
│   ├── quotes.js         # Quote data management
│   └── scheduler.js      # Auto-update logic
├── data/                  # Data storage
│   └── quotes.json        # Quotes database
└── public/                # Static assets
```

## Adding More Quotes

### Method 1: Admin Panel
1. Go to `/admin`
2. Fill in the form and submit

### Method 2: API
```bash
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your quote text here",
    "category": "Love Quotes",
    "author": "Author Name"
  }'
```

### Method 3: Edit Quote Pool
Edit the `quotePools` object in `lib/scheduler.js` to add more quotes to the auto-update pool.

## Categories

- Love Quotes
- Attitude Status
- Shayari
- Motivation Quotes
- Festival Wishes

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Follow Next.js deployment guides for your platform
- Ensure Node.js 18+ is supported
- Set up cron jobs for auto-updates

## Tips for SEO

1. **Update Site URL**: Make sure `NEXT_PUBLIC_SITE_URL` matches your actual domain
2. **Add More Content**: More quotes = better SEO
3. **Regular Updates**: The auto-update feature helps with fresh content
4. **Internal Linking**: The site automatically links related quotes
5. **Social Sharing**: Share buttons help with social signals

## Support

For issues or questions, check:
- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Google AdSense: https://support.google.com/adsense

