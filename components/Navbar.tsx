'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/10 bg-black/55 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Primary navigation">
        <a href="#top" className="group flex items-center gap-3" aria-label="Primo home">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.055] shadow-glow backdrop-blur-md transition group-hover:scale-105 group-hover:border-orange-300/50">
            <svg viewBox="0 0 44 44" className="h-6 w-6" fill="none" aria-hidden="true">
              <path d="M25 3 9 24h11l-2 17 17-24H24l1-14Z" fill="url(#bolt)" />
              <defs>
                <linearGradient id="bolt" x1="7" y1="7" x2="36" y2="38" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F33B3B" />
                  <stop offset=".55" stopColor="#FF8A27" />
                  <stop offset="1" stopColor="#FFD15C" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300 bg-clip-text text-xl font-black uppercase tracking-[0.23em] text-transparent sm:text-2xl">
            Primo
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
          <a className="transition hover:text-white" href="#story">Story</a>
          <a className="transition hover:text-white" href="#freshness">Freshness</a>
          <a className="transition hover:text-white" href="#buy">Shop</a>
        </div>

        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          href="#buy"
          className="rounded-full border border-orange-200/25 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_34px_rgba(255,111,34,.28)] transition hover:shadow-[0_0_55px_rgba(255,153,48,.5)] sm:px-6"
        >
          Order Now
        </motion.a>
      </nav>
    </header>
  );
}
