import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="container-custom text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Daily Quotes, Shayari & Status
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Discover amazing quotes, shayari, and status messages. Updated daily with fresh content.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/category/love-quotes"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Explore Love Quotes
          </Link>
          <Link
            href="/search"
            className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Search Quotes
          </Link>
        </div>
      </div>
    </section>
  )
}

