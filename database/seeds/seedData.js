const path = require('path');
const bcrypt = require(path.join(__dirname, '../../backend/node_modules/bcryptjs'));

const initialSettings = [
  { setting_key: 'company_name', setting_value: 'RANGA SRI ENTERPRISES', setting_group: 'general', description: 'Official company name' },
  { setting_key: 'tagline', setting_value: 'Your Trusted Partner for Business & Digital Solutions', setting_group: 'general', description: 'Company primary tagline' },
  { setting_key: 'main_headline', setting_value: 'Making Business Simpler. Making Ideas Happen.', setting_group: 'general', description: 'Hero section main headline' },
  { setting_key: 'company_description', setting_value: 'Ranga Sri Enterprises provides integrated professional services across government documentation, business registration, IT and digital solutions, property and real estate, marketing and advertising, and event management.', setting_group: 'general', description: 'Official company description' },
  { setting_key: 'contact_phone', setting_value: '+91 98450 12345', setting_group: 'contact', description: 'Primary contact phone number' },
  { setting_key: 'whatsapp_number', setting_value: '919845012345', setting_group: 'contact', description: 'WhatsApp contact number (country code without +)' },
  { setting_key: 'contact_email', setting_value: 'contact@rangasrienterprises.com', setting_group: 'contact', description: 'Primary business email address' },
  { setting_key: 'business_address', setting_value: 'Suite 302, Sri Krishna Towers, Outer Ring Road, Bengaluru, Karnataka 560103, India', setting_group: 'contact', description: 'Registered business address' },
  { setting_key: 'working_hours', setting_value: 'Monday to Saturday: 9:30 AM – 6:30 PM (Sunday Closed)', setting_group: 'contact', description: 'Business working hours' },
  { setting_key: 'facebook_url', setting_value: 'https://facebook.com/rangasrienterprises', setting_group: 'social', description: 'Facebook page link' },
  { setting_key: 'linkedin_url', setting_value: 'https://linkedin.com/company/rangasrienterprises', setting_group: 'social', description: 'LinkedIn profile link' },
  { setting_key: 'instagram_url', setting_value: 'https://instagram.com/rangasrienterprises', setting_group: 'social', description: 'Instagram handle link' },
  { setting_key: 'twitter_url', setting_value: 'https://x.com/rangasri_ent', setting_group: 'social', description: 'Twitter/X profile link' },
  { setting_key: 'google_maps_embed', setting_value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.589855589142!2d77.68351547590858!3d12.934057887377884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13b41984b655%3A0xb3bc872f2d9c4456!2sOuter%20Ring%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin', setting_group: 'contact', description: 'Google Maps Embed iframe source URL' },
  { setting_key: 'stats_projects_completed', setting_value: '1,200+', setting_group: 'statistics', description: 'Completed client requirements counter' },
  { setting_key: 'stats_client_satisfaction', setting_value: '99.4%', setting_group: 'statistics', description: 'Client satisfaction rate' },
  { setting_key: 'stats_expert_advisors', setting_value: '15+', setting_group: 'statistics', description: 'Professional specialists count' },
  { setting_key: 'stats_years_experience', setting_value: '10+', setting_group: 'statistics', description: 'Collective industry experience' },
  { setting_key: 'disclaimer_text', setting_value: 'Disclaimer: Ranga Sri Enterprises is an independent consultancy and service facilitation provider. We do not claim official government affiliation, authority or licensing unless explicitly specified. All government-related and administrative services are provided on a procedural assistance and facilitation basis.', setting_group: 'legal', description: 'Public footer legal disclaimer' },
];

const initialServices = [
  {
    title: 'Government & Documentation',
    slug: 'government-documentation',
    category: 'Documentation & Compliance',
    short_description: 'End-to-end guidance and procedural assistance for official paperwork, application filing, and administrative documentation.',
    full_description: 'Navigating government portals and compliance paperwork can be complex and time-consuming. Ranga Sri Enterprises provides structured, transparent procedural guidance and document preparation assistance. From drafting affidavits and coordinating gazette notifications to streamlining identity document applications and administrative certificates, our team ensures your submissions are accurate, complete, and filed correctly.\n\n*Please note: Ranga Sri Enterprises operates solely as an independent facilitation consultant and document coordinator. We do not issue government records or claim official statutory authority.',
    icon: 'FileText',
    features: [
      'Documentation assistance and file audit',
      'Application support for central and state citizen services',
      'Government-related service guidance and procedural advisory',
      'Document preparation assistance, drafting & formatting',
      'Administrative coordination & follow-up support'
    ],
    image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 1,
  },
  {
    title: 'Business & Registration',
    slug: 'business-registration',
    category: 'Corporate Solutions',
    short_description: 'Comprehensive business setup guidance, firm structuring, registration coordination, and corporate documentation.',
    full_description: 'Laying a solid corporate foundation is critical for any emerging venture. We assist entrepreneurs and established enterprises with structuring guidance, business registrations, partnership deeds, MSME/Udyam filings, and local commercial registrations. We walk alongside you from name validation through complete compliance paperwork, saving you valuable time to focus on scaling your business.',
    icon: 'Building2',
    features: [
      'Business registration assistance & entity structuring',
      'Company setup guidance for proprietorships, LLPs & private firms',
      'Business documentation & partnership deed drafting support',
      'Registration-related support & compliance advisory',
      'Business consulting for operational readiness'
    ],
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 2,
  },
  {
    title: 'IT & Digital Solutions',
    slug: 'it-digital-solutions',
    category: 'Technology',
    short_description: 'Modern website development, enterprise web design, bespoke software systems, and digital transformation.',
    full_description: 'Elevate your brand with cutting-edge digital experiences engineered for performance and growth. Ranga Sri Enterprises designs and builds ultra-fast, responsive web applications, corporate websites, e-commerce platforms, and internal business tools. We also provide full-cycle IT maintenance, cloud hosting guidance, cyber hygiene audits, and strategic digital transformation solutions.',
    icon: 'Code',
    features: [
      'Modern, responsive website development (React, Next.js, Node)',
      'Enterprise UI/UX web design & branding alignment',
      'Custom software solutions & business workflow automation',
      'Comprehensive digital transformation & cloud adoption',
      'Continuous IT support, maintenance & security audits',
      'Omnichannel digital services & API integrations'
    ],
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 3,
  },
  {
    title: 'Property & Real Estate',
    slug: 'property-real-estate',
    category: 'Real Estate Support',
    short_description: 'Professional property assistance, listing promotion, documentation coordination, and commercial enquiry support.',
    full_description: 'Whether you are buying, leasing, or monetizing commercial or residential properties, precision in documentation and market visibility are paramount. We assist property owners, buyers, and tenants with document organization, encumbrance verification coordination, property listing visibility, and prospect enquiry coordination with utmost integrity.',
    icon: 'Home',
    features: [
      'Property assistance & transaction guidance',
      'Real estate support for residential & commercial assets',
      'Targeted property listing promotion across digital networks',
      'Property enquiry coordination & buyer-seller communication',
      'Documentation coordination & verification file assembly'
    ],
    image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 4,
  },
  {
    title: 'Marketing & Advertising',
    slug: 'marketing-advertising',
    category: 'Growth & Branding',
    short_description: 'Data-driven digital marketing, brand identity creation, social media growth, and multi-channel ad campaigns.',
    full_description: 'Transform market visibility into measurable revenue. Our creative and marketing specialists craft tailored campaigns spanning search engine marketing, targeted social media management, brand collateral design, print advertising, and local market promotions. We position your brand as an authority in your niche.',
    icon: 'TrendingUp',
    features: [
      'Full-funnel digital marketing & search engine optimization',
      'Social media management & engaging audience growth',
      'Comprehensive corporate branding & visual identity guidelines',
      'High-ROI advertising campaigns across Google & Meta',
      'Creative design: brochures, catalogs, banners & presentations',
      'Strategic business promotion & influencer outreach'
    ],
    image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 5,
  },
  {
    title: 'Event Management',
    slug: 'event-management',
    category: 'Events & Experiences',
    short_description: 'Flawless execution of corporate conferences, grand birthday celebrations, weddings, and premium stage decor.',
    full_description: 'Make every corporate milestone or personal celebration unforgettable. From concept creation and venue selection to audiovisual coordination, artist management, bespoke stage styling, and guest hospitality, Ranga Sri Enterprises orchestrates turnkey events that run like clockwork.',
    icon: 'Calendar',
    features: [
      'Corporate events, product launches, summits & seminars',
      'Memorable birthday celebrations & themed family gatherings',
      'Grand wedding events & traditional reception coordination',
      'End-to-end event planning, scheduling & vendor oversight',
      'Flawless on-ground event coordination & hospitality',
      'Custom stage styling, floral artistry & decoration coordination'
    ],
    image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 6,
  },
];

const initialPortfolio = [
  {
    title: 'Enterprise Fintech Customer Portal',
    category: 'IT & Digital',
    description: 'Developed an enterprise-grade responsive customer portal and dashboard featuring bank-level security, analytics, and instant KYC document workflows.',
    client_name: 'Apex Financial Services',
    project_date: 'Q2 2025',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'Node.js', 'Dashboard', 'Fintech'],
    is_featured: true,
  },
  {
    title: 'Multi-Unit Commercial Entity Registration & Setup',
    category: 'Business & Registration',
    description: 'Structured corporate filings, drafted founder documentation, and facilitated regulatory compliance clearances for a multi-city retail franchise.',
    client_name: 'Vanguard Retail Ventures',
    project_date: 'Q3 2025',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    tags: ['Incorporation', 'Compliance', 'Advisory'],
    is_featured: true,
  },
  {
    title: 'Global Tech Leadership Summit 2025',
    category: 'Event Management',
    description: 'Coordinated a 2-day corporate conference hosting 650+ delegates with complete AV staging, keynote speaker facilitation, and executive dinner gala.',
    client_name: 'NexGen Innovations Forum',
    project_date: 'Q4 2025',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    tags: ['Corporate Event', 'Audio-Visual', 'Hospitality'],
    is_featured: true,
  },
  {
    title: 'Omnichannel Digital Rebranding & Performance Campaign',
    category: 'Marketing & Advertising',
    description: 'Engineered a modern visual identity, logo refresh, and 90-day multi-channel digital acquisition campaign yielding a 210% increase in qualified inquiries.',
    client_name: 'Sovereign Healthcare',
    project_date: 'Q1 2026',
    image_url: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1000&q=80',
    tags: ['Brand Identity', 'Meta Ads', 'SEO Campaign'],
    is_featured: true,
  },
  {
    title: 'Commercial Office Space Listing & Promotion',
    category: 'Property & Real Estate',
    description: 'Facilitated digital marketing campaign, brochure design, and inquiry coordination for a 45,000 sq.ft grade-A commercial tech park floor.',
    client_name: 'Greenfield Realty Developers',
    project_date: 'Q2 2026',
    image_url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80',
    tags: ['Commercial Real Estate', 'Lead Coordination'],
    is_featured: false,
  },
  {
    title: 'Statutory Documentation Audit & Dossier Assembly',
    category: 'Government & Documentation',
    description: 'Provided procedural documentation advisory and file preparation for 140+ employee regulatory verification submissions without delays.',
    client_name: 'Kavita Logistical Logistics',
    project_date: 'Q3 2026',
    image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    tags: ['Documentation Audit', 'Procedural Advisory'],
    is_featured: false,
  },
];

const initialTestimonials = [
  {
    client_name: 'Rajesh Subramanian',
    designation: 'Managing Director',
    company: 'Trident Logistics Group',
    content: 'Ranga Sri Enterprises took total ownership of our corporate registration and technology requirements. Their professionalism, transparent timelines, and prompt communication made our expansion effortless.',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'approved',
  },
  {
    client_name: 'Sunita Reddy',
    designation: 'Founder & CEO',
    company: 'Aura Lifestyle & Interiors',
    content: 'Their digital marketing and web development team built our brand from the ground up. Inquiries started coming through within two weeks of launch. Highly recommended for any serious business.',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    status: 'approved',
  },
  {
    client_name: 'Vikram Joshi',
    designation: 'Head of People & Operations',
    company: 'Zenith BioTech',
    content: 'We entrusted Ranga Sri Enterprises with our annual corporate conclave. From stage setups to guest coordination, every minute detail was flawlessly executed. Exceptional service standards.',
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
  initialServices,
  initialPortfolio,
  initialTestimonials,
  getHashedAdminPassword,
};
