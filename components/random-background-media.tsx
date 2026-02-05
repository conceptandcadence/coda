'use client'

import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'
import { PROJECTS, type Project } from '@/app/data'

type ActiveItem = {
  project: Project
  id: string
  x: number
  y: number
  size: number // width
  height?: number // height (calculated from aspect ratio)
  moveX: number // movement vector X (pixels per second)
  moveY: number // movement vector Y (pixels per second)
  duration: number // display duration in milliseconds
  createdAt: number // timestamp when item was created
}

const VARIANTS = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: { opacity: 1, filter: 'blur(0px)' },
}

const TRANSITION = {
  duration: 2,
  ease: [0.22, 1, 0.36, 1],
}

// Random number between min and max
const random = (min: number, max: number) =>
  Math.random() * (max - min) + min

// Random integer between min and max (inclusive)
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export function RandomBackgroundMedia() {
  const [activeItems, setActiveItems] = React.useState<ActiveItem[]>([])
  const [viewportSize, setViewportSize] = React.useState({ width: 0, height: 0 })
  const prefersReducedMotion = React.useRef(false)
  const preloadedVideos = React.useRef<Set<string>>(new Set())
  const preloadedImages = React.useRef<Set<string>>(new Set())

  // Check for reduced motion preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mediaQuery.matches

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Preload media for a specific project (prioritized)
  const preloadProjectMedia = React.useCallback((project: Project): Promise<void> => {
    return new Promise((resolve) => {
      const mediaToPreload: string[] = []
      
      // Collect all media URLs for this project
      if (Array.isArray(project.video)) {
        project.video.forEach((url) => {
          if (!preloadedVideos.current.has(url)) {
            mediaToPreload.push(url)
          }
        })
      } else if (project.video && !preloadedVideos.current.has(project.video)) {
        mediaToPreload.push(project.video)
      }

      if (project.image) {
        if (Array.isArray(project.image)) {
          project.image.forEach((url) => {
            if (!preloadedImages.current.has(url)) {
              mediaToPreload.push(url)
            }
          })
        } else if (!preloadedImages.current.has(project.image)) {
          mediaToPreload.push(project.image)
        }
      }

      if (mediaToPreload.length === 0) {
        resolve()
        return
      }

      let loadedCount = 0
      const totalCount = mediaToPreload.length

      const checkComplete = () => {
        loadedCount++
        if (loadedCount >= totalCount) {
          resolve()
        }
      }

      mediaToPreload.forEach((url) => {
        // Determine if it's a video or image based on extension or try both
        const isVideo = url.match(/\.(mp4|webm|ogg|mov|m4v)$/i)
        
        if (isVideo) {
          if (preloadedVideos.current.has(url)) {
            checkComplete()
            return
          }

          const video = document.createElement('video')
          video.preload = 'auto'
          video.muted = true
          video.playsInline = true
          video.src = url

          video.addEventListener('loadeddata', () => {
            preloadedVideos.current.add(url)
            checkComplete()
          })

          video.addEventListener('error', () => {
            checkComplete() // Continue even if one fails
          })

          video.load()
        } else {
          if (preloadedImages.current.has(url)) {
            checkComplete()
            return
          }

          const img = new Image()
          img.src = url

          img.addEventListener('load', () => {
            preloadedImages.current.add(url)
            checkComplete()
          })

          img.addEventListener('error', () => {
            checkComplete() // Continue even if one fails
          })
        }
      })
    })
  }, [])

  // Preload all media files after page load (background, lower priority)
  React.useEffect(() => {
    if (prefersReducedMotion.current) return

    // Collect all unique media URLs from all projects
    const allMediaUrls = new Set<string>()
    PROJECTS.forEach((project) => {
      if (Array.isArray(project.video)) {
        project.video.forEach((url) => allMediaUrls.add(url))
      } else if (project.video) {
        allMediaUrls.add(project.video)
      }
      if (project.image) {
        if (Array.isArray(project.image)) {
          project.image.forEach((url) => allMediaUrls.add(url))
        } else {
          allMediaUrls.add(project.image)
        }
      }
    })

    // Preload remaining media in background (after prioritized items)
    const preloadMedia = (url: string) => {
      const isVideo = url.match(/\.(mp4|webm|ogg|mov|m4v)$/i)
      
      if (isVideo) {
        if (preloadedVideos.current.has(url)) return

        const video = document.createElement('video')
        video.preload = 'auto'
        video.muted = true
        video.playsInline = true
        video.src = url

        video.addEventListener('loadeddata', () => {
          preloadedVideos.current.add(url)
        })

        video.addEventListener('error', () => {
          // Silently handle errors
        })

        video.load()
      } else {
        if (preloadedImages.current.has(url)) return

        const img = new Image()
        img.src = url

        img.addEventListener('load', () => {
          preloadedImages.current.add(url)
        })

        img.addEventListener('error', () => {
          // Silently handle errors
        })
      }
    }

    // Use requestIdleCallback for responsive preloading, fallback to setTimeout
    const schedulePreload = () => {
      const urls = Array.from(allMediaUrls)
      let index = 0

      const preloadNext = () => {
        if (index < urls.length) {
          preloadMedia(urls[index])
          index++

          // Use requestIdleCallback if available, otherwise use small delay
          if ('requestIdleCallback' in window) {
            requestIdleCallback(preloadNext, { timeout: 2000 })
          } else {
            setTimeout(preloadNext, 100) // Small delay between preloads
          }
        }
      }

      // Start preloading after a short delay to not block initial page load
      setTimeout(() => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(preloadNext, { timeout: 2000 })
        } else {
          preloadNext()
        }
      }, 2000) // Start after initial items are prioritized
    }

    schedulePreload()
  }, [])

  // Get viewport size
  React.useEffect(() => {
    const updateViewport = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  // Generate random position within viewport with padding, avoiding main content area and existing items
  const getRandomPosition = React.useCallback(
    (itemWidth: number, itemHeight: number, existingItems: ActiveItem[] = []) => {
      const padding = 50
      const titleHeight = 30 // Approximate height for title + margin
      const totalItemHeight = itemHeight + titleHeight
      const minDistance = 100 // Minimum distance from existing items
      
      // Main content area bounds (matching layout.tsx: max-w-3xl, centered, px-4, pt-20)
      const contentMaxWidth = 768 // max-w-3xl = 48rem = 768px
      const contentPadding = 16 // px-4 = 1rem = 16px
      const contentTop = 80 // pt-20 = 5rem = 80px
      const contentLeft = Math.max(0, (viewportSize.width - contentMaxWidth) / 2)
      const contentRight = contentLeft + contentMaxWidth
      const contentBottom = viewportSize.height // Content extends to bottom
      
      // Try multiple positions to find one that doesn't overlap with content or existing items
      let attempts = 0
      const maxAttempts = 50
      
      while (attempts < maxAttempts) {
        const x = random(padding, Math.max(0, viewportSize.width - itemWidth - padding))
        const y = random(padding, Math.max(0, viewportSize.height - totalItemHeight - padding))
        
        // Calculate item bounds including title
        const itemLeft = x
        const itemRight = x + itemWidth
        const itemTop = y
        const itemBottom = y + totalItemHeight
        const itemCenterX = x + itemWidth / 2
        const itemCenterY = y + totalItemHeight / 2
        
        // Check overlap with content area
        const overlapLeft = Math.max(itemLeft, contentLeft - contentPadding)
        const overlapRight = Math.min(itemRight, contentRight + contentPadding)
        const overlapTop = Math.max(itemTop, contentTop)
        const overlapBottom = Math.min(itemBottom, contentBottom)
        
        const overlapWidth = Math.max(0, overlapRight - overlapLeft)
        const overlapHeight = Math.max(0, overlapBottom - overlapTop)
        const overlapArea = overlapWidth * overlapHeight
        const itemArea = itemWidth * totalItemHeight
        const overlapRatio = overlapArea / itemArea
        
        // Allow up to 30% overlap (some overlap is okay, but not mostly)
        // Also ensure title area (bottom part) doesn't overlap too much
        const titleTop = y + itemHeight
        const titleBottom = y + totalItemHeight
        const titleOverlapTop = Math.max(titleTop, contentTop)
        const titleOverlapBottom = Math.min(titleBottom, contentBottom)
        const titleOverlapHeight = Math.max(0, titleOverlapBottom - titleOverlapTop)
        const titleOverlapRatio = titleOverlapHeight / titleHeight
        
        // Check distance from existing items
        let tooCloseToExisting = false
        for (const existing of existingItems) {
          const existingTitleHeight = 30
          const existingWidth = existing.size // size is width
          const existingHeight = existing.height || existingWidth // fallback to square if height not set
          const existingTotalHeight = existingHeight + existingTitleHeight
          const existingCenterX = existing.x + existingWidth / 2
          const existingCenterY = existing.y + existingTotalHeight / 2
          
          const distanceX = Math.abs(itemCenterX - existingCenterX)
          const distanceY = Math.abs(itemCenterY - existingCenterY)
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
          
          // Check if items would overlap
          const existingLeft = existing.x
          const existingRight = existing.x + existingWidth
          const existingTop = existing.y
          const existingBottom = existing.y + existingTotalHeight
          
          const itemsOverlap = !(
            itemRight < existingLeft ||
            itemLeft > existingRight ||
            itemBottom < existingTop ||
            itemTop > existingBottom
          )
          
          if (itemsOverlap || distance < minDistance) {
            tooCloseToExisting = true
            break
          }
        }
        
        // Accept position if overlap is reasonable, title isn't mostly obscured, and not too close to existing items
        if (overlapRatio < 0.3 && titleOverlapRatio < 0.5 && !tooCloseToExisting) {
          return { x, y }
        }
        
        attempts++
      }
      
      // Fallback: if we can't find a good position, place it outside content area
      // Prefer left or right edges, away from existing items
      const preferLeft = Math.random() > 0.5
      let x = preferLeft
        ? random(padding, contentLeft - itemWidth - padding)
        : random(contentRight + contentPadding + padding, viewportSize.width - itemWidth - padding)
      let y = random(padding, Math.max(0, viewportSize.height - totalItemHeight - padding))
      
      // Try to place away from existing items
      if (existingItems.length > 0) {
        const existing = existingItems[0]
        const existingTitleHeight = 30
        const existingWidth = existing.size
        const existingHeight = existing.height || existingWidth
        const existingTotalHeight = existingHeight + existingTitleHeight
        
        // Place on opposite side
        if (existing.x < viewportSize.width / 2) {
          // Existing is on left, place on right
          x = random(
            Math.max(contentRight + contentPadding + padding, viewportSize.width / 2),
            viewportSize.width - itemWidth - padding
          )
        } else {
          // Existing is on right, place on left
          x = random(
            padding,
            Math.min(contentLeft - itemWidth - padding, viewportSize.width / 2)
          )
        }
      }
      
      return { x, y }
    },
    [viewportSize]
  )

  // Generate random width between 150-200px
  const getRandomSize = React.useCallback(() => {
    return randomInt(150, 200)
  }, [])

  // Generate random movement vector (slow movement, 10-30 pixels over duration)
  const getRandomMovement = React.useCallback((duration: number) => {
    const maxDistance = random(10, 30) // Total distance to move (pixels)
    const angle = random(0, Math.PI * 2) // Random direction
    const pixelsPerSecond = maxDistance / (duration / 1000) // Convert to pixels per second
    
    return {
      moveX: Math.cos(angle) * pixelsPerSecond,
      moveY: Math.sin(angle) * pixelsPerSecond,
    }
  }, [])

  // Get random project, excluding projects that are already displayed
  const getRandomProject = React.useCallback((activeItems: ActiveItem[]) => {
    const activeProjectIds = new Set(activeItems.map((item) => item.project.id))
    const availableProjects = PROJECTS.filter(
      (project) => !activeProjectIds.has(project.id)
    )
    
    // If all projects are displayed, allow any project (shouldn't happen with 1-2 items)
    if (availableProjects.length === 0) {
      return PROJECTS[randomInt(0, PROJECTS.length - 1)]
    }
    
    return availableProjects[randomInt(0, availableProjects.length - 1)]
  }, [])

  // Manage item lifecycle
  React.useEffect(() => {
    if (prefersReducedMotion.current || viewportSize.width === 0) return

    let timeoutId: NodeJS.Timeout | null = null
    const EXIT_ANIMATION_DURATION = 2000 // 2 seconds for exit animation

    // Function to schedule next item
    const scheduleNext = () => {
      // Clear any existing timeout to prevent duplicates
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }

      const delay = random(4000, 10000) // 4-10 seconds
      timeoutId = setTimeout(async () => {
        // Use estimated aspect ratio (16:9) for positioning, actual height will be calculated from media
        const estimatedAspectRatio = 9 / 16 // height/width for 16:9
        const createdAt = Date.now()
        const movement = getRandomMovement(delay)
        
        // Get current state to determine action
        let currentState: ActiveItem[] = []
        setActiveItems((prev) => {
          currentState = prev
          return prev
        })

        let action: 'add' | 'replace' | 'remove' | 'removeAndAdd'
        let project: Project | null = null
        let remainingItems: ActiveItem[] = currentState

        if (currentState.length === 0) {
          action = 'add'
          project = getRandomProject(currentState)
        } else if (currentState.length === 1) {
          if (Math.random() < 0.5) {
            action = 'add'
            project = getRandomProject(currentState)
          } else {
            action = 'replace'
            project = getRandomProject([])
          }
        } else {
          const itemToRemove = currentState[randomInt(0, currentState.length - 1)]
          remainingItems = currentState.filter((item) => item.id !== itemToRemove.id)
          
          if (Math.random() < 0.5 && remainingItems.length === 1) {
            action = 'removeAndAdd'
            project = getRandomProject(remainingItems)
          } else {
            action = 'remove'
          }
        }

        // Handle removal immediately (no preloading needed)
        if (action === 'remove') {
          setActiveItems(remainingItems)
          scheduleNext()
          return
        }

        // Preload media for the project that will be displayed
        if (project) {
          await preloadProjectMedia(project)
          
          // After preloading, add the item
          const width = getRandomSize()
          const estimatedHeight = width * estimatedAspectRatio
          const position = getRandomPosition(
            width,
            estimatedHeight,
            action === 'removeAndAdd' ? remainingItems : action === 'replace' ? [] : currentState
          )
          
          const newItem: ActiveItem = {
            project,
            id: `${project.id}-${createdAt}-${Math.random()}`,
            x: position.x,
            y: position.y,
            size: width,
            moveX: movement.moveX,
            moveY: movement.moveY,
            duration: delay,
            createdAt,
          }

          if (action === 'add') {
            setActiveItems([...currentState, newItem])
          } else if (action === 'replace') {
            setActiveItems([newItem])
          } else if (action === 'removeAndAdd') {
            setActiveItems([...remainingItems, newItem])
          }
        }

        // Schedule next change after state update
        scheduleNext()
      }, delay)
    }

    // Initial item after a short delay - preload media first
    const initialTimeout = setTimeout(async () => {
      const initialDelay = random(4000, 10000) // Use same range for initial item
      const createdAt = Date.now()
      const movement = getRandomMovement(initialDelay)
      const estimatedAspectRatio = 9 / 16 // height/width for 16:9
      const project = getRandomProject([]) // No active items initially
      
      // Preload media before displaying
      await preloadProjectMedia(project)
      
      const width = getRandomSize()
      const estimatedHeight = width * estimatedAspectRatio
      const position = getRandomPosition(width, estimatedHeight, [])
      
      const newItem: ActiveItem = {
        project,
        id: `${project.id}-${createdAt}-${Math.random()}`,
        x: position.x,
        y: position.y,
        size: width,
        moveX: movement.moveX,
        moveY: movement.moveY,
        duration: initialDelay,
        createdAt,
      }
      
      setActiveItems([newItem])
      // Start scheduling after initial item
      scheduleNext()
    }, 2000) // Increased initial delay

    return () => {
      clearTimeout(initialTimeout)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [viewportSize.width, getRandomSize, getRandomPosition, getRandomProject, getRandomMovement, preloadProjectMedia])

  if (prefersReducedMotion.current || viewportSize.width === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {activeItems.map((item) => (
          <BackgroundMediaItem key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function BackgroundMediaItem({ item }: { item: ActiveItem }) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const imageRef = React.useRef<HTMLImageElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [mediaHeight, setMediaHeight] = React.useState<number | null>(null)

  // Get natural aspect ratio from loaded media
  React.useEffect(() => {
    const updateHeight = () => {
      const element = imageRef.current || videoRef.current
      if (!element) return

      const naturalWidth =
        ('naturalWidth' in element ? element.naturalWidth : element.videoWidth) ||
        item.size
      const naturalHeight =
        ('naturalHeight' in element ? element.naturalHeight : element.videoHeight) ||
        item.size
      
      if (naturalWidth > 0 && naturalHeight > 0) {
        const aspectRatio = naturalHeight / naturalWidth
        const calculatedHeight = item.size * aspectRatio
        setMediaHeight(calculatedHeight)
      } else {
        // Fallback to square if dimensions not available
        setMediaHeight(item.size)
      }
    }

    if (imageRef.current?.complete) {
      updateHeight()
    } else if ((videoRef.current?.readyState ?? 0) >= 2) {
      updateHeight()
    }

    const image = imageRef.current
    const video = videoRef.current

    if (image) {
      image.addEventListener('load', updateHeight)
    }
    if (video) {
      video.addEventListener('loadedmetadata', updateHeight)
    }

    return () => {
      if (image) image.removeEventListener('load', updateHeight)
      if (video) video.removeEventListener('loadedmetadata', updateHeight)
    }
  }, [item.size])

  // Intersection Observer to pause/play video
  React.useEffect(() => {
    if (!videoRef.current || !containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {
              // Ignore autoplay errors
            })
          } else {
            videoRef.current?.pause()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Get random media from arrays or single values
  const getRandomMedia = React.useMemo(() => {
    const images = Array.isArray(item.project.image)
      ? item.project.image
      : item.project.image
      ? [item.project.image]
      : []
    const videos = Array.isArray(item.project.video)
      ? item.project.video
      : item.project.video
      ? [item.project.video]
      : []

    const hasImage = images.length > 0
    const hasVideo = videos.length > 0

    // Randomly choose between image and video when both are available
    const useImage = hasImage && (!hasVideo || Math.random() > 0.5)

    return {
      image: hasImage ? images[randomInt(0, images.length - 1)] : null,
      video: hasVideo ? videos[randomInt(0, videos.length - 1)] : null,
      useImage,
    }
  }, [item.project])

  const hasImage = getRandomMedia.image !== null
  const hasVideo = getRandomMedia.video !== null
  const useImage = getRandomMedia.useImage

  // Use calculated height or fallback to square
  const displayHeight = mediaHeight ?? item.size

  // Calculate end position based on movement vector and duration
  const endX = item.x + (item.moveX * item.duration) / 1000
  const endY = item.y + (item.moveY * item.duration) / 1000

  return (
    <motion.div
      ref={containerRef}
      className="absolute will-change-transform flex flex-col"
      initial={{ opacity: 0, filter: 'blur(8px)', x: item.x, y: item.y }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
        x: endX,
        y: endY,
      }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{
        opacity: TRANSITION,
        filter: TRANSITION,
        x: {
          duration: item.duration / 1000,
          ease: 'linear',
        },
        y: {
          duration: item.duration / 1000,
          ease: 'linear',
        },
      }}
      style={{
        width: `${item.size}px`,
      }}
    >
      <div style={{ width: `${item.size}px`, height: `${displayHeight}px` }}>
      {useImage && hasImage && getRandomMedia.image ? (
        <img
          ref={imageRef}
          src={getRandomMedia.image}
          alt={item.project.name}
          className="w-full h-full object-cover rounded-lg opacity-60"
          loading="lazy"
          onError={(e) => {
            // Fallback to video if image fails to load
            if (hasVideo && getRandomMedia.video) {
              e.currentTarget.style.display = 'none'
              const video = e.currentTarget.nextElementSibling as HTMLVideoElement
              if (video) video.style.display = 'block'
            }
          }}
        />
      ) : null}
      {(!useImage || !hasImage) && hasVideo && getRandomMedia.video ? (
        <video
          ref={videoRef}
          src={getRandomMedia.video}
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-lg opacity-60"
          style={{ display: 'block' }}
          onError={(e) => {
            console.error('Video failed to load:', getRandomMedia.video)
          }}
        />
      ) : null}
      </div>
      <p className="font-(family-name:--font-sometype-mono) text-[12px] opacity-60 text-current mt-2 text-center truncate">
        {item.project.name}
      </p>
    </motion.div>
  )
}

