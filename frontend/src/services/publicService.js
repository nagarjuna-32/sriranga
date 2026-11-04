import api from './api';

export const publicService = {
  // Services & Categories
  getServices: async (params = {}) => {
    const res = await api.get('/services', { params });
    return res.data;
  },

  getCategories: async () => {
    const res = await api.get('/services/meta/categories');
    return res.data;
  },

  getDistricts: async () => {
    const res = await api.get('/services/meta/districts');
    return res.data;
  },

  getServiceBySlug: async (slug) => {
    const res = await api.get(`/services/${slug}`);
    return res.data;
  },

  // Partner / Provider Registration
  registerProvider: async (payload) => {
    const res = await api.post('/providers/register', payload);
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

  // Enquiries & Quotations
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
