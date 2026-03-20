import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, OUTPUT_SCHEMA } from './prompts/system';
import { ROOFING_CONTEXT } from './prompts/industries/roofing';
import type { IntakeFormData, SiteConfig, SiteTemplate } from '../types/site-config';

const INDUSTRY_CONTEXTS: Record<string, string> = {
  roofing: ROOFING_CONTEXT,
};

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

  const userPrompt = `Generate website copy for this local service business:

Business Name: ${intake.business_name}
City: ${intake.business_city}${intake.business_state ? `, ${intake.business_state}` : ''}
Industry: ${intake.industry}
Phone: ${intake.business_phone}
Email: ${intake.business_email}
Services Offered: ${intake.services.join(', ')}

${industryContext}

${OUTPUT_SCHEMA}

Generate copy for ALL ${intake.services.length} services listed above. Each service must have its own entry in the services array.

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
