

// Fix: Add 'as const' to infer literal types for keys, resolving a type mismatch with the translation function.
export const NAV_LINKS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'aboutUs' },
  { href: '/gallery', key: 'gallery' },
  { href: '/contact', key: 'contactUs' },
  { href: '/donate', key: 'donateUs' },
] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];

export const SERVICE_CARDS = [
  {
    title: 'Annadaan',
    description: 'Contribute to our daily food distribution program, providing sanctified meals to all devotees and visitors.',
    icon: '🍚',
  },
  {
    title: 'Gau Seva',
    description: 'Support the care and protection of our sacred cows at the temple Goshala, an act of great spiritual merit.',
    icon: '🐄',
  },
  {
    title: 'Spiritual Education',
    description: 'Help us organize classes, seminars, and distribute spiritual literature to spread timeless Vedic wisdom.',
    icon: '📖',
  },
];

export const GALLERY_IMAGES = [
  { src: '/assets/images/gallery-1.jpg', alt: 'Main temple shrine' },
  { src: '/assets/images/gallery-2.jpg', alt: 'Evening aarti ceremony' },
  { src: '/assets/images/gallery-3.jpg', alt: 'Devotees participating in a festival' },
  { src: '/assets/images/gallery-4.jpg', alt: 'Temple Goshala with sacred cows' },
  { src: '/assets/images/gallery-5.jpg', alt: 'Beautifully decorated temple deity' },
  { src: '/assets/images/gallery-6.jpg', alt: 'Annadaan seva in progress' },
  { src: '/assets/images/gallery-7.jpg', alt: 'A spiritual discourse session' },
  { src: '/assets/images/gallery-8.jpg', alt: 'Panoramic view of the temple complex' },
];