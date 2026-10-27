'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import type { StorySection } from '@/data/products';

interface ProductTextOverlaysProps {
  scrollYProgress: MotionValue<number>;
  sections: StorySection[];
}

const intervals: [number, number, number, number][] = [
  [0.02, 0.10, 0.20, 0.27],
  [0.23, 0.31, 0.42, 0.49],
  [0.47, 0.57, 0.68, 0.75],
  [0.73, 0.82, 0.93, 0.99],
];

function StoryOverlay({
  scrollYProgress,
  section,
  interval,
}: {
  scrollYProgress: MotionValue<number>;
  section: StorySection;
  interval: [number, number, number, number];
}) {
  const opacity = useTransform(scrollYProgress, interval, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, interval, [42, 0, 0, -34]);
  const scale = useTransform(scrollYProgress, interval, [0.98, 1, 1, 0.99]);

  const alignment =
    section.align === 'left'
      ? 'items-start text-left md:pl-[7vw]'
      : section.align === 'right'
        ? 'items-end text-right md:pr-[7vw]'
        : 'items-center text-center';

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, y, scale }}
      className={`pointer-events-none absolute inset-0 flex justify-center px-6 ${alignment}`}
    >
      <div className={`flex h-full w-full max-w-[1500px] flex-col justify-center ${section.align === 'center' ? 'items-center' : section.align === 'right' ? 'items-end' : 'items-start'}`}>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.38em] text-orange-200/75 sm:text-xs">
          {section.eyebrow}
        </p>
        <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.92] tracking-[-0.055em] text-white drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-[6.5rem]">
          {section.title}
        </h2>
        <p className="mt-6 max-w-xl text-balance text-sm leading-7 text-white/65 sm:text-base md:text-lg">
          {section.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProductTextOverlays({ scrollYProgress, sections }: ProductTextOverlaysProps) {
  return (
    <div className="absolute inset-0 z-20">
      {sections.slice(0, 4).map((section, index) => (
        <StoryOverlay
          key={`${section.title}-${index}`}
          scrollYProgress={scrollYProgress}
          section={section}
          interval={intervals[index]}
        />
      ))}
    </div>
  );
}
