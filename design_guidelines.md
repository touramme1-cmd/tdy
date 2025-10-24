# Design Guidelines: Gulf Job Portal (Arabic/English)

## Design Approach

**Selected System:** Material Design-inspired with regional professional adaptation
**Rationale:** Job portals require high information density, clear hierarchy, and trust-building through professional presentation. Material Design provides robust patterns for data-heavy interfaces while allowing customization for regional context.

## Core Design Elements

### A. Color Palette

**Light Mode (Default):**
- Primary: 195 100% 29% (cyan-700, #0E7490) - CTAs, links, active states
- Primary Hover: 195 79% 27% (#155E75)
- Accent: 45 93% 47% (amber-500, #EAB308) - Badges (Urgent, Featured), highlights
- Background: 0 0% 100% (#FFFFFF)
- Background Alt: 210 40% 98% (#F8FAFC)
- Text Primary: 222 47% 11% (#0F172A)
- Text Secondary: 215 16% 47% (#64748B)
- Border: 214 32% 91% (#E2E8F0)
- Success: 142 71% 45% (#16A34A) - Visa sponsor badges
- Warning: 32 95% 44% (#D97706)
- Error: 0 72% 51% (#DC2626)

**Dark Mode:**
- Primary: 195 100% 39% (brighter cyan)
- Background: 222 47% 11% (#0F172A)
- Background Alt: 217 33% 17% (#1E293B)
- Text Primary: 210 40% 98%
- Text Secondary: 215 20% 65%

### B. Typography

**Font Stack:**
- Arabic: 'Noto Sans Arabic', 'Cairo', sans-serif (via Google Fonts)
- English: 'Inter', 'system-ui', sans-serif (via Google Fonts)
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

**Scale:**
- Hero Heading: text-5xl lg:text-6xl (3rem/3.75rem), font-bold
- Page Title: text-3xl lg:text-4xl, font-bold
- Section Heading: text-2xl lg:text-3xl, font-semibold
- Card Title: text-lg lg:text-xl, font-semibold
- Body: text-base (1rem), font-normal
- Small: text-sm, font-normal
- Labels: text-sm, font-medium

### C. Layout System

**Spacing Primitives:** Use Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4 (mobile), p-6 (tablet), p-8 (desktop)
- Section spacing: py-12 (mobile), py-16 (tablet), py-24 (desktop)
- Card gaps: gap-4 to gap-6
- Form field spacing: space-y-4

**Containers:**
- Max width: max-w-7xl (1280px) centered
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

**Grid System:**
- Job listings: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Categories: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Filters sidebar: fixed width 280px (desktop), drawer (mobile)

### D. Component Library

**Navigation:**
- Fixed header with logo, main nav, language toggle, WhatsApp icon
- Height: h-16 lg:h-20
- Background: white with border-b and subtle shadow
- Mobile: Hamburger menu with slide-in drawer

**Job Cards:**
- White background, rounded-lg, border, hover:shadow-md transition
- Structure: Company logo (48x48), Job title (bold), Location with icon, Salary, Badge row, Excerpt, CTA row
- Padding: p-4 lg:p-6

**Badges:**
- Pill-shaped: rounded-full px-3 py-1 text-xs font-medium
- Urgent: bg-amber-500 text-white
- Visa Sponsor: bg-green-100 text-green-800
- Housing: bg-blue-100 text-blue-800
- Remote: bg-purple-100 text-purple-800

**Buttons:**
- Primary: bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover
- Secondary: border-2 border-primary text-primary bg-white
- WhatsApp: bg-green-600 text-white with WhatsApp icon
- Icon size in buttons: 20px

**Forms:**
- Input fields: border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary
- Labels: text-sm font-medium mb-2
- Error states: border-red-500 with red text below
- File upload: Dashed border, drag-drop area with icon

**Filters Panel:**
- Desktop: Sticky sidebar, border-r, bg-gray-50
- Mobile: Bottom sheet drawer with backdrop
- Chips for active filters: bg-primary/10 text-primary with X icon

**WhatsApp Floating Button:**
- Position: fixed bottom-6 right-6 (ltr) / left-6 (rtl)
- Size: w-14 h-14 rounded-full
- Background: bg-green-600 hover:bg-green-700
- Icon: 28px white WhatsApp logo
- Shadow: shadow-lg
- Z-index: z-50

### E. Animations

**Use Sparingly:**
- Hover transitions: transition-all duration-200
- Card hover: hover:shadow-md
- Button hover: subtle scale(1.02)
- Filter drawer: slide-in/out animation
- No hero animations or scroll effects

## RTL/LTR Considerations

**Layout Mirroring:**
- Use `dir="rtl"` on html element for Arabic
- Mirror all horizontal spacing/alignment
- Icons: Chevrons, arrows auto-flip with transform scale(-1, 1)
- Text alignment: text-right (RTL), text-left (LTR)
- Navigation: Reverse order in RTL

**Typography:**
- Increase line-height for Arabic: leading-relaxed (1.625)
- Slightly larger font sizes for Arabic text readability

## Images

**Hero Section:**
- Large background image (1920x800px) showing Gulf skylines (Dubai Marina, Riyadh towers, or Doha skyline)
- Overlay: Dark gradient (from black/60% to transparent)
- Foreground: White text with search form on glass-morphism card

**Job Detail Pages:**
- Company logo: 80x80px rounded square
- Optional: Office/location photos in gallery (800x450px)

**Category Cards:**
- Icon-based (Font Awesome or Heroicons), no photos
- 64px icons with primary color

## Page-Specific Layouts

**Home:**
1. Hero with background image, search bar, quick filters (80vh)
2. Category grid (6-8 categories)
3. Recent jobs (3-column grid)
4. Partner CTA banner
5. Footer

**Job Listing:**
- Two-column: Filters sidebar (280px) + Results grid
- Filters sticky on scroll
- Pagination at bottom

**Job Detail:**
- Two-column: Main content (65%) + Sidebar (35%)
- Breadcrumbs at top
- Sticky apply CTA on mobile

**Contact:**
- Centered form (max-w-2xl)
- Two-column on desktop: Form (60%) + Info card (40%)

## Accessibility

- Minimum contrast ratio: 4.5:1 for text
- Focus visible: ring-2 ring-primary ring-offset-2
- Keyboard navigation: Full tab order
- ARIA labels for icon-only buttons
- Screen reader text for language toggle
- Alt text for all images