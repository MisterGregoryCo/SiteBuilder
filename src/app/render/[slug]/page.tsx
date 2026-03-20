import { resolveSite } from '@/lib/resolve-site';
import { getTemplate } from '@/templates';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = await resolveSite(slug);

  if (!site) return { title: 'Site Not Found' };

  return {
    title: site.site_config.meta.title,
    description: site.site_config.meta.description,
    openGraph: {
      title: site.site_config.meta.title,
      description: site.site_config.meta.description,
      images: site.site_config.meta.og_image ? [site.site_config.meta.og_image] : [],
    },
  };
}

export default async function RenderedSitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await resolveSite(slug);

  if (!site) {
    notFound();
  }

  const TemplateComponent = getTemplate(site.industry);

  if (!TemplateComponent) {
    notFound();
  }

  return <TemplateComponent site={site} />;
}
