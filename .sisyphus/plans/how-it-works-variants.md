# How It Works — 10 Variant Experiment

## TL;DR

> **Quick Summary**: Build 10 creative "How It Works" section variants that show Fenne's meal planning workflow as a cyclical loop (not linear 1-2-3 steps), plus a switcher toolbar to toggle between them. User picks a winner, losers get deleted.
> 
> **Deliverables**:
> - 10 HowItWorks variant components (HowItWorks01 through HowItWorks10)
> - 1 HowItWorksSwitcher wrapper component with fixed toolbar
> - Updated page.tsx to use the switcher
> - All variants build without TypeScript errors
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 3 waves (infrastructure → 10 variants parallel → wiring)
> **Critical Path**: Shared data + Switcher scaffold → Variants (parallel) → Final wiring + build verify

---

## Context

### Original Request
User said: "fix How It Works and that cringe Simple as 1-2-3" and "prepare 10 different how it works sections with a switcher just like before and let's experiment"

### Interview Summary
**Key Discussions**:
- Current HowItWorks uses emojis, linear 1-2-3 timeline, "Simple as 1-2-3" label — user hates all of it
- The app workflow is a **LOOP**: Add Recipes → Plan Week → Generate List → Shop → Cook → Repeat
- Must use lucide-react icons, cream/orange/brown palette, motion/react animations
- Same experiment workflow used for bento grid: build all variants, switcher to toggle, pick winner, delete rest
- Copy must reflect the actual app: no AI, no suggestions, user adds their OWN recipes, simplicity is key

**Research Findings**:
- Explore agent documented all animation patterns (easeOutQuint, easeOutCubic, useInView, stagger patterns)
- Librarian produced 10 concept ideas with code snippets and references
- No existing switcher component in codebase (was deleted after previous experiments)

### Metis Review
**Identified Gaps** (addressed):
- No switcher pattern exists — must build from scratch (simple: fixed toolbar + state toggle)
- Each variant needs its own file with self-contained step data and copy
- Scope creep risk: variants should NOT touch other sections or add new dependencies
- Build verification is mandatory — `bun run build` must pass with zero errors

---

## Work Objectives

### Core Objective
Replace the current "cringe" linear How It Works section with 10 creative variants that communicate Fenne's cyclical meal planning workflow, presented via a togglable switcher for user evaluation.

### Concrete Deliverables
- `src/components/sections/how-it-works/HowItWorks01.tsx` through `HowItWorks10.tsx`
- `src/components/sections/how-it-works/HowItWorksSwitcher.tsx`
- `src/components/sections/how-it-works/index.tsx` (re-export)
- Updated `src/app/page.tsx` to import from new location

### Definition of Done
- [ ] All 10 variants render without errors
- [ ] Switcher toggles between all 10 variants
- [ ] `bun run build` passes with zero TypeScript errors
- [ ] No emojis anywhere — lucide-react icons only
- [ ] Color palette matches existing site (cream/orange/brown)
- [ ] All variants communicate the cyclical/loop nature of the workflow
- [ ] Each variant is responsive (mobile + desktop)

### Must Have
- Cyclical/loop visual communication (NOT linear 1-2-3)
- lucide-react icons for all visual elements
- Correct app workflow copy: Add Recipes → Plan Week → Generate List → Shop → Cook → Repeat
- Accurate descriptions matching real app behavior (no AI mentions, no "suggestions", user adds OWN recipes)
- motion/react animations consistent with rest of site
- Responsive layouts (mobile-first)
- Fixed switcher toolbar visible while scrolling the section

### Must NOT Have (Guardrails)
- No emojis — lucide-react icons only
- No "Simple as 1-2-3" or any linear step numbering as the primary concept
- No AI/ML/suggestion language — the app is simple and manual
- No new npm dependencies — use only motion/react, lucide-react, Tailwind
- No changes to other sections (Hero, BentoGrid, Testimonials, CTA, Footer)
- No changes to global styles or shared utilities
- No fancy apostrophes (use standard ' not ')
- No "Coming Soon" labels on any feature
- No generic marketing fluff — keep copy specific to what Fenne actually does

---

## Verification Strategy

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
> ALL verification is executed by the agent using tools.

### Test Decision
- **Infrastructure exists**: NO (no test framework)
- **Automated tests**: NO (visual/UI experiment — not testable with unit tests)
- **Framework**: None

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

Every task verified via:
1. **Build check**: `bun run build` — zero TypeScript errors
2. **Visual check**: Playwright opens localhost:3000, scrolls to How It Works section, screenshots each variant via switcher
3. **Responsive check**: Screenshots at mobile (375px) and desktop (1280px) widths
4. **Content check**: Verify no emojis, correct copy, lucide-react icons rendered

---

## The 10 Variant Concepts

### Shared Step Data (all variants use the same 5 steps + loop concept)

```
Steps:
1. Add Recipes — "Save recipes you find online to your personal collection"
   Icon: BookPlus or similar
   Frequency: Ongoing, infrequent

2. Plan Your Week — "Assign meals to days in under 10 minutes"
   Icon: CalendarDays or similar
   Frequency: Weekly, ~10 min

3. Generate List — "One tap creates your grocery list, sorted by aisle"
   Icon: ListChecks or similar
   Frequency: Weekly, 1 tap

4. Shop & Check Off — "Pull up your list at the store, check off items as you go"
   Icon: ShoppingCart or similar
   Frequency: Weekly, at the store

5. Cook — "Open the app, see today's meal, start cooking"
   Icon: ChefHat or Utensils or similar
   Frequency: Daily, just a glance

Loop: This repeats every week. The cycle IS the feature.
```

