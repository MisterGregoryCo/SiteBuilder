'use client';

import { useEffect, useRef, useState } from 'react';
import { SiteConfig } from '@/lib/types/site-config';

export function AboutSection({ config, colors }: { config: SiteConfig['about']; colors: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Stats Bar */}
        <div
          className={`grid grid-cols-2 md:grid-cols-${Math.min(config.stats.length, 4)} gap-6 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {config.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white shadow-sm"
            >
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ color: colors.accent }}
              >
                {stat.value}
              </div>
              <div className="text-sm font-medium" style={{ color: colors.textLight }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* About Content */}
        <div
          className={`flex flex-col md:flex-row items-center gap-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={config.image}
                alt="About us"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: 'Georgia, serif', color: colors.primary }}
            >
              {config.headline}
            </h2>
            <div
              className="text-lg leading-relaxed space-y-4"
              style={{ color: colors.textLight }}
            >
              {config.body.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {/* If it's a single paragraph, show as-is */}
              {!config.body.includes('\n\n') && config.body.includes('\n') &&
                config.body.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))
              }
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" style={{ color: colors.accent }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: colors.textLight }}>
                5-Star Rated Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
