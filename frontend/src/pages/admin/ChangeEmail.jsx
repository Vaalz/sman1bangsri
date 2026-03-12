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
  Email as EmailIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import api from '../../services/api';

const ChangeEmail = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    current_password: '',
    new_email: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.new_email) {
      setError('Email baru tidak boleh kosong');
      return;
    }

    if (!formData.current_password) {
      setError('Password saat ini harus diisi untuk verifikasi');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.new_email)) {
      setError('Format email tidak valid');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/change-email', formData);
      setSuccess(response.data.message);
      
      // Clear form
      setFormData({
        current_password: '',
        new_email: '',
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.new_email?.[0] || 'Gagal mengubah email. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <EmailIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1 }}>
            Ganti Email
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ubah alamat email akun Anda
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

        <Box component="form" onSubmit={handleSubmit}>
          {/* Current Email Display */}
          <Box sx={{ marginBottom: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Email Saat Ini
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user.email}
            </Typography>
          </Box>

          {/* New Email */}
          <TextField
            fullWidth
            label="Email Baru"
            name="new_email"
            type="email"
            value={formData.new_email}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              marginBottom: 2,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            disabled={loading}
          />

          {/* Current Password for Verification */}
          <TextField
            fullWidth
            label="Password Saat Ini (untuk verifikasi)"
            name="current_password"
            type={showPassword ? 'text' : 'password'}
            value={formData.current_password}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              marginBottom: 3,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            disabled={loading}
          />

          {/* Buttons */}
          <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate('/admin/settings')}
              disabled={loading}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #6a4191 100%)',
                },
              }}
            >
              {loading ? 'Mengubah...' : 'Simpan Perubahan'}
            </Button>
          </Box>
        </Box>

        <Box sx={{ marginTop: 3, p: 2, backgroundColor: '#fff3cd', borderRadius: 1, border: '1px solid #ffc107' }}>
          <Typography variant="body2" color="text.secondary">
            <strong>⚠️ Perhatian:</strong> Setelah email diubah, Anda akan otomatis logout dan harus login kembali menggunakan email yang baru.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChangeEmail;
