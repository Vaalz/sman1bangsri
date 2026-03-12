import { useState, useEffect } from 'react';
import { Box, Chip, CircularProgress, Alert } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminBerita, createBerita, updateBerita, deleteBerita } from '../../services/api';

const formFields = [
  { name: 'judul', label: 'Judul Berita', required: true },
  { name: 'kategori', label: 'Kategori', required: true },
  { name: 'penulis', label: 'Penulis', required: true },
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
    setFormData({});
    setOpenModal(true);
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setFormData(row);
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
      if (editingId) {
        await updateBerita(editingId, data);
      } else {
        await createBerita(data);
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
