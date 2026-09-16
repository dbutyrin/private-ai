import type { ReactNode, Ref } from 'react'

type SlideProps = {
  /** Matches the design's section name; the global sheet keys off it. */
  label: string
  /** Section module class, which sets `--slide-gap` / `--slide-pad-bottom`. */
  className?: string
  id?: string
  /** The "01 — The premise" label, pinned top-left by the slide frame. */
  kicker?: string
  ref?: Ref<HTMLElement>
  children: ReactNode
}

export function Slide({
  label,
  className,
  id,
  kicker,
  ref,
  children,
}: SlideProps) {
  return (
    <section
      ref={ref}
      id={id}
      data-screen-label={label}
      className={className ? `slide ${className}` : 'slide'}
    >
      {kicker ? <span className="kicker">{kicker}</span> : null}
      {children}
    </section>
  )
}
