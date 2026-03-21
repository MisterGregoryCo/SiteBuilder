'use client';

import { Site } from '@/lib/types/site-config';
import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════
   PLUMBING PRO — "Clean Flow" Layout C
   Light backgrounds, deep blue + teal, wave dividers,
   horizontal service cards, clean trustworthy feel
   ═══════════════════════════════════════════════════════════ */

const C = {
  blue: '#0C4A6E', blueLight: '#0369A1', teal: '#0D9488', tealGlow: 'rgba(13,148,136,0.1)',
  skyBg: '#F0F9FF', white: '#FFFFFF', text: '#0F172A', textMuted: '#64748B', border: '#E2E8F0', navy: '#0F172A',
};

function useReveal(t = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: t }); o.observe(el); return () => o.disconnect(); }, [t]);
  return { ref, v };
}

export function PlumbingProTemplate({ site }: { site: Site }) {
  const cfg = site.site_config;
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => { const h = () => setScrollY(window.scrollY); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  const navSolid = scrollY > 60;

  return (
    <div className="min-h-screen" style={{ background: C.white, fontFamily: "'Inter', system-ui, sans-serif", color: C.text }}>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ background: navSolid ? 'rgba(255,255,255,0.95)' : 'transparent', backdropFilter: navSolid ? 'blur(16px)' : 'none', borderBottom: navSolid ? `1px solid ${C.border}` : '1px solid transparent' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-lg font-bold" style={{ color: navSolid ? C.blue : C.white }}>{cfg.footer.business_name}</span>
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Contact'].map(s => (<a key={s} href={`#${s.toLowerCase()}`} className="text-sm font-medium transition-colors" style={{ color: navSolid ? C.textMuted : 'rgba(255,255,255,0.8)' }}>{s}</a>))}
            <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`} className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105" style={{ background: C.teal }}>{cfg.hero.cta_phone}</a>
          </div>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: C.teal }}>
        <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`} className="flex items-center justify-center gap-2 py-4 font-bold text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Call Now — {cfg.hero.cta_phone}
        </a>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={cfg.hero.background_image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.blue}ee, ${C.blueLight}cc)` }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase mb-8 text-white" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.teal }} />Available 24/7
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[0.95] mb-8">{cfg.hero.headline}</h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-10 max-w-xl">{cfg.hero.subheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g, '')}`} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white transition-all hover:scale-105 shadow-lg" style={{ background: C.teal }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {cfg.hero.cta_text}
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white transition-all hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.3)' }}>Request Service</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="w-full h-16 md:h-24"><path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill={C.white} /></svg></div>
      </section>

      {/* STATS */}
      <Stats stats={cfg.about.stats} />

      {/* SERVICES */}
      <section id="services" className="py-28 md:py-36" style={{ background: C.skyBg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block" style={{ color: C.teal }}>Our Services</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: C.blue }}>How We Help</h2>
          </div>
          <div className="space-y-6">{cfg.services.map((svc, i) => <SvcCard key={i} svc={svc} i={i} />)}</div>
        </div>
      </section>

      {/* ABOUT */}
      <Abt cfg={cfg} />

      {/* CONTACT */}
      <Cta cfg={cfg} siteId={site.id} />

      {/* FOOTER */}
      <footer style={{ background: C.navy }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div><h3 className="text-xl font-bold text-white mb-3">{cfg.footer.business_name}</h3><p className="text-sm text-gray-400">{cfg.footer.tagline}</p></div>
            <div><h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Links</h4><div className="space-y-3">{['Services','About','Contact'].map(l=>(<a key={l} href={`#${l.toLowerCase()}`} className="block text-sm text-gray-400 hover:text-white transition-colors">{l}</a>))}</div></div>
            <div><h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Contact</h4><div className="space-y-3 text-sm text-gray-400"><a href={`tel:${cfg.contact.phone.replace(/\D/g,'')}`} className="block hover:text-white">{cfg.contact.phone}</a><a href={`mailto:${cfg.contact.email}`} className="block hover:text-white">{cfg.contact.email}</a></div></div>
          </div>
          <div className="pt-8 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}><p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} {cfg.footer.business_name}</p></div>
        </div>
      </footer>
      <div className="h-16 md:hidden" />
    </div>
  );
}

function Stats({ stats }: { stats: {value:string;label:string}[] }) {
  const { ref, v } = useReveal(0.3);
  return (<div ref={ref} className={`max-w-5xl mx-auto px-6 -mt-12 relative z-20 transition-all duration-700 ${v ? 'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{stats.slice(0,4).map((s,i)=>(<div key={i} className="text-center py-8 px-4 rounded-2xl shadow-lg" style={{background:C.white}}><div className="text-3xl font-extrabold mb-1" style={{color:C.teal}}>{s.value}</div><div className="text-xs font-medium uppercase tracking-wider" style={{color:C.textMuted}}>{s.label}</div></div>))}</div></div>);
}

function SvcCard({ svc, i }: { svc: {name:string;description:string;image?:string}; i: number }) {
  const { ref, v } = useReveal(0.08);
  return (<div ref={ref} className={`flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden shadow-md transition-all duration-700 hover:shadow-xl ${v?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`} style={{background:C.white,transitionDelay:`${i*80}ms`}}>
    <div className="w-full md:w-1/3 relative"><img src={svc.image||'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80'} alt={svc.name} className="w-full h-48 md:h-full object-cover" /><div className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{background:C.teal}}>{String(i+1).padStart(2,'0')}</div></div>
    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center" style={{borderLeft:`3px solid ${C.teal}`}}><h3 className="text-xl font-bold mb-3" style={{color:C.blue}}>{svc.name}</h3><p className="text-sm leading-relaxed mb-4" style={{color:C.textMuted}}>{svc.description}</p><a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{color:C.teal}}>Schedule Service <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></a></div>
  </div>);
}

function Abt({ cfg }: { cfg: Site['site_config'] }) {
  const { ref, v } = useReveal();
  return (<section id="about" className="py-28 md:py-36" style={{background:C.white}}><div ref={ref} className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${v?'opacity-100 translate-y-0':'opacity-0 translate-y-10'}`}><div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
    <div className="w-full lg:w-5/12"><div className="rounded-2xl overflow-hidden shadow-xl"><img src={cfg.about.image} alt="About" className="w-full aspect-[3/4] object-cover" /></div></div>
    <div className="w-full lg:w-7/12"><span className="text-xs font-bold tracking-[0.2em] uppercase mb-6 block" style={{color:C.teal}}>About Us</span><h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8" style={{color:C.blue}}>{cfg.about.headline}</h2><div className="space-y-5 mb-10">{cfg.about.body.split(/\n\n|\n/).filter(Boolean).map((p,i)=>(<p key={i} className="text-base leading-relaxed" style={{color:C.textMuted}}>{p}</p>))}</div><div className="flex flex-wrap gap-4">{['Licensed & Insured','24/7 Emergency','5-Star Rated'].map((b,i)=>(<span key={i} className="px-4 py-2 rounded-full text-sm font-medium" style={{background:C.tealGlow,color:C.teal}}>{b}</span>))}</div></div>
  </div></div></section>);
}

function Cta({ cfg, siteId }: { cfg: Site['site_config']; siteId: string }) {
  const { ref, v } = useReveal();
  const [form, setForm] = useState({name:'',email:'',phone:'',service:'',message:'',website:''});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault(); if(form.website) return; setSubmitting(true);
    try { const res = await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({site_id:siteId,name:form.name,email:form.email,phone:form.phone,service_interest:form.service,message:form.message,website:form.website,source_page:'contact'})}); if(res.ok) setSubmitted(true); } catch {} finally { setSubmitting(false); }
  }, [form, siteId]);
  const iCls = "w-full px-5 py-4 rounded-xl text-sm transition-all outline-none focus:ring-2";
  const iSty = {background:C.white,border:`1px solid ${C.border}`,color:C.text,'--tw-ring-color':C.teal} as React.CSSProperties;

  return (<section id="contact" className="py-28 md:py-36 relative" style={{background:C.blue}}>
    <div className="absolute top-0 left-0 right-0 -mt-1"><svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="w-full h-16 md:h-24"><path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,100 L0,100 Z" fill={C.blue} /></svg></div>
    <div ref={ref} className={`max-w-4xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${v?'opacity-100 translate-y-0':'opacity-0 translate-y-10'}`}>
      {submitted ? (<div className="text-center py-12"><h2 className="text-4xl font-extrabold text-white mb-4">Thank You!</h2><p className="text-blue-200">We&apos;ll call you back shortly. For emergencies, call <a href={`tel:${cfg.contact.phone.replace(/\D/g,'')}`} className="underline text-white">{cfg.contact.phone}</a></p></div>) : (<>
        <div className="text-center mb-12"><h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">{cfg.contact.headline}</h2>{cfg.contact.subtext && <p className="text-lg text-blue-200">{cfg.contact.subtext}</p>}</div>
        <div className="rounded-2xl p-8 md:p-10 shadow-2xl" style={{background:C.skyBg}}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" name="website" value={form.website} onChange={e=>setForm({...form,website:e.target.value})} style={{position:'absolute',left:'-9999px'}} tabIndex={-1} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{color:C.textMuted}}>Name *</label><input type="text" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={iCls} style={iSty} placeholder="John Smith" /></div>
              <div><label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{color:C.textMuted}}>Phone</label><input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className={iCls} style={iSty} placeholder="(555) 123-4567" /></div>
            </div>
            <div><label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{color:C.textMuted}}>Email</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className={iCls} style={iSty} placeholder="john@example.com" /></div>
            {cfg.services.length > 0 && (<div><label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{color:C.textMuted}}>Service</label><select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className={iCls} style={iSty}><option value="">Select...</option>{cfg.services.map((s,i)=><option key={i} value={s.name}>{s.name}</option>)}</select></div>)}
            <div><label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{color:C.textMuted}}>Message</label><textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className={`${iCls} resize-none`} style={iSty} placeholder="Describe your issue..." /></div>
            <button type="submit" disabled={submitting} className="w-full py-4 rounded-xl text-base font-bold text-white transition-all hover:shadow-lg disabled:opacity-50" style={{background:C.teal}}>{submitting?'Sending...':'Request Service'}</button>
          </form>
        </div>
      </>)}
    </div>
  </section>);
}
