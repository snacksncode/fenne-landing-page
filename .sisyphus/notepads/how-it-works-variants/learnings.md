# Learnings & Patterns

## [2026-02-12] Project Setup

### Color Palette
- Cream: #FEF7EA (cream-50), #FEF2DD (cream-100)
- Orange: #F9954D (orange-500), #EC8032 (orange-600)
- Brown: #867A6E (brown-700), #493D34 (brown-900)
- Noise texture overlay: opacity 0.03

### Animation Patterns
- easeOutQuint: [0.22, 1, 0.36, 1] — titles/headlines, 0.9s duration
- easeOutCubic: [0.33, 1, 0.68, 1] — cards/content, 0.8s duration
- Stagger: baseDelay + index * 0.05-0.12s
- InView triggers: margin '-10% 0px' to '-20% 0px', once: true

### Tech Stack
- Next.js 15.5.12 with Turbopack
- motion/react (framer-motion successor)
- lucide-react v0.563.0
- Tailwind CSS
- Bun as package manager

## [2026-02-13] How It Works Switcher Scaffold

### Architecture
- **HowItWorksSwitcher.tsx**: Main component with useState for activeVariant (1-10)
- **Keyboard Navigation**: useEffect with ArrowLeft/ArrowRight handlers, wraps at boundaries (10→1, 1→10)
- **Toolbar**: Fixed position (bottom-6, left-1/2, -translate-x-1/2, z-50), rounded-full pill shape
- **Button Styling**: Active state uses bg-orange-500 text-white, inactive uses bg-cream-100 text-brown-700 with hover:bg-orange-100
- **Conditional Rendering**: Each variant (HowItWorks01-10) renders only when activeVariant matches

### Implementation Details
- 12 files total: HowItWorksSwitcher.tsx, index.tsx (re-export), 10 placeholder variants
- Placeholder pattern: Simple section with id="how-it-works", cream-50 background, centered heading
- Re-export pattern: `export { HowItWorksSwitcher as HowItWorks } from './HowItWorksSwitcher'`
- Page integration: Updated import from `@/components/sections/HowItWorks` to `@/components/sections/how-it-works`

### Verification Results
- Build: Zero TypeScript errors, successful production build
- Button clicks: Verified buttons 1, 2, 5, 10 toggle variants correctly
- Keyboard nav: ArrowRight cycles forward (1→2→3...), ArrowLeft cycles backward
- Toolbar: Fixed position at bottom-center, all 10 buttons visible and interactive
- Active state: Orange-500 background highlights current variant button

### Design Notes
- Toolbar inspired by macOS dock aesthetic (rounded pill, subtle shadow)
- Spacing: gap-2 between buttons, px-4 py-2 padding in toolbar
- Responsive: Uses Tailwind's fixed positioning for consistent placement across viewports
- Accessibility: Buttons are semantic HTML with clear active state indication
