'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Image from 'next/image'
import weeklyPlan from '../../../../public/mockups/weekly-plan-portrait.png'
import recipesList from '../../../../public/mockups/recipes-list-portrait.png'
import {
  Calendar,
  ShoppingCart,
  BookOpen,
  CalendarCheck,
  RefreshCw,
  FileText,
  Sparkles,
} from 'lucide-react'
import { easeOutCubic } from '@/lib/easings'

const ease = [0.22, 1, 0.36, 1] as const

const groceryItems = [
  { checked: true, label: 'Milk', aisle: 'Dairy' },
  { checked: false, label: 'Chicken Breast', aisle: 'Meat' },
  { checked: false, label: 'Apples', aisle: 'Produce' },
  { checked: false, label: 'Olive Oil', aisle: 'Pantry' },
]

export function BentoGrid() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  const cardAnimation = {
    initial: { opacity: 0, y: 24, scale: 0.9 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { ease: easeOutCubic },
    viewport: { once: true },
  }

  return (
    <section
      id="features"
      ref={ref}
      className="relative overflow-hidden py-24"
      style={{
        background:
          'linear-gradient(180deg, var(--color-cream-50) 0%, var(--color-cream-100) 50%, var(--color-cream-50) 100%)',
      }}
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <div className="mb-12 lg:mb-24 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">
            What’s inside
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-black tracking-tight text-brown-900">
            Everything you need
          </h2>
        </div>

        <div
          className={[
            'grid gap-3',
            'grid-cols-2 [grid-template-areas:"plan_recipe"_"grocery_grocery"_"shopping_shopping"_"sync_notes"_"simple_simple"]',
            'md:grid-cols-3 md:[grid-template-areas:"plan_recipe_shopping"_"grocery_grocery_sync"_"grocery_grocery_notes"_"simple_simple_simple"]',
            'lg:grid-cols-15 lg:[grid-template-areas:"plan_plan_plan_plan_plan_plan_plan_plan_plan_grocery_grocery_grocery_grocery_grocery_grocery"_"recipe_recipe_recipe_recipe_recipe_recipe_recipe_recipe_recipe_grocery_grocery_grocery_grocery_grocery_grocery"_"shopping_shopping_shopping_shopping_shopping_sync_sync_sync_sync_sync_notes_notes_notes_notes_notes"_"shopping_shopping_shopping_shopping_shopping_simple_simple_simple_simple_simple_simple_simple_simple_simple_simple"]',
          ].join(' ')}
        >
          <motion.div
            {...cardAnimation}
            className="[grid-area:plan] relative rounded-3xl bg-linear-to-b from-orange-500 to-orange-600 p-4 md:p-6 group"
            style={{
              clipPath: `polygon(-1000% -1000%, 1000% -1000%, 1000% 100%, -1000% 100%)`,
            }}
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-1.5">
                Plan Meals
              </h3>
              <p className="text-cream-100 font-medium text-sm leading-relaxed">
                See your whole week at a glance.{' '}
                <br className="max-lg:hidden" />
                Plan in minutes, not hours
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="max-lg:hidden absolute -bottom-32 -top-16 right-16 rotate-12"
            >
              <Image
                src={weeklyPlan}
                className="h-full w-auto"
                alt="Weekly meal planning view"
              />
            </motion.div>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/8 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3" />
          </motion.div>

          <motion.div
            {...cardAnimation}
            className="[grid-area:grocery] relative overflow-hidden rounded-3xl bg-linear-to-br from-[#0D9488] to-[#0F766E] p-4 md:p-6"
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-1.5">
                Grocery List
              </h3>
              <p className="text-cream-100 font-medium text-sm leading-relaxed mb-5">
                Auto-generated from your meal plan.
                <br className="max-lg:hidden" />
                Check off items as you shop.
              </p>
              <div className="flex flex-col gap-2.5">
                {groceryItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.45 + i * 0.08, ease }}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                      item.checked ? 'bg-white/10' : 'bg-white/5'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                        item.checked
                          ? 'bg-white/25'
                          : 'border-[1.5px] border-white/30'
                      }`}
                    >
                      {item.checked && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{
                            delay: 0.55 + i * 0.08,
                            type: 'spring',
                            stiffness: 300,
                          }}
                          className="w-3 h-3 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium flex-1 min-w-0 ${
                        item.checked
                          ? 'line-through text-white/40'
                          : 'text-white/90'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/30 shrink-0">
                      {item.aisle}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3" />
          </motion.div>

          <motion.div
            {...cardAnimation}
            className="[grid-area:recipe] relative overflow-hidden rounded-3xl bg-linear-to-b from-[#8B5CF6] to-[#6D28D9] p-4 md:p-6 group"
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-1.5">
                <span className="italic">Your</span> Recipes
              </h3>
              <p className="text-cream-100 text-sm font-medium leading-relaxed">
                Save, organize, and rediscover your favorites
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              viewport={{ once: true }}
              className="max-lg:hidden absolute -bottom-64 top-4 right-8"
            >
              <Image
                src={recipesList}
                className="h-full w-auto"
                alt="Weekly meal planning view"
              />
            </motion.div>
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          </motion.div>

          <motion.div
            {...cardAnimation}
            className="[grid-area:shopping] relative overflow-hidden rounded-3xl bg-green-500 p-4 md:p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <CalendarCheck className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-1">
              Shopping Days
            </h3>
            <p className="text-cream-100 font-medium text-pretty text-sm leading-relaxed">
              Tag days when you plan to shop.
              <br className="max-lg:hidden" /> Never forget grocery day
            </p>
            <div className="mt-3 flex gap-1.5">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <motion.div
                  key={`${day}-${i}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.05, ease }}
                  className={`w-6 aspect-square lg:w-8 rounded-md flex items-center justify-center text-[9px] lg:text-xs font-bold ${
                    i === 2 || i === 5
                      ? 'bg-white/30 text-white ring-1 ring-white/40'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  {day}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...cardAnimation}
            className="[grid-area:sync] relative overflow-hidden rounded-3xl bg-linear-to-br from-[#3B82F6] to-[#14B8A6] p-4 md:p-6"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <RefreshCw className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white">
                Realtime Sync
              </h3>
            </div>
            <p className="text-cream-100 font-medium mt-1 text-pretty text-sm leading-relaxed">
              Sync between all your devices
            </p>
          </motion.div>

          <motion.div
            {...cardAnimation}
            className="[grid-area:notes] relative overflow-hidden rounded-3xl bg-linear-to-br from-[#FEF7EA] to-[#FEF2DD] border border-orange-200 p-4 md:p-6"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-brown-900/8 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-brown-700" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-brown-900">
                Recipe Notes
              </h3>
            </div>
            <p className="text-brown-800 font-medium text-sm leading-relaxed mt-1">
              Instructions or links? No problem!
            </p>
          </motion.div>

          <motion.div
            {...cardAnimation}
            className="[grid-area:simple] relative overflow-hidden rounded-3xl p-4 md:p-6 bg-linear-to-r from-brown-900 to-brown-800"
          >
            <div className="flex items-center gap-5 md:gap-6">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Sparkles className="w-7 h-7 text-orange-200" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-black text-white">
                  Simple &amp; Focused
                </h3>
                <p className="text-cream-100 font-medium text-sm mt-0.5 leading-relaxed">
                  Just what you need. No AI, no complexity, no unnecessary
                  features
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white" />
              <div className="absolute top-4 right-10 w-1.5 h-1.5 rounded-full bg-white" />
              <div className="absolute top-10 right-6 w-1 h-1 rounded-full bg-white" />
              <div className="absolute top-8 right-14 w-2 h-2 rounded-full bg-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
