"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Clock, MapPin, Phone, Scissors, Award, Star, ArrowRight, User } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Footer from "./Footer";

// Sub-component to handle search params safely in Next.js
function BookingForm({ services, handleBookingSubmit, bookingStatus, formData, setFormData, handleChange }: any) {
  const searchParams = useSearchParams();
  const barbers = [
    "Marcus Johnson",
    "Julian Rossi",
    "David Chen",
    "Andre Smith",
    "Sam Wilson"
  ];

  useEffect(() => {
    const barberParam = searchParams.get("barber");
    if (barberParam && barbers.includes(barberParam)) {
      setFormData((prev: any) => ({ ...prev, barberName: barberParam }));
    }
  }, [searchParams]);

  return (
    <motion.form 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true }}
      onSubmit={handleBookingSubmit} 
      className="glass-card p-12 md:p-16 space-y-10"
    >
      <div className="space-y-10">
        <div className="relative group">
          <input 
            type="text" 
            name="name"
            required
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-colors font-light appearance-none"
          />
          <label className="absolute left-0 top-4 text-xs uppercase tracking-luxury text-gray-500 transition-all peer-focus:-top-4 peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-4">Full Name</label>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
           <div className="relative group">
            <select 
              name="serviceId" 
              required
              value={formData.serviceId}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-colors font-light appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-black">The Ritual</option>
              {services.map((s: any) => (
                <option key={s._id} value={s._id} className="bg-black">{s.name}</option>
              ))}
            </select>
            <div className="absolute right-0 bottom-4 pointer-events-none">
              <Scissors className="w-3 h-3 text-gold/50" />
            </div>
          </div>
          <div className="relative group">
            <select 
              name="barberName" 
              required
              value={formData.barberName}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-colors font-light appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-black">The Artisan</option>
              {barbers.map(b => (
                <option key={b} value={b} className="bg-black">{b}</option>
              ))}
            </select>
            <div className="absolute right-0 bottom-4 pointer-events-none">
              <User className="w-3 h-3 text-gold/50" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative group">
            <input 
              type="date" 
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-colors font-light appearance-none invert hue-rotate-180 brightness-200"
            />
          </div>
          <div className="relative group">
            <input 
              type="time" 
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-colors font-light appearance-none invert hue-rotate-180 brightness-200"
            />
          </div>
        </div>
      </div>

      <button 
        type="submit"
        className="w-full bg-white text-black py-6 uppercase tracking-luxury text-xs font-black shadow-2xl hover:bg-gold transition-all duration-700"
      >
        Verify Reservation
      </button>

      {bookingStatus && (
        <div className="text-center space-y-2 mt-4">
          <p className="text-[10px] uppercase tracking-widest text-gold animate-pulse">
            {bookingStatus}
          </p>
          {bookingStatus.includes("Confirmed") && (
             <p className="text-[9px] text-gray-500 uppercase tracking-widest">
                Awaiting your arrival, Master {formData.name.split(' ')[0]}.
             </p>
          )}
        </div>
      )}
    </motion.form>
  );
}

