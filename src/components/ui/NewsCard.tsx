"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { BookmarkPlus, Clock } from "lucide-react"
import { CategoryBadge } from "./CategoryBadge"

interface NewsCardProps {
  article: {
    title: string
    summary: string
    image_url: string
    category: string
    slug: string
    created_at?: number
  }
  index?: number
}

export function NewsCard({ article, index = 0 }: NewsCardProps) {
  const date = article.created_at 
    ? new Date(article.created_at * 1000).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })
    : "Just now"

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className="group flex flex-col bg-white dark:bg-[#12121a] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 hover:border-emerald-500/50 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] dark:hover:shadow-[0_20px_50px_rgba(16,185,129,0.05)] relative"
    >
      <Link href={`/news/${article.slug}`} className="relative h-48 sm:h-56 lg:h-60 w-full overflow-hidden block">
        <Image
          src={article.image_url || "/placeholder-news.jpg"}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4 z-10">
          <CategoryBadge category={article.category} />
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow relative bg-white dark:bg-[#12121a]">
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500 mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>{date}</span>
        </div>

        <Link href={`/news/${article.slug}`} className="block">
          <h3 className="text-xl font-bold leading-[1.3] mb-3 group-hover:text-emerald-600 dark:group-hover:text-[#10b981] transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 font-medium leading-relaxed">
          {article.summary}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50 dark:border-white/5">
          <Link 
            href={`/news/${article.slug}`}
            className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group/btn"
          >
            Read Story 
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
          <button className="text-gray-400 hover:text-emerald-500 transition-colors">
            <BookmarkPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
