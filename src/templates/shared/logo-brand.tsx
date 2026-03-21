'use client';

/**
 * Shared logo/brand component for all templates.
 * Shows uploaded logo image when available, falls back to text.
 */
export function LogoBrand({
  logoUrl,
  businessName,
  color = '#FFFFFF',
  fontFamily,
  className = '',
}: {
  logoUrl?: string;
  businessName: string;
  color?: string;
  fontFamily?: string;
  className?: string;
}) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={businessName}
        className={`h-8 md:h-10 w-auto object-contain ${className}`}
      />
    );
  }

  return (
    <span
      className={`text-lg font-bold tracking-tight ${className}`}
      style={{ color, fontFamily }}
    >
      {businessName}
    </span>
  );
}
