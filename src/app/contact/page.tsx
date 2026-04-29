"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Globe, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = [];
    if (!form.name.trim()) e.push("Name is required.");
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      e.push("Valid email is required.");
    if (!form.message.trim()) e.push("Message required.");
    return e;
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const v = validate();
    if (v.length) {
      setErrors(v);
      setSuccess("");
      setIsSending(false);
      return;
    }

    setErrors([]);

    const text =
      `📩 New Contact Message\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Message: ${form.message}`;

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: text }),
      });

      const json = await res.json();

      if (json?.success) {
        setSuccess("Thank you! Your message was sent.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setSuccess(`ERROR: ${json.error || "Unknown API Error"}`);
      }
    } catch (err) {
      setSuccess("ERROR: Could not connect to API server.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen py-24 relative overflow-hidden">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-xs font-black uppercase tracking-[0.2em] mb-6"
            >
              Get in touch
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black tracking-tighter italic mb-8"
            >
              LET'S <span className="text-emerald-500 not-italic">CONNECT</span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
              Have a question, feedback, or a potential collaboration? Our team is standing by to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 bg-white dark:bg-[#12121a] border border-gray-100 dark:border-white/10 rounded-[3rem] p-8 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] -mr-32 -mt-32" />

              <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <Send className="w-6 h-6" />
                </div>
                Send a Message
              </h2>

              {/* ERRORS */}
              {errors.length > 0 && (
                <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm">
                  <strong className="block mb-2">Validation Errors:</strong>
                  <ul className="list-disc list-inside">
                    {errors.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* SUCCESS / ERROR API */}
              {success && (
                <div className={`mb-8 p-6 rounded-2xl text-sm font-bold border ${success.startsWith("ERROR:")
                  ? "bg-red-500/10 border-red-500/20 text-red-500"
                  : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                  }`}>
                  {success}
                </div>
              )}

              <form onSubmit={sendMessage} noValidate className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-gray-500">Name</label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="off"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white font-medium"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="off"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white font-medium"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-gray-500">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    autoComplete="off"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-3xl px-6 py-5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white resize-none font-medium"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full md:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSending ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>

            {/* CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="bg-emerald-500 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                  <Mail className="w-32 h-32" />
                </div>
                <h3 className="text-3xl font-bold mb-8 relative z-10">Contact Info</h3>
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-bold uppercase">Email Us</p>
                      <p className="font-bold">user.kanxer@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-bold uppercase">Call Us</p>
                      <p className="font-bold">+91 9696262007</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-bold uppercase">Location</p>
                      <p className="font-bold">Uttar Pradesh, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/10 bg-white/5 backdrop-blur-md">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <ShieldCheck className="text-emerald-500" /> Follow Us
                </h3>
                <div className="flex gap-6">
                  <a href="https://facebook.com/sahil.srivastava.1004" target="_blank" className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:-translate-y-2 transition-all shadow-lg shadow-blue-600/20 group">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="https://instagram.com/p.c.kill3r" target="_blank" className="w-14 h-14 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white rounded-2xl flex items-center justify-center hover:-translate-y-2 transition-all shadow-lg shadow-red-500/20 group">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="https://wa.me/919696262007" target="_blank" className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:-translate-y-2 transition-all shadow-lg shadow-emerald-500/20 group">
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
