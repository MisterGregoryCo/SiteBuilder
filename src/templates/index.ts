import { RoofingPremiumTemplate } from './roofing-premium/template';
import { Site } from '@/lib/types/site-config';
import { ComponentType } from 'react';

// Template registry: maps template names to their component
const TEMPLATES: Record<string, ComponentType<{ site: Site }>> = {
  'roofing-premium': RoofingPremiumTemplate,
  // Add new templates here:
  // 'plumbing-premium': PlumbingPremiumTemplate,
  // 'hvac-premium': HvacPremiumTemplate,
};

// Industry to default template mapping
const INDUSTRY_TEMPLATES: Record<string, string> = {
  roofing: 'roofing-premium',
  plumbing: 'roofing-premium', // Fallback until dedicated template exists
  hvac: 'roofing-premium',
  electrical: 'roofing-premium',
  landscaping: 'roofing-premium',
};

export function getTemplate(industry: string): ComponentType<{ site: Site }> | null {
  const templateKey = INDUSTRY_TEMPLATES[industry] || 'roofing-premium';
  return TEMPLATES[templateKey] || null;
}

export function getTemplateByName(name: string): ComponentType<{ site: Site }> | null {
  return TEMPLATES[name] || null;
}
