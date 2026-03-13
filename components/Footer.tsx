"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-white/5 pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-32">
        <div className="grid md:grid-cols-4 gap-16">
          <div className="col-span-2 space-y-10">
             <h3 className="font-serif text-5xl tracking-luxury uppercase text-white">Blended</h3>
             <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-light tracking-wide uppercase">
               Defining the modern gentleman through surgical precision and ancestral wisdom.
             </p>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-luxury text-gold font-bold">Contact</h4>
            <div className="space-y-6 text-gray-500 text-xs font-light tracking-widest uppercase leading-loose">
              <p>Sukhbaatar District<br/>Ulaanbaatar, MN</p>
              <p>+976 9911 2233</p>
              <p className="text-white hover:text-gold transition-colors cursor-pointer">@blended_mn</p>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-luxury text-gold font-bold">Hours</h4>
            <ul className="space-y-6 text-gray-500 text-xs font-light tracking-widest uppercase">
              <li className="flex justify-between"><span>Mon - Sat</span> <span className="text-white">10:00 - 21:00</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>By Inquiry</span></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/5 pt-20">
          <p className="text-[9px] text-gray-600 uppercase tracking-[0.4em]">&copy; {new Date().getFullYear()} Blended Barbers. Architectural Grooming since 2012.</p>
          <div className="flex gap-16">
            {['Vogue', 'GQ', 'Prestige'].map(press => (
              <span key={press} className="font-serif text-xs text-gray-800 tracking-luxury uppercase italic">{press}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
