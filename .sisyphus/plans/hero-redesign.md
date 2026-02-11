# Hero Section Redesign — 5 New Variants with Yellow iPhone Mockups

## TL;DR

> **Quick Summary**: Replace all 5 existing hero section variants with 5 brand-new responsive hero designs ("Float", "Triptych", "Stage", "Cascade", "Mosaic") using the new yellow iPhone mockup images. Remove old heroes, old screenshots (heroes only), and the `?hero=showcase` gating — toolbar always visible for testing.
>
> **Deliverables**:
> - 5 new hero components in `src/components/heroes/`
> - Shared hero utilities extracted (GrainOverlay, AnimatedWords, reduced-motion hook, store icons)
> - Mockup images migrated to `/public/mockups/` with clean filenames
> - Updated HeroSwitcher with always-visible toolbar
> - Old hero code + hero-only screenshots deleted
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 3 waves
> **Critical Path**: Task 1 → Task 2 → Tasks 3-7 (parallel pairs) → Task 8 → Task 9

---

## Context

### Original Request
User wants to replace all existing hero sections because they are not responsive and use outdated mockup images. New yellow iPhone 15 mockup images are available in `apple-iphone-15-yellow-mockup/`. User wants 5 new hero proposals built as swappable options, stunning design following 2025-2026 trends, and fully responsive layouts.

### Interview Summary
**Key Discussions**:
- **All 5 proposals selected**: Float (minimalist centered), Triptych (three-phone fan), Stage (dramatic split), Cascade (scroll-triggered), Mosaic (asymmetric grid)
- **Fox mascot**: NOT included in new heroes — phone mockups are the star
- **Toolbar**: Always visible, no `?hero=showcase` gating needed
- **Old code**: Delete old hero components + hero-only screenshots
- **Animations**: Rich entrance animations using motion/react (already in project)
- **Tests**: No automated tests — Playwright QA verification via agent
- **Assets**: Move mockups to `/public/mockups/`, optimize via Next.js Image

**Research Findings**:
- Floating phone with 3D tilt is dominant 2025-2026 hero trend
- Oversized headlines with `clamp()` for fluid scaling — standard practice
- Gradient mesh backgrounds trending, grain texture still strong (Fenne already has grain)
- motion/react already in project — no GSAP needed
- Left-angle mockup shots (1857×3096px) are most visually striking for hero use

### Metis Review
**Identified Gaps** (addressed):
- **Features.tsx dependency**: `Features.tsx` also uses `PhoneFrame` + 3 screenshots from `/public/screenshots/`. CANNOT delete those 3 files or PhoneFrame.tsx. Plan only deletes screenshot files NOT used by Features, and keeps PhoneFrame alive.
- **Mockup filenames have spaces**: Must rename to kebab-case when migrating to `/public/mockups/`
- **Image sizing**: Mockup PNGs are huge (up to 3096px). Must set aggressive `sizes` attribute on every `<Image>` to prevent mobile downloading massive files.
- **SVG grain filter ID collisions**: Each hero needs a unique filter ID to prevent visual glitches during variant switching.
- **Welcome screen has fox**: The welcome mockup shows the fox mascot within the app UI — acceptable since it's "inside the app," not a decorative hero element.
- **Double bezel risk**: New heroes must use bare `<Image>`, NOT `PhoneFrame` — mockup PNGs already include the device body/bezel.

---

## Work Objectives

### Core Objective
Build 5 new, stunning, fully responsive hero section variants for the Fenne landing page, using new yellow iPhone mockup images, with a redesigned always-visible toolbar for switching between variants.

### Concrete Deliverables
- `src/components/heroes/_shared.tsx` — Shared utilities (GrainOverlay, AnimatedWords, useReducedMotion, AppleIcon, PlayStoreIcon)
- `src/components/heroes/HeroFloat.tsx` — "The Float" hero variant
- `src/components/heroes/HeroTriptych.tsx` — "The Triptych" hero variant
- `src/components/heroes/HeroStage.tsx` — "The Stage" hero variant
- `src/components/heroes/HeroCascade.tsx` — "The Cascade" hero variant
- `src/components/heroes/HeroMosaic.tsx` — "The Mosaic" hero variant
- `src/components/HeroSwitcher.tsx` — Updated switcher (always-visible toolbar, new variants)
- `/public/mockups/*.png` — Migrated and renamed mockup images

### Definition of Done
- [ ] All 5 new hero variants render correctly at 375px, 768px, 1024px, and 1920px viewports
- [ ] Toolbar always visible without `?hero=showcase`
- [ ] No broken images (all mockup paths resolve)
- [ ] No horizontal scroll at any viewport on any variant
- [ ] `Features.tsx` still renders correctly (not broken by cleanup)
- [ ] `npm run build` succeeds with zero errors
- [ ] `prefers-reduced-motion` respected — content renders without animation errors

### Must Have
- Responsive layouts at all 4 breakpoints (mobile 375px, tablet 768px, desktop 1024px, ultra-wide 1920px)
- Rich entrance animations with motion/react (stagger, slide, scale, float)
- `prefers-reduced-motion` support (follow existing pattern)
- Proper `sizes` attribute on all `<Image>` components
- Grain overlay on all variants (unique SVG filter IDs)
- App Store + Google Play CTA buttons with existing URLs
- `document.fonts.ready` gate before entrance animations (existing pattern)

### Must NOT Have (Guardrails)
- NO fox mascot in any hero variant (phone mockups only)
- NO `PhoneFrame` component usage in new heroes (mockup PNGs include device chrome — double bezel is a bug)
- NO new animation libraries (GSAP, Lottie, etc.) — use only motion/react
- NO gradient mesh backgrounds or effects beyond established patterns (grain + radial glow)
- NO changes to headline copy ("Plan meals / the cozy way.") or CTA URLs without user approval
- NO deletion of `PhoneFrame.tsx` (still used by `Features.tsx`)
- NO deletion of `/public/screenshots/weekly-plan.png`, `/public/screenshots/groceries-empty.png`, `/public/screenshots/recipes-list.png` (used by `Features.tsx`)
- NO hard-coded image dimensions — use responsive `sizes` with Next.js Image
- NO inline `<style jsx>` for grain — extract to shared component
- Avoid AI-slop: no excessive drop-shadows on every element, no 15 floating emojis, no over-abstracted utility wrappers

---

## Verification Strategy

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks in this plan MUST be verifiable WITHOUT any human action.

