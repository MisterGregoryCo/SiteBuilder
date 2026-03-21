'use client';

import { Site } from '@/lib/types/site-config';
import { useState, useEffect, useRef, useCallback } from 'react';
import { LogoBrand } from '../shared/logo-brand';

/* ═══════════════════════════════════════════════════════════
   ROOFING PREMIUM — "Editorial Premium" Layout B
   Inspired by: legendarylifestyles.com, grovepark.com

   Full-bleed cinematic hero, serif + sans-serif pairing,
   warm navy/gold palette, editorial split layouts
   ═══════════════════════════════════════════════════════════ */

const C = {
  navy: '#0C1B33',
  navyLight: '#162A4A',
  gold: '#C9A84C',
  goldLight: '#E2C87C',
  goldGlow: 'rgba(201,168,76,0.15)',
  cream: '#FAF8F5',
  white: '#FFFFFF',
  text: '#1A1A2E',
  textMuted: '#6B7280',
  border: 'rgba(12,27,51,0.08)',
  borderLight: 'rgba(255,255,255,0.1)',
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
  return { ref, vis, anim: { opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' } as React.CSSProperties };
}

export function RoofingPremiumTemplate({ site }: { site: Site }) {
  const cfg = site.site_config;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navSolid = scrollY > 80;

  return (
    <div className="min-h-screen" style={{ background: C.cream, fontFamily: "'Inter', system-ui, sans-serif", color: C.text }}>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navSolid ? 'rgba(12,27,51,0.97)' : 'transparent',
          backdropFilter: navSolid ? 'blur(16px)' : 'none',
          borderBottom: navSolid ? `1px solid ${C.borderLight}` : '1px solid transparent',
        }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <LogoBrand logoUrl={cfg.logo_url} businessName={cfg.footer.business_name} fontFamily='Georgia, "Times New Roman", serif' />
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Contact'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">{s}</a>
            ))}
            <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`}
              className="px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: C.gold, color: C.navy, borderRadius: '2px' }}>
              {cfg.hero.cta_phone}
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ MOBILE BAR ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: C.gold }}>
        <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`}
          className="flex items-center justify-center gap-2 py-4 font-bold" style={{ color: C.navy }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now — {cfg.hero.cta_phone}
        </a>
      </div>

      {/* ═══════════════════════════════════════════
          HERO — Full-bleed cinematic (GrovePark style)
         ═══════════════════════════════════════════ */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.25}px)` }}>
          <img src={cfg.hero.background_image} alt="" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(0deg, rgba(12,27,51,0.95) 0%, rgba(12,27,51,0.3) 40%, rgba(12,27,51,0.1) 100%)',
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-28 w-full">
          {/* Gold accent line */}
          <div className="w-16 h-0.5 mb-8" style={{ background: C.gold }} />

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            {cfg.hero.headline}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            {cfg.hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold transition-all duration-300 hover:scale-105"
              style={{ background: C.gold, color: C.navy }}>
              {cfg.hero.cta_text}
            </a>
            <a href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
              Request Estimate
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS — Elegant horizontal bar
         ═══════════════════════════════════════════ */}
      <StatsBar stats={cfg.about.stats} />

      {/* ═══════════════════════════════════════════
          SERVICES — Editorial alternating splits
         ═══════════════════════════════════════════ */}
      <section id="services" className="py-28 md:py-36" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 block" style={{ color: C.gold }}>Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: C.navy }}>
              Services We Provide
            </h2>
          </div>

          <div className="space-y-24 md:space-y-32">
            {cfg.services.map((svc, i) => (
              <ServiceRow key={i} service={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT — Dark editorial section
         ═══════════════════════════════════════════ */}
      <AboutSection cfg={cfg} site={site} />

      {/* ═══════════════════════════════════════════
          CONTACT
         ═══════════════════════════════════════════ */}
      <ContactSection cfg={cfg} siteId={site.id} />

      {/* ═══════════════════════════════════════════
          FOOTER
         ═══════════════════════════════════════════ */}
      <footer style={{ background: C.navy }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>{cfg.footer.business_name}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{cfg.footer.tagline}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Navigate</h4>
              <div className="space-y-3">
                {['Services', 'About', 'Contact'].map(l => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm text-gray-400 hover:text-white transition-colors">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Get In Touch</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <a href={`tel:${cfg.contact.phone.replace(/\D/g, '')}`} className="block hover:text-white transition-colors">{cfg.contact.phone}</a>
                <a href={`mailto:${cfg.contact.email}`} className="block hover:text-white transition-colors">{cfg.contact.email}</a>
              </div>
            </div>
          </div>
          <div className="pt-8 flex items-center justify-between" style={{ borderTop: `1px solid ${C.borderLight}` }}>
            <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} {cfg.footer.business_name}</p>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" style={{ color: C.gold }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <div className="h-16 md:hidden" />
    </div>
  );
}

/* ═══ SUB-COMPONENTS ═══ */

function StatsBar({ stats }: { stats: { value: string; label: string }[] }) {
  const { ref, vis, anim } = useReveal(0.3);
  return (
    <div ref={ref} className={`py-16 transition-all duration-1000 `} style={{...anim,  background: C.navy }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.slice(0, 4).map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: C.gold, fontFamily: 'Georgia, serif' }}>{s.value}</div>
              <div className="text-xs font-medium uppercase tracking-widest text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceRow({ service, index }: { service: { name: string; description: string; image?: string }; index: number }) {
  const { ref, vis, anim } = useReveal(0.08);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} style={{...anim, transitionDelay: `${index * 80}ms`}} className={`flex flex-col gap-10 md:gap-20 items-center transition-all duration-1000  ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Image */}
      <div className="w-full md:w-7/12">
        <div className="relative group overflow-hidden">
          <img src={service.image || 'https://images.unsplash.com/photo-1632759145354-26c2e8bd1c3e?w=800&q=80'}
            alt={service.name} className="w-full aspect-[16/10] object-cover transition-transform duration-1000 group-hover:scale-105" />
          {/* Overlay number */}
          <div className="absolute bottom-0 right-0 px-6 py-3 text-xs font-bold tracking-widest"
            style={{ background: C.navy, color: C.gold }}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-5/12">
        <div className="w-10 h-0.5 mb-6" style={{ background: C.gold }} />
        <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>
          {service.name}
        </h3>
        <p className="text-base leading-relaxed mb-6" style={{ color: C.textMuted }}>{service.description}</p>
        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:gap-3"
          style={{ color: C.gold }}>
          Get Estimate
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function AboutSection({ cfg, site }: { cfg: Site['site_config']; site: Site }) {
  const { ref, vis, anim } = useReveal();
  return (
    <section id="about" className="py-28 md:py-36" style={{ background: C.navy }}>
      <div ref={ref} style={anim} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 transition-all duration-1000 `}>
          <div className="w-full lg:w-5/12">
            <div className="relative">
              <img src={cfg.about.image} alt="About" className="w-full aspect-[3/4] object-cover" />
              {/* Gold border accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 -z-10" style={{ borderColor: C.gold }} />
            </div>
          </div>
          <div className="w-full lg:w-7/12 text-white">
            <div className="w-10 h-0.5 mb-6" style={{ background: C.gold }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {cfg.about.headline}
            </h2>
            <div className="space-y-5">
              {cfg.about.body.split(/\n\n|\n/).filter(Boolean).map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed text-gray-300">{p}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-6 mt-10">
              {[{ icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Licensed & Insured' },
                { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Fast Response' }].map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: C.gold }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={b.icon} />
                  </svg>
                  <span className="text-sm font-medium text-gray-300">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ cfg, siteId }: { cfg: Site['site_config']; siteId: string }) {
  const { ref, vis, anim } = useReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site_id: siteId, name: form.name, email: form.email, phone: form.phone, service_interest: form.service, message: form.message, website: form.website, source_page: 'contact' }),
      });
      if (res.ok) setSubmitted(true);
    } catch { /* silent */ } finally { setSubmitting(false); }
  }, [form, siteId]);

  const inputCls = "w-full px-5 py-4 text-sm transition-all outline-none";
  const inputStyle = { background: C.white, border: `1px solid ${C.border}`, color: C.text };

  return (
    <section id="contact" className="py-28 md:py-36" style={{ background: C.cream }}>
      <div ref={ref} style={anim} className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-1000 `}>
        {submitted ? (
          <div className="text-center py-20">
            <div className="w-16 h-0.5 mx-auto mb-8" style={{ background: C.gold }} />
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>Thank You</h2>
            <p style={{ color: C.textMuted }}>We&apos;ll be in touch shortly. Call <a href={`tel:${cfg.contact.phone.replace(/\D/g, '')}`} className="underline" style={{ color: C.gold }}>{cfg.contact.phone}</a> for immediate help.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="flex flex-col justify-center">
              <div className="w-10 h-0.5 mb-6" style={{ background: C.gold }} />
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>
                {cfg.contact.headline}
              </h2>
              {cfg.contact.subtext && <p className="text-lg mb-12 leading-relaxed" style={{ color: C.textMuted }}>{cfg.contact.subtext}</p>}

              <div className="space-y-6">
                <a href={`tel:${cfg.contact.phone.replace(/\D/g, '')}`} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 flex items-center justify-center flex-shrink-0" style={{ background: C.goldGlow }}>
                    <svg className="w-6 h-6" style={{ color: C.gold }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Phone</p>
                    <p className="text-lg font-semibold group-hover:underline" style={{ color: C.navy }}>{cfg.contact.phone}</p>
                  </div>
                </a>
                <a href={`mailto:${cfg.contact.email}`} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 flex items-center justify-center flex-shrink-0" style={{ background: C.goldGlow }}>
                    <svg className="w-6 h-6" style={{ color: C.gold }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Email</p>
                    <p className="text-lg font-semibold group-hover:underline" style={{ color: C.navy }}>{cfg.contact.email}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-8 md:p-10 shadow-xl" style={{ background: C.white }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" name="website" value={form.website} onChange={e => setForm({...form, website: e.target.value})} style={{ position: 'absolute', left: '-9999px' }} tabIndex={-1} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputCls} style={inputStyle} placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputCls} style={inputStyle} placeholder="(555) 123-4567" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputCls} style={inputStyle} placeholder="john@example.com" />
                </div>
                {cfg.services.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>Service</label>
                    <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} className={inputCls} style={inputStyle}>
                      <option value="">Select a service...</option>
                      {cfg.services.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>Message</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={`${inputCls} resize-none`} style={inputStyle} placeholder="Tell us about your project..." />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full py-4 text-base font-bold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                  style={{ background: C.gold, color: C.navy }}>
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
