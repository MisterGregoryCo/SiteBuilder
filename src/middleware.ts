import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Check if this is a renderer request (subdomain of prosetpages.com)
  const rendererDomain = process.env.NEXT_PUBLIC_RENDERER_DOMAIN || 'prosetpages.com';

  // Extract subdomain for renderer domains
  if (hostname.endsWith(`.${rendererDomain}`) || hostname.endsWith('.prosetpages.com')) {
    const subdomain = hostname.split('.')[0];

    if (subdomain && subdomain !== 'www') {
      // Rewrite to the renderer route with the slug
      url.pathname = `/render/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // For local development: check for ?site=slug query param
  if (url.searchParams.has('site')) {
    const slug = url.searchParams.get('site');
    url.pathname = `/render/${slug}`;
    url.searchParams.delete('site');
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
