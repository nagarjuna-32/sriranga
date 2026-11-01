import React, { useState, useEffect } from 'react';
import PortfolioCard from '../components/portfolio/PortfolioCard';
import PortfolioDetailModal from '../components/portfolio/PortfolioDetailModal';
import CTASection from '../components/home/CTASection';
import { publicService } from '../services/publicService';
import { Filter, Layers } from 'lucide-react';

const categories = [
  'All',
  'IT & Digital',
  'Business & Registration',
  'Event Management',
  'Marketing & Advertising',
  'Property & Real Estate',
  'Government & Documentation',
];

const Portfolio = ({ onOpenEnquiry }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const res = await publicService.getPortfolio(activeCategory);
        if (res.success && res.data) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <section className="bg-[#F1F3F5] text-charcoal-900 py-20 relative overflow-hidden border-b border-gray-200">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
            Proven Track Record
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl mt-4 mb-4 tracking-tight text-charcoal-950">
            Our Client Case Studies & Portfolio
          </h1>
          <p className="text-charcoal-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Discover how Ranga Sri Enterprises delivers strategic execution, technical innovation, and operational excellence for our clients.
          </p>
        </div>
      </section>

      {/* Main Portfolio Grid with Filter */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-charcoal-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 rounded-2xl bg-white animate-pulse border border-slate-200"></div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto">
              <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-navy-900 font-heading">No Projects Found</h3>
              <p className="text-xs text-slate-500 mt-1">
                No case studies currently listed under category "{activeCategory}".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj) => (
                <PortfolioCard
                  key={proj.id}
                  project={proj}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Detail Modal */}
      <PortfolioDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnquireService={onOpenEnquiry}
      />

      {/* CTA Section */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};

export default Portfolio;
