import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Store, 
  Rocket, 
  Building, 
  HardHat, 
  Factory, 
  Sprout, 
  Hotel,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Network
} from 'lucide-react';

const CUSTOMER_PROFILES = [
  {
    title: "Individuals & Homeowners",
    icon: User,
    color: "purple",
    badge: "Residential",
    services: "House construction, full interior design, water tank & sump, plumbing/electrical repair, deep cleaning, and property legal checks."
  },
  {
    title: "Business Owners & Retailers",
    icon: Store,
    color: "coral",
    badge: "Commercial",
    services: "Shop setup, trade licenses, FSSAI registration, signage & branding, wholesale FMCG/cleaning supplies, and POS IT."
  },
  {
    title: "Startups & Emerging Ventures",
    icon: Rocket,
    color: "yellow",
    badge: "Innovation",
    services: "Company incorporation, website & mobile app development, digital ad campaigns, accounting setup, and trademark filing."
  },
  {
    title: "Private Companies & Corporates",
    icon: Building,
    color: "purple",
    badge: "Enterprise",
    services: "Office turnkey interiors, statutory audits, payroll processing, cloud ERP, employee transport, and facility AMC contracts."
  },
  {
    title: "Contractors & Civil Builders",
    icon: HardHat,
    color: "coral",
    badge: "Construction",
    services: "Pre-screened labour gangs (masonry, rebar, shuttering), JCB & crane rentals, cement/steel procurement, and structural drafting."
  },
  {
    title: "Industries & Manufacturing Plants",
    icon: Factory,
    color: "purple",
    badge: "Industrial",
    services: "Pre-Engineered Buildings, heavy transport, machinery leasing, industrial electrical panels, Fire NOC, and safety equipment."
  },
  {
    title: "Farmers & Agriculturalists",
    icon: Sprout,
    color: "emerald",
    badge: "Agriculture",
    services: "Farm land levelling, tractor hire, automated drip irrigation, solar pumps, soil testing, and greenhouse / polyhouse setup."
  },
  {
    title: "Shops, Hotels & Institutions",
    icon: Hotel,
    color: "coral",
    badge: "Institutional",
    services: "Bulk packaged water, pest control, security guards, CCTV surveillance, food safety compliance, and commercial waste collection."
  }
];

const TargetCustomersSection = ({ onOpenEnquiry }) => {
  return (
    <section className="py-20 bg-[#F8F9FA] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold shadow-sm">
            <Network className="w-3.5 h-3.5 text-coral-500" />
            <span>Dedicated Solutions by Industry Segment</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-950 tracking-tight">
            Tailored for Every Target Client
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
            Whether you are building a home, scaling a retail brand, running an industrial plant, or farming across Karnataka, Ranga Sri Enterprises is your single trusted window.
          </p>
        </div>

        {/* 8 Target Customer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_PROFILES.map((profile, idx) => {
            const Icon = profile.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      {profile.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-charcoal-900 mb-2">
                    {profile.title}
                  </h3>

                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal mb-4">
                    {profile.services}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry(null, profile.title)}
                    className="text-xs font-bold text-purple-600 hover:text-purple-800 inline-flex items-center space-x-1"
                  >
                    <span>Request Assistance</span>
                    <ArrowRight className="w-3.5 h-3.5 text-yellow-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Business Model Callout Banner */}
        <div className="mt-14 bg-white rounded-2xl p-8 border border-gray-200 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-coral-600 bg-coral-50 px-3 py-1 rounded-full border border-coral-200 inline-block">
                Our Operational Business Model
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-charcoal-950">
                Connecting Customers with Verified Service Providers
              </h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Ranga Sri Enterprises connects customers with verified service providers, contractors, professionals, suppliers and agencies across Karnataka. We coordinate requirements, quotations, service delivery and customer support—ensuring transparency, quality, and complete accountability.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/partner-register"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs text-center shadow-md transition-all"
              >
                Join as Verified Partner / Provider
              </Link>
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="w-full py-3 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-white font-bold text-xs text-center transition-all"
              >
                Request Quotation & Requirements Call
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TargetCustomersSection;
