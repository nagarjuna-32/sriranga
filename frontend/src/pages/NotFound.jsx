import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[75vh] bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-premium p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-navy-900 text-gold-400 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-navy-900 font-heading">404</span>
          <h2 className="text-xl font-bold text-navy-900">Page Not Found</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page you are looking for does not exist or has been relocated to another address.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-brand-royal text-white text-xs font-semibold inline-flex items-center justify-center space-x-1.5 transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center justify-center space-x-1.5 transition-all"
          >
            <span>Browse Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
