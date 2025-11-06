import React from 'react'
import Title from './Title'
import { teamData } from '../assets/assets'
import { motion } from 'motion/react'

const Teams = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className='flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-800 dark:text-white'
    >
      <Title 
        title='Meet the team' 
        desc='A passionate team of digital experts dedicated to your brand’s success.'
      />

      <motion.div 
        className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.12 } }
        }}
      >
        {teamData.map((team, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.06, 
              y: -6,
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)" 
            }}
            className='flex max-sm:flex-col items-center gap-5 p-4 rounded-xl border border-gray-100 dark:border-gray-700 
            bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg 
            hover:shadow-2xl hover:shadow-gray-300/30 dark:hover:shadow-white/10 
            transition-all duration-300 cursor-pointer'
          >
            <motion.img 
              src={team.image} 
              alt="" 
              className='w-14 h-14 rounded-full object-fit border-2 border-gray-200 dark:border-gray-700'
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ duration: 0.3 }}
            />

            <div className='flex-1'>
              <h3 className='font-bold text-sm tracking-wide'>{team.name}</h3>
              <p className='text-xs opacity-60'>{team.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Teams
