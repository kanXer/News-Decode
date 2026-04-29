import { FileText, AlertCircle, Scale, Ban, RefreshCw, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service - KhabriIn",
  description: "Read the terms and conditions governing your use of KhabriIn.",
};

const sections = [
  {
    icon: FileText,
    title: "Acceptance of Terms",
    content: [
      "By accessing or using KHABRI.IN, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
      "If you do not agree with any part of these terms, you are prohibited from using or accessing this site.",
      "These terms apply to all visitors, users, and others who access or use the service.",
    ],
  },
  {
    icon: AlertCircle,
    title: "Use of Content",
    content: [
      "All news articles, summaries, and media published on KHABRI.IN are for informational purposes only.",
      "You may share content from this platform with proper attribution to KHABRI.IN.",
      "Reproduction, redistribution, or commercial use of our content without explicit written permission is strictly prohibited.",
      "AI-generated content on this platform is curated and reviewed by our editorial team before publication.",
    ],
  },
  {
    icon: Scale,
    title: "Intellectual Property",
    content: [
      "The KHABRI.IN name, logo, and all associated branding are the intellectual property of Sahil Srivastava (KanXer).",
      "Unauthorized use of our trademarks, trade dress, or copyrighted material may result in legal action.",
      "User-submitted content (e.g., via contact forms) does not transfer ownership rights to KHABRI.IN.",
    ],
  },
  {
    icon: Ban,
    title: "Prohibited Conduct",
    content: [
      "You may not use this site to engage in any unlawful activity or to violate the rights of others.",
      "Scraping, data harvesting, or automated access to our content without prior written consent is prohibited.",
      "You may not attempt to gain unauthorized access to any part of the site or its servers.",
      "Posting or transmitting any harmful, offensive, or malicious content through our contact channels is strictly forbidden.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Disclaimer & Limitation of Liability",
    content: [
      "KHABRI.IN strives to provide accurate and timely news, but we make no warranty regarding the completeness or accuracy of any content.",
      "We are not responsible for any decisions made based on information published on this platform.",
      "KHABRI.IN shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.",
    ],
  },
  {
    icon: Mail,
    title: "Changes & Contact",
    content: [
      "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting.",
      "Continued use of the site after changes constitutes your acceptance of the new terms.",
      "For any questions regarding these terms, contact us at user.kanxer@gmail.com or via our Contact page.",
    ],
  },
];

export default function TermsPage() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-purple-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-emerald-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
            <Scale className="w-3.5 h-3.5" /> Legal
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic mb-6">
            TERMS OF <span className="text-emerald-500 not-italic">SERVICE</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            Please read these terms carefully before using KHABRI.IN. These govern your rights and responsibilities on our platform.
          </p>
          <p className="text-gray-500 text-sm mt-4">Last updated: April {year}</p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((point, i) => (
                  <li key={i} className="flex gap-3 text-gray-500 dark:text-gray-400 leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            By using KHABRI.IN, you agree to these Terms of Service.{" "}
            <Link href="/privacy" className="text-emerald-500 hover:underline font-semibold">
              View Privacy Policy →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
