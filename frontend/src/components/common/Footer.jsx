import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

// Clean SVG Social Icons
const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Footer = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Government & Documentation', path: '/services/government-documentation' },
    { name: 'Business & Registration', path: '/services/business-registration' },
    { name: 'IT & Digital Solutions', path: '/services/it-digital-solutions' },
    { name: 'Property & Real Estate', path: '/services/property-real-estate' },
    { name: 'Marketing & Advertising', path: '/services/marketing-advertising' },
    { name: 'Event Management', path: '/services/event-management' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'All Services', path: '/services' },
    { name: 'Client Portfolio', path: '/portfolio' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  return (
    <footer className="bg-[#F1F3F5] text-charcoal-800 border-t border-gray-200">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-300 p-0.5 bg-black flex items-center justify-center flex-shrink-0 group-hover:border-purple-400 transition-all">
                <img
                  src={settings.logo_url || "/logo.jpg"}
                  alt={settings.company_name || "RANGA SRI ENTERPRISES"}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg text-charcoal-900 tracking-tight">
                  {settings.company_name}
                </span>
                <p className="text-[11px] text-purple-600 font-bold">
                  {settings.tagline}
                </p>
              </div>
            </Link>

            <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
              {settings.company_description}
            </p>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white text-charcoal-700 border border-gray-200 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Verified Independent Enterprise</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white text-charcoal-700 border border-gray-200 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-coral-500" />
                <span>100% Client Confidentiality</span>
              </span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center space-x-3">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-charcoal-600 hover:text-purple-600 hover:border-purple-300 shadow-sm transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              )}
              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-charcoal-600 hover:text-purple-600 hover:border-purple-300 shadow-sm transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              )}
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-charcoal-600 hover:text-purple-600 hover:border-purple-300 shadow-sm transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              )}
              {settings.twitter_url && (
                <a
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-charcoal-600 hover:text-purple-600 hover:border-purple-300 shadow-sm transition-all"
                  aria-label="Twitter/X"
                >
                  <TwitterIcon />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Our Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 border-b border-gray-200 pb-2">
              Integrated Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="flex items-center justify-between text-charcoal-600 hover:text-purple-600 transition-colors group font-medium"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 border-b border-gray-200 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-charcoal-600 hover:text-purple-600 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 border-b border-gray-200 pb-2">
              Head Office
            </h3>
            <div className="space-y-3 text-sm text-charcoal-600">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                <span className="leading-snug">{settings.business_address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <a href={`tel:${settings.contact_phone}`} className="hover:text-purple-600 font-semibold transition-colors">
                  {settings.contact_phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <a href={`mailto:${settings.contact_email}`} className="hover:text-purple-600 font-semibold transition-colors">
                  {settings.contact_email}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>{settings.working_hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Required Statutory Disclaimer Section */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <p className="text-xs text-charcoal-600 leading-relaxed">
              <strong className="text-charcoal-900">Statutory Notice: </strong>
              {settings.disclaimer_text || 'Ranga Sri Enterprises operates as an independent consultancy and service facilitation provider. We do not represent government departments or claim official statutory authority, guaranteed approvals, or licensed legal counsel. All services are procedural advisory and documentation facilitation.'}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 gap-4">
          <p>© {currentYear} {settings.company_name}. All rights reserved.</p>
          <div className="flex items-center space-x-6 font-medium">
            <Link to="/privacy-policy" className="hover:text-purple-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-purple-600 transition-colors">Terms of Service</Link>
            <Link to="/admin/login" className="text-purple-600 hover:text-purple-700 font-bold transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
