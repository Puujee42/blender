"use client";

import Navbar from "../../components/Navbar";
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <main className="bg-black min-h-screen text-white flex flex-col pt-20 overflow-hidden">
      <Navbar />

      <div className="flex-1 flex w-full relative">
        {/* Right Side - Cinematic Imagery */}
        <div className="hidden lg:flex flex-[1.2] relative bg-[#050505] order-2">
          <div className="absolute inset-0 z-10 bg-gradient-to-l from-black/20 via-transparent to-black"></div>
          <img
            src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200"
            alt="Barber grooming"
            className="w-full h-full object-cover grayscale brightness-50 contrast-125"
          />
          <div className="absolute bottom-20 right-20 z-20 space-y-4 text-right">
            <span className="text-gold uppercase tracking-luxury text-[10px] block">Virtue & Heritage</span>
            <h2 className="font-serif text-5xl uppercase tracking-luxury leading-tight">Join the <br/> <span className="italic">Inner Circle</span></h2>
          </div>
        </div>

        {/* Left Side - Authentication Portal */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-24 py-12 relative z-20 order-1 bg-[#030303]">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
            className="max-w-md w-full mx-auto"
          >
            <div className="mb-12 space-y-4">
              <span className="text-gold uppercase tracking-luxury text-[9px] font-bold block">Sanctuary Application</span>
              <h1 className="font-serif text-4xl sm:text-5xl tracking-luxury uppercase leading-tight">Become a <br/> <span className="text-gold">Blended Member</span></h1>
              <p className="text-gray-500 font-light text-[11px] uppercase tracking-widest leading-relaxed">Initiate your journey into Blended's world of surgical precision and timeless grooming.</p>
            </div>

            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: "bg-white text-black hover:bg-gold uppercase tracking-luxury text-[10px] font-black py-4 transition-all duration-500 shadow-2xl",
                  card: "bg-transparent shadow-none w-full",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "border border-white/10 bg-transparent hover:bg-white/5 text-white py-4 rounded-none flex items-center justify-center gap-3 transition-all duration-500",
                  socialButtonsBlockButtonText: "text-[10px] font-bold tracking-luxury uppercase text-white",
                  dividerText: "text-[9px] text-gray-600 uppercase tracking-luxury font-bold",
                  dividerLine: "bg-white/5",
                  formFieldLabel: "text-[9px] uppercase tracking-luxury text-gray-500 font-bold mb-2",
                  formFieldInput: "bg-transparent border-b border-white/10 px-0 py-4 text-white focus:outline-none focus:border-gold transition-colors placeholder-gray-800 font-light",
                  footerActionLink: "text-gold hover:text-white transition-all uppercase tracking-luxury text-[10px] font-bold",
                  footerActionText: "text-[10px] text-gray-600 uppercase tracking-luxury font-light",
                  formFieldErrorText: "text-red-500/80 text-[10px] uppercase tracking-widest pt-2",
                  scrollBox: "bg-transparent shadow-none",
                }
              }}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}