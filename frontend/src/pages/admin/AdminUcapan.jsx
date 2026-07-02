import { useState, useEffect, useMemo } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminUcapan, createUcapan, updateUcapan, deleteUcapan, getImageUrl } from '../../services/api';

const baseFormFields = [
  { name: 'judul', label: 'Judul Ucapan', required: true },
  { name: 'caption', label: 'Caption / Pesan', multiline: true, rows: 4, required: false },
  { name: 'tanggal', label: 'Tanggal', type: 'date', required: false },
  { name: 'start_date', label: 'Tampil Mulai (opsional)', type: 'date', required: false },
  { name: 'end_date', label: 'Tampil Sampai (opsional)', type: 'date', required: false },
  { name: 'is_active', label: 'Aktif', type: 'select', options: [{ value: 1, label: 'Aktif' }, { value: 0, label: 'Tidak Aktif' }], required: false },
  { name: 'foto', label: 'Foto / Kartu Ucapan', type: 'file', required: false, accept: 'image/*' },
];

function AdminUcapan() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const formFields = useMemo(
    () => baseFormFields.map((field) => (field.name === 'foto' ? { ...field, required: !editingId } : field)),
    [editingId]
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAdminUcapan({ per_page: 1000 });
      const data = res?.data?.data || res?.data || [];
      setItems(data);
    } catch (err) {
      console.error(err);
      setError('Gagal memuat data ucapan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const normalizeDateForInput = (value) => {
    if (!value) return '';
    if (typeof value === 'string') {
      if (value.includes('T')) return value.split('T')[0];
      if (value.includes('/')) {
        const parts = value.split('/');
        if (parts.length === 3) {
          const [day, month, year] = parts;
          return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        }
      }
    }
    return value;
  };

  const columns = [
    {
      field: 'foto',
      headerName: 'Foto',
      render: (value) => (
        <Box component="img" src={getImageUrl(value)} alt="Ucapan" sx={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 1 }} />
      )
    },
    { field: 'judul', headerName: 'Judul' },
    { field: 'caption', headerName: 'Pesan', render: (v) => v ? (v.length > 80 ? v.substring(0,80)+'...' : v) : '-' },
    { field: 'tanggal', headerName: 'Tanggal', render: (v) => v || '-' },
    { field: 'is_active', headerName: 'Aktif', render: (v) => v ? 'Ya' : 'Tidak' },
  ];

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ tanggal: '' });
    setOpenModal(true);
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setFormData({ ...row, tanggal: normalizeDateForInput(row.tanggal), start_date: normalizeDateForInput(row.start_date), end_date: normalizeDateForInput(row.end_date) });
    setOpenModal(true);
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Hapus ucapan "${row.judul}"?`)) {
      try {
        await deleteUcapan(row.id);
        fetchData();
      } catch (err) {
        alert('Gagal menghapus data');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (!editingId && !(data.foto instanceof File)) {
        alert('Foto wajib diupload saat menambah ucapan');
        return;
      }

      if (data.foto instanceof File && data.foto.size > 5 * 1024 * 1024) {
        alert('Ukuran foto maksimal 5 MB');
        return;
      }

      if (editingId) await updateUcapan(editingId, data);
      else await createUcapan(data);

      setOpenModal(false);
      setFormData({});
      fetchData();
    } catch (err) {
      const message = err?.response?.data?.message || 'Gagal menyimpan data';
      alert(message);
      console.error(err);
    }
  };

  const handleCancel = () => { setOpenModal(false); setFormData({}); };

  if (loading) return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px"><CircularProgress /></Box>);
  if (error) return (<Box p={3}><Alert severity="error">{error}</Alert></Box>);

  return (
    <Box>
      <CrudTable
        title="Manajemen Ucapan / Kartu Ucapan"
        columns={columns}
        data={items}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="Belum ada ucapan. Klik Tambah untuk membuat kartu ucapan baru."
      />

      <CrudModal open={openModal} title={editingId ? 'Edit Ucapan' : 'Tambah Ucapan'} fields={formFields} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onClose={handleCancel} />
    </Box>
  );
}

export default AdminUcapan;
