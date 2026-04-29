import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Share2, BookmarkPlus, Calendar, User } from "lucide-react"
import { CategoryBadge } from "@/components/ui/CategoryBadge"
import { NewsCard } from "@/components/ui/NewsCard"

import clientPromise from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

// Helper to fetch single news item and related
async function getArticleData(slug: string) {
  try {
    const client = await clientPromise;
    const db = client.db("news_db");
    
    // Find the specific article
    const article = await db.collection("news").findOne({ 
      $or: [
        { slug: slug },
        { title: { $regex: new RegExp(slug.replace(/-/g, ' '), 'i') } }
      ]
    });

    if (!article) return { article: null, related: [] };

    const formattedArticle: any = {
      ...article,
      _id: article._id.toString(),
      slug: article.slug || slug
    };

    // Find related articles in the same category
    const related = await db
      .collection("news")
      .find({ 
        category: article.category, 
        _id: { $ne: article._id } 
      })
      .limit(3)
      .toArray();

    const formattedRelated = related.map((item: any, i: number) => ({
      ...item,
      _id: item._id.toString(),
      slug: item.slug || item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `news-rel-${i}`
    }));
    
    return { article: formattedArticle, related: formattedRelated };
  } catch (error) {
    console.error("Error fetching article from MongoDB:", error);
    return { article: null, related: [] };
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { article } = await getArticleData(slug);
  
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: `${article.title} - KhabriIn`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [article.image_url],
    }
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { article, related } = await getArticleData(slug);

  if (!article) {
    notFound();
  }

  const date = article.created_at 
    ? new Date(article.created_at * 1000).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })
    : "Just now";
    
  // Estimate read time (rough calculation based on summary length)
  const readTime = Math.max(1, Math.ceil(article.summary.split(' ').length / 200)) + " min read";

  return (
    <article className="min-h-screen">
      {/* Hero Header */}
      <header className="relative w-full h-[50vh] md:h-[70vh]">
        <Image
          src={article.image_url || "/placeholder-news.jpg"}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <CategoryBadge category={article.category} />
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between border-t border-white/20 pt-6 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-white">
                  <p className="font-medium">KhabriIn Desk</p>
                  <p className="text-xs text-white/60">Editorial Team</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors">
                  <BookmarkPlus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content & Sidebar */}
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Article Content */}
          <main className="lg:w-2/3">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-emerald-600 dark:prose-a:text-[#10b981]">
              <p className="text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 font-medium mb-8">
                {article.summary}
              </p>
              
              {/* If there was full content, it would go here. For now we use the summary and a question */}
              
              {article.question && (
                <div className="my-10 p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border-l-4 border-emerald-500 dark:border-[#10b981]">
                  <h3 className="text-xl font-bold mb-4 mt-0 text-gray-900 dark:text-white">Something to think about</h3>
                  <p className="mb-0 text-gray-700 dark:text-gray-300 italic">
                    "{article.question}"
                  </p>
                </div>
              )}
              
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Related Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28">
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-white/10">
                Related <span className="text-emerald-500 dark:text-[#10b981]">Articles</span>
              </h3>
              
              <div className="space-y-6">
                {related.length > 0 ? (
                  related.map((item: any) => (
                    <Link href={`/news/${item.slug}`} key={item.slug} className="group flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.image_url || "/placeholder-news.jpg"}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-[#10b981] transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                          {item.category}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No related articles found.</p>
                )}
              </div>
              
              {/* Ad or Newsletter Banner */}
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-purple-600 text-white text-center">
                <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
                <p className="text-white/80 mb-6 text-sm">Get the latest high-end global news delivered to your inbox daily.</p>
                <div className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="px-4 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </aside>
          
        </div>
      </div>
    </article>
  )
}
