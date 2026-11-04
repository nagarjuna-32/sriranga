import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Upload, 
  Briefcase, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Search,
  Filter
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { RAW_CATEGORIES } from '../../data/servicesCatalog';

const iconOptions = [
  'FileText',
  'Building2',
  'Code',
  'Home',
  'TrendingUp',
  'Calendar',
  'Briefcase',
  'Hammer',
  'DraftingCompass',
  'Paintbrush',
  'Truck',
  'HardHat',
  'Wrench',
  'Scale',
  'CreditCard',
  'Laptop',
  'Wheat',
  'ShieldCheck',
  'HeartPulse',
  'GraduationCap',
  'Car',
  'Sparkles',
  'Utensils',
];

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Construction & Civil Works',
    short_description: '',
    full_description: '',
    icon: 'Briefcase',
    features: '', // newline separated in form
    image_url: '',
    is_active: true,
    display_order: 1,
  });

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await adminService.getAllServices();
      if (res.success) {
        setServices(res.data);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const showNotification = (msg, isError = false) => {
    setNotification({ msg, isError });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Corporate Solutions',
      short_description: '',
      full_description: '',
      icon: 'Briefcase',
      features: '',
      image_url: '',
      is_active: true,
      display_order: services.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingId(srv.id);
    const featStr = Array.isArray(srv.features) ? srv.features.join('\n') : '';
    setFormData({
      title: srv.title,
      category: srv.category,
      short_description: srv.short_description,
      full_description: srv.full_description,
      icon: srv.icon || 'Briefcase',
      features: featStr,
      image_url: srv.image_url || '',
      is_active: srv.is_active,
      display_order: srv.display_order || 1,
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    setUploading(true);
    try {
      const res = await adminService.uploadImage(uploadData);
      if (res.success && res.url) {
        // Backend returns e.g. /uploads/filename. In frontend, set image_url
        const fullUrl = `http://localhost:5000${res.url}`;
        setFormData((prev) => ({ ...prev, image_url: fullUrl }));
        showNotification('Image uploaded successfully!');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      showNotification('Image upload failed. Ensure file is an image under 5MB.', true);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.short_description || !formData.full_description) {
      showNotification('Please fill in all mandatory fields.', true);
      return;
    }

    const featuresArray = formData.features
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      features: featuresArray,
    };

    try {
      if (editingId) {
        await adminService.updateService(editingId, payload);
        showNotification('Service updated successfully!');
      } else {
        await adminService.createService(payload);
        showNotification('Service created successfully!');
      }
      setModalOpen(false);
      loadServices();
    } catch (err) {
      console.error('Failed to save service:', err);
      showNotification(err.response?.data?.message || 'Error saving service.', true);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete service "${title}"?`)) return;

    try {
      await adminService.deleteService(id);
      showNotification(`Service "${title}" deleted.`);
      loadServices();
    } catch (err) {
      console.error('Failed to delete service:', err);
      showNotification('Could not delete service.', true);
    }
  };

  const handleToggleActive = async (srv) => {
    try {
      await adminService.updateService(srv.id, { is_active: !srv.is_active });
      loadServices();
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const filteredServices = services.filter((srv) => {
    const matchesSearch = !searchQuery || 
      srv.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (srv.short_description && srv.short_description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (srv.category && srv.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || srv.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Enterprise Catalog
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-charcoal-950 mt-2">
            Service Management (400 Services)
          </h2>
          <p className="text-xs text-charcoal-500">
            Configure multi-service offerings, descriptions, bullet features, and public display visibility across all 20 categories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-purple-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search among 400 services by title, description or category..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] rounded-xl text-xs border border-gray-200 focus:outline-none focus:border-purple-500 text-charcoal-900 placeholder-charcoal-400 font-medium"
          />
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs font-bold text-charcoal-800 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="All">All 20 Categories ({services.length} Services)</option>
            {RAW_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-2 rounded-xl border border-purple-200 whitespace-nowrap">
            Showing {filteredServices.length} of {services.length}
          </span>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-xl text-xs font-medium flex items-center space-x-2 ${
          notification.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          {notification.isError ? <AlertCircle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <th className="py-3.5 px-6">Order</th>
                  <th className="py-3.5 px-6">Service Title & Category</th>
                  <th className="py-3.5 px-6">Icon</th>
                  <th className="py-3.5 px-6">Features Count</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredServices.slice(0, 100).map((srv) => (
                  <tr key={srv.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-400">
                      #{srv.display_order}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-900 text-sm">{srv.title}</div>
                      <div className="text-[11px] text-purple-700 font-semibold">{srv.category} • /{srv.slug}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-mono">
                      {srv.icon}
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {Array.isArray(srv.features) ? srv.features.length : 0} items
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleToggleActive(srv)}
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          srv.is_active
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                        title="Click to toggle active status"
                      >
                        {srv.is_active ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3 text-slate-400" />}
                        <span>{srv.is_active ? 'Active' : 'Hidden'}</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(srv)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-purple-600 hover:bg-slate-100 transition-colors"
                        title="Edit service"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(srv.id, srv.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete service"
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

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 bg-purple-600 text-white flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg">
                  {editingId ? 'Edit Enterprise Service' : 'Add New Enterprise Service'}
                </h3>
                <p className="text-xs text-purple-100">
                  Update database records and public website representation.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-purple-200 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Government & Documentation"
                    required
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category Tag <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-purple-600 outline-none bg-white font-medium"
                  >
                    {RAW_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Icon Symbol
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none bg-white"
                  >
                    {iconOptions.map((ic) => (
                      <option key={ic} value={ic}>{ic}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center space-x-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4 text-brand-royal rounded border-slate-300"
                    />
                    <span>Active on Public Site</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description (Card Summary) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  rows={2}
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Description (Detailed Page) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  rows={4}
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Features / Deliverables (One per line)
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={4}
                  placeholder="Documentation assistance and file audit&#10;Application support for central and state citizen services&#10;Administrative support"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none font-mono"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Image URL or Upload New
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://... or upload below"
                    className="flex-1 px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                  />
                  <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer flex items-center space-x-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end space-x-2">
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
