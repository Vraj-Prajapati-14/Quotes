import Link from 'next/link'
import SearchBar from './SearchBar'

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Quotes & Shayari
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/category/love-quotes" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Love Quotes
            </Link>
            <Link href="/category/attitude-status" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Attitude
            </Link>
            <Link href="/category/shayari" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Shayari
            </Link>
            <Link href="/category/motivation-quotes" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Motivation
            </Link>
            <Link href="/category/festival-wishes" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Festival
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  )
}

