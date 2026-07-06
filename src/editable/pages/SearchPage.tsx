import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { Ads, getSlotSizes } from '@/lib/ads'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { EditableMarquee } from '@/editable/shell/EditableMarquee'
import { getTaskTheme } from '@/editable/theme/task-themes'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

const pickRandom = (sizes: string[]) => sizes[Math.floor(Math.random() * sizes.length)]

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => {
  const raw = post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''
  return stripHtml(raw).replace(/\s+/g, ' ').trim()
}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

// Renamed, user-facing label for a task (never the raw task config label).
const labelFor = (task: TaskKey | null) => task ? getTaskTheme(task).kicker : 'Result'

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const label = labelFor(task)
  const strong = index % 5 === 0

  return (
    <EditableReveal index={index % 6}>
      <Link href={href} className={`group block h-full overflow-hidden rounded-[16px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(23,23,23,0.4)] ${strong ? 'md:col-span-2' : ''}`}>
        {image ? (
          <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
            <img src={image} alt="" className="h-full w-full object-cover transition duration-[600ms] group-hover:scale-[1.04]" />
            <span className="editable-mono absolute left-4 top-4 rounded-full bg-[var(--slot4-page-bg)]/90 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-page-text)]">{label}</span>
          </div>
        ) : null}
        <div className="p-5 sm:p-6">
          {!image ? <span className="editable-mono rounded-full bg-[var(--slot4-page-text)] px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-page-bg)]">{label}</span> : null}
          <h2 className="editable-display mt-4 line-clamp-3 text-2xl font-bold leading-[1.1] tracking-[-0.015em] text-[var(--slot4-page-text)]">{post.title}</h2>
          {summary ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{summary}</p> : null}
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)]">Open <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" /></span>
        </div>
      </Link>
    </EditableReveal>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-5 pt-20 pb-10 sm:px-8 sm:pt-28 lg:px-10 lg:pt-36">
          <EditableReveal className="max-w-4xl">
            <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ {pagesContent.search.hero.badge}</span>
            <h1 className="editable-display mt-6 text-balance text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[4.5rem] lg:text-[5.5rem]">{pagesContent.search.hero.title}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)] sm:text-xl">{pagesContent.search.hero.description}</p>
          </EditableReveal>
        </section>

        <EditableMarquee tone="accent">
          <span className="text-[var(--slot4-on-accent)]">◆</span> Places <span className="text-[var(--slot4-on-accent)]">◆</span> References <span className="text-[var(--slot4-on-accent)]">◆</span> One search
        </EditableMarquee>

        <section className="mx-auto max-w-[var(--editable-container)] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-8 rounded-[20px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 md:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <div>
              <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ Refine your search</span>
              <h2 className="editable-display mt-5 text-[2rem] font-bold leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem]">Narrow by keyword, category, or collection.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">Search spans the whole directory + library. Filter by collection to keep to places or references only.</p>
            </div>
            <form action="/search" className="self-end rounded-[16px] border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] p-4 sm:p-5">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-3">
                <Search className="h-5 w-5 text-[var(--slot4-muted-text)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-[var(--slot4-muted-text)]" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3">
                  <Filter className="h-4 w-4 text-[var(--slot4-muted-text)]" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-muted-text)]" />
                </label>
                <select name="task" defaultValue={task} className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm font-medium outline-none">
                  <option value="">All collections</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{getTaskTheme(item.key as TaskKey).kicker}</option>)}
                </select>
              </div>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] px-6 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-[0.94]" type="submit">Search</button>
            </form>
          </div>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-muted-text)]">{results.length} results</span>
              <h2 className="editable-display mt-2 text-3xl font-bold tracking-[-0.02em]">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/listing" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--slot4-page-text)]">Browse the directory <ArrowUpRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-[20px] border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-12 text-center">
              <p className="editable-display text-2xl font-bold tracking-[-0.02em]">No matching results.</p>
              <p className="mt-3 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, collection, or category.</p>
            </div>
          )}

          <div className="mt-14">
            <Ads slot="footer" size={pickRandom(getSlotSizes('footer'))} showLabel />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
