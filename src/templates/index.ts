import { RoofingPremiumTemplate } from './roofing-premium/template';
import { GenericModernTemplate } from './generic-modern/template';
import { PlumbingProTemplate } from './plumbing-pro/template';
import { HvacComfortTemplate } from './hvac-comfort/template';
import { ElectricalPowerTemplate } from './electrical-power/template';
import { LandscapingNaturalTemplate } from './landscaping-natural/template';
import { Site } from '@/lib/types/site-config';
import { ComponentType } from 'react';

// Template registry: maps template names to their component
const TEMPLATES: Record<string, ComponentType<{ site: Site }>> = {
  'roofing-premium': RoofingPremiumTemplate,
  'generic-modern': GenericModernTemplate,
  'plumbing-pro': PlumbingProTemplate,
  'hvac-comfort': HvacComfortTemplate,
  'electrical-power': ElectricalPowerTemplate,
  'landscaping-natural': LandscapingNaturalTemplate,
};

// Industry to default template mapping
const INDUSTRY_TEMPLATES: Record<string, string> = {
  generic: 'generic-modern',
  roofing: 'roofing-premium',
  plumbing: 'plumbing-pro',
  hvac: 'hvac-comfort',
  electrical: 'electrical-power',
  landscaping: 'landscaping-natural',
};

export function getTemplate(industry: string): ComponentType<{ site: Site }> | null {
  const templateKey = INDUSTRY_TEMPLATES[industry] || 'generic-modern';
  return TEMPLATES[templateKey] || null;
}

export function getTemplateByName(name: string): ComponentType<{ site: Site }> | null {
  return TEMPLATES[name] || null;
}
