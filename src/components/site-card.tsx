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
  const statusColors: Record<string, string> = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-yellow-100 text-yellow-700',
    archived: 'bg-gray-100 text-gray-500',
  };

  const rendererDomain = process.env.NEXT_PUBLIC_RENDERER_DOMAIN || 'prosetpages.com';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{site.business_name}</h3>
          <p className="text-sm text-gray-500">
            {site.business_city}{site.business_state ? `, ${site.business_state}` : ''}
          </p>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[site.status] || statusColors.draft}`}>
          {site.status}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="capitalize">{site.industry}</span>
        <span>|</span>
        <span>{new Date(site.created_at).toLocaleDateString()}</span>
        <span>|</span>
        <span>{site.submission_count} leads</span>
      </div>

      {site.status === 'published' && (
        <p className="text-xs text-gray-400 mb-4 break-all">
          {site.slug}.{rendererDomain}
        </p>
      )}

      <div className="flex items-center gap-2">
        <Link
          href={`/sites/${site.id}/preview`}
          className="flex-1 text-center py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          Preview
        </Link>
        {site.status === 'published' && (
          <a
            href={`https://${site.slug}.${rendererDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 text-sm font-medium bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            View Live
          </a>
        )}
      </div>
    </div>
  );
}
