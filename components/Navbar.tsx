"use client";

import { Link } from "../i18n/routing";
import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations('Navbar');
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();

  const navLinks = [
    { label: t('barbers'), href: "/barbers" },
    { label: t('products'), href: "/products" },
    { label: t('services'), href: "/#services" },
    { label: t('gallery'), href: "/#gallery" },
    { label: t('about'), href: "/about" },
    { label: t('book'), href: "/#book" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-500 ${scrolled
        ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-2"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <span className="text-xl font-bold tracking-[0.3em] uppercase group-hover:tracking-[0.4em] transition-all duration-500">
              BLNDED
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover-line text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}

            <div className="h-4 w-px bg-white/10" />
            <LanguageSwitcher />
            {!isSignedIn ? (
              <div className="flex items-center gap-6">
                <Link
                  href="/login"
                  className="hover-line text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
                >
                  {t('logIn')}
                </Link>
                <Link
                  href="/register"
                  className="relative group"
                >
                  <span className="border border-white/20 text-white px-7 py-2.5 hover:bg-white hover:text-black transition-all duration-500 text-[11px] uppercase tracking-[0.2em] font-bold inline-block">
                    {t('join')}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="hover-line text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
                >
                  {t('dashboard')}
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "border border-white/30 w-9 h-9 hover:border-white transition-colors duration-300",
                    },
                  }}
                />
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-4 z-[60]">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
