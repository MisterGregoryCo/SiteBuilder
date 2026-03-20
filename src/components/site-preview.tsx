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
  const [slug, setSlug] = useState(site.slug);

  const rendererDomain = process.env.NEXT_PUBLIC_RENDERER_DOMAIN || 'prosetpages.com';
  const previewUrl = `/render/${site.slug}`;
  const liveUrl = `https://${site.slug}.${rendererDomain}`;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Preview Area */}
      <div className="flex-1 flex flex-col">
        {/* Preview toolbar */}
        <div className="flex items-center justify-between bg-gray-100 border border-gray-200 rounded-t-lg px-4 py-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-500 text-center">
              {liveUrl}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded ${viewMode === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              title="Desktop view"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded ${viewMode === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              title="Mobile view"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Iframe */}
        <div className="flex-1 border border-t-0 border-gray-200 rounded-b-lg bg-white overflow-hidden flex justify-center">
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
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Site Details</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {slug}.{rendererDomain}
              </p>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Status</span>
                <span className={`font-medium ${
                  site.status === 'published' ? 'text-green-600' :
                  site.status === 'draft' ? 'text-yellow-600' : 'text-gray-400'
                }`}>
                  {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Industry</span>
                <span className="font-medium capitalize">{site.industry}</span>
              </div>
              <div className="flex justify-between">
                <span>Services</span>
                <span className="font-medium">{site.site_config.services.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {site.status !== 'published' && (
            <button
              onClick={onPublish}
              disabled={isPublishing}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isPublishing ? 'Publishing...' : 'Publish Site'}
            </button>
          )}

          {site.status === 'published' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium text-sm mb-2">Site is Live!</p>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 text-sm underline break-all"
              >
                {liveUrl}
              </a>
            </div>
          )}

          <button
            onClick={onRegenerate}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors"
          >
            Regenerate Copy
          </button>
        </div>
      </div>
    </div>
  );
}
