'use client'

import { Cursor, useCursorState } from 'motion-plus/react'
import * as React from 'react'

export function MotionCursor() {
  const { zone } = useCursorState()

  return (
    <Cursor
      magnetic
      variants={{
        // Visible on blank space: a small dot (Cursor default size is 17px).
        default: {
          opacity: 1,
          scale: 0.45,
          backgroundColor: 'var(--cursor-color, var(--app-fg))',
        },
        pointer: {
          opacity: 1,
          scale: 1,
          backgroundColor: 'var(--cursor-color, var(--app-fg))',
        },
        text: {
          opacity: 1,
          scale: 1,
          backgroundColor: 'var(--cursor-color, var(--app-fg))',
        },
      }}
      style={{
        borderRadius: 10,
        mixBlendMode: 'difference',
      }}
    />
  )
}


