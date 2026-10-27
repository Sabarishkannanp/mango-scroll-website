'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import { products } from '@/data/products';

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartAdded, setCartAdded] = useState(false);
  const product = products[currentIndex];
  const { scrollYProgress } = useScroll();
  const freshnessY = useTransform(scrollYProgress, [0.58, 0.84], [80, -80]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.setProperty('--product-gradient', product.gradient);
    setCartAdded(false);
  }, [currentIndex, product.gradient]);

  const selectProduct = (index: number) => {
    if (index === currentIndex) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentIndex(index);
  };

  return (
    <main id="top" className="relative min-h-screen bg-black text-white">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="fixed inset-0 -z-10 transition-all duration-1000" style={{ background: product.gradient }} />

          <ProductBottleScroll product={product} />

          <section id="story" className="noise relative overflow-hidden bg-black px-6 py-28 sm:px-8 md:py-40 lg:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(196,45,25,.22),transparent_31%)]" />
            <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-300/70">{product.detailsSection.eyebrow}</p>
                <h2 className="mt-5 max-w-3xl text-balance text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-7xl">
                  {product.detailsSection.title}
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">{product.detailsSection.description}</p>
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {product.detailsSection.bullets.map((bullet, index) => (
                    <motion.div
                      key={bullet}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-center gap-3 border-b border-white/10 py-4 text-sm text-white/70"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_16px_rgba(251,146,60,.8)]" />
                      {bullet}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1 }}
                className="relative mx-auto aspect-[4/5] w-full max-w-[540px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#100304] shadow-glow-strong"
              >
                <Image src={`${product.folderPath}/92.webp`} alt={`${product.name} cinematic detail`} fill sizes="(max-width: 1024px) 90vw, 540px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute inset-x-7 bottom-7 grid grid-cols-3 gap-2">
                  {product.stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                      <div className="text-xl font-black text-orange-200">{stat.value}</div>
                      <div className="mt-1 text-[10px] leading-4 text-white/45">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section id="freshness" className="relative min-h-[95vh] overflow-hidden bg-[#070202] px-6 py-28 sm:px-8 md:py-40 lg:px-12">
            <motion.div style={{ y: freshnessY }} className="absolute -right-32 top-12 h-[600px] w-[600px] rounded-full bg-red-700/20 blur-[130px]" />
            <motion.div style={{ y: freshnessY }} className="absolute -left-36 bottom-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]" />
            <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-2">
              <motion.div
                style={{ y: freshnessY }}
                className="relative order-2 mx-auto w-full max-w-[620px] lg:order-1"
              >
                <div className="absolute inset-12 rounded-full bg-orange-400/20 blur-[90px]" />
                <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-glow">
                  <Image src={`${product.folderPath}/45.webp`} alt="Mango freshness and splash" fill sizes="(max-width: 1024px) 90vw, 620px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-orange-300/5" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9 }}
                className="order-1 lg:order-2"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-300/70">{product.freshnessSection.eyebrow}</p>
                <h2 className="mt-5 text-balance text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-7xl">{product.freshnessSection.title}</h2>
                <p className="mt-7 max-w-xl text-base leading-8 text-white/55 sm:text-lg">{product.freshnessSection.description}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  {product.freshnessSection.badges.map((badge) => (
                    <span key={badge} className="rounded-full border border-orange-300/20 bg-orange-300/[0.06] px-5 py-3 text-xs font-semibold uppercase tracking-[0.17em] text-orange-100/80">{badge}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section id="buy" className="relative overflow-hidden bg-black px-6 py-28 sm:px-8 md:py-40 lg:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(198,40,40,.3),transparent_46%)]" />
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85 }}
              className="relative mx-auto grid max-w-[1250px] gap-12 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl sm:p-12 lg:grid-cols-[.9fr_1.1fr] lg:p-16"
            >
              <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_50%_45%,rgba(255,143,37,.24),transparent_36%),#090202]">
                <Image src={`${product.folderPath}/118.webp`} alt={product.name} fill sizes="(max-width: 1024px) 90vw, 520px" className="object-contain" />
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-300/70">Buy Primo</p>
                <h2 className="mt-4 text-balance text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-6xl">{product.buyNowSection.headline}</h2>
                <p className="mt-5 text-lg text-white/55">{product.buyNowSection.subline}</p>
                <div className="mt-8 flex items-end justify-between border-y border-white/10 py-6">
                  <div>
                    <p className="text-xs uppercase tracking-[.2em] text-white/35">330 ml bottle</p>
                    <p className="mt-1 text-4xl font-black">{product.price}</p>
                  </div>
                  <div className="text-right text-xs leading-6 text-white/40">Taxes included<br />Served chilled</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCartAdded(true)}
                  className="mt-7 w-full rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 px-7 py-5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_0_45px_rgba(255,107,35,.26)] transition hover:shadow-[0_0_65px_rgba(255,145,43,.48)]"
                >
                  {cartAdded ? 'Added to cart ✓' : 'Add to Cart'}
                </motion.button>
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.buyNowSection.processingTags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[.16em] text-white/45">{tag}</span>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-6 text-white/38">{product.buyNowSection.deliveryPromise}<br />{product.buyNowSection.returnPolicy}</p>
              </div>
            </motion.div>
          </section>

          <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-8 md:py-40 lg:px-12">
            <div className="absolute -left-[10%] top-[13%] h-[75%] w-[120%] -rotate-3 bg-[linear-gradient(110deg,#600713_0%,#b7151f_44%,#e86118_100%)]" />
            <div className="noise relative mx-auto flex min-h-[500px] max-w-[1400px] flex-col items-center justify-center text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-100/70">One bottle. Full impact.</p>
              <h2 className="mt-6 max-w-5xl text-balance text-5xl font-black leading-[.9] tracking-[-.06em] sm:text-7xl lg:text-[8rem]">Experience the Explosion</h2>
              <motion.a
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.97 }}
                href="#buy"
                className="mt-10 rounded-full border border-white/30 bg-white px-8 py-5 text-sm font-black uppercase tracking-[.2em] text-red-800 shadow-[0_0_70px_rgba(255,220,150,.35)]"
              >
                Taste Primo Now
              </motion.a>
              <div className="mt-9 flex items-center gap-2">
                {products.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => selectProduct(index)}
                    className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em] transition ${index === currentIndex ? 'bg-white text-black' : 'border border-white/20 text-white/60 hover:text-white'}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </main>
  );
}
