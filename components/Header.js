'use client'

import { useState } from 'react'
import Link from 'next/link'
import SearchBar from './SearchBar'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-3 md:py-4">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Quotes & Shayari
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
              Home
            </Link>
            <Link href="/category/love-quotes" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
              Love Quotes
            </Link>
            <Link href="/category/attitude-status" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
              Attitude
            </Link>
            <Link href="/category/shayari" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
              Shayari
            </Link>
            <Link href="/category/motivation-quotes" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
              Motivation
            </Link>
            <Link href="/category/festival-wishes" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
              Festival
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="mb-4">
              <SearchBar />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/category/love-quotes" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Love Quotes
              </Link>
              <Link 
                href="/category/attitude-status" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Attitude Status
              </Link>
              <Link 
                href="/category/shayari" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shayari
              </Link>
              <Link 
                href="/category/motivation-quotes" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Motivation Quotes
              </Link>
              <Link 
                href="/category/festival-wishes" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Festival Wishes
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

