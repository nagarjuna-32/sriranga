import React, { createContext, useContext, useState, useEffect } from 'react';
import { publicService } from '../services/publicService';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    company_name: 'RANGA SRI ENTERPRISES',
    logo_url: '/logo.jpg',
    tagline: 'Your Trusted Partner for Business & Digital Solutions',
    main_headline: 'Making Business Simpler. Making Ideas Happen.',
    company_description: 'Ranga Sri Enterprises provides integrated professional services across government documentation, business registration, IT and digital solutions, property and real estate, marketing and advertising, and event management.',
    contact_phone: '+91 98450 12345',
    whatsapp_number: '919845012345',
    contact_email: 'contact@rangasrienterprises.com',
    business_address: 'Suite 302, Sri Krishna Towers, Outer Ring Road, Bengaluru, Karnataka 560103, India',
    working_hours: 'Monday to Saturday: 9:30 AM – 6:30 PM (Sunday Closed)',
    facebook_url: 'https://facebook.com/rangasrienterprises',
    linkedin_url: 'https://linkedin.com/company/rangasrienterprises',
    instagram_url: 'https://instagram.com/rangasrienterprises',
    twitter_url: 'https://x.com/rangasri_ent',
    google_maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.589855589142!2d77.68351547590858!3d12.934057887377884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13b41984b655%3A0xb3bc872f2d9c4456!2sOuter%20Ring%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin',
    stats_projects_completed: '1,200+',
    stats_client_satisfaction: '99.4%',
    stats_expert_advisors: '15+',
    stats_years_experience: '10+',
    disclaimer_text: 'Disclaimer: Ranga Sri Enterprises is an independent consultancy and service facilitation provider. We do not claim official government affiliation, authority or licensing unless explicitly specified. All government-related and administrative services are provided on a procedural assistance and facilitation basis.',
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await publicService.getSettings();
      if (res.success && res.data) {
        setSettings((prev) => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.warn('Could not fetch dynamic settings, utilizing corporate defaults:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
