'use client';

import { useState, useRef } from 'react';
import { INDUSTRIES, INDUSTRY_SERVICES, US_STATES, IntakeFormData, UploadedAsset } from '@/lib/types/site-config';

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
    existing_website: '',
    uploaded_assets: [],
  });

  const [customService, setCustomService] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        const fd = new FormData();
        fd.append('file', file);

        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const result = await res.json();

        if (res.ok) {
          const asset: UploadedAsset = {
            name: result.name,
            url: result.url,
            type: result.type,
            size: result.size,
          };

          // If it's an image, set it as logo_url
          if (asset.type === 'logo' || asset.type === 'photo') {
            setFormData((prev) => ({
              ...prev,
              logo_url: asset.url,
              uploaded_assets: [...(prev.uploaded_assets || []), asset],
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              uploaded_assets: [...(prev.uploaded_assets || []), asset],
            }));
          }
        } else {
          alert(result.error || 'Upload failed');
        }
      } catch {
        alert('Upload failed. Please try again.');
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAsset = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      uploaded_assets: (prev.uploaded_assets || []).filter((_, i) => i !== index),
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

      {/* Existing Website */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Existing Website</h3>
        <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
          If the business has an existing website, enter it below. We&apos;ll reference it for branding cues and content.
        </p>
        <input
          type="text"
          value={formData.existing_website || ''}
          onChange={(e) => setFormData({ ...formData, existing_website: e.target.value })}
          onBlur={(e) => {
            const val = e.target.value.trim();
            if (val && !val.startsWith('http://') && !val.startsWith('https://')) {
              setFormData({ ...formData, existing_website: `https://${val}` });
            }
          }}
          className="w-full px-4 py-2.5 rounded-lg focus:ring-2 focus:border-transparent outline-none placeholder-gray-600"
          style={{ ...inputStyle, '--tw-ring-color': '#E8762D' } as React.CSSProperties}
          placeholder="example.com"
        />
      </div>

      {/* Reference Site */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Reference Site</h3>
        <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
          Paste a URL of a website you love the look/feel of. We&apos;ll analyze its design quality and match that caliber.
        </p>
        <input
          type="text"
          value={formData.reference_site_url || ''}
          onChange={(e) => setFormData({ ...formData, reference_site_url: e.target.value })}
          onBlur={(e) => {
            const val = e.target.value.trim();
            if (val && !val.startsWith('http://') && !val.startsWith('https://')) {
              setFormData({ ...formData, reference_site_url: `https://${val}` });
            }
          }}
          className="w-full px-4 py-2.5 rounded-lg focus:ring-2 focus:border-transparent outline-none placeholder-gray-600"
          style={{ ...inputStyle, '--tw-ring-color': '#E8762D' } as React.CSSProperties}
          placeholder="https://example.com"
        />
      </div>

      {/* File Uploads */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Logo &amp; Assets</h3>
        <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
          Upload the business logo, brand photos, or any documents that should inform the site. Images, PDFs, and docs accepted (max 10MB each).
        </p>

        {/* Upload area */}
        <div
          className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all hover:border-opacity-60"
          style={{ borderColor: '#2A2A2A', background: '#1A1A1A' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#E8762D', borderTopColor: 'transparent' }} />
              <span className="text-sm" style={{ color: '#9CA3AF' }}>Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,118,45,0.1)' }}>
                <svg className="w-6 h-6" style={{ color: '#E8762D' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium" style={{ color: '#E8762D' }}>Click to upload</span>
                <span className="text-sm" style={{ color: '#6B7280' }}> or drag files here</span>
              </div>
              <span className="text-xs" style={{ color: '#6B7280' }}>PNG, JPG, SVG, PDF, DOC up to 10MB</span>
            </div>
          )}
        </div>

        {/* Uploaded files list */}
        {(formData.uploaded_assets || []).length > 0 && (
          <div className="mt-4 space-y-2">
            {(formData.uploaded_assets || []).map((asset, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3 rounded-lg"
                style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {asset.type === 'logo' || asset.type === 'photo' ? (
                    <img src={asset.url} alt={asset.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(232,118,45,0.1)' }}>
                      <svg className="w-5 h-5" style={{ color: '#E8762D' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{asset.name}</p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>
                      {(asset.size / 1024).toFixed(0)}KB &middot; {asset.type}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeAsset(i)}
                  className="p-1 rounded hover:bg-red-500/10 transition-colors flex-shrink-0"
                >
                  <svg className="w-4 h-4" style={{ color: '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
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
        disabled={isLoading || uploading}
        className="w-full py-4 text-white text-lg font-semibold rounded-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: '#E8762D' }}
      >
        {isLoading ? 'Generating...' : 'Generate Site'}
      </button>
    </form>
  );
}
