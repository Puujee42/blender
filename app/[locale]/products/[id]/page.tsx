"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  CheckCircle,
} from "lucide-react";
import { getProductById, getAllProducts, type Product } from "../../../../lib/productData";
import Footer from "../../../../components/Footer";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const allProducts = getAllProducts();

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "ingredients" | "howto">("details");

  if (!product) {
    return (
      <main className="bg-black min-h-screen flex items-center justify-center text-white">
        <div className="text-center space-y-6">
          <Package className="w-12 h-12 text-gray-600 mx-auto" />
          <h2 className="text-3xl font-bold uppercase">
            PRODUCT <span className="text-gray-500">NOT FOUND</span>
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gray-200 transition-all"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  // Get related products (same category, exclude current)
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // If not enough related from same category, fill with others
  const otherProducts =
    related.length < 2
      ? [
          ...related,
          ...allProducts
            .filter((p) => p.id !== product.id && !related.includes(p))
            .slice(0, 3 - related.length),
        ]
      : related;

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-[0.2em] transition-colors group"
        >
          <ChevronLeft
            size={12}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Shop
        </Link>
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square overflow-hidden bg-[#050505] border border-white/5 sticky top-28">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-12 hover:scale-105 transition-transform duration-700"
              />
              {!product.inStock && (
                <div className="absolute top-6 left-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold bg-black border border-white/20 text-gray-400 px-4 py-2">
                    Sold Out
                  </span>
                </div>
              )}
              <div className="absolute bottom-6 right-6">
                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-600 font-semibold">
                  {product.size}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right — Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold uppercase leading-[0.95]">
                {product.name}
              </h1>
              <p className="text-gray-400 font-light text-base leading-relaxed">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i <= Math.round(product.rating)
                          ? "fill-white text-white"
                          : "fill-transparent text-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>
            </div>

            <div className="w-full h-px bg-white/5" />

            {/* Price + Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold">${product.price}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold pb-1">
                  {product.size}
                </span>
                {product.inStock && (
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold pb-1 ml-4">
                    {product.stockCount > 10 ? "+10" : product.stockCount} үлдсэн
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
                  Qty
                </span>
                <div className="flex items-center border border-white/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white/5 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-sm font-bold border-x border-white/10">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white/5 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || addedToCart}
                className={`w-full py-5 text-[11px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 transition-all duration-500 active:scale-[0.98] ${
                  addedToCart
                    ? "bg-white/10 text-white border border-white/20"
                    : !product.inStock
                    ? "bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Added to Cart
                  </>
                ) : !product.inStock ? (
                  "Currently Sold Out"
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart — ${product.price * quantity}
                  </>
                )}
              </button>

              {/* Shipping info */}
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
                <Truck className="w-3.5 h-3.5" />
                Free shipping on orders over $75
              </div>
            </div>

            <div className="w-full h-px bg-white/5" />

            {/* Tabs */}
            <div className="space-y-6">
              <div className="flex border-b border-white/5">
                {(["details", "ingredients", "howto"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] uppercase tracking-[0.2em] font-bold py-3 px-6 border-b-2 transition-all ${
                      activeTab === tab
                        ? "border-white text-white"
                        : "border-transparent text-gray-600 hover:text-gray-400"
                    }`}
                  >
                    {tab === "howto" ? "How to Use" : tab}
                  </button>
                ))}
              </div>

              <div className="min-h-[120px]">
                {activeTab === "details" && (
                  <motion.p
                    key="details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-400 text-sm font-light leading-relaxed"
                  >
                    {product.details}
                  </motion.p>
                )}
                {activeTab === "ingredients" && (
                  <motion.div
                    key="ingredients"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2"
                  >
                    {product.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-[10px] uppercase tracking-[0.15em] font-semibold text-gray-400 border border-white/10 px-4 py-2"
                      >
                        {ing}
                      </span>
                    ))}
                  </motion.div>
                )}
                {activeTab === "howto" && (
                  <motion.p
                    key="howto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-400 text-sm font-light leading-relaxed"
                  >
                    {product.howToUse}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {otherProducts.length > 0 && (
        <section className="py-24 px-6 bg-[#050505] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold block">
                  You Might Also Like
                </span>
                <h2 className="text-2xl md:text-3xl font-bold uppercase">
                  MORE <span className="text-gray-500">ESSENTIALS</span>
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-white transition-colors"
              >
                View All
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {otherProducts.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/products/${p.id}`}
                    className="group block border border-white/5 hover:border-white/20 transition-all duration-500"
                  >
                    <div className="relative aspect-square overflow-hidden bg-black">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 p-6"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold block">
                            {p.category}
                          </span>
                          <h3 className="text-sm font-bold uppercase tracking-wide mt-1">
                            {p.name}
                          </h3>
                        </div>
                        <span className="text-lg font-bold">${p.price}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
