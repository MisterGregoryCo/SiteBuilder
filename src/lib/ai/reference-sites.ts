/**
 * Industry reference sites — premium examples the AI studies
 * before generating copy. These set the quality benchmark.
 *
 * Add URLs here and the AI will fetch + analyze them during generation.
 */

export const INDUSTRY_REFERENCE_SITES: Record<string, string[]> = {
  // Universal benchmarks — studied for ALL industries
  // These set the overall design/copy quality bar
  _default: [
    'https://teamproset.com',
    'https://www.cosmos.so',
    'https://apple.com',
  ],

  generic: [
    'https://legendarylifestyles.com',
  ],

  roofing: [
    'https://www.wolberts.com',
  ],

  plumbing: [
    // Add premium plumbing company sites here
  ],

  hvac: [
    // Add premium HVAC company sites here
  ],

  electrical: [
    // Add premium electrical company sites here
  ],

  landscaping: [
    'https://grovepark.com',
  ],
};

/**
 * Get all reference sites for a given industry.
 * Returns the industry-specific sites + the universal defaults.
 */
export function getReferenceSites(industry: string): string[] {
  const defaults = INDUSTRY_REFERENCE_SITES._default || [];
  const industrySites = INDUSTRY_REFERENCE_SITES[industry] || [];
  return [...defaults, ...industrySites];
}
