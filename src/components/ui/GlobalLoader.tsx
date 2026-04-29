"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0b0b0f] flex flex-col items-center justify-center text-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse" />
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/logo.png"
                alt="KhabriIn Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic mb-4">
              KHABRI<span className="text-emerald-500 not-italic">.IN</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
              Premium AI Journalism • Real-time Updates • Global Reach
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16 text-sm font-medium text-gray-500 tracking-widest uppercase"
          >
            Let’s Begin the Journey
          </motion.h2>

          <div className="mt-8 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: i * 0.2
                }}
                className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
