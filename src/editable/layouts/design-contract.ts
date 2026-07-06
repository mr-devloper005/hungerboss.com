import type { CSSProperties } from 'react'

/*
  Design contract — mapped from the quriss.webflow.io reference.

  Aesthetic: warm CREAM canvas (#f1ede9), near-black ink (#161616), ONE vivid
  coral accent (#ff5a33), dark full-bleed sections (#171717). Huge Sora display
  type, IBM Plex Mono eyebrows/labels, Geist body. PILL buttons with a trailing
  circular arrow. Borderless image-forward cards. Smooth (not bouncy) reveals.

  Every downstream component consumes these via the `--slot4-*` / `--editable-*`
  CSS variables, so the whole site re-skins from this one file.
*/

export const editableRootStyle = {
  // Quriss system: warm cream page, near-black ink, single coral accent.
  '--slot4-page-bg': '#f1ede9',
  '--slot4-page-text': '#161616',
  '--slot4-panel-bg': '#ece6df',
  '--slot4-surface-bg': '#faf7f3',
  '--slot4-muted-text': '#575757',
  '--slot4-soft-muted-text': '#7d7d7d',
  '--slot4-accent': '#ff5a33',
  '--slot4-accent-fill': '#ff5a33',
  '--slot4-accent-soft': '#ffe7e0',
  '--slot4-on-accent': '#ffffff',
  '--slot4-dark-bg': '#171717',
  '--slot4-dark-text': '#f4f1ec',
  '--slot4-media-bg': '#e4ddd3',
  '--slot4-cream': '#f1ede9',
  '--slot4-warm': '#eae3da',
  '--slot4-lavender': '#f1ede9',
  '--slot4-gray': '#ece6df',
  '--slot4-body-gradient': 'none',
  '--editable-page-bg': '#f1ede9',
  '--editable-page-text': '#161616',
  '--editable-container': '1240px',
  '--editable-border': '#d8d0c6',
  '--editable-dark-border': '#454545',
  '--editable-nav-bg': '#f1ede9',
  '--editable-nav-text': '#161616',
  '--editable-nav-active': '#ff5a33',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#ff5a33',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#faf7f3',
  '--editable-footer-bg': '#171717',
  '--editable-footer-text': '#f4f1ec',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-[var(--editable-dark-border)]',
  shadow: 'shadow-[0_1px_2px_rgba(23,23,23,0.05)]',
  shadowStrong: 'shadow-[0_24px_60px_-32px_rgba(23,23,23,0.45)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(23,23,23,0.05),rgba(23,23,23,0.78))]',
} as const

// Mono eyebrow font applied inline so components stay declarative.
const MONO = 'font-[family-name:var(--editable-font-mono)]'

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-8 lg:px-10',
    sectionY: 'py-16 sm:py-20 lg:py-[100px]',
    sectionYLg: 'py-20 sm:py-28 lg:py-[150px]',
    sectionYSm: 'py-12 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[200px] shrink-0 snap-start sm:w-[230px]',
  },
  type: {
    eyebrow: `${MONO} inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]`,
    label: `${MONO} text-[0.72rem] font-medium uppercase tracking-[0.16em]`,
    heroTitle:
      'editable-display text-[3rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[4.25rem] lg:text-[6rem]',
    sectionTitle:
      'editable-display text-[2.4rem] font-bold leading-[1.05] tracking-[-0.02em] sm:text-[3.25rem] lg:text-[4.25rem]',
    subTitle: 'editable-display text-[1.9rem] font-bold leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem]',
    body: 'text-base leading-[1.65] text-[var(--slot4-muted-text)] sm:text-[1.05rem]',
    // Emphasis in this reference = a word painted in the coral accent (not italic).
    emphasis: 'text-[var(--slot4-accent)]',
  },
  surface: {
    card: `rounded-[16px] border ${editablePalette.border} ${editablePalette.surfaceBg} overflow-hidden`,
    soft: `rounded-[16px] border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-[16px] ${editablePalette.darkBg} ${editablePalette.darkText}`,
  },
  button: {
    // Pill buttons (radius 70px) — the reference's dominant shape.
    primary:
      'group inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-[0.94] active:scale-[0.98]',
    secondary:
      'group inline-flex items-center justify-center gap-2.5 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-page-text)] active:scale-[0.98]',
    accent:
      'group inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--slot4-dark-bg)] px-6 py-3 text-sm font-semibold text-[var(--slot4-dark-text)] transition duration-300 hover:brightness-125 active:scale-[0.98]',
    ghost:
      'group inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)] underline-offset-[6px] transition duration-300 hover:text-[var(--slot4-accent)] hover:underline',
  },
  badge: {
    pill: `${MONO} inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-page-text)]`,
    accentPill: `${MONO} inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-on-accent)]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-[14px] ${editablePalette.mediaBg}`,
    frameFull: `relative overflow-hidden ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(23,23,23,0.4)]',
    fade: 'transition duration-300 hover:opacity-80',
    zoom: 'transition duration-[600ms] group-hover:scale-[1.04]',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
