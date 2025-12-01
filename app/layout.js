import './globals.css'
import AdSense from '@/components/AdSense'
import ConditionalLayout from '@/components/ConditionalLayout'
import Script from 'next/script'
import { getHomePageKeywords } from '@/lib/seo-keywords'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quotes-status.vercel.app'
const siteName = 'Quotes & Shayari - Best Collection of Quotes, Status & Shayari'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Best Free Quotes, Shayari & Status - Latest New Emotional Attitude Quotes Collection 2025',
    template: '%s | Best Quotes & Shayari - Free Latest New'
  },
  description: 'Discover 1000+ best free latest new emotional attitude quotes, shayari, and WhatsApp status messages updated daily. Best collection of love quotes, attitude status, motivation quotes, festival wishes, Hindi shayari, English quotes, sad quotes, romantic quotes, inspirational quotes. Share beautiful quotes with friends on WhatsApp, Facebook, Instagram!',
  keywords: getHomePageKeywords(),
  authors: [{ name: 'Quotes & Shayari Team' }],
  creator: 'Quotes & Shayari',
  publisher: 'Quotes & Shayari',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: 'Best Free Latest New Emotional Attitude Quotes, Shayari & Status - Daily Updated Collection 2025',
    description: 'Discover 1000+ best free latest new emotional attitude quotes, shayari, and WhatsApp status messages updated daily. Best collection of love quotes, attitude status, motivation quotes, Hindi shayari, English quotes, sad quotes, romantic quotes, inspirational quotes.',
    images: [{
      url: `${siteUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Best Free Latest New Quotes, Shayari & Status Collection',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Free Latest New Emotional Attitude Quotes, Shayari & Status - Daily Updated 2025',
    description: 'Discover 1000+ best free latest new emotional attitude quotes, shayari, and WhatsApp status messages updated daily. Best collection of love quotes, attitude status, motivation quotes.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@quotesandshayari',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'QIkvpXVwT2jGWgO1B1jwE8Gpl2j8UUiEmSBbmbrK7Oo',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({ children }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quotes-status.vercel.app'

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Quotes & Shayari",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "Best collection of quotes, shayari, and status messages",
    "sameAs": [
      // Add your social media links here
      // "https://www.facebook.com/quotesandshayari",
      // "https://twitter.com/quotesandshayari",
      // "https://www.instagram.com/quotesandshayari"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Quotes & Shayari",
    "alternateName": "Best Quotes Collection",
    "url": siteUrl,
    "description": "Best free latest new emotional attitude quotes, shayari, and WhatsApp status messages updated daily. Best collection of love quotes, attitude status, motivation quotes, festival wishes, Hindi shayari, English quotes, sad quotes, romantic quotes, inspirational quotes.",
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Quotes & Shayari"
    }
  }

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="google-site-verification" content="QIkvpXVwT2jGWgO1B1jwE8Gpl2j8UUiEmSBbmbrK7Oo" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <Script
          id="organization-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <Script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
      </head>
      <body>
        <AdSense />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}

