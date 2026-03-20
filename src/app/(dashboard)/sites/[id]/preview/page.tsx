'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SitePreview } from '@/components/site-preview';
import type { Site } from '@/lib/types/site-config';

export default function PreviewPage() {
  const router = useRouter();
  const params = useParams();
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const fetchSite = useCallback(async () => {
    try {
      const res = await fetch(`/api/sites/${params.id}`);
      const data = await res.json();
      if (data.site) setSite(data.site);
    } catch (error) {
      console.error('Failed to fetch site:', error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

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
    } catch (error) {
      console.error('Publish failed:', error);
    } finally {
      setPublishing(false);
    }
  };

  const handleRegenerate = () => {
    router.push('/sites/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <p style={{ color: '#9CA3AF' }}>Loading preview...</p>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <div className="text-center">
          <p className="mb-4" style={{ color: '#9CA3AF' }}>Site not found</p>
          <button onClick={() => router.push('/sites')} style={{ color: '#E8762D' }} className="underline">
            Back to Sites
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <header className="shrink-0" style={{ background: '#111111', borderBottom: '1px solid #2A2A2A' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <button
              onClick={() => router.push('/sites')}
              className="text-sm flex items-center gap-1 mb-1 hover:text-white transition-colors"
              style={{ color: '#9CA3AF' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Sites
            </button>
            <h1 className="text-xl font-bold text-white">{site.business_name}</h1>
          </div>
          {site.status === 'published' && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium" style={{ color: '#22C55E' }}>Live</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://${site.slug}.${process.env.NEXT_PUBLIC_RENDERER_DOMAIN || 'prosetpages.com'}`);
                }}
                className="px-4 py-2 text-sm rounded-lg"
                style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', color: '#9CA3AF' }}
              >
                Copy Link
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Preview */}
      <div className="flex-1 max-w-[1400px] mx-auto px-6 py-6 w-full">
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
