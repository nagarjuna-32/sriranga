import api from './api';

export const publicService = {
  // Services
  getServices: async () => {
    const res = await api.get('/services');
    return res.data;
  },

  getServiceBySlug: async (slug) => {
    const res = await api.get(`/services/${slug}`);
    return res.data;
  },

  // Portfolio
  getPortfolio: async (category) => {
    const params = category && category !== 'All' ? { category } : {};
    const res = await api.get('/portfolio', { params });
    return res.data;
  },

  getProjectById: async (id) => {
    const res = await api.get(`/portfolio/${id}`);
    return res.data;
  },

  // Testimonials
  getTestimonials: async () => {
    const res = await api.get('/testimonials/public');
    return res.data;
  },

  submitTestimonial: async (payload) => {
    const res = await api.post('/testimonials/submit', payload);
    return res.data;
  },

  // Enquiries
  submitEnquiry: async (payload) => {
    const res = await api.post('/enquiries', payload);
    return res.data;
  },

  // Settings
  getSettings: async () => {
    const res = await api.get('/settings/public');
    return res.data;
  },
};
