import axios from 'axios';
import { API_BASE_URL } from './apiBaseUrl';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isFileField = (key) =>
  key.includes('foto') ||
  key.includes('file') ||
  key.includes('gambar') ||
  key.includes('logo') ||
  key.includes('icon');

const isFileLike = (value) => {
  if (!value) return false;

  if (typeof File !== 'undefined' && value instanceof File) return true;
  if (typeof Blob !== 'undefined' && value instanceof Blob) return true;

  return false;
};

// Helper function to append data to FormData, skip file fields if not actual File object
const appendFormData = (formData, data, isUpdate = false) => {
  Object.keys(data).forEach(key => {
    const value = data[key];
    // Skip if null or undefined
    if (value === null || value === undefined) return;

    if (isFileField(key)) {
      // Only append real uploaded files for file fields.
      if (isFileLike(value)) {
        formData.append(key, value);
      }
      return;
    }
    
    // For update operations, only append file fields if they are actual File objects
    if (isUpdate && typeof value === 'string' && isFileField(key)) {
      // Skip - this is an old file path, not a new upload
      return;
    }
    
    formData.append(key, value);
  });
};

// Add token interceptor for admin routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      // Let browser set multipart boundary automatically.
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auto reset auth state when token is invalid/expired in admin area
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const currentPath = window.location.pathname || '';

    if (status === 401 && currentPath.startsWith('/admin')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }

    return Promise.reject(error);
  }
);

// ==================== PUBLIC API ====================

// Berita
export const getBeritaList = (params = {}) => api.get('/public/berita', { params });
export const getBeritaBySlug = (slug) => api.get(`/public/berita/${slug}`);

// Galeri
export const getGaleriList = (params = {}) => api.get('/public/galeri', { params });
export const getGaleriById = (id) => api.get(`/public/galeri/${id}`);

// Guru
export const getGuruList = (params = {}) => api.get('/public/guru', { params });
export const getGuruById = (id) => api.get(`/public/guru/${id}`);

// Prestasi
export const getPrestasiList = (params = {}) => api.get('/public/prestasi', { params });
export const getPrestasiById = (id) => api.get(`/public/prestasi/${id}`);

// Ekstrakurikuler
export const getEkstrakurikulerList = (params = {}) => api.get('/public/ekstrakurikuler', { params });
export const getEkstrakurikulerBySlug = (slug) => api.get(`/public/ekstrakurikuler/${slug}`);

// Courses
export const getCourseList = (params = {}) => api.get('/public/courses', { params });
export const getCourseById = (id) => api.get(`/public/courses/${id}`);

// Keuangan
export const getKeuanganList = (params = {}) => api.get('/public/keuangan', { params });

// Social Links
export const getSocialLinks = () => api.get('/public/social-links');

// ==================== ADMIN API ====================

// Dashboard Stats
export const getDashboardStats = () => api.get('/admin/dashboard/stats');

// Admin Berita
export const getAdminBerita = (params = {}) => api.get('/admin/berita', { params });
export const createBerita = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/berita', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateBerita = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/berita/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteBerita = (id) => api.delete(`/admin/berita/${id}`);

