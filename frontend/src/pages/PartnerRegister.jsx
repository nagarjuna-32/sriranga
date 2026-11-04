import React, { useState } from 'react';
import { 
  UserCheck, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Send, 
  Briefcase, 
  Award,
  Sparkles,
  Users
} from 'lucide-react';
import { publicService } from '../services/publicService';
import { useSettings } from '../context/SettingsContext';
import { createWhatsAppProviderUrl } from '../utils/whatsapp';
import { RAW_CATEGORIES, KARNATAKA_DISTRICTS } from '../data/servicesCatalog';

const PartnerRegister = () => {
  const { settings } = useSettings();
  
  const [formData, setFormData] = useState({
    full_name: '',
    business_name: '',
    phone: '',
    email: '',
    district: 'Bengaluru Urban',
    category: RAW_CATEGORIES[0].name,
    services_offered: '',
    experience_years: 3,
    address: '',
    gst_or_id: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.business_name || !formData.phone || !formData.category) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await publicService.registerProvider(formData);

      // Trigger WhatsApp Onboarding Alert
      const waUrl = createWhatsAppProviderUrl(settings.whatsapp_number, formData);
      if (waUrl !== '#') {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Provider registration error:', err);
      // Fallback: direct WhatsApp
      const waUrl = createWhatsAppProviderUrl(settings.whatsapp_number, formData);
      if (waUrl !== '#') {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold shadow-sm">
            <UserCheck className="w-3.5 h-3.5 text-coral-500" />
            <span>Join Our Verified Vendor Network</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-950 tracking-tight">
            Partner with Ranga Sri Enterprises
          </h1>
          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
            Are you a skilled contractor, licensed professional, equipment owner, or certified agency? Register to receive verified client requirements and expand your business across Karnataka.
          </p>
        </div>

        {/* Two-Column Grid: Benefits + Registration Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Partner Value Proposition (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm space-y-5">
              <h3 className="font-heading font-bold text-lg text-charcoal-900 border-b border-gray-100 pb-3 flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span>Why Partner with Us?</span>
              </h3>

              <div className="space-y-4 text-xs text-charcoal-700">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 text-sm">Consistent Quality Leads</h4>
                    <p className="text-charcoal-500 mt-0.5 leading-relaxed">
                      We match pre-qualified project enquiries directly with verified providers in your district.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-coral-50 text-coral-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-coral-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 text-sm">Protected Transparent Terms</h4>
                    <p className="text-charcoal-500 mt-0.5 leading-relaxed">
                      Clear milestone-based agreements, scope coordination, and prompt commercial disbursements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 text-sm">All 31 Districts Coverage</h4>
                    <p className="text-charcoal-500 mt-0.5 leading-relaxed">
                      Expand your presence from Bengaluru to Mysuru, Hubballi, Belagavi, Mangaluru and beyond.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 text-sm">Dedicated Partner Desk</h4>
                    <p className="text-charcoal-500 mt-0.5 leading-relaxed">
                      Our operations managers handle customer briefing and initial site coordination for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Transparency Box */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 text-xs text-amber-950 leading-relaxed space-y-1.5">
              <span className="font-bold block">Verification Policy:</span>
              <p>
                Ranga Sri Enterprises conducts verification of trade experience and past client track records prior to dispatching project assignments.
              </p>
            </div>
          </div>

          {/* Right Column: Registration Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-8 border border-gray-200 shadow-xl">
            
            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-charcoal-900">
                  Registration Received!
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.full_name}</strong>. Your partner profile for <strong>{formData.business_name}</strong> has been logged in our partner CRM. Our district coordinator will reach out to schedule an onboarding verification call.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-all shadow-md"
                  >
                    Register Another Business
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-heading font-bold text-lg text-charcoal-900">
                    Partner Application Form
                  </h3>
                  <p className="text-xs text-charcoal-500">
                    Provide accurate business and contact details for verification.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Contact Person Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Kumar"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Business / Trade Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      placeholder="e.g. Sri Krishna Civil Contractors"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Mobile / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98450 12345"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. partner@agency.com"
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Primary Operating District <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:border-purple-600 outline-none"
                    >
                      {KARNATAKA_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Primary Service Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:border-purple-600 outline-none"
                    >
                      {RAW_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.id}. {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Specific Services & Equipment Offered
                  </label>
                  <textarea
                    name="services_offered"
                    rows={2}
                    value={formData.services_offered}
                    onChange={handleChange}
                    placeholder="e.g. Masonry, plastering, shuttering teams, JCB 3DX, 50-tonne cranes, plumbing gangs..."
                    className="w-full px-3.5 py-2 bg-[#F8F9FA] focus:bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:border-purple-600 outline-none resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Years of Trade Experience
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      name="experience_years"
                      value={formData.experience_years}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:border-purple-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      GST Number / Trade ID <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="gst_or_id"
                      value={formData.gst_or_id}
                      onChange={handleChange}
                      placeholder="e.g. 29AAAAA0000A1Z5"
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:border-purple-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Office / Workshop Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="City / Town, Landmark, Taluk"
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-charcoal-900 focus:border-purple-600 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md hover:shadow-purple-glow transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <span>{submitting ? 'Submitting Application...' : 'Submit Partner Application'}</span>
                  <Send className="w-4 h-4 text-yellow-300" />
                </button>

                <p className="text-[11px] text-charcoal-500 text-center">
                  Submitting automatically notifies our central onboarding desk via WhatsApp for rapid verification.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default PartnerRegister;
