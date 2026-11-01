import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PortfolioCard from '../portfolio/PortfolioCard';
import PortfolioDetailModal from '../portfolio/PortfolioDetailModal';
import { publicService } from '../../services/publicService';

const FeaturedPortfolio = ({ onOpenEnquiry }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await publicService.getPortfolio();
        if (res.success && res.data) {
          // Take featured or first 3
          const featured = res.data.filter(p => p.is_featured);
          setProjects(featured.length > 0 ? featured.slice(0, 3) : res.data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching featured portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading || projects.length === 0) return null;

  return (
    <section className="py-20 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Track Record of Excellence
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-950 tracking-tight">
              Featured Client Case Studies
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
              Explore how we have structured, developed, and delivered impactful solutions across various enterprise domains.
            </p>
          </div>

          <Link
            to="/portfolio"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors group"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <PortfolioCard
              key={proj.id}
              project={proj}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <PortfolioDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnquireService={onOpenEnquiry}
      />
    </section>
  );
};

export default FeaturedPortfolio;
