import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle2, AlertCircle, Loader2, MapPin, Grid, Layers } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { publicService } from '../../services/publicService';
import { createWhatsAppEnquiryUrl } from '../../utils/whatsapp';
import { RAW_CATEGORIES, ALL_SERVICES, KARNATAKA_DISTRICTS } from '../../data/servicesCatalog';

const EnquiryModal = ({ isOpen, onClose, preselectedService, preselectedCategory, preselectedDistrict }) => {
  const { settings } = useSettings();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiry_type: 'Instant Quotation Request',
    category: preselectedCategory || RAW_CATEGORIES[0].name,
    service_name: preselectedService || RAW_CATEGORIES[0].services[0],
    district: preselectedDistrict || 'Bengaluru Urban',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openWhatsAppDirectly, setOpenWhatsAppDirectly] = useState(true);

  // Sync props when opening
  useEffect(() => {
    if (preselectedCategory) {
      setFormData(prev => ({ ...prev, category: preselectedCategory }));
    }
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service_name: preselectedService }));
    }
    if (preselectedDistrict && preselectedDistrict !== 'All Karnataka') {
      setFormData(prev => ({ ...prev, district: preselectedDistrict }));
    }
  }, [preselectedService, preselectedCategory, preselectedDistrict, isOpen]);

  // When category changes, auto-select first service of that category if current service does not match
  const currentCategoryObj = RAW_CATEGORIES.find(c => c.name === formData.category) || RAW_CATEGORIES[0];

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'category') {
        const cat = RAW_CATEGORIES.find(c => c.name === value);
        if (cat && cat.services.length > 0) {
          next.service_name = cat.services[0];
        }
      }
      return next;
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMessage('Please enter a valid contact phone number (at least 7 digits).');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage('Please briefly describe your service requirements or project timeline.');
      return;
    }

    setLoading(true);

    try {
      await publicService.submitEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        category: formData.category,
        service_name: formData.service_name,
        district: formData.district,
        enquiry_type: formData.enquiry_type,
        message: formData.message.trim(),
      });

      if (openWhatsAppDirectly) {
        const waUrl = createWhatsAppEnquiryUrl(settings.whatsapp_number, formData);
        if (waUrl !== '#') {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        }
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Enquiry submission error:', err);
      // Fallback: direct WhatsApp
      if (openWhatsAppDirectly) {
        const waUrl = createWhatsAppEnquiryUrl(settings.whatsapp_number, formData);
        if (waUrl !== '#') {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        }
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      enquiry_type: 'Instant Quotation Request',
      category: RAW_CATEGORIES[0].name,
      service_name: RAW_CATEGORIES[0].services[0],
      district: 'Bengaluru Urban',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-gray-200 overflow-hidden animate-scaleIn max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#121417] text-white p-5 sm:p-6 flex items-center justify-between border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-700 bg-black flex items-center justify-center p-0.5 flex-shrink-0">
              <img
                src={settings.logo_url || "/logo.jpg"}
                alt="Ranga Sri Enterprises"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                Single-Window Service Request
              </span>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                Request Quotation & Requirement Call
              </h3>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="w-8 h-8 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-extrabold text-xl text-charcoal-900">
                Enquiry Dispatched Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your request for <strong>{formData.service_name}</strong> in <strong>{formData.district}</strong> has been logged in our operations dispatch system. A coordinator will connect with you shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-all shadow-md"
                >
                  Done & Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Requirement Type Selector */}
              <div>
                <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
                  Request Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Instant Quotation Request', 'Service Booking', 'General Enquiry'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, enquiry_type: type }))}
                      className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition-all ${
                        formData.enquiry_type === type
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-[#F8F9FA] text-charcoal-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {type.split(' ')[0]} {type.split(' ')[1] || ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Gowda"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Mobile / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98450 12345"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none"
                  />
                </div>
              </div>

              {/* Category and Service Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Main Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-[#F8F9FA] focus:bg-white text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-purple-600 outline-none text-charcoal-800 font-medium"
                  >
                    {RAW_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.id}. {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Specific Service ({currentCategoryObj.services.length}) <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service_name"
                    value={formData.service_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-[#F8F9FA] focus:bg-white text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-purple-600 outline-none text-charcoal-800 font-medium"
                  >
                    {currentCategoryObj.services.map((srv, idx) => (
                      <option key={idx} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* District & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Karnataka District <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-[#F8F9FA] focus:bg-white text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-purple-600 outline-none text-charcoal-800 font-medium"
                  >
                    {KARNATAKA_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        📍 {dist}
                      </option>
                    ))}
                  </select>
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
                    placeholder="e.g. client@domain.com"
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FA] focus:bg-white text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-purple-600 outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-charcoal-800 mb-1">
                  Project Description or Quantity / Timeline <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your site location, project volume, preferred start date or specific requirements..."
                  required
                  className="w-full px-3.5 py-2 bg-[#F8F9FA] focus:bg-white text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-purple-600 outline-none resize-none"
                ></textarea>
              </div>

              {/* Auto WhatsApp Checkbox */}
              <label className="flex items-center space-x-2 cursor-pointer text-xs text-charcoal-600 select-none">
                <input
                  type="checkbox"
                  checked={openWhatsAppDirectly}
                  onChange={(e) => setOpenWhatsAppDirectly(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
                <span>Automatically open WhatsApp with pre-drafted scope for instant desk confirmation</span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md hover:shadow-purple-glow transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Requirement...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Request Instant Quotation</span>
                    <Send className="w-4 h-4 text-yellow-300" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
