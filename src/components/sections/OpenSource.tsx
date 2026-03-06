'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Github, ExternalLink, Smartphone, Server } from 'lucide-react';
import { easeOutCubic, easeOutQuint } from '@/lib/easings';
import Link from 'next/link';

const repos = [
  {
    name: 'fenne',
    label: 'Mobile App',
    heading: 'TypeScript / Expo / React Native',
    lines: ['Powered by Bun. Shipped via EAS.', 'React 19, Tanstack Query, Reanimated.'],
    icon: Smartphone,
    url: 'https://github.com/snacksncode/fenne',
  },
  {
    name: 'fenne-backend',
    label: 'Backend API',
    heading: 'Ruby on Rails',
    lines: ['Rails 8 on SQLite. Kamal + Hetzner', 'Solid Stack, Action Cable.'],
    icon: Server,
    url: 'https://github.com/snacksncode/fenne-backend',
  },
];

export function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px' });

  const fadeInitial = { opacity: 0 };

  return (
    <section
      ref={sectionRef}
      id="open-source"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: '#2a231e' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-cream-50) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      <div className="relative z-1 mx-auto max-w-5xl px-6 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOutQuint }}
        >
          <h2 className="font-mono text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-cream-50">
            <span className="text-orange-500">{'>'}</span> We&apos;re open-source
          </h2>
          <p className="mt-3 font-mono text-sm text-cream-50/40 max-w-lg">
            All source code is public.
            <br /> Clone it, fork it, break it, fix it.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
          {repos.map((repo, i) => {
            const Icon = repo.icon;
            return (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, ease: easeOutCubic }}
              >
                <Link
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden border border-cream-50/8 transition-all duration-300 hover:border-cream-50/15 hover:shadow-xl hover:shadow-black/20"
                >
                  {/* title bar */}
                  <div
                    className="flex items-center gap-2 px-4 py-3 border-b border-cream-50/6"
                    style={{ background: 'var(--color-brown-900)' }}
                  >
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-red-500)' }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-orange-500)' }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-green-500)' }} />
                    <span className="ml-2 font-mono text-xs text-cream-50/30 truncate">snacksncode/{repo.name}</span>
                    <ExternalLink className="ml-auto h-3.5 w-3.5 text-cream-50/20 transition-colors group-hover:text-orange-500" />
                  </div>

                  {/* terminal body */}
                  <div className="p-6" style={{ background: 'var(--color-brown-900)' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="h-5 w-5 text-orange-500" />
                      <span className="font-mono text-base font-bold text-cream-50">{repo.label}</span>
                    </div>

                    <div className="space-y-2 font-mono text-sm">
                      <p className="text-cream-50/50">
                        <span className="text-green-500">$</span> <span className="text-cream-50/70">cat</span>{' '}
                        README.md
                      </p>
                      <div className="pl-4 border-l-2 border-cream-50/10 space-y-1">
                        <p className="text-orange-500 font-bold"># {repo.heading}</p>
                        {repo.lines.map((line) => (
                          <p key={line} className="text-cream-50/60">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-cream-50/6 flex items-center gap-2">
                      <Github className="h-4 w-4 text-cream-50/30" />
                      <span className="font-mono text-xs text-cream-50/30 group-hover:text-orange-500 transition-colors">
                        View on GitHub
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="font-mono text-sm text-cream-50/30 mt-12"
          initial={fadeInitial}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: easeOutCubic }}
        >
          <span className="text-green-500">$</span> echo &quot;Star us, report bugs, or contribute features&quot;
        </motion.p>
      </div>
    </section>
  );
}
