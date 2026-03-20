'use client';

import { Site } from '@/lib/types/site-config';
import { useState, useEffect, useRef } from 'react';

const DEFAULT_COLORS = {
  primary: '#1F2937',
  secondary: '#374151',
  accent: '#E8762D',
  background: '#FFFFFF',
  text: '#1f2937',
  textLight: '#6b7280',
  heroOverlay: 'rgba(31, 41, 55, 0.3)',
};

export function GenericModernTemplate({ site }: { site: Site }) {
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-white font-bold text-lg">
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

      {/* Hero Section - Modern Split */}
      <HeroSection config={config.hero} colors={colors} />

      {/* Services Section - 3-Column Grid */}
      <ServicesSection config={config.services} colors={colors} />

      {/* About Section - Dark Band with Stats */}
      <AboutSection config={config.about} colors={colors} />

      {/* Contact Section - Two Column */}
      <ContactSection config={config.contact} siteId={site.id} services={config.services} colors={colors} />

      {/* Footer */}
      <FooterSection config={config.footer} phone={config.hero.cta_phone} email={config.contact.email} colors={colors} />

      {/* Bottom padding for mobile call bar */}
      <div className="h-16 md:hidden" />
    </div>
  );
}

// HERO SECTION - Modern Split Layout
function HeroSection({ config, colors }: { config: any; colors: Record<string, string> }) {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden pt-20 md:pt-0"
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent}20 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-0 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            {config.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-10 leading-relaxed max-w-xl">
            {config.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
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
              Get Started
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <div
            className="relative h-96 md:h-full rounded-2xl shadow-2xl overflow-hidden"
            style={{ minHeight: '500px' }}
          >
            <img
              src={config.background_image}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

// SERVICES SECTION - 3-Column Grid with Hover Lift
function ServicesSection({ config, colors }: { config: any[]; colors: Record<string, string> }) {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getIconColor = (index: number) => {
    const colors_array = [colors.accent, colors.primary, colors.secondary];
    return colors_array[index % colors_array.length];
  };

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ backgroundColor: '#F3F4F6' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.primary }}>
            Our Services
          </h2>
          <p className="text-lg" style={{ color: colors.textLight }}>
            Comprehensive solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px] cursor-pointer group`}
              style={{
                borderTop: `4px solid ${getIconColor(index)}`,
              }}
            >
              {/* Icon Area */}
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${getIconColor(index)}15` }}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: getIconColor(index) }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                {service.name}
              </h3>
              <p style={{ color: colors.textLight }} className="leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ABOUT SECTION - Dark Band with Stats
function AboutSection({ config, colors }: { config: any; colors: Record<string, string> }) {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 md:py-28"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats - Inline */}
        {config.stats && config.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {config.stats.map((stat: any, index: number) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="text-3xl md:text-4xl font-bold" style={{ color: colors.accent }}>
                  {stat.value}
                </div>
                <p className="text-gray-300 text-sm md:text-base mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Content Block */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {config.headline}
          </h2>

          {/* Pull Quote */}
          <blockquote className="border-l-4 border-accent pl-6 mb-8 py-4">
            <p className="text-lg italic text-gray-200 leading-relaxed">
              &quot;{config.body}&quot;
            </p>
          </blockquote>

          <p className="text-gray-300 leading-relaxed">
            We&apos;re committed to delivering exceptional results and building lasting relationships with our clients.
          </p>
        </div>
      </div>
    </section>
  );
}

// CONTACT SECTION - Two Column Layout
function ContactSection({
  config,
  siteId,
  services,
  colors,
}: {
  config: any;
  siteId: string;
  services: any[];
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
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-lg opacity-90">
            We&apos;ve received your message and will get back to you shortly. For immediate assistance, call us at{' '}
            <a href={`tel:${config.phone.replace(/\D/g, '')}`} className="underline font-semibold">
              {config.phone}
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-28"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.primary }}>
            {config.headline}
          </h2>
          {config.subtext && (
            <p className="text-lg" style={{ color: colors.textLight }}>
              {config.subtext}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Business Info */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="space-y-8">
              {/* Contact Info Cards */}
              <div className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colors.accent}15` }}
                >
                  <svg className="w-6 h-6" fill="none" stroke={colors.accent} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    Phone
                  </p>
                  <a
                    href={`tel:${config.phone.replace(/\D/g, '')}`}
                    className="text-lg font-semibold"
                    style={{ color: colors.primary }}
                  >
                    {config.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${colors.accent}15` }}
                >
                  <svg className="w-6 h-6" fill="none" stroke={colors.accent} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    Email
                  </p>
                  <a
                    href={`mailto:${config.email}`}
                    className="text-lg font-semibold"
                    style={{ color: colors.primary }}
                  >
                    {config.email}
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div
                className="w-full h-64 rounded-xl overflow-hidden shadow-md"
                style={{ backgroundColor: '#E5E7EB' }}
              >
                <div className="w-full h-full flex items-center justify-center flex-col gap-2">
                  <svg className="w-12 h-12" fill="none" stroke={colors.textLight} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p style={{ color: colors.textLight }}>Map Placeholder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="bg-gray-50 rounded-xl p-8 shadow-md">
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

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Full Name *
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
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none"
                    style={{ '--tw-ring-color': colors.accent } as React.CSSProperties}
                    placeholder="john@example.com"
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
                    style={{ '--tw-ring-color': colors.accent } as React.CSSProperties}
                    placeholder="(555) 123-4567"
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
                      style={{ '--tw-ring-color': colors.accent } as React.CSSProperties}
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
                    Message
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none resize-none"
                    style={{ '--tw-ring-color': colors.accent } as React.CSSProperties}
                    placeholder="Tell us more about your needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                  style={{ backgroundColor: colors.accent, color: colors.primary }}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// FOOTER - Minimal Single-Line
function FooterSection({
  config,
  phone,
  email,
  colors,
}: {
  config: any;
  phone: string;
  email: string;
  colors: Record<string, string>;
}) {
  return (
    <footer
      className="py-8"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left text-gray-300">
          <p className="text-sm font-medium">
            &copy; {new Date().getFullYear()} {config.business_name}. All rights reserved.
          </p>
          <div className="hidden md:block w-px h-4" style={{ backgroundColor: colors.accent }} />
          <p className="text-sm">
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
              {phone}
            </a>
            {' '} • {' '}
            <a href={`mailto:${email}`} className="hover:text-white transition-colors">
              {email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
