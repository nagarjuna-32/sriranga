import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Award, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Briefcase,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import StatsSection from '../components/home/StatsSection';
import CTASection from '../components/home/CTASection';

const coreValues = [
  {
    icon: ShieldCheck,
    title: 'Integrity & Transparency',
    description: 'We believe trust is earned through radical clarity. Every fee structure, procedural timeline, and documentation prerequisite is stated clearly without hidden surprises.',
  },
  {
    icon: Target,
    title: 'Client-Centric Dedication',
    description: 'Our clients are at the center of every workflow. We treat your compliance filings, software projects, and celebrations with the utmost personal accountability.',
  },
  {
    icon: Award,
    title: 'Excellence in Execution',
    description: 'We uphold rigorous quality benchmarks. Whether assembling complex legal dossiers or engineering full-stack software, our work is refined to professional standards.',
  },
  {
    icon: Sparkles,
    title: 'Continuous Digital Innovation',
    description: 'We actively combine traditional administrative advisory with modern cloud and AI workflows, ensuring our clients enjoy faster turnarounds and modern agility.',
  },
  {
    icon: FileCheck,
    title: 'Absolute Confidentiality',
    description: 'Corporate records, identity documents, and strategic business data are treated with strict privacy safeguards and enterprise-grade data protection protocols.',
  },
  {
    icon: Users,
    title: 'Multi-Disciplinary Synergy',
    description: 'Our diverse specialists collaborate internally to ensure your documentation, technology, branding, and event needs work together harmoniously.',
  },
];

const About = ({ onOpenEnquiry }) => {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header Banner - Soft Off-White / Light Gray with Charcoal Text */}
      <section className="bg-[#F1F3F5] text-charcoal-900 py-20 relative overflow-hidden border-b border-gray-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
            About Our Enterprise
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl mt-4 mb-4 tracking-tight text-charcoal-950">
            Building Trust Through Seamless Solutions
          </h1>
          <p className="text-charcoal-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            {settings.tagline}
          </p>
        </div>
      </section>

      {/* Company Story & Overview */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Our Genesis & Purpose
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-charcoal-950 leading-tight">
                Empowering Businesses by Eliminating Operational Complexity
              </h2>
              <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
                Founded with a vision to serve as a reliable one-stop corporate pillar, <strong>{settings.company_name}</strong> was born from a simple realization: entrepreneurs and growing enterprises spend too much valuable energy navigating fragmented vendors, confusing bureaucratic portals, and disjointed digital services.
              </p>
              <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
                By bringing government paperwork guidance, business registration, modern IT engineering, commercial real estate coordination, digital marketing, and event execution under one single corporate umbrella, we provide our clients with peace of mind, rapid turnaround, and unmatched accountability.
              </p>

              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-gray-200">
                <p className="text-xs text-charcoal-700 italic">
                  "Our core promise is simple: We handle the complexity of administration, technology, and execution so that you can focus 100% on expanding your vision."
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="Ranga Sri Enterprises Team Strategy"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white space-y-1">
                    <div className="font-heading font-bold text-xl text-yellow-300">
                      Ranga Sri Enterprises
                    </div>
                    <div className="text-xs text-purple-100">
                      Bengaluru, Karnataka • Multi-Service Enterprise
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-premium-hover transition-all">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center mb-6 shadow-sm">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Our Mission</span>
              <h3 className="font-heading font-bold text-2xl text-charcoal-900 mt-1 mb-4">
                To Make Business Simpler & Ideas Happen
              </h3>
              <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
                To provide high-integrity, integrated corporate and digital services that remove procedural friction, foster business compliance, accelerate digital transformation, and curate memorable corporate experiences—empowering clients to achieve their highest commercial potential.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-premium-hover transition-all">
              <div className="w-14 h-14 rounded-2xl bg-coral-50 text-coral-600 border border-coral-200 flex items-center justify-center mb-6 shadow-sm">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-coral-600">Our Vision</span>
              <h3 className="font-heading font-bold text-2xl text-charcoal-900 mt-1 mb-4">
                The Most Trusted Enterprise Partner
              </h3>
              <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
                To be recognized across the region as the benchmark multi-service enterprise, celebrated for ethical consulting, transparent processes, state-of-the-art technological execution, and enduring client partnerships that drive long-term value.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
              Guiding Principles
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-950 tracking-tight">
              Our Core Cultural Values
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
              Every project we undertake is governed by the principles that define Ranga Sri Enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-[#F8F9FA] rounded-2xl p-7 border border-gray-200 hover:border-purple-300 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-charcoal-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Corporate Compliance Note */}
      <section className="py-12 bg-[#F1F3F5] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <ShieldCheck className="w-8 h-8 text-purple-600 mx-auto" />
          <h3 className="font-heading font-bold text-base text-charcoal-900">
            Statutory Transparency & Legal Standing
          </h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            {settings.disclaimer_text}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};

export default About;
