import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase,
  Grid,
  Filter,
  ShieldCheck,
  Building2,
  HardHat,
  Compass,
  Paintbrush,
  Boxes,
  Users,
  Cog,
  Code,
  Calculator,
  Scale,
  Coins,
  Truck,
  Zap,
  Sprout,
  ShoppingBag,
  Megaphone,
  Sparkles,
  Shield
} from 'lucide-react';
import { RAW_CATEGORIES } from '../data/servicesCatalog';

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

const CategoriesPage = ({ onOpenEnquiry }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = RAW_CATEGORIES.filter(cat => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase().trim();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.services.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold shadow-sm">
            <Grid className="w-3.5 h-3.5 text-coral-500" />
            <span>20 Specialized Verticals • 400 Total Services</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-charcoal-950 tracking-tight">
            Complete Enterprise Service Verticals
          </h1>
          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
            From civil construction and MEP engineering to company compliance, logistics, farming setups, and security systems—explore our 20 specialized categories serving Karnataka.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search across all 20 categories or 400 service specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-gray-200 shadow-md text-sm text-charcoal-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none"
            />
          </div>
        </div>

        {/* Categories Display */}
        <div className="space-y-8">
          {filteredCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Briefcase;
            return (
              <div 
                key={cat.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-purple-100/70 text-purple-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                          Category #{cat.id}
                        </span>
                        <span className="text-xs font-bold text-coral-600 bg-coral-50 px-2 py-0.5 rounded-full">
                          20 Services
                        </span>
                      </div>
                      <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-charcoal-950">
                        {cat.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-2xl">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/services?category=${encodeURIComponent(cat.name)}`}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
                    >
                      <span>Explore Category Directory</span>
                      <ArrowRight className="w-3.5 h-3.5 text-yellow-300" />
                    </Link>
                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry(null, cat.name)}
                      className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-charcoal-800 text-xs font-bold transition-all"
                    >
                      Instant Quote
                    </button>
                  </div>
                </div>

                {/* 20 Services Grid inside the Category */}
                <div className="pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-4">
                    All 20 Services under {cat.name}:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {cat.services.map((srv, idx) => (
                      <Link
                        key={idx}
                        to={`/services?category=${encodeURIComponent(cat.name)}&search=${encodeURIComponent(srv)}`}
                        className="p-3 rounded-xl bg-[#F8F9FA] hover:bg-purple-50 hover:border-purple-300 border border-gray-200/80 transition-all flex items-center space-x-2 text-xs font-medium text-charcoal-800 hover:text-purple-700 group"
                      >
                        <span className="text-[10px] font-bold text-charcoal-400 group-hover:text-purple-600 w-5">
                          {idx + 1}.
                        </span>
                        <span className="truncate">{srv}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CategoriesPage;
