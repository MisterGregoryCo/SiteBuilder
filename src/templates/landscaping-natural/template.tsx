'use client';

import { Site } from '@/lib/types/site-config';
import { useState, useEffect, useRef, useCallback } from 'react';
import { LogoBrand } from '../shared/logo-brand';

/* ═══════════════════════════════════════════════════════════
   LANDSCAPING NATURAL — "Natural Organic" Layout C variant
   Forest green + lime, warm cream backgrounds,
   curved organic dividers, serif headings, nature-inspired
   ═══════════════════════════════════════════════════════════ */

const C = {
  green: '#166534', greenDark: '#14532D', lime: '#84CC16', limeGlow: 'rgba(132,204,22,0.12)',
  cream: '#FEFCE8', white: '#FFFFFF', warmWhite: '#FAFAF5',
  text: '#1C1917', textMuted: '#78716C', border: '#E7E5E4',
};

function useReveal(t=0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [v,setV] = useState(false);
  useEffect(()=>{const el=ref.current;if(!el) return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect();}},{threshold:t});o.observe(el);return()=>o.disconnect();},[t]);
  return {ref, v, anim: { opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' } as React.CSSProperties };
}

export function LandscapingNaturalTemplate({ site }: { site: Site }) {
  const cfg = site.site_config;
  const [scrollY,setScrollY] = useState(0);
  useEffect(()=>{const h=()=>setScrollY(window.scrollY);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h);},[]);
  const navSolid = scrollY > 60;

  return (
    <div className="min-h-screen" style={{ background: C.cream, fontFamily: "'Inter', system-ui, sans-serif", color: C.text }}>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: navSolid ? 'rgba(254,252,232,0.95)' : 'transparent', backdropFilter: navSolid ? 'blur(16px)' : 'none', borderBottom: navSolid ? `1px solid ${C.border}` : '1px solid transparent' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <LogoBrand logoUrl={cfg.logo_url} businessName={cfg.footer.business_name} color={navSolid ? C.green : C.white} fontFamily="Georgia, serif" />
          <div className="hidden md:flex items-center gap-8">
            {['Services','About','Contact'].map(s=>(<a key={s} href={`#${s.toLowerCase()}`} className="text-sm font-medium transition-colors" style={{ color: navSolid ? C.textMuted : 'rgba(255,255,255,0.8)' }}>{s}</a>))}
            <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g,'')}`} className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105" style={{ background: C.green }}>{cfg.hero.cta_phone}</a>
          </div>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: C.green }}>
        <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g,'')}`} className="flex items-center justify-center gap-2 py-4 font-bold text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Call Now — {cfg.hero.cta_phone}
        </a>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={cfg.hero.background_image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(22,101,52,0.9) 0%, rgba(22,101,52,0.3) 50%, rgba(0,0,0,0.1) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-24 md:pb-32 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase mb-8 text-white" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <svg className="w-4 h-4" style={{ color: C.lime }} fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.72 17.12 9.89 12 17 10V8z"/><path d="M20.59 2.59C18.99 4.19 15 5 12.5 5 10 5 7 4.19 5.41 2.59L4 4c1.56 1.56 3.94 2.88 6.5 3.32V10c0 4.42 3.58 8 8 8h2v-2h-2c-3.31 0-6-2.69-6-6V7.32C15.06 6.88 17.44 5.56 19 4l1.59-1.41z"/></svg>
              {site.business_city}{site.business_state ? `, ${site.business_state}` : ''}
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[0.95] mb-8" style={{ fontFamily: 'Georgia, serif' }}>{cfg.hero.headline}</h1>
            <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl" style={{ color: 'rgba(255,255,255,0.85)' }}>{cfg.hero.subheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g,'')}`} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold transition-all hover:scale-105 shadow-lg" style={{ background: C.lime, color: C.greenDark }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {cfg.hero.cta_text}
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white transition-all hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.3)' }}>Get a Quote</a>
            </div>
          </div>
        </div>
        {/* Organic curve */}
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-20"><path d="M0,80 C180,30 360,60 540,40 C720,20 900,50 1080,35 C1260,20 1380,50 1440,30 L1440,80 Z" fill={C.cream}/></svg></div>
      </section>

      {/* STATS */}
      <LandStats stats={cfg.about.stats} />

      {/* SERVICES — Cards with rounded images */}
      <section id="services" className="py-28 md:py-36" style={{ background: C.warmWhite }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block" style={{ color: C.lime }}>Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif', color: C.green }}>What We Offer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cfg.services.map((svc,i)=>(<LandCard key={i} svc={svc} i={i} />))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <LandAbout cfg={cfg} />

      {/* CONTACT */}
      <LandContact cfg={cfg} siteId={site.id} />

      {/* FOOTER */}
      <footer style={{ background: C.greenDark }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div><h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>{cfg.footer.business_name}</h3><p className="text-sm text-green-200/60">{cfg.footer.tagline}</p></div>
            <div><h4 className="text-xs font-semibold uppercase tracking-widest text-green-200/40 mb-4">Links</h4><div className="space-y-3">{['Services','About','Contact'].map(l=>(<a key={l} href={`#${l.toLowerCase()}`} className="block text-sm text-green-200/60 hover:text-white transition-colors">{l}</a>))}</div></div>
            <div><h4 className="text-xs font-semibold uppercase tracking-widest text-green-200/40 mb-4">Contact</h4><div className="space-y-3 text-sm text-green-200/60"><a href={`tel:${cfg.contact.phone.replace(/\D/g,'')}`} className="block hover:text-white">{cfg.contact.phone}</a><a href={`mailto:${cfg.contact.email}`} className="block hover:text-white">{cfg.contact.email}</a></div></div>
          </div>
          <div className="pt-8 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}><p className="text-xs text-green-200/30">&copy; {new Date().getFullYear()} {cfg.footer.business_name}</p></div>
        </div>
      </footer>
      <div className="h-16 md:hidden" />
    </div>
  );
}

function LandStats({ stats }: { stats: {value:string;label:string}[] }) {
  const { ref, v, anim } = useReveal(0.3);
  return (<div ref={ref} style={anim} className={`max-w-5xl mx-auto px-6 -mt-10 relative z-20 transition-all duration-700 `}>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.slice(0,4).map((s,i)=>(<div key={i} className="text-center py-8 px-4 rounded-2xl shadow-md" style={{ background: C.white }}>
        <div className="text-3xl font-bold mb-1" style={{ color: C.green, fontFamily: 'Georgia, serif' }}>{s.value}</div>
        <div className="text-xs font-medium uppercase tracking-wider" style={{ color: C.textMuted }}>{s.label}</div>
      </div>))}
    </div>
  </div>);
}

