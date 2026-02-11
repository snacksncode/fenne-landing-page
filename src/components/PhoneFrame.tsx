import Image from 'next/image'

const sizeClasses = {
  sm: 'max-w-[240px]',
  md: 'max-w-[270px]',
  lg: 'max-w-[320px]',
} as const

interface PhoneFrameProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function PhoneFrame({
  src,
  alt,
  className = '',
  priority = false,
  size = 'md',
}: PhoneFrameProps) {
  return (
    <div
      className={`relative aspect-[9/19.5] w-full ${sizeClasses[size]} ${className}`}
    >
      <div className="relative h-full w-full rounded-[40px] border-[6px] border-brown-900 bg-cream-100 shadow-2xl shadow-brown-900/15 overflow-hidden">
        <div className="absolute left-1/2 top-0 z-10 h-7 w-28 -translate-x-1/2 rounded-b-2xl bg-brown-900" />

        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes={
            size === 'lg'
              ? '320px'
              : size === 'sm'
                ? '240px'
                : '270px'
          }
        />

        <div className="absolute bottom-2 left-1/2 z-10 h-1 w-28 -translate-x-1/2 rounded-full bg-brown-900/30" />
      </div>
    </div>
  )
}
