/**
 * Intelligent helper to resolve high-resolution product photography
 * based on product name keywords, with graceful fallback.
 */

export const PRODUCE_IMAGE_MAP = [
  {
    keywords: ['tomato', 'tamatar'],
    image: '/assets/produce-tomato.jpg',
    tag: 'Vegetables',
  },
  {
    keywords: ['potato', 'aloo', 'batata'],
    image: '/assets/produce-potato.jpg',
    tag: 'Tubers',
  },
  {
    keywords: ['onion', 'pyaz', 'kanda'],
    image: '/assets/produce-onion.jpg',
    tag: 'Vegetables',
  },
  {
    keywords: ['rice', 'chawal', 'paddy', 'wheat', 'grain', 'gehu', 'dal'],
    image: '/assets/produce-rice.jpg',
    tag: 'Grains & Cereals',
  },
  {
    keywords: ['spinach', 'palak', 'methi', 'coriander', 'dhaniya', 'lettuce', 'greens', 'cabbage', 'broccoli', 'kale'],
    image: '/assets/produce-greens.jpg',
    tag: 'Leafy Greens',
  },
];

export const DEFAULT_PRODUCE_IMAGE = '/assets/produce-general.jpg';

export function getProduceImage(name = '') {
  const lower = name.toLowerCase().trim();
  for (const item of PRODUCE_IMAGE_MAP) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.image;
    }
  }
  return DEFAULT_PRODUCE_IMAGE;
}

export function getProduceTag(name = '') {
  const lower = name.toLowerCase().trim();
  for (const item of PRODUCE_IMAGE_MAP) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.tag;
    }
  }
  return 'Farm Produce';
}

export function handleImageError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = DEFAULT_PRODUCE_IMAGE;
}
