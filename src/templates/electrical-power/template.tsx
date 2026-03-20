'use client';

import { Site } from '@/lib/types/site-config';
import { useState, useEffect, useRef } from 'react';

export function ElectricalPowerTemplate({ site }: { site: Site }) {
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-observe]');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LightningIcon = () => (
    <svg
      className="w-24 h-24 md:w-32 md:h-32 text-yellow-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Honeypot check
    if (formData.get('website')) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        body: JSON.stringify({
          site_id: site.id,
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
          source: 'electrical-power-template',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('Thank you! We will contact you soon.');
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="bg-zinc-900 text-white">
      {/* Sticky Mobile Call Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-yellow-400 text-zinc-900 p-4 z-50 font-bold">
        <a href="tel:" className="block text-center">
          📞 Call Now
        </a>
      </div>

      {/* Desktop Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-zinc-950 shadow-lg' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-400 tracking-wider">
            {site.site_config?.footer?.business_name || 'POWER'}
          </div>
          <div className="hidden md:flex gap-8 text-sm font-semibold">
            <a href="#services" className="hover:text-yellow-400 transition">
              SERVICES
            </a>
            <a href="#about" className="hover:text-yellow-400 transition">
              ABOUT
            </a>
            <a href="#contact" className="hover:text-yellow-400 transition">
              CONTACT
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-0 md:pt-40 md:pb-0 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-transparent to-transparent" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-yellow-400 uppercase">
              Power Your
              <br />
              Future
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-lg">
              {site.site_config?.hero?.subheadline || 'Industrial solutions for modern challenges'}
            </p>
            <button className="bg-yellow-400 text-zinc-900 font-bold px-8 py-4 text-lg hover:bg-yellow-300 transition-all hover:shadow-lg hover:shadow-yellow-400/50">
              GET STARTED
            </button>
          </div>

          <div className="flex-1 flex justify-center relative">
            <div className="relative z-10">
              <LightningIcon />
            </div>
            <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 to-transparent rounded-full blur-3xl" />
          </div>
        </div>

        <div
          className="relative h-32 md:h-48 w-full mt-8"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
            backgroundImage: `linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)`,
          }}
        />
      </section>

      {/* Services Section */}
      <section
        id="services"
        data-observe
        className={`bg-zinc-900 py-16 md:py-24 transition-opacity duration-700 ${
          visibleSections.has('services') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16 text-yellow-400 uppercase">
            Our Services
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { num: '01', title: 'Power Systems', desc: 'Advanced electrical grid solutions' },
              { num: '02', title: 'Infrastructure', desc: 'Industrial power infrastructure design' },
              { num: '03', title: 'Maintenance', desc: 'Preventive maintenance programs' },
              { num: '04', title: 'Automation', desc: 'Smart grid automation technology' },
            ].map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-zinc-800 border-l-4 border-yellow-400 p-8 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
              >
                <div className="absolute -top-6 left-8 bg-yellow-400 text-zinc-900 w-12 h-12 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                  {service.num}
                </div>
                <h3 className="text-2xl font-bold mt-4 mb-3 uppercase tracking-wide">{service.title}</h3>
                <p className="text-zinc-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        data-observe
        className={`bg-black py-16 md:py-24 transition-opacity duration-700 ${
          visibleSections.has('about') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16 text-yellow-400 uppercase">
            Why Choose Us
          </h2>

          {/* Timeline Stats */}
          <div className="mb-16 flex flex-col md:flex-row justify-between items-center gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-yellow-400/30" />

            {[
              { stat: '25+', label: 'Years Experience' },
              { stat: '500+', label: 'Projects Delivered' },
              { stat: '98%', label: 'Uptime Guarantee' },
              { stat: '24/7', label: 'Support Team' },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center z-10 bg-black px-6">
                <div className="w-4 h-4 bg-yellow-400 rounded-full absolute -left-2 top-1/2 -translate-y-1/2 md:relative md:left-auto md:top-auto md:-translate-y-0 md:mx-auto md:mb-4" />
                <div className="text-3xl md:text-4xl font-black text-yellow-400">{item.stat}</div>
                <div className="text-zinc-400 text-sm md:text-base mt-2">{item.label}</div>
              </div>
            ))}
          </div>

          {/* About Card with Corner Accents */}
          <div className="relative bg-zinc-900 p-12 border-2 border-zinc-800">
            {/* Yellow corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-yellow-400" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-yellow-400" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-yellow-400" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-yellow-400" />

            <p className="text-lg text-zinc-300 leading-relaxed">
              {site.site_config?.meta?.description ||
                'We deliver industrial-grade electrical solutions with cutting-edge technology and unmatched expertise. Our commitment to excellence drives innovation in power systems worldwide.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        data-observe
        className={`bg-zinc-800 py-16 md:py-24 transition-opacity duration-700 ${
          visibleSections.has('contact') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-yellow-400 uppercase">
            Get In Touch
          </h2>
          <p className="text-zinc-400 mb-12">
            {site.site_config?.hero?.cta_text || 'Ready to power your project? Contact our team today.'}
          </p>

          <form onSubmit={handleContactSubmit} className="space-y-8">
            {/* Honeypot */}
            <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <div>
              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                required
                className="w-full bg-transparent text-white placeholder-zinc-500 border-b-2 border-zinc-700 focus:border-yellow-400 focus:outline-none pb-3 transition-colors font-semibold"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="YOUR EMAIL"
                required
                className="w-full bg-transparent text-white placeholder-zinc-500 border-b-2 border-zinc-700 focus:border-yellow-400 focus:outline-none pb-3 transition-colors font-semibold"
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="YOUR PHONE"
                className="w-full bg-transparent text-white placeholder-zinc-500 border-b-2 border-zinc-700 focus:border-yellow-400 focus:outline-none pb-3 transition-colors font-semibold"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="YOUR MESSAGE"
                rows={4}
                required
                className="w-full bg-transparent text-white placeholder-zinc-500 border-b-2 border-zinc-700 focus:border-yellow-400 focus:outline-none pb-3 transition-colors font-semibold resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-zinc-900 font-black py-4 text-lg uppercase tracking-wider hover:bg-yellow-300 transition-all hover:shadow-lg hover:shadow-yellow-400/50"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t-4 border-yellow-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-yellow-400 font-bold uppercase tracking-wider">
            {site.site_config?.footer?.business_name || 'POWER'}
          </div>
          <div className="text-zinc-500 text-sm text-center md:text-right">
            © 2026. {site.site_config?.footer?.business_name || 'Power Industries'}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile bottom padding for sticky bar */}
      <div className="h-16 md:h-0" />
    </div>
  );
}
