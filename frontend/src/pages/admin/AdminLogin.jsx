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
  Login as LoginIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import authService from '../../services/authService';
import backgroundImage from '../../assets/image/smansaba.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login gagal. Silakan coba lagi.');
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: { xs: 3, sm: 5 },
            borderRadius: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          {/* Logo/Icon Section */}
          <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                padding: 2.5,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                marginBottom: 2,
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <AdminIcon sx={{ fontSize: 48, color: '#ffffff' }} />
            </Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                marginBottom: 1, 
                color: '#ffffff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                letterSpacing: '-0.5px',
              }}
            >
              Admin Login
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '1.1rem',
                fontWeight: 500,
              }}
            >
              SMA NEGERI 1 BANGSRI
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }} onClose={() => setError('')}>
              {error}
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
              variant="outlined"
              InputProps={{
                style: { backgroundColor: 'transparent' },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                style: { backgroundColor: 'transparent' },
              }}
              sx={{
                marginBottom: 2.5,
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  backgroundColor: 'transparent !important',
                  borderRadius: '14px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(8px)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: '2px',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
                    backdropFilter: 'blur(10px)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.7)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(0, 0, 0, 0.15) !important',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.15)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.95)',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputBase-root': {
                  backgroundColor: 'transparent !important',
                },
                '& .MuiInputBase-input': {
                  padding: '18px 14px',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                  backgroundColor: 'transparent !important',
                  '&:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 100px transparent inset !important',
                    WebkitTextFillColor: '#ffffff !important',
                    transition: 'background-color 5000s ease-in-out 0s',
                  },
                  '&:-webkit-autofill:hover': {
                    WebkitBoxShadow: '0 0 0 100px transparent inset !important',
                    WebkitTextFillColor: '#ffffff !important',
                  },
                  '&:-webkit-autofill:focus': {
                    WebkitBoxShadow: '0 0 0 100px transparent inset !important',
                    WebkitTextFillColor: '#ffffff !important',
                  },
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '1rem',
                  fontWeight: 500,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'rgba(255, 255, 255, 1)',
                },
              }}
              disabled={loading}
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              inputProps={{
                style: { backgroundColor: 'transparent' },
              }}
              sx={{
                marginBottom: 3,
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  backgroundColor: 'transparent !important',
                  borderRadius: '14px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(8px)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: '2px',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
                    backdropFilter: 'blur(10px)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.7)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(0, 0, 0, 0.15) !important',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.15)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.95)',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputBase-root': {
                  backgroundColor: 'transparent !important',
                },
                '& .MuiInputBase-input': {
                  padding: '18px 14px',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                  backgroundColor: 'transparent !important',
                  '&:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 100px transparent inset !important',
                    WebkitTextFillColor: '#ffffff !important',
                    transition: 'background-color 5000s ease-in-out 0s',
                  },
                  '&:-webkit-autofill:hover': {
                    WebkitBoxShadow: '0 0 0 100px transparent inset !important',
                    WebkitTextFillColor: '#ffffff !important',
                  },
                  '&:-webkit-autofill:focus': {
                    WebkitBoxShadow: '0 0 0 100px transparent inset !important',
                    WebkitTextFillColor: '#ffffff !important',
                  },
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '1rem',
                  fontWeight: 500,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'rgba(255, 255, 255, 1)',
                },
              }}
              disabled={loading}
              autoComplete="current-password"
              InputProps={{
                style: { backgroundColor: 'transparent' },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loading}
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.75)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'rgba(255, 255, 255, 0.95)',
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
              sx={{
                marginTop: 1,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 700,
                padding: '14px 24px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #6a4191 100%)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0px)',
                  boxShadow: '0 2px 10px rgba(102, 126, 234, 0.4)',
                },
                '&.Mui-disabled': {
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: 'rgba(255, 255, 255, 0.4)',
                },
              }}
            >
              {loading ? 'Memproses...' : 'Login'}
            </Button>
          </form>

          <Box sx={{ marginTop: 3, textAlign: 'center' }}>
            <Box
              sx={{
                padding: 2,
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontStyle: 'italic', 
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}
              >
                💡 Lupa password? Hubungi superadmin untuk reset password
              </Typography>
            </Box>
          </Box>

          <Box sx={{ marginTop: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              © 2026 SMA NEGERI 1 BANGSRI
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
