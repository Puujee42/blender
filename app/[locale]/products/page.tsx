"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShoppingBag, Filter } from "lucide-react";
import { getAllProducts, getCategories } from "../../../lib/productData";
import { useTranslations } from "next-intl";

export default function ProductsPage() {
  const t = useTranslations("ProductsPage");
  const products = getAllProducts();
  const categories = getCategories();
  const [activeFilter, setActiveFilter] = useState("All");
  const [cart, setCart] = useState<string[]>([]);

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  const addToCart = (productId: string, productName: string) => {
    setCart((prev) => [...prev, productId]);
    // Brief visual feedback handled by state
  };

  return (
    <main className="bg-black min-h-screen pt-36 px-6 text-white pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold block mb-4">
            {t("theEssentials")}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6">
            {t("shop")}
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto font-light leading-relaxed">
            {t("shopDesc")}
          </p>
          <div className="w-12 h-px bg-white/20 mx-auto mt-8" />
        </motion.div>

        {/* Filter + Cart Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-3 h-3 text-gray-600 mr-1" />
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 border transition-all duration-300 ${
                  activeFilter === cat
                    ? "border-white bg-white text-black"
                    : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat === "All" ? t("all") : cat}
              </button>
            ))}
          </div>

          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 border border-white/10 px-5 py-2"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                {cart.length} {cart.length === 1 ? t("item") : t("items")}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.6 }}
              viewport={{ once: true }}
              className="group border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col"
            >
              {/* Image — clickable to preview */}
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-[#050505]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 p-6"
                  />
                  {!product.inStock && (
                    <div className="absolute top-4 left-4">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold bg-black border border-white/20 text-gray-400 px-3 py-1">
                        {t("soldOut")}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold bg-white text-black px-3 py-1.5 flex items-center gap-1">
                      {t("preview")} <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <Link href={`/products/${product.id}`} className="group/title">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold block mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold uppercase tracking-wide group-hover/title:tracking-wider transition-all duration-500">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="text-right">
                    <span className="text-2xl font-bold block">${product.price}</span>
                    {product.inStock && (
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold mt-1 block">
                        {product.stockCount > 10 ? "+10" : product.stockCount} {t("left")}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-500 text-xs font-light leading-relaxed flex-1">
                  {product.description}
                </p>

                <div className="pt-4 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-2.5 h-2.5 ${
                          i <= Math.round(product.rating)
                            ? "fill-white text-white"
                            : "fill-transparent text-gray-700"
                        }`}
                      />
                    ))}
                    <span className="text-[8px] text-gray-500 uppercase tracking-wider ml-1">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 border border-white/10 text-white py-3 text-[10px] uppercase tracking-[0.2em] font-bold text-center hover:border-white/30 transition-all"
                    >
                      {t("details")}
                    </Link>
                    <button
                      disabled={!product.inStock || cart.includes(product.id)}
                      onClick={() => addToCart(product.id, product.name)}
                      className={`flex-1 relative overflow-hidden py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 flex items-center justify-center gap-1.5 ${
                        cart.includes(product.id)
                          ? "bg-white/10 text-gray-400 border border-white/10"
                          : !product.inStock
                          ? "border border-white/5 text-gray-600 cursor-not-allowed"
                          : "bg-white text-black hover:bg-gray-200 active:scale-[0.98]"
                      }`}
                    >
                      {cart.includes(product.id) ? (
                        t("added")
                      ) : !product.inStock ? (
                        t("soldOut")
                      ) : (
                        <>
                          {t("addToCart")}
                          <ShoppingBag className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-sm uppercase tracking-[0.2em]">
              {t("noProducts")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