// Admin Galeri
export const getAdminGaleri = (params = {}) => api.get('/admin/galeri', { params });
export const createGaleri = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/galeri', formData);
};
export const updateGaleri = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/galeri/${id}`, formData);
};
export const deleteGaleri = (id) => api.delete(`/admin/galeri/${id}`);

// Admin Guru
export const getAdminGuru = (params = {}) => api.get('/admin/guru', { params });
export const createGuru = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/guru', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateGuru = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/guru/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteGuru = (id) => api.delete(`/admin/guru/${id}`);

// Admin Prestasi
export const getAdminPrestasi = (params = {}) => api.get('/admin/prestasi', { params });
export const createPrestasi = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/prestasi', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updatePrestasi = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/prestasi/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deletePrestasi = (id) => api.delete(`/admin/prestasi/${id}`);

// Admin Ekstrakurikuler
export const getAdminEkstrakurikuler = (params = {}) => api.get('/admin/ekstrakurikuler', { params });
export const createEkstrakurikuler = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/ekstrakurikuler', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateEkstrakurikuler = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/ekstrakurikuler/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteEkstrakurikuler = (id) => api.delete(`/admin/ekstrakurikuler/${id}`);

// Admin Jadwal Ekstrakurikuler
export const getAdminJadwalEkstrakurikuler = (params = {}) => api.get('/admin/jadwal-ekstrakurikuler', { params });
export const createJadwalEkstrakurikuler = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/jadwal-ekstrakurikuler', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateJadwalEkstrakurikuler = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/jadwal-ekstrakurikuler/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteJadwalEkstrakurikuler = (id) => api.delete(`/admin/jadwal-ekstrakurikuler/${id}`);

// Admin Struktur Ekstrakurikuler
export const getAdminStrukturEkstrakurikuler = (params = {}) => api.get('/admin/struktur-ekstrakurikuler', { params });
export const createStrukturEkstrakurikuler = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/struktur-ekstrakurikuler', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateStrukturEkstrakurikuler = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/struktur-ekstrakurikuler/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteStrukturEkstrakurikuler = (id) => api.delete(`/admin/struktur-ekstrakurikuler/${id}`);

// Admin Prestasi Ekstrakurikuler
export const getAdminPrestasiEkstrakurikuler = (params = {}) => api.get('/admin/prestasi-ekstrakurikuler', { params });
export const createPrestasiEkstrakurikuler = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/prestasi-ekstrakurikuler', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updatePrestasiEkstrakurikuler = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/prestasi-ekstrakurikuler/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deletePrestasiEkstrakurikuler = (id) => api.delete(`/admin/prestasi-ekstrakurikuler/${id}`);

// Public API for Ekstrakurikuler details
export const getJadwalByEkskul = (ekskulId) => api.get('/public/jadwal-ekstrakurikuler', { params: { ekstrakurikuler_id: ekskulId } });
export const getStrukturByEkskul = (ekskulId) => api.get('/public/struktur-ekstrakurikuler', { params: { ekstrakurikuler_id: ekskulId } });
export const getPrestasiByEkskul = (ekskulId) => api.get('/public/prestasi-ekstrakurikuler', { params: { ekstrakurikuler_id: ekskulId } });

// Admin Courses
export const getAdminCourses = (params = {}) => api.get('/admin/courses', { params });
export const createCourse = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/courses', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateCourse = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/courses/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteCourse = (id) => api.delete(`/admin/courses/${id}`);

// Admin Keuangan
export const getAdminKeuangan = (params = {}) => api.get('/admin/keuangan', { params });
export const createKeuangan = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/keuangan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateKeuangan = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/keuangan/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteKeuangan = (id) => api.delete(`/admin/keuangan/${id}`);

// Admin Social Links
export const getAdminSocialLinks = () => api.get('/admin/social-links');
export const createSocialLink = (data) => api.post('/admin/social-links', data);
export const updateSocialLink = (id, data) => api.put(`/admin/social-links/${id}`, data);
export const deleteSocialLink = (id) => api.delete(`/admin/social-links/${id}`);

// Admin Sambutan
export const getAdminSambutan = (params = {}) => api.get('/admin/sambutan', { params });
export const getAdminSambutanById = (id) => api.get(`/admin/sambutan/${id}`);
export const createSambutan = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/sambutan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateSambutan = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/sambutan/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteSambutan = (id) => api.delete(`/admin/sambutan/${id}`);

// Public Sambutan
export const getSambutan = () => api.get('/public/sambutan');

// Tentang (About)
export const getTentang = () => api.get('/public/tentang');

// Admin Tentang
export const getAdminTentang = () => api.get('/admin/tentang');
export const updateTentang = (data) => {
  return api.put('/admin/tentang', data);
};

// Contact
export const getContact = () => api.get('/public/contact');

// Admin Contact
export const getAdminContact = () => api.get('/admin/contact');
export const updateContact = (data) => {
  return api.put('/admin/contact', data);
};

// Siswa PTN
export const getSiswaPtnList = (params = {}) => api.get('/public/siswa-ptn', { params });

// Admin Siswa PTN
export const getAdminSiswaPtn = (params = {}) => api.get('/admin/siswa-ptn', { params });
export const createSiswaPtn = (data) => {
  const formData = new FormData();
  appendFormData(formData, data);
  return api.post('/admin/siswa-ptn', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateSiswaPtn = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  appendFormData(formData, data, true);
  return api.post(`/admin/siswa-ptn/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteSiswaPtn = (id) => api.delete(`/admin/siswa-ptn/${id}`);

// Helper function untuk mendapatkan URL gambar
export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const backendBaseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
  return `${backendBaseUrl}/storage/${path}`;
};

export default api;
