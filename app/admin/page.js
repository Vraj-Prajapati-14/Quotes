'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    text: '',
    category: 'Love Quotes',
    author: 'Unknown',
  })
  const [updateStatus, setUpdateStatus] = useState('')

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const res = await fetch('/api/quotes')
      const data = await res.json()
      if (data.success) {
        setQuotes(data.quotes)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching quotes:', error)
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

  if (loading) {
    return (
      <div className="container-custom py-12">
        <p className="text-center">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Add New Quote</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quote Text *
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quote text..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <h2 className="text-2xl font-bold mb-4">Auto Update</h2>
          <p className="text-gray-600 mb-4">
            Manually trigger the auto-update to add 2 new quotes to each category.
          </p>
          <button
            onClick={handleAutoUpdate}
            className="btn-primary w-full mb-4"
          >
            Run Auto Update
          </button>
          {updateStatus && (
            <p className="text-sm text-gray-600">{updateStatus}</p>
          )}

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

