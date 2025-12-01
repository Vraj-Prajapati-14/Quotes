import { getQuoteById, getAllQuotes } from '@/lib/quotes'
import QuoteCard from '@/components/QuoteCard'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getCategoryKeywords } from '@/lib/seo-keywords'

export async function generateStaticParams() {
  const quotes = getAllQuotes()
  return quotes.map((quote) => ({
    id: quote.id.toString(),
  }))
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quotes-status.vercel.app'

export async function generateMetadata({ params }) {
  const quote = getQuoteById(params.id)
  
  if (!quote) {
    return {
      title: 'Quote Not Found',
    }
  }

  const quoteText = quote.text.substring(0, 150)
  const category = quote.category
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
  const quoteUrl = `${siteUrl}/quote/${quote.id}`
  const categoryUrl = `${siteUrl}/category/${categorySlug}`
  const author = quote.author || 'Unknown'

  // Create SEO-friendly title (max 60 chars for best results)
  const seoTitle = quote.text.length > 60 
    ? `${quote.text.substring(0, 57)}... | Best Free Latest New ${category} Quote`
    : `${quote.text} | Best Free Latest New ${category} Quote`
  
  const categoryKeywords = getCategoryKeywords(category)

  return {
    title: seoTitle,
    description: `${quote.text} - Best free latest new emotional attitude ${category} quote by ${author}. Share this amazing quote with your friends on WhatsApp, Facebook, and Instagram.`,
    keywords: `best free latest new ${quote.text.substring(0, 50)}, ${category}, quote, shayari, status, ${category.toLowerCase()}, ${author}, share quote, whatsapp status, facebook status, instagram quote, emotional quote, attitude quote, ${categoryKeywords}`,
    openGraph: {
      title: seoTitle,
      description: `${quote.text} - Best free latest new emotional attitude ${category} quote by ${author}`,
      type: 'article',
      url: quoteUrl,
      siteName: 'Quotes & Shayari',
      images: [{
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: quote.text.substring(0, 100),
      }],
      publishedTime: quote.createdAt,
      authors: [author],
      section: category,
      tags: [category, 'quotes', 'shayari', 'status', 'best', 'free', 'latest', 'new', 'emotional', 'attitude'],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: `${quote.text} - Best free latest new ${category} quote`,
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: quoteUrl,
    },
    other: {
      'article:author': author,
      'article:section': category,
      'article:tag': category,
    },
  }
}

export default function QuotePage({ params }) {
  const quote = getQuoteById(params.id)
  
  if (!quote) {
    notFound()
  }

  const relatedQuotes = getAllQuotes()
    .filter(q => q.category === quote.category && q.id !== quote.id)
    .slice(0, 6)

  const quoteUrl = `${siteUrl}/quote/${quote.id}`
  const categorySlug = quote.category.toLowerCase().replace(/\s+/g, '-')
  const categoryUrl = `${siteUrl}/category/${categorySlug}`

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": quote.text.substring(0, 100),
    "description": quote.text,
    "text": quote.text,
    "author": {
      "@type": "Person",
      "name": quote.author || "Unknown"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Quotes & Shayari",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": quote.createdAt,
    "dateModified": quote.createdAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": quoteUrl
    },
    "about": {
      "@type": "Thing",
      "name": quote.category
    },
    "inLanguage": "en-US",
    "url": quoteUrl,
    "image": {
      "@type": "ImageObject",
      "url": `${siteUrl}/og-image.jpg`,
      "width": 1200,
      "height": 630
    },
    "articleSection": quote.category,
    "keywords": `${quote.category}, quotes, shayari, status`
  }

  return (
    <>
      <Script
        id="quote-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      <div className="container-custom py-8 sm:py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[
            { name: quote.category, path: `/category/${categorySlug}`, url: categoryUrl },
            { name: 'Quote', path: `/quote/${quote.id}`, url: quoteUrl }
          ]} />
          <QuoteCard quote={quote} isFullPage />
          
          <div className="mt-8 sm:mt-10 md:mt-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
              Related {quote.category} Quotes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {relatedQuotes.map((relatedQuote) => (
                <QuoteCard key={relatedQuote.id} quote={relatedQuote} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

