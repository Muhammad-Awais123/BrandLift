import React from 'react'
import Title from './Title'
import { motion } from 'framer-motion'

const reviewsData = [
  {
    name: 'John Doe',
    position: 'Client',
    // image:'',
    review: 'Great work and very professional.',
    rating: 5
  },
  {
    name: 'Sarah Ali',
    position: 'Business Owner',
    // image: '/path/to/image2.jpg', 
    review: 'Amazing experience. Highly recommended.',
    rating: 4
  },
  {
    name: 'David Khan',
    position: 'Entrepreneur',
    // image: '/path/to/image3.jpg',
    review: 'Delivered exactly what I wanted.',
    rating: 5
  }
]

const Team = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className='flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-800 dark:text-white'
    >
      <Title 
        title='Client Reviews' 
        desc='People who trusted us and shared their honest experience.'
      />

      <motion.div 
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.12 } }
        }}
      >
        {reviewsData.map((client, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.04, 
              y: -4,
              boxShadow: "0 12px 30px rgba(0,0,0,0.18)" 
            }}
            className='flex flex-col gap-4 p-5 rounded-xl border border-gray-100 dark:border-gray-700 
            bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg 
            hover:shadow-2xl hover:shadow-gray-300/30 dark:hover:shadow-white/10 
            transition-all duration-300 cursor-pointer'
          >
            <div className='flex items-center gap-4'>
              {/* <motion.img 
                src={client.image} 
                alt="" 
                className='w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700'
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ duration: 0.3 }}
              /> */}
              <div>
                <h3 className='font-bold text-sm tracking-wide'>{client.name}</h3>
                <p className='text-xs opacity-60'>{client.position}</p>
              </div>
            </div>

            <p className='text-sm leading-relaxed opacity-90'>
              {client.review}
            </p>

            <div className='flex text-yellow-400 text-sm'>
              {"★".repeat(client.rating)}
              {"☆".repeat(5 - client.rating)}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Team
