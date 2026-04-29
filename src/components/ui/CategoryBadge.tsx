import { cn } from "@/lib/utils"

interface CategoryBadgeProps {
  category: string
  className?: string
}

const getCategoryColor = (category: string) => {
  const cat = category.toLowerCase()
  if (["tech", "ai", "science"].includes(cat)) {
    return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
  }
  if (["dev", "security"].includes(cat)) {
    return "bg-blue-500/10 text-blue-500 border-blue-500/20"
  }
  if (["business"].includes(cat)) {
    return "bg-amber-500/10 text-amber-500 border-amber-500/20"
  }
  if (["sports"].includes(cat)) {
    return "bg-rose-500/10 text-rose-500 border-rose-500/20"
  }
  if (["local", "gorakhpur", "up", "india"].includes(cat)) {
    return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
  }
  
  return "bg-gray-500/10 text-gray-500 border-gray-500/20"
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-[10px] font-black tracking-[0.1em] uppercase border backdrop-blur-md",
        getCategoryColor(category),
        className
      )}
    >
      {category}
    </span>
  )
}
