import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { Save, Refresh } from '@mui/icons-material';
import { getAdminTentang, updateTentang } from '../../services/api';

function AdminTentang() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    sejarah: '',
    tentang_kami: '',
    visi: '',
    misi: '',
  });

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminTentang();
      if (response.data.data) {
        setFormData({
          sejarah: response.data.data.sejarah || '',
          tentang_kami: response.data.data.tentang_kami || '',
          visi: response.data.data.visi || '',
          misi: response.data.data.misi || '',
        });
      }
    } catch (err) {
      setError('Gagal memuat data. ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);
      
      await updateTentang(formData);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Gagal menyimpan data. ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Kelola Halaman Tentang
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchData}
          disabled={saving}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Data berhasil disimpan!
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          {/* Tentang Kami */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
              Tentang Kami
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              value={formData.tentang_kami}
              onChange={handleChange('tentang_kami')}
              placeholder="Masukkan deskripsi tentang sekolah..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fafafa',
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Deskripsikan profil dan sejarah sekolah
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Visi */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2e7d32' }}>
              Visi
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={formData.visi}
              onChange={handleChange('visi')}
              placeholder="Masukkan visi sekolah..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fafafa',
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Tuliskan visi sekolah
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Misi */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ed6c02' }}>
              Misi
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={formData.misi}
              onChange={handleChange('misi')}
              placeholder="Masukkan misi sekolah (gunakan enter untuk setiap poin)..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fafafa',
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Tuliskan misi sekolah, pisahkan setiap poin dengan enter
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Sejarah */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#9c27b0' }}>
              Sejarah
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={formData.sejarah}
              onChange={handleChange('sejarah')}
              placeholder="Masukkan sejarah sekolah..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fafafa',
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Deskripsikan sejarah dan perjalanan sekolah
            </Typography>
          </Box>

          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
              disabled={saving}
              sx={{
                paddingX: 4,
                paddingY: 1.5,
                fontWeight: 600,
              }}
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default AdminTentang;
