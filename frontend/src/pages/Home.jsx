import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import TargetCustomersSection from '../components/home/TargetCustomersSection';
import ServiceCard from '../components/services/ServiceCard';
import WhyChooseUs from '../components/home/WhyChooseUs';
import StatsSection from '../components/home/StatsSection';
import FeaturedPortfolio from '../components/home/FeaturedPortfolio';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import { publicService } from '../services/publicService';
import { useSettings } from '../context/SettingsContext';
import { ArrowRight, Sparkles, ShieldCheck, Grid, Layers, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_SERVICES } from '../data/servicesCatalog';

const Home = ({ onOpenEnquiry }) => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await publicService.getServices();
        if (res.success && res.data && res.data.length > 0) {
          // Select 6 representative services from different categories
          setFeaturedServices(res.data.slice(0, 6));
        } else {
          setFeaturedServices(ALL_SERVICES.slice(0, 6));
        }
      } catch (err) {
        console.warn('Using client services fallback for home:', err);
        setFeaturedServices(ALL_SERVICES.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* 1. Hero Section with Search, 20-Category Preview, Target Audiences */}
      <Hero onOpenEnquiry={onOpenEnquiry} />

      {/* 2. 20 Main Categories Interactive Grid */}
      <CategoryGrid onOpenEnquiry={onOpenEnquiry} />

      {/* 3. Target Customer Groups & Operational Business Model */}
      <TargetCustomersSection onOpenEnquiry={onOpenEnquiry} />

      {/* 4. Featured Services Snapshot from 400 Catalog */}
      <section className="py-20 bg-white border-b border-gray-200" id="featured-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold mb-3">
                <Layers className="w-3.5 h-3.5 text-coral-500" />
                <span>Selected Offerings from 400 Services</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-charcoal-950">
                Explore Popular Service Solutions
              </h2>
              <p className="text-charcoal-600 text-xs sm:text-sm mt-1 max-w-2xl">
                Browse popular requirements or filter our complete catalog across all 31 districts of Karnataka.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all self-start md:self-auto"
            >
              <span>View All 400 Services Catalog</span>
              <ArrowRight className="w-4 h-4 text-yellow-300" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-gray-50 animate-pulse border border-gray-200"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard
                  key={service.id || service.slug}
                  service={service}
                  onOpenEnquiry={onOpenEnquiry}
                />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#121417] text-white font-bold text-sm hover:bg-purple-700 transition-all shadow-md border border-gray-800"
            >
              <span>Explore Complete 400-Service Directory & Districts</span>
              <ArrowRight className="w-4 h-4 text-yellow-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 6. Real Statistics Section (20 Categories, 400 Services, 31 Districts, 10,000+ Requirements) */}
      <StatsSection />

      {/* 7. Featured Client Projects Portfolio */}
      <FeaturedPortfolio onOpenEnquiry={onOpenEnquiry} />

      {/* 8. Customer Testimonials */}
      <TestimonialsSection />

      {/* 9. Final Call to Action Banner */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};

export default Home;
