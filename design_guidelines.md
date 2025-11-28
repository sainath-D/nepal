# Nepal Science Navigators (NSN) Science Fair Website - Design Guidelines

## Design Approach
**Custom NSN Theme** - Futuristic science-inspired design with unique identity (NOT generic or Rotary-style)

## Color Palette
- **Deep Space Blue**: #0A1A3A (Primary backgrounds, headers)
- **Aurora Cyan**: #1ECBE1 (Accent, CTAs, highlights)
- **Stellar White**: #F5FAFF (Text, cards, content backgrounds)
- **Solar Gold**: #D7A028 (Secondary accent, awards, highlights)
- **Planet Grey**: #8A8FA3 (Secondary text, borders, subtle elements)

## Visual Style
- Soft gradients with subtle color transitions
- Glow effects on interactive elements and accents
- Thin neon borders (Aurora Cyan) on cards and sections
- Smooth shadows with depth
- Rounded layouts throughout (border-radius: 12-24px)
- Minimal clutter with generous whitespace
- Modern scientific aesthetic

## Typography
- **Headings**: Poppins or Montserrat (bold, modern, impactful)
- **Body Text**: Inter (clean, highly readable)
- Consistent hierarchy with clear size differentiation

## Layout System
- Tailwind spacing: Primarily use units of 4, 6, 8, 12, 16 for consistency
- Container max-widths: max-w-7xl for main content areas
- Responsive grid systems for cards and content sections

## Motion & Animation Strategy
**Every UI element must have smooth, professional motion:**
- Page load transitions (fade-in, slide-up)
- Section animations (slide/fade on scroll)
- Button hover effects (scale, glow, shadow lift)
- Card hover animations (lift-up transform with shadow expansion)
- Menu open/close (smooth slide with fade)
- Image zoom on hover (subtle scale transform)
- Input focus animations (border glow, label float)
- Dashboard table row animations (stagger on load)
- Gallery lightbox (fade + scale)
- Hero text effects (typing animation or staggered fade-in)
- Statistics counter animations (count-up effect)
- Smooth scroll behavior throughout

**Animation principles:**
- Use Framer Motion for React components
- Easing: easeOut, spring physics
- Duration: 200-400ms for micro-interactions, 600-800ms for transitions
- No lag or jitter - optimize performance

## Page-Specific Designs

### Home
- Animated hero section with futuristic background treatment
- Hero text with typing or fade animation
- Premium banners with Aurora Cyan accents
- Animated statistics counters (number count-up effect)
- Upcoming events card with hover effects
- All sections with motion-enhanced entry

### About
- Animated founder highlight section with image and bio
- Mission/vision cards with fade-in stagger
- Animated timeline for history
- Board of Directors grid (3-7 members) with hover lift effects

### Categories
- Science category cards (Physics, Chemistry, Biology, Coding, Robotics, Environment)
- Category icons with Aurora Cyan glow on hover
- Card lift and shadow expansion on hover

### Schedule
- Animated vertical timeline design
- Collapsible session cards
- Judges list with profile cards
- Time-based visual indicators

### Gallery
- Masonry grid layout (12-20 images)
- Animated category filtering
- Lightbox with zoom-in animation and smooth transitions
- Image hover with zoom effect

### Blog
- Blog article cards (3-6 mock articles)
- Animated card hover with lift effect
- Detailed blog view with smooth transitions

### News
- Science news cards (4-8 entries)
- External link buttons with animation
- Card hover effects

### Notices
- Pinned notices at top
- Urgent notices with Aurora Cyan pulse effect
- Card-based layout with priority indicators

### Videos
- Embedded YouTube videos (3 sample links)
- Animated thumbnail hover effects
- Grid layout

### Contact
- Contact form with input focus animations (glow, label float)
- Embedded map
- Contact information cards
- Submit button with loading animation

## Component Library

### Navigation
- Sticky header with blur backdrop
- Animated menu items
- Mobile hamburger with smooth slide animation
- Aurora Cyan active state indicators

### Cards
- Rounded corners (16-20px)
- Thin neon borders with Aurora Cyan
- Soft shadows
- Hover: lift transform + shadow expansion
- Smooth transitions

### Buttons
- Primary: Aurora Cyan background with glow effect
- Secondary: Solar Gold accents
- Hover: scale transform + intensified glow
- Active state with subtle press effect
- Blurred backgrounds when on images

### Forms
- Floating labels
- Aurora Cyan focus glow on inputs
- Smooth validation animations
- Autosave indicator animations

### Dashboard Specific
- Animated sidebar navigation
- Live preview panel
- Rich text editor interface
- Modal dialogs with fade + scale entrance
- Table row stagger animations
- Drag-and-drop with smooth feedback

## Images
- **Hero Section**: Large, futuristic science-themed background image with overlay gradient (Deep Space Blue to transparent)
- **About Page**: Founder portrait, BOD member photos
- **Gallery**: 12-20 science fair event photos in masonry layout
- **Blog**: Featured images for articles
- All images with subtle zoom on hover

## Footer
- Multi-column layout
- Social links with hover animations
- Newsletter signup with animated input
- Deep Space Blue background with subtle gradient