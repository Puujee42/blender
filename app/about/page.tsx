"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Scissors, Award, ShieldCheck, History } from "lucide-react";

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as any } }
  };

  const philosophy = [
    {
      title: "Precision",
      icon: <Scissors className="w-8 h-8" />,
      description: "We view grooming as architecture. Every stroke is calculated, every silhouette is intentional. We don't just cut hair; we engineer appearance."
    },
    {
      title: "Virtue",
      icon: <ShieldCheck className="w-8 h-8" />,
      description: "Integrity is our foundation. From the curated products we select to the transparency of our rituals, we uphold the highest standards of masculine care."
    },
    {
      title: "Tradition",
      icon: <History className="w-8 h-8" />,
      description: "Honor the heritage. We blend the ancestral wisdom of traditional Mongolian barbering with contemporary global aesthetics to define the modern man."
    }
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1589710751893-f93976860000?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1473188588955-6623e55c79bc?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200"
  ];

  return (
    <main className="bg-black text-white selection:bg-gold selection:text-black min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1512690196236-8c8d2d53bfce?auto=format&fit=crop&q=80&w=2000" 
            alt="The Heritage" 
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </div>
        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as any }}
            className="space-y-6"
          >
            <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold block">Since 2012</span>
            <h1 className="font-serif text-6xl md:text-9xl tracking-luxury uppercase leading-tight">
              The <span className="italic">Heritage</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-12"
          >
            <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-luxury">Architecting <br/> <span className="text-gold italic">Legacy</span></h2>
            <div className="space-y-8 text-gray-500 font-light tracking-wide uppercase leading-loose text-sm md:text-base">
              <p>
                Founded in the heart of Ulaanbaatar, Blended emerged from a singular vision: to treat the art of barbering not as a service, but as an architectural ritual.
              </p>
              <p>
                We recognize that the modern man operates in a world of high stakes and surgical precision. His sanctuary should reflect that reality. We built Blended to be a vault of virtue—where tradition meets contemporary refinement.
              </p>
              <p>
                Our master artisans are trained to see beyond the hair. They analyze the structural profile of the face, the grain of the beard, and the essence of the individual to craft a silhouette that isn't just a cut—it's a signature.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="relative glass p-2"
          >
            <img 
              src="https://images.unsplash.com/photo-1593702275677-f916738521c7?auto=format&fit=crop&q=80&w=1200" 
              alt="Artisan at work" 
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-40 px-6 bg-[#030303]">
        <div className="max-w-7xl mx-auto space-y-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <span className="text-gold uppercase tracking-luxury text-[10px] block mb-6">Our DNA</span>
            <h2 className="font-serif text-5xl md:text-8xl tracking-luxury uppercase">Core Philosophy</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
            {philosophy.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 1 }}
                viewport={{ once: true }}
                className="space-y-8 text-center md:text-left"
              >
                <div className="text-gold mb-8 flex justify-center md:justify-start">
                  {item.icon}
                </div>
                <h3 className="font-serif text-3xl tracking-wide uppercase">{item.title}</h3>
                <p className="text-gray-500 font-light tracking-widest text-xs uppercase leading-loose italic">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sanctuary Gallery */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-4">
              <span className="text-gold uppercase tracking-luxury text-[10px] block">The Environment</span>
              <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-luxury">The Sanctuary</h2>
            </div>
            <p className="text-gray-500 text-sm font-light tracking-widest uppercase md:max-w-xs text-right italic">
              A meticulously designed space to facilitate transformation and virtue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 h-[80vh] md:h-auto">
            {gallery.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden glass group cursor-none"
              >
                <img 
                  src={img} 
                  alt={`Sanctuary ${idx + 1}`} 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
