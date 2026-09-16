import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Wires a scroll-snap container to a set of slides: tracks which slide is
 * on screen and exposes an imperative `goTo`.
 *
 * Scrolling the container directly (rather than `scrollIntoView`) keeps the
 * fixed header and nav rail out of the calculation and is the reliable path
 * on iOS Safari.
 */
export function useSlideDeck(count: number) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)

  const registerSlide = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      slideRefs.current[index] = el
    },
    [],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio <= 0.5) continue
          const index = slideRefs.current.indexOf(entry.target as HTMLElement)
          if (index !== -1) setActive(index)
        }
      },
      { root: container, threshold: [0.5] },
    )

    const observed = slideRefs.current.slice(0, count).filter(Boolean)
    observed.forEach((slide) => observer.observe(slide as HTMLElement))

    return () => observer.disconnect()
  }, [count])

  const goTo = useCallback((index: number) => {
    const container = containerRef.current
    const slide = slideRefs.current[index]
    if (!container || !slide) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    container.scrollTo({
      top: slide.offsetTop,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
    setActive(index)
  }, [])

  const goPrev = useCallback(
    () => goTo(Math.max(0, active - 1)),
    [active, goTo],
  )
  const goNext = useCallback(
    () => goTo(Math.min(count - 1, active + 1)),
    [active, count, goTo],
  )

  return { containerRef, registerSlide, active, goTo, goPrev, goNext }
}
