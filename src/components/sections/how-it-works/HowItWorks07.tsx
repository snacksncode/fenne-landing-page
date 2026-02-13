'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { steps, type Step } from './steps'
import { Sparkles, Heart, Flame, Leaf, type LucideIcon } from 'lucide-react'

type StepTile = { kind: 'step'; stepIndex: number }
type DecoIconTile = { kind: 'deco-icon'; icon: LucideIcon; label: string }
type DecoStatTile = { kind: 'stat'; value: string; label: string }
type DecoGradientTile = { kind: 'gradient'; from: string; to: string }

type Tile = StepTile | DecoIconTile | DecoStatTile | DecoGradientTile

const tiles: Tile[] = [
  { kind: 'step', stepIndex: 0 },
  { kind: 'deco-icon', icon: Sparkles, label: 'Discover' },
  { kind: 'gradient', from: 'var(--color-orange-100)', to: 'var(--color-orange-300)' },
  { kind: 'step', stepIndex: 1 },

  { kind: 'stat', value: '~10 min', label: 'per week to plan' },
  { kind: 'step', stepIndex: 2 },
  { kind: 'deco-icon', icon: Heart, label: 'Love it' },
  { kind: 'gradient', from: 'var(--color-cream-100)', to: 'var(--color-orange-200)' },

  { kind: 'deco-icon', icon: Flame, label: 'Stay on track' },
  { kind: 'step', stepIndex: 3 },
  { kind: 'step', stepIndex: 4 },
  { kind: 'deco-icon', icon: Leaf, label: 'Fresh & easy' },
]

function getTileThreshold(index: number, total: number): number {
  return 0.15 + (index / (total - 1)) * 0.7
}

function StepTileContent({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon
  return (
    <div className="flex h-full flex-col justify-between p-5 md:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/15">
          <Icon className="h-[18px] w-[18px] text-orange-600" strokeWidth={2.2} />
        </div>
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-orange-400">
          Step {index + 1}
        </span>
      </div>
      <div className="mt-auto pt-3">
        <h3 className="font-sans text-[15px] font-extrabold leading-snug text-brown-900">
          {step.title}
        </h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-brown-600">
          {step.description}
        </p>
      </div>
    </div>
  )
}

function DecoIconContent({
  icon: Icon,
  label,
}: {
  icon: LucideIcon
  label: string
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2.5 p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 backdrop-blur-sm">
        <Icon className="h-6 w-6 text-orange-500" strokeWidth={1.8} />
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-brown-500">
        {label}
      </span>
    </div>
  )
}

function DecoStatContent({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
      <span className="font-sans text-2xl font-black tracking-tight text-orange-500 md:text-3xl">
        {value}
      </span>
      <span className="mt-1 text-[11px] font-medium leading-tight text-brown-500">
        {label}
      </span>
    </div>
  )
}

function DecoGradientContent({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="h-full w-full"
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        opacity: 0.7,
      }}
    />
  )
}

function FlipTile({
  tile,
  index,
  progress,
  total,
}: {
  tile: Tile
  index: number
  progress: MotionValue<number>
  total: number
}) {
  const threshold = getTileThreshold(index, total)

  const rotateY = useTransform(
    progress,
    [threshold - 0.08, threshold],
    [90, 0]
  )
  const opacity = useTransform(
    progress,
    [threshold - 0.08, threshold],
    [0, 1]
  )
  const scale = useTransform(
    progress,
    [threshold - 0.08, threshold],
    [0.85, 1]
  )

  const isGradient = tile.kind === 'gradient'

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-orange-200/40 shadow-[0_1px_8px_rgba(180,120,60,0.06)] ${
        isGradient ? '' : 'bg-cream-50/90'
      }`}
      style={{
        rotateY,
        opacity,
        scale,
        transformPerspective: 800,
        backfaceVisibility: 'hidden',
        minHeight: tile.kind === 'step' ? '170px' : '140px',
      }}
    >
      {tile.kind === 'step' && (
        <StepTileContent step={steps[tile.stepIndex]} index={tile.stepIndex} />
      )}
      {tile.kind === 'deco-icon' && (
        <DecoIconContent icon={tile.icon} label={tile.label} />
      )}
      {tile.kind === 'stat' && (
        <DecoStatContent value={tile.value} label={tile.label} />
      )}
      {tile.kind === 'gradient' && (
        <DecoGradientContent from={tile.from} to={tile.to} />
      )}
    </motion.div>
  )
}

export function HowItWorks07() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const headerOpacity = useTransform(scrollYProgress, [0.02, 0.12], [0, 1])
  const headerY = useTransform(scrollYProgress, [0.02, 0.12], [30, 0])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-40"
      style={{ background: 'var(--color-cream-50)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: '128px 128px',
        }}
      />

      <motion.div
        className="relative z-20 mx-auto max-w-5xl px-6 text-center"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
          How it works
        </p>
        <h2 className="font-sans text-4xl font-black tracking-tight text-brown-900 md:text-5xl">
          Piece by piece
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brown-600">
          Each tile reveals a part of your weekly meal-planning flow
        </p>
      </motion.div>

      <div className="relative z-20 mx-auto mt-16 hidden max-w-4xl px-6 md:block">
        <div className="grid grid-cols-4 gap-3">
          {tiles.map((tile, i) => (
            <FlipTile
              key={i}
              tile={tile}
              index={i}
              progress={scrollYProgress}
              total={tiles.length}
            />
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto mt-12 max-w-sm px-5 md:hidden">
        <div className="grid grid-cols-2 gap-2.5">
          {tiles.map((tile, i) => (
            <FlipTile
              key={i}
              tile={tile}
              index={i}
              progress={scrollYProgress}
              total={tiles.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
