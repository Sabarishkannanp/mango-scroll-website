export interface StorySection {
  eyebrow: string;
  title: string;
  description: string;
  align: 'left' | 'right' | 'center';
}

export interface ProductStat {
  value: string;
  label: string;
}

export interface DetailsSection {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
}

export interface FreshnessSection {
  eyebrow: string;
  title: string;
  description: string;
  badges: string[];
}

export interface BuyNowSection {
  headline: string;
  subline: string;
  processingTags: string[];
  deliveryPromise: string;
  returnPolicy: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: string;
  description: string;
  folderPath: string;
  themeColor: string;
  gradient: string;
  features: string[];
  stats: ProductStat[];
  storySections: StorySection[];
  detailsSection: DetailsSection;
  freshnessSection: FreshnessSection;
  buyNowSection: BuyNowSection;
}

export const products: Product[] = [
  {
    id: 'mango',
    name: 'Primo mango',
    tagline: 'Smooth. Bold. Explosive.',
    price: '₹130',
    description:
      'A velvet-smooth mango shake built from sun-ripened fruit, cold-crafted dairy and a bright, unapologetic finish.',
    folderPath: '/images/prime',
    themeColor: '#C62828',
    gradient: 'linear-gradient(135deg, #8B0000 0%, #C62828 100%)',
    features: ['Real mango pulp', 'Cold-crafted', 'No artificial aftertaste', 'Small-batch quality'],
    stats: [
      { value: '24h', label: 'farm-to-chill processing' },
      { value: '330ml', label: 'pure indulgence' },
      { value: '0%', label: 'ordinary energy' },
    ],
    storySections: [
      {
        eyebrow: 'Primo presents',
        title: 'The calm before the flavour.',
        description: 'Scroll slowly. A tropical force is about to break through the dark.',
        align: 'center',
      },
      {
        eyebrow: 'Sun-ripened intensity',
        title: 'Mango, pushed past ordinary.',
        description: 'Dense fruit character. Silk-smooth body. A finish that lands with cinematic weight.',
        align: 'left',
      },
      {
        eyebrow: 'Texture in motion',
        title: 'Creamy power. Zero hesitation.',
        description: 'Every pour is engineered to feel lush, bright and unapologetically premium.',
        align: 'right',
      },
      {
        eyebrow: 'Ready when you are',
        title: 'Unleash the explosion.',
        description: 'Primo Mango turns a familiar flavour into a full-sensory event.',
        align: 'center',
      },
    ],
    detailsSection: {
      eyebrow: 'Inside the bottle',
      title: 'Built like a luxury beverage. Tastes like peak summer.',
      description:
        'Primo balances deep mango pulp, clean dairy richness and a controlled sweetness profile. The result is bold enough for a campaign frame and smooth enough for the final sip.',
      bullets: ['Full-bodied mango aroma', 'Velvet texture without heaviness', 'Bright golden finish', 'Designed to serve ice-cold'],
    },
    freshnessSection: {
      eyebrow: 'Cold-chain freshness',
      title: 'Captured at the point of ripeness.',
      description:
        'Fruit is selected for colour, aroma and natural density, then processed in a tightly controlled cold environment to protect its vivid flavour.',
      badges: ['Quality checked', 'Cold stored', 'Freshly sealed'],
    },
    buyNowSection: {
      headline: 'Your next flavour obsession is chilled and ready.',
      subline: 'One bottle. Maximum mango impact.',
      processingTags: ['Secure checkout', 'Freshly packed', 'Cold dispatch'],
      deliveryPromise: 'Dispatch in 24 hours across supported cities.',
      returnPolicy: 'Quality promise: damaged or compromised packs are replaced.',
    },
  },
];
