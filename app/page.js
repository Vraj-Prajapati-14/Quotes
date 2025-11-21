import { getAllQuotes, getAllCategories } from '@/lib/quotes'
import QuoteCard from '@/components/QuoteCard'
import CategoryGrid from '@/components/CategoryGrid'
import Hero from '@/components/Hero'
import Script from 'next/script'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

export const metadata = {
  title: 'Best Quotes, Shayari & Status - Daily Updated Collection | 1000+ Free Quotes',
  description: 'Discover 1000+ amazing quotes, shayari, and status messages updated daily. Best collection of love quotes, attitude status, motivation quotes, festival wishes, Hindi shayari, and English quotes. Share beautiful quotes with friends on WhatsApp, Facebook, and Instagram!',
  keywords: 'quotes, shayari, status, love quotes, attitude status, motivation quotes, festival wishes, hindi quotes, english quotes, romantic quotes, inspirational quotes, life quotes, friendship quotes, sad shayari, love shayari, attitude quotes, success quotes, daily quotes, best quotes, quotes collection, free quotes, share quotes, whatsapp status, facebook status, instagram quotes',
  openGraph: {
    title: 'Best Quotes, Shayari & Status - Daily Updated Collection',
    description: 'Discover 1000+ amazing quotes, shayari, and status messages updated daily. Best collection of love quotes, attitude status, motivation quotes, and more.',
    type: 'website',
    url: siteUrl,
    siteName: 'Quotes & Shayari',
    images: [{
      url: `${siteUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Quotes & Shayari - Best Collection',
    }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Quotes, Shayari & Status - Daily Updated',
    description: 'Discover 1000+ amazing quotes, shayari, and status messages updated daily.',
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  const categories = getAllCategories()
  const featuredQuotes = getAllQuotes().slice(0, 6)
  const allQuotes = getAllQuotes()

  return (
    <>
      <Script
        id="home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Quotes & Shayari - Best Collection",
            "description": "Daily updated collection of quotes, shayari, and status messages. Best collection of love quotes, attitude status, motivation quotes, festival wishes, Hindi shayari, and English quotes.",
            "url": siteUrl,
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Quotes & Shayari",
              "url": siteUrl
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": allQuotes.length,
              "itemListElement": featuredQuotes.map((quote, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "CreativeWork",
                  "@id": `${siteUrl}/quote/${quote.id}`,
                  "name": quote.text.substring(0, 100),
                  "url": `${siteUrl}/quote/${quote.id}`,
                  "description": quote.text,
                  "about": {
                    "@type": "Thing",
                    "name": quote.category
                  }
                }
              }))
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
              }]
            }
          })
        }}
      />
      <div>
        <Hero />
        <div className="container-custom py-12">
          <CategoryGrid categories={categories} />
          
          <section className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800 px-4">
              Featured Quotes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
              {featuredQuotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

