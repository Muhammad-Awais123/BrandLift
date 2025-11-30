import React from 'react'
import Title from './Title'
import { motion } from 'framer-motion'

const teamData = [
  {
    name: 'Faisal Rafique',
    position: 'CEO',
    review: 'Leads with clarity and direction, keeping the entire team focused and aligned.'
  },
  {
    name: 'Arfa',
    position: 'Meta Ads Expert',
    review: 'Specializes in high-converting ad campaigns and brand scaling.'
  },
  {
    name: 'Areeha',
    position: 'Graphic Designer',
    review: 'Creates clean, expressive visuals that define the look and feel of our brand.'
  },
  {
    name: 'Haris',
    position: 'Marketing Expert',
    review: 'Brings sharp creative strategy and market understanding to every campaign.'
  },
  {
    name: 'Asim Ali',
    position: 'Full Stack Web Developer',
    review: 'Builds smooth, fast, and scalable web experiences from front to back.'
  }
]

const Team = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className='flex flex-col items-center gap-8 px-6 sm:px-14 lg:px-24 xl:px-40 py-20 text-gray-800 dark:text-white'
    >
      <Title 
        title='Our Team' 
        desc='The people who power our work and bring ideas to life.'
      />

      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {teamData.map((member, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ 
              scale: 1.05, 
              y: -6,
              boxShadow: '0 18px 40px rgba(0,0,0,0.15)'
            }}
            className='flex flex-col gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 
            bg-white/80 dark:bg-gray-900/70 backdrop-blur-md shadow-md
            hover:shadow-xl hover:shadow-gray-400/30 dark:hover:shadow-white/10
            transition-all duration-300 cursor-pointer'
          >
            <div className='flex flex-col gap-1'>
              <h3 className='font-semibold text-lg tracking-wide'>{member.name}</h3>
              <p className='text-sm opacity-70'>{member.position}</p>
            </div>

            <p className='text-sm leading-relaxed opacity-90'>
              {member.review}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Team