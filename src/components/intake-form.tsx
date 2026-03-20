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
    industry: 'roofing',
    services: [],
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      alert('Please select at least one service.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Business Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
            <input
              type="text"
              required
              value={formData.business_name}
              onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Acme Roofing Co."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.business_phone}
              onChange={(e) => setFormData({ ...formData, business_phone: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="(214) 555-0123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.business_email}
              onChange={(e) => setFormData({ ...formData, business_email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="info@acmeroofing.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input
              type="text"
              required
              value={formData.business_city}
              onChange={(e) => setFormData({ ...formData, business_city: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Dallas"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              value={formData.business_state}
              onChange={(e) => setFormData({ ...formData, business_state: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.value}
              type="button"
              onClick={() => handleIndustryChange(ind.value)}
              className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                formData.industry === ind.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Services Offered
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({formData.services.length} selected)
          </span>
        </h3>
        <p className="text-sm text-gray-500 mb-4">Select the services this business offers. These will each get a dedicated section on the site.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {availableServices.map((service) => (
            <label
              key={service}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                formData.services.includes(service)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.services.includes(service)}
                onChange={() => toggleService(service)}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'Generate Site'}
      </button>
    </form>
  );
}
