"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe, Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0b0f] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="container mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-white text-black p-2 rounded-xl group-hover:rotate-12 transition-transform duration-500">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter italic text-white">
                NEWS<span className="text-emerald-500 not-italic">DECODE</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
             News Decode is a high-end, AI-powered global news platform delivering real-time updates and deep insights across Tech, Business, and Security.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-4 col-span-1 md:col-span-1">
            <div>
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 md:mb-8">Categories</h3>
              <ul className="space-y-4">
                {[
                  { name: "Tech & AI", path: "/category/tech-ai" },
                  { name: "Dev & Security", path: "/category/dev-security" },
                  { name: "Business", path: "/category/business" },
                  { name: "Sports", path: "/category/sports" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.path} className="text-gray-400 hover:text-emerald-500 text-sm transition-colors font-medium">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Company</h3>
            <ul className="space-y-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-gray-400 hover:text-emerald-500 text-sm transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Get in Touch</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>user.kanxer@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+91 9696262007</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Uttar Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Made with ❤️ — All rights reserved to <strong className="text-white dark:text-white">KHABRI<span className="text-emerald-500 not-italic">.IN</span></strong> • {year}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function FooterWrapper() {
  const pathname = usePathname();

  if (pathname?.startsWith("/instagram")) return null;

  return <Footer />;
}
