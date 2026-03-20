'use client';

import Link from 'next/link';

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
}

export function SiteCard({ site }: SiteCardProps) {
  const statusStyles: Record<string, { bg: string; text: string }> = {
    published: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22C55E' },
    draft: { bg: 'rgba(232, 118, 45, 0.15)', text: '#E8762D' },
    archived: { bg: 'rgba(156, 163, 175, 0.15)', text: '#9CA3AF' },
  };

  const status = statusStyles[site.status] || statusStyles.draft;
  const rendererDomain = process.env.NEXT_PUBLIC_RENDERER_DOMAIN || 'prosetpages.com';

  return (
    <div
      className="rounded-xl p-5 transition-all hover:border-gray-600"
      style={{ background: '#111111', border: '1px solid #2A2A2A' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white text-lg">{site.business_name}</h3>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>
            {site.business_city}{site.business_state ? `, ${site.business_state}` : ''}
          </p>
        </div>
        <span
          className="px-2.5 py-0.5 rounded-full text-xs font-medium"
          style={{ background: status.bg, color: status.text }}
        >
          {site.status}
        </span>
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
