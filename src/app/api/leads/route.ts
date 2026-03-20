import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 }); // 1 hour window
    return false;
  }

  entry.count++;
  return entry.count > 5; // Max 5 submissions per IP per hour
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();

    // Honeypot check — if the hidden field has a value, it's a bot
    if (body.website) {
      return NextResponse.json({ success: true }); // Silently accept but don't save
    }

    const { site_id, name, email, phone, message, service_interest, source_page } = body;

    if (!site_id || !name) {
      return NextResponse.json({ error: 'Name and site ID are required' }, { status: 400 });
    }

    const supabase = createServiceRoleClient();

    // Verify the site exists and is published
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('id, partner_id, business_name')
      .eq('id', site_id)
      .eq('status', 'published')
      .single();

    if (siteError || !site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    // Write to site_form_submissions
    const { error: insertError } = await supabase
      .from('site_form_submissions')
      .insert({
        site_id,
        name,
        email: email || null,
        phone: phone || null,
        message: message || null,
        service_interest: service_interest || null,
        source_page: source_page || null,
        ip_address: ip,
      });

    if (insertError) {
      console.error('Failed to save submission:', insertError);
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
    }

    // If partner_id exists, also create a client_leads record
    if (site.partner_id) {
      try {
        await supabase.from('client_leads').insert({
          partner_id: site.partner_id,
          name,
          email: email || null,
          phone: phone || null,
          source: `Website: ${site.business_name}`,
          notes: message || null,
        });
      } catch {
        // non-critical - partner lead insert is best-effort
      }
    }

    // Fire webhook to internal CRM (non-blocking)
    if (process.env.CRM_WEBHOOK_URL) {
      fetch(process.env.CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Secret': process.env.CRM_WEBHOOK_SECRET || '',
        },
        body: JSON.stringify({
          event: 'site_lead',
          site_id,
          business_name: site.business_name,
          lead: { name, email, phone, message, service_interest },
        }),
      }).catch(() => { /* non-critical */ });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
