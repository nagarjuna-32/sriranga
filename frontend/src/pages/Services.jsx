import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ServiceCard from '../components/services/ServiceCard';
import CTASection from '../components/home/CTASection';
import { publicService } from '../services/publicService';
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  FileSearch, 
  Settings, 
  Sparkles,
  ClipboardList,
  CheckCircle,
  Headphones,
  Search,
  Filter,
  MapPin,
  Grid,
  Layers,
  ChevronDown,
  RotateCcw,
  MessageCircle
} from 'lucide-react';
import { RAW_CATEGORIES, ALL_SERVICES, KARNATAKA_DISTRICTS } from '../data/servicesCatalog';
import { useSettings } from '../context/SettingsContext';
import { createWhatsAppServiceDirectUrl } from '../utils/whatsapp';

const processSteps = [
  {
    step: '01',
    icon: FileSearch,
    title: 'Requirement & Quotation Request',
    description: 'Select any of our 400 services across Karnataka and submit your scope, timeline, or site specifications.',
  },
  {
    step: '02',
    icon: ClipboardList,
    title: 'Verified Specialist Matching',
    description: 'Our operations desk matches your project with verified contractors, licensed professionals, or certified suppliers in your district.',
  },
  {
    step: '03',
    icon: Settings,
    title: 'Itemized Quote & Milestone Agreement',
    description: 'Receive competitive, transparent itemized pricing with clear milestone deliverables and timeline accountability.',
  },
  {
    step: '04',
    icon: CheckCircle,
    title: 'Supervised Execution & Quality Assurance',
    description: 'Work is coordinated with on-ground quality inspections and regular milestone updates from your assigned manager.',
  },
  {
    step: '05',
    icon: Headphones,
    title: 'Client Sign-off & Ongoing Support',
    description: 'Final walkthrough inspection, warranty handover, and dedicated support for maintenance, repeat supply, or scaling.',
  },
];

const faqs = [
  {
    q: 'How does Ranga Sri Enterprises deliver across 20 categories and 400 services?',
    a: 'Ranga Sri Enterprises operates on an integrated coordination model. We maintain a verified network of licensed contractors, skilled trade teams, civil engineers, equipment owners, and certified agencies across all 31 districts of Karnataka, managing the entire project lifecycle with single-window accountability.',
  },
  {
    q: 'Can I book multiple services for a single construction or business setup project?',
    a: 'Yes! That is our primary core strength. For example, for a building project, we can coordinate architectural drawings, excavation JCBs, cement & TMT steel supply, masonry labour teams, and electrical panels under one coordinated invoice and project manager.',
  },
  {
    q: 'How are service providers and contractors verified?',
    a: 'All partner providers undergo verification of trade experience, past client track records, equipment readiness, and statutory documentation before receiving project assignments through our portal.',
  },
  {
    q: 'Are your services available in tier-2 and tier-3 Karnataka districts?',
    a: 'Yes. Our network spans all 31 districts—including Mysuru, Belagavi, Hubballi-Dharwad, Kalaburagi, Mangaluru, Ballari, Davanagere, Shimoga, Tumakuru, and rural taluks.',
  },
  {
    q: 'How quickly will I receive a quotation after submitting an enquiry?',
    a: 'Most standard service enquiries receive an initial assessment call and preliminary estimate within 2 to 4 business hours. For complex civil or turnkey industrial projects, a detailed itemized quote is provided following a site consultation.',
  },
];