### Variant Descriptions

| # | Name | Visual Concept | How It Shows the Loop |
|---|------|---------------|----------------------|
| 01 | **Loop Wheel** | Circular diagram with 5 segments, scroll-triggered rotation | Literal circle — no start/end |
| 02 | **Orbital** | Central element with steps orbiting around it | Planets orbit endlessly |
| 03 | **Infinite Carousel** | Horizontally scrolling cards that loop seamlessly | Cards never stop scrolling |
| 04 | **Habit Stack** | Curved vertical timeline grouped by frequency (once/weekly/daily) | Grouped by rhythm, not sequence |
| 05 | **Breathing Cycle** | Pulsing circle with step content that morphs on each pulse | Breathing = natural cycle |
| 06 | **Weekly Rhythm** | 7-column week grid showing when each step happens | Maps to actual week cadence |
| 07 | **Flowing River** | Wavy SVG path with animated dots traveling along it | River flows continuously |
| 08 | **Card Carousel** | Horizontally stacked cards with auto-advance, interactive | Cards cycle through |
| 09 | **Progress Ring** | Apple Watch-style ring that fills on scroll, icons at positions | Ring = complete cycle |
| 10 | **Connected Grid** | Asymmetric card grid with animated connecting lines between steps | Connections show flow direction |

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
└── Task 1: Create directory structure, shared data file, switcher scaffold, page.tsx wiring

Wave 2 (After Wave 1 — ALL PARALLEL):
├── Task 2: HowItWorks01 — Loop Wheel
├── Task 3: HowItWorks02 — Orbital
├── Task 4: HowItWorks03 — Infinite Carousel
├── Task 5: HowItWorks04 — Habit Stack
├── Task 6: HowItWorks05 — Breathing Cycle
├── Task 7: HowItWorks06 — Weekly Rhythm
├── Task 8: HowItWorks07 — Flowing River
├── Task 9: HowItWorks08 — Card Carousel
├── Task 10: HowItWorks09 — Progress Ring
└── Task 11: HowItWorks10 — Connected Grid

Wave 3 (After Wave 2):
└── Task 12: Final build verification + visual QA of all 10 variants via switcher
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2-11 | None (must be first) |
| 2 | 1 | 12 | 3, 4, 5, 6, 7, 8, 9, 10, 11 |
| 3 | 1 | 12 | 2, 4, 5, 6, 7, 8, 9, 10, 11 |
| 4 | 1 | 12 | 2, 3, 5, 6, 7, 8, 9, 10, 11 |
| 5 | 1 | 12 | 2, 3, 4, 6, 7, 8, 9, 10, 11 |
| 6 | 1 | 12 | 2, 3, 4, 5, 7, 8, 9, 10, 11 |
| 7 | 1 | 12 | 2, 3, 4, 5, 6, 8, 9, 10, 11 |
| 8 | 1 | 12 | 2, 3, 4, 5, 6, 7, 9, 10, 11 |
| 9 | 1 | 12 | 2, 3, 4, 5, 6, 7, 8, 10, 11 |
| 10 | 1 | 12 | 2, 3, 4, 5, 6, 7, 8, 9, 11 |
| 11 | 1 | 12 | 2, 3, 4, 5, 6, 7, 8, 9, 10 |
| 12 | 2-11 | None | None (final) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1 | `task(category="quick", load_skills=["frontend-ui-ux"])` |
| 2 | 2-11 | `task(category="visual-engineering", load_skills=["frontend-ui-ux"])` — all 10 in parallel |
| 3 | 12 | `task(category="quick", load_skills=["playwright", "frontend-ui-ux"])` |

---

## TODOs

