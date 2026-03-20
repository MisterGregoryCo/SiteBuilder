import { createServiceRoleClient } from './supabase/server';
import type { Site } from './types/site-config';

export async function resolveSite(slug: string): Promise<Site | null> {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from('sites')
    .select('*')
    .eq('slug', slug)
    .in('status', ['published', 'draft'])
    .single();

  if (error || !data) {
    return null;
  }

  return data as Site;
}

export async function resolveSiteById(id: string): Promise<Site | null> {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from('sites')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Site;
}
