import { Shield, Lock, Eye, Database, Globe, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - KhabriIn",
  description: "Learn how KhabriIn collects, uses, and protects your personal information.",
};

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "We collect information you provide directly, such as when you contact us via our contact form (name, email, message).",
      "We may automatically collect certain technical data when you visit our site, including your IP address, browser type, and pages visited — solely for analytics and security purposes.",
      "We do not collect sensitive personal data such as financial information, passwords, or government IDs.",
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    content: [
      "To respond to your inquiries and provide customer support.",
      "To improve our platform, content, and user experience based on aggregate usage patterns.",
      "To send service-related communications when necessary (we do not send unsolicited marketing emails).",
      "To detect, prevent, and address technical issues or security threats.",
    ],
  },
  {
    icon: Lock,
    title: "Data Protection & Security",
    content: [
      "We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure.",
      "Your contact form submissions are transmitted securely and stored only as long as necessary to respond to your inquiry.",
      "We do not sell, trade, or rent your personal information to any third parties.",
    ],
  },
  {
    icon: Globe,
    title: "Cookies & Tracking",
    content: [
      "KhabriIn uses minimal, essential cookies to ensure the website functions correctly (e.g., theme preference).",
      "We do not use third-party advertising cookies or cross-site tracking technologies.",
      "You can disable cookies in your browser settings at any time without losing core functionality.",
    ],
  },
  {
    icon: Shield,
    title: "Your Rights",
    content: [
      "You have the right to request access to any personal data we hold about you.",
      "You may request deletion of your personal data at any time by contacting us.",
      "You may opt out of any communications from us at any time.",
    ],
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: [
      "If you have any questions or concerns about this Privacy Policy, please reach out to us at user.kanxer@gmail.com or via our Contact page.",
    ],
  },
];

export default function PrivacyPage() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-emerald-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-xs font-black uppercase tracking-[0.2em] mb-6">
            <Shield className="w-3.5 h-3.5" /> Legal
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic mb-6">
            PRIVACY <span className="text-emerald-500 not-italic">POLICY</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how KHABRI.IN handles your data with full transparency.
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
            By using KHABRI.IN, you agree to this Privacy Policy.{" "}
            <Link href="/terms" className="text-emerald-500 hover:underline font-semibold">
              View Terms of Service →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
