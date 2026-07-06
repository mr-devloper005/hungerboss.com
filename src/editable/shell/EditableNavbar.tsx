'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

// Static, non-task navigation only. The directory / library archives are
// intentionally kept OUT of the nav — discovery lives in the footer and home.
const STATIC_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  // Deepen the shadow once the page scrolls — subtle lift, matches the ref.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change.
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-3 z-50 w-full sm:top-4">
      <div className="mx-auto w-full max-w-[calc(var(--editable-container)+2rem)] px-3 sm:px-4">
        {/* The command-bar capsule — logo, links, inline search, actions,
            all inside a single rounded-full pill. */}
        <div
          className={`flex items-center gap-1.5 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)]/85 p-1.5 backdrop-blur-xl transition-shadow duration-500 sm:gap-2 sm:p-2 ${
            scrolled
              ? 'shadow-[0_24px_60px_-32px_rgba(23,23,23,0.45)]'
              : 'shadow-[0_8px_24px_-18px_rgba(23,23,23,0.25)]'
          }`}
        >
          {/* Logo pill */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 rounded-full px-3 py-2 transition hover:bg-[var(--slot4-warm)]/60 sm:px-3.5">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain"/>
            <span className="editable-display max-w-[160px] truncate text-[0.95rem] font-bold tracking-[-0.01em] text-[var(--slot4-page-text)]">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Static nav links — hidden on small screens */}
          <div className="ml-0.5 hidden items-center lg:flex">
            {STATIC_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`editable-mono rounded-full px-3.5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] transition ${
                  isActive(item.href)
                    ? 'bg-[var(--slot4-warm)] text-[var(--slot4-page-text)]'
                    : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-warm)]/60 hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Inline search — always visible; grows to fill available space. */}
          <form
            action="/search"
            className="ml-1 hidden min-w-0 flex-1 items-center gap-2 rounded-full bg-[var(--slot4-surface-bg)] px-4 py-2 ring-1 ring-inset ring-transparent transition focus-within:ring-[var(--slot4-accent)]/40 md:flex"
          >
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder="Search places, guides, reports…"
              aria-label="Search"
              className="min-w-0 flex-1 bg-transparent text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </form>

          {/* Mobile-visible search icon (opens the search page) */}
          <Link
            href="/search"
            aria-label="Search"
            className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-surface-bg)] text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-warm)] md:hidden"
          >
            <Search className="h-4 w-4" />
          </Link>

          {/* Auth actions */}
          <div className="ml-0.5 hidden shrink-0 items-center gap-1.5 md:flex">
            {session ? (
              <>
                <button
                  type="button"
                  onClick={logout}
                  className="editable-mono hidden rounded-full px-3.5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] lg:inline-flex"
                >
                  Logout
                </button>
                <Link
                  href="/create"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--slot4-page-text)] px-4 py-2.5 text-[0.8rem] font-semibold text-[var(--slot4-page-bg)] transition hover:opacity-90"
                >
                  Submit
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)]">
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="editable-mono hidden rounded-full px-3.5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] lg:inline-flex"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--slot4-page-text)] px-4 py-2.5 text-[0.8rem] font-semibold text-[var(--slot4-page-bg)] transition hover:opacity-90"
                >
                  Get started
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)]">
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)] transition hover:opacity-90 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile sheet */}
        {open ? (
          <div className="mt-2 rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-page-bg)]/95 p-4 shadow-[0_24px_60px_-32px_rgba(23,23,23,0.45)] backdrop-blur-xl md:hidden">
            <form action="/search" className="flex items-center gap-2 rounded-full bg-[var(--slot4-surface-bg)] px-4 py-3">
              <Search className="h-4 w-4 text-[var(--slot4-muted-text)]" />
              <input
                name="q"
                type="search"
                placeholder="Search places, guides, reports…"
                aria-label="Search"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]"
              />
            </form>
            <div className="mt-3 grid gap-1">
              {[{ label: 'Home', href: '/' }, ...STATIC_LINKS].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`editable-mono rounded-2xl px-4 py-3 text-[0.78rem] font-medium uppercase tracking-[0.14em] transition ${
                    isActive(item.href)
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-warm)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 grid gap-2 border-t border-[var(--editable-border)] pt-4">
              {session ? (
                <>
                  <Link
                    href="/create"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-3 text-sm font-semibold text-[var(--slot4-on-accent)]"
                  >
                    Submit an entry <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                    className="rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-semibold"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-3 text-sm font-semibold text-[var(--slot4-on-accent)]"
                  >
                    Get started <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
