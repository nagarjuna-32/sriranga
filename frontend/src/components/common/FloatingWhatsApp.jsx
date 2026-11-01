import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { createWhatsAppChatUrl } from '../../utils/whatsapp';

const FloatingWhatsApp = ({ onOpenEnquiry }) => {
  const { settings } = useSettings();
  const [showTooltip, setShowTooltip] = useState(true);

  if (!settings.whatsapp_number) return null;

  const quickChatUrl = createWhatsAppChatUrl(
    settings.whatsapp_number,
    `Hello ${settings.company_name}, I would like to enquire about your professional business & digital services.`
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col select-none">
      {/* Tooltip Badge */}
      {showTooltip && (
        <div className="mb-3 bg-white text-navy-900 px-4 py-2.5 rounded-xl shadow-2xl border border-slate-200 text-xs font-medium flex items-center space-x-2 animate-bounce">
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800">Quick Assistance?</span>
            <span className="text-[11px] text-slate-500">Chat directly with our team</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Action Button */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onOpenEnquiry && onOpenEnquiry()}
          className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-white text-purple-700 text-xs font-bold shadow-lg border border-purple-200 hover:bg-purple-50 transition-all"
        >
          <span>Enquiry Form</span>
        </button>

        <a
          href={quickChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95"
          aria-label="Chat with us on WhatsApp"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping opacity-75"></span>
          <MessageCircle className="w-7 h-7 relative z-10 fill-current" />
        </a>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
