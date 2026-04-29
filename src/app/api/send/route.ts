import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { msg } = await request.json();

    if (!msg) {
      return NextResponse.json({ success: false, error: "No message content provided." }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing Telegram configuration in environment variables.");
      return NextResponse.json({ success: false, error: "Server configuration error." }, { status: 500 });
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: msg,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error("Telegram API Error:", data);
      return NextResponse.json({ success: false, error: data.description || "Failed to send message via Telegram." }, { status: 500 });
    }

  } catch (error) {
    console.error("API Send Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
