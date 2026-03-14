"use client";

import { Home, Users, ShoppingBag, Calendar, User, LayoutDashboard } from "lucide-react";
import { Link, usePathname } from "../i18n/routing";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function MobileBottomNav() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const tabs = [
    { label: t('home'), href: "/", icon: Home },
    { label: t('barbers'), href: "/barbers", icon: Users },
    { label: t('products'), href: "/products", icon: ShoppingBag },
    { label: t('book'), href: "/#book", icon: Calendar },
    {
      label: isSignedIn ? t('dashboard') : t('logIn'),
      href: isSignedIn ? "/dashboard" : "/login",
      icon: isSignedIn ? LayoutDashboard : User
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-t border-white/5 pb-safe pt-2">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
          const Icon = tab.icon;

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-1 w-full relative h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-2 w-10 h-0.5 bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              />
              <span
                className={`text-[8px] uppercase tracking-[0.15em] font-bold transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-600"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
