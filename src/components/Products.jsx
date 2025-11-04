import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Title from './Title'
import assets from '../assets/assets'
import product_amazon from '../assets/product_amazon.jpeg'
import product_apple_card from '../assets/product_apple_card.jpeg'
import product_airbn from '../assets/product_airbnb.jpeg'
import american_express from '../assets/american_express.jpeg'
import binance from '../assets/binance.jpeg'
import  product_foodpanda from '../assets/product_foodpanda.jpeg'


import { Share2 } from 'lucide-react'; // Assuming you use a library like lucide-react for icons

// 1. Define the Modal Component (You need to create this separately)
const BuyModal = ({ product, onClose }) => {
  if (!product) return null;

  // Your contact information (Replace with your details)
  const CONTACT_INFO = {
    whatsapp: "+92 3XX XXXXXXX",
    bankName: "HBL",
    accountNumber: "1234 5678 9012 3456"
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl max-w-sm w-full text-center'>
        <h3 className='text-xl font-bold mb-4 text-primaryColor'>Purchase {product.title}</h3>
        <p className='mb-6'>Please contact us using one of the methods below to complete your order:</p>
        
        <div className='text-left mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded'>
          <p className='font-semibold'>📞 Contact Method (WhatsApp)</p>
          <p className='text-lg font-mono text-green-600 dark:text-green-400'>{CONTACT_INFO.whatsapp}</p>
          
          <hr className='my-3 border-gray-300 dark:border-gray-600' />
          
          <p className='font-semibold'>🏦 Bank Transfer Details</p>
          <p>Bank: **{CONTACT_INFO.bankName}**</p>
          <p>A/C No: **{CONTACT_INFO.accountNumber}**</p>
        </div>

        <button 
          onClick={onClose}
          className='bg-primaryColor text-white px-6 py-2 rounded-lg mt-4 hover:opacity-90 transition'
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  // 2. State for Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsData = [
    {
      title: "Amazon E-Gift Card",
      price: "$500 - $25000",
      description: "The most popular choice for purchasing millions of products worldwide.",
      icon: product_amazon // Mapped to card (4).jpeg
    },
    {
      title: "Apple Pay Gift Card",
      price: "$100 - $2000",
      description: "Use for apps, games, music, movies, and Apple services across all devices.",
      icon: product_apple_card // Mapped to card (1).jpeg
    },
    {
      title: "Binance Gift Card",
      price: "$500 - $25000",
      description: "Instantly transfer crypto to friends or fund your Binance account balance.",
      icon: product_airbn // Mapped to card (5).jpeg
    },
    {
      title: "American Express Gift Card",
      price: "$500 - $1000",
      description: "Accepted globally, offering flexibility for any purchase online or in-store.",
      icon: american_express // Mapped to american_express.jpeg
    },
    {
      title: "binance Gift Card",
      price: "$500 - $1000",
      description: "Accepted globally, offering flexibility for any purchase online or in-store.",
      icon: binance // Mapped to american_express.jpeg
    },
    {
      title: "food Panda",
      price: "$500 - $1000",
      description: "Accepted globally, offering flexibility for any purchase online or in-store.",
      icon: product_foodpanda // Mapped to american_express.jpeg
    }
  ];

  // 3. Function to handle "Buy Now" click
  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // 4. Function to handle "Share" click
  const handleShare = (product) => {
    const shareText = `Check out this ${product.title} available for ${product.price}! Buy here: [YOUR WEBSITE URL]`;
    
    if (navigator.share) {
      // Use Web Share API for modern mobile sharing
      navigator.share({
        title: `Gift Card Sale: ${product.title}`,
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard (for desktops)
      navigator.clipboard.writeText(shareText + " " + window.location.href);
      alert(`${product.title} details copied to clipboard!`);
    }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        id='products'
        className='relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 py-28 text-gray-700 dark:text-white'
      >

        <Title 
          title='Featured Products' 
          desc='Purchase your gift cards securely with instant digital delivery. Click "Buy Now" for contact details or share our offerings with friends.' 
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-6'>
          {productsData.map((product, index) => (
            <motion.div 
              key={index}
              className='flex flex-col gap-3 items-center text-center border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition'
            >
              <img src={product.icon} alt={product.title} className='w-20 h-20 object-contain' />
              
              <h3 className='font-semibold text-lg'>{product.title}</h3>
              <p className='text-sm opacity-80'>{product.description}</p>
              <p className='font-bold text-primaryColor text-lg'>{product.price}</p>
              
              {/* Buy Now and Share Buttons */}
              <div className='flex gap-3 mt-2 w-full justify-center'>
                <button 
                  onClick={() => handleBuyClick(product)}
                  className='bg-primaryColor text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition flex-grow'
                >
                  Buy Now
                </button>
                <button 
                  onClick={() => handleShare(product)}
                  className='border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition'
                  title="Share Product"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
      
      {/* 5. Render the Modal */}
      <BuyModal 
        product={selectedProduct} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default Products