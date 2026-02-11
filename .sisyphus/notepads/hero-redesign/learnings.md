
## Task 4 — HeroTriptych

- **Animation pattern**: `useAnimate()` + `stagger()` from `motion/react` with sequential `await new Promise(r => setTimeout(r, N))` works reliably for orchestrated entry animations
- **Fanned phone layout**: Absolute positioning with `rotate(-12deg)` / `rotate(12deg)` on side phones, center phone at z-20 with larger width (48% vs 42%)
- **Mobile scroll-snap**: `snap-x snap-mandatory` on container + `snap-center` on items + `scrollbarWidth: none` + `::-webkit-scrollbar { display: none }` for clean horizontal scrolling
- **Scroll position tracking**: Simple `scroll` event listener with `Math.round(scrollLeft / offsetWidth)` to determine active phone index for dot indicator
- **Hidden helper**: `React.CSSProperties` type needed (not `Record<string, number>`) when style objects contain `transform` strings
- **Dual layout approach**: Desktop uses `hidden lg:block` with absolute-positioned phones; mobile uses `lg:hidden` with flex scroll-snap — avoids trying to make one layout do both
- **Warm glow**: `radial-gradient(circle at 50% 50%, rgba(255,200,100,0.3) 0%, ... transparent 70%)` with `blur(40px)` creates convincing warm backlight

## Task 5 — HeroStage

- **3D perspective pattern**: `[perspective:1000px]` on parent + `[transform:rotateY(-5deg)]` on child creates clean 3D tilt. Apply only on desktop via separate layout blocks (`hidden lg:flex` vs `lg:hidden`), NOT via responsive Tailwind classes on a single element
- **Scroll-linked parallax**: `useScroll()` + `useTransform(scrollY, [0, 800], [0, -120])` from `motion/react` gives smooth scroll parallax. Apply via `<motion.div style={{ y: phoneY }}>` wrapper
- **Orange glow intensity**: `rgba(251,146,60,0.3)` at center + `rgba(251,146,60,0.15)` at 40% + `transparent` at 70% with `blur(60px)` — animated from opacity 0 → 0.3 → 0.25 for subtle pulse settle. More dramatic than Triptych's 40px blur
- **Scope ref simplicity**: `useAnimate()` returns a scope ref that can be passed directly to `ref={scope}` — no need for callback ref gymnastics or `MutableRefObject` casting
- **Split layout sizing**: `w-[55%]` + `w-[45%]` with `max-w-7xl` container works well. Phone side needs `h-[700px]` with `absolute inset-0 flex items-center justify-center` for vertical centering
- **Dual import consolidation**: `motion` and `useAnimate, stagger, useScroll, useTransform` can all come from a single `import { motion, useAnimate, stagger, useScroll, useTransform } from 'motion/react'` — avoid splitting into two import lines

## Task 6 — HeroCascade

- **Scroll-linked crossfade**: `useScroll({ target: sectionRef, offset: ['start start', 'end end'] })` + `useTransform(scrollYProgress, [...breakpoints], [...opacities])` drives crossfade between 4 screens. Each screen gets its own opacity transform with overlapping ranges for smooth transitions
- **Sticky positioning**: `sticky top-0` with `h-screen` on the inner container keeps the phone centered during scroll. Outer container needs `min-h-[400vh]` for scroll room. Do NOT use `top-1/2 -translate-y-1/2` — use `h-screen items-center justify-center` flex centering instead
- **Active dot tracking**: `useMotionValueEvent(scrollYProgress, 'change', callback)` is cleaner than `useTransform` for discrete state (integer dot index). Avoids the need to round MotionValues
- **Caption timing alignment**: Captions must start appearing SLIGHTLY BEFORE their screen's opacity ramp (e.g., screen2 starts at 0.2→0.25, caption2 starts at 0.22→0.27) so both feel synchronized. First caption should start at opacity 1 (not 0) since it's visible on initial load
- **z-index with HeroBackground**: `HeroBackground` uses `absolute inset-0 z-0` for gradient and `z-20` for grain overlay. ALL content sections (desktop + mobile) need `relative z-10` or content becomes invisible behind the grain overlay
- **Mobile whileInView vs AnimatedWords**: Don't use `AnimatedWords` on mobile unless you have `useAnimate` orchestration to reveal them — the component sets initial `opacity: 0` which stays stuck. Use `motion.div` with `whileInView` for self-contained mobile fade-in instead
- **Caption alternation pattern**: `right-[58%]` (visually LEFT of center) and `left-[58%]` (visually RIGHT of center) — counterintuitive Tailwind positioning. Each gets matching `text-right items-end` or `text-left items-start` alignment
- **Progress dots with CSS variables**: `color-mix(in srgb, var(--color-brown-900) 25%, transparent)` for inactive dots and `var(--color-brown-900)` for active — keeps it in the design system without hardcoding hex values

## Task 7 — HeroMosaic

- **Asymmetric CSS Grid**: `grid-cols-3 gap-5` with `col-span-2` and `row-span-2` creates a visually interesting mosaic. Key: Cell 1 (headline) spans 2 cols, Cell 2 (portrait) spans 2 rows, Cell 4 (landscape) spans 2 cols — this fills the 3×3 grid naturally
- **Mixed aspect ratio handling**: Portrait mockups need `max-w-[280px]`, left-angle mockups need `max-w-[240px]`, landscape mockups use full width. All use `overflow-hidden` on container + `rounded-[1.5rem]` on image for consistent card feel
- **Responsive grid collapse**: Desktop `grid grid-cols-3` → mobile switches to entirely separate component with `flex flex-col gap-4` (dual layout approach). Trying to collapse a 3-col asymmetric grid responsively is fragile — separate components are cleaner
- **Glow behind grid**: `absolute inset-0 -z-10 opacity-20` with `radial-gradient(circle at 50% 30%, rgba(251,146,60,0.25))` + `blur(80px)`. Position at 30% vertical to bias toward top where headline draws the eye
- **Hover lift on grid cells**: `transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md` — subtle 2px lift is enough for grid cells, more would feel jumpy with multiple adjacent cells
- **Separate mobile animation scope**: Desktop and mobile each need their own `useAnimate()` scope since they're separate DOM trees. Use different CSS class prefixes (`mosaic-cell` vs `mosaic-m-cell`) to avoid cross-contamination
