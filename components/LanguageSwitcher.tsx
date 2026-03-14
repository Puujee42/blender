"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'mn' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="text-[10px] uppercase tracking-[0.2em] font-bold border border-white/20 px-3 py-1.5 hover:bg-white hover:text-black transition-all"
    >
      {locale === 'en' ? 'MN' : 'EN'}
    </button>
  );
}
