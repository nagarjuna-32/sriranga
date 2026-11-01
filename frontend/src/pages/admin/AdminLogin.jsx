import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, AlertCircle, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@RangaSri2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please provide your administrator username and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await login(username.trim(), password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.message || 'Invalid credentials. Please verify and try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Authentication failed. Please check network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient light glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-100/70 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-coral-100/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* Top Header - Clean White with Vibrant Purple Emblem */}
        <div className="bg-white text-charcoal-900 p-8 text-center relative border-b border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 border-2 border-purple-200 shadow-sm mx-auto mb-3 flex items-center justify-center">
            <span className="text-purple-600 font-heading font-extrabold text-xl">
              RS<span className="text-coral-500">E</span>
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-charcoal-900">
            Administrative Portal
          </h2>
          <p className="text-xs text-purple-600 font-bold mt-1">
            RANGA SRI ENTERPRISES
          </p>
          <span className="text-[11px] text-charcoal-500 block mt-2">
            Secure Role-Based Management System
          </span>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-coral-50 border border-coral-200 rounded-xl text-xs text-coral-700 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-coral-500 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1.5">
                Username or Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="admin"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md hover:shadow-purple-glow transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-yellow-300" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Notice */}
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[11px] text-charcoal-600 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span>End-to-end encrypted session with JWT authorization.</span>
          </div>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-purple-600 hover:underline font-bold">
              ← Return to Public Website
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
