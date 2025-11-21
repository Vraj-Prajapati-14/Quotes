import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container-custom text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          Daily Quotes, Shayari & Status
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 max-w-2xl mx-auto px-4">
          Discover amazing quotes, shayari, and status messages. Updated daily with fresh content.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Link
            href="/category/love-quotes"
            className="bg-white text-blue-600 px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base"
          >
            Explore Love Quotes
          </Link>
          <Link
            href="/search"
            className="bg-blue-700 text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-sm sm:text-base"
          >
            Search Quotes
          </Link>
        </div>
      </div>
    </section>
  )
}

