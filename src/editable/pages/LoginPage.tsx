import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { EditableMarquee } from '@/editable/shell/EditableMarquee'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

const perks = [
  'Save places and references to your list.',
  'Submit a listing or upload a reference.',
  'Get notified when new entries land.',
] as const

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <EditableMarquee tone="accent">
          <span className="text-[var(--slot4-on-accent)]">◆</span> Sign in <span className="text-[var(--slot4-on-accent)]">◆</span> Continue where you left off
        </EditableMarquee>
        <section className="mx-auto grid min-h-[calc(100vh-14rem)] max-w-[var(--editable-container)] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:py-28">
          <EditableReveal>
            <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ {pagesContent.auth.login.badge}</span>
            <h1 className="editable-display mt-6 max-w-xl text-[2.75rem] font-extrabold leading-[1.03] tracking-[-0.02em] sm:text-[4rem] lg:text-[4.75rem]">
              Welcome <span className="text-[var(--slot4-accent)]">back.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.auth.login.description}</p>
            <ul className="mt-10 grid gap-3 border-t border-[var(--editable-border)] pt-8">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm leading-6 text-[var(--slot4-muted-text)]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--slot4-accent)]" /> {perk}
                </li>
              ))}
            </ul>
          </EditableReveal>
          <div className="rounded-[20px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 sm:p-9 lg:p-10">
            <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ Sign in</span>
            <h2 className="editable-display mt-4 text-2xl font-bold tracking-[-0.01em]">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="inline-flex items-center gap-1 font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta} <ArrowUpRight className="h-3.5 w-3.5" /></Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
