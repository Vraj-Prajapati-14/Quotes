import { getAllQuotes, getAllCategories } from '@/lib/quotes'

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quotes-status.vercel.app'
  
  const categories = getAllCategories()
  const quotes = getAllQuotes()
  const now = new Date()

  // Homepage - highest priority
  const homepage = {
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
  }

  // Category pages - high priority
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }))

  // Quote pages - medium-high priority (recent quotes get higher priority)
  const quoteUrls = quotes.map((quote) => {
    const quoteDate = new Date(quote.createdAt)
    const daysSinceCreation = (now - quoteDate) / (1000 * 60 * 60 * 24)
    
    // Recent quotes (less than 30 days) get higher priority
    const priority = daysSinceCreation < 30 ? 0.8 : 0.7
    
    return {
      url: `${baseUrl}/quote/${quote.id}`,
      lastModified: quoteDate,
      changeFrequency: 'weekly',
      priority: priority,
    }
  })

  // Other pages
  const otherPages = [
    {
      url: `${baseUrl}/search`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  return [
    homepage,
    ...categoryUrls,
    ...quoteUrls,
    ...otherPages,
  ]
}

