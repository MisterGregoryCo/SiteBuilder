import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, OUTPUT_SCHEMA } from './prompts/system';
import { ROOFING_CONTEXT } from './prompts/industries/roofing';
import { GENERIC_CONTEXT } from './prompts/industries/generic';
import { PLUMBING_CONTEXT } from './prompts/industries/plumbing';
import { HVAC_CONTEXT } from './prompts/industries/hvac';
import { ELECTRICAL_CONTEXT } from './prompts/industries/electrical';
import { LANDSCAPING_CONTEXT } from './prompts/industries/landscaping';
import { getReferenceSites } from './reference-sites';
import type { IntakeFormData, SiteConfig, SiteTemplate } from '../types/site-config';

const INDUSTRY_CONTEXTS: Record<string, string> = {
  generic: GENERIC_CONTEXT,
  roofing: ROOFING_CONTEXT,
  plumbing: PLUMBING_CONTEXT,
  hvac: HVAC_CONTEXT,
  electrical: ELECTRICAL_CONTEXT,
  landscaping: LANDSCAPING_CONTEXT,
};

/**
 * Fetch a URL and extract meaningful text content for AI analysis.
 * Returns a trimmed summary (max ~2000 chars) or null on failure.
 */
async function fetchSiteContent(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'ProSet-SiteBuilder/1.0 (site-analysis)',
        'Accept': 'text/html',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const html = await res.text();

    // Strip scripts, styles, and HTML tags to get raw text
    const cleaned = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<header[\s\S]*?<\/header>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Extract the most meaningful content (first 2000 chars after cleanup)
    return cleaned.slice(0, 2000) || null;
  } catch {
    return null;
  }
}

/**
 * Build reference site analysis context for the AI prompt.
 * Fetches industry defaults + any user-provided reference URL.
 */
async function buildReferenceContext(
  industry: string,
  userReferenceUrl?: string
): Promise<string> {
  const urls = getReferenceSites(industry);
  if (userReferenceUrl) {
    urls.push(userReferenceUrl);
  }

  if (urls.length === 0) return '';

  // Fetch all reference sites in parallel (with 8s timeout each)
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const content = await fetchSiteContent(url);
      return content ? { url, content } : null;
    })
  );

  const analyses = results
    .map((r) => (r.status === 'fulfilled' ? r.value : null))
    .filter(Boolean) as { url: string; content: string }[];

  if (analyses.length === 0) return '';

  const sections = analyses.map(
    (a) =>
      `--- Reference: ${a.url} ---\n${a.content}`
  );

  return `
REFERENCE SITE ANALYSIS:
The following are premium reference websites you should study and match in quality. Analyze their copywriting style, tone, section structure, headline patterns, CTA language, trust signals, and overall professionalism. Your output should match or exceed this caliber.

${sections.join('\n\n')}

KEY TAKEAWAYS TO APPLY:
- Match the confident, professional tone of these reference sites
- Use similar headline structures (short, punchy, city-specific)
- Mirror the trust signal patterns (stats, badges, guarantees)
- Match the CTA urgency and phrasing style
- Keep the same level of specificity and detail in service descriptions
`;
}

export async function generateSiteCopy(
  intake: IntakeFormData,
  template: SiteTemplate
): Promise<{
  config: SiteConfig;
  promptSent: string;
  tokensIn: number;
  tokensOut: number;
  generationTimeMs: number;
}> {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  });

  const industryContext = INDUSTRY_CONTEXTS[intake.industry] || '';

  // Fetch and analyze reference sites (runs in parallel while we build the prompt)
  const referenceContext = await buildReferenceContext(
    intake.industry,
    intake.reference_site_url
  );

  // Build context about existing website and uploaded assets
  const websiteContext = intake.existing_website
    ? `\nExisting Website: ${intake.existing_website}\nNote: This business has an existing website. Reference it for tone, messaging style, and any unique selling points they already emphasize. Match or improve on their current positioning.`
    : '';

  const assetsContext = intake.uploaded_assets?.length
    ? `\nUploaded Assets: ${intake.uploaded_assets.map(a => `${a.name} (${a.type})`).join(', ')}\nNote: The business has provided brand assets including ${intake.uploaded_assets.some(a => a.type === 'logo') ? 'their logo, ' : ''}${intake.uploaded_assets.some(a => a.type === 'photo') ? 'business photos, ' : ''}${intake.uploaded_assets.some(a => a.type === 'document') ? 'brand documents, ' : ''}which will be used on the site. Write copy that complements professional visual branding.`
    : '';

  const userPrompt = `Generate website copy for this local service business:

Business Name: ${intake.business_name}
City: ${intake.business_city}${intake.business_state ? `, ${intake.business_state}` : ''}
Industry: ${intake.industry}
Phone: ${intake.business_phone}
Email: ${intake.business_email}
Services Offered: ${intake.services.join(', ')}${websiteContext}${assetsContext}

${industryContext}
${referenceContext}
${OUTPUT_SCHEMA}

Generate copy for ALL ${intake.services.length} services listed above. Each service must have its own entry in the services array.

QUALITY STANDARD: This copy will be used on a $5,000-quality premium dark-themed website. Write accordingly — no generic filler, no weak headlines, no bland descriptions. Every word should sell.

Return ONLY the JSON object. No markdown, no code fences, no explanation.`;

  const startTime = Date.now();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const generationTimeMs = Date.now() - startTime;

  const textBlock = response.content.find((block) => block.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  // Parse the JSON response, stripping any accidental markdown fences
  let jsonText = textBlock.text.trim();
  if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  const generatedCopy = JSON.parse(jsonText);

  // Assemble full site config by merging AI copy with template data
  const siteConfig: SiteConfig = {
    logo_url: intake.logo_url || undefined,
    existing_website: intake.existing_website || undefined,
    uploaded_assets: intake.uploaded_assets || undefined,
    meta: {
      title: generatedCopy.meta.title,
      description: generatedCopy.meta.description,
      og_image: template.stock_photos.hero,
    },
    hero: {
      headline: generatedCopy.hero.headline,
      subheadline: generatedCopy.hero.subheadline,
      cta_text: generatedCopy.hero.cta_text,
      cta_phone: intake.business_phone,
      background_image: template.stock_photos.hero,
    },
    services: generatedCopy.services.map((svc: { name: string; description: string }, i: number) => ({
      name: svc.name,
      description: svc.description,
      icon: svc.name.toLowerCase().replace(/\s+/g, '-'),
      image: template.stock_photos.services[i % template.stock_photos.services.length],
    })),
    about: {
      headline: generatedCopy.about.headline,
      body: generatedCopy.about.body,
      image: template.stock_photos.about,
      stats: generatedCopy.about.stats,
    },
    contact: {
      headline: generatedCopy.contact.headline,
      subtext: generatedCopy.contact.subtext,
      form_fields: ['name', 'email', 'phone', 'service', 'message'],
      phone: intake.business_phone,
      email: intake.business_email,
    },
    footer: {
      business_name: intake.business_name,
      tagline: generatedCopy.footer.tagline,
    },
  };

  return {
    config: siteConfig,
    promptSent: userPrompt,
    tokensIn: response.usage.input_tokens,
    tokensOut: response.usage.output_tokens,
    generationTimeMs,
  };
}
