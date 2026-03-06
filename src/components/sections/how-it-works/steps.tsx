import { BookPlus, CalendarDays, ListChecks, ShoppingCart, Utensils } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  step: string;
}

export const steps: Step[] = [
  {
    icon: BookPlus,
    title: 'Add Recipes',
    description: 'Save recipes you find online to your personal collection',
    step: 'Step 1',
  },
  {
    icon: CalendarDays,
    title: 'Plan Your Week',
    description: 'Assign meals to days in under 10 minutes',
    step: 'Step 2',
  },
  {
    icon: ListChecks,
    title: 'Generate List',
    description: 'One tap creates your grocery list, sorted by aisle',
    step: 'Step 3',
  },
  {
    icon: ShoppingCart,
    title: 'Buy groceries',
    description: 'Pull up your list at the store, check off items as you go',
    step: 'Step 4',
  },
  {
    icon: Utensils,
    title: 'Cooking',
    description: "Open the app, see today's meal, start cooking",
    step: 'Step 5',
  },
];
