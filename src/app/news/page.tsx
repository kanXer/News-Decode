import clientPromise from '@/lib/mongodb'
import { NewsArchiveClient } from '@/components/ui/NewsArchiveClient'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'All News - KhabriIn',
  description: 'Search and filter the complete archive of KhabriIn global news.',
}

async function getAllNews() {
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
    console.error("Error reading all news from MongoDB:", error);
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
    
    return arr.map((item: any, i: number) => ({
      ...item,
      slug: item.slug || item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `news-${i}`
    }));
  } catch (error) {
    console.error("Fallback reading news failed:", error);
    return [];
  }
}

export default async function NewsArchivePage() {
  const news = await getAllNews()
  
  return <NewsArchiveClient initialNews={news} />
}