function LandCard({ svc, i }: { svc: {name:string;description:string;image?:string}; i: number }) {
  const { ref, v, anim } = useReveal(0.08);
  return (<div ref={ref} className={`group rounded-2xl overflow-hidden shadow-md transition-all duration-700 hover:shadow-xl hover:-translate-y-1 `} style={{...anim,  background: C.white, transitionDelay: `${i*80}ms` }}>
    <div className="relative h-52 overflow-hidden">
      <img src={svc.image || 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80'} alt={svc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="p-6">
      <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Georgia, serif', color: C.green }}>{svc.name}</h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: C.textMuted }}>{svc.description}</p>
      <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3" style={{ color: C.lime }}>
        Learn More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
  </div>);
}

function LandAbout({ cfg }: { cfg: Site['site_config'] }) {
  const { ref, v, anim } = useReveal();
  return (<section id="about" className="py-28 md:py-36" style={{ background: C.cream }}>
    <div ref={ref} style={anim} className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-1000 `}>
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="w-full lg:w-5/12"><div className="rounded-2xl overflow-hidden shadow-xl"><img src={cfg.about.image} alt="About" className="w-full aspect-[3/4] object-cover" /></div></div>
        <div className="w-full lg:w-7/12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase mb-6 block" style={{ color: C.lime }}>About Us</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif', color: C.green }}>{cfg.about.headline}</h2>
          <div className="space-y-5 mb-10">{cfg.about.body.split(/\n\n|\n/).filter(Boolean).map((p,i)=>(<p key={i} className="text-base leading-relaxed" style={{ color: C.textMuted }}>{p}</p>))}</div>
          <div className="flex flex-wrap gap-4">
            {['Licensed & Insured','Eco-Friendly','5-Star Reviews'].map((b,i)=>(
              <span key={i} className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: C.limeGlow, color: C.green }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>);
}

function LandContact({ cfg, siteId }: { cfg: Site['site_config']; siteId: string }) {
  const { ref, v, anim } = useReveal();
  const [form,setForm]=useState({name:'',email:'',phone:'',service:'',message:'',website:''});
  const [submitted,setSubmitted]=useState(false);
  const [submitting,setSubmitting]=useState(false);
  const handleSubmit=useCallback(async(e: React.FormEvent)=>{
    e.preventDefault();if(form.website) return;setSubmitting(true);
    try{const res=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({site_id:siteId,name:form.name,email:form.email,phone:form.phone,service_interest:form.service,message:form.message,website:form.website,source_page:'contact'})});if(res.ok) setSubmitted(true);}catch{}finally{setSubmitting(false);}
  },[form,siteId]);
  const iCls="w-full px-5 py-4 rounded-xl text-sm transition-all outline-none focus:ring-2";
  const iSty={background:C.white,border:`1px solid ${C.border}`,color:C.text,'--tw-ring-color':C.green} as React.CSSProperties;

  return (<section id="contact" className="py-28 md:py-36 relative" style={{ background: C.green }}>
    {/* Organic top curve */}
    <div className="absolute top-0 left-0 right-0 -mt-1"><svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16"><path d="M0,0 C360,50 720,10 1080,40 C1260,55 1380,20 1440,35 L1440,60 L0,60 Z" fill={C.green}/></svg></div>
    <div ref={ref} style={anim} className={`max-w-4xl mx-auto px-6 lg:px-8 transition-all duration-1000 `}>
      {submitted ? (
        <div className="text-center py-12"><h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Thank You!</h2><p className="text-green-100">We&apos;ll be in touch shortly. Call <a href={`tel:${cfg.contact.phone.replace(/\D/g,'')}`} className="underline text-white">{cfg.contact.phone}</a> for immediate help.</p></div>
      ) : (<>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'Georgia, serif' }}>{cfg.contact.headline}</h2>
          {cfg.contact.subtext && <p className="text-lg text-green-100/80">{cfg.contact.subtext}</p>}
        </div>
        <div className="rounded-2xl p-8 md:p-10 shadow-2xl" style={{ background: C.cream }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" name="website" value={form.website} onChange={e=>setForm({...form,website:e.target.value})} style={{position:'absolute',left:'-9999px'}} tabIndex={-1} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{color:C.textMuted}}>Name *</label><input type="text" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={iCls} style={iSty} placeholder="John Smith" /></div>
              <div><label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{color:C.textMuted}}>Phone</label><input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className={iCls} style={iSty} placeholder="(555) 123-4567" /></div>
            </div>
            <div><label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{color:C.textMuted}}>Email</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className={iCls} style={iSty} placeholder="john@example.com" /></div>
            {cfg.services.length>0&&(<div><label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{color:C.textMuted}}>Service</label><select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className={iCls} style={iSty}><option value="">Select...</option>{cfg.services.map((s,i)=><option key={i} value={s.name}>{s.name}</option>)}</select></div>)}
            <div><label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{color:C.textMuted}}>Message</label><textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className={`${iCls} resize-none`} style={iSty} placeholder="Tell us about your vision..." /></div>
            <button type="submit" disabled={submitting} className="w-full py-4 rounded-xl text-base font-bold text-white transition-all hover:shadow-lg disabled:opacity-50" style={{background:C.green}}>{submitting?'Sending...':'Get Your Free Estimate'}</button>
          </form>
        </div>
      </>)}
    </div>
  </section>);
}
