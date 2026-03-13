import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blended | Premium Barbershop",
  description: "Architecting silhouettes with precision and virtue.",
};

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      signInUrl="/login"
      signUpUrl="/register"
    >
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-black text-white cursor-none`}
        >
          <CustomCursor />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
