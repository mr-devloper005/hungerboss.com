import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Local directory and reference library',
      description: 'Find businesses near you and download-ready guides and reports — one place to discover local places and reference material.',
      openGraphTitle: 'Local directory and reference library',
      openGraphDescription: 'Discover local businesses and a curated library of downloadable guides, reports, and reference material.',
      keywords: ['local directory', 'business directory', 'reference library', 'downloadable guides', 'downloadable reports'],
    },
    hero: {
      badge: 'Directory + Reference Library',
      title: ['Find local places and', 'the references behind them.'],
      description: 'Browse a working directory of nearby businesses and open a growing library of download-ready guides, reports, and reference material — all in one place.',
      primaryCta: { label: 'Open the directory', href: '/listing' },
      secondaryCta: { label: 'Browse the library', href: '/pdf' },
      searchPlaceholder: 'Search places, guides, and reports…',
      focusLabel: 'Focus',
      featureCardBadge: 'recently added',
      featureCardTitle: 'The newest listings and references lead the homepage.',
      featureCardDescription: 'Fresh entries surface first so discovery always reflects the latest additions, without changing any core platform behavior.',
    },
    intro: {
      badge: 'What this is',
      title: 'A local directory and a reference library, kept in one connected place.',
      paragraphs: [
        'This platform pairs a practical directory of local businesses with a library of download-ready references, so finding a place and finding the material about it live side by side.',
        'Instead of scattering listings and files across disconnected pages, everything stays searchable and cross-linked with consistent navigation.',
        'Whether you start with a business near you or a report you need, you can keep discovering related places and references without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'A working local directory with location, contact, and trust cues.',
        'A reference library of download-ready guides, reports, and files.',
        'Search that spans both places and references.',
        'A calm browsing rhythm that keeps discovery fast and clear.',
      ],
      primaryLink: { label: 'Open the directory', href: '/listing' },
      secondaryLink: { label: 'Browse the library', href: '/pdf' },
    },
    cta: {
      badge: 'Get listed',
      title: 'List a business or publish a reference file.',
      description: 'Add a place to the local directory or upload a guide, report, or reference file to the library — and reach the people already searching for it.',
      primaryCta: { label: 'Submit an entry', href: '/create' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest entries in this collection.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer, clearer way to explore content.',
    description: `${slot4BrandConfig.siteName} is built to make long-form reading, visual discovery, and supporting resources feel like one unified experience.`,
    paragraphs: [
      'Instead of splitting everything into disconnected pages, the platform keeps related content easy to move through and easy to understand.',
      'Whether someone starts with an article, listing, image post, or resource page, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Reading-first experience',
        description: 'We prioritize clarity, pacing, and structure so people can read, browse, and discover without noise.',
      },
      {
        title: 'Connected content surfaces',
        description: 'Articles, visual posts, listings, resources, and profiles stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A support page that matches the product, not a generic contact form.',
    description: 'Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find stories, listings, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
