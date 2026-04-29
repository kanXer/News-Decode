"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { BookmarkPlus, Clock, ArrowRight } from "lucide-react"
import { CategoryBadge } from "./CategoryBadge"

interface FeaturedCardProps {
  article: {
    title: string
    summary: string
    image_url: string
    category: string
    slug: string
    created_at?: number
  }
}

export function FeaturedCard({ article }: FeaturedCardProps) {
  const date = article.created_at 
    ? new Date(article.created_at * 1000).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })
    : "Just now"

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)] h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] w-full"
    >
      <div className="absolute inset-0">
        <Image
          src={article.image_url || "/placeholder-news.jpg"}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000" />
      </div>

      <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-4 py-1 rounded-full">
             <CategoryBadge category={article.category} />
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs md:text-sm font-bold uppercase tracking-widest">
            <Clock className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </motion.div>

        <Link href={`/news/${article.slug}`}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 group-hover:text-emerald-400 transition-colors"
          >
            {article.title}
          </motion.h2>
        </Link>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-300 text-sm md:text-lg line-clamp-2 md:line-clamp-3 max-w-4xl mb-8 font-medium leading-relaxed"
        >
          {article.summary}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-6"
        >
          <Link 
            href={`/news/${article.slug}`}
            className="group/btn relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-full transition-all overflow-hidden shadow-xl shadow-emerald-500/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Read Full Story <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </Link>
          <button className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
            <BookmarkPlus className="w-5 h-5" />
            Save for later
          </button>
        </motion.div>
      </div>
    </motion.article>
  )
}
