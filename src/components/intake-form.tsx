'use client';

import { useState } from 'react';
import { INDUSTRIES, INDUSTRY_SERVICES, US_STATES, IntakeFormData } from '@/lib/types/site-config';

interface IntakeFormProps {
  onSubmit: (data: IntakeFormData) => void;
  isLoading: boolean;
}

export function IntakeForm({ onSubmit, isLoading }: IntakeFormProps) {
  const [formData, setFormData] = useState<IntakeFormData>({
    business_name: '',
    business_phone: '',
    business_email: '',
    business_city: '',
    business_state: '',
    industry: 'generic',
    services: [],
  });

  const [customService, setCustomService] = useState('');

  const availableServices = INDUSTRY_SERVICES[formData.industry] || [];

  const handleIndustryChange = (industry: string) => {
    setFormData({ ...formData, industry, services: [] });
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const addCustomService = () => {
    if (customService.trim() && !formData.services.includes(customService.trim())) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, customService.trim()],
      }));
      setCustomService('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      alert('Please select at least one service.');
      return;
    }
    onSubmit(formData);
  };

  const inputStyle = {
    background: '#1A1A1A',
    border: '1px solid #2A2A2A',
    color: '#FFFFFF',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Business Info */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>Business Name *</label>
            <input
              type="text"
              required
              value={formData.business_name}
              onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg focus:ring-2 focus:border-transparent outline-none placeholder-gray-600"
              style={{ ...inputStyle, '--tw-ring-color': '#E8762D' } as React.CSSProperties}
              placeholder="Acme Roofing Co."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.business_phone}
              onChange={(e) => setFormData({ ...formData, business_phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg focus:ring-2 focus:border-transparent outline-none placeholder-gray-600"
              style={{ ...inputStyle, '--tw-ring-color': '#E8762D' } as React.CSSProperties}
              placeholder="(214) 555-0123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>Email *</label>
            <input
              type="email"
              required
              value={formData.business_email}
              onChange={(e) => setFormData({ ...formData, business_email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg focus:ring-2 focus:border-transparent outline-none placeholder-gray-600"
              style={{ ...inputStyle, '--tw-ring-color': '#E8762D' } as React.CSSProperties}
              placeholder="info@acmeroofing.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>City *</label>
            <input
              type="text"
              required
              value={formData.business_city}
              onChange={(e) => setFormData({ ...formData, business_city: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg focus:ring-2 focus:border-transparent outline-none placeholder-gray-600"
              style={{ ...inputStyle, '--tw-ring-color': '#E8762D' } as React.CSSProperties}
              placeholder="Dallas"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>State</label>
            <select
              value={formData.business_state}
              onChange={(e) => setFormData({ ...formData, business_state: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg focus:ring-2 focus:border-transparent outline-none"
              style={{ ...inputStyle, '--tw-ring-color': '#E8762D' } as React.CSSProperties}
            >
              <option value="">Select state...</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Industry */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Industry</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.value}
              type="button"
              onClick={() => handleIndustryChange(ind.value)}
              className="px-4 py-3 rounded-lg text-sm font-medium transition-all"
              style={{
                background: formData.industry === ind.value ? 'rgba(232, 118, 45, 0.15)' : '#1A1A1A',
                border: formData.industry === ind.value ? '2px solid #E8762D' : '1px solid #2A2A2A',
                color: formData.industry === ind.value ? '#E8762D' : '#9CA3AF',
              }}
            >
              {ind.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Services Offered
          <span className="text-sm font-normal ml-2" style={{ color: '#E8762D' }}>
            ({formData.services.length} selected)
          </span>
        </h3>
        <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>Select the services this business offers. Each gets a dedicated section on the site.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {availableServices.map((service) => (
            <label
              key={service}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all"
              style={{
                background: formData.services.includes(service) ? 'rgba(232, 118, 45, 0.1)' : '#1A1A1A',
                border: formData.services.includes(service) ? '1px solid #E8762D' : '1px solid #2A2A2A',
              }}
            >
              <input
                type="checkbox"
                checked={formData.services.includes(service)}
                onChange={() => toggleService(service)}
                className="w-4 h-4 rounded"
                style={{ accentColor: '#E8762D' }}
              />
              <span className="text-sm" style={{ color: formData.services.includes(service) ? '#E8762D' : '#9CA3AF' }}>
                {service}
              </span>
            </label>
          ))}
        </div>

        {/* Custom service input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customService}
            onChange={(e) => setCustomService(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomService())}
            className="flex-1 px-4 py-2.5 rounded-lg focus:ring-2 focus:border-transparent outline-none placeholder-gray-600"
            style={{ ...inputStyle, '--tw-ring-color': '#E8762D' } as React.CSSProperties}
            placeholder="Add a custom service..."
          />
          <button
            type="button"
            onClick={addCustomService}
            className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', color: '#E8762D' }}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 text-white text-lg font-semibold rounded-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: '#E8762D' }}
      >
        {isLoading ? 'Generating...' : 'Generate Site'}
      </button>
    </form>
  );
}
