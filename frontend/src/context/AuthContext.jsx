import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminService } from '../services/adminService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('rse_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('rse_admin_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem('rse_admin_token');
      if (storedToken) {
        try {
          const res = await adminService.getProfile();
          if (res.success && res.admin) {
            setAdmin(res.admin);
            localStorage.setItem('rse_admin_user', JSON.stringify(res.admin));
          } else {
            logout();
          }
        } catch (err) {
          console.error('Session expired or invalid:', err);
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const login = async (username, password) => {
    const res = await adminService.login(username, password);
    if (res.success && res.token) {
      localStorage.setItem('rse_admin_token', res.token);
      localStorage.setItem('rse_admin_user', JSON.stringify(res.admin));
      setToken(res.token);
      setAdmin(res.admin);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const logout = () => {
    localStorage.removeItem('rse_admin_token');
    localStorage.removeItem('rse_admin_user');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token && !!admin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
