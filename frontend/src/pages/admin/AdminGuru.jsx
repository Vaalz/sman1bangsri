import { useState, useEffect } from 'react';
import { Box, Avatar, CircularProgress, Alert } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminGuru, createGuru, updateGuru, deleteGuru, getImageUrl } from '../../services/api';

const formFields = [
  { name: 'nama', label: 'Nama Lengkap', required: true },
  { name: 'nip', label: 'NIP', required: false },
  { name: 'jabatan', label: 'Jabatan', required: true },
  { name: 'mapel', label: 'Mata Pelajaran', required: true },
  { name: 'foto', label: 'Foto', type: 'file', required: false },
];

function AdminGuru() {
  const [guru, setGuru] = useState([]);
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
    { field: 'nip', headerName: 'NIP' },
    { field: 'jabatan', headerName: 'Jabatan' },
    { field: 'mapel', headerName: 'Mata Pelajaran' },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminGuru();
      setGuru(response.data.data || []);
    } catch (err) {
      setError('Gagal memuat data guru');
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
    if (window.confirm(`Hapus data guru "${row.nama}"?`)) {
      try {
        await deleteGuru(row.id);
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
        await updateGuru(editingId, data);
      } else {
        await createGuru(data);
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
        title="Manajemen Data Guru"
        columns={columns}
        data={guru}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        title={editingId ? 'Edit Data Guru' : 'Tambah Data Guru'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />
    </Box>
  );
}

export default AdminGuru;
