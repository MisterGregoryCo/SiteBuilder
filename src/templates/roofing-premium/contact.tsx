'use client';

import { useState, useEffect, useRef } from 'react';
import { SiteConfig } from '@/lib/types/site-config';

export function ContactSection({
  config,
  siteId,
  services,
  colors,
}: {
  config: SiteConfig['contact'];
  siteId: string;
  services: SiteConfig['services'];
  colors: Record<string, string>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '', // honeypot
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_id: siteId,
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          service_interest: formState.service,
          message: formState.message,
          website: formState.website, // honeypot
          source_page: 'contact',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Silent fail for visitor-facing form
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 md:py-28" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-2xl mx-auto px-6 text-center text-white">
          <div className="text-6xl mb-6">&#10003;</div>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Thank You!
          </h2>
          <p className="text-lg opacity-90">
            We&apos;ve received your request and will get back to you shortly. For immediate assistance, call us at{' '}
            <a href={`tel:${config.phone.replace(/\D/g, '')}`} className="underline font-semibold">
              {config.phone}
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 md:py-28" style={{ backgroundColor: colors.primary }} ref={ref}>
      <div
        className={`max-w-4xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            {config.headline}
          </h2>
          {config.subtext && (
            <p className="text-lg opacity-90 max-w-xl mx-auto">{config.subtext}</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot - hidden from humans */}
            <input
              type="text"
              name="website"
              value={formState.website}
              onChange={(e) => setFormState({ ...formState, website: e.target.value })}
              style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none"
                  style={{ '--tw-ring-color': colors.accent } as React.CSSProperties}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Email Address
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>

            {services.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Service Interested In
                </label>
                <select
                  value={formState.service}
                  onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none"
                >
                  <option value="">Select a service...</option>
                  {services.map((svc, i) => (
                    <option key={i} value={svc.name}>{svc.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                How Can We Help?
              </label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: colors.accent, color: colors.primary }}
            >
              {submitting ? 'Sending...' : 'Get Your Free Estimate'}
            </button>

            <p className="text-center text-sm" style={{ color: colors.textLight }}>
              Or call us directly at{' '}
              <a href={`tel:${config.phone.replace(/\D/g, '')}`} className="font-semibold underline" style={{ color: colors.primary }}>
                {config.phone}
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
