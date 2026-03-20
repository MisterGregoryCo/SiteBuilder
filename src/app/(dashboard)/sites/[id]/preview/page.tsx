'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SitePreview } from '@/components/site-preview';
import type { Site } from '@/lib/types/site-config';

export default function PreviewPage() {
  const router = useRouter();
  const params = useParams();
  const siteId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [publishing, setPublishing] = useState(false);

  const fetchSite = useCallback(async () => {
    if (!siteId) {
      setError('No site ID provided');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/sites/${siteId}`);
      if (!res.ok) {
        setError(`Failed to load site (${res.status})`);
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.site) {
        setSite(data.site);
      } else {
        setError('Site data not found in response');
      }
    } catch (err) {
      console.error('Failed to fetch site:', err);
      setError('Network error loading site');
    } finally {
      setLoading(false);
    }
  }, [siteId]);

  useEffect(() => {
    fetchSite();
  }, [fetchSite]);

  const handlePublish = async () => {
    if (!site) return;
    setPublishing(true);

    try {
      const res = await fetch(`/api/sites/${site.id}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish' }),
      });

      if (res.ok) {
        const data = await res.json();
        setSite(data.site);
      }
    } catch (err) {
      console.error('Publish failed:', err);
    } finally {
      setPublishing(false);
    }
  };

  const handleRegenerate = () => {
    router.push('/sites/new');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#E8762D', borderTopColor: 'transparent' }} />
          <p style={{ color: '#9CA3AF' }}>Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error || !site) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <p className="mb-2 text-white font-medium">Site not found</p>
          <p className="mb-6 text-sm" style={{ color: '#9CA3AF' }}>{error || 'The site may have been deleted.'}</p>
          <button
            onClick={() => router.push('/sites')}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#E8762D', color: '#FFFFFF' }}
          >
            Back to Sites
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Sub-header with site info */}
      <div style={{ borderBottom: '1px solid #2A2A2A' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">{site.business_name}</h2>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                background: site.status === 'published' ? 'rgba(34,197,94,0.15)' : 'rgba(232,118,45,0.15)',
                color: site.status === 'published' ? '#22C55E' : '#E8762D',
              }}
            >
              {site.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/render/${site.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 text-sm font-medium rounded-lg transition-all hover:scale-105 flex items-center gap-2"
              style={{ background: '#E8762D', color: '#FFFFFF' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Full Site
            </a>
            <button
              onClick={() => {
                const url = site.status === 'published'
                  ? `https://${site.slug}.${process.env.NEXT_PUBLIC_RENDERER_DOMAIN || 'prosetpages.com'}`
                  : `${window.location.origin}/render/${site.slug}`;
                navigator.clipboard.writeText(url);
              }}
              className="px-4 py-1.5 text-sm rounded-lg transition-colors hover:bg-opacity-80"
              style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', color: '#9CA3AF' }}
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <SitePreview
          site={site}
          onPublish={handlePublish}
          onRegenerate={handleRegenerate}
          isPublishing={publishing}
        />
      </div>
    </div>
  );
}
