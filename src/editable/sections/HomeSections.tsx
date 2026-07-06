import Link from 'next/link'
import {
  ArrowUpRight, BookOpen, Building2, FileText, Library, Search, Sparkles,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getTaskTheme } from '@/editable/theme/task-themes'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { EditorialFeatureCard, getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { EditableMarquee } from '@/editable/shell/EditableMarquee'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: FileText,
  image: FileText,
  sbm: BookOpen,
  pdf: Library,
  profile: FileText,
}

// Renamed, user-facing label for a task — sourced from the task theme kicker so
// "Local Directory" / "Reference Library" stay consistent site-wide.
function taskLabel(task: TaskKey) {
  return getTaskTheme(task).kicker
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-8 lg:px-10'

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

/* ------------------------------- Hero band ------------------------------ */
export function EditableHomeHero({ posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover the best of ${SITE_CONFIG.name}`
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 6)
  const stats = [
    { value: `${pool.length}+`, label: 'Live entries' },
    { value: `${categories.length}`, label: 'Collections' },
    { value: '24/7', label: 'Open access' },
  ]

  return (
    <section className="relative">
      <div className="relative h-[560px] w-full overflow-hidden sm:h-[600px] lg:h-[660px]">
        <EditableHeroCollage images={heroImages} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,23,0.35)_0%,rgba(23,23,23,0.55)_55%,rgba(23,23,23,0.92)_100%)]" />
        <div className={`relative flex h-full flex-col justify-end pb-14 ${container}`}>
          <EditableReveal className="max-w-3xl text-white">
            <span className="editable-mono inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {pagesContent.home.hero.badge || 'Directory + Library'}
            </span>
            <h1 className="editable-display mt-6 text-balance text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[4rem] lg:text-[5.25rem]">
              {heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{pagesContent.home.hero.description}</p>

            <form action="/search" className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-full bg-white/95 p-2 pl-5 shadow-[0_24px_60px_-24px_rgba(23,23,23,0.7)] backdrop-blur">
              <Search className="h-5 w-5 shrink-0 text-[var(--slot4-muted-text)]" />
              <input
                name="q"
                placeholder={pagesContent.home.hero.searchPlaceholder || 'Search places, guides, reports…'}
                className="w-full bg-transparent py-2.5 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
              />
              <button className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-[0.94]">
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {categories.map((task) => (
                <Link
                  key={task.key}
                  href={task.route}
                  className="editable-mono rounded-full border border-white/25 bg-white/5 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm transition hover:bg-white/15"
                >
                  {taskLabel(task.key as TaskKey)}
                </Link>
              ))}
            </div>
          </EditableReveal>
        </div>
      </div>

      {/* Stats band derived from real feed data. */}
      <div className="border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
        <div className={`grid grid-cols-3 gap-4 py-8 sm:py-10 ${container}`}>
          {stats.map((stat, i) => (
            <EditableReveal key={stat.label} index={i} className="text-center sm:text-left">
              <p className="editable-display text-3xl font-bold tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-4xl">{stat.value}</p>
              <p className="editable-mono mt-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-muted-text)]">{stat.label}</p>
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------- Browse collections ------------------------- */
export function EditableStoryRail(_props: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled)
  if (!categories.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${dc.shell.sectionY} ${container}`}>
        <EditableReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className={dc.type.eyebrow}>◆ Start here</span>
            <h2 className={`${dc.type.sectionTitle} mt-4`}>Two ways to explore.</h2>
          </div>
          <p className={`${pal.mutedText} max-w-sm text-sm leading-relaxed`}>
            Jump into the local directory to find businesses near you, or open the reference library for download-ready guides and reports.
          </p>
        </EditableReveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {categories.map((task, i) => {
            const Icon = taskIcon[task.key] || FileText
            const theme = getTaskTheme(task.key as TaskKey)
            return (
              <EditableReveal key={task.key} index={i}>
                <Link
                  href={task.route}
                  className={`group flex h-full items-start gap-5 rounded-[16px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 ${dc.motion.lift}`}
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="editable-display text-xl font-bold tracking-[-0.01em]">{theme.kicker}</h3>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--slot4-muted-text)] transition group-hover:rotate-45 group-hover:text-[var(--slot4-accent)]" />
                    </div>
                    <p className={`mt-2 text-sm leading-relaxed ${pal.mutedText}`}>{theme.note}</p>
                  </div>
                </Link>
              </EditableReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------- Featured + recently added -------------------- */
function ActivityCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const category = getEditableCategory(post)
  const image = getEditablePostImage(post)
  return (
    <EditableReveal index={index}>
      <Link href={href} className={`group flex h-full flex-col overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
        <div className={`${dc.media.frame} aspect-[3/2]`}>
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-[600ms] group-hover:scale-[1.04]" loading="lazy" />
          {category ? (
            <span className="editable-mono absolute left-3 top-3 rounded-full bg-[var(--slot4-page-bg)]/90 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-page-text)]">{category}</span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="editable-display line-clamp-2 text-lg font-bold leading-[1.15] tracking-[-0.01em] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className={`mt-2 line-clamp-2 flex-1 text-sm leading-6 ${pal.mutedText}`}>{getEditableExcerpt(post, 130)}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)]">
            Open <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    </EditableReveal>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!activity.length) return null
  const [feature, ...rest] = activity
  const grid = rest.slice(0, 6)

  return (
    <section className="bg-[var(--slot4-warm)]">
      <div className={`${dc.shell.sectionY} ${container}`}>
        <EditableReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className={dc.type.eyebrow}>◆ Recently added</span>
            <h2 className={`${dc.type.sectionTitle} mt-4`}>Fresh finds across {SITE_CONFIG.name}.</h2>
          </div>
          <Link href={primaryRoute} className={dc.button.secondary}>
            Browse all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </EditableReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <EditableReveal>
            <EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} label={getEditableCategory(feature)} />
          </EditableReveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {grid.slice(0, 4).map((post, i) => (
              <ActivityCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------- Time-based discovery sections -------------------- */
const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: '◆ This week', title: 'New in the last 7 days' },
  browse: { eyebrow: '◆ Trending', title: 'Most-viewed this month' },
  index: { eyebrow: '◆ Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: '◆ Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-page-bg)]' : 'bg-[var(--slot4-warm)]'}>
            <div className={`${dc.shell.sectionY} ${container}`}>
              <EditableReveal className="flex items-end justify-between gap-4">
                <div>
                  <span className={dc.type.eyebrow}>{copy.eyebrow}</span>
                  <h2 className={`${dc.type.subTitle} mt-4`}>{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="editable-mono inline-flex shrink-0 items-center gap-1.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-accent)] hover:underline">
                  See all <ArrowUpRight className="h-4 w-4" />
                </Link>
              </EditableReveal>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post, i) => (
                  <ActivityCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={i} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  return (
    <section id="get-app" className="scroll-mt-24 bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
      <div className={`flex flex-col items-center gap-7 py-20 text-center sm:py-28 ${container}`}>
        <EditableReveal className="flex flex-col items-center gap-7">
          <span className="editable-mono inline-flex items-center gap-2 rounded-full border border-[var(--editable-dark-border)] px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white/70">
            ◆ {pagesContent.home.cta.badge || 'Get listed'}
          </span>
          <h2 className="editable-display max-w-3xl text-[2.5rem] font-bold leading-[1.03] tracking-[-0.02em] sm:text-[3.75rem]">
            {pagesContent.home.cta.title}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">{pagesContent.home.cta.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={pagesContent.home.cta.primaryCta.href} className="inline-flex items-center gap-2.5 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-[0.94]">
              {pagesContent.home.cta.primaryCta.label} <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href={pagesContent.home.cta.secondaryCta.href} className="inline-flex items-center gap-2.5 rounded-full border border-[var(--editable-dark-border)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
              {pagesContent.home.cta.secondaryCta.label}
            </Link>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}

/* ---------------------- Intro band with marquee kicker ------------------ */
/* Mirrors the reference's "Passionate about … we create solutions that simplify
   work and drive growth" band — dark full-bleed, marquee tag-overlay above,
   two-column intro with a big Sora headline and a supporting paragraph. */
export function EditableIntroBand() {
  return (
    <section className="bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
      <EditableMarquee tone="accent">
        <span className="text-[var(--slot4-on-accent)]">◆</span> {pagesContent.home.intro.badge} <span className="text-[var(--slot4-on-accent)]">◆</span> {SITE_CONFIG.name}
      </EditableMarquee>
      <div className={`${container} py-20 sm:py-28 lg:py-[130px]`}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <EditableReveal>
            <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ {pagesContent.home.intro.badge}</span>
            <h2 className="editable-display mt-6 text-[2.4rem] font-bold leading-[1.03] tracking-[-0.02em] sm:text-[3.5rem] lg:text-[4.5rem]">
              {pagesContent.home.intro.title.split('.').map((chunk, i, arr) => (
                <span key={i}>
                  {i === arr.length - 2 ? <span className="text-[var(--slot4-accent)]">{chunk}.</span> : `${chunk}${i === arr.length - 1 ? '' : '.'}`}
                </span>
              ))}
            </h2>
          </EditableReveal>
          <EditableReveal index={1} className="space-y-6 text-white/72">
            {pagesContent.home.intro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 sm:text-lg">{paragraph}</p>
            ))}
            <ul className="mt-8 grid gap-3 border-t border-[var(--editable-dark-border)] pt-8 sm:grid-cols-2">
              {pagesContent.home.intro.sidePoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm leading-6">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--slot4-accent)]" /> {point}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={pagesContent.home.intro.primaryLink.href} className="inline-flex items-center gap-2.5 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-[0.94]">
                {pagesContent.home.intro.primaryLink.label} <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href={pagesContent.home.intro.secondaryLink.href} className="inline-flex items-center gap-2.5 rounded-full border border-[var(--editable-dark-border)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                {pagesContent.home.intro.secondaryLink.label}
              </Link>
            </div>
          </EditableReveal>
        </div>
      </div>
      <EditableMarquee tone="accent">
        <span className="text-[var(--slot4-on-accent)]">◆</span> Local Directory <span className="text-[var(--slot4-on-accent)]">◆</span> Reference Library
      </EditableMarquee>
    </section>
  )
}

/* ----------------------------- Process steps ---------------------------- */
/* White band with three numbered steps — the reference's "move" pattern
   (huge numerals + short title + supporting body, alternating rhythm). */
export function EditableProcess() {
  const steps = [
    { num: '01', title: 'Search or browse', body: 'Start from the directory or open the library — search spans both places and references.' },
    { num: '02', title: 'Open an entry', body: 'Every listing carries verified contact details; every reference carries a preview and download.' },
    { num: '03', title: 'Take the next step', body: 'Call the business, download the file, or save it for later. No accounts required to browse.' },
  ]
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${container} py-20 sm:py-28 lg:py-[130px]`}>
        <EditableReveal className="max-w-3xl">
          <span className={dc.type.eyebrow}>◆ How it works</span>
          <h2 className={`${dc.type.sectionTitle} mt-6`}>
            Three steps from search to <span className={dc.type.emphasis}>the thing you need.</span>
          </h2>
        </EditableReveal>
        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {steps.map((step, i) => (
            <EditableReveal key={step.num} index={i} className={`flex flex-col rounded-[16px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 ${dc.motion.lift} sm:p-10`}>
              <span className="editable-display text-[3.5rem] font-extrabold leading-none tracking-[-0.03em] text-[var(--slot4-accent)] sm:text-[4.5rem]">{step.num}</span>
              <h3 className="editable-display mt-6 text-[1.5rem] font-bold leading-[1.15] tracking-[-0.015em] sm:text-[1.75rem]">{step.title}</h3>
              <p className={`mt-3 text-base leading-7 ${pal.mutedText}`}>{step.body}</p>
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
