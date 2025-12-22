'use client'

import { useMagneticPull } from 'motion-plus/react'
import { motion } from 'motion/react'
import * as React from 'react'
import { preventClickIfSelectingText } from '@/lib/prevent-click-on-selection'

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
      onClickCapture={preventClickIfSelectingText}
    >
      <motion.span
        // motion-plus MotionValue types can differ slightly from motion/react types
        // (depends on dependency resolution). Runtime behavior is correct.
        style={pull as any}
        variants={{ pressed: { scale: 0.98 } }}
        className="inline-block"
      >
        {email}
      </motion.span>
    </motion.a>
  )
}


