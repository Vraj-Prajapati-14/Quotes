import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-custom py-12 sm:py-16 md:py-20 text-center px-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800 mb-3 sm:mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-600 mb-6 sm:mb-8">Page Not Found</h2>
      <p className="text-gray-500 mb-6 sm:mb-8 text-base sm:text-lg max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="btn-primary inline-block"
      >
        Go Back Home
      </Link>
    </div>
  )
}

