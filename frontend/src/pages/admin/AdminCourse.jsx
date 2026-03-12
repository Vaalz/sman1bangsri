import { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminCourses, createCourse, updateCourse, deleteCourse } from '../../services/api';

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

  const columns = [
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

  const handleSubmit = async (data) => {
    try {
      if (editingId) {
        await updateCourse(editingId, data);
      } else {
        await createCourse(data);
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
