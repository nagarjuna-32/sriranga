import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  X,
  FileText
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [notification, setNotification] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (searchQuery) params.search = searchQuery;

      const res = await adminService.getEnquiries(params);
      if (res.success) {
        setEnquiries(res.data);
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const showToast = (msg, isError = false) => {
    setNotification({ msg, isError });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStatusChange = async (id, status, notes) => {
    try {
      await adminService.updateEnquiryStatus(id, status, notes);
      showToast(`Status updated to "${status}".`);
      fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status, admin_notes: notes !== undefined ? notes : prev.admin_notes }));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      showToast('Status update failed.', true);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete enquiry from customer "${name}"?`)) return;
    try {
      await adminService.deleteEnquiry(id);
      showToast('Enquiry record deleted.');
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      fetchEnquiries();
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Failed to delete enquiry.', true);
    }
  };

  const openDetails = (item) => {
    setSelectedEnquiry(item);
    setAdminNotes(item.admin_notes || '');
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-navy-900">
            Customer Enquiries Management
          </h2>
          <p className="text-xs text-slate-500">
            Inspect incoming prospect inquiries, coordinate consultations, update status workflows, and respond via WhatsApp.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div className={`p-4 rounded-xl text-xs font-medium flex items-center space-x-2 ${
          notification.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          {notification.isError ? <AlertCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center space-x-1.5 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {[
            { label: 'All Inquiries', val: '' },
            { label: 'Pending', val: 'pending' },
            { label: 'Contacted', val: 'contacted' },
            { label: 'Completed', val: 'completed' },
          ].map((tab) => (
            <button
              key={tab.val}
              onClick={() => setStatusFilter(tab.val)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === tab.val
                  ? 'bg-navy-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-full md:w-80">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, email..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-brand-royal border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No customer enquiries found matching the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Customer Name</th>
                  <th className="py-3.5 px-6">Contact Details</th>
                  <th className="py-3.5 px-6">Requested Pillar</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">
                      {new Date(item.created_at || item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 font-bold text-navy-900 text-sm">
                      {item.name}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-800">{item.phone}</div>
                      {item.email && <div className="text-[10px] text-slate-400">{item.email}</div>}
                    </td>
                    <td className="py-4 px-6 text-brand-royal font-medium">
                      {item.service_name}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                          item.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status === 'contacted'
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
                      {/* WhatsApp trigger */}
                      <a
                        href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${item.name}, this is Ranga Sri Enterprises following up on your inquiry for ${item.service_name}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        title="Open WhatsApp chat with client"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => openDetails(item)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-navy-900 hover:bg-slate-100"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enquiry Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-6 bg-navy-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-gold-400">Enquiry #{selectedEnquiry.id}</span>
                <h3 className="font-heading font-bold text-lg text-white">
                  Customer Consultation Record
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block mb-0.5">Customer Name:</span>
                  <span className="font-bold text-sm text-navy-900">{selectedEnquiry.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Phone Number:</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="font-bold text-sm text-brand-royal hover:underline">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Email:</span>
                  <span className="font-medium text-slate-700">{selectedEnquiry.email || 'None provided'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Service Pillar:</span>
                  <span className="font-semibold text-emerald-700">{selectedEnquiry.service_name}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                  Customer Message:
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-wrap text-sm">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Internal Administrative Notes:
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record call summary, quotation sent, next steps..."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedEnquiry.name}, this is Ranga Sri Enterprises following up on your inquiry for ${selectedEnquiry.service_name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center space-x-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reply on WhatsApp</span>
                </a>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleStatusChange(selectedEnquiry.id, selectedEnquiry.status, adminNotes)}
                    className="px-4 py-2 bg-navy-900 hover:bg-brand-royal text-white rounded-lg text-xs font-semibold"
                  >
                    Save Notes
                  </button>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
