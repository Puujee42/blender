"use client";

import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Star } from "lucide-react";

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Architectural Matte Clay",
      category: "Sculpting",
      price: 35,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
      description: "Surgical hold with a natural, light-absorbing finish. Engineered for complex textures."
    },
    {
      id: 2,
      name: "Aegean Sea Salt Mist",
      category: "Architectural Base",
      price: 28,
      image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800",
      description: "Infuses architectural volume and organic texture. The essential foundation of the Blended look."
    },
    {
      id: 3,
      name: "Sandalwood Silk Oil",
      category: "Grooming Ritual",
      price: 42,
      image: "https://images.unsplash.com/photo-1621607512281-9954cc9231dd?auto=format&fit=crop&q=80&w=800",
      description: "Cold-pressed essences that nourish the follicle and pacify the dermis. Scented with ancient woods."
    },
    {
      id: 4,
      name: "High-Gloss Obsidian Pomade",
      category: "Classic Ritual",
      price: 35,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800",
      description: "Infinite depth and high-reflectivity. For silhouettes that demand absolute precision."
    },
    {
      id: 5,
      name: "Invigorating Mint Wash",
      category: "Purification",
      price: 32,
      image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&q=80&w=800",
      description: "A dual-action botanical infusion that detoxifies while stimulating cephalic circulation."
    },
    {
      id: 6,
      name: "Fortifying Ceramide Balm",
      category: "Recovery",
      price: 32,
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800",
      description: "Molecular reconstruction for damaged strands. Restores the structural integrity of your crown."
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as any } }
  };

  return (
    <main className="bg-black min-h-screen pt-40 px-6 text-white pb-40 overflow-hidden">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-32"
        >
          <span className="text-gold uppercase tracking-luxury text-[10px] block mb-6">The Grooming Arsenal</span>
          <h1 className="font-serif text-5xl md:text-7xl tracking-luxury uppercase mb-8">
            Blended <span className="italic">Apothecary</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto font-light tracking-luxury uppercase leading-loose">
            Precision-engineered tools to maintain your architectural silhouette in the comfort of your sanctuary.
          </p>
          <div className="w-20 h-px bg-gold/30 mx-auto mt-12 shadow-[0_0_10px_rgba(197,168,128,0.2)]"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 1 }}
              viewport={{ once: true }}
              className="group flex flex-col glass p-8 hover:border-gold/30 transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                <ShoppingBag className="w-32 h-32 text-gold rotate-12" />
              </div>

              <div className="relative aspect-square mb-10 overflow-hidden bg-black p-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase tracking-luxury text-gold mb-2 block font-bold">{product.category}</span>
                    <h3 className="font-serif text-2xl tracking-wide text-white group-hover:text-gold transition-colors duration-500 uppercase leading-snug">{product.name}</h3>
                  </div>
                  <span className="font-serif text-3xl text-white">${product.price}</span>
                </div>
                
                <p className="text-gray-500 text-[11px] font-light tracking-widest uppercase leading-relaxed h-12 overflow-hidden">
                  {product.description}
                </p>
                
                <div className="pt-6 border-t border-white/5 flex flex-col gap-6">
                   <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-gold text-gold" />)}
                      <span className="text-[8px] text-gray-600 uppercase tracking-widest ml-2">Museum Quality</span>
                   </div>
                  <button 
                    className="group/btn relative w-full border border-white/10 text-white py-5 text-[10px] uppercase tracking-luxury font-black overflow-hidden transition-all duration-500"
                    onClick={() => alert(`Securing ${product.name} for your arsenal.`)}
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 group-hover/btn:text-black flex items-center justify-center gap-2">
                      Add to Arsenal <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
