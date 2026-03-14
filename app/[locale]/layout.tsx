import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../globals.css";
import CustomCursor from "../../components/CustomCursor";
import Navbar from "../../components/Navbar";
import NoiseOverlay from "../../components/NoiseOverlay";
import MobileBottomNav from "../../components/MobileBottomNav";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BLNDED | Cuts. Fades. Culture.",
  description: "Not your average barbershop. Premium cuts for the new generation.",
};

import { ClerkProvider } from "@clerk/nextjs";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <ClerkProvider
      signInUrl={`/${locale}/login`}
      signUpUrl={`/${locale}/register`}
    >
      <html lang={locale} className="dark">
        <body
          className={`${spaceGrotesk.variable} font-sans antialiased bg-black text-white cursor-none pb-20 md:pb-0`}
        >
          <NextIntlClientProvider messages={messages}>
            <NoiseOverlay />
            <CustomCursor />
            <Navbar />
            {children}
            <MobileBottomNav />
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
