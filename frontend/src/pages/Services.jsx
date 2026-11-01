import React, { useState, useEffect } from 'react';
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
  Headphones
} from 'lucide-react';

const processSteps = [
  {
    step: '01',
    icon: FileSearch,
    title: 'Consultation & Discovery',
    description: 'We listen to your specific needs, assess eligibility or technical scope, and outline the precise roadmap.',
  },
  {
    step: '02',
    icon: ClipboardList,
    title: 'File Audit & Blueprint',
    description: 'We structure the documentation, verify every prerequisite, or design the software / campaign blueprint.',
  },
  {
    step: '03',
    icon: Settings,
    title: 'Execution & Processing',
    description: 'Our specialists coordinate submissions, code software, produce branding, or manage on-ground event vendors.',
  },
  {
    step: '04',
    icon: CheckCircle,
    title: 'Review & Quality Delivery',
    description: 'All deliverables undergo rigorous quality checking before final handoff and client approval.',
  },
  {
    step: '05',
    icon: Headphones,
    title: 'Ongoing Support & Advisory',
    description: 'We provide dedicated post-delivery support, renewals, software maintenance, and scaling assistance.',
  },
];

const faqs = [
  {
    q: 'Do you provide official government certificates or issue statutory licenses directly?',
    a: 'No. Ranga Sri Enterprises is an independent professional consultancy and service facilitator. We assist you with document preparation, procedural guidance, dossier compilation, and portal coordination. All statutory approvals and certificates are issued solely by the respective government authorities.',
  },
  {
    q: 'Can you handle multiple service requirements concurrently for our new company?',
    a: 'Yes, this is our core advantage. We frequently handle end-to-end setups where we coordinate company registration documents, build the corporate website, set up branding collateral, and organize the launch event under a single point of contact.',
  },
  {
    q: 'What is the typical turnaround time for IT & Web Development projects?',
    a: 'Turnaround varies based on scope. Standard responsive corporate websites are typically delivered within 2 to 3 weeks, while custom web applications and SaaS dashboards span 4 to 8 weeks with phased milestones.',
  },
  {
    q: 'How does WhatsApp enquiry integration work?',
    a: 'When you submit an enquiry through our portal, your details are registered directly in our CRM system and an official WhatsApp chat window opens automatically with your pre-formatted enquiry so our team can respond in real time.',
  },
  {
    q: 'Are our documents and company financials kept strictly confidential?',
    a: 'Absolutely. We enforce stringent Non-Disclosure Agreements (NDAs), encrypted storage, and restricted-access protocols for all client records, identity files, and proprietary materials.',
  },
];

const Services = ({ onOpenEnquiry }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await publicService.getServices();
        if (res.success && res.data) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Page Header */}
      <section className="bg-[#F1F3F5] text-charcoal-900 py-20 relative overflow-hidden border-b border-gray-200">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
            Professional Multi-Service Portfolio
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl mt-4 mb-4 tracking-tight text-charcoal-950">
            Our Enterprise Services
          </h1>
          <p className="text-charcoal-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Integrated professional solutions spanning documentation, corporate registration, enterprise IT, commercial real estate, brand marketing, and event execution.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              6 Individual Pillars
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-900 tracking-tight">
              Comprehensive Service Offerings
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Click "Learn More" on any pillar for detailed breakdowns, typical deliverables, and direct consultation scheduling.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 rounded-2xl bg-white animate-pulse border border-slate-200"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onOpenEnquiry={onOpenEnquiry}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Structured Delivery Process */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-royal bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
              Delivery Methodology
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-900 tracking-tight">
              How We Execute With Precision
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our 5-step operational framework ensures transparency, procedural accuracy, and punctuality across every assignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between relative group hover:border-brand-royal transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-heading font-extrabold text-2xl text-gold-500">
                        {p.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center group-hover:bg-brand-royal transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-base text-navy-900 mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-royal bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
              Clear Answers
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Find clarity on our consultation scope, operational protocols, and delivery practices.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between text-navy-900 font-heading font-semibold text-base sm:text-lg hover:text-brand-royal transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-gold-500 text-xl font-bold ml-4">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};

export default Services;
