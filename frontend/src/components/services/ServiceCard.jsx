import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Building2, 
  Code, 
  Home, 
  TrendingUp, 
  Calendar, 
  ArrowRight, 
  Check, 
  Briefcase,
  MessageCircle,
  HardHat,
  Compass,
  Paintbrush,
  Boxes,
  Users,
  Cog,
  Calculator,
  Scale,
  ShieldCheck,
  Coins,
  Truck,
  Zap,
  Sprout,
  ShoppingBag,
  Megaphone,
  Sparkles,
  Shield,
  MapPin
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { createWhatsAppServiceDirectUrl } from '../../utils/whatsapp';

const iconMap = {
  FileText,
  Building2,
  Code,
  Home,
  TrendingUp,
  Calendar,
  Briefcase,
  HardHat,
  Compass,
  Paintbrush,
  Boxes,
  Users,
  Cog,
  Calculator,
  Scale,
  ShieldCheck,
  Coins,
  Truck,
  Zap,
  Sprout,
  ShoppingBag,
  Megaphone,
  Sparkles,
  Shield
};

const ServiceCard = ({ service, selectedDistrict = 'All Karnataka', onOpenEnquiry }) => {
  const { settings } = useSettings();
  const IconComponent = iconMap[service.icon] || Briefcase;
  const features = Array.isArray(service.features) ? service.features : [];

  const directWhatsAppUrl = createWhatsAppServiceDirectUrl(
    settings.whatsapp_number,
    service,
    selectedDistrict
  );

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative transform hover:-translate-y-1">
      {/* Top Accent Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-coral-500 to-yellow-500"></div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Header with Icon and Category */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 truncate max-w-[170px]">
            {service.category || 'Multi-Service'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold font-heading text-charcoal-900 group-hover:text-purple-600 transition-colors mb-2 line-clamp-2">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-charcoal-600 leading-relaxed mb-4 line-clamp-3 font-normal">
          {service.short_description}
        </p>

        {/* District & Network Coverage Badge */}
        <div className="mb-4 flex items-center space-x-1.5 text-[11px] text-charcoal-500 bg-[#F8F9FA] px-2.5 py-1 rounded-lg border border-gray-200/80">
          <MapPin className="w-3 h-3 text-coral-500 flex-shrink-0" />
          <span className="truncate">Active in {selectedDistrict}</span>
        </div>

        {/* Features List */}
        <div className="mb-4 flex-1">
          <ul className="space-y-1.5">
            {features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start text-[11px] text-charcoal-700 font-medium">
                <div className="w-3.5 h-3.5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mr-1.5 mt-0.5 flex-shrink-0 border border-purple-200">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="leading-tight truncate">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-5 py-3.5 bg-[#F8F9FA] border-t border-gray-100 flex items-center justify-between gap-2">
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all flex items-center space-x-1"
          title="Direct WhatsApp Enquiry"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        <div className="flex items-center space-x-2">
          <Link
            to={`/services/${service.slug}`}
            className="text-xs font-semibold text-charcoal-600 hover:text-purple-600 px-2 py-1"
          >
            Details
          </Link>

          <button
            onClick={() => onOpenEnquiry && onOpenEnquiry(service.title, service.category, selectedDistrict)}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all whitespace-nowrap"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
