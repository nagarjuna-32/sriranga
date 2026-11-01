import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const PrivacyPolicy = () => {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm mb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#7048E8] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
            <ShieldCheck className="w-4 h-4 text-[#7048E8]" />
            <span>Corporate Compliance & Data Governance</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121417] tracking-tight">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-xs text-[#495057]">
            Last Updated: October 2026 • Effective for {settings.company_name}
          </p>
        </div>

        {/* Content Document */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-8 text-sm text-[#343A40] leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#121417]">
              1. Overview & Commitment
            </h2>
            <p>
              <strong>{settings.company_name}</strong> ("Company", "we", "our", or "us") is dedicated to protecting the privacy, confidentiality, and security of individuals, corporate partners, and clients who utilize our website, consultation desks, and integrated multi-services.
            </p>
            <p>
              This Privacy Policy describes how we collect, handle, store, and safeguard the information you provide when engaging our services across government documentation guidance, company registration assistance, IT and software development, property coordination, marketing, and event planning.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#121417]">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact & Identity Details:</strong> Full name, phone/mobile number, email address, company or business trade name, and physical address.</li>
              <li><strong>Documentation Records:</strong> Supporting identification, affidavits, trade licenses, property dossiers, and procedural certificates provided specifically for facilitation and verification filing.</li>
              <li><strong>Technical & Inquiry Data:</strong> Website interaction details, IP addresses, service interest selections, and communications sent through our website contact portal or WhatsApp desk.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#121417]">
              3. Purpose & Legal Basis of Processing
            </h2>
            <p>We process collected data exclusively for:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Executing requested service assignments and preparing accurate application files.</li>
              <li>Communicating status updates, timelines, and queries via email, telephone, or WhatsApp.</li>
              <li>Verifying technical specifications for software, web development, or advertising campaigns.</li>
              <li>Complying with applicable commercial laws, accounting requirements, and regulatory audit protocols.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#121417]">
              4. Strict Non-Disclosure & Document Security
            </h2>
            <p>
              We enforce strict confidentiality standards across our workforce and digital infrastructure:
            </p>
            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-gray-200 space-y-2 text-xs text-[#343A40]">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#7048E8]" />
                <span>All client records and sensitive identity dossiers are stored in access-controlled environments.</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#7048E8]" />
                <span>We never sell, rent, monetize, or disclose your personal or corporate data to third-party marketing entities.</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#7048E8]" />
                <span>Documentation submitted for procedural filing is used exclusively for the designated statutory application.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#121417]">
              5. Statutory Disclaimer & Independent Standing
            </h2>
            <p className="text-[#495057]">
              {settings.disclaimer_text}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#121417]">
              6. Contact for Privacy Inquiries
            </h2>
            <p>
              If you have any questions regarding our privacy practices, data handling, or wish to request data deletion following completion of your engagement, please contact our compliance desk:
            </p>
            <div className="p-4 rounded-xl bg-[#1A1D20] text-gray-200 text-xs space-y-1.5">
              <p><strong>Compliance Officer:</strong> {settings.company_name}</p>
              <p><strong>Email:</strong> {settings.contact_email}</p>
              <p><strong>Address:</strong> {settings.business_address}</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
