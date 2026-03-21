'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SiteCardProps {
  site: {
    id: string;
    slug: string;
    business_name: string;
    business_city: string;
    business_state: string | null;
    industry: string;
    status: string;
    created_at: string;
    submission_count: number;
    site_config?: {
      hero?: { background_image?: string; headline?: string };
      footer?: { business_name?: string };
    };
  };
  onDelete?: (id: string) => void;
}

const INDUSTRY_COLORS: Record<string, string> = {
  generic: '#E8762D',
  roofing: '#C9A84C',
  plumbing: '#0D9488',
  hvac: '#059669',
  electrical: '#EAB308',
  landscaping: '#84CC16',
};

export function SiteCard({ site, onDelete }: SiteCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const statusStyles: Record<string, { bg: string; text: string }> = {
    published: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22C55E' },
    draft: { bg: 'rgba(232, 118, 45, 0.15)', text: '#E8762D' },
    archived: { bg: 'rgba(156, 163, 175, 0.15)', text: '#9CA3AF' },
  };

  const status = statusStyles[site.status] || statusStyles.draft;
  const rendererDomain = process.env.NEXT_PUBLIC_RENDERER_DOMAIN || 'prosetpages.com';
  const heroImage = site.site_config?.hero?.background_image;
  const accentColor = INDUSTRY_COLORS[site.industry] || '#E8762D';
  const siteUrl = `/render/${site.slug}`;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/sites/${site.id}`, { method: 'DELETE' });
      if (res.ok && onDelete) {
        onDelete(site.id);
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div
      className="group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 relative"
      style={{ background: '#111111', border: '1px solid #2A2A2A' }}
    >
      {/* Delete confirmation overlay */}
      {showConfirm && (
        <div className="absolute inset-0 z-10 rounded-2xl flex flex-col items-center justify-center gap-4 p-6" style={{ background: 'rgba(10,10,10,0.95)' }}>
          <p className="text-white text-sm text-center font-medium">
            Delete <strong>{site.business_name}</strong>?<br />
            <span style={{ color: '#9CA3AF' }}>This cannot be undone.</span>
          </p>
          <div className="flex gap-3">
            <button onClick={handleDelete} disabled={deleting}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: '#EF4444' }}>
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
            <button onClick={() => setShowConfirm(false)}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: '#2A2A2A', color: '#9CA3AF' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Preview Image */}
      <Link href={`/sites/${site.id}/preview`} className="block relative">
        <div className="relative h-48 overflow-hidden">
          {heroImage ? (
            <>
              <img src={heroImage} alt={site.business_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: '#1A1A1A' }}>
              <svg className="w-12 h-12" style={{ color: '#2A2A2A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
              style={{ background: status.bg, color: status.text, border: '1px solid rgba(255,255,255,0.05)' }}>
              {site.status}
            </span>
          </div>

          {/* Industry tag */}
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm capitalize"
              style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}30` }}>
              {site.industry}
            </span>
          </div>

          {/* Business name overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-bold text-white text-lg leading-tight drop-shadow-lg">{site.business_name}</h3>
            <p className="text-xs text-gray-300 mt-0.5">
              {site.business_city}{site.business_state ? `, ${site.business_state}` : ''}
            </p>
          </div>
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-4">
        {/* Meta row */}
        <div className="flex items-center justify-between text-xs mb-4" style={{ color: '#6B7280' }}>
          <span>{new Date(site.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span style={{ color: accentColor }}>{site.submission_count} lead{site.submission_count !== 1 ? 's' : ''}</span>
        </div>

        {/* URL display */}
        <p className="text-[11px] mb-3 break-all font-mono" style={{ color: '#4B5563' }}>
          {site.slug}.{rendererDomain}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href={`/sites/${site.id}/preview`}
            className="flex-1 text-center py-2.5 text-sm font-semibold rounded-lg transition-all hover:opacity-80"
            style={{ background: `${accentColor}15`, color: accentColor }}>
            Preview
          </Link>
          <a href={siteUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center py-2.5 text-sm font-semibold rounded-lg transition-all hover:opacity-80 flex items-center justify-center gap-1.5"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#9CA3AF', border: '1px solid #2A2A2A' }}>
            View Site
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button onClick={() => setShowConfirm(true)} title="Delete site"
            className="p-2.5 rounded-lg transition-colors hover:bg-red-500/10">
            <svg className="w-4 h-4" style={{ color: '#4B5563' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
