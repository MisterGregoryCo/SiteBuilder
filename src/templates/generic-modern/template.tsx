'use client';

import { Site } from '@/lib/types/site-config';
import { useState, useEffect, useRef, useCallback } from 'react';
import { LogoBrand } from '../shared/logo-brand';

/* ═══════════════════════════════════════════════════════════
   GENERIC MODERN — "Dark Modern" Layout A
   Inspired by: cosmos.so, apple.com, teamproset.com

   Dark theme, bold sans-serif, gradient accents,
   glassmorphism cards, cinematic spacing
   ═══════════════════════════════════════════════════════════ */

const C = {
  bg: '#000000',
  bgCard: '#0A0A0A',
  bgGlass: 'rgba(255,255,255,0.03)',
  bgGlassHover: 'rgba(255,255,255,0.06)',
  accent: '#E8762D',
  accentGlow: 'rgba(232,118,45,0.2)',
  white: '#FFFFFF',
  gray100: '#F5F5F5',
  gray300: '#D4D4D4',
  gray400: '#A3A3A3',
  gray500: '#737373',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',
  border: 'rgba(255,255,255,0.06)',
};

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); o.disconnect(); }
    }, { threshold });
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return { ref, vis };
}

export function GenericModernTemplate({ site }: { site: Site }) {
  const cfg = site.site_config;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navOpacity = Math.min(scrollY / 300, 1);

  return (
    <div className="min-h-screen" style={{ background: C.bg, fontFamily: "'Inter', -apple-system, system-ui, sans-serif", color: C.white }}>

      {/* ═══ NAVBAR ═══ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: `rgba(0,0,0,${navOpacity * 0.85})`,
          backdropFilter: navOpacity > 0.1 ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: navOpacity > 0.5 ? `1px solid ${C.border}` : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <LogoBrand logoUrl={cfg.logo_url} businessName={cfg.footer.business_name} />
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Contact'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="text-sm transition-colors duration-200" style={{ color: C.gray400 }}
                onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                onMouseLeave={e => (e.currentTarget.style.color = C.gray400)}
              >{s}</a>
            ))}
            <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: C.accent, color: C.white }}
            >
              {cfg.hero.cta_phone}
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ MOBILE CALL BAR ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: C.accent }}>
        <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`}
          className="flex items-center justify-center gap-2 py-4 font-bold text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now — {cfg.hero.cta_phone}
        </a>
      </div>

      {/* ═══════════════════════════════════════════
          HERO — Cinematic full-viewport
         ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax BG */}
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <img src={cfg.hero.background_image} alt="" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.8) 100%)',
          }} />
        </div>

        {/* Accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: C.accent }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          {/* Location badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase mb-8"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: `1px solid ${C.border}`, color: C.gray300 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
            {site.business_city}{site.business_state ? `, ${site.business_state}` : ''}
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-8">
            {cfg.hero.headline}
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: C.gray400 }}>
            {cfg.hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ background: C.accent, color: C.white, boxShadow: `0 0 40px ${C.accentGlow}` }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {cfg.hero.cta_text}
            </a>
            <a href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-white hover:text-black"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: C.white }}>
              Request a Quote
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: C.accent }} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR — Floating glass card
         ═══════════════════════════════════════════ */}
      <StatsBar stats={cfg.about.stats} />

      {/* ═══════════════════════════════════════════
          SERVICES — Glassmorphism cards
         ═══════════════════════════════════════════ */}
      <section id="services" className="py-28 md:py-36" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel text="What We Do" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center mb-6">Our Services</h2>
          <p className="text-center text-lg max-w-xl mx-auto mb-20" style={{ color: C.gray500 }}>
            Expert solutions tailored to your needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cfg.services.map((svc, i) => (
              <ServiceCard key={i} service={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT — Split with image
         ═══════════════════════════════════════════ */}
      <AboutSection cfg={cfg} site={site} />

      {/* ═══════════════════════════════════════════
          CONTACT — Dark glass form
         ═══════════════════════════════════════════ */}
      <ContactSection cfg={cfg} siteId={site.id} />

      {/* ═══════════════════════════════════════════
          FOOTER
         ═══════════════════════════════════════════ */}
      <footer style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-3">{cfg.footer.business_name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.gray500 }}>{cfg.footer.tagline}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.gray500 }}>Quick Links</h4>
              <div className="space-y-3">
                {['Services', 'About', 'Contact'].map(l => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm transition-colors hover:text-white" style={{ color: C.gray500 }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.gray500 }}>Contact</h4>
              <div className="space-y-3 text-sm" style={{ color: C.gray500 }}>
                <a href={`tel:${cfg.contact.phone.replace(/\D/g, '')}`} className="block hover:text-white transition-colors">{cfg.contact.phone}</a>
                <a href={`mailto:${cfg.contact.email}`} className="block hover:text-white transition-colors">{cfg.contact.email}</a>
                <p>{site.business_city}{site.business_state ? `, ${site.business_state}` : ''}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-xs" style={{ color: C.gray700 }}>&copy; {new Date().getFullYear()} {cfg.footer.business_name}. All rights reserved.</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" style={{ color: C.accent }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs ml-2" style={{ color: C.gray700 }}>5-Star Rated</span>
            </div>
          </div>
        </div>
      </footer>

      <div className="h-16 md:hidden" />
    </div>
  );
}

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */

function SectionLabel({ text }: { text: string }) {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref} className={`text-center mb-4 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase" style={{ color: C.accent }}>{text}</span>
    </div>
  );
}

function StatsBar({ stats }: { stats: { value: string; label: string }[] }) {
  const { ref, vis } = useReveal(0.2);
  return (
    <div ref={ref} className="relative z-20 -mt-20 max-w-4xl mx-auto px-6 lg:px-8">
      <div className={`rounded-2xl overflow-hidden transition-all duration-1000 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: `1px solid ${C.border}` }}>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.slice(0, 4).map((s, i) => (
            <div key={i} className="text-center py-8 px-4"
              style={{ borderRight: i < Math.min(stats.length, 4) - 1 ? `1px solid ${C.border}` : 'none' }}>
              <div className="text-3xl md:text-4xl font-extrabold mb-1" style={{ color: C.accent }}>{s.value}</div>
              <div className="text-xs font-medium uppercase tracking-wider" style={{ color: C.gray500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: { name: string; description: string; image?: string }; index: number }) {
  const { ref, vis } = useReveal(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        background: hovered ? C.bgGlassHover : C.bgGlass,
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.1)' : C.border}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={service.image || `https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80`}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {/* Number tag */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: `1px solid ${C.border}` }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-bold mb-3 tracking-tight">{service.name}</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: C.gray400 }}>{service.description}</p>
        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
          style={{ color: C.accent }}>
          Get a Free Estimate
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function AboutSection({ cfg, site }: { cfg: Site['site_config']; site: Site }) {
  const { ref, vis } = useReveal();
  return (
    <section id="about" className="py-28 md:py-36" style={{ background: C.gray900 }}>
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 transition-all duration-1000 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Image */}
          <div className="w-full lg:w-5/12">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img src={cfg.about.image} alt="About" className="w-full aspect-[3/4] object-cover" />
              </div>
              {/* Decorative glow */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full blur-[80px] opacity-30" style={{ background: C.accent }} />
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-7/12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-6 block" style={{ color: C.accent }}>About Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-8 leading-tight">{cfg.about.headline}</h2>
            <div className="space-y-5 mb-10">
              {cfg.about.body.split(/\n\n|\n/).filter(Boolean).map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed" style={{ color: C.gray400 }}>{p}</p>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Licensed & Insured' },
                { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Fast Response' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: C.bgGlass, border: `1px solid ${C.border}` }}>
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={b.icon} />
                  </svg>
                  <span className="text-sm font-medium">{b.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: C.bgGlass, border: `1px solid ${C.border}` }}>
                <div className="flex -space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" style={{ color: C.accent }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium">5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ cfg, siteId }: { cfg: Site['site_config']; siteId: string }) {
  const { ref, vis } = useReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site_id: siteId, name: form.name, email: form.email, phone: form.phone, service_interest: form.service, message: form.message, website: form.website, source_page: 'contact' }),
      });
      if (res.ok) setSubmitted(true);
    } catch { /* silent */ } finally { setSubmitting(false); }
  }, [form, siteId]);

  const inputCls = "w-full px-5 py-4 rounded-xl text-sm transition-all outline-none placeholder-gray-600";
  const inputStyle = { background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, color: C.white };

  return (
    <section id="contact" className="py-28 md:py-36" style={{ background: C.bg }}>
      <div ref={ref} className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {submitted ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{ background: C.accentGlow }}>
              <svg className="w-10 h-10" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold mb-4">Thank You</h2>
            <p className="text-lg" style={{ color: C.gray400 }}>
              We&apos;ll be in touch shortly. Call <a href={`tel:${cfg.contact.phone.replace(/\D/g, '')}`} className="underline" style={{ color: C.accent }}>{cfg.contact.phone}</a> for immediate help.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left */}
            <div className="flex flex-col justify-center">
              <span className="text-xs font-bold tracking-[0.2em] uppercase mb-6 block" style={{ color: C.accent }}>Get In Touch</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">{cfg.contact.headline}</h2>
              {cfg.contact.subtext && (
                <p className="text-lg mb-12 leading-relaxed" style={{ color: C.gray400 }}>{cfg.contact.subtext}</p>
              )}
              <div className="space-y-6">
                <a href={`tel:${cfg.contact.phone.replace(/\D/g, '')}`} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: C.bgGlass, border: `1px solid ${C.border}` }}>
                    <svg className="w-6 h-6" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: C.gray500 }}>Call us</p>
                    <p className="text-lg font-semibold group-hover:underline">{cfg.contact.phone}</p>
                  </div>
                </a>
                <a href={`mailto:${cfg.contact.email}`} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: C.bgGlass, border: `1px solid ${C.border}` }}>
                    <svg className="w-6 h-6" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: C.gray500 }}>Email us</p>
                    <p className="text-lg font-semibold group-hover:underline">{cfg.contact.email}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right — Form */}
            <div className="rounded-2xl p-8 md:p-10" style={{ background: C.bgGlass, border: `1px solid ${C.border}`, backdropFilter: 'blur(20px)' }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" name="website" value={form.website} onChange={e => setForm({...form, website: e.target.value})}
                  style={{ position: 'absolute', left: '-9999px' }} tabIndex={-1} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.gray500 }}>Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className={inputCls} style={inputStyle} placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.gray500 }}>Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className={inputCls} style={inputStyle} placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.gray500 }}>Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className={inputCls} style={inputStyle} placeholder="john@example.com" />
                </div>

                {cfg.services.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.gray500 }}>Service</label>
                    <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                      className={inputCls} style={inputStyle}>
                      <option value="">Select a service...</option>
                      {cfg.services.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.gray500 }}>Message</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className={`${inputCls} resize-none`} style={inputStyle} placeholder="Tell us about your project..." />
                </div>

                <button type="submit" disabled={submitting}
                  className="w-full py-4 rounded-xl text-base font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50"
                  style={{ background: C.accent, color: C.white, boxShadow: `0 0 40px ${C.accentGlow}` }}>
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
