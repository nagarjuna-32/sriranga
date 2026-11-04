import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Send, 
  MessageCircle, 
  Sparkles,
  Layers,
  PhoneCall
} from 'lucide-react';
import { publicService } from '../services/publicService';
import { useSettings } from '../context/SettingsContext';
import { createWhatsAppEnquiryUrl, createWhatsAppChatUrl } from '../utils/whatsapp';
import { ALL_SERVICES } from '../data/servicesCatalog';
import CTASection from '../components/home/CTASection';

const ServiceDetail = ({ onOpenEnquiry }) => {
  const { slug } = useParams();
  const { settings } = useSettings();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State for in-page direct enquiry
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await publicService.getServiceBySlug(slug);
        if (res.success && res.data) {
          setService(res.data);
        } else {
          const fallback = ALL_SERVICES.find(s => s.slug === slug || String(s.id) === String(slug));
          if (fallback) {
            setService(fallback);
          } else {
            setError('Service not found');
          }
        }
      } catch (err) {
        console.error('Error fetching service details:', err);
        const fallback = ALL_SERVICES.find(s => s.slug === slug || String(s.id) === String(slug));
        if (fallback) {
          setService(fallback);
        } else {
          setError('Could not load service information.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchService();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        service_name: service.title,
      };

      await publicService.submitEnquiry(payload);

      // Open WhatsApp automatically
      const waUrl = createWhatsAppEnquiryUrl(settings.whatsapp_number, payload);
      if (waUrl !== '#') {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit enquiry:', err);
      // Fallback: direct WhatsApp
      const waUrl = createWhatsAppEnquiryUrl(settings.whatsapp_number, {
        ...formData,
        service_name: service.title,
      });
      if (waUrl !== '#') {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#7048E8] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-[70vh] bg-[#F8F9FA] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-[#121417] mb-2 font-heading">Service Not Found</h2>
        <p className="text-[#495057] mb-6 text-sm">The requested service does not exist or has been updated.</p>
        <Link
          to="/services"
          className="px-6 py-2.5 rounded-xl bg-[#7048E8] hover:bg-[#5F3DC4] text-white text-sm font-semibold transition-all shadow-md"
        >
          View All Services
        </Link>
      </div>
    );
  }

  const features = Array.isArray(service.features) ? service.features : [];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Page Header */}
      <section className="bg-[#121417] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-4">
            <Link
              to="/services"
              className="inline-flex items-center space-x-1.5 text-xs text-[#FAB005] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Services</span>
            </Link>
          </div>

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7048E8] bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/50">
              {service.category}
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              {service.title}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
              {service.short_description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Enquiry Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 8 Cols: Service In-Depth Details */}
            <div className="lg:col-span-8 space-y-10">
              {/* Featured Image */}
              {service.image_url && (
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-80 sm:h-96 w-full">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Comprehensive Description */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-heading font-bold text-2xl text-[#121417]">
                  Overview & Service Scope
                </h2>
                <div className="prose max-w-none text-[#343A40] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {service.full_description}
                </div>
              </div>

              {/* Key Deliverables & Feature Checklist */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-6">
                <h3 className="font-heading font-bold text-xl text-[#121417]">
                  What This Service Covers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F8F9FA] border border-gray-200 flex items-start space-x-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#7048E8] flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[#1A1D20]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Assurance Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center space-x-3 shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-[#FAB005] flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#121417]">100% Confidential</h4>
                    <p className="text-[11px] text-[#495057]">Encrypted files & records</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center space-x-3 shadow-sm">
                  <Clock className="w-8 h-8 text-[#FA5252] flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#121417]">Agreed Deadlines</h4>
                    <p className="text-[11px] text-[#495057]">Punctual milestone tracking</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center space-x-3 shadow-sm">
                  <Sparkles className="w-8 h-8 text-[#7048E8] flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#121417]">Dedicated Lead</h4>
                    <p className="text-[11px] text-[#495057]">Direct account manager</p>
                  </div>
                </div>
              </div>

              {/* Important Statutory Notice */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 text-xs text-amber-900 leading-relaxed shadow-sm">
                <strong>Statutory Advisory: </strong>
                Ranga Sri Enterprises provides structured procedural guidance, file assembly, technical implementation, and vendor coordination on an independent consultancy basis. We do not claim official government authority or statutory licensing unless explicitly noted.
              </div>
            </div>

            {/* Right 4 Cols: In-page Consultation Request Form */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-2xl border border-gray-200 shadow-card p-6 sm:p-7 space-y-6">
                
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7048E8] block mb-1">
                    Direct Inquiry
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#121417]">
                    Consult on This Service
                  </h3>
                  <p className="text-xs text-[#495057] mt-1">
                    Submit your request to receive a tailored procedural timeline and scope assessment.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-[#121417] text-sm">Enquiry Dispatched!</h4>
                    <p className="text-xs text-[#495057]">
                      Our specialist will review your requirement for <strong>{service.title}</strong> and reach out shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#7048E8] font-semibold hover:underline"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1D20] mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="e.g. Anand Sharma"
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-[#F8F9FA] focus:bg-white text-sm text-[#1A1D20] focus:ring-2 focus:ring-[#7048E8] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1D20] mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="e.g. +91 98450 12345"
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-[#F8F9FA] focus:bg-white text-sm text-[#1A1D20] focus:ring-2 focus:ring-[#7048E8] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1D20] mb-1">
                        Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="e.g. anand@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-[#F8F9FA] focus:bg-white text-sm text-[#1A1D20] focus:ring-2 focus:ring-[#7048E8] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1D20] mb-1">
                        Requirements or Questions <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        rows={3}
                        placeholder="Please describe your specific objective or timeline..."
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-[#F8F9FA] focus:bg-white text-sm text-[#1A1D20] focus:ring-2 focus:ring-[#7048E8] outline-none transition-all resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-xl bg-[#7048E8] hover:bg-[#5F3DC4] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <span>Submit Request</span>
                      <Send className="w-4 h-4 text-[#FAB005]" />
                    </button>

                    <p className="text-[11px] text-[#495057] text-center">
                      Auto-triggers WhatsApp message with your enquiry for immediate confirmation.
                    </p>
                  </form>
                )}

                {/* Direct Help Desk */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#495057]">
                  <span>Need urgent guidance?</span>
                  <a
                    href={`tel:${settings.contact_phone}`}
                    className="font-bold text-[#7048E8] hover:text-[#5F3DC4] flex items-center space-x-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#FAB005]" />
                    <span>Call Desk</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};

export default ServiceDetail;
