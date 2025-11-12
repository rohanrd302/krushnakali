
import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';

// Public pages
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import DonateUsPage from './pages/DonateUsPage';
import DevoteeRegistrationPage from './pages/DevoteeRegistrationPage';
import GalleryPage from './pages/GalleryPage';
import AdminLoginPage from './pages/AdminLoginPage';

// Public components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Admin components & pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import DevoteeRecordsPage from './pages/admin/DevoteeRecordsPage';
import DonorRecordsPage from './pages/admin/DonorRecordsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Contexts
import { LanguageProvider } from './contexts/LanguageContext';


const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <Routes>
          {/* Public Site Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/donate" element={<DonateUsPage />} />
            <Route path="/register" element={<DevoteeRegistrationPage />} />
          </Route>

          {/* Admin Login - No Layout */}
          <Route path="/admin" element={<AdminLoginPage />} />

          {/* Admin Panel Routes with AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="devotees" element={<DevoteeRecordsPage />} />
              <Route path="donors" element={<DonorRecordsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;