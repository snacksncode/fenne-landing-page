'use client'

import { featureFlags } from '@/lib/feature-flags'
import { useLocalStorage } from '@uidotdev/usehooks'
import Link from 'next/link'

const Item = ({ flag }: { flag: (typeof featureFlags)[number] }) => {
  const [value, setValue] = useLocalStorage(flag.key, flag.defaultValue)

  return (
    <button
      onClick={() => setValue((prev) => !prev)}
      className="w-full text-left rounded-xl border border-brown-900/8 bg-white p-5 flex items-start justify-between gap-4 cursor-pointer"
    >
      <div>
        <h3 className="font-bold text-brown-900">{flag.label}</h3>
        <p className="text-sm text-brown-600 mt-0.5">{flag.description}</p>
      </div>
      <div
        className={`relative shrink-0 w-11 h-6 rounded-full ${value ? 'bg-orange-500' : 'bg-gray-300'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow ${value ? 'translate-x-5' : ''}`}
        />
      </div>
    </button>
  )
}

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-16 px-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-sm text-brown-500 hover:text-orange-500">
          &larr; Back to home
        </Link>

        <h1 className="text-3xl font-black text-brown-900 mt-6 mb-2">
          Experiments
        </h1>
        <p className="text-brown-600 mb-10">
          Toggle experimental features. Changes apply immediately.
        </p>

        <div className="space-y-4">
          {featureFlags.map((flag) => (
            <Item key={flag.key} flag={flag} />
          ))}
        </div>
      </div>
    </div>
  )
}
