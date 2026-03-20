'use client';

import { useState } from 'react';
import { Site } from '@/lib/types/site-config';

interface SitePreviewProps {
  site: Site;
  onPublish: () => void;
  onRegenerate: () => void;
  isPublishing: boolean;
}

export function SitePreview({ site, onPublish, onRegenerate, isPublishing }: SitePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const rendererDomain = process.env.NEXT_PUBLIC_RENDERER_DOMAIN || 'prosetpages.com';
  const previewUrl = `/render/${site.slug}`;
  const liveUrl = `https://${site.slug}.${rendererDomain}`;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Preview Area */}
      <div className="flex-1 flex flex-col">
        {/* Preview toolbar */}
        <div
          className="flex items-center justify-between rounded-t-lg px-4 py-2"
          style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: '#EF4444' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#F59E4B' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#22C55E' }} />
          </div>
          <div className="flex-1 mx-4">
            <div
              className="rounded px-3 py-1 text-sm text-center"
              style={{ background: '#0A0A0A', border: '1px solid #2A2A2A', color: '#6B7280' }}
            >
              {liveUrl}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('desktop')}
              className="p-1.5 rounded"
              style={{ background: viewMode === 'desktop' ? '#2A2A2A' : 'transparent' }}
              title="Desktop view"
            >
              <svg className="w-5 h-5" style={{ color: viewMode === 'desktop' ? '#E8762D' : '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className="p-1.5 rounded"
              style={{ background: viewMode === 'mobile' ? '#2A2A2A' : 'transparent' }}
              title="Mobile view"
            >
              <svg className="w-5 h-5" style={{ color: viewMode === 'mobile' ? '#E8762D' : '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Iframe */}
        <div
          className="flex-1 rounded-b-lg bg-white overflow-hidden flex justify-center"
          style={{ borderLeft: '1px solid #2A2A2A', borderRight: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A' }}
        >
          <iframe
            src={previewUrl}
            className={`h-full border-0 transition-all duration-300 ${
              viewMode === 'mobile' ? 'w-[375px]' : 'w-full'
            }`}
            style={{ minHeight: '700px' }}
            title="Site Preview"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-72 space-y-6">
        <div className="rounded-xl p-5" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
          <h3 className="text-lg font-semibold text-white mb-4">Site Details</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>URL Slug</label>
              <div
                className="px-3 py-2 rounded-lg text-sm"
                style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', color: '#FFFFFF' }}
              >
                {site.slug}
              </div>
              <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                {site.slug}.{rendererDomain}
              </p>
            </div>

            <div className="text-sm space-y-2" style={{ color: '#9CA3AF' }}>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-medium" style={{
                  color: site.status === 'published' ? '#22C55E' :
                    site.status === 'draft' ? '#E8762D' : '#6B7280'
                }}>
                  {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Industry</span>
                <span className="font-medium capitalize text-white">{site.industry}</span>
              </div>
              <div className="flex justify-between">
                <span>Services</span>
                <span className="font-medium text-white">{site.site_config.services.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {site.status !== 'published' && (
            <button
              onClick={onPublish}
              disabled={isPublishing}
              className="w-full py-3 text-white font-semibold rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: '#22C55E' }}
            >
              {isPublishing ? 'Publishing...' : 'Publish Site'}
            </button>
          )}

          {site.status === 'published' && (
            <div className="p-4 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <p className="font-medium text-sm mb-2" style={{ color: '#22C55E' }}>Site is Live!</p>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline break-all"
                style={{ color: '#22C55E' }}
              >
                {liveUrl}
              </a>
            </div>
          )}

          <button
            onClick={onRegenerate}
            className="w-full py-3 font-semibold rounded-lg transition-colors"
            style={{ background: 'transparent', border: '2px solid #2A2A2A', color: '#9CA3AF' }}
          >
            Regenerate Copy
          </button>
        </div>
      </div>
    </div>
  );
}
