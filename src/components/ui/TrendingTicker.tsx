"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface TrendingItem {
  title: string
  slug: string
}

export function TrendingTicker({ items }: { items: TrendingItem[] }) {
  if (!items || items.length === 0) return null

  return (
    <div className="w-full bg-[#0b0b0f] dark:bg-black text-white py-3 overflow-hidden flex items-center border-b border-white/5 relative z-40">
      <div className="container mx-auto flex items-center px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-2 mr-6 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.2em] text-emerald-500">
            Live Updates
          </span>
        </div>
        <div className="flex-1 overflow-hidden relative flex items-center h-6">
          <motion.div
            className="flex whitespace-nowrap absolute"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: items.length * 5,
                ease: "linear",
              },
            }}
          >
            {/* Double the items to create a seamless loop */}
            {[...items, ...items].map((item, i) => (
              <span key={i} className="mx-4 text-sm flex items-center">
                <Link href={`/news/${item.slug}`} className="hover:underline">
                  {item.title}
                </Link>
                <span className="mx-4 opacity-50">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
