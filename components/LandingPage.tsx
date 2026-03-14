"use client";

import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { Scissors, ArrowRight, User, ArrowDown, AlertTriangle, Calendar } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Footer from "./Footer";
import TextScramble from "./TextScramble";
import MarqueeStrip from "./MarqueeStrip";
import AnimatedCounter from "./AnimatedCounter";
import {
  getAllBarbers,
  getBarberByName,
  getBusySlots,
  TIME_SLOTS,
} from "../lib/barberData";

// ═══════ BOOKING FORM ═══════
function BookingForm({ services, handleBookingSubmit, bookingStatus, formData, setFormData, handleChange }: any) {
  const t = useTranslations('LandingPage');
  const searchParams = useSearchParams();
  const allBarbers = getAllBarbers();
  const [busyWarning, setBusyWarning] = useState("");

  useEffect(() => {
    const barberParam = searchParams.get("barber");
    if (barberParam) {
      const found = allBarbers.find((b) => b.name === barberParam);
      if (found) {
        setFormData((prev: any) => ({ ...prev, barberName: found.name }));
      }
    }
  }, [searchParams]);

  // Get busy slots for selected barber + date
  const busySlots = useMemo(() => {
    if (!formData.barberName || !formData.date) return [];
    const barber = getBarberByName(formData.barberName);
    if (!barber) return [];
    return getBusySlots(barber.id, formData.date);
  }, [formData.barberName, formData.date]);

  // Clear time + warning when barber or date changes
  useEffect(() => {
    setFormData((prev: any) => ({ ...prev, time: "" }));
    setBusyWarning("");
  }, [formData.barberName, formData.date]);

  const handleTimeSelect = (time: string) => {
    const isBusy = busySlots.includes(time);
    if (isBusy) {
      const slot = TIME_SLOTS.find((s) => s.time === time);
      setBusyWarning(
        t('BookingForm.busyWarning', { barberName: formData.barberName, time: slot?.label || time })
      );
      setFormData((prev: any) => ({ ...prev, time: "" }));
    } else {
      setBusyWarning("");
      setFormData((prev: any) => ({ ...prev, time }));
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const showTimeGrid = formData.barberName && formData.date;

  return (
    <motion.form
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      onSubmit={handleBookingSubmit}
      className="glass-card p-8 md:p-12 space-y-7"
    >
      <div className="space-y-7">
        {/* Name */}
        <div className="relative group">
          <input
            type="text"
            name="name"
            required
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white transition-colors font-light appearance-none"
          />
          <label className="absolute left-0 top-4 text-xs uppercase tracking-[0.2em] text-gray-500 transition-all peer-focus:-top-4 peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 font-semibold">
            {t('BookingForm.fullName')}
          </label>
        </div>

        {/* Service + Barber */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative group">
            <select
              name="serviceId"
              required
              value={formData.serviceId}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white transition-colors font-light appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-black">{t('BookingForm.selectService')}</option>
              {services.map((s: any) => (
                <option key={s._id} value={s._id} className="bg-black">{s.name}</option>
              ))}
            </select>
            <div className="absolute right-0 bottom-4 pointer-events-none">
              <Scissors className="w-3 h-3 text-white/30" />
            </div>
          </div>
          <div className="relative group">
            <select
              name="barberName"
              required
              value={formData.barberName}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white transition-colors font-light appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-black">{t('BookingForm.selectBarber')}</option>
              {allBarbers.map((b) => (
                <option key={b.id} value={b.name} className="bg-black">{b.name}</option>
              ))}
            </select>
            <div className="absolute right-0 bottom-4 pointer-events-none">
              <User className="w-3 h-3 text-white/30" />
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="relative">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold block mb-2">
            {t('BookingForm.date')}
          </label>
          <input
            type="date"
            name="date"
            required
            min={today}
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-transparent border border-white/10 py-3 px-4 text-white focus:outline-none focus:border-white/30 transition-colors font-light appearance-none [color-scheme:dark] text-sm"
          />
        </div>

        {/* Time Slots Grid */}
        {showTimeGrid ? (
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
              {t('BookingForm.pickATime')}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isBusy = busySlots.includes(slot.time);
                const isSelected = formData.time === slot.time;

                return (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => handleTimeSelect(slot.time)}
                    className={`
                      py-3 text-[11px] uppercase tracking-[0.1em] font-semibold border transition-all duration-300
                      ${isBusy
                        ? "border-red-500/30 text-red-400 bg-red-500/[0.05] hover:bg-red-500/[0.1]"
                        : isSelected
                          ? "border-white bg-white text-black"
                          : "border-white/10 text-white hover:border-white/30 hover:bg-white/[0.03]"
                      }
                    `}
                  >
                    {slot.label}
                    {isBusy && (
                      <span className="block text-[8px] tracking-wider text-red-500/80 mt-0.5">
                        {t('BookingForm.busy')}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 border border-white/5">
            <Calendar className="w-5 h-5 text-gray-600 mx-auto mb-2" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold">
              {!formData.barberName
                ? t('BookingForm.selectBarberFirst')
                : t('BookingForm.selectDateToSeeTimes')}
            </p>
          </div>
        )}

        {/* Busy Warning */}
        {busyWarning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-start gap-3 p-4 border border-red-500/20 bg-red-500/[0.05]"
          >
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-red-400 font-semibold uppercase tracking-wider leading-relaxed">
              {busyWarning}
            </p>
          </motion.div>
        )}
      </div>

      <button
        type="submit"
        disabled={!formData.name || !formData.serviceId || !formData.barberName || !formData.date || !formData.time}
        className="w-full bg-white text-black py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-all duration-500 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {t('BookingForm.bookNow')}
      </button>

      {bookingStatus && (
        <div className="text-center space-y-2 mt-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white animate-pulse font-semibold">
            {bookingStatus}
          </p>
          {bookingStatus !== t('lockingIn') && (
            <p className="text-[10px] text-gray-500 tracking-wider">
              {t('BookingForm.seeYouSoon', { name: formData.name.split(" ")[0] })}
            </p>
          )}
        </div>
      )}
    </motion.form>
  );
}

// ═══════ MAIN LANDING PAGE ═══════
export default function LandingPage() {
  const t = useTranslations('LandingPage');
  const [bookingStatus, setBookingStatus] = useState("");
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
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
    { _id: "1", name: t('services.1.name'), description: t('services.1.description'), price: 45, category: t('services.1.category') },
    { _id: "2", name: t('services.2.name'), description: t('services.2.description'), price: 40, category: t('services.2.category') },
    { _id: "3", name: t('services.3.name'), description: t('services.3.description'), price: 55, category: t('services.3.category') },
    { _id: "4", name: t('services.4.name'), description: t('services.4.description'), price: 85, category: t('services.4.category') },
    { _id: "5", name: t('services.5.name'), description: t('services.5.description'), price: 120, category: t('services.5.category') },
    { _id: "6", name: t('services.6.name'), description: t('services.6.description'), price: 25, category: t('services.6.category') },
  ];

  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const progressSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName = services.find((s) => s._id === formData.serviceId)?.name || "Service";
    setBookingStatus(t('lockingIn'));
    setTimeout(() => {
      setBookingStatus(t('confirmed', { serviceName, barberName: formData.barberName }));
    }, 1500);
  };

  // Gallery images
  const galleryImages = [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1589710751893-f93976860000?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1593702275677-f916738521c7?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <div ref={targetRef} className="relative min-h-screen bg-black text-white">
      {/* ═══════ SCROLL PROGRESS BAR ═══════ */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[100] origin-left"
        style={{ scaleX: progressSpring }}
      />

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale brightness-[0.4] contrast-125"
            poster="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=2074"
          >
            <source
              src="https://player.vimeo.com/external/498267078.sd.mp4?s=d072836ff79a1fec90091dfadbd761c5ddde20d8&profile_id=164&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </video>
        </motion.div>

        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[15vw] md:text-[12vw] font-bold tracking-[0.1em] leading-none">
              <TextScramble text={t('heroTitle')} className="inline-block" delay={300} speed={40} />
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="space-y-6"
          >
            <p className="text-gray-400 text-sm md:text-base tracking-[0.3em] uppercase font-light">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#book"
                className="group relative inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all duration-500 hover:bg-gray-200 active:scale-95"
              >
                <span className="relative z-10">{t('bookNow')}</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#services"
                className="px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-500"
              >
                {t('ourCuts')}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <ArrowDown className="w-4 h-4 text-white/40" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600">{t('scroll')}</span>
        </motion.div>
      </section>

      {/* ═══════ MARQUEE STRIP ═══════ */}
      <section className="py-6 border-y border-white/5 bg-black">
        <MarqueeStrip
          text={t('marqueeFadesCuts')}
          speed={20}
          className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/20"
        />
      </section>

      {/* ═══════ ABOUT SECTION ═══════ */}
      <section id="about" className="py-32 md:py-40 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold block">
                {t('aboutSubtitle')}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold leading-[0.95]">
                {t('aboutTitle1')}
                <br />
                <span className="text-gray-500">{t('aboutTitle2')}</span>
                <br />
                {t('aboutTitle3')}
              </h2>
            </div>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-lg">
              {t('aboutText')}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-2 border-l-2 border-white/20 pl-5">
                <span className="text-2xl font-bold">5+</span>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold">
                  {t('expertBarbers')}
                </p>
              </div>
              <div className="space-y-2 border-l-2 border-white/20 pl-5">
                <span className="text-2xl font-bold">2K+</span>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold">
                  {t('happyClients')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] overflow-hidden border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200"
              alt="Barber at work"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">{t('est2012')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SERVICES SECTION ═══════ */}
      <section id="services" className="py-32 md:py-40 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold block">
                {t('servicesSubtitle')}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold leading-[0.95]">
                {t('servicesTitle')}
              </h2>
            </div>
            <p className="text-gray-500 text-sm font-light leading-relaxed max-w-sm">
              {t('servicesText')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className="group relative border border-white/5 hover:border-white/20 p-8 transition-all duration-500 cursor-pointer hover:bg-white/[0.02]"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold px-3 py-1 border border-white/10 group-hover:border-white/30 transition-colors">
                    {service.category}
                  </span>
                  <span className="text-3xl font-bold text-white">${service.price}</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide mb-3 group-hover:tracking-wider transition-all duration-500">
                  {service.name}
                </h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold group-hover:text-white">
                  <span>{t('bookThis')}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ REVERSE MARQUEE ═══════ */}
      <section className="py-6 border-y border-white/5 bg-black">
        <MarqueeStrip
          text={t('marqueeBlended')}
          speed={30}
          reverse
          className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/10"
        />
      </section>

      {/* ═══════ GALLERY / LOOKBOOK ═══════ */}
      <section id="gallery" className="py-32 md:py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold block">
                {t('gallerySubtitle')}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold leading-[0.95]">
                {t('galleryTitle')}
              </h2>
            </div>
            <p className="text-gray-500 text-sm font-light leading-relaxed max-w-sm">
              {t('galleryText')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08, duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden group cursor-pointer ${idx === 0 || idx === 5 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                  }`}
              >
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold bg-black/60 backdrop-blur-sm px-3 py-1">
                    {t('view')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ STATS SECTION ═══════ */}
      <section className="py-24 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: 12, suffix: "+", label: t('statsYearsRunning') },
              { value: 2000, suffix: "+", label: t('statsHappyClients') },
              { value: 5, suffix: "", label: t('statsStarBarbers') },
              { value: 98, suffix: "%", label: t('statsComeBackRate') },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center space-y-3"
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-bold block"
                  duration={2}
                />
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ BOOKING SECTION ═══════ */}
      <section id="book" className="relative py-32 md:py-40 overflow-hidden">
        {/* BG */}
        <motion.div
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=2000')",
          }}
        >
          <div className="absolute inset-0 bg-black/90 z-10" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-20 items-center relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold block">
                {t('bookSubtitle')}
              </span>
              <h2 className="text-4xl md:text-7xl font-bold leading-[0.95]">
                {t('bookTitle1')}
                <br />
                <span className="text-gray-500">{t('bookTitle2')}</span>
              </h2>
            </div>
            <p className="text-gray-400 font-light tracking-wide text-sm leading-relaxed max-w-md">
              {t('bookText')}
            </p>
          </motion.div>

          <Suspense
            fallback={
              <div className="glass-card p-12 md:p-16 h-96 animate-pulse bg-white/5" />
            }
          >
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

      {/* ═══════ CTA SECTION ═══════ */}
      <section className="py-32 md:py-40 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-4xl md:text-7xl font-bold leading-[0.95]">
            {t('ctaTitle1')}
            <br />
            <span className="text-gray-500">{t('ctaTitle2')}</span>
          </h2>
          <p className="text-gray-500 text-base font-light max-w-lg mx-auto leading-relaxed">
            {t('ctaText')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#book"
              className="group inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-200 transition-all duration-500 active:scale-95"
            >
              {t('bookNow')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-500"
            >
              {t('viewMenu')}
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
