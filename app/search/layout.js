import { getHomePageKeywords } from '@/lib/seo-keywords'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quotes-status.vercel.app'

export const metadata = {
  title: 'Search Best Free Latest New Quotes, Shayari & Status - Find Emotional Attitude Quotes',
  description: 'Search through 1000+ best free latest new emotional attitude quotes, shayari, and WhatsApp status messages. Find love quotes, attitude status, motivation quotes, Hindi shayari, English quotes, sad quotes, romantic quotes, inspirational quotes.',
  keywords: `${getHomePageKeywords()}, search quotes, find quotes, search shayari, search status, quote search, shayari search, status search`,
  openGraph: {
    title: 'Search Best Free Latest New Quotes, Shayari & Status',
    description: 'Search through 1000+ best free latest new emotional attitude quotes, shayari, and WhatsApp status messages.',
    type: 'website',
    url: `${siteUrl}/search`,
    siteName: 'Quotes & Shayari',
    images: [{
      url: `${siteUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Search Quotes, Shayari & Status',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search Best Free Latest New Quotes, Shayari & Status',
    description: 'Search through 1000+ best free latest new emotional attitude quotes, shayari, and WhatsApp status messages.',
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/search`,
  },
}

export default function SearchLayout({ children }) {
  return children
}

