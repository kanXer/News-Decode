import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("news_db");
    const news = await db
      .collection("news")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    if (news.length > 0) {
      const formattedNews = news.map((item: any, i: number) => ({
        ...item,
        _id: item._id.toString(),
        slug: item.slug || item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `news-${i}`
      }));
      return NextResponse.json(formattedNews);
    }
  } catch (mongoError) {
    console.error('MongoDB fetch error in API:', mongoError);
  }

  // Fallback to filesystem
  try {
    const dataPath = path.join(process.cwd(), '..', 'api', 'local_news.json');
    if (fs.existsSync(dataPath)) {
      const fileContents = fs.readFileSync(dataPath, 'utf8');
      const data = JSON.parse(fileContents);
      return NextResponse.json(data);
    }
    
    const processedPath = path.join(process.cwd(), '..', 'api', 'processed.json');
    if (fs.existsSync(processedPath)) {
      const fileContents = fs.readFileSync(processedPath, 'utf8');
      const parsed = JSON.parse(fileContents);
      return NextResponse.json(Array.isArray(parsed) ? parsed : [parsed]);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error('Error reading news data fallback in API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news data' },
      { status: 500 }
    );
  }
}
