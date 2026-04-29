import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalLoader from "@/components/ui/GlobalLoader";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans-fallback" });

export const metadata: Metadata = {
  title: "KhabriIn - Global Premium News",
  description: "High-end modern global news platform powered by AI.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "KhabriIn - Global Premium News",
    description: "High-end modern global news platform powered by AI.",
    url: "https://khabri.in",
    siteName: "KhabriIn",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      }
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalLoader />
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
