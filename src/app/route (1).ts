import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export async function GET() {
  let news: any[] = [];
  let fromDb = false;

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

  if (!fromDb || news.length === 0) {
    try {
      const dataPath = path.join(process.cwd(), '..', 'api', 'local_news.json');
      if (fs.existsSync(dataPath)) {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        news = JSON.parse(fileContents);
      } else {
        const processedPath = path.join(process.cwd(), '..', 'api', 'processed.json');
        if (fs.existsSync(processedPath)) {
          const fileContents = fs.readFileSync(processedPath, 'utf8');
          news = JSON.parse(fileContents);
        }
      }
    } catch (fileError) {
      console.error('File fallback error:', fileError);
    }
  }

  const baseUrl = 'https://news.fastpdftool.xyz';

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

  for (const article of news) {
    const slug = article.slug || article.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `news-${article._id}`;
    const lastmod = article.created_at ? new Date(article.created_at).toISOString() : new Date().toISOString();
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

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}