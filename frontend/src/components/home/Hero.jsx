import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle, 
  Zap, 
  Sparkles, 
  Layers,
  PhoneCall,
  Clock,
  Search,
  MapPin,
  Grid,
  UserCheck,
  Building2,
  HardHat,
  ChevronRight
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { RAW_CATEGORIES, KARNATAKA_DISTRICTS } from '../../data/servicesCatalog';

const Hero = ({ onOpenEnquiry }) => {
  const { settings } = useSettings();
  const navigate = useNavigate();

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All Karnataka');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchTerm.trim()) queryParams.set('search', searchTerm.trim());
    if (selectedCategory !== 'All') queryParams.set('category', selectedCategory);
    if (selectedDistrict !== 'All Karnataka') queryParams.set('district', selectedDistrict);
    navigate(`/services?${queryParams.toString()}`);
  };

  return (
    <div className="relative bg-[#F8F9FA] text-charcoal-900 overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-gray-200">
      {/* Background ambient light glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-coral-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-yellow-100/50 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Subtle clean grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Centered Headline Section */}
        <div className="text-center max-w-4xl mx-auto space-y-5 mb-10">
          
          {/* Pill Tagline */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-coral-500" />
            <span>{settings.tagline || 'ONE-STOP SOLUTION FOR EVERY NEED'}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-charcoal-950 tracking-tight leading-[1.12]">
            EVERY SERVICE. ONE CONNECTION. <br />
            <span className="accent-gradient-text">Connecting You to Opportunities.</span>
          </h1>

          {/* Official Vision Subtitle */}
          <p className="text-base sm:text-lg text-charcoal-600 max-w-3xl mx-auto leading-relaxed font-normal">
            {settings.vision || 'To provide a single platform where individuals, business owners, companies, contractors and industries can access almost every type of service under one roof across Karnataka and eventually throughout India.'}
          </p>

          {/* Quick Metrics Badges */}
          <div className="pt-2 flex flex-wrap justify-center gap-2 sm:gap-4 text-xs font-semibold text-charcoal-700">
            <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <Grid className="w-3.5 h-3.5 text-purple-600" />
              <span><strong>20</strong> Main Categories</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-coral-500" />
              <span><strong>400</strong> Individual Services</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-yellow-600" />
              <span><strong>31</strong> Karnataka Districts</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span><strong>100%</strong> Verified Providers</span>
            </div>
          </div>
        </div>

        {/* Powerful Instant Multi-Filter Search Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
          >
            {/* Keyword Search */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 400 services (e.g. Civil Construction, JCB, GST, Interiors...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 hover:bg-gray-100/60 focus:bg-white text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-charcoal-900 placeholder-gray-400"
              />
            </div>

            {/* Category Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by Service Category"
                className="w-full py-2.5 px-3 bg-gray-50 hover:bg-gray-100/60 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-purple-600 outline-none font-medium text-charcoal-800"
              >
                <option value="All">All 20 Categories</option>
                {RAW_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.id}. {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            <div className="sm:col-span-2">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                aria-label="Filter by Karnataka District"
                className="w-full py-2.5 px-3 bg-gray-50 hover:bg-gray-100/60 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-purple-600 outline-none font-medium text-charcoal-800"
              >
                {KARNATAKA_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-purple-glow transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5 text-yellow-300" />
              </button>
            </div>
          </form>

          {/* Quick Popular Tags */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-charcoal-500">
            <span className="font-semibold text-charcoal-700">Popular:</span>
            {['Residential Construction', 'Modular Kitchen', 'JCB Rental', 'Cement & Steel Supply', 'GST Registration', 'Solar Installation'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchTerm(tag);
                  navigate(`/services?search=${encodeURIComponent(tag)}`);
                }}
                className="px-2.5 py-0.5 rounded-full bg-white hover:bg-purple-50 text-charcoal-700 hover:text-purple-700 border border-gray-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Two Visual Cards: How It Works & Target Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left Card: 20 Categories Preview */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-black flex items-center justify-center p-0.5 flex-shrink-0">
                  <img
                    src={settings.logo_url || "/logo.jpg"}
                    alt="Ranga Sri Enterprises Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-charcoal-900">
                    20 Core Enterprise Verticals
                  </h3>
                  <span className="text-[11px] text-purple-600 font-semibold block">
                    Connecting You to Verified Providers Across Karnataka
                  </span>
                </div>
              </div>
              <Link
                to="/services"
                className="text-xs font-bold text-purple-600 hover:text-purple-700 inline-flex items-center space-x-1"
              >
                <span>Catalog</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 8 featured sample categories */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {RAW_CATEGORIES.slice(0, 8).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/services?category=${encodeURIComponent(cat.name)}`}
                  className="p-2.5 rounded-xl bg-[#F8F9FA] hover:bg-purple-50/70 border border-gray-200/80 hover:border-purple-300 transition-all text-center group"
                >
                  <div className="font-bold text-charcoal-900 group-hover:text-purple-700 truncate">
                    {cat.name.split('&')[0]}
                  </div>
                  <div className="text-[10px] text-charcoal-500 font-medium">
                    20 Services
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between bg-purple-50/60 p-3 rounded-xl border border-purple-100 text-xs">
              <span className="text-charcoal-700">
                Are you a contractor, technician or supplier in Karnataka?
              </span>
              <Link
                to="/partner-register"
                className="font-bold text-purple-700 hover:text-purple-900 inline-flex items-center space-x-1 flex-shrink-0"
              >
                <span>Join Network →</span>
              </Link>
            </div>
          </div>

          {/* Right Card: Target Audiences Served */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 shadow-xl border border-gray-200 space-y-4">
            <h3 className="font-heading font-bold text-base text-charcoal-900 border-b border-gray-100 pb-3 flex items-center justify-between">
              <span>Who We Serve</span>
              <span className="text-[11px] text-coral-600 font-bold bg-coral-50 px-2.5 py-0.5 rounded-full border border-coral-200">
                Single Window
              </span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-charcoal-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Individuals & Homeowners:</strong> Turnkey house construction, interiors & repairs</span>
              </div>
              <div className="flex items-center space-x-2 text-charcoal-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Business Owners & Startups:</strong> Setup, licenses, GST, software & marketing</span>
              </div>
              <div className="flex items-center space-x-2 text-charcoal-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Contractors & Builders:</strong> Labour gangs, crane/JCB rentals & bulk materials</span>
              </div>
              <div className="flex items-center space-x-2 text-charcoal-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Industries & Factories:</strong> PEB sheds, heavy machinery & safety certifications</span>
              </div>
              <div className="flex items-center space-x-2 text-charcoal-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Farmers & Agriculture:</strong> Drip irrigation, solar pumps & farm setups</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Request Custom Quotation</span>
                <ArrowRight className="w-3.5 h-3.5 text-yellow-300" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Hero;
