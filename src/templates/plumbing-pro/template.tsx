'use client';

import { useRef, useEffect, useState } from 'react';
import { Site } from '@/lib/types/site-config';

interface PlumbingServiceItem {
  name: string;
  description: string;
  image?: string;
}

interface StatsItem {
  label: string;
  value: string;
}

export function PlumbingProTemplate({ site }: { site: Site }) {
  const [visible, setVisible] = useState<{ [key: string]: boolean }>({});
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: { [key: string]: IntersectionObserver } = {};

    const createObserver = (id: string) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible((prev) => ({ ...prev, [id]: true }));
            }
          });
        },
        { threshold: 0.1 }
      );
    };

    ['services', 'about', 'contact', 'footer'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observers[id] = createObserver(id);
        observers[id].observe(element);
      }
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (formData.get('website')) return;

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
          source: site.business_name,
        }),
      });
      e.currentTarget.reset();
      alert('Thank you for contacting us!');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const services: PlumbingServiceItem[] = site.site_config?.services || [
    {
      name: 'Emergency Repairs',
      description: 'Available 24/7 for urgent plumbing issues',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop',
    },
    {
      name: 'Pipe Installation',
      description: 'Expert installation of pipes and fixtures',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop',
    },
    {
      name: 'Drain Cleaning',
      description: 'Professional drain clearing and maintenance',
      image: 'https://images.unsplash.com/photo-1578898657397-9b26ac435db5?w=500&h=400&fit=crop',
    },
  ];

  const stats: StatsItem[] = site.site_config?.about?.stats || [
    { label: 'Years Experience', value: '20+' },
    { label: 'Happy Clients', value: '5000+' },
    { label: 'Projects Completed', value: '10k+' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Call Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-teal-600 text-white p-4 z-40 shadow-lg">
        <a href={`tel:${site.site_config?.contact?.phone}`} className="block text-center font-semibold">
          Call Now: {site.site_config?.contact?.phone || '(555) 123-4567'}
        </a>
      </div>

      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">{site.business_name}</h1>
          <nav className="flex gap-8">
            <a href="#services" className="text-slate-600 hover:text-blue-700">Services</a>
            <a href="#about" className="text-slate-600 hover:text-blue-700">About</a>
            <a href="#contact" className="text-slate-600 hover:text-blue-700">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&h=800&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-blue-900/60" />

        <div className="relative z-10 text-center text-white px-4">
          <div className="mb-6 text-6xl">💧</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {site.site_config?.hero?.headline || 'Expert Plumbing Solutions'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            {site.site_config?.hero?.subheadline || 'Professional service you can trust, 24/7'}
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition">
            Get a Free Quote
          </button>
        </div>

        {/* Wave Divider SVG */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ fill: 'white' }}
        >
          <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" />
        </svg>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-900">Our Services</h2>

          <div className="space-y-12">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center transition-all duration-700 ${
                  visible.services
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="md:w-1/2">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-1/2 relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">{service.name}</h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <button className="text-teal-600 font-semibold hover:text-teal-700">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-sky-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-900">About Us</h2>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full opacity-50 blur-xl" />
              <img
                src={site.site_config?.about?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop'}
                alt="About"
                className="relative w-80 h-80 rounded-full object-cover shadow-xl mx-auto"
              />
            </div>

            <div className={`md:w-1/2 transition-all duration-700 ${
              visible.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                {site.site_config?.about?.headline || 'Your Trusted Plumbing Partner'}
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {site.site_config?.about?.body || 'With over 20 years of industry experience, we pride ourselves on delivering exceptional plumbing solutions with integrity and professionalism.'}
              </p>

              <div className="flex flex-wrap gap-4">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white px-4 py-2 rounded-full shadow-md border-l-4 border-teal-600"
                  >
                    <p className="text-teal-600 font-bold text-lg">{stat.value}</p>
                    <p className="text-slate-600 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-blue-900">
        <div ref={contactRef} className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Get a Free Quote</h2>
          <p className="text-center text-blue-100 mb-12">
            Fill out the form below and we'll contact you within 2 hours.
          </p>

          <form
            onSubmit={handleContactSubmit}
            className={`space-y-4 transition-all duration-700 ${
              visible.contact ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <textarea
              name="message"
              placeholder="Describe your plumbing issue"
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition duration-200"
            >
              Send Request
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Business Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">{site.business_name}</h4>
            <p className="text-slate-400 mb-2">{site.site_config?.about?.body?.slice(0, 80)}...</p>
            <p className="text-slate-400 flex items-center gap-2">
              📍 {site.business_city}{site.business_state ? `, ${site.business_state}` : ''}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#services" className="hover:text-teal-400">Services</a></li>
              <li><a href="#about" className="hover:text-teal-400">About</a></li>
              <li><a href="#contact" className="hover:text-teal-400">Contact</a></li>
              <li><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <p className="text-slate-400 mb-2">
              📞 <a href={`tel:${site.site_config?.contact?.phone}`} className="hover:text-teal-400">
                {site.site_config?.contact?.phone || '(555) 123-4567'}
              </a>
            </p>
            <p className="text-slate-400">
              ✉️ <a href={`mailto:${site.site_config?.contact?.email}`} className="hover:text-teal-400">
                {site.site_config?.contact?.email || 'info@example.com'}
              </a>
            </p>
            <p className="text-slate-400 mt-4 text-sm">
              Available 24/7 for emergencies
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 {site.business_name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
