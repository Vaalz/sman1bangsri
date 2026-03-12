import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  AccountCircle,
} from '@mui/icons-material';
import { useState } from 'react';
import authService from '../services/authService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = authService.getStoredUser();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <DashboardIcon sx={{ marginRight: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard - SMANSABA
          </Typography>
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { handleClose(); navigate('/admin/settings'); }}>
              <SettingsIcon sx={{ marginRight: 1, fontSize: '20px' }} />
              Pengaturan
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 700 }}>
          Dashboard Admin
        </Typography>

        <Grid container spacing={3}>
          {/* Welcome Card */}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Selamat Datang, {user?.name}!
                </Typography>
                <Chip
                  label={user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                  sx={{
                    marginLeft: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    fontWeight: 600,
                  }}
                  size="small"
                />
              </Box>
              <Typography variant="body1">
                Anda berhasil login ke dashboard admin SMANSABA
              </Typography>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                Pengaturan Akun
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2, color: '#666' }}>
                Kelola username dan password Anda
              </Typography>
              <Button
                variant="contained"
                startIcon={<SettingsIcon />}
                onClick={() => navigate('/admin/settings')}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  textTransform: 'none',
                }}
              >
                Buka Pengaturan
              </Button>
            </Paper>
          </Grid>

          {/* Info Card */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                Informasi Akun
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                <strong>Nama:</strong> {user?.name}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                <strong>Email:</strong> {user?.email}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          padding: 2,
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
          marginTop: 'auto',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 SMA Negeri 1 Bangsri. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
