import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
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

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    token: '',
    password: '',
    password_confirmation: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
      setError('Link reset password tidak valid. Silakan request link baru.');
    } else {
      setFormData((prev) => ({
        ...prev,
        email,
        token,
      }));
    }
  }, [searchParams]);

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
    if (formData.password !== formData.password_confirmation) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/reset-password', formData);
      setSuccess(response.data.message);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mereset password. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
            <LockIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1 }}>
              Reset Password
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Masukkan password baru untuk akun Anda
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
              label="Email"
              type="email"
              value={formData.email}
              disabled
              sx={{ marginBottom: 2 }}
            />

            <TextField
              fullWidth
              label="Password Baru"
              name="password"
              type={showPasswords.password ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ marginBottom: 2 }}
              disabled={loading || !formData.token}
              helperText="Minimal 8 karakter"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('password')}
                      edge="end"
                      disabled={loading || !formData.token}
                    >
                      {showPasswords.password ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Konfirmasi Password Baru"
              name="password_confirmation"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              sx={{ marginBottom: 3 }}
              disabled={loading || !formData.token}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('confirm')}
                      edge="end"
                      disabled={loading || !formData.token}
                    >
                      {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || !formData.token}
              startIcon={loading ? <CircularProgress size={20} /> : <LockIcon />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 600,
                padding: '12px',
                marginBottom: 2,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #6a4191 100%)',
                },
              }}
            >
              {loading ? 'Memproses...' : 'Reset Password'}
            </Button>

            <Button
              component={Link}
              to="/admin/login"
              variant="text"
              fullWidth
              disabled={loading}
              sx={{
                textTransform: 'none',
                color: 'text.secondary',
              }}
            >
              Kembali ke Login
            </Button>
          </form>

          <Box sx={{ marginTop: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © 2024 SMA Negeri Saba
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;
