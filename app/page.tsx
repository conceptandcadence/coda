'use client'
import { motion } from 'motion/react'
import * as React from 'react'
import { ABOUT } from './data'
import { useLanguage } from './language-provider'

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
  const { lang, initialized } = useLanguage()
  const [ready, setReady] = React.useState(false)
  const headerDelay = 0.35

  React.useEffect(() => {
    if (!initialized) return
    setReady(true)
  }, [initialized])

  if (!initialized) {
    return null
  }

  return (
    <motion.main
      className="space-y-12 lg:space-y-24"
      initial="hidden"
      animate={ready ? 'visible' : 'hidden'}
    >
      <div className="flex-1">
        <motion.div
          variants={VARIANTS_SECTION}
          transition={{ ...TRANSITION_SECTION, delay: headerDelay }}
        >
          <div
            className="prose max-w-none text-3xl lg:text-4xl font-(family-name:--font-vesper-libre) text-current prose-headings:text-current prose-p:text-current prose-a:text-current prose-strong:text-current prose-li:text-current"
            dangerouslySetInnerHTML={{ __html: ABOUT.content[lang] }}
          />
        </motion.div>
      </div>
      <motion.section
        variants={VARIANTS_SECTION}
        transition={{ ...TRANSITION_SECTION, delay: headerDelay + 0.15 }}
      >
        <h3 className="font-(family-name:--font-geist-mono) mb-3 lg:mb-5 text-sm font-medium ">{ABOUT.contact[lang]}</h3>
        <p className="mb-5 font-(family-name:--font-vesper-libre) text-current">
          <a className="text-3xl lg:text-4xl" href={`mailto:${ABOUT.email}`}>
            {ABOUT.email}
          </a>
        </p>
      </motion.section>
    </motion.main>
  )
}
