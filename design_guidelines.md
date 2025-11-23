# NexusLab Design Guidelines

## Design Approach
**Reference-Inspired System**: Draw from modern SaaS platforms (Linear's clarity, Notion's hierarchy, Coursera's learning experience) combined with gamification elements from Duolingo. Focus on motivational design that balances professionalism with engagement.

## Typography System

**Font Families**
- Primary: Inter (headings, UI elements, body text)
- Accent: JetBrains Mono (code snippets, technical content in labs)

**Hierarchy**
- Hero/Page Titles: text-4xl/5xl font-bold
- Section Headers: text-2xl/3xl font-semibold
- Card Titles: text-lg/xl font-semibold
- Body: text-base leading-relaxed
- Labels/Meta: text-sm text-muted-foreground
- Micro-content (badges, stats): text-xs font-medium

## Layout & Spacing

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 (cards), p-8 (sections)
- Section spacing: space-y-8 to space-y-12
- Grid gaps: gap-6 for card grids
- Container max-width: max-w-7xl for main content

**Dashboard Structure**
- Persistent sidebar navigation (w-64) on desktop, collapsible on mobile
- Main content area with generous padding (px-6 py-8)
- Two-column layouts for forms/content splits
- Three-column grids for card-based content (skills, trails, labs)

## Component Library

### Navigation
- **Sidebar**: Fixed left navigation with icon + label, active state with accent background, grouped by category (Learn, Progress, Community, Opportunities)
- **Top bar**: User profile dropdown, notification bell, search bar for trails/opportunities

### Cards (Primary UI Pattern)
- **Learning Trail Cards**: Image thumbnail top, title, difficulty badge, progress bar at bottom, 3-column grid
- **Skill Cards**: Icon/visual top-left, skill name, proficiency bar (0-100), last updated timestamp
- **Lab Cards**: Scenario preview, complexity indicator, "Start Simulation" CTA, completion status
- **Opportunity Cards**: Company logo, role title, requirements tags, "Apply" button, status badge

### Data Visualization
- **Career Map**: Horizontal timeline/flowchart with nodes (current → target position), connecting lines, milestone markers
- **Progress Bars**: Rounded full bars with gradient fills, percentage labels
- **XP/Gamification**: Circular progress rings for level advancement, achievement badges grid
- **Well-being Charts**: Line graph for mood tracking over time, emotion icons as data points

### Forms & Inputs
- Use shadcn/ui form components throughout
- Grouped form sections with dividers
- Inline validation feedback
- Primary CTA buttons: full width on mobile, auto width on desktop

### Modals & Overlays
- **AI Chat Interface**: Bottom-right floating chat bubble, expanding to modal with message history
- **Module Player**: Full-screen overlay for video/content consumption, progress tracking sidebar
- **Application Forms**: Sheet component from right side

## Animations (Minimal & Purposeful)

Use Framer Motion sparingly:
- Page transitions: Subtle fade (0.2s)
- Card hover: Slight lift (translateY(-4px))
- Progress bars: Smooth fill animation on load
- Skill acquisition: Celebratory badge bounce (scale animation)
- AI responses: Typing indicator, message fade-in

**Avoid**: Excessive scroll animations, parallax effects, continuous motion

## Page-Specific Patterns

### Landing Page
- **Hero**: Full-width gradient background (no image), centered headline + subheadline, dual CTA (Sign Up / Learn More), floating dashboard preview screenshot
- **Features Section**: 3-column grid with icon, title, description
- **Social Proof**: Logo cloud of partner companies, testimonial cards (2-column)
- **Footer**: 4-column layout (Product, Company, Resources, Contact), newsletter signup

### Dashboard Home
- **Welcome Section**: Personalized greeting, current streak, daily challenge card
- **Active Trails**: Horizontal scroll of in-progress learning cards
- **Quick Stats**: 4-column metrics (Skills acquired, XP earned, Labs completed, Opportunities viewed)
- **Recommended**: AI-suggested next steps in card format

### Skills Passport
- **Header**: Total skills count, proficiency average, export PDF button
- **Filters**: Category tabs, search input
- **Skills Grid**: 4-column responsive grid, each card shows icon, name, proficiency bar, date acquired

### Marketplace
- **Filter Sidebar**: Left column with role type, location, experience level filters
- **Listings**: Main area with opportunity cards, pagination
- **Application Tracker**: Separate tab with status pipeline view (Applied → Interview → Offer)

## Images Strategy

**Hero Section**: Use abstract gradient background or geometric pattern instead of photography - maintains focus on call-to-action

**Trail Cards**: Include thumbnail images representing course topics (technology icons, abstract concepts)

**User Profiles**: Avatar placeholders with initials for users without photos

**Achievement Badges**: Custom SVG icons for different milestones (gamification elements)