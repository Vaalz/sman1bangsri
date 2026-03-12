import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
} from '@mui/icons-material';
import api from '../../services/api';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.new_password !== formData.new_password_confirmation) {
      setError('Password baru dan konfirmasi password tidak cocok');
      return;
    }

    if (formData.new_password.length < 8) {
      setError('Password baru minimal 8 karakter');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/change-password', formData);
      setSuccess(response.data.message);
      
      // Clear form
      setFormData({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengubah password. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <LockIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1 }}>
            Ganti Password
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Silakan masukkan password lama dan password baru Anda
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Password Lama"
            name="current_password"
            type={showPasswords.current ? 'text' : 'password'}
            value={formData.current_password}
            onChange={handleChange}
            required
            sx={{ marginBottom: 2 }}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('current')}
                    edge="end"
                    disabled={loading}
                  >
                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password Baru"
            name="new_password"
            type={showPasswords.new ? 'text' : 'password'}
            value={formData.new_password}
            onChange={handleChange}
            required
            sx={{ marginBottom: 2 }}
            disabled={loading}
            helperText="Minimal 8 karakter"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('new')}
                    edge="end"
                    disabled={loading}
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Konfirmasi Password Baru"
            name="new_password_confirmation"
            type={showPasswords.confirm ? 'text' : 'password'}
            value={formData.new_password_confirmation}
            onChange={handleChange}
            required
            sx={{ marginBottom: 3 }}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('confirm')}
                    edge="end"
                    disabled={loading}
                  >
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              size="large"
              disabled={loading}
              onClick={() => navigate(-1)}
              sx={{ textTransform: 'none' }}
            >
              Batal
            </Button>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <LockIcon />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #6a4191 100%)',
                },
              }}
            >
              {loading ? 'Memproses...' : 'Ubah Password'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
