'use client'

import { motion } from 'motion/react'
import { Header } from './header'

export function AnimatedHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.9 }}
    >
      <Header />
    </motion.div>
  )
}