### Test Decision
- **Infrastructure exists**: N/A (no test runner for component tests)
- **Automated tests**: None — Playwright QA scenarios are primary verification
- **Framework**: N/A

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

Every hero variant will be verified by the executing agent using Playwright at 4 viewport widths. Screenshots captured as evidence. Build verification via `npm run build`.

**Verification Tool by Deliverable Type:**

| Type | Tool | How Agent Verifies |
|------|------|-------------------|
| **Hero components** | Playwright | Navigate, assert elements visible, screenshot at 4 viewports |
| **Image migration** | Bash | Verify files exist at new paths, no 404s in browser |
| **Build integrity** | Bash | `npm run build` exits 0 |
| **Old code removal** | Bash + grep | Verify no imports of old components remain |

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Migrate + rename mockup images
└── Task 2: Extract shared hero utilities

Wave 2 (After Wave 1):
├── Task 3: Build HeroFloat
├── Task 4: Build HeroTriptych
├── Task 5: Build HeroStage
├── Task 6: Build HeroCascade
└── Task 7: Build HeroMosaic
(Note: Tasks 3-7 are independent but should be built sequentially
 to maintain quality — each one verified before starting the next)

Wave 3 (After Wave 2):
├── Task 8: Update HeroSwitcher + wire up new variants
└── Task 9: Delete old hero code + unused screenshots

Critical Path: Task 1 → Task 2 → Task 3 → ... → Task 7 → Task 8 → Task 9
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3-7 | 2 |
| 2 | None | 3-7 | 1 |
| 3 | 1, 2 | 8 | — |
| 4 | 1, 2 | 8 | — |
| 5 | 1, 2 | 8 | — |
| 6 | 1, 2 | 8 | — |
| 7 | 1, 2 | 8 | — |
| 8 | 3, 4, 5, 6, 7 | 9 | — |
| 9 | 8 | None | — |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1, 2 | `task(category="quick", ...)` for asset migration; `task(category="quick", ...)` for shared utils |
| 2 | 3-7 | `task(category="visual-engineering", load_skills=["frontend-ui-ux"], ...)` for each hero |
| 3 | 8, 9 | `task(category="quick", ...)` for switcher rewire; `task(category="quick", ...)` for cleanup |

---

## TODOs

