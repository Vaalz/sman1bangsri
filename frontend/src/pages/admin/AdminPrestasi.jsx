import { useState, useEffect } from 'react';
import { Box, Chip, CircularProgress, Alert } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminPrestasi, createPrestasi, updatePrestasi, deletePrestasi } from '../../services/api';

const formFields = [
  { name: 'judul', label: 'Nama Prestasi', required: true },
  { name: 'nama_siswa', label: 'Nama Siswa', required: false },
  { 
    name: 'tingkat', 
    label: 'Tingkat', 
    type: 'select',
    options: ['Nasional', 'Provinsi', 'Kabupaten'],
    required: true 
  },
  { name: 'kategori', label: 'Kategori', required: true },
  { 
    name: 'juara', 
    label: 'Juara (Opsional)', 
    type: 'select',
    options: ['Juara 1', 'Juara 2', 'Juara 3', 'Juara Harapan 1', 'Juara Harapan 2'],
    required: false 
  },
  { name: 'tahun', label: 'Tahun', required: true },
];

function AdminPrestasi() {
  const [prestasi, setPrestasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const columns = [
    { field: 'judul', headerName: 'Prestasi' },
    { field: 'nama_siswa', headerName: 'Nama Siswa' },
    {
      field: 'tingkat',
      headerName: 'Tingkat',
      render: (value) => {
        let color = 'default';
        if (value === 'Nasional') color = 'error';
        if (value === 'Provinsi') color = 'warning';
        if (value === 'Kabupaten') color = 'info';
        return <Chip label={value} color={color} size="small" />;
      },
    },
    { field: 'kategori', headerName: 'Kategori' },
    {
      field: 'juara',
      headerName: 'Juara',
      render: (value) => {
        if (!value) return '-';
        let color = 'default';
        if (value === 'Juara 1') {
          color = 'warning'; // Gold
        } else if (value === 'Juara 2') {
          color = 'default'; // Silver
        } else if (value === 'Juara 3') {
          color = 'info'; // Bronze
        }
        return <Chip label={value} color={color} size="small" sx={{
          fontWeight: value.startsWith('Juara ') && ['1', '2', '3'].includes(value.slice(-1)) ? 600 : 400
        }} />;
      },
    },
    { field: 'tahun', headerName: 'Tahun' },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminPrestasi();
      setPrestasi(response.data.data || []);
    } catch (err) {
      setError('Gagal memuat data prestasi');
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
    if (window.confirm(`Hapus prestasi "${row.judul}"?`)) {
      try {
        await deletePrestasi(row.id);
        fetchData();
      } catch (err) {
        alert('Gagal menghapus data');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingId) {
        await updatePrestasi(editingId, data);
      } else {
        await createPrestasi(data);
      }
      setOpenModal(false);
      setFormData({});
      fetchData();
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
        title="Manajemen Prestasi"
        columns={columns}
        data={prestasi}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        title={editingId ? 'Edit Prestasi' : 'Tambah Prestasi'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />
    </Box>
  );
}

export default AdminPrestasi;
