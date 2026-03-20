'use client';

import { Site } from '@/lib/types/site-config';
import { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Color Palette ─── */
const C = {
  primary: '#0F172A',
  secondary: '#1E293B',
  accent: '#E8762D',
  accentHover: '#D4681F',
  bg: '#FFFFFF',
  bgAlt: '#F8FAFC',
  text: '#0F172A',
  textMuted: '#64748B',
  textLight: '#94A3B8',
  border: '#E2E8F0',
};

/* ─── Scroll-reveal hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ═══════════════════════════════════════════════════════════
   GENERIC MODERN TEMPLATE — Premium Quality
   ═══════════════════════════════════════════════════════════ */

export function GenericModernTemplate({ site }: { site: Site }) {
  const cfg = site.site_config;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>

      {/* ─── DESKTOP NAV ─── */}
      <header
        className="hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(15,23,42,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-white tracking-tight">
            {cfg.footer.business_name}
          </span>
          <nav className="flex items-center gap-8">
            {['Services', 'About', 'Contact'].map((s) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                {s}
              </a>
            ))}
            <a
              href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`}
              className="ml-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ backgroundColor: C.accent, color: '#fff' }}
            >
              {cfg.hero.cta_phone}
            </a>
          </nav>
        </div>
      </header>

      {/* ─── MOBILE STICKY BAR ─── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden shadow-2xl"
        style={{ backgroundColor: C.accent }}
      >
        <a
          href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`}
          className="flex items-center justify-center gap-2 py-4 font-bold text-white text-base"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now — {cfg.hero.cta_phone}
        </a>
      </div>

      {/* ═══════════════════════════════════════════
          HERO — Full-viewport cinematic
         ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* BG Image */}
        <div className="absolute inset-0">
          <img
            src={cfg.hero.background_image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 50%, rgba(15,23,42,0.5) 100%)',
          }} />
        </div>

        {/* Decorative accent line */}
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, ${C.accent}, transparent 60%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-32 md:py-0 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-8"
              style={{ backgroundColor: 'rgba(232,118,45,0.15)', color: C.accent, border: `1px solid rgba(232,118,45,0.3)` }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.accent }} />
              {site.business_city}{site.business_state ? `, ${site.business_state}` : ''}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              {cfg.hero.headline}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
              {cfg.hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
                style={{ backgroundColor: C.accent, color: '#fff' }}
              >
                <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {cfg.hero.cta_text}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-semibold border-2 border-white/30 text-white transition-all duration-300 hover:bg-white hover:text-gray-900 hover:border-white"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════
          TRUST BAR — Social proof strip
         ═══════════════════════════════════════════ */}
      <TrustBar stats={cfg.about.stats} />

      {/* ═══════════════════════════════════════════
          SERVICES
         ═══════════════════════════════════════════ */}
      <section id="services" className="py-24 md:py-32" style={{ backgroundColor: C.bgAlt }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeader
            label="What We Do"
            title="Our Services"
            subtitle="Expert solutions delivered with precision and care"
          />
          <div className="space-y-20 md:space-y-28 mt-16">
            {cfg.services.map((svc, i) => (
              <ServiceBlock key={i} service={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT
         ═══════════════════════════════════════════ */}
      <AboutSection cfg={cfg} site={site} />

      {/* ═══════════════════════════════════════════
          CONTACT
         ═══════════════════════════════════════════ */}
      <ContactSection cfg={cfg} siteId={site.id} />

      {/* ═══════════════════════════════════════════
          FOOTER
         ═══════════════════════════════════════════ */}
      <footer style={{ backgroundColor: C.primary }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">{cfg.footer.business_name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{cfg.footer.tagline}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Quick Links</h4>
              <div className="space-y-3">
                {['Services', 'About', 'Contact'].map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="block text-gray-400 hover:text-white text-sm transition-colors">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <a href={`tel:${cfg.contact.phone.replace(/\D/g, '')}`} className="block hover:text-white transition-colors">{cfg.contact.phone}</a>
                <a href={`mailto:${cfg.contact.email}`} className="block hover:text-white transition-colors">{cfg.contact.email}</a>
                <p>{site.business_city}{site.business_state ? `, ${site.business_state}` : ''}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} {cfg.footer.business_name}. All rights reserved.</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" style={{ color: C.accent }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-500 text-xs ml-2">5-Star Rated</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile bottom padding */}
      <div className="h-16 md:hidden" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
   ───────────────────────────────────────────── */

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <span
        className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
        style={{ backgroundColor: `${C.accent}12`, color: C.accent }}
      >
        {label}
      </span>
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: C.primary }}>
        {title}
      </h2>
      <p className="text-lg max-w-2xl mx-auto" style={{ color: C.textMuted }}>
        {subtitle}
      </p>
    </div>
  );
}

