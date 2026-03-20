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
      const res = await fetch(`/api/sites?id=${params.id}`);
      const data = await res.json();
      // Find the specific site from the list
      const found = data.sites?.find((s: Site) => s.id === params.id);
      if (found) setSite(found);
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
    // Navigate back to new site page — in v1, regeneration is just starting over
    router.push('/sites/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading preview...</p>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Site not found</p>
          <button onClick={() => router.push('/sites')} className="text-blue-600 underline">
            Back to Sites
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shrink-0">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <button
              onClick={() => router.push('/sites')}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Sites
            </button>
            <h1 className="text-xl font-bold text-gray-900">{site.business_name}</h1>
          </div>
          {site.status === 'published' && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-green-600 font-medium">Live</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://${site.slug}.${process.env.NEXT_PUBLIC_RENDERER_DOMAIN || 'prosetpages.com'}`);
                }}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
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
