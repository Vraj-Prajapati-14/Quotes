import Link from 'next/link'

export default function CategoryGrid({ categories }) {
  const categoryColors = {
    'Love Quotes': 'bg-pink-100 hover:bg-pink-200 text-pink-800',
    'Attitude Status': 'bg-purple-100 hover:bg-purple-200 text-purple-800',
    'Shayari': 'bg-blue-100 hover:bg-blue-200 text-blue-800',
    'Motivation Quotes': 'bg-green-100 hover:bg-green-200 text-green-800',
    'Festival Wishes': 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800',
  }

  return (
    <section>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800 px-4">
        Browse by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {categories.map((category) => {
          const colorClass = categoryColors[category.name] || 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={`${colorClass} rounded-lg p-4 sm:p-6 transition-colors duration-200 shadow-md hover:shadow-lg`}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{category.name}</h3>
              <p className="text-xs sm:text-sm opacity-80 mb-3 sm:mb-4 line-clamp-2">
                {category.description || `Explore ${category.name.toLowerCase()}`}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium">
                  {category.quotes?.length || 0} Quotes
                </span>
                <span className="text-sm">→</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