function TrustBar({ stats }: { stats: { value: string; label: string }[] }) {
  const { ref, visible } = useReveal(0.3);
  return (
    <section ref={ref} className="relative -mt-16 z-20 max-w-5xl mx-auto px-6 md:px-8">
      <div
        className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-0 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ backgroundColor: C.primary }}
      >
        {stats.slice(0, 4).map((stat, i) => (
          <div
            key={i}
            className="text-center py-8 px-4"
            style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
          >
            <div className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: C.accent }}>
              {stat.value}
            </div>
            <div className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceBlock({ service, index }: { service: { name: string; description: string; image?: string }; index: number }) {
  const { ref, visible } = useReveal(0.1);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-8 md:gap-16 items-center transition-all duration-700 delay-100 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <div className="relative group rounded-2xl overflow-hidden shadow-xl">
          <img
            src={service.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'}
            alt={service.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Number overlay */}
          <div
            className="absolute top-4 left-4 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ backgroundColor: C.accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2">
        <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: C.accent }}>
          Service {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight" style={{ color: C.primary }}>
          {service.name}
        </h3>
        <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: C.textMuted }}>
          {service.description}
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
          style={{ color: C.accent }}
        >
          Get a Free Estimate
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function AboutSection({ cfg, site }: { cfg: Site['site_config']; site: Site }) {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-8">
        <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Image */}
          <div className="w-full md:w-5/12">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={cfg.about.image}
                  alt="About"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              {/* Decorative accent block */}
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl -z-10"
                style={{ backgroundColor: `${C.accent}15` }}
              />
              <div
                className="absolute -top-4 -left-4 w-20 h-20 rounded-xl -z-10"
                style={{ backgroundColor: `${C.accent}10` }}
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-7/12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: `${C.accent}12`, color: C.accent }}>
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6" style={{ color: C.primary }}>
              {cfg.about.headline}
            </h2>
            <div className="space-y-4 mb-8">
              {cfg.about.body.split(/\n\n|\n/).filter(Boolean).map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed" style={{ color: C.textMuted }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${C.accent}12` }}>
                  <svg className="w-5 h-5" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm font-medium" style={{ color: C.text }}>Licensed &amp; Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${C.accent}12` }}>
                  <svg className="w-5 h-5" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium" style={{ color: C.text }}>Fast Response</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" style={{ color: C.accent }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium" style={{ color: C.text }}>5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ cfg, siteId }: { cfg: Site['site_config']; siteId: string }) {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return; // honeypot
    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_id: siteId,
          name: form.name,
          email: form.email,
          phone: form.phone,
          service_interest: form.service,
          message: form.message,
          website: form.website,
          source_page: 'contact',
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch { /* silent */ } finally { setSubmitting(false); }
  }, [form, siteId]);

  return (
    <section id="contact" className="py-24 md:py-32" style={{ backgroundColor: C.primary }}>
      <div ref={ref} className={`max-w-7xl mx-auto px-6 md:px-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {submitted ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${C.accent}20` }}>
              <svg className="w-10 h-10" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-gray-400 text-lg">We&apos;ll get back to you shortly. For immediate help, call <a href={`tel:${cfg.contact.phone.replace(/\D/g, '')}`} className="underline" style={{ color: C.accent }}>{cfg.contact.phone}</a></p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — CTA */}
            <div className="flex flex-col justify-center">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 w-fit" style={{ backgroundColor: `${C.accent}15`, color: C.accent }}>
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
                {cfg.contact.headline}
              </h2>
              {cfg.contact.subtext && (
                <p className="text-lg text-gray-400 leading-relaxed mb-10">{cfg.contact.subtext}</p>
              )}

              <div className="space-y-6">
                <a href={`tel:${cfg.contact.phone.replace(/\D/g, '')}`} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: `${C.accent}15` }}>
                    <svg className="w-6 h-6" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call us</p>
                    <p className="text-lg font-semibold text-white group-hover:underline">{cfg.contact.phone}</p>
                  </div>
                </a>
                <a href={`mailto:${cfg.contact.email}`} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${C.accent}15` }}>
                    <svg className="w-6 h-6" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email us</p>
                    <p className="text-lg font-semibold text-white group-hover:underline">{cfg.contact.email}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" name="website" value={form.website} onChange={e => setForm({...form, website: e.target.value})} style={{ position: 'absolute', left: '-9999px' }} tabIndex={-1} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: C.text }}>Full Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2"
                      style={{ borderColor: C.border, '--tw-ring-color': C.accent } as React.CSSProperties}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: C.text }}>Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2"
                      style={{ borderColor: C.border, '--tw-ring-color': C.accent } as React.CSSProperties}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: C.text }}>Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2"
                    style={{ borderColor: C.border, '--tw-ring-color': C.accent } as React.CSSProperties}
                    placeholder="john@example.com"
                  />
                </div>

                {cfg.services.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: C.text }}>Service Interested In</label>
                    <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2"
                      style={{ borderColor: C.border, '--tw-ring-color': C.accent } as React.CSSProperties}
                    >
                      <option value="">Select a service...</option>
                      {cfg.services.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: C.text }}>Message</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 resize-none"
                    style={{ borderColor: C.border, '--tw-ring-color': C.accent } as React.CSSProperties}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl text-lg font-bold text-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50"
                  style={{ backgroundColor: C.accent }}
                >
                  {submitting ? 'Sending...' : 'Get Your Free Estimate'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
