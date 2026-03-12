import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Cancel,
  LockReset as LockResetIcon,
} from '@mui/icons-material';
import authService from '../../services/authService';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  // Reset password form
  const [resetForm, setResetForm] = useState({
    new_password: '',
    new_password_confirmation: '',
  });

  const currentUser = authService.getStoredUser();

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const response = await authService.getAdmins();
      if (response.success) {
        setAdmins(response.data);
      }
    } catch (err) {
      setError(err.message || 'Gagal memuat data admin');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
    setError('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (formData.password !== formData.password_confirmation) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }

    try {
      const response = await authService.createAdmin(
        formData.name,
        formData.email,
        formData.password,
        formData.password_confirmation
      );
      
      if (response.success) {
        setSuccess('Admin baru berhasil dibuat');
        handleCloseDialog();
        loadAdmins();
      }
    } catch (err) {
      setError(err.message || 'Gagal membuat admin baru');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await authService.updateAdminStatus(id, !currentStatus);
      if (response.success) {
        setSuccess('Status admin berhasil diupdate');
        loadAdmins();
      }
    } catch (err) {
      setError(err.message || 'Gagal mengupdate status admin');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus admin ini?')) {
      try {
        const response = await authService.deleteAdmin(id);
        if (response.success) {
          setSuccess('Admin berhasil dihapus');
          loadAdmins();
        }
      } catch (err) {
        setError(err.message || 'Gagal menghapus admin');
      }
    }
  };

  const handleOpenResetDialog = (admin) => {
    setSelectedAdmin(admin);
    setResetForm({
      new_password: '',
      new_password_confirmation: '',
    });
    setError('');
    setOpenResetDialog(true);
  };

  const handleCloseResetDialog = () => {
    setOpenResetDialog(false);
    setSelectedAdmin(null);
    setResetForm({
      new_password: '',
      new_password_confirmation: '',
    });
  };

  const handleResetPassword = async () => {
    setError('');
    setSuccess('');

    if (resetForm.new_password !== resetForm.new_password_confirmation) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (resetForm.new_password.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }

    try {
      const response = await authService.resetAdminPassword(
        selectedAdmin.id,
        resetForm.new_password,
        resetForm.new_password_confirmation
      );
      
      if (response.success) {
        setSuccess(`Password admin ${selectedAdmin.name} berhasil direset`);
        handleCloseResetDialog();
        loadAdmins();
      }
    } catch (err) {
      setError(err.message || 'Gagal reset password');
    }
  };

  // Check if user is superadmin
  if (!authService.isSuperAdmin()) {
    return (
      <Box>
        <Alert severity="error">
          Anda tidak memiliki akses ke halaman ini. Hanya superadmin yang dapat mengelola admin.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Manajemen Admin
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5568d3 0%, #6a4191 100%)',
            },
          }}
        >
          Tambah Admin
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Paper elevation={3}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Nama</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Dibuat</strong></TableCell>
                  <TableCell align="center"><strong>Aksi</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Belum ada admin
                    </TableCell>
                  </TableRow>
                ) : (
                  admins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>{admin.name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={admin.is_active ? 'Aktif' : 'Nonaktif'}
                          color={admin.is_active ? 'success' : 'error'}
                          size="small"
                          icon={admin.is_active ? <CheckCircle /> : <Cancel />}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(admin.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color={admin.is_active ? 'error' : 'success'}
                          onClick={() => handleToggleStatus(admin.id, admin.is_active)}
                          title={admin.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          {admin.is_active ? <Cancel /> : <CheckCircle />}
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenResetDialog(admin)}
                          title="Reset Password"
                        >
                          <LockResetIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(admin.id)}
                          title="Hapus"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Dialog for adding new admin */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Tambah Admin Baru</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Nama"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            sx={{ marginTop: 2, marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            helperText="Minimal 8 karakter"
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Konfirmasi Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password_confirmation}
            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
            required
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a4191 100%)',
              },
            }}
          >
            Tambah
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for resetting admin password */}
      <Dialog open={openResetDialog} onClose={handleCloseResetDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Reset Password Admin
          {selectedAdmin && ` - ${selectedAdmin.name}`}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          
          <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}>
            Buat password baru untuk admin ini. Admin akan otomatis logout dan harus login kembali dengan password baru.
          </Alert>

          <TextField
            fullWidth
            label="Password Baru"
            type={showPassword ? 'text' : 'password'}
            value={resetForm.new_password}
            onChange={(e) => setResetForm({ ...resetForm, new_password: e.target.value })}
            required
            helperText="Minimal 8 karakter"
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Konfirmasi Password Baru"
            type={showPassword ? 'text' : 'password'}
            value={resetForm.new_password_confirmation}
            onChange={(e) => setResetForm({ ...resetForm, new_password_confirmation: e.target.value })}
            required
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResetDialog}>Batal</Button>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            color="primary"
            startIcon={<LockResetIcon />}
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminManagement;
