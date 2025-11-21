'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [formData, setFormData] = useState({
    text: '',
    category: 'Love Quotes',
    author: 'Unknown',
  })
  const [updateStatus, setUpdateStatus] = useState('')

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check')
      const data = await res.json()
      if (data.authenticated) {
        setAuthenticated(true)
        fetchQuotes()
      } else {
        router.replace('/admin/login')
      }
    } catch (error) {
      router.replace('/admin/login')
    }
  }

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchQuotes = async () => {
    try {
      const res = await fetch('/api/quotes?limit=10000') // Get all quotes
      const data = await res.json()
      if (data.success) {
        setQuotes(data.quotes)
      } else {
        console.error('Failed to fetch quotes:', data.error)
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        setFormData({ text: '', category: 'Love Quotes', author: 'Unknown' })
        fetchQuotes()
        alert('Quote added successfully!')
      }
    } catch (error) {
      console.error('Error adding quote:', error)
      alert('Error adding quote')
    }
  }

  const handleAutoUpdate = async () => {
    setUpdateStatus('Updating...')
    try {
      const res = await fetch('/api/update', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        setUpdateStatus(`Success! Added ${data.quotesAdded} quotes.`)
        fetchQuotes()
      } else {
        setUpdateStatus('Error: ' + data.error)
      }
    } catch (error) {
      setUpdateStatus('Error: ' + error.message)
    }
  }

  const handleBulkInit = async (category = null, count = 300) => {
    setUpdateStatus(`Initializing ${category || 'all categories'} with ${count} quotes each...`)
    try {
      const res = await fetch('/api/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, count }),
      })
      const data = await res.json()
      if (data.success) {
        setUpdateStatus(`Success! Added ${data.quotesAdded} quotes to ${data.categories.length} category/categories.`)
        fetchQuotes()
      } else {
        setUpdateStatus('Error: ' + data.error)
      }
    } catch (error) {
      setUpdateStatus('Error: ' + error.message)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (!authenticated) {
    return (
      <div className="container-custom py-12">
        <p className="text-center">Checking authentication...</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container-custom py-12">
        <p className="text-center">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="card">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Add New Quote</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Quote Text *
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                required
                rows={4}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quote text..."
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Love Quotes">Love Quotes</option>
                <option value="Attitude Status">Attitude Status</option>
                <option value="Shayari">Shayari</option>
                <option value="Motivation Quotes">Motivation Quotes</option>
                <option value="Festival Wishes">Festival Wishes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Author name (optional)"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Add Quote
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Quick Update</h2>
          <p className="text-gray-600 mb-4">
            Add 2 new quotes to each category instantly. Use this to keep your content fresh!
          </p>
          <button
            onClick={handleAutoUpdate}
            className="btn-primary w-full mb-4"
          >
            Add 2 Quotes Per Category
          </button>
          {updateStatus && (
            <p className="text-sm text-gray-600 mb-4">{updateStatus}</p>
          )}

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">Bulk Initialize</h3>
            <p className="text-gray-600 text-sm mb-4">
              Add 300 quotes to each category at once. This will populate your database quickly.
            </p>
            <button
              onClick={() => handleBulkInit(null, 300)}
              className="btn-primary w-full mb-2 bg-green-600 hover:bg-green-700"
            >
              Initialize All Categories (300 each)
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => handleBulkInit('Love Quotes', 300)}
                className="btn-primary text-xs sm:text-sm bg-pink-600 hover:bg-pink-700"
              >
                Love (300)
              </button>
              <button
                onClick={() => handleBulkInit('Attitude Status', 300)}
                className="btn-primary text-xs sm:text-sm bg-purple-600 hover:bg-purple-700"
              >
                Attitude (300)
              </button>
              <button
                onClick={() => handleBulkInit('Shayari', 300)}
                className="btn-primary text-xs sm:text-sm bg-blue-600 hover:bg-blue-700"
              >
                Shayari (300)
              </button>
              <button
                onClick={() => handleBulkInit('Motivation Quotes', 300)}
                className="btn-primary text-xs sm:text-sm bg-green-600 hover:bg-green-700"
              >
                Motivation (300)
              </button>
              <button
                onClick={() => handleBulkInit('Festival Wishes', 300)}
                className="btn-primary text-xs sm:text-sm bg-yellow-600 hover:bg-yellow-700 col-span-2 sm:col-span-3 lg:col-span-2"
              >
                Festival (300)
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Statistics</h3>
            <div className="space-y-2 text-sm">
              <p>Total Quotes: <span className="font-semibold">{quotes.length}</span></p>
              <p>Love Quotes: <span className="font-semibold">{quotes.filter(q => q.category === 'Love Quotes').length}</span></p>
              <p>Attitude Status: <span className="font-semibold">{quotes.filter(q => q.category === 'Attitude Status').length}</span></p>
              <p>Shayari: <span className="font-semibold">{quotes.filter(q => q.category === 'Shayari').length}</span></p>
              <p>Motivation Quotes: <span className="font-semibold">{quotes.filter(q => q.category === 'Motivation Quotes').length}</span></p>
              <p>Festival Wishes: <span className="font-semibold">{quotes.filter(q => q.category === 'Festival Wishes').length}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

