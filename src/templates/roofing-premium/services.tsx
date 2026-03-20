'use client';

import { useEffect, useRef, useState } from 'react';
import { SiteConfig } from '@/lib/types/site-config';

function ServiceCard({
  service,
  index,
  colors,
}: {
  service: SiteConfig['services'][0];
  index: number;
  colors: Record<string, string>;
}) {
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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isEven ? '' : 'md:flex-row-reverse'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
          <img
            src={service.image || `https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80`}
            alt={service.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2">
        <div
          className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
          style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
        >
          Service {String(index + 1).padStart(2, '0')}
        </div>
        <h3
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ fontFamily: 'Georgia, serif', color: colors.primary }}
        >
          {service.name}
        </h3>
        <p className="text-lg leading-relaxed" style={{ color: colors.textLight }}>
          {service.description}
        </p>
        <a
          href="#contact"
          className="inline-flex items-center mt-6 font-semibold transition-colors hover:underline"
          style={{ color: colors.accent }}
        >
          Get a Free Estimate
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export function ServicesSection({ config, colors }: { config: SiteConfig['services']; colors: Record<string, string> }) {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 uppercase tracking-wider"
            style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
          >
            Our Services
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'Georgia, serif', color: colors.primary }}
          >
            What We Do Best
          </h2>
        </div>

        <div className="space-y-20">
          {config.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} colors={colors} />
          ))}
        </div>
      </div>
    </section>
  );
}
