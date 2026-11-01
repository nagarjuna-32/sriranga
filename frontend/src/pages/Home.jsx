import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import ServiceCard from '../components/services/ServiceCard';
import WhyChooseUs from '../components/home/WhyChooseUs';
import StatsSection from '../components/home/StatsSection';
import FeaturedPortfolio from '../components/home/FeaturedPortfolio';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import { publicService } from '../services/publicService';
import { useSettings } from '../context/SettingsContext';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = ({ onOpenEnquiry }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await publicService.getServices();
        if (res.success && res.data) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Error fetching services for home:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* 1. Hero Section */}
      <Hero onOpenEnquiry={onOpenEnquiry} />

      {/* 2. Company Introduction Overview */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7048E8] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
                Corporate Profile
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#121417] leading-snug">
                Your Strategic Growth & Operational Partner
              </h2>
              <p className="text-xs text-[#FA5252] font-semibold uppercase tracking-wider">
                {settings.tagline}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4 text-[#343A40] text-sm sm:text-base leading-relaxed">
              <p>
                <strong>{settings.company_name}</strong> is a forward-thinking multi-service enterprise dedicated to removing operational bottlenecks for businesses, professionals, and individuals.
              </p>
              <p>
                We integrate essential corporate functions—from statutory documentation and commercial registration to bespoke web technologies, digital marketing, real estate coordination, and turnkey corporate events—giving you a unified partner you can rely on.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-1.5 text-[#7048E8] font-semibold hover:text-[#5F3DC4] transition-colors text-sm"
                >
                  <span>Learn more about our mission, vision & values</span>
                  <ArrowRight className="w-4 h-4 text-[#FAB005]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Six Individual Service Cards */}
      <section className="py-20 bg-[#F8F9FA]" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7048E8] bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200/60">
              Core Enterprise Pillars
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121417] tracking-tight">
              Integrated Multi-Service Solutions
            </h2>
            <p className="text-[#495057] text-sm sm:text-base leading-relaxed">
              Choose from our six specialized service areas designed to accelerate your operational efficiency and business presence.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 rounded-2xl bg-white animate-pulse border border-gray-200"></div>
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

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#121417] text-white font-semibold text-sm hover:bg-[#7048E8] transition-all shadow-md border border-gray-800"
            >
              <span>Explore Complete Service Catalog & Process Workflow</span>
              <ArrowRight className="w-4 h-4 text-[#FAB005]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 5. Statistics Section */}
      <StatsSection />

      {/* 6. Featured Portfolio Section */}
      <FeaturedPortfolio onOpenEnquiry={onOpenEnquiry} />

      {/* 7. Customer Testimonials Section */}
      <TestimonialsSection />

      {/* 8. Call to Action Banner */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};

export default Home;
