'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteCard } from '@/components/site-card';

interface SiteListItem {
  id: string;
  slug: string;
  business_name: string;
  business_city: string;
  business_state: string | null;
  industry: string;
  status: string;
  created_at: string;
  submission_count: number;
}

export default function SitesPage() {
  const [sites, setSites] = useState<SiteListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: 'all', industry: 'all' });

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await fetch('/api/sites');
      const data = await res.json();
      setSites(data.sites || []);
    } catch (error) {
      console.error('Failed to fetch sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSites = sites.filter((site) => {
    if (filter.status !== 'all' && site.status !== filter.status) return false;
    if (filter.industry !== 'all' && site.industry !== filter.industry) return false;
    return true;
  });

  const stats = {
    total: sites.length,
    published: sites.filter((s) => s.status === 'published').length,
    draft: sites.filter((s) => s.status === 'draft').length,
    totalLeads: sites.reduce((sum, s) => sum + s.submission_count, 0),
  };

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <header style={{ background: '#111111', borderBottom: '1px solid #2A2A2A' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* ProSet Logo */}
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#E8762D' }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ProSet <span style={{ color: '#E8762D' }}>Site Builder</span></h1>
              <p className="text-xs" style={{ color: '#9CA3AF' }}>Generate professional websites in under 2 minutes</p>
            </div>
          </div>
          <Link
            href="/sites/new"
            className="px-6 py-2.5 text-white font-semibold rounded-lg transition-all hover:opacity-90 flex items-center gap-2"
            style={{ background: '#E8762D' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Site
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Sites', value: stats.total, accent: false },
            { label: 'Published', value: stats.published, accent: false },
            { label: 'Drafts', value: stats.draft, accent: false },
            { label: 'Total Leads', value: stats.totalLeads, accent: true },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-4" style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>{stat.label}</p>
              <p className="text-2xl font-bold" style={{ color: stat.accent ? '#E8762D' : '#FFFFFF' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="px-3 py-2 rounded-lg text-sm text-white outline-none"
            style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={filter.industry}
            onChange={(e) => setFilter({ ...filter, industry: e.target.value })}
            className="px-3 py-2 rounded-lg text-sm text-white outline-none"
            style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}
          >
            <option value="all">All Industries</option>
            <option value="generic">Generic / Other</option>
            <option value="roofing">Roofing</option>
            <option value="plumbing">Plumbing</option>
            <option value="hvac">HVAC</option>
            <option value="electrical">Electrical</option>
            <option value="landscaping">Landscaping</option>
          </select>
        </div>

        {/* Site Grid */}
        {loading ? (
          <div className="text-center py-20" style={{ color: '#9CA3AF' }}>Loading sites...</div>
        ) : filteredSites.length === 0 ? (
          <div className="text-center py-20">
            <p className="mb-4" style={{ color: '#9CA3AF' }}>
              {sites.length === 0 ? 'No sites generated yet.' : 'No sites match your filters.'}
            </p>
            {sites.length === 0 && (
              <Link
                href="/sites/new"
                className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90"
                style={{ background: '#E8762D' }}
              >
                Generate Your First Site
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
