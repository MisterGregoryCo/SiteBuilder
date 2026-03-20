import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { action } = await request.json();
    const supabase = createServiceRoleClient();

    if (action === 'publish') {
      const { data, error } = await supabase
        .from('sites')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ site: data });
    }

    if (action === 'unpublish') {
      const { data, error } = await supabase
        .from('sites')
        .update({ status: 'draft' })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ site: data });
    }

    if (action === 'archive') {
      const { data, error } = await supabase
        .from('sites')
        .update({ status: 'archived' })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ site: data });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}
