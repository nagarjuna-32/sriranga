import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Mail, 
  FolderKanban, 
  MessageSquareQuote, 
  Settings, 
  LogOut, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const { settings } = useSettings();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Service Management', path: '/admin/services', icon: Briefcase },
    { name: 'Customer Enquiries', path: '/admin/enquiries', icon: Mail },
    { name: 'Portfolio Projects', path: '/admin/portfolio', icon: FolderKanban },
    { name: 'Client Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar for Desktop - Soft Light Gray with Crisp Borders */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#F1F3F5] border-r border-gray-200 text-charcoal-800">
        {/* Brand */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-gray-200 bg-white">
          <Link to="/admin" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-black flex items-center justify-center p-0.5 flex-shrink-0">
              <img
                src={settings.logo_url || "/logo.jpg"}
                alt="RSE Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-charcoal-900 text-sm block leading-tight">
                Admin Console
              </span>
              <span className="text-[10px] text-purple-600 font-bold truncate block max-w-[130px]">
                {settings.company_name || 'Ranga Sri'}
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-charcoal-700 hover:text-purple-700 hover:bg-white shadow-none'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom User Profile & Logout */}
        <div className="p-4 border-t border-gray-200 bg-white space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs border border-purple-200">
              {admin?.full_name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-charcoal-900 truncate">
                {admin?.full_name || 'Administrator'}
              </p>
              <p className="text-[10px] text-charcoal-500 truncate">
                {admin?.email}
              </p>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs px-2">
            <Link
              to="/"
              target="_blank"
              className="text-charcoal-600 hover:text-purple-600 inline-flex items-center space-x-1 font-semibold"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="text-coral-600 hover:text-coral-700 inline-flex items-center space-x-1 font-bold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative w-64 bg-[#F1F3F5] text-charcoal-800 flex flex-col z-10 border-r border-gray-200">
            <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white">
              <span className="font-heading font-bold text-charcoal-900 text-sm">
                Admin Console
              </span>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="text-charcoal-500 hover:text-charcoal-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 py-4 px-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.exact}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-charcoal-700 hover:text-purple-600 hover:bg-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
            <div className="p-4 border-t border-gray-200 bg-white">
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-coral-50 text-coral-600 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 border border-coral-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-charcoal-600 hover:bg-gray-100"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-heading font-extrabold text-base sm:text-lg text-charcoal-900 truncate">
              Ranga Sri Enterprises Portal
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-charcoal-700 hover:bg-gray-50 transition-all shadow-sm"
            >
              <span>Live Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-purple-600" />
            </Link>

            <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
              <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {admin?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <span className="text-xs font-bold text-charcoal-800 hidden md:inline">
                {admin?.username}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content View */}
        <main className="p-4 sm:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
