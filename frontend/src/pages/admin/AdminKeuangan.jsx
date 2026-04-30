import { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert, Button } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminKeuangan, createKeuangan, updateKeuangan, deleteKeuangan, getImageUrl } from '../../services/api';

const formFields = [
  { name: 'judul', label: 'Judul Laporan', required: true },
  { name: 'tanggal', label: 'Tanggal', type: 'date', required: true },
  { name: 'deskripsi', label: 'Deskripsi', multiline: true, rows: 3, required: false },
  { name: 'drive_link', label: 'Link Drive', required: false },
  { name: 'file', label: 'Upload PDF', type: 'file', accept: '.pdf', fileTypes: 'PDF', maxSize: '5 MB', required: false },
];

function AdminKeuangan() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const columns = [
    { field: 'judul', headerName: 'Judul' },
    { field: 'tanggal', headerName: 'Tanggal' },
    {
      field: 'drive_link',
      headerName: 'Link Drive',
      render: (value) => {
        if (!value) return '-';
        return (
          <Button
            component="a"
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            variant="outlined"
          >
            Drive
          </Button>
        );
      },
    },
    {
      field: 'file',
      headerName: 'PDF',
      render: (value) => {
        if (!value) return '-';
        return (
          <Button
            component="a"
            href={getImageUrl(value)}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            variant="contained"
          >
            Lihat PDF
          </Button>
        );
      },
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminKeuangan();
      setReports(response.data.data || []);
    } catch (err) {
      setError('Gagal memuat data keuangan');
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
    if (window.confirm(`Hapus laporan "${row.judul}"?`)) {
      try {
        await deleteKeuangan(row.id);
        fetchData();
      } catch (err) {
        alert('Gagal menghapus data');
        console.error(err);
      }
    }
  };

  const normalizeLink = (value) => {
    if (!value || typeof value !== 'string') return '';
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  const getApiErrorMessage = (err, fallback) => {
    const validationErrors = err?.response?.data?.errors;
    if (validationErrors && typeof validationErrors === 'object') {
      const firstField = Object.keys(validationErrors)[0];
      const firstMessage = validationErrors[firstField]?.[0];
      if (firstMessage) return firstMessage;
    }

    return err?.response?.data?.message || fallback;
  };

  const handleSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        judul: data.judul?.trim() || '',
        tanggal: data.tanggal || '',
        deskripsi: data.deskripsi?.trim() || '',
        drive_link: normalizeLink(data.drive_link),
      };

      if (editingId) {
        await updateKeuangan(editingId, payload);
      } else {
        await createKeuangan(payload);
      }
      setOpenModal(false);
      setFormData({});
      fetchData();
    } catch (err) {
      alert(getApiErrorMessage(err, 'Gagal menyimpan data'));
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
        title="Manajemen Laporan Keuangan"
        columns={columns}
        data={reports}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        title={editingId ? 'Edit Laporan Keuangan' : 'Tambah Laporan Keuangan'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />
    </Box>
  );
}

export default AdminKeuangan;
