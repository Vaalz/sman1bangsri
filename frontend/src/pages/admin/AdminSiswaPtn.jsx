import { useState, useEffect } from 'react';
import { Box, Avatar, CircularProgress, Alert } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminSiswaPtn, createSiswaPtn, updateSiswaPtn, deleteSiswaPtn, getImageUrl } from '../../services/api';

const formFields = [
  { name: 'nama_siswa', label: 'Nama Siswa', required: true },
  { name: 'foto_siswa', label: 'Foto Siswa', type: 'file', required: false },
  { name: 'kelas', label: 'Kelas', required: true },
  { name: 'nama_ptn', label: 'Nama PTN', required: true },
  { name: 'logo_ptn', label: 'Logo PTN (Background akan dihapus otomatis)', type: 'file', required: false },
  { name: 'jurusan', label: 'Jurusan', required: true },
];

function AdminSiswaPtn() {
  const [siswaPtn, setSiswaPtn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const columns = [
    {
      field: 'foto_siswa',
      headerName: 'Foto Siswa',
      render: (value) => <Avatar src={getImageUrl(value)} />,
    },
    {
      field: 'logo_ptn',
      headerName: 'Logo PTN',
      render: (value) => <Avatar src={getImageUrl(value)} variant="square" />,
    },
    { field: 'nama_siswa', headerName: 'Nama Siswa' },
    { field: 'kelas', headerName: 'Kelas' },
    { field: 'nama_ptn', headerName: 'PTN' },
    { field: 'jurusan', headerName: 'Jurusan' },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminSiswaPtn();
      setSiswaPtn(response.data.data || []);
    } catch (err) {
      setError('Gagal memuat data siswa PTN');
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
    if (window.confirm(`Hapus data siswa "${row.nama_siswa}"?`)) {
      try {
        await deleteSiswaPtn(row.id);
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
        await updateSiswaPtn(editingId, data);
      } else {
        await createSiswaPtn(data);
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
        title="Manajemen Siswa Diterima PTN"
        columns={columns}
        data={siswaPtn}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        title={editingId ? 'Edit Data Siswa PTN' : 'Tambah Data Siswa PTN'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />
    </Box>
  );
}

export default AdminSiswaPtn;
