'use client'

import * as React from 'react'

function getThemeFg(): string {
  if (typeof window === 'undefined') return '#000000'
  const fg = getComputedStyle(document.documentElement)
    .getPropertyValue('--app-fg')
    .trim()
  return fg || getComputedStyle(document.documentElement).color || '#000000'
}

function getOrCreateFaviconLink(): HTMLLinkElement {
  const existing =
    (document.querySelector('link[rel="icon"]') as HTMLLinkElement | null) ??
    (document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement | null)

  if (existing) return existing

  const link = document.createElement('link')
  link.rel = 'icon'
  document.head.appendChild(link)
  return link
}

export function AnimatedFavicon() {
  React.useEffect(() => {
    // Respect reduced motion: keep the default favicon.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const size = 32
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const link = getOrCreateFaviconLink()
    link.type = 'image/png'

    let color = getThemeFg()
    let stopped = false
    let t = 0

    const setColorFromTheme = () => {
      color = getThemeFg()
    }

    // Update on stage changes (palette) and any other attribute-driven theme changes.
    const observer = new MutationObserver(setColorFromTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-stage', 'class', 'style'],
    })
    setColorFromTheme()

    // Throttle favicon updates; updating every frame is overkill and gets throttled in bg tabs anyway.
    const interval = window.setInterval(() => {
      if (stopped) return

      ctx.clearRect(0, 0, size, size)

      // Simple spinner ring
      const cx = size / 2
      const cy = size / 2
      const r = 11

      const start = (t / 60) * Math.PI * 2
      const end = start + Math.PI * 1.35

      ctx.lineWidth = 3.5
      ctx.lineCap = 'round'
      ctx.strokeStyle = color
      ctx.beginPath()
      ctx.arc(cx, cy, r, start, end)
      ctx.stroke()

      // Small center dot (anchors the motion)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(cx, cy, 1.5, 0, Math.PI * 2)
      ctx.fill()

      link.href = canvas.toDataURL('image/png')
      t = (t + 1) % 60
    }, 100)

    return () => {
      stopped = true
      observer.disconnect()
      window.clearInterval(interval)
    }
  }, [])

  return null
}


