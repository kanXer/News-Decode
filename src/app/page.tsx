import { TrendingTicker } from "@/components/ui/TrendingTicker"
import { FeaturedCard } from "@/components/ui/FeaturedCard"
import { NewsCard } from "@/components/ui/NewsCard"

import clientPromise from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic'

async function getNews() {
  try {
    const client = await clientPromise;
    const db = client.db("news_db");
    const news = await db
      .collection("news")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    if (news.length > 0) {
      return news.map((item: any, i: number) => ({
        ...item,
        _id: item._id.toString(),
        slug: item.slug || item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `news-${i}`
      }));
    }
  } catch (error) {
    console.error("Error reading news data from MongoDB:", error);
  }

  // Fallback to local files
  try {
    let arr = [];
    const dataPath = path.join(process.cwd(), '..', 'api', 'local_news.json');
    if (fs.existsSync(dataPath)) {
      const fileContents = fs.readFileSync(dataPath, 'utf8');
      arr = JSON.parse(fileContents);
    } else {
      const processedPath = path.join(process.cwd(), '..', 'api', 'processed.json');
      if (fs.existsSync(processedPath)) {
        const fileContents = fs.readFileSync(processedPath, 'utf8');
        const parsed = JSON.parse(fileContents);
        arr = Array.isArray(parsed) ? parsed : [parsed];
      }
    }
    
    return arr.map((item: any, i: number) => ({
      ...item,
      slug: item.slug || item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `news-${i}`
    }));
  } catch (fallbackError) {
    console.error("Fallback news fetch failed:", fallbackError);
    return [];
  }
}

export default async function Home() {
  const news = await getNews()
  
  if (!news || news.length === 0) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">No news available at the moment.</h1>
        <p className="text-gray-500">Please check back later.</p>
      </div>
    )
  }

  const featuredArticle = news[0]
  const trendingItems = news.slice(0, 5).map((item: any) => ({
    title: item.title,
    slug: item.slug
  }))
  const CATEGORY_MAPPINGS: Record<string, string[]> = {
    'Tech & AI': ['TECH', 'AI', 'SCIENCE'],
    'Dev & Security': ['DEV', 'SECURITY'],
    'Business': ['BUSINESS'],
    'Local': ['LOCAL', 'GORAKHPUR', 'UP', 'INDIA'],
    'Sports': ['SPORTS']
  }

  // Extract latest 2 per category
  const categorizedNews = Object.entries(CATEGORY_MAPPINGS).map(([name, tags]) => {
    const matched = news.filter((item: any) => tags.includes(item.category?.toUpperCase() || ''))
    return { name, posts: matched.slice(0, 2) }
  }).filter(group => group.posts.length > 0)

  return (
    <>
      <TrendingTicker items={trendingItems} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8 lg:py-16 max-w-[1600px]">
        {/* Hero Section */}
        {featuredArticle && (
          <section className="mb-16">
            <FeaturedCard article={featuredArticle} />
          </section>
        )}

        {/* Category Sections */}
        <div className="space-y-16">
          {categorizedNews.map((group, groupIdx) => (
            <section key={group.name}>
              <div className="flex items-center justify-between mb-8 pb-2 border-b border-gray-200 dark:border-white/10">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {group.name} <span className="text-emerald-500 dark:text-[#10b981]">Latest</span>
                </h2>
                <a href={`/category/${group.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-sm font-semibold text-emerald-600 dark:text-[#10b981] hover:underline">
                  View All {group.name}
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10">
                {group.posts.map((article: any, index: number) => (
                  <NewsCard key={article.slug || index} article={article} index={index} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  )
}
