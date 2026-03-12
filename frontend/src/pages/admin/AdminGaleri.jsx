import { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminGaleri, createGaleri, updateGaleri, deleteGaleri, getImageUrl } from '../../services/api';

const formFields = [
  { name: 'judul', label: 'Judul Foto', required: true },
  { name: 'kategori', label: 'Kategori', required: true },
  { name: 'caption', label: 'Caption/Keterangan', multiline: true, rows: 3, required: false },
  { name: 'tanggal', label: 'Tanggal', type: 'date', required: false },
  { name: 'foto', label: 'Foto', type: 'file', required: false },
];

function AdminGaleri() {
  const [galeri, setGaleri] = useState([]);
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
    { 
      field: 'foto', 
      headerName: 'Foto',
      render: (value) => (
        <Box
          component="img"
          src={getImageUrl(value)}
          alt="Galeri"
          sx={{
            width: 80,
            height: 60,
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />
      )
    },
    { field: 'judul', headerName: 'Judul' },
    { field: 'kategori', headerName: 'Kategori' },
    { 
      field: 'caption', 
      headerName: 'Caption',
      render: (value) => value ? (value.length > 50 ? value.substring(0, 50) + '...' : value) : '-'
    },
    { 
      field: 'tanggal', 
      headerName: 'Tanggal',
      render: (value) => value ? formatDate(value) : '-'
    },
  ];

  // Fetch data dari API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminGaleri({ per_page: 1000 });
      const data = response?.data?.data || response?.data || [];
      setGaleri(data);
    } catch (err) {
      console.error('Error fetching galeri:', err);
      setError('Gagal memuat data galeri. Silakan refresh halaman.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({});
    setOpenModal(true);
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setFormData(row);
    setOpenModal(true);
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Hapus foto "${row.judul}"?`)) {
      try {
        await deleteGaleri(row.id);
        fetchData(); // Refresh data
      } catch (err) {
        alert('Gagal menghapus data');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingId) {
        await updateGaleri(editingId, data);
      } else {
        await createGaleri(data);
      }
      setOpenModal(false);
      setFormData({});
      fetchData(); // Refresh data
    } catch (err) {
      alert('Gagal menyimpan data');
      console.error('Error saving galeri:', err);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    setFormData({});
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <CrudTable
        title="Manajemen Galeri Foto"
        columns={columns}
        data={galeri}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="Belum ada data galeri. Klik tombol Tambah untuk menambahkan foto baru."
      />

      <CrudModal
        open={openModal}
        title={editingId ? 'Edit Galeri Foto' : 'Tambah Galeri Foto'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={handleCancel}
      />
    </Box>
  );
}

export default AdminGaleri;
