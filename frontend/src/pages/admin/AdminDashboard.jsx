import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  FolderKanban, 
  MessageSquareQuote, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MessageCircle,
  PlusCircle,
  Settings
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useSettings } from '../../context/SettingsContext';
import { createWhatsAppChatUrl } from '../../utils/whatsapp';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

  const loadData = async () => {
    try {
      const res = await adminService.getDashboardStats();
      if (res.success) {
        setStats(res.stats);
        setRecentEnquiries(res.recentEnquiries);
      }
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuickStatusChange = async (enquiryId, newStatus) => {
    try {
      await adminService.updateEnquiryStatus(enquiryId, newStatus);
      loadData();
    } catch (err) {
      console.error('Error updating enquiry status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-brand-royal border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Enquiries',
      value: stats?.totalEnquiries || 0,
      sub: `${stats?.pendingEnquiries || 0} Pending Attention`,
      icon: Mail,
      color: 'bg-blue-500',
      link: '/admin/enquiries',
    },
    {
      label: 'New / Pending Enquiries',
      value: stats?.pendingEnquiries || 0,
      sub: 'Action required',
      icon: Clock,
      color: 'bg-amber-500',
      link: '/admin/enquiries?status=pending',
    },
    {
      label: 'Active Services',
      value: `${stats?.activeServices || 0} / ${stats?.totalServices || 0}`,
      sub: 'Multi-service offerings',
      icon: Briefcase,
      color: 'bg-emerald-500',
      link: '/admin/services',
    },
    {
      label: 'Portfolio Projects',
      value: stats?.totalProjects || 0,
      sub: 'Showcased case studies',
      icon: FolderKanban,
      color: 'bg-indigo-500',
      link: '/admin/portfolio',
    },
    {
      label: 'Pending Testimonials',
      value: stats?.pendingTestimonials || 0,
      sub: `${stats?.totalTestimonials || 0} Total reviews`,
      icon: MessageSquareQuote,
      color: 'bg-purple-500',
      link: '/admin/testimonials',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            Welcome to the Command Center
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-950 mt-1">
            {settings.company_name} Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Monitor real-time customer submissions, manage services, case studies, and configure website parameters.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            to="/admin/services"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5 text-yellow-300" />
            <span>Manage Services</span>
          </Link>
          <Link
            to="/admin/settings"
            className="px-4 py-2 rounded-xl bg-white border border-gray-300 text-charcoal-800 hover:bg-gray-50 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <Settings className="w-3.5 h-3.5 text-charcoal-400" />
            <span>Site Settings</span>
          </Link>
        </div>
      </div>

      {/* 5 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={i}
              to={card.link}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-premium-hover transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {card.label}
                </span>
                <div className={`w-8 h-8 rounded-lg ${card.color} text-white flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900 group-hover:text-brand-royal transition-colors">
                  {card.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {card.sub}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-navy-900">
              Recent Customer Inquiries
            </h3>
            <p className="text-xs text-slate-500">
              Latest requests logged via public web forms and WhatsApp integration.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold text-brand-royal hover:underline inline-flex items-center space-x-1"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No inquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <th className="py-3 px-6">Customer</th>
                  <th className="py-3 px-6">Phone / Contact</th>
                  <th className="py-3 px-6">Service Requested</th>
                  <th className="py-3 px-6">Message Preview</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-semibold text-navy-900">
                      {enquiry.name}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-700">{enquiry.phone}</div>
                      {enquiry.email && <div className="text-[10px] text-slate-400">{enquiry.email}</div>}
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-medium">
                      {enquiry.service_name}
                    </td>
                    <td className="py-4 px-6 max-w-xs truncate text-slate-600">
                      {enquiry.message}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleQuickStatusChange(enquiry.id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                          enquiry.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : enquiry.status === 'contacted'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {/* WhatsApp reply button */}
                      <a
                        href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${enquiry.name}, thank you for contacting Ranga Sri Enterprises regarding ${enquiry.service_name}. How can we assist you?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-[10px]"
                        title="Direct reply on WhatsApp"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
