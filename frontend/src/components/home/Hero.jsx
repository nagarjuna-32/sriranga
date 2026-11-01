import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle, 
  Zap, 
  Sparkles, 
  Layers,
  PhoneCall,
  Clock
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Hero = ({ onOpenEnquiry }) => {
  const { settings } = useSettings();

  return (
    <div className="relative bg-[#F8F9FA] text-charcoal-900 overflow-hidden py-16 sm:py-24 lg:py-28 border-b border-gray-200">
      {/* Background ambient light glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-coral-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-yellow-100/50 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Subtle clean grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tagline */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-coral-500" />
              <span>{settings.tagline}</span>
            </div>

            {/* Main Headline - Charcoal Text with Vibrant Accent */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-charcoal-950 tracking-tight leading-[1.15]">
              Making Business Simpler. <br />
              <span className="accent-gradient-text">Making Ideas Happen.</span>
            </h1>

            {/* Corporate Description - Secondary Charcoal Text */}
            <p className="text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {settings.company_description}
            </p>

            {/* Key Value Badges */}
            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-semibold text-charcoal-700">
              <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>6 Core Pillars</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-coral-500 flex-shrink-0" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                <span>Punctual Turnaround</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-base shadow-lg hover:shadow-purple-glow transition-all transform hover:-translate-y-0.5"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-5 h-5 text-yellow-300" />
              </button>

              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-charcoal-800 font-bold text-base border border-gray-300 shadow-sm transition-all"
              >
                <Layers className="w-4 h-4 text-coral-500" />
                <span>Explore 6 Services</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Crisp White Card on Soft Off-White Background */}
              <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-purple-600 font-bold block">
                      Multi-Service Enterprise
                    </span>
                    <h3 className="text-lg font-bold text-charcoal-900 font-heading">
                      Integrated Service Model
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                    <Zap className="w-5 h-5 text-coral-500" />
                  </div>
                </div>

                {/* Service Pills Snapshot on soft light gray */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#F8F9FA] border border-gray-200/80 hover:border-purple-300 transition-colors">
                    <div className="font-bold text-charcoal-900">Documentation</div>
                    <div className="text-[10px] text-charcoal-500">Procedural Guidance</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F9FA] border border-gray-200/80 hover:border-purple-300 transition-colors">
                    <div className="font-bold text-charcoal-900">Registration</div>
                    <div className="text-[10px] text-charcoal-500">Business Setup</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F9FA] border border-gray-200/80 hover:border-purple-300 transition-colors">
                    <div className="font-bold text-charcoal-900">IT & Digital</div>
                    <div className="text-[10px] text-charcoal-500">Web, Apps & Cloud</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F9FA] border border-gray-200/80 hover:border-purple-300 transition-colors">
                    <div className="font-bold text-charcoal-900">Property & Realty</div>
                    <div className="text-[10px] text-charcoal-500">Asset Coordination</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F9FA] border border-gray-200/80 hover:border-purple-300 transition-colors">
                    <div className="font-bold text-charcoal-900">Marketing</div>
                    <div className="text-[10px] text-charcoal-500">Brand Growth</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8F9FA] border border-gray-200/80 hover:border-purple-300 transition-colors">
                    <div className="font-bold text-charcoal-900">Events</div>
                    <div className="text-[10px] text-charcoal-500">Corporate & Social</div>
                  </div>
                </div>

                {/* Fast Contact Callout */}
                <div className="pt-2 flex items-center justify-between bg-purple-50/70 p-3.5 rounded-xl border border-purple-100">
                  <div className="flex items-center space-x-2 text-xs text-charcoal-800 font-medium">
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                    <span>Talk to a specialist today</span>
                  </div>
                  <a
                    href={`tel:${settings.contact_phone}`}
                    className="text-xs font-bold text-purple-700 hover:text-purple-800"
                  >
                    Call Now →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
