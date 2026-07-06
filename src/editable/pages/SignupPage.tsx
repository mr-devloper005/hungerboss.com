import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { EditableMarquee } from '@/editable/shell/EditableMarquee'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

const steps = [
  { num: '01', title: 'Create an account', body: 'Name, email, password — the essentials.' },
  { num: '02', title: 'Choose what to add', body: 'A local business or a reference file.' },
  { num: '03', title: 'Publish', body: 'Your entry lands in the collection right away.' },
] as const

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <EditableMarquee tone="accent">
          <span className="text-[var(--slot4-on-accent)]">◆</span> Get started <span className="text-[var(--slot4-on-accent)]">◆</span> Free to submit
        </EditableMarquee>
        <section className="mx-auto grid min-h-[calc(100vh-14rem)] max-w-[var(--editable-container)] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="order-2 rounded-[20px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 sm:p-9 lg:order-1 lg:p-10">
            <span className="editable-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">◆ Create account</span>
            <h1 className="editable-display mt-4 text-2xl font-bold tracking-[-0.01em]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">Already have an account? <Link href="/login" className="inline-flex items-center gap-1 font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta} <ArrowUpRight className="h-3.5 w-3.5" /></Link></p>
          </div>
          <EditableReveal className="order-1 lg:order-2">
            <span className="editable-mono inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--slot4-accent)]">
              <Sparkles className="h-3.5 w-3.5" /> {pagesContent.auth.signup.badge}
            </span>
            <h2 className="editable-display mt-6 max-w-xl text-[2.75rem] font-extrabold leading-[1.03] tracking-[-0.02em] sm:text-[4rem] lg:text-[4.75rem]">
              Start <span className="text-[var(--slot4-accent)]">publishing.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.auth.signup.description}</p>
            <ol className="mt-10 grid gap-4 border-t border-[var(--editable-border)] pt-8">
              {steps.map((step) => (
                <li key={step.num} className="flex items-start gap-4">
                  <span className="editable-display shrink-0 text-2xl font-extrabold tracking-[-0.02em] text-[var(--slot4-accent)]">{step.num}</span>
                  <div>
                    <h3 className="editable-display text-base font-bold tracking-[-0.01em]">{step.title}</h3>
                    <p className="mt-0.5 text-sm leading-6 text-[var(--slot4-muted-text)]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </EditableReveal>
        </section>
      </main>
    </EditableSiteShell>
  )
}
