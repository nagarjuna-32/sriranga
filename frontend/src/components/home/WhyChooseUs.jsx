import React from 'react';
import { 
  Layers, 
  ShieldCheck, 
  Clock, 
  Users, 
  Target, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const reasons = [
  {
    icon: Layers,
    title: 'Single-Window Integrated Solutions',
    description: 'Eliminate the friction of juggling multiple separate agencies. From registration and paperwork to digital development and branding, we manage your needs under one unified roof.',
    badge: 'Efficiency',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    icon: ShieldCheck,
    title: 'Strict Compliance & Confidentiality',
    description: 'Your business documentation and sensitive corporate data are protected with strict NDA practices, professional handling, and structured procedural standards.',
    badge: 'Trust',
    badgeColor: 'bg-coral-50 text-coral-700 border-coral-200',
  },
  {
    icon: Target,
    title: 'Tailored Strategic Guidance',
    description: 'We do not offer rigid cookie-cutter plans. Every service path is custom tailored to your exact corporate size, budget, operational requirements, and milestones.',
    badge: 'Precision',
    badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  },
  {
    icon: Users,
    title: 'Dedicated Account Specialist',
    description: 'Enjoy seamless direct communication with a designated relationship manager who coordinates your files, updates, and requirements with total transparency.',
    badge: 'Support',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    icon: Clock,
    title: 'Predictable Timelines & Milestones',
    description: 'Time is money in business. We define clear procedural schedules upfront, providing proactive tracking and regular updates at every execution stage.',
    badge: 'Punctuality',
    badgeColor: 'bg-coral-50 text-coral-700 border-coral-200',
  },
  {
    icon: Sparkles,
    title: 'Technology-Driven Accuracy',
    description: 'We combine modern digital workflows, automated verification, and secure cloud storage to eliminate paperwork errors and accelerate delivery.',
    badge: 'Modern',
    badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-[#F8F9FA] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
            Our Enterprise Advantage
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-950 tracking-tight">
            Why Forward-Thinking Businesses Choose <span className="text-purple-600">RANGA SRI</span>
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
            We bridge the gap between regulatory paperwork, enterprise technology, and brand growth with unmatched professionalism and accountability.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-charcoal-900 mb-2.5 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs text-purple-600 font-bold">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500" />
                  <span>Guaranteed Professional Standards</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
