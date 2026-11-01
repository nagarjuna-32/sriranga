import React from 'react';
import { X, Calendar, User, Tag, CheckCircle2, ArrowRight } from 'lucide-react';

const PortfolioDetailModal = ({ project, onClose, onEnquireService }) => {
  if (!project) return null;
  const tags = Array.isArray(project.tags) ? project.tags : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-navy-900/70 hover:bg-navy-900 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative h-64 sm:h-72 w-full bg-navy-900">
          <img
            src={project.image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>
          <div className="absolute bottom-5 left-6 right-6">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gold-500 text-navy-900 inline-block mb-2">
              {project.category}
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata Row */}
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 pb-4 border-b border-slate-200">
            {project.client_name && (
              <div className="flex items-center space-x-1.5">
                <User className="w-4 h-4 text-brand-royal" />
                <span className="font-medium text-slate-700">Client: {project.client_name}</span>
              </div>
            )}
            {project.project_date && (
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-brand-royal" />
                <span>Execution Period: {project.project_date}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Project Case Summary
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Expertise & Capabilities Applied
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span key={i} className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 text-navy-800 border border-slate-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onEnquireService) {
                  onEnquireService(project.category);
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold shadow-md hover:shadow-purple-glow transition-all"
            >
              <span>Consult on Similar Requirement</span>
              <ArrowRight className="w-4 h-4 text-yellow-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailModal;
