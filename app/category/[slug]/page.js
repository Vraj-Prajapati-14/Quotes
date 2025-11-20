import { getCategoryBySlug, getAllCategories } from '@/lib/quotes'
import QuoteCard from '@/components/QuoteCard'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Breadcrumbs from '@/components/Breadcrumbs'

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

export async function generateMetadata({ params }) {
  const category = getCategoryBySlug(params.slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  const quoteCount = category.quotes?.length || 0
  const categoryName = category.name
  const categoryLower = category.name.toLowerCase()

  return {
    title: `${categoryName} - Best Collection of ${quoteCount}+ ${categoryName} | Quotes & Shayari`,
    description: `Explore our amazing collection of ${quoteCount}+ ${categoryLower}. Daily updated ${categoryLower} with beautiful quotes, shayari, and status messages. Share ${categoryLower} on WhatsApp, Facebook, and Instagram. ${category.keywords || ''}`,
    keywords: `${categoryName}, ${categoryLower}, quotes, shayari, status, ${category.keywords || ''}, best ${categoryLower}, ${categoryLower} collection, free ${categoryLower}, share ${categoryLower}, whatsapp ${categoryLower}, instagram ${categoryLower}`,
    openGraph: {
      title: `${categoryName} - Best Collection | ${quoteCount}+ ${categoryName}`,
      description: `Explore ${quoteCount}+ amazing ${categoryLower}. Daily updated collection of ${categoryLower} with beautiful quotes, shayari, and status messages.`,
      type: 'website',
      url: `${siteUrl}/category/${category.slug}`,
      siteName: 'Quotes & Shayari',
      images: [{
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${categoryName} Collection`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} - Best Collection`,
      description: `Explore ${quoteCount}+ amazing ${categoryLower}. Daily updated collection.`,
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}/category/${category.slug}`,
    },
  }
}

export default function CategoryPage({ params }) {
  const category = getCategoryBySlug(params.slug)
  
  if (!category) {
    notFound()
  }

  const quotes = category.quotes || []
  const categoryUrl = `${siteUrl}/category/${category.slug}`

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} - Best Collection`,
    "description": category.description || `Explore our amazing collection of ${category.name.toLowerCase()}`,
    "url": categoryUrl,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Quotes & Shayari",
      "url": siteUrl
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": quotes.length,
      "itemListElement": quotes.slice(0, 20).map((quote, index) => ({
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
            "name": category.name
          }
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category.name,
          "item": categoryUrl
        }
      ]
    }
  }

  return (
    <>
      <Script
        id="category-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categorySchema)
        }}
      />
      <div className="container-custom py-12">
        <Breadcrumbs items={[
          { name: category.name, url: categoryUrl }
        ]} />
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {category.description || `Explore our amazing collection of ${category.name.toLowerCase()}`}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {quotes.length} {quotes.length === 1 ? 'quote' : 'quotes'} available
          </p>
        </div>

        {quotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No quotes available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

