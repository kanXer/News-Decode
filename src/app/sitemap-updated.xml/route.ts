import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export async function GET() {
  let news: any[] = [];
  let fromDb = false;

  // 1. Fetch data from MongoDB
  try {
    const client = await clientPromise;
    const db = client.db("news_db");
    news = await db
      .collection("news")
      .find({})
      .sort({ created_at: -1 })
      .limit(1000)
      .toArray();
    fromDb = true;
  } catch (error) {
    console.error('DB error, falling back to file:', error);
  }

  // 2. Fallback to Local JSON Files
  if (!fromDb || news.length === 0) {
    try {
      const dataPath = path.join(process.cwd(), '..', 'news', 'processed.json');
      const processedPath = path.join(process.cwd(), '..', 'news', 'state.json');
      
      let filePath = fs.existsSync(dataPath) ? dataPath : (fs.existsSync(processedPath) ? processedPath : null);

      if (filePath) {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        news = JSON.parse(fileContents);
      }
    } catch (fileError) {
      console.error('File fallback error:', fileError);
    }
  }

  const baseUrl = 'https://news.fastpdftool.xyz';

  // 3. Sitemap Header
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
    <changefreq>hourly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/news</loc>
    <priority>0.9</priority>
    <changefreq>hourly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <priority>0.6</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <priority>0.6</priority>
    <changefreq>monthly</changefreq>
  </url>`;

  // 4. Dynamic News URLs
  for (const article of news) {
    const slug = article.slug || article.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `news-${article._id}`;
    
    let lastmod: string;
    const rawDate = article.created_at;

    if (!rawDate) {
      lastmod = new Date().toISOString();
    } else {
      try {
        let dateObj: Date;
        if (typeof rawDate === 'number') {
          // Fix for 1970 issue: Detect if timestamp is in seconds (10 digits) or milliseconds
          const timestamp = rawDate < 10000000000 ? rawDate * 1000 : rawDate;
          dateObj = new Date(timestamp);
        } else {
          dateObj = new Date(rawDate);
        }
        // Final validation
        lastmod = isNaN(dateObj.getTime()) ? new Date().toISOString() : dateObj.toISOString();
      } catch (e) {
        lastmod = new Date().toISOString();
      }
    }
    
    sitemap += `
  <url>
    <loc>${baseUrl}/news/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>`;
  }

  sitemap += `
</urlset>`;

  // 5. Return Response with proper headers
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
    },
  });
}
