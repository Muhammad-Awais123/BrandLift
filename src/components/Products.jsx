// Products.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import { Share2, X, Copy, Phone } from "lucide-react";

// assets
import product_amazon from "../assets/product_amazon.jpeg";
import product_apple_card from "../assets/product_apple_card.jpeg";
import binance from "../assets/binance.jpeg";
import american_express from "../assets/american_express.jpeg";
import product_foodpanda from "../assets/product_foodpanda.jpeg";

const WHATSAPP_NUMBER = "923148680400";
const EMAIL = "Brandliftagency2024@gmail.com";
const CONTACT_WHATSAPP_DISPLAY = "0314-8680400";

const BANK_DETAILS = {
  accountTitle: "BRAND LIFT AGENCY",
  accountNumber: "00430981012749016",
  iban: "PK93BAHL0043098101274901",
  bankName: "Bank Al Habib",
};

const productsData = [
  {
    title: "Amazon E-Gift Card",
    price: "$500 - $25000",
    description: "Purchase millions of products worldwide.",
    icon: product_amazon,
  },
  {
    title: "Apple Pay Gift Card",
    price: "$100 - $2000",
    description: "Apps, music, movies and Apple services.",
    icon: product_apple_card,
  },
  {
    title: "Binance Gift Card",
    price: "$500 - $25000",
    description: "Fund your Binance account or transfer crypto.",
    icon: binance,
  },
  {
    title: "American Express Gift Card",
    price: "$500 - $1000",
    description: "Accepted globally for online & in-store purchases.",
    icon: american_express,
  },
  {
    title: "FoodPanda Voucher",
    price: "$5 - $200",
    description: "Order food with instant e-voucher delivery.",
    icon: product_foodpanda,
  },
];

const BuyModal = ({ product, onClose }) => {
  if (!product) return null;

  const prefillMsg = encodeURIComponent(
    `Hello, I want to buy *${product.title}* priced ${product.price}. My name: _____ . Please confirm payment instructions.`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${prefillMsg}`;

  const copyBank = async () => {
    const text = `Account Title: ${BANK_DETAILS.accountTitle}\nBank: ${BANK_DETAILS.bankName}\nA/C No: ${BANK_DETAILS.accountNumber}\nIBAN: ${BANK_DETAILS.iban}\nEmail: ${EMAIL}`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Bank details copied to clipboard.");
    } catch (e) {
      alert("Unable to copy. Please select and copy manually.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        className="relative z-10 w-full max-w-lg sm:max-w-xl md:max-w-2xl 
                   rounded-2xl p-4 sm:p-6 bg-white/60 dark:bg-gray-900/60 
                   border border-white/20 dark:border-white/5 shadow-2xl 
                   backdrop-blur-md max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-white/30 transition"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-4">
          <img
            src={product.icon}
            alt={product.title}
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg p-1 bg-white/40"
          />
          <div>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-sm opacity-80">{product.price}</p>
            <p className="mt-1 text-sm opacity-70">{product.description}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl px-4 py-3 
                       bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       text-white font-medium shadow-lg hover:scale-[1.01] transform transition"
          >
            <Phone size={16} />
            Message on WhatsApp (Quick Checkout)
            <span className="ml-2 opacity-80 text-xs">{CONTACT_WHATSAPP_DISPLAY}</span>
          </a>

          <div className="rounded-xl p-4 bg-white/40 dark:bg-black/40 border border-white/10">
            <div className="flex justify-between items-start flex-col sm:flex-row gap-3">
              <div>
                <p className="text-xs opacity-80">Bank Transfer Details</p>
                <p className="font-semibold text-sm mt-1">{BANK_DETAILS.accountTitle}</p>
                <p className="text-sm mt-1">{BANK_DETAILS.bankName}</p>
                <p className="text-sm">A/C No: {BANK_DETAILS.accountNumber}</p>
                <p className="text-sm">IBAN: {BANK_DETAILS.iban}</p>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <button
                  onClick={copyBank}
                  className="flex items-center gap-2 text-sm rounded-md px-3 py-2 
                             border border-white/10 bg-white/10 hover:bg-white/20 transition"
                >
                  <Copy size={14} /> Copy
                </button>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                    `Order: ${product.title}`
                  )}`}
                  className="text-sm underline underline-offset-2"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>

          <p className="text-xs opacity-70">
            After sending the payment, please send the transaction screenshot via WhatsApp so we can deliver your digital card instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-700"
            >
              Close
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg px-4 py-2 bg-primaryColor text-white text-center"
            >
              Confirm & Message
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleShare = async (product) => {
    const shareText = `Check this out: ${product.title} — ${product.price}. Contact: ${CONTACT_WHATSAPP_DISPLAY}`;
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
      <motion.section
        id="products"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative px-4 sm:px-12 lg:px-24 xl:px-40 py-20 text-gray-800 dark:text-white"
      >
        <Title
          title="Featured Products"
          desc="Glassmorphism cards — click Buy Now to open a secure WhatsApp checkout with payment details."
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData.map((product, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative rounded-2xl p-5 bg-white/40 dark:bg-black/40 
                         border border-white/10 backdrop-blur-md shadow-md 
                         hover:shadow-xl transition"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-[100%] h-[100%] rounded-2xl p-3 bg-white/70 dark:bg-black/50 
                                border border-white/20 flex items-center justify-center shadow-inner">
                  <img
                    src={product.icon}
                    alt={product.title}
                    className="object-contain w-full h-full"
                  />
                </div>

                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm opacity-80">{product.description}</p>
                <p className="font-bold text-primaryColor text-lg">{product.price}</p>

                <div className="flex gap-3 w-full mt-3 flex-wrap sm:flex-nowrap">
                  <button
                    onClick={() => handleBuyClick(product)}
                    className="flex-1 rounded-lg px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 
                               text-white font-medium shadow hover:opacity-95 transition"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={() => handleShare(product)}
                    className="rounded-lg px-3 py-2 border border-white/10"
                    title="Share"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {showModal && (
        <BuyModal
          product={selectedProduct}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
};

export default Products;
