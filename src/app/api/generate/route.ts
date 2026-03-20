import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { generateSiteCopy } from '@/lib/ai/generate-site';
import type { IntakeFormData } from '@/lib/types/site-config';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/^-|-$/g, '');
}

export async function POST(request: NextRequest) {
  try {
    const intake: IntakeFormData = await request.json();

    // Validate required fields
    if (!intake.business_name || !intake.business_phone || !intake.business_email || !intake.business_city || !intake.industry || !intake.services?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServiceRoleClient();

    // Get the template for this industry
    const { data: template, error: templateError } = await supabase
      .from('site_templates')
      .select('*')
      .eq('industry', intake.industry)
      .eq('is_active', true)
      .single();

    if (templateError || !template) {
      return NextResponse.json(
        { error: `No active template found for industry: ${intake.industry}` },
        { status: 400 }
      );
    }

    // Generate AI copy
    const { config, promptSent, tokensIn, tokensOut, generationTimeMs } = await generateSiteCopy(intake, template);

    // Generate unique slug
    let slug = slugify(intake.business_name);
    const { data: existingSite } = await supabase
      .from('sites')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (existingSite) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    // Create the site record
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .insert({
        slug,
        business_name: intake.business_name,
        business_phone: intake.business_phone,
        business_email: intake.business_email,
        business_city: intake.business_city,
        business_state: intake.business_state || null,
        industry: intake.industry,
        services: intake.services.map((s) => ({ name: s })),
        template_id: template.id,
        site_config: config,
        status: 'draft',
        created_by: '00000000-0000-0000-0000-000000000000', // TODO: replace with auth user
      })
      .select()
      .single();

    if (siteError) {
      console.error('Failed to create site:', siteError);
      return NextResponse.json({ error: 'Failed to save site' }, { status: 500 });
    }

    // Log the generation
    await supabase.from('site_generation_logs').insert({
      site_id: site.id,
      prompt_sent: promptSent,
      response_received: config,
      model_used: 'claude-sonnet-4-20250514',
      tokens_in: tokensIn,
      tokens_out: tokensOut,
      generation_time_ms: generationTimeMs,
      created_by: '00000000-0000-0000-0000-000000000000',
    });

    return NextResponse.json({ site });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
