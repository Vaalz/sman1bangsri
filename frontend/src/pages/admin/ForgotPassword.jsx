import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import api from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.post('/forgot-password', { email });
      setSuccess(response.data.message);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengirim email. Silakan coba lagi.');
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
            <EmailIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1 }}>
              Lupa Password
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Masukkan email Anda untuk menerima link reset password
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ marginBottom: 3 }}
              disabled={loading}
              autoComplete="email"
              placeholder="admin@smansaba.sch.id"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <EmailIcon />}
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
              {loading ? 'Mengirim...' : 'Kirim Link Reset Password'}
            </Button>

            <Button
              component={Link}
              to="/admin/login"
              variant="text"
              fullWidth
              startIcon={<ArrowBackIcon />}
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

export default ForgotPassword;
