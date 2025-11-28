# Nepal Science Navigators (NSN) Science Fair Website

A premium full-stack website for Nepal's premier science fair competition, featuring a sophisticated cosmic-inspired design system, comprehensive CMS functionality, and smooth Framer Motion animations throughout.

## Project Overview

**Purpose**: Science fair competition platform for students to showcase innovative projects across 6 science categories with a premium user experience.

**Tech Stack**: React + TypeScript + Express.js + Wouter routing + TanStack Query + Framer Motion + Tailwind CSS + Shadcn UI

**Current State**: Fully functional MVP with 10 public pages, premium cosmic design system, admin dashboard, and comprehensive backend API

## Design System (November 27, 2025 - Premium Cosmic Theme)

### Primary Color Palette
- **Aurora Teal** (#1AA6A0): Primary interactive color - CTAs, hover states, accents
- **Cosmic Midnight** (#0B1220): Primary dark background and secondary color
- **Solar Flare Gold** (#F8D26A): Accent highlights, badges, urgent indicators
- **Lunar Mist** (#F5FAFF): Light text on dark backgrounds, contrast
- **Zenith Slate** (#1E2940): Secondary dark shade for depth

### Typography
- **Headings**: Sora (300-800 weight) - Modern, clean sans-serif for visual hierarchy
- **Body**: Inter (300-700 weight) - Highly readable, professional appearance
- **Spacing**: Consistent 0.25rem base unit for all spacing

### Animation Strategy
Every UI element features carefully designed Framer Motion animations:
- Page transitions: Fade-in and slide-up effects on load
- Scroll-triggered: Cards and sections animate in as they enter viewport
- Hover interactions: Cards lift with shadow enhancement, buttons scale smoothly
- Micro-interactions: Icon rotations, color transitions, badge animations
- Staggered reveals: Lists and grids animate in sequence for visual flow
- Pulsing effects: Urgent notices and pinned content pulse softly

### Design Components
- **Glassmorphic Cards** (`card-premium`): Subtle glass effect with backdrop blur
- **Gradient Mesh**: Animated background gradient in section backgrounds
- **Gradient Orbs**: Blurred circular gradients for atmospheric depth
- **Stars Background**: Subtle star pattern for cosmic theme
- **Text Gradients**: Gradient text for emphasis (e.g., `text-gradient-teal`)

## Project Structure

### Frontend Pages (9 public pages + admin)

1. **Home** (`/`) - Hero with gradient orbs, category cards, CTA sections
2. **About** (`/about`) - Mission/vision cards, founder profile, board of directors
3. **Categories** (`/categories`) - 6 science category cards with icon animations
4. **Schedule** (`/schedule`) - Timeline layout with judge cards section
5. **Blog** (`/blog`) - Article grid with featured images and read more CTAs
6. **Gallery** (`/gallery`) - Photo grid with lightbox, video embedding support
7. **News** (`/news`) - News articles with source badges and external links
8. **Notices** (`/notices`) - Announcements with pinned/urgent indicators
9. **Contact** (`/contact`) - Contact form with info cards, office hours

### Admin Dashboard (`/admin`)
- Sidebar navigation with 12 content management sections
- Dashboard overview with statistics cards
- Messages panel showing contact form submissions
- Placeholder CMS sections for all content types

### Backend API Endpoints

All endpoints use `/api/` prefix:

**Content Management**:
- `GET/POST /home` - Hero content and statistics
- `GET/POST /about` - Founder, mission, vision
- `GET/POST /footer` - Footer contact info and social links
- `GET/POST /site-settings` - Registration link and site config

**Collections** (with DELETE support):
- `/board-members` - Board of Directors
- `/categories` - Science categories (6 items)
- `/schedule` - Event timeline (grouped by date)
- `/judges` - Competition judges
- `/gallery` - Photo gallery (searchable by category)
- `/blog` - Blog posts
- `/news` - News articles with external sources
- `/notices` - Announcements (with urgent/pinned flags)
- `/videos` - Video gallery (YouTube embeds)

**User Interaction**:
- `POST /contact` - Submit contact form (Zod validated)
- `GET /contact-messages` - Fetch all messages (admin)
- `PATCH /contact-messages/:id/read` - Mark message as read

## Data Models

Complete schema in `shared/schema.ts` using Drizzle ORM and Zod validation:
- `HomeContent` - Hero section data
- `AboutContent` - Founder and organization info  
- `BoardMember` - BOD profiles with avatars
- `Category` - Science categories with icons
- `ScheduleItem` - Event timeline with type/location
- `Judge` - Competition judges with expertise
- `GalleryImage` - Photo gallery with categories
- `BlogPost` - Articles with featured images
- `News` - News items with source tracking
- `Notice` - Announcements with urgency flags
- `Video` - YouTube/video embeds
- `ContactMessage` - Form submissions with read tracking
- `FooterContent` - Footer data and social links
- `SiteSettings` - Registration links and config

## Storage

Using **in-memory storage** (MemStorage) for MVP simplicity with preloaded mock data automatically initialized on server start.

**Mock Data**: 6 board members, 6 categories, 8 schedule items, 3 judges, 16 gallery images, 3 blog posts, 2 news articles, 3 notices, 3 videos

## Key Features

### Visual Design
- Premium cosmic-inspired theme with gradient backgrounds
- Smooth page transitions and scroll animations
- Responsive grid layouts adapting to all screen sizes
- Masonry gallery on desktop, stacked on mobile
- Accessible color contrast ratios

### Responsive Breakpoints
- Mobile: base
- Tablet: sm (640px), md (768px)
- Desktop: lg (1024px), xl (1280px)

### Admin Features
- Sidebar navigation with icon shortcuts
- Message management with unread indicators
- Dashboard statistics overview
- Placeholder CMS for future content editing
- Authentication-ready architecture

## Development Workflow

### Running the Project
```bash
npm run dev
```
Starts Express backend (port 5000) and Vite frontend dev server on port 5000.

**Available Commands**:
- `npm run dev` - Start full-stack development
- Workflow: "Start application" → runs npm run dev

### Environment
- **Runtime**: Replit (NixOS)
- **Node Version**: 20.x
- **Database**: In-memory (MemStorage) for MVP
- **Styling**: Tailwind CSS + Shadcn UI

## Code Conventions

### Styling
- Tailwind utility classes for all styling
- Shadcn UI components for UI consistency
- Custom color tokens in tailwind config
- Mobile-first responsive design approach
- Custom CSS in index.css for animations

### Components
- Functional React components with TypeScript
- TanStack Query for all data fetching
- React Hook Form + Zod for validated forms
- Framer Motion for all animations
- Lucide React icons throughout

### Data Flow
1. Frontend makes request via TanStack Query
2. Query uses configured fetcher (apiRequest)
3. Backend validates with Zod schemas
4. Storage layer handles CRUD operations
5. Response sent back to frontend
6. Query cache invalidated on mutations

## Future Enhancements

### High Priority
1. **Database Migration** - Replace MemStorage with PostgreSQL
2. **User Authentication** - Registration, login, role-based access
3. **File Upload** - Image uploads for profiles and gallery
4. **Advanced CMS** - Full CRUD interfaces for all content types
5. **Search & Filtering** - Search across content, category filters

### Medium Priority  
1. Rich text editor for blog posts
2. Comments system on blog posts
3. Project submission system for participants
4. Email integration for contact form submissions
5. Analytics dashboard

### Technical Debt
- Add comprehensive error handling
- Implement API rate limiting
- Input sanitization and validation
- Test suite (unit, integration, E2E)
- SEO optimization (meta tags, structured data)
- Accessibility improvements (ARIA labels, keyboard navigation)
- Image lazy loading and optimization
- Dark mode toggle support

## Recent Changes (November 27, 2025)

### UI/UX Redesign - Premium Cosmic Theme
✅ Implemented complete cosmic-inspired design system:
- Aurora Teal, Cosmic Midnight, Solar Flare Gold color scheme
- Glassmorphic card components with backdrop blur effects
- Gradient mesh backgrounds and animated orbs
- Scroll-triggered animations on all major sections
- Updated Navigation with sticky header and blur effect
- Redesigned Home page with modern split hero layout
- Created reusable PageHeader component for consistent page headers
- Updated all pages (About, Contact, Blog, Categories, News, Notices, Schedule, Gallery)
- Premium Footer with newsletter signup and social links
- Smooth hover animations and transitions throughout

✅ Component Improvements:
- PageHeader component for consistent page introductions
- Card component with premium glass effect styling
- Footer with glassmorphic design and animations
- Navigation with scroll-aware sticky behavior

✅ All Pages Updated:
- Home: Hero, categories, CTA sections with animations
- About: Mission/vision cards, founder profile, board grid
- Contact: Contact form, info cards, office hours
- Blog: Article grid with featured images
- Categories: Category cards with color-coded icons
- Gallery: Photo grid with lightbox, video embeds
- News: News articles with source tracking
- Notices: Announcement cards with urgency flags
- Schedule: Timeline layout with judge section

### Known Issues
- None at this time

### Next Steps
1. Migrate to PostgreSQL database for persistence
2. Implement user authentication system
3. Add file upload functionality
4. Create admin CMS interfaces
5. Add search functionality across content

## Performance Notes

- Vite hot module replacement for fast development
- Framer Motion optimizations with viewport detection
- TanStack Query caching for API efficiency
- Responsive images ready for optimization
- Code splitting ready for implementation

## Deployment Ready

✅ All pages complete and styled
✅ Responsive design tested on mobile/tablet/desktop
✅ Navigation fully functional
✅ API endpoints working
✅ Admin dashboard accessible
✅ Mock data loading automatically

The site is production-ready for further backend integration and feature additions.