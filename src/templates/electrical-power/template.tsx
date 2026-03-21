'use client';

import { Site } from '@/lib/types/site-config';
import { useState, useEffect, useRef, useCallback } from 'react';
import { LogoBrand } from '../shared/logo-brand';

/* ═══════════════════════════════════════════════════════════
   ELECTRICAL POWER — "Power Dark" Layout A variant
   Near-black zinc with electric yellow, angular design,
   bold industrial feel, dark glassmorphism
   ═══════════════════════════════════════════════════════════ */

const C = {
  bg: '#09090B', zinc: '#18181B', zinc800: '#27272A', zinc700: '#3F3F46',
  yellow: '#EAB308', yellowGlow: 'rgba(234,179,8,0.15)', yellowDim: 'rgba(234,179,8,0.08)',
  white: '#FAFAFA', gray: '#A1A1AA', grayDark: '#71717A',
  border: 'rgba(255,255,255,0.06)',
};

function useReveal(t=0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [v,setV] = useState(false);
  useEffect(()=>{const el=ref.current;if(!el) return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect();}},{threshold:t});o.observe(el);return()=>o.disconnect();},[t]);
  return {ref, v, anim: { opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' } as React.CSSProperties };
}

export function ElectricalPowerTemplate({ site }: { site: Site }) {
  const cfg = site.site_config;
  const [scrollY,setScrollY] = useState(0);
  useEffect(()=>{const h=()=>setScrollY(window.scrollY);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h);},[]);
  const navSolid = scrollY > 60;

  return (
    <div className="min-h-screen" style={{ background: C.bg, fontFamily: "'Inter', system-ui, sans-serif", color: C.white }}>
      {/* Yellow top accent */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60]" style={{ background: C.yellow }} />

      <nav className="fixed top-1 left-0 right-0 z-50 transition-all duration-500" style={{ background: navSolid ? `${C.bg}ee` : 'transparent', backdropFilter: navSolid ? 'blur(16px)' : 'none', borderBottom: navSolid ? `1px solid ${C.border}` : '1px solid transparent' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <LogoBrand logoUrl={cfg.logo_url} businessName={cfg.footer.business_name} color={C.yellow} className="uppercase font-black" />
          <div className="hidden md:flex items-center gap-8">
            {['Services','About','Contact'].map(s=>(<a key={s} href={`#${s.toLowerCase()}`} className="text-sm font-medium transition-colors" style={{ color: C.gray }}>{s}</a>))}
            <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g,'')}`} className="px-5 py-2.5 text-sm font-bold transition-all hover:scale-105" style={{ background: C.yellow, color: C.bg }}>{cfg.hero.cta_phone}</a>
          </div>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: C.yellow }}>
        <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g,'')}`} className="flex items-center justify-center gap-2 py-4 font-black" style={{ color: C.bg }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          CALL NOW — {cfg.hero.cta_phone}
        </a>
      </div>

      {/* HERO — Dark angular */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={cfg.hero.background_image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.bg}ee, ${C.zinc}dd)` }} />
        </div>
        {/* Lightning bolt decorative */}
        <div className="absolute top-1/4 right-10 opacity-5">
          <svg className="w-64 h-64" fill={C.yellow} viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/></svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-[0.2em] uppercase" style={{ background: C.yellowDim, color: C.yellow, border: `1px solid ${C.yellowGlow}` }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/></svg>
              {site.business_city}{site.business_state ? `, ${site.business_state}` : ''}
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] mb-8 uppercase">{cfg.hero.headline}</h1>
            <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl" style={{ color: C.gray }}>{cfg.hero.subheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${cfg.hero.cta_phone.replace(/\D/g,'')}`} className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-black uppercase tracking-wider transition-all hover:scale-105" style={{ background: C.yellow, color: C.bg }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {cfg.hero.cta_text}
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold uppercase tracking-wider transition-all hover:bg-white/5" style={{ border: `1px solid ${C.border}`, color: C.white }}>Get Estimate</a>
            </div>
          </div>
        </div>
        {/* Angular bottom cut */}
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12"><path d="M0,60 L1440,20 L1440,60 Z" fill={C.bg}/></svg></div>
      </section>

      {/* STATS */}
      <ElecStats stats={cfg.about.stats} />

      {/* SERVICES — Grid with yellow left borders */}
      <section id="services" className="py-28 md:py-36" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block" style={{ color: C.yellow }}>Services</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">What We Do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cfg.services.map((svc,i)=>(<ElecCard key={i} svc={svc} i={i} />))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <ElecAbout cfg={cfg} />

      {/* CONTACT */}
      <ElecContact cfg={cfg} siteId={site.id} />

      {/* FOOTER */}
      <footer><div className="h-1" style={{ background: C.yellow }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16" style={{ background: C.bg }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div><h3 className="text-xl font-black uppercase mb-3" style={{ color: C.yellow }}>{cfg.footer.business_name}</h3><p className="text-sm" style={{ color: C.grayDark }}>{cfg.footer.tagline}</p></div>
            <div><h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.grayDark }}>Links</h4><div className="space-y-3">{['Services','About','Contact'].map(l=>(<a key={l} href={`#${l.toLowerCase()}`} className="block text-sm hover:text-white transition-colors" style={{ color: C.grayDark }}>{l}</a>))}</div></div>
            <div><h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.grayDark }}>Contact</h4><div className="space-y-3 text-sm" style={{ color: C.grayDark }}><a href={`tel:${cfg.contact.phone.replace(/\D/g,'')}`} className="block hover:text-white">{cfg.contact.phone}</a><a href={`mailto:${cfg.contact.email}`} className="block hover:text-white">{cfg.contact.email}</a></div></div>
          </div>
          <div className="pt-8 text-center" style={{ borderTop: `1px solid ${C.border}` }}><p className="text-xs" style={{ color: C.zinc700 }}>&copy; {new Date().getFullYear()} {cfg.footer.business_name}</p></div>
        </div>
      </footer>
      <div className="h-16 md:hidden" />
    </div>
  );
}

