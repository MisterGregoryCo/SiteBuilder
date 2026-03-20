'use client';

import { Site } from '@/lib/types/site-config';
import { HeroSection } from './hero';
import { ServicesSection } from './services';
import { AboutSection } from './about';
import { ContactSection } from './contact';
import { FooterSection } from './footer';

const DEFAULT_COLORS = {
  primary: '#1B2A4A',
  secondary: '#2D4A7A',
  accent: '#D4A853',
  background: '#FFFFFF',
  text: '#1a1a1a',
  textLight: '#6b7280',
  heroOverlay: 'rgba(27, 42, 74, 0.7)',
};

export function RoofingPremiumTemplate({ site }: { site: Site }) {
  const config = site.site_config;
  const colors = { ...DEFAULT_COLORS };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sticky Mobile Call Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3 shadow-2xl"
        style={{ backgroundColor: colors.accent }}
      >
        <a
          href={`tel:${config.hero.cta_phone.replace(/\D/g, '')}`}
          className="flex items-center justify-center gap-2 font-bold text-lg"
          style={{ color: colors.primary }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now: {config.hero.cta_phone}
        </a>
      </div>

      {/* Desktop Header */}
      <header
        className="hidden md:block fixed top-0 left-0 right-0 z-40 shadow-sm"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>
            {config.footer.business_name}
          </span>
          <a
            href={`tel:${config.hero.cta_phone.replace(/\D/g, '')}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105"
            style={{ backgroundColor: colors.accent, color: colors.primary }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {config.hero.cta_phone}
          </a>
        </div>
      </header>

      {/* Sections */}
      <HeroSection config={config.hero} colors={colors} />
      <ServicesSection config={config.services} colors={colors} />
      <AboutSection config={config.about} colors={colors} />
      <ContactSection config={config.contact} siteId={site.id} services={config.services} colors={colors} />
      <FooterSection config={config.footer} phone={config.hero.cta_phone} email={config.contact.email} colors={colors} />

      {/* Bottom padding for mobile call bar */}
      <div className="h-16 md:hidden" />
    </div>
  );
}
