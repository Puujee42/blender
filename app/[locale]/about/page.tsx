"use client";

import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import { Scissors, ShieldCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  const philosophy = [
    {
      title: t("philosophy.precisionTitle"),
      icon: <Scissors className="w-7 h-7" />,
      description: t("philosophy.precisionDesc"),
    },
    {
      title: t("philosophy.cultureTitle"),
      icon: <Zap className="w-7 h-7" />,
      description: t("philosophy.cultureDesc"),
    },
    {
      title: t("philosophy.integrityTitle"),
      icon: <ShieldCheck className="w-7 h-7" />,
      description: t("philosophy.integrityDesc"),
    },
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1589710751893-f93976860000?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1473188588955-6623e55c79bc?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200",
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10" />
          <img
            src="https://images.unsplash.com/photo-1512690196236-8c8d2d53bfce?auto=format&fit=crop&q=80&w=2000"
            alt="The Story"
            className="w-full h-full object-cover grayscale brightness-[0.35]"
          />
        </div>
        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold block">
              {t("since")}
            </span>
            <h1 className="text-6xl md:text-9xl font-bold tracking-[0.05em] leading-none">
              {t("heroTitle1")}
              <br />
              <span className="text-gray-500">{t("heroTitle2")}</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-32 md:py-40 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold leading-[0.95]">
              {t("builtFor1")}
              <br />
              <span className="text-gray-500">{t("builtFor2")}</span>
              <br />
              {t("builtFor3")}
            </h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-base">
              <p>
                {t("story1")}
              </p>
              <p>
                {t("story2")}
              </p>
              <p>
                {t("story3")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="relative border border-white/10 overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1593702275677-f916738521c7?auto=format&fit=crop&q=80&w=1200"
              alt="Barber working"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 md:py-40 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-3"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold block">
              {t("drivesUs")}
            </span>
            <h2 className="text-4xl md:text-7xl font-bold">{t("theCode")}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {philosophy.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 border border-white/5 p-8 hover:border-white/20 transition-colors duration-500"
              >
                <div className="text-white">{item.icon}</div>
                <h3 className="text-2xl font-bold uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-32 md:py-40 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold block">
                {t("space")}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold">{t("theShop")}</h2>
            </div>
            <p className="text-gray-500 text-sm font-light max-w-xs leading-relaxed">
              {t("shopDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {gallery.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden aspect-[3/4] group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Shop ${idx + 1}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
