"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { getAllBarbers } from "../../../lib/barberData";
import { useTranslations } from "next-intl";

export default function BarbersPage() {
  const t = useTranslations("BarbersPage");
  const barbers = getAllBarbers();

  return (
    <main className="bg-black min-h-screen pt-36 px-6 text-white pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold block mb-4">
            {t("theCrew")}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6">
            {t("meet")} <span className="text-gray-500">{t("theBarbers")}</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto font-light leading-relaxed">
            {t("desc")}
          </p>
          <div className="w-12 h-px bg-white/20 mx-auto mt-8" />
        </motion.div>

        {/* Barber Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {barbers.map((barber, idx) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.8 }}
              viewport={{ once: true }}
              className="group flex flex-col"
            >
              <Link href={`/barbers/${barber.id}`} className="block">
                <div className="relative w-full aspect-[3/4] overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors duration-500 mb-6">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                  {/* Hover CTAs */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 space-y-2">
                    <span className="flex items-center justify-center gap-2 w-full bg-white text-black py-3 text-[10px] uppercase tracking-[0.2em] font-bold">
                      {t("viewProfile")}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href={`/barbers/${barber.id}`}
                className="text-center space-y-2"
              >
                <h3 className="text-xl font-bold uppercase tracking-wide group-hover:tracking-wider transition-all duration-500">
                  {barber.name}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
                  {barber.title}
                </p>
                <p className="text-[10px] text-gray-600 font-light tracking-wider">
                  {barber.specialty}
                </p>
                <div className="flex items-center justify-center gap-1 pt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-2.5 h-2.5 ${
                        i < Math.round(barber.rating)
                          ? "fill-white text-white"
                          : "fill-transparent text-gray-700"
                      }`}
                    />
                  ))}
                  <span className="text-[9px] text-gray-500 ml-1">
                    {barber.rating}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