- [x] 1. Scaffold directory structure, switcher component, and page wiring

  **What to do**:
  - Create directory `src/components/sections/how-it-works/`
  - Create `HowItWorksSwitcher.tsx` — a `'use client'` component that:
    - Maintains `activeVariant` state (1-10)
    - Renders a fixed toolbar at the bottom-center of the viewport (like a dock)
    - Toolbar has 10 numbered buttons. Active one highlighted with orange-500 bg
    - Toolbar uses `position: fixed`, `bottom: 24px`, centered, `z-index: 50`
    - Toolbar has cream-50 bg with shadow and rounded-full styling
    - Conditionally renders the active variant component
    - Keyboard nav: left/right arrow keys to cycle variants
  - Create `index.tsx` that re-exports `HowItWorksSwitcher as HowItWorks`
  - Create placeholder files for HowItWorks01 through HowItWorks10 (each exports a named function component that returns a `<section>` with "Variant N — Coming Soon" text)
  - Update `src/app/page.tsx`: change import from `'@/components/sections/HowItWorks'` to `'@/components/sections/how-it-works'`
  - Delete old `src/components/sections/HowItWorks.tsx`
  - Verify: `bun run build` passes

  **Must NOT do**:
  - Do NOT change any other imports or components in page.tsx
  - Do NOT modify BentoGrid, Testimonials, CTA, Footer, or Hero
  - Do NOT add any npm dependencies

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Knows component patterns, React state, Tailwind styling

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (solo)
  - **Blocks**: Tasks 2-11 (all variants depend on this structure)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/components/sections/HowItWorks.tsx` — Current component to replace (read for section ID, className patterns, noise texture background)
  - `src/components/sections/features/BentoGrid.tsx` — Reference for `'use client'`, motion imports, animation patterns
  - `src/components/sections/features/index.tsx` — Re-export pattern to follow

  **Page Integration**:
  - `src/app/page.tsx:4` — Current import: `import { HowItWorks } from '@/components/sections/HowItWorks'`
  - `src/app/page.tsx:23` — Usage: `<HowItWorks />`

  **Style References**:
  - `src/app/globals.css` — Color variables (cream-50, orange-500, brown-900, etc.)
  - Toolbar style inspiration: macOS dock — rounded pill, subtle shadow, centered bottom

  **Acceptance Criteria**:

  - [ ] Directory `src/components/sections/how-it-works/` exists with 12 files (switcher, index, 10 variants)
  - [ ] Old `src/components/sections/HowItWorks.tsx` is deleted
  - [ ] `src/app/page.tsx` imports from new location
  - [ ] Switcher renders with numbered toolbar and shows active variant
  - [ ] `bun run build` → zero errors

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Switcher renders with toolbar and placeholder content
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:3000
    Steps:
      1. Navigate to: http://localhost:3000
      2. Scroll to: section#how-it-works (or the section containing variant content)
      3. Assert: Fixed toolbar visible at bottom of viewport with 10 numbered buttons
      4. Assert: Default variant (1) content is visible
      5. Click: Button "2" in the toolbar
      6. Assert: Variant 2 placeholder content is now visible
      7. Click: Button "10" in the toolbar
      8. Assert: Variant 10 placeholder content is now visible
      9. Screenshot: .sisyphus/evidence/task-1-switcher-scaffold.png
    Expected Result: Toolbar toggles between placeholder variants
    Evidence: .sisyphus/evidence/task-1-switcher-scaffold.png

  Scenario: Build passes with zero errors
    Tool: Bash
    Steps:
      1. Run: bun run build
      2. Assert: Exit code 0
      3. Assert: No "Type error" or "Error" in output
    Expected Result: Clean build
    Evidence: Build output captured
  ```

  **Commit**: YES
  - Message: `feat(how-it-works): scaffold variant directory structure and switcher component`
  - Files: `src/components/sections/how-it-works/*, src/app/page.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 2. HowItWorks01 — Loop Wheel

  **What to do**:
  - Replace placeholder in `src/components/sections/how-it-works/HowItWorks01.tsx`
  - **Concept**: Large circular diagram in the center with 5 segments arranged around it
  - Each segment represents one step: Add Recipes, Plan Week, Generate List, Shop, Cook
  - Segments are arranged clockwise around the circle
  - Active/hovered segment expands slightly and shows description text
  - Center of the circle shows "Your Weekly Routine" or similar
  - Small lucide-react icons in each segment
  - Circular arrows or continuous border to emphasize "no start, no end"
  - On scroll into view, the circle rotates slightly and segments fade in with stagger
  - Section title: something better than "How It Works" — e.g., "A Routine, Not a Chore" or "Your Weekly Loop" (agent can pick, avoid cringe)
  - Subtitle/label above title in mono font (like other sections use)
  - Background: cream-50 with noise texture (same pattern as current HowItWorks)
  - Mobile: Stack steps vertically with a simplified circular indicator at top

  **Must NOT do**:
  - No emojis
  - No "Simple as 1-2-3" or step numbering as the main concept
  - No AI/suggestion language in copy
  - No new dependencies
  - No fancy apostrophes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: SVG circle layout, responsive design, animation choreography

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3-11)
  - **Blocks**: Task 12
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/sections/features/BentoGrid.tsx:16-21` — `cardAnimation` pattern with `easeOutCubic`
  - `src/components/sections/features/BentoGrid.tsx:1-14` — Imports pattern (motion, useInView, lucide-react icons, easings)
  - `src/lib/easings.ts` — `easeOutQuint` and `easeOutCubic` easing arrays

  **Style References**:
  - `src/app/globals.css` — Full color palette variables
  - `src/components/sections/HowItWorks.tsx:96-104` — Noise texture background pattern to reuse (the SVG data URL at opacity 0.03)

  **Icon References**:
  - lucide-react icons: BookPlus (add recipes), CalendarDays (plan), ListChecks (generate list), ShoppingCart (shop), Utensils (cook), RefreshCw (repeat/loop)

  **Acceptance Criteria**:
  - [ ] Circular diagram renders with 5 segments + icons
  - [ ] No emojis in the component
  - [ ] Communicates cyclical nature (no start/end implied)
  - [ ] Responsive: works on 375px and 1280px widths
  - [ ] Uses motion/react for entrance animations
  - [ ] `bun run build` → zero errors

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Loop Wheel variant renders correctly
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, switcher on variant 1
    Steps:
      1. Navigate to: http://localhost:3000
      2. Click switcher button "1" (if not already active)
      3. Scroll to How It Works section
      4. Assert: Circular/wheel visual element is visible
      5. Assert: 5 step labels are visible (Add Recipes, Plan, Generate, Shop, Cook)
      6. Assert: No emoji characters in the section (no 🦊, ✨, 🍽️)
      7. Assert: lucide-react SVG icons are present (check for <svg> elements within section)
      8. Screenshot at 1280px width: .sisyphus/evidence/task-2-loopwheel-desktop.png
      9. Resize to 375px width
      10. Screenshot: .sisyphus/evidence/task-2-loopwheel-mobile.png
    Expected Result: Circular diagram with 5 labeled segments, responsive
    Evidence: .sisyphus/evidence/task-2-loopwheel-desktop.png, task-2-loopwheel-mobile.png
  ```

  **Commit**: YES (group with other Wave 2 variants)
  - Message: `feat(how-it-works): add variant 01 — Loop Wheel`
  - Files: `src/components/sections/how-it-works/HowItWorks01.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 3. HowItWorks02 — Orbital

  **What to do**:
  - Replace placeholder in `src/components/sections/how-it-works/HowItWorks02.tsx`
  - **Concept**: Central "hub" element (could be the Fenne icon or just "You") with 5 step cards orbiting around it
  - Orbital paths shown as dotted/dashed ellipses in orange-200 or orange-100
  - Each orbiting element is a small card with icon + label
  - On hover/tap, orbiting card expands to show description
  - Orbiting animation: gentle continuous rotation (slow, like 30s per revolution)
  - Steps closer to center = more frequent (Cook closest, Add Recipes furthest)
  - Section title + mono label above
  - Background: cream-50 with noise texture
  - Mobile: Flatten to a radial list — center element at top, steps listed below with distance indicators

  **Must NOT do**:
  - No emojis, no "1-2-3", no AI language, no new deps, no fancy apostrophes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: CSS transforms for orbital positioning, animation timing

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 4-11)
  - **Blocks**: Task 12
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/sections/features/BentoGrid.tsx:16-21` — cardAnimation pattern
  - `src/components/sections/features/BentoGrid.tsx:200-210` — RefreshCw continuous rotation animation (duration: 4, repeat: Infinity)
  - `src/lib/easings.ts` — Easing functions

  **Style References**:
  - `src/app/globals.css` — Color palette
  - `src/components/sections/HowItWorks.tsx:96-104` — Noise texture background

  **Acceptance Criteria**:
  - [ ] Central element visible with 5 orbiting step cards
  - [ ] Orbiting animation runs smoothly (no jank)
  - [ ] No emojis, lucide-react icons used
  - [ ] Responsive mobile layout
  - [ ] `bun run build` → zero errors

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Orbital variant renders with orbiting elements
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, switcher available
    Steps:
      1. Navigate to: http://localhost:3000
      2. Click switcher button "2"
      3. Scroll to How It Works section
      4. Assert: Central hub element visible
      5. Assert: 5 orbiting cards visible with step labels
      6. Assert: No emoji characters
      7. Screenshot at 1280px: .sisyphus/evidence/task-3-orbital-desktop.png
      8. Resize to 375px, screenshot: .sisyphus/evidence/task-3-orbital-mobile.png
    Expected Result: Orbital layout with central hub and 5 orbiting steps
    Evidence: .sisyphus/evidence/task-3-orbital-desktop.png, task-3-orbital-mobile.png
  ```

  **Commit**: YES
  - Message: `feat(how-it-works): add variant 02 — Orbital`
  - Files: `src/components/sections/how-it-works/HowItWorks02.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 4. HowItWorks03 — Infinite Carousel

  **What to do**:
  - Replace placeholder in `src/components/sections/how-it-works/HowItWorks03.tsx`
  - **Concept**: Horizontally scrolling cards that auto-scroll and loop infinitely
  - Each card shows one step: large icon, title, description, time estimate
  - Cards duplicate at the end for seamless loop (render steps twice)
  - Auto-scrolls slowly left. Pauses on hover.
  - Cards have cream/white bg with subtle shadow, orange accent on left border
  - An arrow or infinity symbol (lucide-react Infinity icon) above the carousel to hint at the loop
  - Section title + mono label
  - Background: cream-50 with noise texture
  - Mobile: Same horizontal scroll but smaller cards, touch-draggable

  **Must NOT do**:
  - No emojis, no "1-2-3", no AI language, no new deps, no fancy apostrophes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Infinite scroll animation, CSS overflow handling

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/sections/features/BentoGrid.tsx:16-21` — Card animation pattern
  - `src/lib/easings.ts` — Easing functions

  **Style References**:
  - `src/app/globals.css` — Color palette
  - `src/components/sections/HowItWorks.tsx:96-104` — Noise texture background

  **External References**:
  - motion/react `animate` with `repeat: Infinity` and `linear` ease for smooth auto-scroll
  - Pattern: duplicate children array for seamless loop (`[...steps, ...steps]`)

  **Acceptance Criteria**:
  - [ ] Cards scroll horizontally and loop seamlessly
  - [ ] Auto-scroll pauses on hover
  - [ ] 5 steps shown with icons and descriptions
  - [ ] No emojis, responsive
  - [ ] `bun run build` → zero errors

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Infinite carousel scrolls and loops
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:3000
      2. Click switcher button "3"
      3. Scroll to How It Works section
      4. Assert: Horizontally scrolling cards visible
      5. Wait 3 seconds — assert cards have moved (x position changed)
      6. Hover over the carousel area
      7. Wait 2 seconds — assert cards stopped moving (paused on hover)
      8. Screenshot: .sisyphus/evidence/task-4-carousel-desktop.png
    Expected Result: Cards auto-scroll, pause on hover, loop seamlessly
    Evidence: .sisyphus/evidence/task-4-carousel-desktop.png
  ```

  **Commit**: YES
  - Message: `feat(how-it-works): add variant 03 — Infinite Carousel`
  - Files: `src/components/sections/how-it-works/HowItWorks03.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 5. HowItWorks04 — Habit Stack

  **What to do**:
  - Replace placeholder in `src/components/sections/how-it-works/HowItWorks04.tsx`
  - **Concept**: Steps grouped by FREQUENCY instead of sequence
  - Three groups with curved connecting lines between them:
    - **"Set it up"** (once): Add Recipes — "Save recipes as you discover them"
    - **"Every week"** (~10 min): Plan Week + Generate List — "Quick weekly ritual"
    - **"Every day"** (a glance): Shop + Cook — "Part of your daily flow"
  - Each group is a card/block with its steps inside
  - Curved, organic connector lines between groups (SVG paths, not straight lines)
  - Emphasize decreasing effort: "Once → Weekly → Daily (almost zero effort)"
  - Section title + mono label
  - Background: cream-50 with noise texture
  - Mobile: Stack groups vertically, connectors become simple downward curves

  **Must NOT do**:
  - No emojis, no "1-2-3", no AI language, no new deps, no fancy apostrophes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: SVG curved paths, grouped card layouts

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/sections/features/BentoGrid.tsx:16-21` — Card animation
  - `src/components/sections/HowItWorks.tsx:123-139` — SVG line animation with scrollYProgress (reference for SVG path techniques)
  - `src/lib/easings.ts` — Easing functions

  **Style References**:
  - `src/app/globals.css` — Color palette
  - `src/components/sections/HowItWorks.tsx:96-104` — Noise texture

  **Acceptance Criteria**:
  - [ ] Three frequency groups rendered with steps inside
  - [ ] Curved connecting lines between groups
  - [ ] Effort messaging clear (decreasing effort over time)
  - [ ] No emojis, responsive
  - [ ] `bun run build` → zero errors

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Habit Stack shows grouped steps by frequency
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: http://localhost:3000, click switcher "4"
      2. Scroll to section
      3. Assert: Three distinct groups visible ("Set it up", "Every week", "Every day" or similar)
      4. Assert: Steps correctly grouped (Add Recipes in first, Plan+List in second, Shop+Cook in third)
      5. Assert: No emojis, SVG connector lines present
      6. Screenshot: .sisyphus/evidence/task-5-habitstack-desktop.png
    Expected Result: Steps grouped by frequency with organic connectors
    Evidence: .sisyphus/evidence/task-5-habitstack-desktop.png
  ```

  **Commit**: YES
  - Message: `feat(how-it-works): add variant 04 — Habit Stack`
  - Files: `src/components/sections/how-it-works/HowItWorks04.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 6. HowItWorks05 — Breathing Cycle

  **What to do**:
  - Replace placeholder in `src/components/sections/how-it-works/HowItWorks05.tsx`
  - **Concept**: Single large circle in center that gently pulses (scales up/down)
  - Content inside the circle cycles through the 5 steps on a timer (e.g., 3s per step)
  - Each step shows: icon + title + short description, fading in/out with AnimatePresence
  - Subtle orange glow around the circle that pulses with the breathing
  - Small dots around the circle edge indicating which step is active (like pagination dots)
  - Below the circle: "A natural part of your week" or similar messaging
  - Section title + mono label above the circle
  - Background: cream-50 with noise texture
  - Mobile: Smaller circle, same cycling content

  **Must NOT do**:
  - No emojis, no "1-2-3", no AI language, no new deps, no fancy apostrophes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: AnimatePresence content transitions, pulse animations

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/sections/features/BentoGrid.tsx:176-195` — Spring animation patterns
  - `src/lib/easings.ts` — Easing functions
  - motion/react `AnimatePresence` for content crossfade

  **Style References**:
  - `src/app/globals.css` — Color palette
  - `src/components/sections/HowItWorks.tsx:96-104` — Noise texture

  **Acceptance Criteria**:
  - [ ] Pulsing circle with cycling step content
  - [ ] Steps auto-advance every 3s
  - [ ] Pagination dots show active step
  - [ ] Smooth content transitions (no flash/jump)
  - [ ] No emojis, responsive
  - [ ] `bun run build` → zero errors

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Breathing cycle pulses and cycles content
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: http://localhost:3000, click switcher "5"
      2. Scroll to section
      3. Assert: Large circle element visible
      4. Note initial step text content
      5. Wait 4 seconds
      6. Assert: Step text has changed (content cycled)
      7. Assert: Pagination dots visible, one highlighted
      8. Screenshot: .sisyphus/evidence/task-6-breathing-desktop.png
    Expected Result: Circle pulses, content cycles through 5 steps
    Evidence: .sisyphus/evidence/task-6-breathing-desktop.png
  ```

  **Commit**: YES
  - Message: `feat(how-it-works): add variant 05 — Breathing Cycle`
  - Files: `src/components/sections/how-it-works/HowItWorks05.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 7. HowItWorks06 — Weekly Rhythm

  **What to do**:
  - Replace placeholder in `src/components/sections/how-it-works/HowItWorks06.tsx`
  - **Concept**: Visual representation of a week showing when each workflow step happens
  - 7 columns (Mon-Sun) or a simplified week view
  - Rows or overlays show which steps happen on which days:
    - Add Recipes: scattered dots across random days (infrequent)
    - Plan Week: highlighted block on Sunday (or any day — "pick a day")
    - Generate List: immediately after planning (same day)
    - Shop: 1-2 highlighted days
    - Cook: every day (continuous bar across all days)
  - Color coding: each step has a subtle color variant within the palette
  - Emphasize: "Cook" spans the whole week, "Plan" is just one small block
  - Section title + mono label
  - Background: cream-50 with noise texture
  - Mobile: Rotate to vertical layout or show simplified 3-day view

  **Must NOT do**:
  - No emojis, no "1-2-3", no AI language, no new deps, no fancy apostrophes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Grid/calendar layouts, data visualization

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/sections/features/BentoGrid.tsx` — CSS grid patterns, responsive layouts
  - `src/lib/easings.ts` — Easing functions

  **Style References**:
  - `src/app/globals.css` — Color palette (use orange-100, orange-200 for light fills, orange-500 for active)
  - `src/components/sections/HowItWorks.tsx:96-104` — Noise texture

  **Acceptance Criteria**:
  - [ ] 7-column week view rendered
  - [ ] Steps mapped to appropriate days with visual indicators
  - [ ] "Cook" visually spans the whole week
  - [ ] "Plan" visually tiny compared to cooking
  - [ ] No emojis, responsive
  - [ ] `bun run build` → zero errors

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Weekly rhythm grid shows step distribution
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: http://localhost:3000, click switcher "6"
      2. Scroll to section
      3. Assert: Grid with day columns visible
      4. Assert: Legend or labels for each step type
      5. Assert: Visual distinction between frequent (cook) and infrequent (add recipes) steps
      6. Screenshot: .sisyphus/evidence/task-7-weeklyrhythm-desktop.png
      7. Resize to 375px, screenshot: .sisyphus/evidence/task-7-weeklyrhythm-mobile.png
    Expected Result: Week grid showing workflow rhythm
    Evidence: .sisyphus/evidence/task-7-weeklyrhythm-desktop.png
  ```

  **Commit**: YES
  - Message: `feat(how-it-works): add variant 06 — Weekly Rhythm`
  - Files: `src/components/sections/how-it-works/HowItWorks06.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 8. HowItWorks07 — Flowing River

  **What to do**:
  - Replace placeholder in `src/components/sections/how-it-works/HowItWorks07.tsx`
  - **Concept**: Wavy, organic SVG path flowing from top to bottom (or in an S-curve)
  - The path loops back to the top (literally connects end to start) or uses visual cues to show continuation
  - 5 "islands" or "stops" along the path, each showing a step
  - Animated dots/particles travel along the path continuously (using SVG animateMotion or motion/react)
  - Path color: gradient from orange-200 to orange-500
  - Islands: cream bg cards with icon + title + description
  - Section title + mono label
  - Background: cream-50 with noise texture
  - Mobile: Simplify to vertical flow with smaller curves

  **Must NOT do**:
  - No emojis, no "1-2-3", no AI language, no new deps, no fancy apostrophes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: SVG path design, CSS/SVG animation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/sections/HowItWorks.tsx:123-139` — SVG line with scroll-linked scaleY (reference for SVG animation approach)
  - `src/lib/easings.ts` — Easing functions

  **Style References**:
  - `src/app/globals.css` — Color palette
  - `src/components/sections/HowItWorks.tsx:96-104` — Noise texture

  **Acceptance Criteria**:
  - [ ] SVG wavy path visible with organic curves
  - [ ] 5 step cards positioned along the path
  - [ ] Animated dots travel along the path
  - [ ] Path visually loops (connects end back to start concept)
  - [ ] No emojis, responsive
  - [ ] `bun run build` → zero errors

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Flowing River shows animated path with step stops
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: http://localhost:3000, click switcher "7"
      2. Scroll to section
      3. Assert: SVG path element visible (check for <svg> with <path>)
      4. Assert: 5 step cards visible along the path
      5. Assert: Animated elements present (dots/circles with animation)
      6. Screenshot: .sisyphus/evidence/task-8-river-desktop.png
    Expected Result: Organic flowing path with step stops and animated dots
    Evidence: .sisyphus/evidence/task-8-river-desktop.png
  ```

  **Commit**: YES
  - Message: `feat(how-it-works): add variant 07 — Flowing River`
  - Files: `src/components/sections/how-it-works/HowItWorks07.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 9. HowItWorks08 — Card Carousel

  **What to do**:
  - Replace placeholder in `src/components/sections/how-it-works/HowItWorks08.tsx`
  - **Concept**: Stacked cards with one prominent in center, others peeking on sides
  - Auto-advances every 4 seconds, wraps around (after step 5 → back to step 1)
  - Active card is large, centered, showing full step detail (icon, title, description, time estimate)
  - Side cards are smaller, faded, showing just icon + title
  - Navigation: clickable side cards, or small arrow buttons
  - A thin progress bar or dots below showing position in the cycle
  - Smooth slide transitions between cards
  - Section title + mono label
  - Background: cream-50 with noise texture
  - Mobile: Full-width single card with swipe gestures and dots below

  **Must NOT do**:
  - No emojis, no "1-2-3", no AI language, no new deps, no fancy apostrophes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Carousel interaction patterns, gesture handling

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/sections/features/BentoGrid.tsx:16-21` — Card animation pattern
  - `src/lib/easings.ts` — Easing functions

  **Style References**:
  - `src/app/globals.css` — Color palette
  - `src/components/sections/HowItWorks.tsx:96-104` — Noise texture

  **Acceptance Criteria**:
  - [ ] Center card shows full step detail, side cards peek
  - [ ] Auto-advances and wraps around (looping)
  - [ ] Navigation dots/arrows functional
  - [ ] Smooth transitions between cards
  - [ ] No emojis, responsive
  - [ ] `bun run build` → zero errors

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Card carousel auto-advances and loops
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: http://localhost:3000, click switcher "8"
      2. Scroll to section
      3. Assert: Center card visible with step title and description
      4. Note current step title
      5. Wait 5 seconds
      6. Assert: Different step title now shown (auto-advanced)
      7. Screenshot: .sisyphus/evidence/task-9-cardcarousel-desktop.png
    Expected Result: Cards auto-advance showing each step in sequence
    Evidence: .sisyphus/evidence/task-9-cardcarousel-desktop.png
  ```

  **Commit**: YES
  - Message: `feat(how-it-works): add variant 08 — Card Carousel`
  - Files: `src/components/sections/how-it-works/HowItWorks08.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 10. HowItWorks09 — Progress Ring

  **What to do**:
  - Replace placeholder in `src/components/sections/how-it-works/HowItWorks09.tsx`
  - **Concept**: Large circular progress ring (like Apple Watch activity ring)
  - Ring fills clockwise as user scrolls through the section (scroll-linked via useScroll)
  - At 5 equidistant points around the ring, step icons appear as the ring reaches them
  - Each icon triggers a small tooltip/card with step title + description
  - Center of ring: shows aggregate info like "10 min/week" or "Your routine"
  - Ring stroke: gradient from orange-500 to orange-600
  - Ring background: orange-100 or cream-100
  - When ring completes full circle → subtle pulse animation to show "and repeat"
  - Section title + mono label
  - Background: cream-50 with noise texture
  - Mobile: Smaller ring, step cards listed below ring instead of tooltips

  **Must NOT do**:
  - No emojis, no "1-2-3", no AI language, no new deps, no fancy apostrophes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: SVG circle stroke animation, scroll-linked transforms

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/sections/HowItWorks.tsx:81-84` — `useScroll` with target + offset pattern (reuse for scroll-linked ring fill)
  - `src/components/sections/HowItWorks.tsx:130-138` — `scaleY` linked to scrollYProgress (adapt to `pathLength` for ring)
  - `src/lib/easings.ts` — Easing functions

  **Style References**:
  - `src/app/globals.css` — Color palette
  - `src/components/sections/HowItWorks.tsx:96-104` — Noise texture

  **External References**:
  - SVG circle stroke animation: `stroke-dasharray` + `pathLength` via motion/react `useTransform`

  **Acceptance Criteria**:
  - [ ] Circular ring that fills on scroll
  - [ ] 5 step icons appear at ring positions as it fills
  - [ ] Center shows aggregate info
  - [ ] Ring completes and pulses to show "repeat"
  - [ ] No emojis, responsive
  - [ ] `bun run build` → zero errors

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Progress ring fills on scroll with step icons
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: http://localhost:3000, click switcher "9"
      2. Scroll slowly to How It Works section
      3. Assert: SVG circle ring visible
      4. Scroll down slowly through the section
      5. Assert: Ring stroke progresses (pathLength increases)
      6. Assert: Step icons/labels appear around the ring
      7. Screenshot: .sisyphus/evidence/task-10-progressring-desktop.png
    Expected Result: Ring fills as user scrolls, icons appear at positions
    Evidence: .sisyphus/evidence/task-10-progressring-desktop.png
  ```

  **Commit**: YES
  - Message: `feat(how-it-works): add variant 09 — Progress Ring`
  - Files: `src/components/sections/how-it-works/HowItWorks09.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 11. HowItWorks10 — Connected Grid

  **What to do**:
  - Replace placeholder in `src/components/sections/how-it-works/HowItWorks10.tsx`
  - **Concept**: Asymmetric card grid (like a simplified bento) with animated connecting lines
  - 5 cards of different sizes based on effort/frequency:
    - Cook = largest card (daily, most prominent)
    - Plan Week = medium card
    - Generate List = small card (1 tap!)
    - Shop = medium card
    - Add Recipes = medium card, slightly muted (infrequent)
  - Animated SVG lines connect cards showing the flow direction
  - Lines pulse with orange glow to show direction (animated stroke-dashoffset)
  - An arrow or loop indicator showing the connection from Cook back to Add Recipes
  - Each card has: icon, title, description, time estimate badge
  - Section title + mono label
  - Background: cream-50 with noise texture
  - Mobile: Stack cards vertically with downward arrow connectors

  **Must NOT do**:
  - No emojis, no "1-2-3", no AI language, no new deps, no fancy apostrophes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: CSS grid, SVG overlay animations

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/components/sections/features/BentoGrid.tsx` — CSS grid-template-areas pattern (MAIN reference — this variant is closest to BentoGrid style)
  - `src/components/sections/features/BentoGrid.tsx:16-21` — Card animation
  - `src/lib/easings.ts` — Easing functions

  **Style References**:
  - `src/app/globals.css` — Color palette
  - `src/components/sections/HowItWorks.tsx:96-104` — Noise texture

  **Acceptance Criteria**:
  - [ ] Asymmetric grid with 5 cards of varying sizes
  - [ ] SVG connecting lines between cards showing flow
  - [ ] Lines animate to show direction
  - [ ] Loop indicator (Cook → Add Recipes connection)
  - [ ] No emojis, responsive
  - [ ] `bun run build` → zero errors

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Connected grid shows cards with animated flow lines
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to: http://localhost:3000, click switcher "10"
      2. Scroll to section
      3. Assert: 5 cards visible in grid layout
      4. Assert: Cards have different sizes (not uniform)
      5. Assert: SVG connecting lines visible between cards
      6. Assert: No emojis
      7. Screenshot: .sisyphus/evidence/task-11-connectedgrid-desktop.png
      8. Resize to 375px, screenshot: .sisyphus/evidence/task-11-connectedgrid-mobile.png
    Expected Result: Asymmetric grid with directional connection lines
    Evidence: .sisyphus/evidence/task-11-connectedgrid-desktop.png
  ```

  **Commit**: YES
  - Message: `feat(how-it-works): add variant 10 — Connected Grid`
  - Files: `src/components/sections/how-it-works/HowItWorks10.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 12. Final build verification + visual QA of all 10 variants

  **What to do**:
  - Run `bun run build` — must pass with zero errors
  - Start dev server, open in Playwright
  - Cycle through all 10 variants via the switcher
  - Screenshot each variant at desktop (1280px) and mobile (375px)
  - Verify NO variant contains emojis
  - Verify ALL variants show the 5-step loop (not 3-step linear)
  - Verify switcher keyboard navigation works (arrow keys)
  - Create a summary of all screenshots for user review

  **Must NOT do**:
  - Do NOT modify any variant code (this is QA only)
  - Do NOT change page.tsx or other sections

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`playwright`, `frontend-ui-ux`]
    - `playwright`: Browser automation for screenshots and assertions
    - `frontend-ui-ux`: Visual QA eye for layout issues

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (solo, final)
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 2-11

  **References**:
  - All 10 variant files in `src/components/sections/how-it-works/`
  - Evidence directory: `.sisyphus/evidence/`

  **Acceptance Criteria**:
  - [ ] `bun run build` → zero errors, zero warnings
  - [ ] 20 screenshots captured (10 variants x 2 viewports)
  - [ ] Zero emoji characters found in any variant
  - [ ] All 10 variants render non-empty content (no blank sections)
  - [ ] Switcher toolbar functional with keyboard nav

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Full visual QA sweep of all 10 variants
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:3000, all variants implemented
    Steps:
      1. Navigate to: http://localhost:3000
      2. For each variant N (1-10):
         a. Click switcher button N
         b. Scroll to How It Works section
         c. Assert: Section is not empty (has visible text content)
         d. Assert: No emoji characters (regex check for emoji unicode ranges)
         e. Screenshot at 1280px: .sisyphus/evidence/final-variant-{N}-desktop.png
         f. Resize to 375px
         g. Screenshot: .sisyphus/evidence/final-variant-{N}-mobile.png
         h. Resize back to 1280px
      3. Test keyboard nav: press ArrowRight 3 times, verify variant changed
      4. Screenshot: .sisyphus/evidence/final-keyboard-nav.png
    Expected Result: All 10 variants render correctly, responsive, no emojis
    Evidence: 20 screenshot files in .sisyphus/evidence/

  Scenario: Build verification
    Tool: Bash
    Steps:
      1. Run: bun run build
      2. Assert: Exit code 0
      3. Assert: No "Type error" in output
      4. Capture: Bundle size for how-it-works chunks
    Expected Result: Clean build with zero errors
    Evidence: Build output captured
  ```

  **Commit**: NO (QA only, no code changes)

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `feat(how-it-works): scaffold variant directory structure and switcher component` | how-it-works/*, page.tsx | `bun run build` |
| 2 | `feat(how-it-works): add variant 01 — Loop Wheel` | HowItWorks01.tsx | `bun run build` |
| 3 | `feat(how-it-works): add variant 02 — Orbital` | HowItWorks02.tsx | `bun run build` |
| 4 | `feat(how-it-works): add variant 03 — Infinite Carousel` | HowItWorks03.tsx | `bun run build` |
| 5 | `feat(how-it-works): add variant 04 — Habit Stack` | HowItWorks04.tsx | `bun run build` |
| 6 | `feat(how-it-works): add variant 05 — Breathing Cycle` | HowItWorks05.tsx | `bun run build` |
| 7 | `feat(how-it-works): add variant 06 — Weekly Rhythm` | HowItWorks06.tsx | `bun run build` |
| 8 | `feat(how-it-works): add variant 07 — Flowing River` | HowItWorks07.tsx | `bun run build` |
| 9 | `feat(how-it-works): add variant 08 — Card Carousel` | HowItWorks08.tsx | `bun run build` |
| 10 | `feat(how-it-works): add variant 09 — Progress Ring` | HowItWorks09.tsx | `bun run build` |
| 11 | `feat(how-it-works): add variant 10 — Connected Grid` | HowItWorks10.tsx | `bun run build` |

---

## Success Criteria

### Verification Commands
```bash
bun run build  # Expected: zero errors, exit 0
```

### Final Checklist
- [ ] All 10 variants render unique, creative layouts
- [ ] All variants show 5-step cyclical workflow (not linear 1-2-3)
- [ ] All variants use lucide-react icons (zero emojis)
- [ ] All variants follow cream/orange/brown color palette
- [ ] All variants are responsive (mobile + desktop)
- [ ] All variants use motion/react for animations
- [ ] Switcher toolbar works (click + keyboard)
- [ ] No copy mentions AI, suggestions, or magic
- [ ] No fancy apostrophes
- [ ] `bun run build` → zero errors
- [ ] 20 QA screenshots captured
