'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Site } from '@/lib/types/site-config';

export function HvacComfortTemplate({ site }: { site: Site }) {
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...Array.from(prev), entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = formData.get('website');

    if (honeypot) return;

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_id: site.id,
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
          source: 'hvac-comfort-template',
        }),
      });
      form.reset();
      alert('Thank you! We\'ll be in touch soon.');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Gradient Top Bar */}
      <div className="h-1 bg-gradient-to-r from-blue-700 via-emerald-600 to-emerald-700" />

      {/* Desktop Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent">
            {site.site_config?.footer?.business_name || 'Comfort Zone'}
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#services" className="text-gray-700 hover:text-blue-700 transition">Services</a>
            <a href="#about" className="text-gray-700 hover:text-blue-700 transition">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-700 transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Sticky Mobile Call Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-30 bg-gradient-to-r from-blue-700 to-emerald-600 p-3">
        <a href="#contact" className="block bg-white text-center py-3 rounded-lg font-semibold text-blue-700 hover:shadow-lg transition">
          Get Your Free Quote
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-emerald-500 to-emerald-700 opacity-90" />

        {/* Gradient Mesh Effect Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600 opacity-20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-6 flex justify-center">
            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {site.site_config?.hero?.headline || 'Your Perfect Climate Awaits'}
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            {site.site_config?.hero?.subheadline || 'Expert HVAC solutions for ultimate comfort and efficiency'}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-700 font-bold py-4 px-10 rounded-lg hover:shadow-xl transition hover:scale-105">
              Schedule Service
            </button>
            <button className="border-2 border-white text-white font-bold py-4 px-10 rounded-lg hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={(el) => { if (el) sectionRefs.current.services = el; }} className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-20 transition-all duration-700 ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-700 to-emerald-600 mx-auto" />
          </div>

          <div className="space-y-8">
            {[
              { num: '01', title: 'AC Installation', desc: 'Professional installation of energy-efficient cooling systems' },
              { num: '02', title: 'Heating Solutions', desc: 'Complete heating system setup and maintenance programs' },
              { num: '03', title: 'Maintenance Plans', desc: 'Regular checkups to keep your system running smoothly' },
            ].map((service, idx) => (
              <div
                key={idx}
                className={`relative transition-all duration-700 ${visibleSections.has('services') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              >
                <div className="absolute -left-12 top-8 text-gray-200 text-9xl font-bold pointer-events-none">
                  {service.num}
                </div>

                <div className={`relative p-8 rounded-xl transition hover:shadow-xl ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-3xl font-bold">{service.num}</span>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={(el) => { if (el) sectionRefs.current.about = el; }} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Gradient Accent */}
            <div className={`transition-all duration-700 ${visibleSections.has('about') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-700 to-emerald-600" />
                <div className="pl-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {site.site_config?.about?.body || 'With over 20 years of industry experience, we deliver comfort solutions tailored to your home\'s unique needs.'}
                  </p>

                  {/* Highlighted Pull Quote */}
                  <div className="my-8 p-6 bg-slate-50 border-l-4 border-gradient-to-b border-emerald-600">
                    <p className="text-lg font-semibold text-gray-900 italic">
                      "Your comfort is our priority. We stand behind every installation with comprehensive warranties."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Stats */}
            <div className={`transition-all duration-700 delay-200 ${visibleSections.has('about') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Happy Customers', value: '5000+' },
                  { label: 'Years Experience', value: '20+' },
                  { label: 'Expert Technicians', value: '50+' },
                  { label: 'Satisfaction Rate', value: '98%' },
                ].map((stat, idx) => (
                  <div key={idx} className={`text-center p-6 rounded-lg ${idx % 2 === 0 ? 'bg-blue-50' : 'bg-emerald-50'}`}>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                    {idx !== 3 && <div className="absolute h-12 w-1 bg-gradient-to-b from-blue-700 to-emerald-600 opacity-20" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={(el) => { if (el) sectionRefs.current.contact = el; }} className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Your Free Consultation</h2>
            <p className="text-gray-600">Fill out the form and our team will contact you within 24 hours</p>
          </div>

          <div className={`bg-white rounded-2xl shadow-2xl p-8 transition-all duration-700 ${visibleSections.has('contact') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
              />

              <textarea
                name="message"
                placeholder="Tell us about your HVAC needs..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition resize-none"
              />

              {/* Honeypot */}
              <input type="hidden" name="website" />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 to-emerald-600 text-white font-bold py-4 rounded-lg hover:shadow-lg transition hover:scale-105"
              >
                Get Free Quote
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="h-1 bg-gradient-to-r from-blue-700 via-emerald-600 to-emerald-700" />

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left: Brand */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                {site.site_config?.footer?.business_name || 'Comfort Zone'}
              </h3>
              <p className="text-gray-400 mb-6">
                Delivering exceptional HVAC solutions since 2004.
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                    <span className="text-sm">{social[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Contact Info */}
            <div className="text-right">
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <div className="text-gray-400 space-y-2">
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@comfortzone.com</p>
                <p>Available 24/7 for emergencies</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {site.site_config?.footer?.business_name || 'Comfort Zone'}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
