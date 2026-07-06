'use client'

import { Bookmark, Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { EditableMarquee } from '@/editable/shell/EditableMarquee'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-8 lg:px-10'

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
      { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
      { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
      { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
      { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
      { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
      { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
    { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
    { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
  ]
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className={`${container} pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36`}>
          <EditableReveal className="max-w-4xl">
            <span className={dc.type.eyebrow}>◆ {pagesContent.contact.eyebrow}</span>
            <h1 className="editable-display mt-6 text-balance text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[4.25rem] lg:text-[5.5rem]">
              {pagesContent.contact.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)] sm:text-xl">{pagesContent.contact.description}</p>
          </EditableReveal>
        </section>

        <EditableMarquee tone="accent">
          <span className="text-[var(--slot4-on-accent)]">◆</span> Talk to us <span className="text-[var(--slot4-on-accent)]">◆</span> We reply within a day
        </EditableMarquee>

        {/* Lanes + form */}
        <section className={`${container} py-20 sm:py-24 lg:py-[120px]`}>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <div className="space-y-4">
              <EditableReveal>
                <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ Ways to reach us</span>
                <h2 className={`${dc.type.subTitle} mt-5`}>Pick the lane that fits.</h2>
              </EditableReveal>
              <div className="mt-6 space-y-4">
                {lanes.map((lane, i) => (
                  <EditableReveal key={lane.title} index={i}>
                    <article className={`flex items-start gap-5 rounded-[16px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 ${dc.motion.lift}`}>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><lane.icon className="h-5 w-5" /></span>
                      <div className="min-w-0">
                        <h3 className="editable-display text-xl font-bold tracking-[-0.01em]">{lane.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                      </div>
                    </article>
                  </EditableReveal>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 lg:p-10">
              <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ Send a message</span>
              <h2 className="editable-display mt-4 text-[2rem] font-bold tracking-[-0.015em]">{pagesContent.contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
