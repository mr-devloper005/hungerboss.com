'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, BookOpen, Building2, CheckCircle2, FileText, ImageIcon, Library, Lock, PlusCircle, Send } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableMarquee } from '@/editable/shell/EditableMarquee'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { getTaskTheme } from '@/editable/theme/task-themes'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: PlusCircle,
  image: ImageIcon,
  profile: FileText,
  pdf: Library,
  sbm: BookOpen,
}

const fieldClass = 'rounded-[14px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm font-medium text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-muted-text)] focus:border-[var(--slot4-accent)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--slot4-page-bg)] px-5 py-16 text-[var(--slot4-page-text)] sm:px-8 lg:px-10">
          <section className="mx-auto grid max-w-5xl gap-8 rounded-[20px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="flex h-full min-h-72 items-center justify-center rounded-[16px] bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center">
              <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ {pagesContent.create.locked.badge}</span>
              <h1 className="editable-display mt-5 text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[3.75rem]">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-[0.94]">Sign in <ArrowUpRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--slot4-page-text)]">Get started</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-5 pt-20 pb-10 sm:px-8 sm:pt-28 lg:px-10 lg:pt-32">
          <EditableReveal className="max-w-4xl">
            <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ {pagesContent.create.hero.badge}</span>
            <h1 className="editable-display mt-6 text-balance text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[4.25rem] lg:text-[5.5rem]">{pagesContent.create.hero.title}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)] sm:text-xl">{pagesContent.create.hero.description}</p>
          </EditableReveal>
        </section>
        <EditableMarquee tone="accent">
          <span className="text-[var(--slot4-on-accent)]">◆</span> Submit an entry <span className="text-[var(--slot4-on-accent)]">◆</span> Live in minutes
        </EditableMarquee>
        <section className="mx-auto max-w-[var(--editable-container)] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-8 rounded-[20px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <aside>
              <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ Choose a collection</span>
              <h2 className="editable-display mt-5 text-[2rem] font-bold leading-[1.1] tracking-[-0.015em] sm:text-[2.25rem]">Pick where your entry lives.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">Each collection is scoped to a different kind of entry. Pick one to open the right fields.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  const theme = getTaskTheme(item.key as TaskKey)
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-[14px] border p-4 text-left transition ${active ? 'border-[var(--slot4-accent)] bg-[var(--slot4-accent-soft)]' : 'border-[var(--editable-border)] bg-[var(--slot4-page-bg)] hover:-translate-y-0.5'}`}>
                      <Icon className={`h-5 w-5 ${active ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-muted-text)]'}`} />
                      <span className="editable-display mt-3 block text-sm font-bold">{theme.kicker}</span>
                      <span className="mt-1 block text-xs leading-5 text-[var(--slot4-muted-text)]">{theme.note}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="rounded-[16px] border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="editable-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-muted-text)]">New {getTaskTheme((activeTask?.key || 'article') as TaskKey).kicker} entry</span>
                  <h2 className="editable-display mt-1 text-3xl font-bold tracking-[-0.02em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="editable-mono rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.12em]">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 flex items-start gap-2 rounded-[14px] border border-[var(--slot4-accent)]/30 bg-[var(--slot4-accent-soft)] p-4 text-[var(--slot4-page-text)]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                  <div>
                    <p className="text-sm font-semibold">{pagesContent.create.successTitle}</p>
                    <p className="mt-1 text-sm text-[var(--slot4-muted-text)]">{created.title}</p>
                  </div>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-[0.94]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
