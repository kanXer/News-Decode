"use client"

import * as React from "react"
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { NewsCard } from "./NewsCard"
import { motion } from "framer-motion"

interface Article {
  title: string
  summary: string
  image_url: string
  category: string
  slug: string
  created_at?: number
  tags?: string[]
}

interface NewsArchiveClientProps {
  initialNews: Article[]
  title?: string
  showTitle?: boolean
}

export function NewsArchiveClient({ initialNews, title = "All News", showTitle = true }: NewsArchiveClientProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortBy, setSortBy] = React.useState("newest")
  const [selectedCategory, setSelectedCategory] = React.useState("All")

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(initialNews.map(item => item.category))).filter(Boolean)]

  // Filter and sort the news
  const filteredAndSortedNews = React.useMemo(() => {
    let result = [...initialNews]

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(item => 
        item.title?.toLowerCase().includes(query) || 
        item.summary?.toLowerCase().includes(query) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(item => item.category === selectedCategory)
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return (b.created_at || 0) - (a.created_at || 0)
      } else if (sortBy === "oldest") {
        return (a.created_at || 0) - (b.created_at || 0)
      } else if (sortBy === "a-z") {
        return (a.title || "").localeCompare(b.title || "")
      } else if (sortBy === "z-a") {
        return (b.title || "").localeCompare(a.title || "")
      }
      return 0
    })

    return result
  }, [initialNews, searchQuery, sortBy, selectedCategory])

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {showTitle && (
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 uppercase italic">
            {title.split(' ')[0]} <span className="text-emerald-500 dark:text-[#10b981] not-italic">{title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Browse our complete archive of high-end global news, featuring in-depth analysis and timely updates.
          </p>
        </div>
      )}

      {/* Controls: Search & Sort */}
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 md:p-6 mb-10 shadow-sm backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search articles, topics, or tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-[#10b981] transition-all dark:text-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <div className="relative w-full sm:w-40">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-2.5 md:py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-[#10b981] dark:text-white cursor-pointer text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-44">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-2.5 md:py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-[#10b981] dark:text-white cursor-pointer text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="a-z">Title (A-Z)</option>
                <option value="z-a">Title (Z-A)</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
        Showing {filteredAndSortedNews.length} {filteredAndSortedNews.length === 1 ? 'article' : 'articles'}
      </div>

      {/* News Grid */}
      {filteredAndSortedNews.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredAndSortedNews.map((article, index) => (
            <div key={article.slug || index}>
              <NewsCard article={article} index={index % 10} />
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="py-20 text-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 border-dashed">
          <div className="w-16 h-16 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">No articles found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We couldn't find any news articles matching your search query "{searchQuery}" and category filters.
          </p>
          <button 
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
            }}
            className="mt-6 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
