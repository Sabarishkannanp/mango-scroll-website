import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Primo Strawberry | Unleash the Explosion',
  description: 'Cinematic premium strawberry beverage experience.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${outfit.variable}`}>
      <body className="font-outfit bg-black text-white overflow-x-hidden">{children}</body>
    </html>
  );
}
