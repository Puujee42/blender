"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-black border-t border-white/5 pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Big branding text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h3 className="text-[8vw] md:text-[6vw] font-bold tracking-[0.2em] uppercase text-white/[0.04] leading-none select-none">
            BLNDED
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-12 md:gap-16">
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="text-xl font-bold tracking-[0.3em] uppercase">
              BLNDED
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-light">
              {t("brandDesc")}
            </p>
            <div className="flex gap-6 pt-2">
              {["Instagram", "TikTok", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="hover-line text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors font-semibold"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white font-bold">
              {t("contactTitle")}
            </h4>
            <div className="space-y-4 text-gray-500 text-xs font-light tracking-wider leading-loose">
              <p>{t("address1")}<br />{t("address2")}</p>
              <p>+976 9911 2233</p>
              <p className="text-white hover:opacity-60 transition-opacity cursor-pointer">
                @blnded_mn
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white font-bold">
              {t("hoursTitle")}
            </h4>
            <ul className="space-y-4 text-gray-500 text-xs font-light tracking-wider">
              <li className="flex justify-between gap-4">
                <span>{t("monSat")}</span>
                <span className="text-white">10:00 – 21:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>{t("sunday")}</span>
                <span>{t("closed")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-10">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">
            &copy; {currentYear} {t("rightsReserved")}
          </p>
          <div className="flex gap-8">
            {["privacy", "terms", "cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] text-gray-600 uppercase tracking-[0.2em] hover:text-white transition-colors"
              >
                {t(item as any)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
