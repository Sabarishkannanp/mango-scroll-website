'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import type { Product } from '@/data/products';
import ProductTextOverlays from './ProductTextOverlays';

const FRAME_COUNT = 120;

interface ProductBottleScrollProps {
  product: Product;
}

function drawContainedImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  let drawWidth = width;
  let drawHeight = height;
  let x = 0;
  let y = 0;

  if (canvasRatio > imageRatio) {
    drawHeight = height;
    drawWidth = height * imageRatio;
    x = (width - drawWidth) / 2;
  } else {
    drawWidth = width;
    drawHeight = width / imageRatio;
    y = (height - drawHeight) / 2;
  }

  context.clearRect(0, 0, width, height);
  context.drawImage(image, x, y, drawWidth, drawHeight);
}

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const canvasOpacity = useTransform(scrollYProgress, [0, 0.035, 0.96, 1], [0, 1, 1, 0.2]);
  const haloScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.15, 1.42]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.3, 0.75, 0.2]);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[frameIndex];
    if (!canvas || !image || !image.complete || !image.naturalWidth) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    drawContainedImage(context, image, canvas.width, canvas.height);
  }, []);

  const queueFrame = useCallback((frameIndex: number) => {
    currentFrameRef.current = frameIndex;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
  }, [drawFrame]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextFrame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest * (FRAME_COUNT - 1))));
    if (nextFrame !== currentFrameRef.current) queueFrame(nextFrame);
  });

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];

    for (let index = 1; index <= FRAME_COUNT; index += 1) {
      const image = new Image();
      image.decoding = 'async';
      image.src = `${product.folderPath}/${index}.webp`;
      image.onload = () => {
        if (cancelled) return;
        setLoadedCount((count) => count + 1);
        if (index === 1) queueFrame(0);
      };
      images.push(image);
    }

    imagesRef.current = images;
    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      imagesRef.current = [];
    };
  }, [product.folderPath, queueFrame]);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      queueFrame(currentFrameRef.current);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [queueFrame]);

  return (
    <section ref={wrapperRef} className="relative h-[500vh] bg-black" aria-label={`${product.name} cinematic story`}>
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(255,144,39,.16),transparent_28%),radial-gradient(circle_at_50%_50%,rgba(157,5,20,.42),transparent_62%),linear-gradient(180deg,#020101_0%,#160307_54%,#000_100%)]" />
        <div className="luxury-grid absolute inset-0 opacity-40" />
        <motion.div
          style={{ scale: haloScale, opacity: haloOpacity }}
          className="absolute left-1/2 top-1/2 h-[44vw] min-h-[360px] w-[44vw] min-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,153,42,.3)_0%,rgba(198,40,40,.13)_42%,transparent_70%)] blur-2xl"
        />

        <motion.canvas
          ref={canvasRef}
          style={{ opacity: canvasOpacity }}
          className="absolute inset-0 z-10 h-full w-full"
          aria-label="Scroll-controlled mango bottle animation"
          role="img"
        />

        {loadedCount < FRAME_COUNT && (
          <div className="absolute bottom-8 left-1/2 z-30 w-48 -translate-x-1/2 text-center">
            <div className="h-[2px] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 transition-[width] duration-300"
                style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
              />
            </div>
            <span className="mt-3 block text-[10px] uppercase tracking-[0.28em] text-white/35">
              Loading experience {Math.round((loadedCount / FRAME_COUNT) * 100)}%
            </span>
          </div>
        )}

        <ProductTextOverlays scrollYProgress={scrollYProgress} sections={product.storySections} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-black/55 to-transparent" />
      </div>
    </section>
  );
}
