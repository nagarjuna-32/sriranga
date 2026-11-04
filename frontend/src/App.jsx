import React, { useState } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import EnquiryModal from './components/common/EnquiryModal';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import CategoriesPage from './pages/CategoriesPage';
import PartnerRegister from './pages/PartnerRegister';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// Admin Pages & Protected Layout
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminProviders from './pages/admin/AdminProviders';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminSettings from './pages/admin/AdminSettings';

// Public Shell Layout
const PublicLayout = ({ onOpenEnquiry }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenEnquiry={() => onOpenEnquiry()} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp onOpenEnquiry={() => onOpenEnquiry()} />
    </div>
  );
};

function App() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('Business & Registration');

  const handleOpenEnquiry = (serviceName) => {
    if (serviceName) {
      setPreselectedService(serviceName);
    }
    setEnquiryModalOpen(true);
  };

  return (
    <>
      <Routes>
        {/* Public Routes with Navbar & Footer */}
        <Route element={<PublicLayout onOpenEnquiry={handleOpenEnquiry} />}>
          <Route path="/" element={<Home onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/about" element={<About onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/services" element={<Services onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/categories" element={<CategoriesPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/partner-register" element={<PartnerRegister />} />
          <Route path="/services/:slug" element={<ServiceDetail onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/portfolio" element={<Portfolio onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/testimonials" element={<Testimonials onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="providers" element={<AdminProviders />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>

      {/* Global Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        preselectedService={preselectedService}
      />
    </>
  );
}

export default App;
