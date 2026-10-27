'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

const links = {
  Shop: ['Mango Shake', 'Gift Packs', 'Subscriptions'],
  Support: ['Contact', 'Shipping', 'Returns', 'FAQ'],
};

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
    event.currentTarget.reset();
  };

  return (
    <footer className="border-t border-white/10 bg-gray-950 px-6 pb-8 pt-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300 bg-clip-text text-2xl font-black uppercase tracking-[0.22em] text-transparent">Primo</div>
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/45">
            Cinematic flavour, cold-crafted for people who refuse ordinary refreshment.
          </p>
        </div>

        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/85">{title}</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/45">
              {items.map((item) => (
                <li key={item}>
                  <a href="#buy" className="transition hover:translate-x-1 hover:text-orange-300 inline-block">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/85">Newsletter</h3>
          <p className="mt-5 text-sm leading-6 text-white/45">Drops, tasting notes and fresh-stock alerts.</p>
          <form onSubmit={submit} className="mt-5 flex overflow-hidden rounded-full border border-white/10 bg-white/[0.04] p-1">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              required
              type="email"
              placeholder="Email address"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/25"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-orange-200"
            >
              Join
            </motion.button>
          </form>
          {subscribed && <p className="mt-3 text-xs text-orange-300">You&apos;re on the Primo list.</p>}
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Primo Beverages. All rights reserved.</p>
        <p>Best served ice cold.</p>
      </div>
    </footer>
  );
}
