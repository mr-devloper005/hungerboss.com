import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Task surfaces — one shared visual language (mapped from quriss.webflow.io).

  Every task (archive + detail) shares one cohesive identity: warm cream
  surfaces, near-black ink, a single coral accent (#ff5a33), Sora display + Geist
  body. Only the per-task copy (kicker / note) varies so each section keeps a
  little voice. Tokens are delivered via CSS variables (`--tk-*`).
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY = "'Sora', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
const BODY = "'Geist', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

// Shared Quriss palette — every task inherits this; only kicker/note differ.
const base = {
  dark: false,
  fontDisplay: DISPLAY,
  fontBody: BODY,
  bg: '#f1ede9',
  surface: '#faf7f3',
  raised: '#ece6df',
  text: '#161616',
  muted: '#575757',
  line: '#d8d0c6',
  accent: '#ff5a33',
  accentSoft: '#ffe7e0',
  onAccent: '#ffffff',
  glow: 'rgba(255,90,51,0.08)',
  radius: '1rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Field Notes', note: 'In-depth reads, guides and stories worth your time.' },
  listing: { ...base, kicker: 'Local Directory', note: 'Find, compare and connect with businesses near you.' },
  classified: { ...base, kicker: 'Notice Board', note: 'Fresh offers and postings, ready to act on.' },
  image: { ...base, kicker: 'Visual Desk', note: 'A visual feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Saved Links', note: 'Curated resources and links worth keeping.' },
  pdf: { ...base, kicker: 'Reference Library', note: 'Download-ready guides, reports and reference files.' },
  profile: { ...base, kicker: 'Profiles', note: 'Discover the people and teams behind the work.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    // Re-point the shared article-body accent vars so post HTML (headings,
    // links) inherits this task's accent instead of the global site accent.
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