- [x] 1. Migrate and Rename Mockup Images

  **What to do**:
  - Create `/public/mockups/` directory
  - Copy selected mockup images from `apple-iphone-15-yellow-mockup/` to `/public/mockups/`
  - Rename files from spacey simulator names to clean kebab-case:

  **File Mapping** (source → destination):
  ```
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.06.46-portrait.png  → weekly-plan-portrait.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.06.46-landscape.png → weekly-plan-landscape.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.06.46-left.png      → weekly-plan-left.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.12.14-portrait.png  → recipes-list-portrait.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.12.14-landscape.png → recipes-list-landscape.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.12.14-left.png      → recipes-list-left.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.13.04-portrait.png  → groceries-portrait.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.13.04-landscape.png → groceries-landscape.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.13.04-left.png      → groceries-left.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.14.11-portrait.png  → groceries-checked-portrait.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.14.11-landscape.png → groceries-checked-landscape.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.14.11-left.png      → groceries-checked-left.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.14.49-portrait.png  → meal-detail-portrait.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.14.49-landscape.png → meal-detail-landscape.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.14.49-left.png      → meal-detail-left.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.15.01-portrait.png  → monthly-calendar-portrait.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.15.01-landscape.png → monthly-calendar-landscape.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.15.01-left.png      → monthly-calendar-left.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.15.15-portrait.png  → welcome-portrait.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.15.15-landscape.png → welcome-landscape.png
  Simulator Screenshot - iPhone 16e - 2026-02-10 at 12.15.15-left.png      → welcome-left.png
  ```

  **Must NOT do**:
  - Do NOT delete the original `apple-iphone-15-yellow-mockup/` directory yet (keep as backup until all heroes verified)
  - Do NOT modify the image files themselves — no resizing, no format conversion (Next.js Image handles optimization at runtime)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Purely file operations — mkdir + cp + rename. No creative or complex logic.
  - **Skills**: []
    - No skills needed for file operations.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Tasks 3, 4, 5, 6, 7
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `apple-iphone-15-yellow-mockup/` — Source directory with 21 files to copy

  **Documentation References**:
  - Mockup screen-to-timestamp mapping:
    - `12.06.46` = Weekly plan (menu/meal planning view)
    - `12.12.14` = Recipes list
    - `12.13.04` = Groceries (unchecked)
    - `12.14.11` = Groceries (checked off)
    - `12.14.49` = Meal detail/schedule
    - `12.15.01` = Monthly calendar
    - `12.15.15` = Welcome/onboarding

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: All 21 mockup files exist at new paths with correct names
    Tool: Bash
    Preconditions: None
    Steps:
      1. ls -la /public/mockups/ | wc -l → Assert 21 files (plus . and ..)
      2. ls /public/mockups/weekly-plan-portrait.png → Assert exists
      3. ls /public/mockups/weekly-plan-landscape.png → Assert exists
      4. ls /public/mockups/weekly-plan-left.png → Assert exists
      5. ls /public/mockups/recipes-list-portrait.png → Assert exists
      6. ls /public/mockups/recipes-list-left.png → Assert exists
      7. ls /public/mockups/groceries-portrait.png → Assert exists
      8. ls /public/mockups/groceries-left.png → Assert exists
      9. ls /public/mockups/meal-detail-portrait.png → Assert exists
      10. ls /public/mockups/monthly-calendar-portrait.png → Assert exists
      11. ls /public/mockups/welcome-portrait.png → Assert exists
      12. ls /public/mockups/welcome-left.png → Assert exists
    Expected Result: All 21 files present with clean kebab-case names
    Failure Indicators: Any file missing or still has spaces in name
  ```

  **Commit**: YES
  - Message: `feat(hero): migrate mockup images to /public/mockups with clean names`
  - Files: `public/mockups/*`
  - Pre-commit: `ls public/mockups/ | wc -l` (should be 21)

---

- [x] 2. Extract Shared Hero Utilities

  **What to do**:
  - Create `src/components/heroes/_shared.tsx` containing:
    1. **`GrainOverlay` component** — Extracted from the duplicated SVG noise pattern in every hero. Accepts a `filterId: string` prop to avoid ID collisions.
    2. **`AnimatedWords` component** — Extracted from the duplicated word-splitting animation. Accepts `text: string`, `reducedMotion: boolean`, `className: string` (for variant-specific class names like `float-hero-word`).
    3. **`useReducedMotion` hook** — Extracted from the duplicated `useEffect` + `matchMedia` pattern. Returns `boolean`.
    4. **`AppleIcon` and `PlayStoreIcon` SVG components** — Extracted from duplication in every hero. Accept `className?: string`.
    5. **`StoreCTAs` component** — Extracted App Store + Google Play buttons. Accepts `className?: string` for wrapper, `reducedMotion: boolean` for animation initial state. Uses exact URLs:
       - App Store: `https://apps.apple.com/app/fenne-meal-planner/id6739899701`
       - Google Play: `https://play.google.com/store/apps/details?id=app.fenne`
    6. **`HeroBackground` component** — The gradient background + grain overlay combination. Accepts `gradientAngle?: number` (default 135) and `filterId: string`.
  - All components should be `'use client'` compatible
  - Export everything as named exports

  **Must NOT do**:
  - Do NOT modify any existing hero components in this task
  - Do NOT change the visual output of any component — pure extraction
  - Do NOT add new props beyond what's needed for de-duplication

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Pure extraction/refactoring of existing patterns into shared file. No creative design work.
  - **Skills**: []
    - No skills needed — copying existing code into shared module.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Tasks 3, 4, 5, 6, 7
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/components/heroes/HeroMarquee.tsx:75-82` — `useReducedMotion` pattern (matchMedia + event listener)
  - `src/components/heroes/HeroMarquee.tsx:43-68` — `AnimatedWords` pattern (word splitting + span wrapping)
  - `src/components/heroes/HeroMarquee.tsx:144-161` — `GrainOverlay` pattern (SVG feTurbulence filter)
  - `src/components/heroes/HeroMarquee.tsx:9-23` — `AppleIcon` and `PlayStoreIcon` SVG patterns
  - `src/components/heroes/HeroMarquee.tsx:208-222` — `StoreCTAs` pattern (App Store + Google Play buttons)
  - `src/components/heroes/HeroMarquee.tsx:138-143` — Background gradient pattern

  **API/Type References**:
  - `motion/react` — `useAnimate`, `stagger` are used for AnimatedWords parent animation (not embedded in the component itself)

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Shared file exports all expected components and hooks
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep -c "export function\|export const\|export { " src/components/heroes/_shared.tsx
         → Assert >= 6 exports (GrainOverlay, AnimatedWords, useReducedMotion, AppleIcon, PlayStoreIcon, StoreCTAs, HeroBackground)
      2. grep "GrainOverlay" src/components/heroes/_shared.tsx → Assert found
      3. grep "AnimatedWords" src/components/heroes/_shared.tsx → Assert found
      4. grep "useReducedMotion" src/components/heroes/_shared.tsx → Assert found
      5. grep "AppleIcon" src/components/heroes/_shared.tsx → Assert found
      6. grep "PlayStoreIcon" src/components/heroes/_shared.tsx → Assert found
      7. grep "StoreCTAs" src/components/heroes/_shared.tsx → Assert found
      8. grep "HeroBackground" src/components/heroes/_shared.tsx → Assert found
      9. grep "filterId" src/components/heroes/_shared.tsx → Assert found (GrainOverlay accepts filterId prop)
    Expected Result: All 7+ exports present with filterId prop on GrainOverlay
    Failure Indicators: Missing exports, missing filterId prop

  Scenario: TypeScript compilation succeeds
    Tool: Bash
    Preconditions: File created
    Steps:
      1. npx tsc --noEmit src/components/heroes/_shared.tsx 2>&1
         → Assert exit code 0 or no errors related to _shared.tsx
    Expected Result: No type errors
    Failure Indicators: TypeScript compilation errors
  ```

  **Commit**: YES
  - Message: `refactor(hero): extract shared hero utilities to _shared.tsx`
  - Files: `src/components/heroes/_shared.tsx`
  - Pre-commit: `npx tsc --noEmit`

---

- [x] 3. Build HeroFloat — "The Float" (Minimalist Centered Phone)

  **What to do**:
  - Create `src/components/heroes/HeroFloat.tsx`
  - **Layout Design**:
    - **Desktop (1024px+)**: Centered column layout. Oversized headline at top (`clamp(3rem, 8vw, 6rem)`), single yellow iPhone portrait mockup centered below with subtle 3D perspective tilt (`perspective(1200px) rotateY(-8deg)`), warm orange radial glow behind phone (`blur-3xl`), CTA buttons centered below phone. Generous whitespace — the phone IS the hero. Max container `max-w-5xl`.
    - **Tablet (768px-1023px)**: Same layout, phone at ~280px width, headline scales down via clamp.
    - **Mobile (< 768px)**: Full-width centered stack. Phone scales to ~65vw (max 300px). Headline, phone, CTAs stacked. No 3D perspective on mobile (too subtle at small size). Padding `px-6`.
    - **Ultra-wide (1920px+)**: Container maxes out at `max-w-5xl`, generous side padding. Phone doesn't grow past 380px.
  - **Key Elements**:
    - Badge: "Your Foxy Companion" (orange-500/15 bg)
    - Headline: "Plan meals. / Cook happy." or "Plan meals / the cozy way." — use same copy as current
    - Subheadline: Same copy as current
    - Phone: `/mockups/weekly-plan-portrait.png` as the hero shot (shows core value)
    - CTAs: App Store + Google Play via `StoreCTAs` from `_shared.tsx`
    - Background: `HeroBackground` with grain overlay (filterId: `float-grain`)
  - **Animation** (using motion/react `useAnimate` + `useReducedMotion` from shared):
    1. Badge fades in (0.5s)
    2. Headline words stagger up (`AnimatedWords`, 0.05s stagger)
    3. Subheadline slides in from left (0.7s)
    4. Phone fades up from below with slight scale (1s, ease `[0.22, 1, 0.36, 1]`)
    5. CTA buttons scale in with spring bounce (0.6s, ease `[0.34, 1.56, 0.64, 1]`)
    6. Subtle float loop on phone after entrance (infinite, 4s, alternate, translateY 0 to -12px)
  - **Important**: Use bare `<Image>` from next/image, NOT `PhoneFrame`. Set `sizes="(max-width: 768px) 65vw, (max-width: 1024px) 280px, 380px"`. Set `priority` for LCP.

  **Must NOT do**:
  - Do NOT use `PhoneFrame` component — mockup PNG already has device chrome
  - Do NOT add fox mascot
  - Do NOT add floating food emojis
  - Do NOT add diagonal accent strip (keep this variant clean and minimal)
  - Do NOT change CTA URLs or headline copy

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Creative frontend component with responsive layout, 3D CSS transforms, animations, and visual polish.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Needed for making responsive layout decisions, visual balance, animation timing.
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed during build — QA scenarios are for post-build verification.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Wave 2, first in sequence)
  - **Blocks**: Task 8 (HeroSwitcher rewire)
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/components/heroes/HeroMarquee.tsx:84-131` — Animation orchestration pattern (`document.fonts.ready.then()` → sequential `animate()` with `await`)
  - `src/components/heroes/HeroMarquee.tsx:134-141` — Section structure (`ref={scope}`, `min-h-svh`, `overflow-hidden`)
  - `src/components/heroes/HeroMarquee.tsx:174` — Responsive container pattern (`max-w-7xl mx-auto px-6 lg:px-12`)
  - `src/components/heroes/_shared.tsx` — GrainOverlay, AnimatedWords, StoreCTAs, useReducedMotion, HeroBackground (built in Task 2)

  **API/Type References**:
  - `motion/react` — `useAnimate()` returns `[scope, animate]`. `animate(selector, keyframes, options)`.
  - `next/image` — `<Image src="" alt="" width={} height={} sizes="" priority />`

  **Asset References**:
  - `/public/mockups/weekly-plan-portrait.png` (1419×2796) — Primary hero image

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: HeroFloat renders correctly at mobile (375px)
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:3000, HeroSwitcher updated to include Float variant (or test in isolation)
    Steps:
      1. Set viewport to 375x812
      2. Navigate to: http://localhost:3000
      3. Click toolbar button for "Float" if toolbar present
      4. Wait for: img[alt*="weekly" i] visible within section (timeout: 10s)
      5. Assert: h1 is visible and contains "Plan meals"
      6. Assert: img[alt*="weekly" i] has naturalWidth > 0 (image loaded)
      7. Assert: document.body.scrollWidth <= 375 (no horizontal overflow)
      8. Assert: CTA buttons (links to apps.apple.com and play.google.com) are visible
      9. Screenshot: .sisyphus/evidence/task-3-float-375.png
    Expected Result: Centered stack layout, phone visible, no overflow
    Evidence: .sisyphus/evidence/task-3-float-375.png

  Scenario: HeroFloat renders correctly at desktop (1920px)
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 1920x1080
      2. Navigate to: http://localhost:3000
      3. Click toolbar button for "Float" if toolbar present
      4. Wait for: img[alt*="weekly" i] visible (timeout: 10s)
      5. Assert: section has min-height of at least 90vh
      6. Assert: img is rendered (naturalWidth > 0)
      7. Assert: no horizontal scroll
      8. Screenshot: .sisyphus/evidence/task-3-float-1920.png
    Expected Result: Centered layout with generous whitespace, phone with 3D tilt
    Evidence: .sisyphus/evidence/task-3-float-1920.png

  Scenario: HeroFloat respects reduced motion
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Emulate prefers-reduced-motion: reduce
      2. Set viewport to 1024x768
      3. Navigate to: http://localhost:3000
      4. Wait for section visible (timeout: 10s)
      5. Assert: h1 and img are visible (content renders without animation)
      6. Assert: No JavaScript errors in console
    Expected Result: Content fully visible, no animation, no errors
    Evidence: Console log captured
  ```

  **Evidence to Capture:**
  - [ ] `.sisyphus/evidence/task-3-float-375.png`
  - [ ] `.sisyphus/evidence/task-3-float-768.png`
  - [ ] `.sisyphus/evidence/task-3-float-1024.png`
  - [ ] `.sisyphus/evidence/task-3-float-1920.png`

  **Commit**: YES (groups with Task 2 if convenient)
  - Message: `feat(hero): add HeroFloat — minimalist centered phone variant`
  - Files: `src/components/heroes/HeroFloat.tsx`

---

- [x] 4. Build HeroTriptych — "The Triptych" (Three-Phone Fan)

  **What to do**:
  - Create `src/components/heroes/HeroTriptych.tsx`
  - **Layout Design**:
    - **Desktop (1024px+)**: Left side (45%): headline + subheadline + CTAs, left-aligned. Right side (55%): three left-angle mockup images fanned out — center phone straight (z-20, slightly larger), left phone rotated -12° (z-10), right phone rotated +12° (z-10). Phones overlap slightly. Warm glow behind the fan.
    - **Tablet (768px-1023px)**: Same layout but phones smaller. Two phones visible, third partially clipped.
    - **Mobile (< 768px)**: Stacked layout. Headline on top. Below: single phone with horizontal swipe indicator (3 dots). User can see one phone at a time. Use CSS scroll-snap for horizontal scrolling of 3 phone images.
    - **Ultra-wide (1920px+)**: Max container, phones don't scale past realistic size.
  - **Key Elements**:
    - Three mockup images (all left-angle for consistent 3D look):
      - Left: `/mockups/recipes-list-left.png`
      - Center: `/mockups/weekly-plan-left.png` (hero shot, largest)
      - Right: `/mockups/groceries-left.png`
    - Headline, subheadline, badge, CTAs — same copy pattern
    - Background: `HeroBackground` with grain (filterId: `triptych-grain`)
    - Glow: radial gradient behind the phone group
  - **Animation**:
    1. Left content slides in from left (0.9s)
    2. Headline words stagger
    3. Subheadline + CTAs sequence in
    4. Three phones stagger in from bottom with scale (0.8s each, 0.2s stagger between)
    5. Subtle hover: individual phones lift 4px on hover (CSS transition, not JS)
  - **Image sizing**: `sizes="(max-width: 768px) 70vw, (max-width: 1024px) 200px, 280px"` for each phone

  **Must NOT do**:
  - Do NOT use `PhoneFrame` — mockup PNGs include device chrome
  - Do NOT add fox mascot
  - Do NOT make mobile version show all 3 phones squeezed together — use scroll-snap

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex responsive layout with 3D transforms, fanning, and mobile scroll-snap behavior.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Critical for phone fanning composition, visual balance, and mobile scroll-snap UX.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Wave 2, second)
  - **Blocks**: Task 8
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/components/heroes/HeroMarquee.tsx:84-131` — Animation orchestration pattern
  - `src/components/heroes/HeroSplitScreen.tsx:186-223` — Overlapping phones pattern (absolute positioning with rotation + z-index)
  - `src/components/heroes/_shared.tsx` — Shared utilities (built in Task 2)

  **Asset References**:
  - `/public/mockups/weekly-plan-left.png` (1857×3096) — Center phone
  - `/public/mockups/recipes-list-left.png` (1857×3096) — Left phone
  - `/public/mockups/groceries-left.png` (1857×3096) — Right phone

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: HeroTriptych renders 3 phones on desktop
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 1920x1080
      2. Navigate to http://localhost:3000
      3. Click "Triptych" in toolbar
      4. Wait for section visible (timeout: 10s)
      5. Count img elements within hero section → Assert >= 3
      6. Assert: all 3 images have naturalWidth > 0
      7. Assert: no horizontal scroll
      8. Screenshot: .sisyphus/evidence/task-4-triptych-1920.png
    Expected Result: Three phones fanned, headline visible left
    Evidence: .sisyphus/evidence/task-4-triptych-1920.png

  Scenario: HeroTriptych shows single phone with scroll on mobile
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 375x812
      2. Navigate to http://localhost:3000
      3. Click "Triptych" in toolbar
      4. Wait for section visible
      5. Assert: headline visible
      6. Assert: at least 1 phone image visible
      7. Assert: no horizontal page overflow (body.scrollWidth <= 375)
      8. Screenshot: .sisyphus/evidence/task-4-triptych-375.png
    Expected Result: Stacked layout, single visible phone, scrollable
    Evidence: .sisyphus/evidence/task-4-triptych-375.png
  ```

  **Commit**: YES
  - Message: `feat(hero): add HeroTriptych — three-phone fan variant`
  - Files: `src/components/heroes/HeroTriptych.tsx`

---

- [x] 5. Build HeroStage — "The Stage" (Dramatic Split with Depth)

  **What to do**:
  - Create `src/components/heroes/HeroStage.tsx`
  - **Layout Design**:
    - **Desktop (1024px+)**: 55/45 split. Left: oversized headline (`clamp(2.8rem, 7vw, 5.5rem)`), subheadline, CTAs. Right: single portrait mockup with dramatic orange radial glow behind it, subtle `perspective(1000px) rotateY(-5deg)` tilt. Diagonal gradient background — cream on left bleeding into warm orange-100 tint on right.
    - **Tablet (768px-1023px)**: 50/50 split, phone scales down proportionally.
    - **Mobile (< 768px)**: Full-width stack. Headline on top (full width, centered or left-aligned). Phone centered below with glow. CTAs below phone. No 3D perspective on mobile.
    - **Ultra-wide (1920px+)**: Max container `max-w-7xl`, text gets more breathing room.
  - **Key Elements**:
    - Phone: `/mockups/weekly-plan-portrait.png` (hero shot)
    - Orange glow: `radial-gradient(circle, var(--color-orange-500) 0%, transparent 70%)` with `blur-3xl` and `opacity-30`
    - Diagonal gradient background: `linear-gradient(135deg, var(--color-cream-50) 0%, var(--color-cream-100) 55%, var(--color-orange-100) 100%)`
    - Grain overlay (filterId: `stage-grain`)
  - **Animation**:
    1. Left content slides in from left (0.9s)
    2. Headline words stagger up
    3. Subheadline slides in
    4. Phone rises from below with parallax offset (1.2s)
    5. Glow pulses subtly once then settles
    6. CTAs bounce in
    7. Optional: `useScroll()` from motion/react for subtle parallax as user scrolls past hero (phone moves up at 0.3x speed)

  **Must NOT do**:
  - Do NOT use `PhoneFrame`
  - Do NOT add fox mascot
  - Do NOT make the glow too intense — subtle premium feeling, not glaring

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Split layout with depth, glow effects, parallax, and polished visual design.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Critical for the split composition, glow intensity, and parallax feel.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Wave 2, third)
  - **Blocks**: Task 8
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/components/heroes/HeroMarquee.tsx:174` — Responsive container + flex layout pattern
  - `src/components/heroes/HeroSplitScreen.tsx:143-150` — Glow behind phones pattern (radial-gradient + blur)
  - `src/components/heroes/HeroMarquee.tsx:278-285` — Glow behind element pattern
  - `src/components/heroes/_shared.tsx` — Shared utilities

  **Asset References**:
  - `/public/mockups/weekly-plan-portrait.png` (1419×2796)

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: HeroStage renders split layout on desktop
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 1920x1080
      2. Navigate to localhost:3000, click "Stage" in toolbar
      3. Assert: h1 visible on left side of viewport
      4. Assert: img visible on right side of viewport
      5. Assert: no horizontal scroll
      6. Screenshot: .sisyphus/evidence/task-5-stage-1920.png
    Expected Result: Clear left/right split with phone and glow on right

  Scenario: HeroStage stacks on mobile
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 375x812
      2. Navigate + click "Stage"
      3. Assert: h1 visible
      4. Assert: img visible below h1
      5. Assert: no horizontal scroll
      6. Screenshot: .sisyphus/evidence/task-5-stage-375.png
    Expected Result: Clean vertical stack
  ```

  **Commit**: YES
  - Message: `feat(hero): add HeroStage — dramatic split layout variant`
  - Files: `src/components/heroes/HeroStage.tsx`

---

- [x] 6. Build HeroCascade — "The Cascade" (Scroll-Triggered Screen Showcase)

  **What to do**:
  - Create `src/components/heroes/HeroCascade.tsx`
  - **Layout Design**:
    - **Desktop (1024px+)**: First viewport: centered headline + single portrait phone. As user scrolls, phone stays **sticky** (`position: sticky; top: 50%; transform: translateY(-50%)`). Phone screen crossfades between 4 app screens. Feature captions appear alternately left/right of the phone for each screen. After 4 transitions, section ends and phone unsticks. Total section height ~400vh to allow scroll room.
    - **Tablet (768px-1023px)**: Same sticky behavior, phone slightly smaller, captions below phone instead of beside.
    - **Mobile (< 768px)**: **NO sticky behavior** (bad UX on mobile). Instead: vertical stack of 4 sections, each with a phone image + caption card. Simple scroll — user scrolls through each phone/caption pair. Phone images use portrait mockups at ~70vw.
    - **Ultra-wide (1920px+)**: Max container, captions get more space beside phone.
  - **Key Elements**:
    - 4 screens shown during scroll (portrait mockups):
      1. `/mockups/weekly-plan-portrait.png` — "Plan your meals for the week"
      2. `/mockups/recipes-list-portrait.png` — "Browse delicious recipes"
      3. `/mockups/groceries-portrait.png` — "Auto-generated grocery lists"
      4. `/mockups/monthly-calendar-portrait.png` — "See the big picture"
    - Headline at top: same copy pattern
    - CTAs at the bottom (after last screen)
    - Progress dots on desktop (small circles showing which screen is active)
    - Background: `HeroBackground` (filterId: `cascade-grain`)
  - **Animation** (motion/react):
    - Desktop: `useScroll({ target: sectionRef })` → `useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ...)` to drive screen crossfades and caption reveals
    - Mobile: Simple fade-in on each section using `whileInView` from motion/react
    - `prefers-reduced-motion`: All screens visible at once, no crossfade, no sticky

  **Must NOT do**:
  - Do NOT use `PhoneFrame`
  - Do NOT implement sticky on mobile (< 768px) — it's bad UX on small screens
  - Do NOT over-animate — smooth crossfades, not jarring transitions
  - Do NOT make total scroll height > 500vh — keep it reasonable

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Most complex variant — scroll-linked animations, sticky positioning, crossfade state management, and dramatically different mobile/desktop behavior.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Critical for scroll-linked animation timing, sticky UX, and mobile fallback design.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Wave 2, fourth)
  - **Blocks**: Task 8
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/components/heroes/HeroCarousel.tsx:124-136` — Crossfade pattern (animate opacity between elements)
  - `src/components/heroes/HeroCarousel.tsx:138-149` — Interval-based cycling pattern (adapt to scroll-based)
  - `src/components/heroes/_shared.tsx` — Shared utilities

  **External References**:
  - motion/react `useScroll` + `useTransform`: Used for scroll-linked animations. `useScroll({ target: ref })` returns `scrollYProgress` (0 to 1). `useTransform(scrollYProgress, inputRange, outputRange)` maps scroll position to animation values.
  - CSS `position: sticky`: For pinning phone during scroll. Needs a tall parent container.

  **Asset References**:
  - `/public/mockups/weekly-plan-portrait.png`
  - `/public/mockups/recipes-list-portrait.png`
  - `/public/mockups/groceries-portrait.png`
  - `/public/mockups/monthly-calendar-portrait.png`

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: HeroCascade scrolls through 4 screens on desktop
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 1920x1080
      2. Navigate + click "Cascade"
      3. Assert: section height is significantly > viewport height (section is tall for scroll)
      4. Assert: first phone image visible
      5. Scroll down 25% of section height
      6. Wait 500ms for crossfade
      7. Screenshot: .sisyphus/evidence/task-6-cascade-scroll-25.png
      8. Scroll down 75% of section height
      9. Screenshot: .sisyphus/evidence/task-6-cascade-scroll-75.png
      10. Assert: no horizontal scroll at any point
    Expected Result: Phone visible throughout scroll, screens change

  Scenario: HeroCascade shows stacked sections on mobile
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 375x812
      2. Navigate + click "Cascade"
      3. Assert: first phone image visible
      4. Scroll down past first section
      5. Assert: second phone image becomes visible
      6. Assert: no horizontal overflow
      7. Screenshot: .sisyphus/evidence/task-6-cascade-375.png
    Expected Result: Vertical stack of phone+caption pairs, no sticky
  ```

  **Commit**: YES
  - Message: `feat(hero): add HeroCascade — scroll-triggered screen showcase variant`
  - Files: `src/components/heroes/HeroCascade.tsx`

---

- [x] 7. Build HeroMosaic — "The Mosaic" (Asymmetric Photo Grid)

  **What to do**:
  - Create `src/components/heroes/HeroMosaic.tsx`
  - **Layout Design**:
    - **Desktop (1024px+)**: CSS Grid asymmetric layout. Mix of ALL three mockup angles:
      - Cell 1 (2 cols × 1 row): Headline + subheadline + CTAs (left-aligned text in card)
      - Cell 2 (1 col × 2 rows): Large portrait mockup (`weekly-plan-portrait.png`)
      - Cell 3 (1 col × 1 row): Left-angle mockup (`recipes-list-left.png`)
      - Cell 4 (2 cols × 1 row): Landscape mockup stretching horizontally (`groceries-landscape.png`)
      - Cell 5 (1 col × 1 row): Left-angle mockup (`meal-detail-left.png`)
      Grid template: `grid-template-columns: repeat(3, 1fr)` with cells spanning as needed. All cells have `rounded-3xl` and subtle border. Gap: 16-20px.
    - **Tablet (768px-1023px)**: 2-column grid, simplified arrangement. Headline cell full-width, phone cells arranged 2-up.
    - **Mobile (< 768px)**: Vertical card stack. Each cell is a full-width card. User scrolls through: headline card, then phone cards. Cards have slight shadow and rounded corners. `gap-4` between cards.
    - **Ultra-wide (1920px+)**: Max container `max-w-7xl`, grid cells don't stretch beyond comfortable size.
  - **Key Elements**:
    - Uses ALL three mockup angles (portrait, landscape, left-angle) — this is the unique differentiator
    - Each cell has subtle `bg-cream-100` or `bg-brown-100` background tint with `border border-cream-200/60`
    - Glow behind grid (radial gradient, subtle)
    - Background: `HeroBackground` (filterId: `mosaic-grain`)
  - **Animation**:
    1. Grid cells stagger in with scale + opacity (0.8s each, 0.1s stagger)
    2. Hover on any cell: subtle lift (-2px translateY) + shadow increase (CSS transition)
  - **Image sizing**: Varies by cell — portrait cells: `sizes="(max-width: 768px) 90vw, 300px"`, landscape cells: `sizes="(max-width: 768px) 90vw, 600px"`, left-angle cells: `sizes="(max-width: 768px) 90vw, 280px"`

  **Must NOT do**:
  - Do NOT use `PhoneFrame`
  - Do NOT add fox mascot
  - Do NOT make grid cells too small — each mockup should be clearly visible
  - Do NOT force equal cell sizes — asymmetry is the point

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex CSS Grid layout with asymmetric spans, mixed aspect ratios, and responsive grid collapse.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Critical for grid composition, cell proportions, and the editorial layout feel.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Wave 2, fifth/last)
  - **Blocks**: Task 8
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/components/heroes/HeroBento.tsx:129-231` — Bento grid pattern (CSS Grid with col-span, row-span, responsive collapse)
  - `src/components/heroes/HeroBento.tsx:139` — Grid cell styling pattern (rounded-3xl, shadow, border, bg-cream-100)
  - `src/components/heroes/_shared.tsx` — Shared utilities

  **Asset References**:
  - `/public/mockups/weekly-plan-portrait.png` — Large portrait cell
  - `/public/mockups/recipes-list-left.png` — Angled cell
  - `/public/mockups/groceries-landscape.png` — Wide landscape cell
  - `/public/mockups/meal-detail-left.png` — Angled cell
  - `/public/mockups/monthly-calendar-portrait.png` — (Optional 5th cell if grid has room)

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: HeroMosaic renders asymmetric grid on desktop
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 1920x1080
      2. Navigate + click "Mosaic"
      3. Count img elements in hero section → Assert >= 4
      4. Assert: all images have naturalWidth > 0
      5. Assert: h1 visible
      6. Assert: no horizontal scroll
      7. Screenshot: .sisyphus/evidence/task-7-mosaic-1920.png
    Expected Result: Asymmetric grid with mixed mockup angles

  Scenario: HeroMosaic shows card stack on mobile
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 375x812
      2. Navigate + click "Mosaic"
      3. Assert: h1 visible
      4. Assert: at least first mockup image visible
      5. Assert: no horizontal scroll
      6. Screenshot: .sisyphus/evidence/task-7-mosaic-375.png
    Expected Result: Full-width card stack
  ```

  **Commit**: YES
  - Message: `feat(hero): add HeroMosaic — asymmetric photo grid variant`
  - Files: `src/components/heroes/HeroMosaic.tsx`

---

- [x] 8. Update HeroSwitcher — Wire Up New Variants + Always-Visible Toolbar

  **What to do**:
  - Rewrite `src/components/HeroSwitcher.tsx`:
    1. Remove `useSearchParams` and `?hero=showcase` gating entirely
    2. Remove `Suspense` wrapper (no longer needed without search params)
    3. Update `HeroVariant` type to: `'float' | 'triptych' | 'stage' | 'cascade' | 'mosaic'`
    4. Update `HERO_OPTIONS` to match new variant names and labels
    5. Dynamic import all 5 new hero components
    6. Default variant: `'float'` (the cleanest, loads fastest)
    7. Toolbar always rendered — no conditional
    8. Keep toolbar styling (fixed bottom-right, z-50, brown-900/95 bg, orange-500 active state)
  - Update `src/app/page.tsx` if needed (HeroSwitcher import should stay the same)

  **Must NOT do**:
  - Do NOT import old hero components
  - Do NOT reference `useSearchParams` or `Suspense` for search params
  - Do NOT change toolbar visual design (it works well already)
  - Do NOT change the page.tsx structure beyond what's needed for the hero

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward component rewiring — replace imports and update types. No creative design work.
  - **Skills**: []
    - No special skills needed.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (first)
  - **Blocks**: Task 9
  - **Blocked By**: Tasks 3, 4, 5, 6, 7 (all heroes must be built)

  **References**:

  **Pattern References**:
  - `src/components/HeroSwitcher.tsx` — Current switcher implementation (rewrite this file entirely)

  **API/Type References**:
  - `next/dynamic` — Dynamic import pattern: `const HeroFloat = dynamic(() => import('./heroes/HeroFloat').then(m => ({ default: m.HeroFloat })))`

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Toolbar is visible without query params
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 1920x1080
      2. Navigate to http://localhost:3000 (NO ?hero= param)
      3. Assert: div[role="toolbar"] is visible
      4. Assert: 5 buttons within toolbar
      5. Assert: buttons have labels "Float", "Triptych", "Stage", "Cascade", "Mosaic"
      6. Screenshot: .sisyphus/evidence/task-8-toolbar-visible.png
    Expected Result: Toolbar always visible with 5 options

  Scenario: Clicking each variant switches the hero
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 1920x1080
      2. Navigate to localhost:3000
      3. For each variant name in ["Float", "Triptych", "Stage", "Cascade", "Mosaic"]:
         a. Click button containing variant name text
         b. Wait 1s for dynamic import + render
         c. Assert: a section element is visible within main content
         d. Assert: no JavaScript errors in console
      4. Screenshot after last switch: .sisyphus/evidence/task-8-switching.png
    Expected Result: Each click renders a different hero variant without errors

  Scenario: Default hero renders on fresh load
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to localhost:3000
      2. Assert: "Float" button has aria-pressed="true" (or active styling)
      3. Assert: section with hero content is visible
      4. Assert: weekly-plan mockup image loaded
    Expected Result: Float is default hero
  ```

  **Commit**: YES
  - Message: `feat(hero): rewire HeroSwitcher with 5 new variants, always-visible toolbar`
  - Files: `src/components/HeroSwitcher.tsx`
  - Pre-commit: `npm run build`

---

- [ ] 9. Delete Old Hero Code + Unused Screenshots

  **What to do**:
  - **Delete old hero component files**:
    - `src/components/heroes/HeroMarquee.tsx`
    - `src/components/heroes/HeroShowcase.tsx`
    - `src/components/heroes/HeroCarousel.tsx`
    - `src/components/heroes/HeroSplitScreen.tsx`
    - `src/components/heroes/HeroBento.tsx`
    - `src/components/sections/Hero.tsx` (dead code, not imported anywhere)
    - `src/components/VerticalMarquee.tsx` (only used by HeroMarquee)
  - **Delete unused screenshot files** (ONLY those NOT used by `Features.tsx`):
    - DELETE: `/public/screenshots/groceries-checked.png` (only used in old HeroMarquee)
    - DELETE: `/public/screenshots/meal-detail.png` (only used in old heroes)
    - DELETE: `/public/screenshots/monthly-view.png` (only used in old heroes)
    - DELETE: `/public/screenshots/welcome.png` (only used in old HeroMarquee)
    - **KEEP**: `/public/screenshots/weekly-plan.png` (used by `Features.tsx:13`)
    - **KEEP**: `/public/screenshots/groceries-empty.png` (used by `Features.tsx:20`)
    - **KEEP**: `/public/screenshots/recipes-list.png` (used by `Features.tsx:27`)
  - **Delete old mockup source directory** (now that files are in /public/mockups/):
    - `rm -rf apple-iphone-15-yellow-mockup/`
  - **Keep**:
    - `src/components/PhoneFrame.tsx` — still used by `Features.tsx`
    - `/public/fox-mascot.png` — verify not used elsewhere; if only used in old heroes, leave for now (future cleanup)
  - **Verification**: Run `grep -r "HeroMarquee\|HeroShowcase\|HeroCarousel\|HeroSplitScreen\|HeroBento\|VerticalMarquee" src/` to confirm no remaining imports
  - **Verification**: Run `grep -r "/screenshots/groceries-checked\|/screenshots/meal-detail\|/screenshots/monthly-view\|/screenshots/welcome" src/` to confirm no remaining references to deleted screenshots

  **Must NOT do**:
  - Do NOT delete `PhoneFrame.tsx` — `Features.tsx` depends on it
  - Do NOT delete `weekly-plan.png`, `groceries-empty.png`, or `recipes-list.png` — `Features.tsx` depends on them
  - Do NOT delete `fox-mascot.png` without verifying it's truly unused outside heroes (check all files)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: File deletion + grep verification. No creative work.
  - **Skills**: []
    - No skills needed.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (after Task 8)
  - **Blocks**: None (final task)
  - **Blocked By**: Task 8

  **References**:

  **Pattern References**:
  - `src/components/sections/Features.tsx:5,13,20,27,269` — Confirms dependency on PhoneFrame + 3 screenshots (DO NOT DELETE THESE)

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Old hero files are deleted
    Tool: Bash
    Steps:
      1. ls src/components/heroes/HeroMarquee.tsx 2>&1 → Assert "No such file"
      2. ls src/components/heroes/HeroShowcase.tsx 2>&1 → Assert "No such file"
      3. ls src/components/heroes/HeroCarousel.tsx 2>&1 → Assert "No such file"
      4. ls src/components/heroes/HeroSplitScreen.tsx 2>&1 → Assert "No such file"
      5. ls src/components/heroes/HeroBento.tsx 2>&1 → Assert "No such file"
      6. ls src/components/sections/Hero.tsx 2>&1 → Assert "No such file"
      7. ls src/components/VerticalMarquee.tsx 2>&1 → Assert "No such file"
    Expected Result: All 7 old files deleted

  Scenario: No remaining imports of old heroes
    Tool: Bash
    Steps:
      1. grep -r "HeroMarquee\|HeroShowcase\|HeroCarousel\|HeroSplitScreen\|HeroBento\|VerticalMarquee" src/ 2>&1
         → Assert: no results (empty output or only .next cache)
    Expected Result: Zero references to old hero components in source

  Scenario: Features.tsx still works (screenshots preserved)
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 1920x1080
      2. Navigate to localhost:3000
      3. Scroll to Features section (look for heading containing "features" or similar)
      4. Assert: PhoneFrame images within Features section have naturalWidth > 0
      5. Screenshot: .sisyphus/evidence/task-9-features-intact.png
    Expected Result: Features section renders with phone screenshots intact
    Evidence: .sisyphus/evidence/task-9-features-intact.png

  Scenario: Build succeeds after cleanup
    Tool: Bash
    Steps:
      1. npm run build 2>&1
      2. Assert: exit code 0
      3. Assert: output does not contain "Error" or "error"
    Expected Result: Clean build with no errors
  ```

  **Commit**: YES
  - Message: `chore(hero): remove old hero variants, unused screenshots, and mockup source`
  - Files: Deleted files listed above
  - Pre-commit: `npm run build`

---

## Commit Strategy

| After Task | Message | Key Files | Verification |
|------------|---------|-----------|--------------|
| 1 | `feat(hero): migrate mockup images to /public/mockups with clean names` | `public/mockups/*` | `ls public/mockups/ \| wc -l` → 21 |
| 2 | `refactor(hero): extract shared hero utilities to _shared.tsx` | `src/components/heroes/_shared.tsx` | `npx tsc --noEmit` |
| 3 | `feat(hero): add HeroFloat — minimalist centered phone variant` | `src/components/heroes/HeroFloat.tsx` | Playwright screenshots |
| 4 | `feat(hero): add HeroTriptych — three-phone fan variant` | `src/components/heroes/HeroTriptych.tsx` | Playwright screenshots |
| 5 | `feat(hero): add HeroStage — dramatic split layout variant` | `src/components/heroes/HeroStage.tsx` | Playwright screenshots |
| 6 | `feat(hero): add HeroCascade — scroll-triggered screen showcase variant` | `src/components/heroes/HeroCascade.tsx` | Playwright screenshots |
| 7 | `feat(hero): add HeroMosaic — asymmetric photo grid variant` | `src/components/heroes/HeroMosaic.tsx` | Playwright screenshots |
| 8 | `feat(hero): rewire HeroSwitcher with 5 new variants, always-visible toolbar` | `src/components/HeroSwitcher.tsx` | `npm run build` |
| 9 | `chore(hero): remove old hero variants, unused screenshots, and mockup source` | Deleted files | `npm run build` + grep verification |

---

## Success Criteria

### Verification Commands
```bash
npm run build                    # Expected: exit code 0, no errors
ls public/mockups/ | wc -l      # Expected: 21
ls public/screenshots/           # Expected: weekly-plan.png, groceries-empty.png, recipes-list.png (3 files kept)
grep -r "HeroMarquee" src/      # Expected: no results
grep -r "PhoneFrame" src/components/heroes/Hero*.tsx  # Expected: no results (new heroes don't use it)
```

### Final Checklist
- [ ] All 5 new hero variants render at 375px, 768px, 1024px, 1920px without horizontal scroll
- [ ] Toolbar always visible, switching works between all 5 variants
- [ ] All mockup images load (no 404s, no broken images)
- [ ] `prefers-reduced-motion` respected on all variants
- [ ] Features section still renders correctly (PhoneFrame + 3 screenshots intact)
- [ ] No fox mascot in any new hero variant
- [ ] No `PhoneFrame` usage in any new hero variant
- [ ] `npm run build` passes with zero errors
- [ ] No references to old hero component names in source code
- [ ] Old mockup source directory removed
