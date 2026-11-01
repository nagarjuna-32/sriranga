import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Star, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  MessageSquare
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    client_name: '',
    designation: '',
    company: '',
    content: '',
    rating: 5,
    image_url: '',
    status: 'approved',
  });

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const res = await adminService.getAllTestimonials(params);
      if (res.success) {
        setTestimonials(res.data);
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, [statusFilter]);

  const notify = (msg, isError = false) => {
    setNotification({ msg, isError });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      client_name: '',
      designation: '',
      company: '',
      content: '',
      rating: 5,
      image_url: '',
      status: 'approved',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingId(t.id);
    setFormData({
      client_name: t.client_name,
      designation: t.designation || '',
      company: t.company || '',
      content: t.content,
      rating: t.rating || 5,
      image_url: t.image_url || '',
      status: t.status,
    });
    setModalOpen(true);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await adminService.updateTestimonialStatus(id, newStatus);
      notify(`Testimonial marked as ${newStatus}.`);
      loadTestimonials();
    } catch (err) {
      console.error('Failed to update status:', err);
      notify('Failed to update status.', true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.client_name || !formData.content) {
      notify('Client name and review content are required.', true);
      return;
    }

    try {
      if (editingId) {
        await adminService.updateTestimonial(editingId, formData);
        notify('Testimonial updated successfully.');
      } else {
        await adminService.createTestimonial(formData);
        notify('Testimonial created.');
      }
      setModalOpen(false);
      loadTestimonials();
    } catch (err) {
      console.error('Save error:', err);
      notify('Error saving testimonial.', true);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;
    try {
      await adminService.deleteTestimonial(id);
      notify('Testimonial removed.');
      loadTestimonials();
    } catch (err) {
      console.error('Delete error:', err);
      notify('Error deleting testimonial.', true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-navy-900">
            Client Testimonials & Feedback
          </h2>
          <p className="text-xs text-slate-500">
            Moderate submitted public reviews, approve genuine client feedback, or manually enter client stories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-purple-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
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

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-slate-200 w-fit">
        {[
          { label: 'All Reviews', val: '' },
          { label: 'Pending Approval', val: 'pending' },
          { label: 'Approved & Public', val: 'approved' },
          { label: 'Rejected', val: 'rejected' },
        ].map((tab) => (
          <button
            key={tab.val}
            onClick={() => setStatusFilter(tab.val)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === tab.val
                ? 'bg-navy-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Testimonials Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-brand-royal border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No testimonials match the chosen criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <th className="py-3.5 px-6">Client / Representative</th>
                  <th className="py-3.5 px-6">Rating</th>
                  <th className="py-3.5 px-6">Review Excerpt</th>
                  <th className="py-3.5 px-6">Approval Status</th>
                  <th className="py-3.5 px-6 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-900 text-sm">{t.client_name}</div>
                      <div className="text-[11px] text-slate-400">
                        {t.designation}{t.company ? ` • ${t.company}` : ''}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-gold-500 font-bold">
                        <span>{t.rating} ★</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 max-w-sm truncate text-slate-600 italic">
                      "{t.content}"
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        t.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : t.status === 'rejected'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {t.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1.5">
                      {t.status !== 'approved' && (
                        <button
                          onClick={() => handleStatusUpdate(t.id, 'approved')}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold"
                          title="Approve for public display"
                        >
                          Approve
                        </button>
                      )}
                      {t.status !== 'rejected' && (
                        <button
                          onClick={() => handleStatusUpdate(t.id, 'rejected')}
                          className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold"
                          title="Reject"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenEdit(t)}
                        className="p-1 rounded text-slate-500 hover:text-navy-900 hover:bg-slate-100"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id, t.client_name)}
                        className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-6 bg-purple-600 text-white flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg">
                  {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-purple-200 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Client Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="e.g. Ramesh S."
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Managing Director"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Trident Group"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Star Rating
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none bg-white"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none bg-white"
                  >
                    <option value="approved">Approved (Public)</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Testimonial Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  required
                  placeholder="Review statement..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-purple-glow"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
