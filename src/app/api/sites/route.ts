import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServiceRoleClient();

    const { data: sites, error } = await supabase
      .from('sites')
      .select(`
        *,
        site_form_submissions(count)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Flatten the count
    const sitesWithCounts = sites.map((site: Record<string, unknown>) => ({
      ...site,
      submission_count: Array.isArray(site.site_form_submissions)
        ? (site.site_form_submissions[0] as Record<string, number>)?.count || 0
        : 0,
    }));

    return NextResponse.json({ sites: sitesWithCounts });
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 });
  }
}
