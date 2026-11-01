import React, { useState, useEffect } from 'react';
import { Star, Quote, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { publicService } from '../services/publicService';
import CTASection from '../components/home/CTASection';

const Testimonials = ({ onOpenEnquiry }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    client_name: '',
    designation: '',
    company: '',
    rating: 5,
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await publicService.getTestimonials();
        if (res.success && res.data) {
          setReviews(res.data);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.client_name.trim() || !formData.content.trim()) {
      setErrorMsg('Please enter your name and review details.');
      return;
    }

    setSubmitting(true);
    try {
      await publicService.submitTestimonial(formData);
      setSubmitted(true);
      setFormData({
        client_name: '',
        designation: '',
        company: '',
        rating: 5,
        content: '',
      });
    } catch (err) {
      console.error('Error submitting review:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <section className="bg-[#F1F3F5] text-charcoal-900 py-20 relative overflow-hidden border-b border-gray-200">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
            Client Voices & Validation
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl mt-4 mb-4 tracking-tight text-charcoal-950">
            Client Testimonials & Experiences
          </h1>
          <p className="text-charcoal-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Real feedback from organizations, entrepreneurs, and families who rely on Ranga Sri Enterprises.
          </p>
        </div>
      </section>

      {/* Testimonials Grid & Review Submission Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 7 Cols: Public Approved Reviews */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Verified Reviews
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-900 mt-2 mb-2">
                  What Clients Say About Working With Us
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Only authentic, verified reviews are published below following compliance review.
                </p>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-44 bg-white rounded-2xl animate-pulse border border-slate-200"></div>
                  ))}
                </div>
              ) : reviews.length === 0 ? (
                <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
                  No public reviews published yet. Be the first to share your experience!
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm relative overflow-hidden"
                    >
                      <Quote className="w-10 h-10 text-slate-100 absolute top-4 right-4 pointer-events-none" />

                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                        ))}
                      </div>

                      <p className="text-sm text-slate-700 leading-relaxed italic mb-6 relative z-10">
                        "{rev.content}"
                      </p>

                      <div className="flex items-center space-x-3 pt-3 border-t border-slate-100">
                        <img
                          src={rev.image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                          alt={rev.client_name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-heading font-bold text-sm text-navy-900">
                            {rev.client_name}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {rev.designation}{rev.company ? ` • ${rev.company}` : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right 5 Cols: Submit Feedback Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-white rounded-2xl border border-slate-200 shadow-premium p-6 sm:p-8 space-y-6">
                
                <div>
                  <div className="flex items-center space-x-2 text-gold-600 mb-1">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Client Feedback</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-navy-900">
                    Share Your Experience
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Have you partnered with Ranga Sri Enterprises? We appreciate your honest feedback. Submissions are moderated prior to public display.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-slate-900 text-base">Thank You!</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Your testimonial has been submitted successfully for verification. We appreciate your valuable partnership.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-brand-royal font-semibold hover:underline"
                    >
                      Submit another review
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleChange}
                        placeholder="e.g. Priyadarshini M."
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Role / Title
                        </label>
                        <input
                          type="text"
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          placeholder="e.g. Co-founder"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Organization
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="e.g. Acme Corp"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Rating
                      </label>
                      <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal outline-none bg-white"
                      >
                        <option value="5">★★★★★ 5 Stars (Exceptional)</option>
                        <option value="4">★★★★☆ 4 Stars (Very Good)</option>
                        <option value="3">★★★☆☆ 3 Stars (Satisfactory)</option>
                        <option value="2">★★☆☆☆ 2 Stars (Needs Improvement)</option>
                        <option value="1">★☆☆☆☆ 1 Star (Unsatisfactory)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Review / Experience <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Please share details about our service delivery, punctuality, and staff interaction..."
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-royal outline-none resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-xl bg-navy-900 hover:bg-brand-royal text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <span>Submit for Verification</span>
                      <Send className="w-4 h-4 text-gold-400" />
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};

export default Testimonials;
