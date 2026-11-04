import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle, 
  MessageCircle, 
  MapPin, 
  Briefcase, 
  Trash2, 
  Eye, 
  Check, 
  AlertCircle,
  FileText,
  Phone,
  Mail,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { KARNATAKA_DISTRICTS } from '../../data/servicesCatalog';

const AdminProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (districtFilter !== 'All') params.district = districtFilter;
      if (searchQuery) params.search = searchQuery;

      const res = await adminService.getAllProviders(params);
      if (res.success) {
        setProviders(res.providers || []);
      }
    } catch (err) {
      console.error('Error fetching providers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [statusFilter, districtFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProviders();
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setActionLoading(true);
    try {
      await adminService.updateProviderStatus(id, newStatus, adminNotes);
      if (selectedProvider && selectedProvider.id === id) {
        setSelectedProvider(prev => ({ ...prev, status: newStatus, admin_notes: adminNotes }));
      }
      fetchProviders();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update provider status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this provider application?')) return;
    try {
      await adminService.deleteProvider(id);
      if (selectedProvider && selectedProvider.id === id) {
        setSelectedProvider(null);
      }
      fetchProviders();
    } catch (err) {
      console.error('Error deleting provider:', err);
      alert('Failed to delete provider');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Partner Network Management
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-950 mt-2">
            Verified Service Providers & Contractors
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Review partner registrations, verify documents, and activate verified providers across Karnataka.
          </p>
        </div>

        <button
          onClick={fetchProviders}
          className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-bold border border-purple-200 inline-flex items-center space-x-2 transition-all self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by provider name, business name, phone, or service..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] rounded-xl text-xs border border-gray-200 focus:outline-none focus:border-purple-500 text-charcoal-900 placeholder-charcoal-400 font-medium"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center space-x-1 bg-[#F8F9FA] p-1 rounded-xl border border-gray-200">
            {[
              { id: 'all', label: 'All' },
              { id: 'pending', label: 'Pending' },
              { id: 'verified', label: 'Verified' },
              { id: 'rejected', label: 'Rejected' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === tab.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* District Filter */}
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs font-bold text-charcoal-800 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="All">All Karnataka Districts</option>
            {KARNATAKA_DISTRICTS.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Provider List & Detail Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Table / List View */}
        <div className={`${selectedProvider ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all`}>
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
            <span className="text-xs font-extrabold text-charcoal-900">
              Providers Found: {providers.length}
            </span>
            <span className="text-[11px] text-charcoal-500">
              Click any provider to view full credentials
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs text-charcoal-500">Loading verified providers...</p>
            </div>
          ) : providers.length === 0 ? (
            <div className="p-12 text-center text-charcoal-500">
              <Users className="w-10 h-10 text-charcoal-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-charcoal-800">No partner registrations match criteria.</p>
              <p className="text-xs text-charcoal-500 mt-1">Try resetting filters or search terms.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 text-charcoal-500 uppercase tracking-wider text-[10px] border-b border-gray-200">
                    <th className="py-3 px-4 font-bold">Partner Name</th>
                    <th className="py-3 px-4 font-bold">Type / Category</th>
                    <th className="py-3 px-4 font-bold">District</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {providers.map((p) => {
                    const isSelected = selectedProvider?.id === p.id;
                    return (
                      <tr 
                        key={p.id}
                        onClick={() => {
                          setSelectedProvider(p);
                          setAdminNotes(p.admin_notes || '');
                        }}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-purple-50/80 font-medium' : 'hover:bg-gray-50/80'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-charcoal-950">{p.full_name}</div>
                          {p.business_name && (
                            <div className="text-[11px] text-purple-700 font-semibold">{p.business_name}</div>
                          )}
                          <div className="text-[10px] text-charcoal-500">{p.phone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-charcoal-700 px-2 py-0.5 rounded-md inline-block">
                            {p.provider_type || 'Provider'}
                          </span>
                          <div className="text-[11px] text-charcoal-800 truncate max-w-[160px] mt-0.5">
                            {p.primary_category || 'Multi-Service'}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-1 text-charcoal-700 font-medium">
                            <MapPin className="w-3 h-3 text-coral-500 flex-shrink-0" />
                            <span>{p.district || 'Karnataka'}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            p.status === 'verified'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : p.status === 'rejected'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {p.status === 'verified' && <CheckCircle className="w-2.5 h-2.5" />}
                            {p.status === 'pending' && <Clock className="w-2.5 h-2.5" />}
                            {p.status === 'rejected' && <XCircle className="w-2.5 h-2.5" />}
                            <span className="capitalize">{p.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`https://wa.me/${p.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${p.full_name}, greeting from Ranga Sri Enterprises regarding your partner registration as ${p.provider_type || 'service provider'}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 inline-block transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                            title="Delete Registration"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Provider Details Pane */}
        {selectedProvider && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-purple-200 shadow-md p-6 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-gray-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
                  {selectedProvider.provider_type || 'Registered Partner'}
                </span>
                <h3 className="font-heading font-extrabold text-xl text-charcoal-950 mt-1">
                  {selectedProvider.full_name}
                </h3>
                {selectedProvider.business_name && (
                  <p className="text-xs font-semibold text-charcoal-600">
                    {selectedProvider.business_name}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedProvider(null)}
                className="text-charcoal-400 hover:text-charcoal-700 p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Contact & District Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F8F9FA] rounded-xl border border-gray-200">
                <div className="flex items-center space-x-1.5 text-charcoal-500 mb-1">
                  <Phone className="w-3.5 h-3.5 text-purple-600" />
                  <span className="font-bold">Phone Number</span>
                </div>
                <div className="font-bold text-charcoal-900">{selectedProvider.phone}</div>
              </div>

              <div className="p-3 bg-[#F8F9FA] rounded-xl border border-gray-200">
                <div className="flex items-center space-x-1.5 text-charcoal-500 mb-1">
                  <Mail className="w-3.5 h-3.5 text-purple-600" />
                  <span className="font-bold">Email Address</span>
                </div>
                <div className="font-bold text-charcoal-900 truncate">
                  {selectedProvider.email || 'Not provided'}
                </div>
              </div>

              <div className="p-3 bg-[#F8F9FA] rounded-xl border border-gray-200">
                <div className="flex items-center space-x-1.5 text-charcoal-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-coral-500" />
                  <span className="font-bold">Home District</span>
                </div>
                <div className="font-bold text-charcoal-900">{selectedProvider.district}</div>
              </div>

              <div className="p-3 bg-[#F8F9FA] rounded-xl border border-gray-200">
                <div className="flex items-center space-x-1.5 text-charcoal-500 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                  <span className="font-bold">Experience</span>
                </div>
                <div className="font-bold text-charcoal-900">{selectedProvider.experience || 'Not specified'}</div>
              </div>
            </div>

            {/* Category & Services */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-charcoal-900 block">
                Primary Category
              </span>
              <div className="text-xs p-3 bg-purple-50 text-purple-900 rounded-xl border border-purple-200 font-semibold">
                {selectedProvider.primary_category}
              </div>
            </div>

            {selectedProvider.services_offered && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-charcoal-900 block">
                  Offered Services / Equipment / Specialization
                </span>
                <p className="text-xs text-charcoal-700 bg-gray-50 p-3 rounded-xl border border-gray-200 leading-relaxed">
                  {selectedProvider.services_offered}
                </p>
              </div>
            )}

            {/* Coverage and Credentials */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-charcoal-500 block text-[10px] font-bold uppercase">Districts Covered</span>
                <span className="font-semibold text-charcoal-800">{selectedProvider.districts_covered || selectedProvider.district}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-charcoal-500 block text-[10px] font-bold uppercase">GST / License No</span>
                <span className="font-semibold text-charcoal-800">{selectedProvider.gst_number || 'N/A (Individual)'}</span>
              </div>
            </div>

            {/* Admin Notes Section */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <label className="text-xs font-bold text-charcoal-900 flex items-center justify-between">
                <span>Internal Verification Notes</span>
                <span className="text-[10px] text-charcoal-400 font-normal">Private to Admin</span>
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Enter background check details, quality feedback, interview notes..."
                rows={2}
                className="w-full p-2.5 bg-[#F8F9FA] rounded-xl text-xs border border-gray-200 focus:outline-none focus:border-purple-500 text-charcoal-900"
              />
            </div>

            {/* Status Change Buttons */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-charcoal-900 block">
                Update Provider Status
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  disabled={actionLoading}
                  onClick={() => handleStatusUpdate(selectedProvider.id, 'verified')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    selectedProvider.status === 'verified'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </button>

                <button
                  disabled={actionLoading}
                  onClick={() => handleStatusUpdate(selectedProvider.id, 'pending')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    selectedProvider.status === 'pending'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pending</span>
                </button>

                <button
                  disabled={actionLoading}
                  onClick={() => handleStatusUpdate(selectedProvider.id, 'rejected')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    selectedProvider.status === 'rejected'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <a
              href={`https://wa.me/${selectedProvider.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hello ${selectedProvider.full_name}, this is Ranga Sri Enterprises. We have reviewed your partner application for ${selectedProvider.primary_category}. Are you available for a brief coordination discussion?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 text-yellow-300" />
              <span>Connect on WhatsApp Now</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminProviders;
