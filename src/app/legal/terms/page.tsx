import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Fenne',
  description: 'Fenne terms of service and usage agreement.',
}

export default async function TermsPage() {
  const markdownPath = path.join(
    process.cwd(),
    'src/components/legal/terms-of-service.md'
  )
  const markdown = fs.readFileSync(markdownPath, 'utf-8')

  const result = await remark().use(html).process(markdown)
  const contentHtml = result.toString()

  return (
    <main className="min-h-screen bg-cream-50 p-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 border-b border-orange-100 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brown-900 hover:text-orange-600 transition-colors font-sans font-bold text-lg"
          >
            ← Back to Fenne
          </Link>
        </header>

        <article
          className="prose prose-lg prose-headings:text-brown-900 prose-p:text-brown-800 prose-a:text-orange-600 prose-a:underline prose-strong:text-brown-900 prose-hr:border-orange-100 prose-li:text-brown-800 mx-auto font-sans"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <footer className="mt-16 pt-8 border-t border-orange-100 text-center">
          <p className="text-brown-700 text-sm">
            © {new Date().getFullYear()} Fenne •{' '}
            <Link
              href="/"
              className="text-orange-600 hover:text-orange-700 underline"
            >
              Back to home
            </Link>
          </p>
        </footer>
      </div>
    </main>
  )
}
