import {
  BookPlus,
  CalendarDays,
  ListChecks,
  ShoppingCart,
  Utensils,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Step {
  icon: LucideIcon
  title: string
  description: string
  time: string
}

export const steps: Step[] = [
  {
    icon: BookPlus,
    title: 'Add Recipes',
    description: 'Save recipes you find online to your personal collection',
    time: 'Ongoing',
  },
  {
    icon: CalendarDays,
    title: 'Plan Your Week',
    description: 'Assign meals to days in under 10 minutes',
    time: '~10 min',
  },
  {
    icon: ListChecks,
    title: 'Generate List',
    description: 'One tap creates your grocery list, sorted by aisle',
    time: '1 tap',
  },
  {
    icon: ShoppingCart,
    title: 'Shop & Check Off',
    description: 'Pull up your list at the store, check off items as you go',
    time: 'At the store',
  },
  {
    icon: Utensils,
    title: 'Cook',
    description: 'Open the app, see today\'s meal, start cooking',
    time: 'Daily',
  },
]
