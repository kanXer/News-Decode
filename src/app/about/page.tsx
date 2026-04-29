import Image from "next/image"
import { Globe, Shield, Zap, Target } from "lucide-react"

export const metadata = {
  title: "About Us - KhabriIn",
  description: "Learn about the mission and team behind KhabriIn global news.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-hero.png"
            alt="About KhabriIn"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0b0f]/80 to-[#0b0b0f]" />
        </div>

        <div className="container mx-auto px-4 lg:px-12 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 italic">
            THE MISSION OF <span className="text-emerald-500 not-italic"> KHABRI.IN</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Revolutionizing global journalism with high-end, AI-powered precision and uncompromising editorial integrity.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 container mx-auto px-4 lg:px-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              Empowering the world through <span className="text-emerald-500">Intelligent</span> Information.
            </h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-medium">
              <p>
                KhabriIn was born out of a simple necessity: the need for news that is as fast as the modern world, yet as deep as traditional journalism. In an era of information overload, we leverage advanced AI to curate, verify, and present stories that truly matter.
              </p>
              <p>
                Our platform isn't just about headlines; it's about context. We bridge the gap between complex global events and your daily life, ensuring you stay ahead of the curve in Tech, Business, and beyond.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
            <Image
              src="/logo.png"
              alt="Journalism"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md">
            <Shield className="w-12 h-12 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Integrity First</h3>
            <p className="text-gray-400 font-medium">Every piece of data is cross-verified by our multi-layered AI protocols before it reaches your screen.</p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md">
            <Zap className="w-12 h-12 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Ultra Speed</h3>
            <p className="text-gray-400 font-medium">Our neural networks process breaking news in real-time, delivering insights minutes before traditional outlets.</p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md">
            <Target className="w-12 h-12 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Deep Insight</h3>
            <p className="text-gray-400 font-medium">We don't just report "what" happened; we use predictive modeling to explain "why" it matters for the future.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
