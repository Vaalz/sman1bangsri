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
import { getAdminContact, updateContact } from '../../services/api';

function AdminKontak() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    alamat: '',
    telepon: '',
    email: '',
    jam_operasional: '',
    maps_embed_url: '',
  });

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminContact();
      if (response.data.data) {
        setFormData({
          alamat: response.data.data.alamat || '',
          telepon: response.data.data.telepon || '',
          email: response.data.data.email || '',
          jam_operasional: response.data.data.jam_operasional || '',
          maps_embed_url: response.data.data.maps_embed_url || '',
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
      
      await updateContact(formData);
      
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
          Kelola Kontak
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
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(false)}>
          Data kontak berhasil diperbarui!
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Alamat"
              multiline
              rows={3}
              value={formData.alamat}
              onChange={handleChange('alamat')}
              required
              fullWidth
              helperText="Alamat lengkap sekolah"
            />

            <TextField
              label="Telepon"
              value={formData.telepon}
              onChange={handleChange('telepon')}
              required
              fullWidth
              helperText="Nomor telepon sekolah"
            />

            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              required
              fullWidth
              helperText="Email resmi sekolah"
            />

            <TextField
              label="Jam Operasional"
              multiline
              rows={4}
              value={formData.jam_operasional}
              onChange={handleChange('jam_operasional')}
              required
              fullWidth
              helperText="Jam operasional sekolah (gunakan enter untuk baris baru)"
            />

            <TextField
              label="Google Maps Embed URL"
              multiline
              rows={3}
              value={formData.maps_embed_url}
              onChange={handleChange('maps_embed_url')}
              fullWidth
              helperText="URL embed dari Google Maps (optional)"
            />

            <Divider />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={saving ? <CircularProgress size={20} /> : <Save />}
                disabled={saving}
                size="large"
              >
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default AdminKontak;
