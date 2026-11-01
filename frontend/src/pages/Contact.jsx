import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { publicService } from '../services/publicService';
import { createWhatsAppEnquiryUrl, createWhatsAppChatUrl } from '../utils/whatsapp';

const serviceOptions = [
  'Government & Documentation',
  'Business & Registration',
  'IT & Digital Solutions',
  'Property & Real Estate',
  'Marketing & Advertising',
  'Event Management',
  'Other Corporate Inquiry'
];

const Contact = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service_name: 'Business & Registration',
    message: '',
  });

  const [openWhatsAppDirectly, setOpenWhatsAppDirectly] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('Please enter your enquiry message.');
      return;
    }

    setLoading(true);

    try {
      // 1. Submit to MySQL DB via Backend
      await publicService.submitEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        service_name: formData.service_name,
        message: formData.message.trim(),
      });

      // 2. Prepare & Trigger WhatsApp URL
      const waUrl = createWhatsAppEnquiryUrl(settings.whatsapp_number, formData);
      if (openWhatsAppDirectly && waUrl !== '#') {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Contact submission error:', err);
      // Fallback: direct WhatsApp
      const waUrl = createWhatsAppEnquiryUrl(settings.whatsapp_number, formData);
      if (waUrl !== '#') {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const quickChatUrl = createWhatsAppChatUrl(settings.whatsapp_number);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <section className="bg-[#F1F3F5] text-charcoal-900 py-20 relative overflow-hidden border-b border-gray-200">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
            Get In Touch
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl mt-4 mb-4 tracking-tight text-charcoal-950">
            Connect With Our Enterprise Team
          </h1>
          <p className="text-charcoal-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Have a question or ready to begin an engagement? Our specialists are available across phone, email, WhatsApp, and in-person consultations.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 5 Cols: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Direct Channels
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-900 mt-2 mb-3">
                  Reach Our Specialists
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We maintain swift response times during business hours. For urgent inquiries, reach us directly via our verified WhatsApp desk.
                </p>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                {/* Office Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-charcoal-900 mb-1">
                      Registered Office
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                      {settings.business_address}
                    </p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-charcoal-900 mb-1">
                      Telephone & Support
                    </h3>
                    <a
                      href={`tel:${settings.contact_phone}`}
                      className="text-xs sm:text-sm text-purple-600 font-bold hover:underline block"
                    >
                      {settings.contact_phone}
                    </a>
                    <p className="text-[11px] text-charcoal-400 mt-0.5">Mon–Sat during regular business hours</p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-charcoal-900 mb-1">
                      Official Correspondence
                    </h3>
                    <a
                      href={`mailto:${settings.contact_email}`}
                      className="text-xs sm:text-sm text-purple-600 font-bold hover:underline block"
                    >
                      {settings.contact_email}
                    </a>
                    <p className="text-[11px] text-charcoal-400 mt-0.5">Formal proposals & document transmission</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-charcoal-900 mb-1">
                      Business Operating Hours
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-600">
                      {settings.working_hours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Box */}
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-heading font-bold text-emerald-950 text-sm">
                    Prefer Instant Messaging?
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Connect with our executive coordinator directly on WhatsApp.
                  </p>
                </div>
                <a
                  href={quickChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs inline-flex items-center space-x-1.5 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right 7 Cols: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-premium p-8 sm:p-10 space-y-6">
                
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    Consultation Inquiry Form
                  </span>
                  <h2 className="font-heading font-bold text-2xl text-navy-900 mt-1 mb-2">
                    Send Us an Inquiry
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Complete the form below. Once submitted, your enquiry is logged in our corporate CRM and an instant WhatsApp confirmation link is generated.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-navy-900">
                      Enquiry Successfully Registered!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you for contacting <strong>{settings.company_name}</strong>. A service lead has been notified and will review your requirements.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            email: '',
                            service_name: 'Business & Registration',
                            message: '',
                          });
                        }}
                        className="px-6 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-brand-royal transition-all"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMsg && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Rajesh Vardhan"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Phone / Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98450 00000"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. rajesh@enterprises.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Select Service Required <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="service_name"
                          value={formData.service_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal outline-none bg-white"
                        >
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Detailed Message / Requirement <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Please describe your specific operational, documentation, technology or event requirement..."
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal outline-none resize-none"
                      ></textarea>
                    </div>

                    {/* WhatsApp auto-forward option */}
                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="checkbox"
                        id="openWaContact"
                        checked={openWhatsAppDirectly}
                        onChange={(e) => setOpenWhatsAppDirectly(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <label htmlFor="openWaContact" className="text-xs text-slate-600 flex items-center space-x-1 cursor-pointer">
                        <span>Also open WhatsApp with this message for instant chat response</span>
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md hover:shadow-purple-glow transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <span>Submit Official Enquiry</span>
                      <Send className="w-4 h-4 text-yellow-300" />
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-navy-900">
                  Location & Map Navigation
                </h3>
                <p className="text-xs text-slate-500">
                  {settings.business_address}
                </p>
              </div>
              <span className="text-xs font-semibold text-gold-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                In-Person Consultations by Appointment
              </span>
            </div>

            {/* Configurable Google Map Iframe */}
            <div className="w-full h-80 sm:h-96 bg-slate-100">
              <iframe
                title="Ranga Sri Enterprises Location Map"
                src={settings.google_maps_embed || 'https://www.google.com/maps/embed'}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
