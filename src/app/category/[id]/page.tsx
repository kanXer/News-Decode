import clientPromise from '@/lib/mongodb'
import { notFound } from 'next/navigation'
import { NewsArchiveClient } from '@/components/ui/NewsArchiveClient'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const CATEGORY_MAPPINGS: Record<string, string[]> = {
  'tech-ai': ['TECH', 'AI', 'SCIENCE'],
  'dev-security': ['DEV', 'SECURITY'],
  'business': ['BUSINESS'],
  'local': ['LOCAL', 'GORAKHPUR', 'UP', 'INDIA'],
  'sports': ['SPORTS']
}

const CATEGORY_NAMES: Record<string, string> = {
  'tech-ai': 'Tech & AI',
  'dev-security': 'Dev & Security',
  'business': 'Business',
  'local': 'Local News',
  'sports': 'Sports'
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const name = CATEGORY_NAMES[id] || 'News'
  return {
    title: `${name} - KhabriIn`,
    description: `Latest news and updates in ${name}`,
  }
}

async function getCategoryNews(categoryId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("news_db");
    
    const allowedCategories = CATEGORY_MAPPINGS[categoryId]
    if (!allowedCategories) return null

    const news = await db
      .collection("news")
      .find({ category: { $in: allowedCategories } })
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
    console.error("Error reading category news from MongoDB:", error);
  }

  // Fallback
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
    
    const allowedCategories = CATEGORY_MAPPINGS[categoryId]
    if (!allowedCategories) return null

    return arr
      .map((item: any, i: number) => ({
        ...item,
        slug: item.slug || item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `news-${i}`
      }))
      .filter((item: any) => allowedCategories.includes(item.category?.toUpperCase() || ''))
  } catch (error) {
    console.error("Fallback category news failed:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const news = await getCategoryNews(id)
  
  if (!news) {
    notFound()
  }

  const title = `${CATEGORY_NAMES[id]} News`

  return (
    <div className="pt-8">
      <NewsArchiveClient initialNews={news} title={title} showTitle={true} />
    </div>
  )
}
