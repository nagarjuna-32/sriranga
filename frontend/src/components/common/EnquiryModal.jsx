import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { publicService } from '../../services/publicService';
import { createWhatsAppEnquiryUrl } from '../../utils/whatsapp';

const serviceOptions = [
  'Government & Documentation',
  'Business & Registration',
  'IT & Digital Solutions',
  'Property & Real Estate',
  'Marketing & Advertising',
  'Event Management',
  'General Business Inquiry'
];

const EnquiryModal = ({ isOpen, onClose, preselectedService }) => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service_name: preselectedService || 'Business & Registration',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openWhatsAppDirectly, setOpenWhatsAppDirectly] = useState(true);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service_name: preselectedService }));
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMessage('Please enter a valid contact phone number (at least 7 digits).');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage('Please describe your requirements.');
      return;
    }

    setLoading(true);

    try {
      // 1. Submit to Backend MySQL Database
      await publicService.submitEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        service_name: formData.service_name,
        message: formData.message.trim(),
      });

      // 2. Automatically prepare WhatsApp message URL
      const waUrl = createWhatsAppEnquiryUrl(settings.whatsapp_number, formData);

      // Open WhatsApp in a new tab if opted
      if (openWhatsAppDirectly && waUrl !== '#') {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Enquiry submission error:', err);
      // Fallback: Even if server has network issue, allow immediate WhatsApp opening
      const waUrl = createWhatsAppEnquiryUrl(settings.whatsapp_number, formData);
      if (waUrl !== '#') {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
      setErrorMessage(
        err.response?.data?.message || 
        'Could not save to portal, but we have opened WhatsApp with your message so you do not lose your enquiry.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service_name: 'Business & Registration',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-purple-200 hover:text-white p-1 rounded-lg hover:bg-purple-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-yellow-300 mb-1">
            <span>Ranga Sri Enterprises</span>
            <span>•</span>
            <span className="text-white">Consultation Request</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading">
            Request Service Details
          </h2>
          <p className="text-xs text-purple-100 mt-1">
            Fill in your details below. Our specialists review your request and connect with you promptly.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Enquiry Successfully Received!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. Your enquiry for <span className="font-semibold text-brand-royal">{formData.service_name}</span> has been registered.
              </p>
              
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <p>A representative will contact you via phone or email shortly.</p>
                <p className="text-emerald-700 font-medium">WhatsApp chat was also initiated with your pre-formatted request.</p>
              </div>

              <div className="pt-2 flex justify-center space-x-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg bg-navy-900 text-white font-medium text-sm hover:bg-navy-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service_name"
                    value={formData.service_name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none bg-white transition-all"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enquiry Details & Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Please describe your requirements, timeline, or any specific questions..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* WhatsApp auto-forward option */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="openWa"
                  checked={openWhatsAppDirectly}
                  onChange={(e) => setOpenWhatsAppDirectly(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <label htmlFor="openWa" className="text-xs text-slate-600 flex items-center space-x-1 cursor-pointer">
                  <span>Also open WhatsApp with this message for instant chat response</span>
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold shadow-md hover:shadow-purple-glow transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <Send className="w-4 h-4 text-yellow-300" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
