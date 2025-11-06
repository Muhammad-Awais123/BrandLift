// src/components/Products.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import { Share2, Copy, Phone, ShoppingCart } from "lucide-react";
import { useCart } from "../context/Cartcontext.jsx";
import CartSidebar from "./CartSidebar";

// assets
import product_amazon from "../assets/product_amazon.jpeg";
import product_apple_card from "../assets/product_apple_card.jpeg";
import binance from "../assets/binance.jpeg";
import american_express from "../assets/american_express.jpeg";
import product_foodpanda from "../assets/product_foodpanda.jpeg";

const WHATSAPP_NUMBER = "923148680400";
const CONTACT_WHATSAPP_DISPLAY = "0314-8680400";

const productsData = [
  { title: "Amazon E-Gift Card", price: 500, description: "Purchase millions of products worldwide.", icon: product_amazon },
  { title: "Apple Pay Gift Card", price: 500, description: "Apps, music, movies and Apple services.", icon: product_apple_card },
  { title: "Binance Gift Card", price: 500, description: "Fund your Binance account or transfer crypto.", icon: binance },
  { title: "American Express Gift Card", price: 500, description: "Accepted globally for online & in-store purchases.", icon: american_express },
  { title: "FoodPanda Voucher", price: 500, description: "Order food with instant e-voucher delivery.", icon: product_foodpanda },
];

const Products = () => {
  const [showCart, setShowCart] = useState(false);
  const { addToCart, count } = useCart();

  const handleShare = async (product) => {
    const shareText = `Check this out: ${product.title} — $${product.price}. Contact: ${CONTACT_WHATSAPP_DISPLAY}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: shareText,
          url: window.location.href,
        });
      } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        alert("Product details copied to clipboard.");
      } catch {
        alert("Unable to copy to clipboard.");
      }
    }
  };

  return (
    <>
      <motion.section id="products" initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative px-4 sm:px-12 lg:px-24 xl:px-40 py-20 text-gray-800 dark:text-white">
        <Title title="Featured Products" desc="Glassmorphism cards — Add to Cart and checkout using bank transfer upload." />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData.map((product, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02, y: -4 }} className="relative rounded-2xl p-5 bg-white/40 dark:bg-black/40 border border-white/10 backdrop-blur-md shadow-md hover:shadow-xl transition">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-[100%] h-[100%] rounded-2xl p-3 bg-white/70 dark:bg-black/50 border border-white/20 flex items-center justify-center shadow-inner">
                  <img src={product.icon} alt={product.title} className="object-contain w-full h-full" />
                </div>

                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm opacity-80">{product.description}</p>
                <p className="font-bold text-primaryColor text-lg">${product.price.toFixed(2)}</p>

                <div className="flex gap-3 w-full mt-3 flex-wrap sm:flex-nowrap">
                  <button onClick={() => addToCart(product)} className="flex-1 rounded-lg px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow hover:opacity-95 transition">
                    Add to Cart
                  </button>

                  <button onClick={() => handleShare(product)} className="rounded-lg px-3 py-2 border border-white/10" title="Share">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Floating Cart Button */}
      <div className="fixed right-6 bottom-6 z-50">
        <button
          onClick={() => setShowCart(true)}
          className="relative bg-primary text-white p-3 rounded-full shadow-lg flex items-center gap-2"
          title="Open cart"
        >
          <ShoppingCart size={18} />
          <span className="sr-only">Cart</span>
          <span className="ml-1 text-sm">Cart</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>

      <CartSidebar open={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default Products;
