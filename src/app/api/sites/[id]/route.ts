import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServiceRoleClient();

    const { data: site, error } = await supabase
      .from('sites')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    return NextResponse.json({ site }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error fetching site:', error);
    return NextResponse.json({ error: 'Failed to fetch site' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServiceRoleClient();

    // Delete generation logs first (FK constraint)
    await supabase.from('site_generation_logs').delete().eq('site_id', id);

    // Delete form submissions (FK constraint)
    await supabase.from('site_form_submissions').delete().eq('site_id', id);

    // Delete the site
    const { error } = await supabase.from('sites').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete site' }, { status: 500 });
  }
}
