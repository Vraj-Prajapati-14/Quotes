import Link from 'next/link'
import Script from 'next/script'

export default function Breadcrumbs({ items }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  
  // Convert items to have both relative paths (for Link) and absolute URLs (for structured data)
  const breadcrumbItems = [
    { name: 'Home', path: '/', url: siteUrl },
    ...items.map(item => ({
      ...item,
      path: item.path || item.url?.replace(siteUrl, '') || item.url || '/',
      url: item.url || `${siteUrl}${item.path || ''}`
    }))
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <>
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
        <ol className="flex items-center flex-wrap space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-1 sm:mx-2">/</span>}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-none">{item.name}</span>
              ) : (
                <Link 
                  href={item.path} 
                  className="hover:text-blue-600 transition-colors truncate max-w-[100px] sm:max-w-none"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

