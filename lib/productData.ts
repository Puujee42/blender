// ═══════ PRODUCT DATA ═══════
// Central source of truth for all product info.

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  details: string;
  rating: number;
  reviews: number;
  ingredients: string[];
  howToUse: string;
  size: string;
  inStock: boolean;
  stockCount: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "matte-clay",
    name: "Matte Clay",
    category: "Styling",
    price: 35,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    description: "Strong hold, matte finish. Built for textured crops and messy styles.",
    details: "Our signature matte clay delivers a strong, reworkable hold with zero shine. Perfect for textured crops, messy quiffs, and any style that needs structure without looking like you tried too hard. Water-based formula washes out clean.",
    rating: 4.8,
    reviews: 127,
    ingredients: ["Beeswax", "Kaolin Clay", "Coconut Oil", "Vitamin E", "Shea Butter"],
    howToUse: "Work a small amount between palms until warm. Apply to towel-dried or dry hair. Shape and style as desired. Rework throughout the day.",
    size: "75ml / 2.5oz",
    inStock: true,
    stockCount: 15,
  },
  {
    id: "sea-salt-spray",
    name: "Sea Salt Spray",
    category: "Texture",
    price: 28,
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800",
    description: "Adds volume and that effortless beach texture. Daily driver.",
    details: "Get that lived-in, just-off-the-beach texture without the sand. This lightweight spray adds natural volume and grip. Works as a pre-styler or on its own for that effortless messy look. Your new daily driver.",
    rating: 4.7,
    reviews: 94,
    ingredients: ["Sea Salt", "Aloe Vera", "Magnesium Sulfate", "Green Tea Extract", "Argan Oil"],
    howToUse: "Shake well. Spray evenly onto damp or dry hair. Scrunch and let air-dry for natural texture, or blow-dry for more volume.",
    size: "200ml / 6.7oz",
    inStock: true,
    stockCount: 8,
  },
  {
    id: "beard-oil",
    name: "Beard Oil",
    category: "Grooming",
    price: 42,
    image: "https://images.unsplash.com/photo-1621607512281-9954cc9231dd?auto=format&fit=crop&q=80&w=800",
    description: "Cold-pressed oils that keep your beard soft and the skin underneath healthy.",
    details: "A premium blend of cold-pressed oils that hydrate your beard and the skin underneath. Reduces itch, tames flyaways, and leaves a subtle sandalwood scent that's not overpowering. A few drops go a long way.",
    rating: 4.9,
    reviews: 156,
    ingredients: ["Jojoba Oil", "Argan Oil", "Sandalwood Essential Oil", "Vitamin E", "Grapeseed Oil"],
    howToUse: "Apply 3-5 drops to palms. Massage into beard from roots to tips. Use daily after showering for best results. Pairs well with a beard comb.",
    size: "30ml / 1oz",
    inStock: true,
    stockCount: 20,
  },
  {
    id: "high-shine-pomade",
    name: "High-Shine Pomade",
    category: "Classic",
    price: 35,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800",
    description: "Clean shine, medium hold. For that slicked-back look that never goes out of style.",
    details: "For the gentlemen who appreciate a clean, polished look. This water-based pomade delivers medium hold with a high-shine finish. Perfect for slick-backs, side parts, and classic pompadours. Washes out easy, no buildup.",
    rating: 4.6,
    reviews: 83,
    ingredients: ["PVP", "Castor Oil", "Glycerin", "Panthenol", "Fragrance"],
    howToUse: "Scoop a dime-sized amount. Distribute evenly through damp hair. Comb into desired style. Reactivates with water for restyling.",
    size: "100ml / 3.4oz",
    inStock: true,
    stockCount: 5,
  },
  {
    id: "mint-shampoo",
    name: "Mint Shampoo",
    category: "Care",
    price: 32,
    image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&q=80&w=800",
    description: "Deep clean with a cooling mint hit. Strips buildup without stripping moisture.",
    details: "A daily shampoo that actually does what it's supposed to. Removes product buildup and excess oil while the peppermint gives your scalp a cooling wake-up call. Sulfate-free so it won't dry you out.",
    rating: 4.7,
    reviews: 112,
    ingredients: ["Peppermint Oil", "Tea Tree Oil", "Biotin", "Keratin", "Aloe Vera"],
    howToUse: "Wet hair thoroughly. Apply a small amount and massage into scalp. Let sit for 1-2 minutes. Rinse and follow with conditioner if needed.",
    size: "250ml / 8.5oz",
    inStock: true,
    stockCount: 12,
  },
  {
    id: "recovery-balm",
    name: "Recovery Balm",
    category: "Care",
    price: 32,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800",
    description: "Post-cut skin repair. Calms irritation and locks in moisture.",
    details: "The aftercare your skin deserves. This lightweight balm calms razor burn, reduces redness, and locks in moisture after a fresh cut. Non-greasy formula absorbs fast. Your face will thank you.",
    rating: 4.5,
    reviews: 67,
    ingredients: ["Aloe Vera", "Witch Hazel", "Chamomile Extract", "Shea Butter", "Hyaluronic Acid"],
    howToUse: "Apply a thin layer to freshly shaved or irritated skin. Gently pat in — don't rub. Use morning and night for best results.",
    size: "50ml / 1.7oz",
    inStock: false,
    stockCount: 0,
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getCategories(): string[] {
  return [...new Set(PRODUCTS.map((p) => p.category))];
}
