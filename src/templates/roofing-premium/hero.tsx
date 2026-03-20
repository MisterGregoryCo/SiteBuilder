'use client';

import { SiteConfig } from '@/lib/types/site-config';

export function HeroSection({ config, colors }: { config: SiteConfig['hero']; colors: Record<string, string> }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${config.background_image})` }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: colors.heroOverlay || 'rgba(27, 42, 74, 0.7)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
          {config.headline}
        </h1>
        <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
          {config.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`tel:${config.cta_phone.replace(/\D/g, '')}`}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ backgroundColor: colors.accent, color: colors.primary }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {config.cta_text}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white transition-all duration-300 hover:bg-white hover:text-gray-900"
          >
            Request a Quote
          </a>
        </div>
        <p className="mt-6 text-sm opacity-75">
          Call Now: {config.cta_phone}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
