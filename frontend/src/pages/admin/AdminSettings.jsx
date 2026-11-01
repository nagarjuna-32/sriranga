import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Building2, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Share2, 
  BarChart3, 
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useSettings } from '../../context/SettingsContext';

const AdminSettings = () => {
  const { refreshSettings } = useSettings();
  const [formState, setFormState] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await adminService.getAllSettings();
        if (res.success && res.data) {
          const map = {};
          res.data.forEach((item) => {
            map[item.setting_key] = item.setting_value || '';
          });
          setFormState(map);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const notify = (msg, isError = false) => {
    setNotification({ msg, isError });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.updateSettings(formState);
      await refreshSettings();
      notify('Website settings updated and synchronized with live site!');
    } catch (err) {
      console.error('Settings update error:', err);
      notify('Failed to update website settings.', true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="w-8 h-8 border-4 border-brand-royal border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-navy-900">
            Website Parameters & Branding
          </h2>
          <p className="text-xs text-slate-500">
            Control brand titles, WhatsApp number, contact info, working hours, and statistics displayed across the portal.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-purple-glow transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-yellow-300" />}
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-xl text-xs font-medium flex items-center space-x-2 ${
          notification.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          {notification.isError ? <AlertCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          <span>{notification.msg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 1. Company Identity */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 text-navy-900 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-brand-royal" />
            <h3 className="font-heading font-bold text-base">Corporate Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={formState.company_name || ''}
                onChange={(e) => handleChange('company_name', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Tagline
              </label>
              <input
                type="text"
                value={formState.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Hero Section Headline
            </label>
            <input
              type="text"
              value={formState.main_headline || ''}
              onChange={(e) => handleChange('main_headline', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Official Company Description
            </label>
            <textarea
              value={formState.company_description || ''}
              onChange={(e) => handleChange('company_description', e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none resize-none"
            ></textarea>
          </div>
        </div>

        {/* 2. Direct Channels & WhatsApp */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 text-navy-900 pb-3 border-b border-slate-100">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="font-heading font-bold text-base">Contact Channels & WhatsApp Desk</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Phone Number
              </label>
              <input
                type="text"
                value={formState.contact_phone || ''}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
                placeholder="+91 98450 12345"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Number <span className="text-emerald-600">(Digits only with country code)</span>
              </label>
              <input
                type="text"
                value={formState.whatsapp_number || ''}
                onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                placeholder="919845012345"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                value={formState.contact_email || ''}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                placeholder="contact@rangasrienterprises.com"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registered Physical Address
              </label>
              <textarea
                value={formState.business_address || ''}
                onChange={(e) => handleChange('business_address', e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Working Hours
              </label>
              <input
                type="text"
                value={formState.working_hours || ''}
                onChange={(e) => handleChange('working_hours', e.target.value)}
                placeholder="Monday to Saturday: 9:30 AM – 6:30 PM (Sunday Closed)"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Google Maps Embed URL (iframe src)
            </label>
            <input
              type="text"
              value={formState.google_maps_embed || ''}
              onChange={(e) => handleChange('google_maps_embed', e.target.value)}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none font-mono"
            />
          </div>
        </div>

        {/* 3. Real Business Statistics */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 text-navy-900 pb-3 border-b border-slate-100">
            <BarChart3 className="w-5 h-5 text-gold-500" />
            <h3 className="font-heading font-bold text-base">Key Metrics (Public Counters)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Engagements Delivered
              </label>
              <input
                type="text"
                value={formState.stats_projects_completed || ''}
                onChange={(e) => handleChange('stats_projects_completed', e.target.value)}
                placeholder="1,200+"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client Satisfaction
              </label>
              <input
                type="text"
                value={formState.stats_client_satisfaction || ''}
                onChange={(e) => handleChange('stats_client_satisfaction', e.target.value)}
                placeholder="99.4%"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Expert Specialists
              </label>
              <input
                type="text"
                value={formState.stats_expert_advisors || ''}
                onChange={(e) => handleChange('stats_expert_advisors', e.target.value)}
                placeholder="15+"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Years Experience
              </label>
              <input
                type="text"
                value={formState.stats_years_experience || ''}
                onChange={(e) => handleChange('stats_years_experience', e.target.value)}
                placeholder="10+"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>
          </div>
        </div>

        {/* 4. Social Links */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 text-navy-900 pb-3 border-b border-slate-100">
            <Share2 className="w-5 h-5 text-brand-royal" />
            <h3 className="font-heading font-bold text-base">Social Media Links</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formState.linkedin_url || ''}
                onChange={(e) => handleChange('linkedin_url', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Facebook Page
              </label>
              <input
                type="url"
                value={formState.facebook_url || ''}
                onChange={(e) => handleChange('facebook_url', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Instagram Profile
              </label>
              <input
                type="url"
                value={formState.instagram_url || ''}
                onChange={(e) => handleChange('instagram_url', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Twitter / X Profile
              </label>
              <input
                type="url"
                value={formState.twitter_url || ''}
                onChange={(e) => handleChange('twitter_url', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
              />
            </div>
          </div>
        </div>

        {/* 5. Statutory Disclaimer */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 text-navy-900 pb-3 border-b border-slate-100">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h3 className="font-heading font-bold text-base">Statutory Notice & Footer Disclaimer</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Public Legal Disclaimer (Displayed on all public footers and legal sections)
            </label>
            <textarea
              value={formState.disclaimer_text || ''}
              onChange={(e) => handleChange('disclaimer_text', e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
            ></textarea>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold shadow-lg hover:shadow-purple-glow transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-yellow-300" />}
            <span>Save All Website Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;
