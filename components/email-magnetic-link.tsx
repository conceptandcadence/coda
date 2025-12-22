'use client'

import { useMagneticPull } from 'motion-plus/react'
import { motion } from 'motion/react'
import * as React from 'react'

type EmailMagneticLinkProps = {
  email: string
  className?: string
}

export function EmailMagneticLink({ email, className }: EmailMagneticLinkProps) {
  const ref = React.useRef<HTMLAnchorElement>(null)
  const pull = useMagneticPull(ref, 0.1)

  return (
    <motion.a
      ref={ref}
      href={`mailto:${email}`}
      data-cursor-zone="overlay"
      className={className}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        style={pull}
        variants={{ pressed: { scale: 0.98 } }}
        className="inline-block"
      >
        {email}
      </motion.span>
    </motion.a>
  )
}


