import Link from 'next/link'
import ShareButtons from './ShareButtons'

export default function QuoteCard({ quote, isFullPage = false }) {
  const quoteUrl = `/quote/${quote.id}`
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${quoteUrl}`
    : `https://yourdomain.com${quoteUrl}`

  return (
    <article 
      className={`card ${isFullPage ? 'max-w-3xl mx-auto' : ''}`} 
      itemScope 
      itemType="https://schema.org/CreativeWork"
      aria-label={`${quote.category} quote`}
    >
      <div className="mb-4">
        <Link 
          href={quoteUrl}
          className="text-sm sm:text-base md:text-lg font-medium text-blue-600 hover:text-blue-700 mb-2 inline-block"
          aria-label={`View ${quote.category} quote`}
        >
          {quote.category}
        </Link>
        {isFullPage ? (
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-3 sm:mb-4 leading-relaxed" itemProp="text">
            {quote.text}
          </h1>
        ) : (
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 leading-relaxed" itemProp="text">
            {quote.text}
          </h2>
        )}
        {quote.author && (
          <p className="text-sm sm:text-base text-gray-600 italic" itemProp="author">
            - {quote.author}
          </p>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-200 gap-3 sm:gap-0">
        <Link
          href={quoteUrl}
          className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm"
        >
          Read More →
        </Link>
        <ShareButtons quote={quote} url={shareUrl} />
      </div>
      
      <meta itemProp="name" content={quote.text.substring(0, 100)} />
      <meta itemProp="description" content={quote.text} />
    </article>
  )
}

