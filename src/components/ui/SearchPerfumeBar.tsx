'use client'

import { useState } from 'react'
import { Perfume } from '@/lib/data/perfumes'

interface SearchPerfumeBarProps {
  onResults?: (perfumes: Perfume[]) => void
}

export default function SearchPerfumeBar({ onResults }: SearchPerfumeBarProps) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Perfume[]>([])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      onResults?.([])
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `/api/perfumes/search?q=${encodeURIComponent(searchQuery)}&limit=50`
      )
      const data = await response.json()
      setResults(data.perfumes || [])
      onResults?.(data.perfumes || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      onResults?.([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    handleSearch(value)
  }

  return (
    <div className="w-full" dir="rtl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="ابحث عن عطر..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {loading && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      {results.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.map((perfume) => (
            <div key={perfume.id} className="p-3 border rounded-lg">
              <h3 className="font-semibold">{perfume.name}</h3>
              <p className="text-sm text-gray-600">{perfume.brand}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
