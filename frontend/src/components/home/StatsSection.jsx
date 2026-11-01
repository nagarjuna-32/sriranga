import React from 'react';
import { Award, Users, CheckCircle, Clock } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const StatsSection = () => {
  const { settings } = useSettings();

  const stats = [
    {
      icon: CheckCircle,
      value: settings.stats_projects_completed || '1,200+',
      label: 'Client Engagements Delivered',
      detail: 'Successful corporate & personal service executions',
      iconColor: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      icon: Award,
      value: settings.stats_client_satisfaction || '99.4%',
      label: 'Client Satisfaction Rating',
      detail: 'Consistently validated through verified client feedback',
      iconColor: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
    {
      icon: Users,
      value: settings.stats_expert_advisors || '15+',
      label: 'Specialized Consultants',
      detail: 'Documentation, IT, legal coordination & event leads',
      iconColor: 'bg-coral-50 text-coral-600 border-coral-200',
    },
    {
      icon: Clock,
      value: settings.stats_years_experience || '10+',
      label: 'Years Domain Expertise',
      detail: 'Decades of multi-industry hands-on practice',
      iconColor: 'bg-purple-50 text-purple-600 border-purple-200',
    },
  ];

  return (
    <section className="bg-[#F1F3F5] text-charcoal-900 py-16 border-y border-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-purple-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${stat.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-purple-600 tracking-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-charcoal-900 mb-1">
                    {stat.label}
                  </div>
                  <p className="text-xs text-charcoal-500 leading-snug">
                    {stat.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
