import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

// Small trailing arrow badge — the reference's signature button/link affordance.
function ArrowBadge({ tone = 'light' }: { tone?: 'light' | 'accent' }) {
  const cls =
    tone === 'accent'
      ? 'bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)]'
      : 'bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)]'
  return (
    <span className={`flex h-8 w-8 items-center justify-center rounded-full ${cls} transition duration-300 group-hover:rotate-45`}>
      <ArrowUpRight className="h-4 w-4" />
    </span>
  )
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.dark} ${dc.motion.lift}`}>
      <div className="relative min-h-[480px] p-7 sm:p-9 lg:min-h-[600px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-[600ms] group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,23,0.1),rgba(23,23,23,0.88))]" />
        <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end lg:min-h-[540px]">
          <span className="editable-mono inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">
            {label}
          </span>
          <h3 className="editable-display mt-5 max-w-3xl text-[2.4rem] font-bold leading-[1.02] tracking-[-0.02em] sm:text-[3.25rem] lg:text-[3.75rem]">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-[var(--slot4-page-bg)] px-5 py-3 text-sm font-semibold text-[var(--slot4-page-text)]">
            Read story <ArrowBadge tone="accent" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className={`${dc.media.frame} ${dc.media.ratio}`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-[600ms] group-hover:scale-[1.04]" />
        <span className="editable-mono absolute left-3 top-3 rounded-full bg-[var(--slot4-page-text)]/85 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-page-bg)]">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-5">
        <p className="editable-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className={`editable-display mt-3 line-clamp-3 text-xl font-bold leading-[1.15] tracking-[-0.01em] ${pal.panelText}`}>{post.title}</h3>
        <p className={`mt-3 line-clamp-3 text-sm leading-6 ${pal.mutedText}`}>{getEditableExcerpt(post, 135)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 ${dc.surface.soft} p-5 ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className="editable-mono flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] text-sm font-medium text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
        <div className="min-w-0">
          <p className="editable-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
          <h3 className={`editable-display mt-2 line-clamp-2 text-lg font-bold leading-[1.15] tracking-[-0.01em] ${pal.panelText}`}>{post.title}</h3>
          <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.mutedText}`}>{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[240px_minmax(0,1fr)]`}>
      <div className={`${dc.media.frame} aspect-[16/12] sm:aspect-auto sm:min-h-[200px]`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-[600ms] group-hover:scale-[1.04]" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="editable-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-accent)]">Read {String(index + 1).padStart(2, '0')}</p>
        <h2 className={`editable-display mt-3 line-clamp-3 text-2xl font-bold leading-[1.1] tracking-[-0.015em] ${pal.panelText} sm:text-[1.75rem]`}>{post.title}</h2>
        <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2.5 text-sm font-semibold text-[var(--slot4-page-text)]">Open <ArrowBadge /></span>
      </div>
    </Link>
  )
}
