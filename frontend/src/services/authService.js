import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance for auth
const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Service
const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await authApi.post('/login', { email, password });
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return response.data;
      }
      
      throw new Error(response.data.message || 'Login gagal');
    } catch (error) {
      throw error.response?.data || { message: 'Login gagal' };
    }
  },

  // Logout
  logout: async () => {
    try {
      await authApi.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Get current user
  me: async () => {
    try {
      const response = await authApi.get('/me');
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get stored user
  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is superadmin
  isSuperAdmin: () => {
    const user = authService.getStoredUser();
    return user?.role === 'superadmin';
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authService.getStoredUser();
    return user?.role === 'admin';
  },

  // Superadmin: Get all admins
  getAdmins: async () => {
    try {
      const response = await authApi.get('/superadmin/admins');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Gagal mengambil data admin' };
    }
  },

  // Superadmin: Create new admin
  createAdmin: async (name, email, password, password_confirmation) => {
    try {
      const response = await authApi.post('/superadmin/admins', {
        name,
        email,
        password,
        password_confirmation,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Gagal membuat admin baru' };
    }
  },

  // Superadmin: Update admin status
  updateAdminStatus: async (id, is_active) => {
    try {
      const response = await authApi.patch(`/superadmin/admins/${id}/status`, {
        is_active,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Gagal mengupdate status admin' };
    }
  },

  // Superadmin: Delete admin
  deleteAdmin: async (id) => {
    try {
      const response = await authApi.delete(`/superadmin/admins/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Gagal menghapus admin' };
    }
  },

  // Superadmin: Reset admin password
  resetAdminPassword: async (id, newPassword, newPasswordConfirmation) => {
    try {
      const response = await authApi.post(`/superadmin/admins/${id}/reset-password`, {
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Gagal reset password admin' };
    }
  },
};

export default authService;
