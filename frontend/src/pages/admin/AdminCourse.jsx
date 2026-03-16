import { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminCourses, createCourse, updateCourse, deleteCourse, getImageUrl } from '../../services/api';

const formFields = [
  { name: 'judul', label: 'Nama Mata Pelajaran', required: true },
  { name: 'mapel', label: 'Kode Mata Pelajaran', required: true },
  { name: 'kelas', label: 'Kelas', required: true },
  { name: 'deskripsi', label: 'Deskripsi', multiline: true, rows: 3, required: false },
  { name: 'file', label: 'File Silabus/Gambar', type: 'file', accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif', fileTypes: 'PDF, DOC, DOCX, JPG, PNG, GIF', maxSize: '5 MB', required: false },
  { name: 'link', label: 'Link Materi (Google Drive, Classroom, dll)', required: false },
];

function AdminCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const isImageFile = (path) => {
    if (!path || typeof path !== 'string') return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(path);
  };

  const columns = [
    {
      field: 'file',
      headerName: 'Gambar',
      render: (value) => {
        if (!value) return '-';
        if (!isImageFile(value)) return 'File dokumen';

        return (
          <Box
            component="img"
            src={getImageUrl(value)}
            alt="Course"
            sx={{
              width: 80,
              height: 56,
              objectFit: 'cover',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
        );
      }
    },
    { field: 'mapel', headerName: 'Kode' },
    { field: 'judul', headerName: 'Mata Pelajaran' },
    { field: 'kelas', headerName: 'Kelas' },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminCourses();
      setCourses(response.data.data || []);
    } catch (err) {
      setError('Gagal memuat data mata pelajaran');
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
    if (window.confirm(`Hapus mata pelajaran "${row.judul}"?`)) {
      try {
        await deleteCourse(row.id);
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
        mapel: data.mapel?.trim() || '',
        kelas: data.kelas?.trim() || '',
        deskripsi: data.deskripsi?.trim() || '',
        link: normalizeLink(data.link),
      };

      if (editingId) {
        await updateCourse(editingId, payload);
      } else {
        await createCourse(payload);
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
        title="Manajemen Mata Pelajaran"
        columns={columns}
        data={courses}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        title={editingId ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />
    </Box>
  );
}

export default AdminCourse;
