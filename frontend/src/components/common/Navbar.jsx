import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Clock, 
  Menu, 
  X, 
  ArrowRight, 
  MessageCircle, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { createWhatsAppChatUrl } from '../../utils/whatsapp';

const Navbar = ({ onOpenEnquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesDropdown(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { 
      name: 'Services', 
      path: '/services',
      hasDropdown: true,
      subServices: [
        { name: 'Government & Documentation', path: '/services/government-documentation' },
        { name: 'Business & Registration', path: '/services/business-registration' },
        { name: 'IT & Digital Solutions', path: '/services/it-digital-solutions' },
        { name: 'Property & Real Estate', path: '/services/property-real-estate' },
        { name: 'Marketing & Advertising', path: '/services/marketing-advertising' },
        { name: 'Event Management', path: '/services/event-management' },
      ]
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  const whatsappUrl = createWhatsAppChatUrl(settings.whatsapp_number);

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Strip - Soft Light Gray with Charcoal Text */}
      <div className="bg-[#F1F3F5] text-charcoal-700 text-xs border-b border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a 
              href={`tel:${settings.contact_phone}`} 
              className="flex items-center space-x-1.5 hover:text-purple-600 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-purple-600" />
              <span>{settings.contact_phone}</span>
            </a>
            <a 
              href={`mailto:${settings.contact_email}`} 
              className="flex items-center space-x-1.5 hover:text-purple-600 transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-purple-600" />
              <span>{settings.contact_email}</span>
            </a>
            <div className="flex items-center space-x-1.5 text-charcoal-500">
              <Clock className="w-3.5 h-3.5 text-charcoal-400" />
              <span>{settings.working_hours}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-emerald-700 hover:text-emerald-800 transition-colors font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>
            <span className="text-gray-300">|</span>
            <Link to="/admin/login" className="hover:text-purple-600 transition-colors text-charcoal-500 font-medium">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Crisp White with Charcoal Text & Vibrant Accents */}
      <nav className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200' 
          : 'bg-white border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-200 group-hover:border-purple-500 transition-all flex-shrink-0 bg-black flex items-center justify-center p-0.5">
                <img
                  src={settings.logo_url || "/logo.jpg"}
                  alt={settings.company_name || "RANGA SRI ENTERPRISES"}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg md:text-xl tracking-tight text-charcoal-900 group-hover:text-purple-600 transition-colors">
                  {settings.company_name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold">
                  Business & Digital Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div 
                      key={link.name} 
                      className="relative"
                      onMouseEnter={() => setServicesDropdown(true)}
                      onMouseLeave={() => setServicesDropdown(false)}
                    >
                      <Link
                        to={link.path}
                        className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center space-x-1 ${
                          isActive(link.path)
                            ? 'text-purple-600 bg-purple-50 font-bold'
                            : 'text-charcoal-700 hover:text-purple-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-purple-600' : 'text-charcoal-400'}`} />
                      </Link>

                      {/* Dropdown Menu */}
                      {servicesDropdown && (
                        <div className="absolute top-full left-0 w-72 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-fadeIn">
                          <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-purple-600 border-b border-gray-100 flex items-center justify-between">
                            <span>Enterprise Services</span>
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          </div>
                          {link.subServices.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="block px-4 py-2.5 text-xs font-medium text-charcoal-700 hover:text-purple-600 hover:bg-purple-50/60 hover:border-l-2 hover:border-purple-600 transition-all"
                            >
                              {sub.name}
                            </Link>
                          ))}
                          <div className="p-2 border-t border-gray-100 mt-1">
                            <Link
                              to="/services"
                              className="block text-center text-xs text-purple-600 hover:text-purple-700 font-bold py-1"
                            >
                              View All 6 Solutions →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'text-purple-600 bg-purple-50 font-bold'
                        : 'text-charcoal-700 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Action Buttons - Vibrant Purple Accent */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md hover:shadow-purple-glow transition-all transform hover:-translate-y-0.5"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4 text-yellow-300" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg font-bold"
              >
                Enquire
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-charcoal-700 hover:text-charcoal-900 hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.path}
                  className={`block px-3 py-2 rounded-lg text-base font-semibold ${
                    isActive(link.path)
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-charcoal-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-6 space-y-1 mt-1 border-l-2 border-purple-100 ml-3">
                    {link.subServices.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block py-1.5 text-xs text-charcoal-600 hover:text-purple-600"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4 text-yellow-300" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
