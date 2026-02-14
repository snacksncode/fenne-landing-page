import { useLenis } from 'lenis/react'

export const useScrollTo = () => {
  const lenis = useLenis()
  const scrollTo = (target: string | number | HTMLElement) => {
    lenis?.scrollTo(target)
  }
  return { scrollTo }
}
