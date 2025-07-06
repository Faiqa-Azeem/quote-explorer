"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { quotesData } from "@/data/quotes"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Heart, Trash2 } from "lucide-react"

export default function Home() {
  const [topic, setTopic] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites")
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  // Save to localStorage when favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const handleSearch = () => {
    const filtered = quotesData[topic.toLowerCase()] || []
    setResults(filtered.slice(0, 3))
  }

  const getRandomQuote = () => {
    const topics = Object.keys(quotesData)
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    const quotes = quotesData[randomTopic]
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setTopic(randomTopic)
    setResults([randomQuote])
  }

  const toggleFavorite = (quote: string) => {
    if (favorites.includes(quote)) {
      setFavorites(favorites.filter((q) => q !== quote))
    } else {
      setFavorites([...favorites, quote])
    }
  }

  useEffect(() => {
    const matches = Object.keys(quotesData).filter((key) =>
      key.includes(topic.toLowerCase())
    )
    setSuggestions(matches.slice(0, 5))
  }, [topic])

  return (
    <main className="min-h-screen dark:bg-darkBg bg-background text-text dark:text-darkText transition px-4 py-10 flex justify-center items-center">
      <ThemeToggle />
      <div className="bg-card dark:bg-darkCard shadow-lg border border-gray-200 dark:border-gray-700 p-8 rounded-xl w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6">💬 Quote Explorer</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Try 'life', 'motivation', 'success'..."
            className="flex-1"
          />
          <Button onClick={handleSearch} className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            Get Quotes
          </Button>
        </div>

        {suggestions.length > 0 && topic.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {suggestions.map((sug) => (
              <Button
                key={sug}
                variant="outline"
                className="text-sm"
                onClick={() => {
                  setTopic(sug)
                  setResults(quotesData[sug])
                }}
              >
                {sug}
              </Button>
            ))}
          </div>
        )}

        <Button
          onClick={getRandomQuote}
          className="mt-4 md:mt-0 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          🎲 Surprise Me
        </Button>

        <div className="space-y-4 mb-8">
          {results.length > 0 ? (
            results.map((quote, idx) => (
              <div
                key={idx}
                className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-5 py-4 rounded-lg shadow transition flex justify-between items-start"
              >
                <p>“{quote}”</p>
                <button
                  onClick={() => toggleFavorite(quote)}
                  className={`ml-4 text-lg ${
                    favorites.includes(quote) ? "text-red-500" : "text-gray-400 dark:text-gray-300"
                  }`}
                >
                  <Heart fill={favorites.includes(quote) ? "red" : "none"} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center italic text-gray-500 dark:text-gray-400">
              No quotes found. Try typing a topic like <strong>love</strong> or <strong>life</strong>.
            </p>
          )}
        </div>

        {/* FAVORITES SECTION */}
        {favorites.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              ❤️ Your Favorite Quotes
              <Trash2
                className="ml-auto w-5 h-5 text-red-400 hover:text-red-600 cursor-pointer"
                onClick={() => setFavorites([])}
              />
            </h2>
            <div className="space-y-3">
              {favorites.map((quote, idx) => (
                <div
                  key={idx}
                  className="bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 px-5 py-3 rounded-lg border border-yellow-400 dark:border-yellow-700"
                >
                  “{quote}”
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
