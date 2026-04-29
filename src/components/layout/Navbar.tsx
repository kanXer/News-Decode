"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Search, Moon, Sun, Menu, X, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const categories = [
  { name: "Local", path: "/category/local" },
  { name: "Business", path: "/category/business" },
  { name: "Sports", path: "/category/sports" },
  { name: "Tech & AI", path: "/category/tech-ai" },
  { name: "Dev & Security", path: "/category/dev-security" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" }
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [scrollProgress, setScrollProgress] = React.useState(0)
  React.useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setScrollProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100)
      }
    }
    window.addEventListener("scroll", updateScroll)
    return () => window.removeEventListener("scroll", updateScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? "bg-white/70 dark:bg-[#0b0b0f]/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        : "bg-transparent"
        }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-emerald-500 z-[60]"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden border border-white/10 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="KhabriIn Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <span className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter italic">
              KHABRI<span className="text-emerald-500 dark:text-[#10b981] not-italic">.IN</span>
            </span>
          </Link>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.path}
                className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors relative group"
              >
                {category.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 dark:bg-[#10b981] transition-all group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/news"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
              title="Search All News"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <Sun className="w-5 h-5 hidden dark:block" />
              <Moon className="w-5 h-5 block dark:hidden" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 w-[80%] md:w-[60%] h-full bg-white dark:bg-[#0b0b0f] z-[70] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-xl font-bold">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-gray-100 dark:bg-white/5 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {categories.map((category, idx) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={category.path}
                      className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-white/5 text-lg font-semibold text-gray-800 dark:text-gray-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                      <Globe className="w-4 h-4 text-emerald-500" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-gray-100 dark:border-white/5">
                <Link
                  href="/news"
                  className="flex items-center gap-3 p-4 bg-emerald-500 dark:bg-[#10b981] text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Search className="w-5 h-5" />
                  Search All News
                </Link>
                <p className="text-center text-xs text-gray-500 mt-6">
                  © 2026 KhabriIn Global News
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
