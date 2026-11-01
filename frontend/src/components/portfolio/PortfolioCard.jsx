import React from 'react';
import { ExternalLink, Tag, Calendar, User } from 'lucide-react';

const PortfolioCard = ({ project, onSelect }) => {
  const tags = Array.isArray(project.tags) ? project.tags : [];

  return (
    <div 
      onClick={() => onSelect && onSelect(project)}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-premium-hover transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Project Image */}
      <div className="relative h-56 w-full overflow-hidden bg-navy-900">
        <img
          src={project.image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>
        <div className="absolute top-3 left-3">
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 text-purple-700 border border-purple-200 shadow-sm backdrop-blur-sm">
            {project.category}
          </span>
        </div>
        {project.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-coral-500 text-white shadow-sm">
              Featured Case
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-4 text-xs text-slate-400 mb-2">
            {project.client_name && (
              <div className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{project.client_name}</span>
              </div>
            )}
            {project.project_date && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{project.project_date}</span>
              </div>
            )}
          </div>

          <h3 className="font-heading font-bold text-lg text-charcoal-900 group-hover:text-purple-600 transition-colors mb-2 line-clamp-2">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-charcoal-600 line-clamp-3 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">
                #{tag}
              </span>
            ))}
          </div>

          <span className="text-xs font-bold text-purple-600 inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
            <span>Details</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
