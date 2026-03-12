import { Box, Typography, Paper, Button, Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Lock as LockIcon,
  Person as PersonIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const AdminSettings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, marginBottom: 3 }}>
        Pengaturan
      </Typography>
      
      {/* Profile Information */}
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <PersonIcon sx={{ fontSize: 28, marginRight: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Informasi Akun
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              Nama
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {user.name || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {user.email || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              Role
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
              {user.role || '-'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Security Settings */}
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <LockIcon sx={{ fontSize: 28, marginRight: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Keamanan
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
        
        {/* Change Email Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Ubah alamat email yang terhubung dengan akun Anda.
          </Typography>
          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            onClick={() => navigate('/admin/change-email')}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a4191 100%)',
              },
            }}
          >
            Ganti Email
          </Button>
        </Box>

        <Divider sx={{ marginY: 3 }} />

        {/* Change Password Section */}
        <Box>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Kelola password akun Anda untuk menjaga keamanan.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<LockIcon />}
            onClick={() => navigate('/admin/change-password')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'rgba(102, 126, 234, 0.04)',
              },
            }}
          >
            Ganti Password
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminSettings;
