'use client'
import { motion } from 'motion/react'
import * as React from 'react'
import { EmailMagneticLink } from '@/components/email-magnetic-link'
import Link from 'next/link'
import { useMagneticPull } from 'motion-plus/react'
import { ABOUT } from './data'
import { preventClickIfSelectingText } from '@/lib/prevent-click-on-selection'

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  type: 'spring',
  stiffness: 240,
  damping: 26,
  mass: 0.9,
}

export default function Personal() {
  const [ready, setReady] = React.useState(false)
  const headerDelay = 0.35
  const privacyRef = React.useRef<HTMLSpanElement>(null)
  const privacyPull = useMagneticPull(privacyRef, 0.1)

  React.useEffect(() => {
    setReady(true)
  }, [])

  return (
    <motion.main
      className="space-y-12"
      initial="hidden"
      animate={ready ? 'visible' : 'hidden'}
    >
      <div className="flex-1">
        <motion.div
          variants={VARIANTS_SECTION}
          transition={{ ...TRANSITION_SECTION, delay: headerDelay }}
        >
          <div
            className="prose prose-headings:text-current prose-p:text-current prose-a:text-current prose-strong:text-current prose-li:text-current mt-12 max-w-none font-(family-name:--font-pp-mori) text-3xl text-current lg:text-3xl"
            dangerouslySetInnerHTML={{ __html: ABOUT.content }}
          />
        </motion.div>
      </div>
      <motion.section
        variants={VARIANTS_SECTION}
        transition={{ ...TRANSITION_SECTION, delay: headerDelay + 0.15 }}
      >
        <h3 className="mb-3 font-(family-name:--font-sometype-mono) text-sm font-medium lg:mb-5">
          {ABOUT.contact}
        </h3>
        <p className="mb-5 font-(family-name:--font-pp-mori) text-current">
          <EmailMagneticLink
            email={ABOUT.email}
            className="text-3xl lg:text-3xl"
          />
        </p>
        <p className="mt-24 font-(family-name:--font-sometype-mono) text-sm text-current">
          <Link
            href="/privacy"
            data-cursor-zone="overlay"
            className="font-medium"
            onClickCapture={preventClickIfSelectingText}
          >
            <motion.span
              ref={privacyRef}
              // motion-plus MotionValue types can differ slightly from motion/react types
              // (depends on dependency resolution). Runtime behavior is correct.
              style={privacyPull as unknown as React.CSSProperties}
              className="underline underline-offset-4 hover:text-current"
            >
              Privacy
            </motion.span>
          </Link>
        </p>
      </motion.section>
    </motion.main>
  )
}
