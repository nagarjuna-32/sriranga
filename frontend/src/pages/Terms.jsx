import React from 'react';
import { ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Terms = () => {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm mb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#7048E8] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
            <FileText className="w-4 h-4 text-[#7048E8]" />
            <span>Standard Terms of Engagement</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121417] tracking-tight">
            Terms of Service & Engagement
          </h1>
          <p className="text-xs text-[#495057]">
            Applicable to all client contracts and service requests with {settings.company_name}
          </p>
        </div>

        {/* Content Document */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-8 text-sm text-[#343A40] leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#121417]">
              1. Engagement & Service Scope
            </h2>
            <p>
              By engaging <strong>{settings.company_name}</strong> for any of our six service pillars (Government & Documentation, Business & Registration, IT & Digital Solutions, Property & Real Estate, Marketing & Advertising, and Event Management), the client agrees to the terms and operational conditions outlined herein.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#121417]">
              2. Independent Facilitation & Non-Affiliation
            </h2>
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs leading-relaxed space-y-2">
              <p><strong>Crucial Advisory:</strong></p>
              <p>
                {settings.disclaimer_text}
              </p>
              <p>
                Ranga Sri Enterprises acts solely as an independent administrative facilitator, document coordinator, and technical service provider. We do not guarantee statutory approvals, which remain at the sole discretion of respective governmental or regulatory authorities.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#121417]">
              3. Client Obligations & Document Authenticity
            </h2>
            <p>
              Clients represent and warrant that all certificates, identification records, company documents, declarations, and property records provided to Ranga Sri Enterprises are authentic, valid, and legally obtained. The client bears full legal responsibility for the veracity of submitted records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#121417]">
              4. IT & Digital Intellectual Property
            </h2>
            <p>
              Upon receipt of full payment for bespoke website development, software engineering, or branding projects, all agreed intellectual property, source files, and design assets are transferred to the client.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#121417]">
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These terms and any disputes arising under client engagements shall be governed by and construed in accordance with the laws of India, under the jurisdiction of the competent courts in Bengaluru, Karnataka.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;
