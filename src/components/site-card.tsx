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
  };
  onDelete?: (id: string) => void;
}

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
      className="rounded-xl p-5 transition-all hover:border-gray-600 relative"
      style={{ background: '#111111', border: '1px solid #2A2A2A' }}
    >
      {/* Delete confirmation overlay */}
      {showConfirm && (
        <div className="absolute inset-0 z-10 rounded-xl flex flex-col items-center justify-center gap-4 p-6" style={{ background: 'rgba(10,10,10,0.95)' }}>
          <p className="text-white text-sm text-center font-medium">
            Delete <strong>{site.business_name}</strong>? This cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: '#EF4444' }}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{ background: '#2A2A2A', color: '#9CA3AF' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white text-lg">{site.business_name}</h3>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>
            {site.business_city}{site.business_state ? `, ${site.business_state}` : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ background: status.bg, color: status.text }}
          >
            {site.status}
          </span>
          {/* Delete button */}
          <button
            onClick={() => setShowConfirm(true)}
            className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10"
            title="Delete site"
          >
            <svg className="w-4 h-4" style={{ color: '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm mb-4" style={{ color: '#6B7280' }}>
        <span className="capitalize">{site.industry}</span>
        <span>|</span>
        <span>{new Date(site.created_at).toLocaleDateString()}</span>
        <span>|</span>
        <span style={{ color: '#E8762D' }}>{site.submission_count} leads</span>
      </div>

      {site.status === 'published' && (
        <p className="text-xs mb-4 break-all" style={{ color: '#6B7280' }}>
          {site.slug}.{rendererDomain}
        </p>
      )}

      <div className="flex items-center gap-2">
        <Link
          href={`/sites/${site.id}/preview`}
          className="flex-1 text-center py-2 text-sm font-medium rounded-lg transition-colors"
          style={{ background: 'rgba(232, 118, 45, 0.1)', color: '#E8762D' }}
        >
          Preview
        </Link>
        {site.status === 'published' && (
          <a
            href={`https://${site.slug}.${rendererDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 text-sm font-medium rounded-lg transition-colors"
            style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' }}
          >
            View Live
          </a>
        )}
      </div>
    </div>
  );
}
