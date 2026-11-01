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
  Briefcase 
} from 'lucide-react';

const iconMap = {
  FileText: FileText,
  Building2: Building2,
  Code: Code,
  Home: Home,
  TrendingUp: TrendingUp,
  Calendar: Calendar,
  Briefcase: Briefcase,
};

const ServiceCard = ({ service, onOpenEnquiry }) => {
  const IconComponent = iconMap[service.icon] || Briefcase;
  const features = Array.isArray(service.features) ? service.features : [];

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between overflow-hidden relative transform hover:-translate-y-1">
      {/* Top Accent Line - Vibrant Purple -> Coral -> Yellow */}
      <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 via-coral-500 to-yellow-500 transform origin-left transition-all duration-500"></div>

      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        {/* Header with Icon and Category */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
            <IconComponent className="w-7 h-7" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-700 bg-[#F1F3F5] px-3 py-1 rounded-full border border-gray-200">
            {service.category || 'Professional Service'}
          </span>
        </div>

        {/* Title - Charcoal text with purple hover */}
        <h3 className="text-xl font-bold font-heading text-charcoal-900 group-hover:text-purple-600 transition-colors mb-2.5">
          {service.title}
        </h3>

        {/* Short Description - Secondary Charcoal Text */}
        <p className="text-sm text-charcoal-600 leading-relaxed mb-6 line-clamp-3">
          {service.short_description}
        </p>

        {/* Features List */}
        <div className="mb-6 flex-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-3">
            Key Solutions Included:
          </h4>
          <ul className="space-y-2">
            {features.slice(0, 4).map((feat, idx) => (
              <li key={idx} className="flex items-start text-xs text-charcoal-700 font-medium">
                <div className="w-4 h-4 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 border border-purple-200">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="leading-tight">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-6 py-4 bg-[#F8F9FA] border-t border-gray-100 flex items-center justify-between gap-3">
        <Link
          to={`/services/${service.slug}`}
          className="text-xs font-bold text-purple-600 hover:text-purple-700 inline-flex items-center space-x-1 transition-colors"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <button
          onClick={() => onOpenEnquiry && onOpenEnquiry(service.title)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm hover:shadow-purple-glow transition-all"
        >
          Enquire Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