const Services = ({ onOpenEnquiry }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { settings } = useSettings();

  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  // Filters from URL query or defaults
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || 'All Karnataka');

  // Sync state if URL changes
  useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('search')) setSearchQuery(searchParams.get('search'));
    if (searchParams.get('district')) setSelectedDistrict(searchParams.get('district'));
  }, [searchParams]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await publicService.getServices();
        if (res.success && res.data && res.data.length > 0) {
          setServicesList(res.data);
        } else {
          setServicesList(ALL_SERVICES);
        }
      } catch (err) {
        console.warn('Using client 400 catalog fallback:', err);
        setServicesList(ALL_SERVICES);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter 400 services in real time
  const filteredServices = useMemo(() => {
    let list = servicesList.length > 0 ? servicesList : ALL_SERVICES;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      const catLower = selectedCategory.toLowerCase().trim();
      list = list.filter(s => 
        (s.category && s.category.toLowerCase().includes(catLower)) ||
        (s.category_slug && s.category_slug.includes(catLower))
      );
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(s => 
        s.title.toLowerCase().includes(q) ||
        (s.short_description && s.short_description.toLowerCase().includes(q)) ||
        (s.category && s.category.toLowerCase().includes(q))
      );
    }

    return list;
  }, [servicesList, selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDistrict('All Karnataka');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Page Header */}
      <section className="bg-[#F1F3F5] text-charcoal-900 py-16 sm:py-20 relative overflow-hidden border-b border-gray-200">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold shadow-sm mb-4">
            <Layers className="w-3.5 h-3.5 text-coral-500" />
            <span>20 Main Categories • 400 Specialized Services</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-charcoal-950 mb-4">
            All 400 Enterprise Services
          </h1>
          <p className="text-charcoal-600 text-base sm:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            A single platform connecting individuals, business owners, contractors, and industries with verified service providers across all 31 districts of Karnataka.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold text-charcoal-600">
            <span className="bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              🏛️ 20 Core Categories
            </span>
            <span className="bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              📍 31 Karnataka Districts
            </span>
            <span className="bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              ⚡ Fast Itemized Quotations
            </span>
          </div>
        </div>
      </section>

      {/* Main Directory & Filter Interface */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Bar Controls */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm mb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Search input */}
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter 400 services by keyword (e.g. Masonry, Drip Irrigation, GST, PeB)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-[#F8F9FA] focus:bg-white text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-purple-600 outline-none transition-all text-charcoal-900"
                />
              </div>

              {/* Category dropdown */}
              <div className="md:col-span-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#F8F9FA] focus:bg-white text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-purple-600 outline-none text-charcoal-800 font-medium"
                >
                  <option value="All">All 20 Categories (400 Services)</option>
                  {RAW_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.id}. {cat.name} (20)
                    </option>
                  ))}
                </select>
              </div>

              {/* District dropdown */}
              <div className="md:col-span-3">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#F8F9FA] focus:bg-white text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-purple-600 outline-none text-charcoal-800 font-medium"
                >
                  {KARNATAKA_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      📍 {dist}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Quick Category Filter Pills */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === 'All'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-gray-100 text-charcoal-700 hover:bg-gray-200'
                  }`}
                >
                  All (400)
                </button>
                {RAW_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedCategory === cat.name
                        ? 'bg-purple-600 text-white shadow-sm font-bold'
                        : 'bg-gray-100 text-charcoal-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.name.split('&')[0]} ({cat.services.length})
                  </button>
                ))}
              </div>

              {(searchQuery || selectedCategory !== 'All' || selectedDistrict !== 'All Karnataka') && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-coral-600 hover:text-coral-800 font-bold flex items-center space-x-1 whitespace-nowrap flex-shrink-0 ml-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Results Counter Bar */}
            <div className="flex items-center justify-between text-xs text-charcoal-500 pt-1">
              <div>
                Showing <strong className="text-purple-700">{filteredServices.length}</strong> of <strong>400</strong> services in <span className="font-semibold text-charcoal-700">{selectedDistrict}</span>
              </div>
              <div className="hidden sm:block text-[11px] text-charcoal-400">
                Verified Provider Network • Direct WhatsApp Coordination
              </div>
            </div>
          </div>

          {/* 400 Services Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-white animate-pulse border border-gray-200"></div>
              ))}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 space-y-4">
              <Search className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-heading font-bold text-xl text-charcoal-900">
                No matching service found
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-500 max-w-md mx-auto">
                We couldn't find a service matching "{searchQuery}" under the selected filter. Try searching for a broader term or reset filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-all shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id || service.slug}
                  service={service}
                  selectedDistrict={selectedDistrict}
                  onOpenEnquiry={onOpenEnquiry}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Structured Delivery Process */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
              5-Step Delivery Workflow
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-950 tracking-tight">
              How We Execute With Precision
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
              From requirement definition to milestone inspection and verified contractor matching, our single-window platform ensures reliable outcomes across Karnataka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-200 hover:border-purple-300 shadow-sm relative group hover:bg-white transition-all duration-300"
                >
                  <div className="text-4xl font-extrabold font-heading text-purple-200 group-hover:text-purple-600/30 transition-colors mb-3">
                    {step.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-charcoal-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-[#F8F9FA] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Operational Clarity
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-950">
              Frequently Asked Questions
            </h2>
            <p className="text-charcoal-600 text-sm">
              Answers regarding our 20 categories, provider verification, and multi-service booking process.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between text-sm sm:text-base font-bold text-charcoal-900 hover:text-purple-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-purple-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-gray-100 pt-4 bg-[#F8F9FA]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};

export default Services;
