import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const AdminSettings = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/admin')}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 2 }}>
            Pengaturan
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4, flexGrow: 1 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 3 }}>
            Pengaturan Sistem
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Halaman pengaturan akan segera tersedia.
          </Typography>
        </Paper>
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

export default AdminSettings;
