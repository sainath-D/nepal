# Design Guidelines: Professional Resume Website

## Design Approach
**Hybrid Approach**: Inspired by modern developer portfolios (Linear's clarity + Notion's organization) with professional resume conventions. Clean, content-focused design that establishes credibility while showcasing personality.

## Typography System
- **Primary Font**: Inter or similar geometric sans-serif (Google Fonts)
- **Hierarchy**:
  - Name/Hero: text-5xl to text-7xl, font-bold
  - Section Headings: text-3xl to text-4xl, font-semibold
  - Job Titles/Project Names: text-xl to text-2xl, font-medium
  - Body Text: text-base to text-lg, font-normal
  - Metadata (dates, locations): text-sm, font-normal
- **Line Height**: Generous spacing (leading-relaxed for body, leading-tight for headings)

## Layout System
- **Container**: max-w-6xl mx-auto for main content
- **Spacing Units**: Use Tailwind units of 4, 8, 12, 16, 20, 24 for consistent rhythm
  - Section padding: py-16 to py-24
  - Component spacing: space-y-8 to space-y-12
  - Element margins: mb-4, mb-8, mb-12
- **Grid Structure**: 
  - Single column for content flow (max-w-4xl for text-heavy sections)
  - Two-column split for experience/education details (lg:grid-cols-[200px_1fr])
  - Three-column grid for skills showcase (grid-cols-2 md:grid-cols-3 lg:grid-cols-4)

## Component Library

### Hero Section
- Full-width section (min-h-screen or 80vh)
- Centered content with name, professional title, 2-3 sentence summary
- Professional headshot image (circular, 200-300px) or minimal abstract background
- Primary CTA buttons: "Download Resume" and "Contact Me" with backdrop-blur-md bg-white/10 treatment
- Social links (LinkedIn, GitHub, etc.) with icon library integration

### Experience Section
- Timeline layout with left-aligned dates, right-aligned content
- Each entry: Company name (bold), job title, date range, bullet points of achievements
- Consistent card-based or borderless list format
- Visual hierarchy through font weights and spacing, not dividers

### Skills Section
- Tag/badge design for individual skills
- Grouped by category (Technical Skills, Tools, Soft Skills)
- Grid layout with rounded pills (px-4 py-2, rounded-full)
- Icons from Heroicons or Font Awesome beside skill names

### Projects Portfolio
- Card-based grid (2 columns on desktop, 1 on mobile)
- Each card: Project name, brief description, tech stack tags, links to live demo/GitHub
- Subtle hover elevation (hover:shadow-lg transition)
- Optional: Small preview image or icon representation

### Education Section
- Similar structure to experience (institution, degree, dates, honors)
- More compact spacing than work experience
- Include relevant coursework or certifications as supplementary info

### Contact Section
- Clean, minimal footer-style section
- Email (clickable mailto:), phone, location
- Social media icon links (LinkedIn, GitHub, Twitter, etc.)
- Simple text-based, no form needed for resume site

## Image Strategy
- **Hero Image**: Professional headshot (circular mask) OR subtle gradient/pattern background - not a large hero image
- **Project Thumbnails**: Small preview images in project cards (aspect-ratio-video, object-cover)
- **Icons**: Use Heroicons exclusively for consistency across social links, skills, and contact info

## Responsive Behavior
- Mobile-first approach
- Stack all multi-column layouts to single column on mobile
- Reduce hero text sizes (text-4xl on mobile vs text-7xl desktop)
- Maintain comfortable reading width on all devices (never full-width text blocks)

## Key Interactions
- Smooth scroll behavior for navigation anchors
- Minimal animations: subtle fade-in on scroll for sections (optional intersection observer)
- Hover states only on interactive elements (links, buttons, cards)
- No distracting motion - focus on content

## Navigation
- Sticky header with anchor links to sections (Hero, Experience, Skills, Education, Projects, Contact)
- Simple horizontal nav on desktop, hamburger on mobile
- Smooth scroll to section behavior