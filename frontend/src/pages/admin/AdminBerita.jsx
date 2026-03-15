import { useState, useEffect } from 'react';
import { Box, Chip, CircularProgress, Alert } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminBerita, createBerita, updateBerita, deleteBerita, getImageUrl } from '../../services/api';

const formFields = [
  { name: 'judul', label: 'Judul Berita', required: true },
  { name: 'kategori', label: 'Kategori', required: true },
  { name: 'penulis', label: 'Penulis', required: true },
  {
    name: 'konten',
    label: 'Deskripsi Berita',
    required: false,
    multiline: true,
    rows: 6,
    placeholder: 'Tulis deskripsi/konten berita di sini...'
  },
  { name: 'tanggal', label: 'Tanggal', type: 'date', required: true },
  { name: 'foto', label: 'Gambar', type: 'file', required: false },
];

function AdminBerita() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Cek apakah date valid
    if (isNaN(date.getTime())) return dateString;
    
    // Format tanggal ke Indonesia
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const columns = [
    { field: 'judul', headerName: 'Judul' },
    {
      field: 'foto',
      headerName: 'Foto',
      render: (value, row) => value ? (
        <Box
          component="img"
          src={getImageUrl(value)}
          alt={row.judul || 'Foto berita'}
          sx={{
            width: 88,
            height: 56,
            objectFit: 'cover',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider'
          }}
        />
      ) : '-'
    },
    { field: 'kategori', headerName: 'Kategori' },
    { field: 'penulis', headerName: 'Penulis' },
    { 
      field: 'tanggal', 
      headerName: 'Tanggal',
      render: (value) => formatDate(value)
    },
  ];

  // Fetch data dari API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminBerita();
      setBerita(response.data.data || []);
    } catch (err) {
      setError('Gagal memuat data berita');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ tanggal: '' });
    setOpenModal(true);
  };

  const normalizeDateForInput = (value) => {
    if (!value) return '';

    if (typeof value === 'string') {
      if (value.includes('T')) {
        return value.split('T')[0];
      }

      // Fallback for dd/mm/yyyy style values
      if (value.includes('/')) {
        const parts = value.split('/');
        if (parts.length === 3) {
          const [day, month, year] = parts;
          return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
      }
    }

    return value;
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setFormData({
      ...row,
      tanggal: normalizeDateForInput(row.tanggal),
    });
    setOpenModal(true);
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Hapus berita "${row.judul}"?`)) {
      try {
        await deleteBerita(row.id);
        fetchData(); // Refresh data
      } catch (err) {
        alert('Gagal menghapus data');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        tanggal: normalizeDateForInput(data.tanggal),
      };

      if (editingId) {
        await updateBerita(editingId, payload);
      } else {
        await createBerita(payload);
      }
      setOpenModal(false);
      setFormData({});
      fetchData(); // Refresh data
    } catch (err) {
      alert('Gagal menyimpan data');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <CrudTable
        title="Manajemen Berita"
        columns={columns}
        data={berita}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        title={editingId ? 'Edit Berita' : 'Tambah Berita'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />
    </Box>
  );
}

export default AdminBerita;
