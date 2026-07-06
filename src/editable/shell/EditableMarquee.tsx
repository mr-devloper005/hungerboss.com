'use client'

import type { ReactNode } from 'react'

type EditableMarqueeProps = {
  /** Repeated label — e.g. "◆ Recently added ◆ Recently added …" */
  children: ReactNode
  /** Total repeats per track (defaults to 6). */
  repeat?: number
  /** Optional tone override (default: coral accent). */
  tone?: 'accent' | 'ink' | 'cream'
  className?: string
}

/*
  Marquee tag-overlay — the reference's signature horizontally-scrolling label
  band. Two duplicated tracks give a seamless loop; motion pauses under
  prefers-reduced-motion. Pure CSS, no JS scroll math.
*/
export function EditableMarquee({ children, repeat = 6, tone = 'accent', className = '' }: EditableMarqueeProps) {
  const items = Array.from({ length: repeat })
  const toneClass =
    tone === 'accent'
      ? 'bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)]'
      : tone === 'ink'
        ? 'bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]'
        : 'bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]'
  return (
    <div className={`editable-marquee relative w-full overflow-hidden ${toneClass} ${className}`}>
      <div className="editable-marquee-track flex min-w-max py-3.5">
        {items.concat(items).map((_, i) => (
          <span
            key={i}
            className="editable-mono flex shrink-0 items-center gap-4 px-5 text-[0.72rem] font-medium uppercase tracking-[0.16em]"
            aria-hidden={i >= repeat}
          >
            {children}
          </span>
        ))}
      </div>
    </div>
  )
}
