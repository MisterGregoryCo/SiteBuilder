// TypeScript interfaces for the ProSet Site Builder

export interface SiteConfig {
  meta: {
    title: string;
    description: string;
    og_image?: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta_text: string;
    cta_phone: string;
    background_image: string;
  };
  services: ServiceItem[];
  about: {
    headline: string;
    body: string;
    image: string;
    stats: StatItem[];
  };
  contact: {
    headline: string;
    subtext?: string;
    form_fields: string[];
    phone: string;
    email: string;
  };
  footer: {
    business_name: string;
    tagline: string;
  };
}

export interface ServiceItem {
  name: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Site {
  id: string;
  slug: string;
  business_name: string;
  business_phone: string;
  business_email: string;
  business_city: string;
  business_state: string | null;
  industry: string;
  services: ServiceItem[];
  template_id: string;
  site_config: SiteConfig;
  status: 'draft' | 'published' | 'archived';
  created_by: string;
  lead_id: string | null;
  client_id: string | null;
  partner_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteTemplate {
  id: string;
  name: string;
  industry: string;
  description: string | null;
  thumbnail_url: string | null;
  layout_config: Record<string, unknown>;
  color_scheme: ColorScheme;
  stock_photos: StockPhotos;
  font_config: FontConfig;
  is_active: boolean;
  created_at: string;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textLight: string;
  heroOverlay: string;
}

export interface StockPhotos {
  hero: string;
  about: string;
  services: string[];
  gallery: string[];
}

export interface FontConfig {
  heading: string;
  body: string;
  headingWeight: string;
  bodyWeight: string;
}

export interface FormSubmission {
  id: string;
  site_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  service_interest: string | null;
  source_page: string | null;
  ip_address: string | null;
  created_at: string;
}

export interface IntakeFormData {
  business_name: string;
  business_phone: string;
  business_email: string;
  business_city: string;
  business_state: string;
  industry: string;
  services: string[];
  logo_url?: string;
}

export const INDUSTRIES = [
  { value: 'roofing', label: 'Roofing / Construction' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'landscaping', label: 'Landscaping' },
] as const;

export const INDUSTRY_SERVICES: Record<string, string[]> = {
  roofing: [
    'Roof Replacement',
    'Roof Repair',
    'Storm Damage Repair',
    'Roof Inspection',
    'Gutter Installation',
    'Gutter Repair',
    'Siding Installation',
    'Emergency Roof Repair',
    'Commercial Roofing',
    'Metal Roofing',
    'Flat Roof Systems',
    'Shingle Roofing',
  ],
  plumbing: [
    'Drain Cleaning',
    'Water Heater Repair',
    'Water Heater Installation',
    'Pipe Repair',
    'Sewer Line Service',
    'Bathroom Remodeling',
    'Kitchen Plumbing',
    'Emergency Plumbing',
    'Leak Detection',
    'Water Filtration',
  ],
  hvac: [
    'AC Repair',
    'AC Installation',
    'Heating Repair',
    'Furnace Installation',
    'Duct Cleaning',
    'HVAC Maintenance',
    'Heat Pump Service',
    'Indoor Air Quality',
    'Thermostat Installation',
    'Emergency HVAC Service',
  ],
  electrical: [
    'Electrical Repair',
    'Panel Upgrade',
    'Wiring Installation',
    'Lighting Installation',
    'Outlet Installation',
    'Ceiling Fan Installation',
    'Generator Installation',
    'EV Charger Installation',
    'Safety Inspection',
    'Emergency Electrical Service',
  ],
  landscaping: [
    'Lawn Care',
    'Landscape Design',
    'Tree Trimming',
    'Irrigation Systems',
    'Hardscaping',
    'Mulching',
    'Sod Installation',
    'Drainage Solutions',
    'Outdoor Lighting',
    'Seasonal Cleanup',
  ],
};

export const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];
