import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdSense from '@/components/AdSense'
import Script from 'next/script'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
const siteName = 'Quotes & Shayari - Best Collection of Quotes, Status & Shayari'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Best Quotes, Shayari & Status - Daily Updated Collection | Free Quotes',
    template: '%s | Quotes & Shayari'
  },
  description: 'Discover 1000+ amazing quotes, shayari, and status messages updated daily. Best collection of love quotes, attitude status, motivation quotes, festival wishes, Hindi shayari, and English quotes. Share beautiful quotes with friends!',
  keywords: [
    'quotes',
    'shayari',
    'status',
    'love quotes',
    'attitude status',
    'motivation quotes',
    'festival wishes',
    'hindi quotes',
    'english quotes',
    'romantic quotes',
    'inspirational quotes',
    'life quotes',
    'friendship quotes',
    'sad shayari',
    'love shayari',
    'attitude quotes',
    'success quotes',
    'daily quotes',
    'best quotes',
    'quotes collection',
    'free quotes',
    'share quotes',
    'whatsapp status',
    'facebook status',
    'instagram quotes'
  ].join(', '),
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
    title: 'Best Quotes, Shayari & Status - Daily Updated Collection',
    description: 'Discover 1000+ amazing quotes, shayari, and status messages updated daily. Best collection of love quotes, attitude status, motivation quotes, and more.',
    images: [{
      url: `${siteUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Quotes & Shayari - Best Collection',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Quotes, Shayari & Status - Daily Updated',
    description: 'Discover 1000+ amazing quotes, shayari, and status messages updated daily.',
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
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({ children }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  
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
    "description": "Daily updated collection of quotes, shayari, and status messages. Best collection of love quotes, attitude status, motivation quotes, festival wishes, Hindi shayari, and English quotes.",
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
        <Header />
        <main className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