export default function LandingPage() {
  const [bookingStatus, setBookingStatus] = useState("");
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceId: "",
    barberName: "",
    date: "",
    time: "",
  });

  const services = [
    { _id: "1", name: "Executive Fade", description: "Precision taper with straight razor edge work.", price: 65, category: "Hairstyle" },
    { _id: "2", name: "Sartorial Cut", description: "Artisanal scissor sculpting for classic silhouettes.", price: 55, category: "Hairstyle" },
    { _id: "3", name: "The Royal Shave", description: "Multi-stage hot towel treatment and traditional lather.", price: 45, category: "Grooming" },
    { _id: "4", name: "Architectural Color", description: "Bespoke highlights and grey blending.", price: 150, category: "Artistry" },
    { _id: "5", name: "Textural Metamorphosis", description: "Luxury perms and wave definition.", price: 110, category: "Artistry" },
    { _id: "6", name: "The Blended Signature", description: "The ultimate 2-hour grooming ritual.", price: 185, category: "Experience" },
  ];

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);
  const progressSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName = services.find(s => s._id === formData.serviceId)?.name || "Ritual";
    setBookingStatus("Authenticating...");
    // Mocking the delay for a premium feel
    setTimeout(() => {
      setBookingStatus(`Confirmed: ${serviceName} with ${formData.barberName}.`);
    }, 1500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as any } }
  };

  return (
    <div ref={targetRef} className="relative min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gold z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black z-10"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover grayscale brightness-50 contrast-125"
            poster="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=2074"
          >
            <source src="https://player.vimeo.com/external/498267078.sd.mp4?s=d072836ff79a1fec90091dfadbd761c5ddde20d8&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
        </motion.div>
        
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <span className="text-gold tracking-luxury uppercase text-xs mb-8 block font-medium">Ulaanbaatar's Premier Sanctuary</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-luxury uppercase leading-tight text-shadow-premium">
              BLENDED
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4 text-gray-500 uppercase tracking-widest text-[10px]">
              <span>Tradition</span>
              <div className="w-1 h-1 bg-gold rounded-full"></div>
              <span>Precision</span>
              <div className="w-1 h-1 bg-gold rounded-full"></div>
              <span>Virtue</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 pt-6"
          >
            <a 
              href="#book"
              className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-5 text-xs uppercase tracking-luxury font-black overflow-hidden transition-all duration-700 hover:bg-gold"
            >
              <span className="relative z-10">Reserve Experience</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
            </a>
            <a 
              href="#services"
              className="px-12 py-5 text-xs uppercase tracking-luxury font-bold border border-white/20 hover:border-gold transition-all duration-700"
            >
              The Rituals
            </a>
          </motion.div>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-gold"></div>
          <span className="text-[9px] uppercase tracking-luxury text-gray-500 vertical-text">Scroll</span>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section id="about" className="py-40 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-10"
          >
            <h2 className="font-serif text-5xl md:text-6xl uppercase tracking-luxury leading-tight">
              A Masterpiece <br/> <span className="text-gold italic">In Every Stroke</span>
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed tracking-wide mt-8">
              Blended is not merely a barbershop; it is a meticulously curated environment for the modern titan. We blend the ancestral precision of Mongolian craftsmanship with contemporary techniques to sculpt an appearance that reflects your inner strength.
            </p>
            <div className="grid grid-cols-2 gap-12 pt-10">
              <div className="space-y-4 border-l border-gold/30 pl-6">
                < Award className="w-8 h-8 text-gold font-light" />
                <h4 className="uppercase tracking-widest text-[11px] font-bold">Award Winning</h4>
                <p className="text-xs text-gray-500 font-light tracking-wide">Recognized for excellence in precision aesthetics.</p>
              </div>
              <div className="space-y-4 border-l border-gold/30 pl-6">
                 <Star className="w-8 h-8 text-gold font-light" />
                 <h4 className="uppercase tracking-widest text-[11px] font-bold">5-Star Rituals</h4>
                 <p className="text-xs text-gray-500 font-light tracking-wide">Exclusively curated grooming experiences for gentlemen.</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] glass p-2 overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury Barber Chair" 
              className="w-full h-full object-cover grayscale contrast-110"
            />
            <div className="absolute inset-0 bg-gold/5 pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* Rituals (Services) Section */}
      <section id="services" className="py-40 px-6 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8"
          >
            <div className="space-y-4">
              <span className="text-gold uppercase tracking-luxury text-[10px] block">Curated Rituals</span>
              <h2 className="font-serif text-5xl md:text-6xl uppercase tracking-luxury">Menu of Excellence</h2>
            </div>
            <div className="w-full md:w-1/3 text-gray-500 text-sm font-light tracking-wide leading-relaxed">
              Every appointment is a dedicated session of precision. We focus on the architecture of your face to find the perfect silhouette.
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group relative glass-card p-10 hover:border-gold/40 transition-all duration-700 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                  <Scissors className="w-20 h-20 text-gold" />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest text-gold px-3 py-1 border border-gold/20 rounded-full">{service.category}</span>
                    <span className="font-serif text-3xl text-white">${service.price}</span>
                  </div>
                  <h3 className="text-2xl font-serif tracking-wide text-white group-hover:text-gold transition-colors">{service.name}</h3>
                  <p className="text-gray-500 text-sm font-light tracking-wide leading-relaxed">{service.description}</p>
                  <div className="pt-4 border-t border-white/5 group-hover:border-gold/20 transition-colors flex items-center gap-2 text-[10px] uppercase tracking-luxury text-gray-400 font-bold group-hover:text-gold">
                    <span>Reserve Session</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Reservation Section */}
      <section id="book" className="relative h-screen flex items-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=2000')" }}
        >
          <div className="absolute inset-0 bg-black/90 z-10"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative z-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <span className="text-gold uppercase tracking-luxury text-[10px] block">Availability</span>
            <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-luxury text-white">Secure Your <br/> Silhouette</h2>
            <p className="text-gray-400 font-light tracking-widest text-sm leading-8">
              Direct access to our lead barbers. Choose your ritual, select your preferred time, and step into the Blended world.
            </p>
          </motion.div>

          <Suspense fallback={<div className="glass-card p-12 md:p-16 h-96 animate-pulse bg-white/5" />}>
            <BookingForm 
              services={services}
              handleBookingSubmit={handleBookingSubmit}
              bookingStatus={bookingStatus}
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  );
}