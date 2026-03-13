"use client";

import Navbar from "../../components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors, ArrowRight } from "lucide-react";

export default function BarbersPage() {
  const barbers = [
    { name: "Marcus Johnson", title: "Master Artisan", specialty: "Architectural Fades & Scissor Sculpting", image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=800" },
    { name: "Julian Rossi", title: "Master Artisan", specialty: "Heritage Gentlemen's Cuts & Beard Rituals", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=800" },
    { name: "David Chen", title: "Senior Artisan", specialty: "Avant-Garde Trends & Precise Layering", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" },
    { name: "Andre Smith", title: "Senior Artisan", specialty: "Contemporary Fades & Portrait Line-ups", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=800" },
    { name: "Sam Wilson", title: "Artisan", specialty: "Traditional Tapers & Essential Grooming", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as any } }
  };

  return (
    <main className="bg-black min-h-screen pt-40 px-6 text-white overflow-hidden pb-40">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-32"
        >
          <span className="text-gold uppercase tracking-luxury text-[10px] block mb-6">The Master Craftsmen</span>
          <h1 className="font-serif text-5xl md:text-7xl tracking-luxury uppercase mb-8">
            The Blended <span className="italic">Artisans</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto font-light tracking-luxury uppercase leading-loose">
            Meet the experienced professionals dedicated to the architectural precision of masculine grooming.
          </p>
          <div className="w-20 h-px bg-gold/30 mx-auto mt-12 shadow-[0_0_10px_rgba(197,168,128,0.2)]"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
          {barbers.map((barber, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 1.2 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-[4/5] glass p-2 mb-10 overflow-hidden transform group-hover:scale-[1.02] transition-all duration-700">
                <div className="absolute inset-x-2 inset-y-2 overflow-hidden bg-black">
                  <img 
                    src={barber.image} 
                    alt={barber.name} 
                    className="w-full h-full object-cover grayscale brightness-75 contrast-110 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 z-20 opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <Link href={`/?barber=${encodeURIComponent(barber.name)}#book`} className="flex items-center justify-center gap-3 w-full bg-white text-black py-4 text-[10px] uppercase tracking-luxury font-black hover:bg-gold transition-all duration-300 shadow-2xl">
                    <span>Reserve Session</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <h3 className="font-serif text-3xl tracking-wide text-white group-hover:text-gold transition-colors duration-500 uppercase">{barber.name}</h3>
                <div className="flex items-center justify-center gap-4 py-1">
                  <div className="h-px w-4 bg-gold/30"></div>
                  <p className="text-gold text-[10px] uppercase tracking-luxury font-bold">{barber.title}</p>
                  <div className="h-px w-4 bg-gold/30"></div>
                </div>
                <p className="text-gray-500 text-[10px] font-light uppercase tracking-widest leading-relaxed px-12">{barber.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
