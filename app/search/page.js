'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import QuoteCard from '@/components/QuoteCard'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(query)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchTerm.trim()) {
      setLoading(true)
      fetch(`/api/quotes?limit=100`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const filtered = data.quotes.filter(quote =>
              quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
              quote.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (quote.author && quote.author.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            setResults(filtered)
          }
          setLoading(false)
        })
        .catch(err => {
          console.error('Search error:', err)
          setLoading(false)
        })
    } else {
      setResults([])
    }
  }, [searchTerm])

  useEffect(() => {
    setSearchTerm(query)
  }, [query])

  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Search Quotes
        </h1>
        
        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for quotes, shayari, or status..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Searching...</p>
          </div>
        )}

        {!loading && searchTerm && (
          <div>
            <p className="text-gray-600 mb-4">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{searchTerm}&rdquo;
            </p>
            
            {results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No quotes found. Try a different search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((quote) => (
                  <QuoteCard key={quote.id} quote={quote} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