function ElecStats({ stats }: { stats: {value:string;label:string}[] }) {
  const { ref, v, anim } = useReveal(0.3);
  return (<div ref={ref} className={`py-16 transition-all duration-700 `} style={{...anim,  background: C.zinc }}>
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.slice(0,4).map((s,i)=>(<div key={i} className="text-center"><div className="text-3xl md:text-4xl font-black mb-2" style={{ color: C.yellow }}>{s.value}</div><div className="text-xs font-medium uppercase tracking-widest" style={{ color: C.grayDark }}>{s.label}</div></div>))}
    </div>
  </div>);
}

function ElecCard({ svc, i }: { svc: {name:string;description:string;image?:string}; i: number }) {
  const { ref, v, anim } = useReveal(0.08);
  return (<div ref={ref} className={`rounded-xl overflow-hidden transition-all duration-700 hover:shadow-lg `} style={{...anim,  background: C.zinc, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.yellow}`, transitionDelay: `${i*80}ms` }}>
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/3"><img src={svc.image || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80'} alt={svc.name} className="w-full h-40 sm:h-full object-cover" /></div>
      <div className="flex-1 p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-black" style={{ color: C.yellow }}>{String(i+1).padStart(2,'0')}</span>
          <h3 className="text-lg font-bold">{svc.name}</h3>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: C.gray }}>{svc.description}</p>
        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all hover:gap-3" style={{ color: C.yellow }}>Get Quote <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></a>
      </div>
    </div>
  </div>);
}

function ElecAbout({ cfg }: { cfg: Site['site_config'] }) {
  const { ref, v, anim } = useReveal();
  return (<section id="about" className="py-28 md:py-36" style={{ background: C.zinc }}>
    <div ref={ref} style={anim} className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-1000 `}>
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="w-full lg:w-5/12"><div className="overflow-hidden"><img src={cfg.about.image} alt="About" className="w-full aspect-[3/4] object-cover" /></div></div>
        <div className="w-full lg:w-7/12">
          <span className="text-xs font-black tracking-[0.2em] uppercase mb-6 block" style={{ color: C.yellow }}>About Us</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8 uppercase">{cfg.about.headline}</h2>
          <div className="space-y-5 mb-10">{cfg.about.body.split(/\n\n|\n/).filter(Boolean).map((p,i)=>(<p key={i} className="text-base leading-relaxed" style={{ color: C.gray }}>{p}</p>))}</div>
          <div className="flex flex-wrap gap-4">
            {['Licensed Electrician','Code Compliant','Safety First'].map((b,i)=>(
              <span key={i} className="px-4 py-2 text-sm font-bold uppercase tracking-wider" style={{ background: C.yellowDim, color: C.yellow, border: `1px solid ${C.yellowGlow}` }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>);
}

function ElecContact({ cfg, siteId }: { cfg: Site['site_config']; siteId: string }) {
  const { ref, v, anim } = useReveal();
  const [form,setForm]=useState({name:'',email:'',phone:'',service:'',message:'',website:''});
  const [submitted,setSubmitted]=useState(false);
  const [submitting,setSubmitting]=useState(false);
  const handleSubmit=useCallback(async(e: React.FormEvent)=>{
    e.preventDefault();if(form.website) return;setSubmitting(true);
    try{const res=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({site_id:siteId,name:form.name,email:form.email,phone:form.phone,service_interest:form.service,message:form.message,website:form.website,source_page:'contact'})});if(res.ok) setSubmitted(true);}catch{}finally{setSubmitting(false);}
  },[form,siteId]);
  const iCls="w-full px-5 py-4 text-sm transition-all outline-none";
  const iSty={background:C.zinc800,border:`1px solid ${C.border}`,color:C.white} as React.CSSProperties;

  return (<section id="contact" className="py-28 md:py-36" style={{ background: C.bg }}>
    <div ref={ref} style={anim} className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-1000 `}>
      {submitted ? (
        <div className="text-center py-12"><h2 className="text-4xl font-black uppercase mb-4" style={{ color: C.yellow }}>Thank You</h2><p style={{ color: C.gray }}>We&apos;ll be in touch. Call <a href={`tel:${cfg.contact.phone.replace(/\D/g,'')}`} className="underline" style={{ color: C.yellow }}>{cfg.contact.phone}</a> for immediate help.</p></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <span className="text-xs font-black tracking-[0.2em] uppercase mb-6 block" style={{ color: C.yellow }}>Contact</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 uppercase">{cfg.contact.headline}</h2>
            {cfg.contact.subtext && <p className="text-lg mb-12" style={{ color: C.gray }}>{cfg.contact.subtext}</p>}
            <div className="space-y-6">
              <a href={`tel:${cfg.contact.phone.replace(/\D/g,'')}`} className="flex items-center gap-5 group">
                <div className="w-14 h-14 flex items-center justify-center" style={{ background: C.yellowDim, border: `1px solid ${C.yellowGlow}` }}><svg className="w-6 h-6" style={{ color: C.yellow }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                <div><p className="text-xs uppercase tracking-wider" style={{ color: C.grayDark }}>Phone</p><p className="text-lg font-bold group-hover:underline">{cfg.contact.phone}</p></div>
              </a>
              <a href={`mailto:${cfg.contact.email}`} className="flex items-center gap-5 group">
                <div className="w-14 h-14 flex items-center justify-center" style={{ background: C.yellowDim, border: `1px solid ${C.yellowGlow}` }}><svg className="w-6 h-6" style={{ color: C.yellow }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                <div><p className="text-xs uppercase tracking-wider" style={{ color: C.grayDark }}>Email</p><p className="text-lg font-bold group-hover:underline">{cfg.contact.email}</p></div>
              </a>
            </div>
          </div>
          <div className="rounded-xl p-8 md:p-10" style={{ background: C.zinc, border: `1px solid ${C.border}` }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" name="website" value={form.website} onChange={e=>setForm({...form,website:e.target.value})} style={{position:'absolute',left:'-9999px'}} tabIndex={-1} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div><label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{color:C.grayDark}}>Name *</label><input type="text" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={iCls} style={iSty} placeholder="John Smith" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{color:C.grayDark}}>Phone</label><input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className={iCls} style={iSty} placeholder="(555) 123-4567" /></div>
              </div>
              <div><label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{color:C.grayDark}}>Email</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className={iCls} style={iSty} placeholder="john@example.com" /></div>
              {cfg.services.length>0&&(<div><label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{color:C.grayDark}}>Service</label><select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className={iCls} style={iSty}><option value="">Select...</option>{cfg.services.map((s,i)=><option key={i} value={s.name}>{s.name}</option>)}</select></div>)}
              <div><label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{color:C.grayDark}}>Message</label><textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className={`${iCls} resize-none`} style={iSty} placeholder="Describe your project..." /></div>
              <button type="submit" disabled={submitting} className="w-full py-4 text-base font-black uppercase tracking-wider transition-all hover:scale-[1.02] disabled:opacity-50" style={{background:C.yellow,color:C.bg}}>{submitting?'Sending...':'Request Service'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  </section>);
}
