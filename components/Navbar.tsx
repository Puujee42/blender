"use client";

import Link from "next/link";
import { Menu, X, Scissors } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-700 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            < Scissors className="w-5 h-5 text-white group-hover:text-gold transition-colors duration-500 rotate-45" />
          </div>
          <span className="font-serif text-2xl tracking-[0.3em] uppercase group-hover:text-gold transition-all duration-500">
            Blended
          </span>
        </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {['Services', 'Barbers', 'Products', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Barbers' || item === 'Products' || item === 'About' ? `/${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-gold transition-colors text-[11px] uppercase tracking-luxury font-light"
              >
                {item}
              </Link>
            ))}

            <div className="h-4 w-px bg-white/10 ml-2"></div>

            {!isSignedIn ? (
              <div className="flex items-center space-x-8 pl-8">
                <Link href="/login" className="text-gray-400 hover:text-white transition-colors text-[11px] uppercase tracking-luxury font-light">Log In</Link>
                <Link href="/register" className="relative group">
                  <div className="absolute -inset-0.5 bg-gold/20 blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <span className="relative border border-white/20 text-white px-8 py-3 hover:border-gold hover:text-gold transition-all duration-500 text-[11px] uppercase tracking-luxury font-bold bg-black/40 backdrop-blur-sm">
                    Sign Up
                  </span>
                </Link>
              </div>
            ) : (
              <div className="pl-8 flex items-center">
                <UserButton appearance={{
                  elements: {
                    userButtonAvatarBox: "border border-gold/50 w-9 h-9 p-[1px] hover:border-gold transition-colors duration-300"
                  }
                }} />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none hover:text-gold transition-colors"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-black/98 backdrop-blur-2xl transition-all duration-700 ease-in-out z-[-1] overflow-hidden flex flex-col justify-center items-center ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center space-y-10">
          {['Services', 'Barbers', 'Products', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href={item === 'Barbers' || item === 'Products' || item === 'About' ? `/${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-serif uppercase tracking-luxury text-gray-400 hover:text-gold transition-colors"
            >
              {item}
            </Link>
          ))}

          <div className="w-12 h-px bg-gold/30"></div>

          {!isSignedIn ? (
            <div className="flex flex-col items-center space-y-8 w-full px-12">
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-sm uppercase tracking-luxury font-light text-white hover:text-gold transition-colors">Log In</Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center border border-gold/50 text-gold px-12 py-5 hover:bg-gold hover:text-black transition-all duration-500 text-sm uppercase tracking-luxury font-bold">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "border-2 border-gold w-16 h-16" } }} />
              <span className="text-xs uppercase tracking-luxury text-gold font-light">My Account</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}