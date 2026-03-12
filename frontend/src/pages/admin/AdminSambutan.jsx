import { useState, useEffect } from 'react';
import { Box, Avatar, CircularProgress, Alert } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminSambutan, createSambutan, updateSambutan, deleteSambutan, getImageUrl } from '../../services/api';

const formFields = [
  { name: 'nama', label: 'Nama Lengkap', required: true },
  { name: 'jabatan', label: 'Jabatan', required: true },
  { name: 'foto', label: 'Foto', type: 'file', required: false },
  { 
    name: 'sambutan', 
    label: 'Sambutan', 
    type: 'textarea',
    required: true,
    multiline: true,
    rows: 10
  },
];

function AdminSambutan() {
  const [sambutan, setSambutan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const columns = [
    {
      field: 'foto',
      headerName: 'Foto',
      render: (value) => <Avatar src={getImageUrl(value)} />,
    },
    { field: 'nama', headerName: 'Nama' },
    { field: 'jabatan', headerName: 'Jabatan' },
    { 
      field: 'sambutan', 
      headerName: 'Sambutan',
      render: (value) => value ? value.substring(0, 100) + '...' : '-'
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminSambutan();
      setSambutan(response.data.data || []);
    } catch (err) {
      setError('Gagal memuat data sambutan');
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
    if (window.confirm(`Hapus sambutan dari "${row.nama}"?`)) {
      try {
        await deleteSambutan(row.id);
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
        await updateSambutan(editingId, data);
      } else {
        await createSambutan(data);
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
        title="Manajemen Sambutan Kepala Sekolah"
        columns={columns}
        data={sambutan}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        title={editingId ? 'Edit Sambutan' : 'Tambah Sambutan'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />
    </Box>
  );
}

export default AdminSambutan;
