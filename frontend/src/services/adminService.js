import api from './api';

export const adminService = {
  // Auth
  login: async (username, password) => {
    const res = await api.post('/auth/login', { username, password });
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get('/auth/profile');
    return res.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const res = await api.put('/auth/change-password', { currentPassword, newPassword });
    return res.data;
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    const res = await api.get('/dashboard/stats');
    return res.data;
  },

  // Services Management
  getAllServices: async () => {
    const res = await api.get('/services?admin=true');
    return res.data;
  },

  createService: async (data) => {
    const res = await api.post('/services', data);
    return res.data;
  },

  updateService: async (id, data) => {
    const res = await api.put(`/services/${id}`, data);
    return res.data;
  },

  deleteService: async (id) => {
    const res = await api.delete(`/services/${id}`);
    return res.data;
  },

  // Enquiries Management
  getEnquiries: async (params) => {
    const res = await api.get('/enquiries', { params });
    return res.data;
  },

  updateEnquiryStatus: async (id, status, admin_notes) => {
    const res = await api.put(`/enquiries/${id}`, { status, admin_notes });
    return res.data;
  },

  deleteEnquiry: async (id) => {
    const res = await api.delete(`/enquiries/${id}`);
    return res.data;
  },

  // Portfolio Management
  getAllPortfolio: async () => {
    const res = await api.get('/portfolio');
    return res.data;
  },

  createPortfolio: async (data) => {
    const res = await api.post('/portfolio', data);
    return res.data;
  },

  updatePortfolio: async (id, data) => {
    const res = await api.put(`/portfolio/${id}`, data);
    return res.data;
  },

  deletePortfolio: async (id) => {
    const res = await api.delete(`/portfolio/${id}`);
    return res.data;
  },

  // Testimonials Management
  getAllTestimonials: async (params) => {
    const res = await api.get('/testimonials', { params });
    return res.data;
  },

  updateTestimonialStatus: async (id, status) => {
    const res = await api.patch(`/testimonials/${id}/status`, { status });
    return res.data;
  },

  createTestimonial: async (data) => {
    const res = await api.post('/testimonials', data);
    return res.data;
  },

  updateTestimonial: async (id, data) => {
    const res = await api.put(`/testimonials/${id}`, data);
    return res.data;
  },

  deleteTestimonial: async (id) => {
    const res = await api.delete(`/testimonials/${id}`);
    return res.data;
  },

  // Settings Management
  getAllSettings: async () => {
    const res = await api.get('/settings');
    return res.data;
  },

  updateSettings: async (settings) => {
    const res = await api.post('/settings/update', { settings });
    return res.data;
  },

  // File Upload
  uploadImage: async (formData) => {
    const res = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};
