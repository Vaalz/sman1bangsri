import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TentangPage from './pages/TentangPage';
import GuruPage from './pages/GuruPage';
import CoursePage from './pages/CoursePage';
import PrestasiPage from './pages/PrestasiPage';
import EkstrakurikulerPage from './pages/EkstrakurikulerPage';
import DetailEkstrakurikulerPage from './pages/DetailEkstrakurikulerPage';
import BeritaPage from './pages/BeritaPage';
import DetailBeritaPage from './pages/DetailBeritaPage';
import GaleriPage from './pages/GaleriPage';
import KontakPage from './pages/KontakPage';
import ScrollToTop from './components/ScrollToTop';

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBerita from './pages/admin/AdminBerita';
import AdminGaleri from './pages/admin/AdminGaleri';
import AdminGuru from './pages/admin/AdminGuru';
import AdminPrestasi from './pages/admin/AdminPrestasi';
import AdminEkstrakurikuler from './pages/admin/AdminEkstrakurikuler';
import AdminCourse from './pages/admin/AdminCourse';
import AdminSambutan from './pages/admin/AdminSambutan';
import AdminTentang from './pages/admin/AdminTentang';
import AdminKontak from './pages/admin/AdminKontak';
import AdminSettings from './pages/admin/AdminSettings';
import AdminManagement from './pages/admin/AdminManagement';
import AdminSiswaPtn from './pages/admin/AdminSiswaPtn';
import ChangePassword from './pages/admin/ChangePassword';
import ChangeEmail from './pages/admin/ChangeEmail';
import ForgotPassword from './pages/admin/ForgotPassword';
import ResetPassword from './pages/admin/ResetPassword';
import ProtectedRoute from './components/admin/ProtectedRoute';

import './App.css';

function App() {
  return (
    <Box>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/beranda" element={<LandingPage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/guru" element={<GuruPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/prestasi" element={<PrestasiPage />} />
          <Route path="/ekstrakurikuler" element={<EkstrakurikulerPage />} />
          <Route path="/ekstrakurikuler/detail-ekstrakurikuler/:id" element={<DetailEkstrakurikulerPage />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/detail-berita/:slug" element={<DetailBeritaPage />} />
          <Route path="/galeri" element={<GaleriPage />} />
          <Route path="/kontak" element={<KontakPage />} />
          
          {/* Admin Login & Password Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Admin Routes (Protected) */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="berita" element={<AdminBerita />} />
            <Route path="galeri" element={<AdminGaleri />} />
            <Route path="guru" element={<AdminGuru />} />
            <Route path="prestasi" element={<AdminPrestasi />} />
            <Route path="ekstrakurikuler" element={<AdminEkstrakurikuler />} />
            <Route path="course" element={<AdminCourse />} />
            <Route path="sambutan" element={<AdminSambutan />} />
            <Route path="tentang" element={<AdminTentang />} />
            <Route path="kontak" element={<AdminKontak />} />
            <Route path="siswa-ptn" element={<AdminSiswaPtn />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="admins" element={<AdminManagement />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="change-email" element={<ChangeEmail />} />
          </Route>
          
          <Route path="/" element={<Navigate to="/beranda" replace />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
