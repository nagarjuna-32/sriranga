const path = require('path');
const bcrypt = require(path.join(__dirname, '../../backend/node_modules/bcryptjs'));
const { ALL_SERVICES, RAW_CATEGORIES } = require('../../backend/src/data/servicesCatalog');

const initialSettings = [
  { setting_key: 'company_name', setting_value: 'RANGA SRI ENTERPRISES', setting_group: 'general', description: 'Official company name' },
  { setting_key: 'logo_url', setting_value: '/logo.jpg', setting_group: 'general', description: 'Official enterprise brand logo image URL' },
  { setting_key: 'tagline', setting_value: 'ONE-STOP SOLUTION FOR EVERY NEED', setting_group: 'general', description: 'Company primary tagline' },
  { setting_key: 'main_headline', setting_value: 'EVERY SERVICE. ONE CONNECTION. Connecting You to Opportunities.', setting_group: 'general', description: 'Hero section main headline' },
  { setting_key: 'vision', setting_value: 'To provide a single platform where individuals, business owners, companies, contractors and industries can access almost every type of service under one roof across Karnataka and eventually throughout India.', setting_group: 'general', description: 'Official vision statement' },
  { setting_key: 'business_model', setting_value: 'Ranga Sri Enterprises connects customers with verified service providers, contractors, professionals, suppliers and agencies. We coordinate requirements, quotations, service delivery and customer support.', setting_group: 'general', description: 'Operational business model' },
  { setting_key: 'company_description', setting_value: 'Ranga Sri Enterprises is Karnataka’s premier integrated multi-service platform connecting individuals, companies, contractors, and industries with verified providers across 20 main categories and 400 specialized services.', setting_group: 'general', description: 'Official company description' },
  { setting_key: 'contact_phone', setting_value: '+91 98450 12345', setting_group: 'contact', description: 'Primary contact phone number' },
  { setting_key: 'whatsapp_number', setting_value: '919845012345', setting_group: 'contact', description: 'WhatsApp contact number (country code without +)' },
  { setting_key: 'contact_email', setting_value: 'contact@rangasrienterprises.com', setting_group: 'contact', description: 'Primary business email address' },
  { setting_key: 'business_address', setting_value: 'Suite 302, Sri Krishna Towers, Outer Ring Road, Bengaluru, Karnataka 560103, India', setting_group: 'contact', description: 'Registered business address' },
  { setting_key: 'working_hours', setting_value: 'Monday to Saturday: 9:00 AM – 7:30 PM (Sunday On-call Support)', setting_group: 'contact', description: 'Business working hours' },
  { setting_key: 'facebook_url', setting_value: 'https://facebook.com/rangasrienterprises', setting_group: 'social', description: 'Facebook page link' },
  { setting_key: 'linkedin_url', setting_value: 'https://linkedin.com/company/rangasrienterprises', setting_group: 'social', description: 'LinkedIn profile link' },
  { setting_key: 'instagram_url', setting_value: 'https://instagram.com/rangasrienterprises', setting_group: 'social', description: 'Instagram handle link' },
  { setting_key: 'twitter_url', setting_value: 'https://x.com/rangasri_ent', setting_group: 'social', description: 'Twitter/X profile link' },
  { setting_key: 'google_maps_embed', setting_value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.589855589142!2d77.68351547590858!3d12.934057887377884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13b41984b655%3A0xb3bc872f2d9c4456!2sOuter%20Ring%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin', setting_group: 'contact', description: 'Google Maps Embed iframe source URL' },
  { setting_key: 'stats_projects_completed', setting_value: '10,000+', setting_group: 'statistics', description: 'Completed client requirements counter' },
  { setting_key: 'stats_client_satisfaction', setting_value: '99.6%', setting_group: 'statistics', description: 'Client satisfaction rate' },
  { setting_key: 'stats_expert_advisors', setting_value: '500+', setting_group: 'statistics', description: 'Verified partner network count' },
  { setting_key: 'stats_districts_count', setting_value: '31 Districts', setting_group: 'statistics', description: 'Karnataka district coverage' },
  { setting_key: 'stats_categories_count', setting_value: '20', setting_group: 'statistics', description: 'Main service categories' },
  { setting_key: 'stats_services_count', setting_value: '400', setting_group: 'statistics', description: 'Total specialized services' },
  { setting_key: 'disclaimer_text', setting_value: 'Disclaimer: Ranga Sri Enterprises is an independent coordination and multi-service facilitation platform connecting customers with verified trade contractors, licensed professionals, and commercial agencies across Karnataka.', setting_group: 'legal', description: 'Public footer legal disclaimer' },
];

const initialCategories = RAW_CATEGORIES.map(c => ({
  name: c.name,
  slug: c.slug,
  icon: c.icon,
  description: c.description,
  display_order: c.id,
  is_active: true
}));

const initialServices = ALL_SERVICES;

const initialPortfolio = [
  {
    title: 'G+3 Commercial Complex Construction',
    category: 'Construction & Civil Works',
    client_name: 'Vanguard Retail Parks',
    completion_date: '2026-08-15',
    description: 'Turnkey architectural planning, foundation excavation, RCC structure, and modern glass facade completion across 32,000 sq.ft in Bengaluru Urban.',
    image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80',
    project_url: '',
    is_featured: true,
    display_order: 1,
  },
  {
    title: '50-Acre Drip Irrigation & Solar Pumping Setup',
    category: 'Agriculture & Farming',
    client_name: 'Kaveri Agro Tech Farms',
    completion_date: '2026-06-20',
    description: 'Precision automated drip irrigation installation with solar borewell pump integration and high-yield crop advisory across Mandya and Mysuru districts.',
    image_url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
    project_url: '',
    is_featured: true,
    display_order: 2,
  },
  {
    title: 'Corporate HQ Turnkey Interiors & Fit-Out',
    category: 'Interior & Exterior Solutions',
    client_name: 'FinFlow Global Systems',
    completion_date: '2026-09-10',
    description: 'Complete workspace interior architecture featuring acoustic modular glass partitions, ergonomic workstations, and integrated smart LED lighting for 180 employees.',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    project_url: '',
    is_featured: true,
    display_order: 3,
  },
  {
    title: 'Enterprise Multi-Branch ERP & Cloud Migration',
    category: 'IT, Software & Digital Technology',
    client_name: 'Apex Industrial Logistics',
    completion_date: '2026-07-05',
    description: 'End-to-end cloud ERP deployment, warehouse barcode automation, and custom driver route mobile apps deployed across 8 district distribution hubs in Karnataka.',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    project_url: '',
    is_featured: true,
    display_order: 4,
  },
  {
    title: 'Statewide Heavy Crane & Machinery Rental Fleet',
    category: 'Machinery & Equipment Rental',
    client_name: 'Karnataka Highway Builders',
    completion_date: '2026-05-18',
    description: 'Coordinated long-term rental and deployment of 6 hydraulic cranes, 12 tippers, and heavy earthmoving excavators with certified operators.',
    image_url: 'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?auto=format&fit=crop&w=800&q=80',
    project_url: '',
    is_featured: true,
    display_order: 5,
  },
  {
    title: 'Industrial Safety Audit & Fire NOC Certification',
    category: 'Security & Safety Services',
    client_name: 'Precision Forge Ltd',
    completion_date: '2026-04-12',
    description: 'Comprehensive industrial risk assessment, automated sprinkler installation, emergency evacuation mapping, and successful Fire NOC clearance in Belagavi.',
    image_url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    project_url: '',
    is_featured: true,
    display_order: 6,
  },
];

const initialTestimonials = [
  {
    client_name: 'Rajesh Gowda',
    designation: 'Managing Director',
    company: 'Gowda Infrastructure Projects',
    content: 'Ranga Sri Enterprises is genuinely a one-stop powerhouse. From sourcing JCB rentals and TMT steel to arranging certified electrical contractors on our site in Mysuru, they solved all our coordination headaches.',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'approved',
  },
  {
    client_name: 'Sunita Reddy',
    designation: 'Co-Founder & COO',
    company: 'Aura Lifestyle & Retail',
    content: 'When we expanded our retail showrooms into Hubballi and Belagavi, Ranga Sri Enterprises managed our trade licenses, shop registrations, commercial interiors, and security CCTV setups with unmatched punctuality.',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    status: 'approved',
  },
  {
    client_name: 'Dr. Suresh Patil',
    designation: 'Director',
    company: 'Patil Agro Orchards',
    content: 'Finding trustworthy agricultural machinery and solar irrigation contractors was always frustrating until we connected with Ranga Sri Enterprises. Their single-window coordination is truly transforming Karnataka.',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'approved',
  },
];

const getHashedAdminPassword = async () => {
  return await bcrypt.hash('Admin@RangaSri2026!', 10);
};

module.exports = {
  initialSettings,
  initialCategories,
  initialServices,
  initialPortfolio,
  initialTestimonials,
  getHashedAdminPassword,
};
