import React from 'react';
import { ArrowRight, MessageCircle, PhoneCall, Sparkles } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { createWhatsAppChatUrl } from '../../utils/whatsapp';

const CTASection = ({ onOpenEnquiry }) => {
  const { settings } = useSettings();
  const whatsappUrl = createWhatsAppChatUrl(settings.whatsapp_number);

  return (
    <section className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-purple-50/60 text-charcoal-900 py-16 sm:py-20 relative overflow-hidden border-t border-gray-200">
      {/* Background ambient accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100/70 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-coral-100/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200 text-purple-700 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-coral-500" />
            <span>Ready to Elevate Your Operations?</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal-950 tracking-tight leading-tight">
            Let's Discuss How We Can <br className="hidden sm:inline" />
            <span className="accent-gradient-text">Streamline Your Business Goals</span>
          </h2>

          <p className="text-charcoal-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Whether you require procedural document coordination, incorporation setup, enterprise web architecture, or end-to-end event execution, our specialists are ready to help.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-base shadow-lg hover:shadow-purple-glow transition-all transform hover:-translate-y-0.5"
            >
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-5 h-5 text-yellow-300" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-charcoal-500 font-semibold">
            <span className="flex items-center space-x-1"><span className="text-purple-600 font-bold">✓</span><span>No Obligation Advisory</span></span>
            <span className="flex items-center space-x-1"><span className="text-coral-500 font-bold">✓</span><span>Transparent Timelines</span></span>
            <span className="flex items-center space-x-1"><span className="text-yellow-600 font-bold">✓</span><span>100% Confidential</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
