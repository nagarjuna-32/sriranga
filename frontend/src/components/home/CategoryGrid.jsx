import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  HardHat,
  Compass,
  Paintbrush,
  Boxes,
  Users,
  Cog,
  Building2,
  Briefcase,
  Code,
  Calculator,
  Scale,
  ShieldCheck,
  Coins,
  Truck,
  Zap,
  Sprout,
  ShoppingBag,
  Megaphone,
  Shield
} from 'lucide-react';
import { RAW_CATEGORIES } from '../../data/servicesCatalog';

// Map icon strings to Lucide components
const iconMap = {
  HardHat,
  Compass,
  Paintbrush,
  Boxes,
  Users,
  Cog,
  Building2,
  Briefcase,
  Code,
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

const CategoryGrid = ({ onOpenEnquiry }) => {
  return (
    <section className="py-20 bg-white border-b border-gray-200" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold shadow-sm">
            <Layers className="w-3.5 h-3.5 text-coral-500" />
            <span>Structured Multi-Service Architecture</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-950 tracking-tight">
            20 Main Service Categories
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
            Every category delivers 20 specialized, verified services—giving individuals, businesses, contractors, and industries complete end-to-end coverage across Karnataka.
          </p>
        </div>

        {/* 20 Categories Grid (4 columns on lg, 2 on md, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RAW_CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Briefcase;
            return (
              <div
                key={cat.id}
                className="group relative bg-[#F8F9FA] hover:bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100/70 text-purple-700 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                      #{cat.id}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-bold text-base sm:text-lg text-charcoal-950 group-hover:text-purple-700 transition-colors mb-2 line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-2 mb-4 font-normal">
                    {cat.description}
                  </p>

                  {/* Sample 3 Services */}
                  <div className="space-y-1.5 border-t border-gray-200/80 pt-3 mb-4 text-[11px] text-charcoal-700">
                    {cat.services.slice(0, 3).map((s, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 truncate">
                        <CheckCircle2 className="w-3 h-3 text-purple-600 flex-shrink-0" />
                        <span className="truncate">{s}</span>
                      </div>
                    ))}
                    <div className="text-[10px] text-purple-600 font-bold pl-4">
                      + 17 more services in this category
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/services?category=${encodeURIComponent(cat.name)}`}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center space-x-1"
                  >
                    <span>View 20 Services</span>
                    <ArrowRight className="w-3 h-3 text-yellow-500" />
                  </Link>

                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry(null, cat.name)}
                    className="text-[11px] text-charcoal-600 hover:text-purple-600 font-medium hover:underline"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Summary Callout */}
        <div className="mt-14 bg-gradient-to-r from-purple-50 via-white to-purple-50 rounded-2xl p-6 sm:p-8 border border-purple-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-lg text-charcoal-950">
              Need assistance selecting the right vertical or multiple services?
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Our central operations team coordinates turnkey requirements across any of our 20 categories in Karnataka.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/services"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition-all whitespace-nowrap"
            >
              Browse 400 Services Catalog
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;
