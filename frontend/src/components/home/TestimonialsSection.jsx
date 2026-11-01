import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { publicService } from '../../services/publicService';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await publicService.getTestimonials();
        if (res.success && res.data) {
          setTestimonials(res.data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-[#F8F9FA] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
            Client Voices
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-950 tracking-tight">
            Trusted by Leaders Across Industries
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
            Read verified feedback from founders, executives, and organizations who partnered with Ranga Sri Enterprises.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-purple-100 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Rating Stars - Vibrant Yellow */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-charcoal-700 leading-relaxed italic mb-6 relative z-10">
                  "{review.content}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-gray-100 flex items-center space-x-3.5">
                <img
                  src={review.image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt={review.client_name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-purple-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-charcoal-900 font-heading">
                    {review.client_name}
                  </h4>
                  <p className="text-xs text-charcoal-500">
                    {review.designation}{review.company ? `, ${review.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to read more or submit */}
        <div className="mt-12 text-center">
          <Link
            to="/testimonials"
            className="inline-flex items-center space-x-2 text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors"
          >
            <span>Read More Reviews or Submit Your Experience</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
