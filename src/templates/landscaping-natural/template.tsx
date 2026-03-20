'use client';

import { Site } from '@/lib/types/site-config';
import { useState, useRef, useEffect } from 'react';

export function LandscapingNaturalTemplate({ site }: { site: Site }) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...Array.from(prev), entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const observeSection = (el: HTMLDivElement | null) => {
    if (el && observerRef.current) {
      observerRef.current.observe(el);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const honeypot = formData.get('website');

    if (honeypot) {
      setFormSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_id: site.id,
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
          source: 'contact-form',
        }),
      });

      if (response.ok) {
        setFormMessage('Thank you! We\'ll be in touch soon.');
        e.currentTarget.reset();
      } else {
        setFormMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setFormMessage('Error submitting form. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const LeafIcon = () => (
    <svg
      className="w-8 h-8 text-lime-400"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M17.92 7.02C17.45 4.18 14.97 2 12 2c-2.97 0-5.45 2.18-5.92 5.02C4.97 7.55 3 9.75 3 12.5c0 3.59 2.91 6.5 6.5 6.5h11c2.49 0 4.5-2.01 4.5-4.5 0-2.34-1.81-4.27-4.08-4.48z" />
    </svg>
  );

  const WaveTop = () => (
    <svg
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      className="w-full h-24"
    >
      <path
        d="M0,30 Q200,60 400,40 T800,35 T1200,50 L1200,100 L0,100 Z"
        fill="currentColor"
      />
    </svg>
  );

  const WaveBottom = () => (
    <svg
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      className="w-full h-20"
    >
      <path
        d="M0,70 Q200,40 400,60 T800,65 T1200,50 L1200,0 L0,0 Z"
        fill="currentColor"
      />
    </svg>
  );

  const DecorativeLeaf = () => (
    <svg
      className="absolute opacity-8 w-96 h-96 text-green-100"
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <path d="M50,10 Q90,40 90,70 Q90,85 50,95 Q10,85 10,70 Q10,40 50,10 M50,20 Q80,45 80,70 Q80,82 50,90 Q20,82 20,70 Q20,45 50,20 M50,30 L50,80" />
    </svg>
  );

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* Mobile Call Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-emerald-700 text-white p-3 shadow-lg">
        <a
          href={`tel:${site.site_config?.contact?.phone || ''}`}
          className="flex items-center justify-center gap-2 font-semibold"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.707 12.293a.999.999 0 1 0-1.414-1.414L12 15.586l-4.293-4.293a.999.999 0 1 0-1.414 1.414l4.293 4.293-4.293 4.293a.999.999 0 1 0 1.414 1.414L12 18.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L13.414 17l4.293-4.707z" />
          </svg>
          Call Now
        </a>
      </div>

      {/* Header */}
      <header className="hidden md:block sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-green-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-emerald-900">
            {site.site_config?.footer?.business_name || 'Landscaping'}
          </h1>
          <nav className="flex gap-8 text-sm font-medium">
            <a href="#services" className="text-emerald-700 hover:text-lime-500">
              Services
            </a>
            <a href="#about" className="text-emerald-700 hover:text-lime-500">
              About
            </a>
            <a href="#contact" className="text-emerald-700 hover:text-lime-500">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${site.site_config?.hero?.background_image || '/placeholder.jpg'}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-900/80" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6 animate-bounce">
            <LeafIcon />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {site.site_config?.hero?.headline || 'Transform Your Outdoor Space'}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8">
            {site.site_config?.hero?.subheadline ||
              'Expert landscaping services for beautiful, sustainable gardens'}
          </p>
          <button className="px-8 py-3 bg-lime-400 text-emerald-900 font-bold rounded-full hover:bg-lime-300 transition">
            Get Started
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-emerald-700">
          <WaveBottom />
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={observeSection}
        className="py-20 bg-yellow-50"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-emerald-900 mb-16 text-center">
            Our Services
          </h2>

          <div className="relative h-96 md:h-full">
            <div
              className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 ${
                visibleSections.has('services') ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {site.site_config?.services?.slice(0, 3).map((service, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:bg-emerald-50 transition-all cursor-pointer transform ${
                    i % 2 === 1 ? 'md:translate-y-12' : ''
                  }`}
                >
                  <div className="h-48 bg-gradient-to-br from-green-200 to-emerald-300 relative overflow-hidden rounded-2xl m-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <LeafIcon />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-emerald-900 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={observeSection}
        className="relative py-20 bg-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <DecorativeLeaf />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-emerald-900 mb-16 text-center">
            About Us
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div
              className={`transition-all duration-1000 ${
                visibleSections.has('about')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-green-300 to-emerald-500 mx-auto shadow-2xl" />
            </div>

            <div
              className={`transition-all duration-1000 ${
                visibleSections.has('about')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {site.site_config?.about?.body ||
                  'With over 15 years of experience, we transform outdoor spaces into beautiful, sustainable landscapes that enhance your property and quality of life.'}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 bg-emerald-700 text-white rounded-full font-semibold">
                  500+ Projects
                </div>
                <div className="px-6 py-3 bg-emerald-700 text-white rounded-full font-semibold">
                  12+ Years
                </div>
                <div className="px-6 py-3 bg-emerald-700 text-white rounded-full font-semibold">
                  99% Rated
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={observeSection}
        className="relative py-20 bg-emerald-900 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <svg
            className="absolute top-10 left-10 w-48 h-48 text-emerald-400"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <circle cx="30" cy="30" r="20" opacity="0.3" />
            <circle cx="70" cy="60" r="25" opacity="0.2" />
          </svg>
          <svg
            className="absolute bottom-20 right-10 w-64 h-64 text-emerald-400"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50,10 Q90,40 90,70 Q90,85 50,95 Q10,85 10,70 Q10,40 50,10" opacity="0.2" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            {site.site_config?.contact?.headline || 'Get Your Free Consultation'}
          </h2>
          <p className="text-emerald-100 text-center mb-12">
            {site.site_config?.contact?.subtext || 'Let\'s discuss how we can transform your outdoor space.'}
          </p>

          <form
            onSubmit={handleContactSubmit}
            className="bg-white rounded-3xl p-10 shadow-2xl"
          >
            {formMessage && (
              <div className="mb-6 p-4 bg-emerald-100 text-emerald-900 rounded-lg text-center">
                {formMessage}
              </div>
            )}

            <input type="hidden" name="website" />

            <div className="mb-6">
              <label className="block text-sm font-semibold text-emerald-900 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 border-2 border-green-100 rounded-xl focus:outline-none focus:border-emerald-700"
                placeholder="Your name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-emerald-900 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border-2 border-green-100 rounded-xl focus:outline-none focus:border-emerald-700"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-emerald-900 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-3 border-2 border-green-100 rounded-xl focus:outline-none focus:border-emerald-700"
                placeholder="(555) 000-0000"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-emerald-900 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                className="w-full px-4 py-3 border-2 border-green-100 rounded-xl focus:outline-none focus:border-emerald-700"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={formSubmitting}
              className="w-full px-8 py-4 bg-emerald-700 text-white font-bold rounded-full hover:bg-emerald-800 transition disabled:opacity-50"
            >
              {formSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </div>

        <div className="absolute top-0 left-0 right-0 text-emerald-900">
          <WaveTop />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white py-16 relative">
        <div className="absolute top-0 left-0 right-0 text-emerald-950 -mt-1">
          <svg
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="w-full h-16"
          >
            <path
              d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-8 grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">
              {site.site_config?.footer?.business_name || 'Landscaping'}
            </h3>
            <p className="text-emerald-100 text-sm">
              Transforming outdoor spaces with sustainable landscaping solutions.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li>
                <a href="#services" className="hover:text-lime-400">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-lime-400">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-lime-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-sm text-emerald-100 mb-2">
              {site.site_config?.contact?.phone || '(555) 000-0000'}
            </p>
            <p className="text-sm text-emerald-100">
              {site.site_config?.contact?.email || 'hello@landscaping.com'}
            </p>
          </div>
        </div>

        <div className="border-t border-emerald-800 pt-8 text-center text-sm text-emerald-100">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            {site.site_config?.footer?.business_name || 'Landscaping'}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
