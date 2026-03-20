'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/sites' && pathname === '/sites') return true;
    if (path === '/sites/new' && pathname === '/sites/new') return true;
    if (path !== '/sites' && path !== '/sites/new' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <header style={{ background: '#111111', borderBottom: '1px solid #2A2A2A' }}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/sites" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#E8762D' }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">
            ProSet <span style={{ color: '#E8762D' }}>Sites</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          <Link
            href="/sites"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/sites') && !isActive('/sites/new')
                ? 'text-white'
                : 'hover:text-white'
            }`}
            style={{
              color: isActive('/sites') && !isActive('/sites/new') ? '#FFFFFF' : '#9CA3AF',
              background: isActive('/sites') && !isActive('/sites/new') ? '#1A1A1A' : 'transparent',
            }}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              All Sites
            </span>
          </Link>
          <Link
            href="/sites/new"
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 flex items-center gap-2"
            style={{ background: '#E8762D', color: '#FFFFFF' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Site
          </Link>
        </nav>
      </div>
    </header>
  );
}
