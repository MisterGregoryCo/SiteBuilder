'use client';

import { SiteConfig } from '@/lib/types/site-config';

export function FooterSection({
  config,
  phone,
  email,
}: {
  config: SiteConfig['footer'];
  phone: string;
  email: string;
  colors?: Record<string, string>;
}) {
  return (
    <footer className="py-12" style={{ backgroundColor: '#111827' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              {config.business_name}
            </h3>
            <p className="text-gray-400 text-sm">{config.tagline}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-400 text-sm">
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {phone}
            </a>
            <span className="hidden sm:inline">|</span>
            <a href={`mailto:${email}`} className="hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {email}
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} {config.business_name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
