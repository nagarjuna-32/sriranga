import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  FolderKanban, 
  Star, 
  X, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const categoryOptions = [
  'IT & Digital',
  'Business & Registration',
  'Event Management',
  'Marketing & Advertising',
  'Property & Real Estate',
  'Government & Documentation',
];

const AdminPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'IT & Digital',
    description: '',
    client_name: '',
    project_date: '',
    image_url: '',
    tags: '', // comma separated in form
    is_featured: false,
  });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await adminService.getAllPortfolio();
      if (res.success) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const notify = (msg, isError = false) => {
    setNotification({ msg, isError });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'IT & Digital',
      description: '',
      client_name: '',
      project_date: '',
      image_url: '',
      tags: '',
      is_featured: false,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingId(proj.id);
    const tagStr = Array.isArray(proj.tags) ? proj.tags.join(', ') : '';
    setFormData({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      client_name: proj.client_name || '',
      project_date: proj.project_date || '',
      image_url: proj.image_url || '',
      tags: tagStr,
      is_featured: !!proj.is_featured,
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setUploading(true);
    try {
      const res = await adminService.uploadImage(data);
      if (res.success && res.url) {
        const fullUrl = `http://localhost:5000${res.url}`;
        setFormData((prev) => ({ ...prev, image_url: fullUrl }));
        notify('Image uploaded successfully!');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      notify('Image upload failed.', true);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.description) {
      notify('Please complete all required fields.', true);
      return;
    }

    const tagArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      tags: tagArray,
    };

    try {
      if (editingId) {
        await adminService.updatePortfolio(editingId, payload);
        notify('Project case study updated!');
      } else {
        await adminService.createPortfolio(payload);
        notify('Project case study created!');
      }
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      console.error('Save error:', err);
      notify(err.response?.data?.message || 'Failed to save project.', true);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete project "${title}"?`)) return;
    try {
      await adminService.deletePortfolio(id);
      notify(`Project "${title}" deleted.`);
      loadProjects();
    } catch (err) {
      console.error('Delete error:', err);
      notify('Failed to delete project.', true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-navy-900">
            Portfolio & Case Studies Management
          </h2>
          <p className="text-xs text-slate-500">
            Showcase enterprise achievements, deliverables, and client milestone stories across sectors.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-purple-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
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

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-brand-royal border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No portfolio projects added yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <th className="py-3.5 px-6">Case Title & Client</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Execution Period</th>
                  <th className="py-3.5 px-6">Featured</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {proj.image_url && (
                          <img
                            src={proj.image_url}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                          />
                        )}
                        <div>
                          <div className="font-bold text-navy-900 text-sm">{proj.title}</div>
                          <div className="text-[11px] text-slate-400">{proj.client_name || 'Confidential Client'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px]">
                        {proj.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {proj.project_date || 'N/A'}
                    </td>
                    <td className="py-4 px-6">
                      {proj.is_featured ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Standard</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-brand-royal hover:bg-slate-100"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete Project"
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
            
            <div className="p-6 bg-purple-600 text-white flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg">
                  {editingId ? 'Edit Project Case Study' : 'Add New Portfolio Project'}
                </h3>
                <p className="text-xs text-purple-100">
                  Configure project showcase records and outcomes.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-purple-200 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Enterprise Fintech Customer Portal"
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none bg-white"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="e.g. Apex Financial"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Timeline / Quarter
                  </label>
                  <input
                    type="text"
                    value={formData.project_date}
                    onChange={(e) => setFormData({ ...formData, project_date: e.target.value })}
                    placeholder="e.g. Q2 2025"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Description & Outcomes <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                  placeholder="Outline the client requirement, deliverables provided, and business outcomes achieved..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, Node.js, Dashboard, Fintech"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Cover Image URL or Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://... or upload local file"
                    className="flex-1 px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-royal outline-none"
                  />
                  <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer flex items-center space-x-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center space-x-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 text-brand-royal rounded border-slate-300"
                  />
                  <span>Feature on Public Homepage</span>
                </label>
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
                  Save Project Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
