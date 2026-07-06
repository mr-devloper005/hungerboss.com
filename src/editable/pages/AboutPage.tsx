import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { EditableMarquee } from '@/editable/shell/EditableMarquee'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-8 lg:px-10'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className={`${container} pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36`}>
          <EditableReveal className="max-w-4xl">
            <span className={dc.type.eyebrow}>◆ {pagesContent.about.badge}</span>
            <h1 className="editable-display mt-6 text-balance text-[3rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[4.5rem] lg:text-[6rem]">
              About <span className="text-[var(--slot4-accent)]">{SITE_CONFIG.name}.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)] sm:text-xl">{pagesContent.about.description}</p>
          </EditableReveal>
        </section>

        {/* Marquee band */}
        <EditableMarquee tone="accent">
          <span className="text-[var(--slot4-on-accent)]">◆</span> Directory + Reference Library <span className="text-[var(--slot4-on-accent)]">◆</span> Since day one
        </EditableMarquee>

        {/* Story */}
        <section className={`${container} py-20 sm:py-24 lg:py-[120px]`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <EditableReveal>
              <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ Our story</span>
              <h2 className={`${dc.type.sectionTitle} mt-6`}>
                A calmer way to find <span className={dc.type.emphasis}>places and references.</span>
              </h2>
            </EditableReveal>
            <div className="space-y-6 text-base leading-8 text-[var(--slot4-muted-text)] sm:text-lg">
              {pagesContent.about.paragraphs.map((paragraph, i) => (
                <EditableReveal key={paragraph} index={i}>
                  <p>{paragraph}</p>
                </EditableReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Values — bordered lift cards */}
        <section className="bg-[var(--slot4-warm)]">
          <div className={`${container} py-20 sm:py-24 lg:py-[120px]`}>
            <EditableReveal className="max-w-3xl">
              <span className={dc.type.eyebrow}>◆ What we care about</span>
              <h2 className={`${dc.type.subTitle} mt-6`}>Principles that shape the work.</h2>
            </EditableReveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {pagesContent.about.values.map((value, i) => (
                <EditableReveal key={value.title} index={i}>
                  <article className={`h-full rounded-[16px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 ${dc.motion.lift}`}>
                    <span className="editable-display text-[2.75rem] font-extrabold leading-none tracking-[-0.03em] text-[var(--slot4-accent)]">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="editable-display mt-6 text-xl font-bold tracking-[-0.01em]">{value.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </article>
                </EditableReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Dark CTA band */}
        <section className="bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
          <div className={`${container} flex flex-col items-start gap-8 py-20 sm:py-24 lg:flex-row lg:items-center lg:justify-between`}>
            <EditableReveal className="max-w-2xl">
              <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ Get in touch</span>
              <h2 className="editable-display mt-5 text-[2.25rem] font-bold leading-[1.05] tracking-[-0.02em] sm:text-[3rem]">
                Have a question or a place to add? <span className="text-[var(--slot4-accent)]">We&apos;d love to hear.</span>
              </h2>
            </EditableReveal>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-[0.94]">
                Contact us <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/create" className="inline-flex items-center gap-2.5 rounded-full border border-[var(--editable-dark-border)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Submit an entry
              </Link>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
