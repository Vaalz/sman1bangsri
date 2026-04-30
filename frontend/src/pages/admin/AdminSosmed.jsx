import { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { getAdminSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } from '../../services/api';

const platformOptions = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'threads', label: 'Threads' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'x', label: 'X (Twitter)' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'discord', label: 'Discord' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'pinterest', label: 'Pinterest' },
  { value: 'snapchat', label: 'Snapchat' },
  { value: 'twitch', label: 'Twitch' },
  { value: 'website', label: 'Website' },
];

const formFields = [
  { name: 'platform', label: 'Platform', type: 'select', options: platformOptions, required: true },
  { name: 'url', label: 'URL', required: true, placeholder: 'https://...' },
];

function AdminSosmed() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const columns = [
    { field: 'platform', headerName: 'Platform' },
    { field: 'url', headerName: 'URL' },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminSocialLinks();
      setLinks(response.data.data || []);
    } catch (err) {
      setError('Gagal memuat data sosmed');
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
    if (window.confirm(`Hapus sosmed "${row.platform}"?`)) {
      try {
        await deleteSocialLink(row.id);
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
        platform: data.platform || '',
        url: normalizeLink(data.url),
      };

      if (editingId) {
        await updateSocialLink(editingId, payload);
      } else {
        await createSocialLink(payload);
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
        title="Manajemen Sosial Media"
        columns={columns}
        data={links}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CrudModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        title={editingId ? 'Edit Sosial Media' : 'Tambah Sosial Media'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />
    </Box>
  );
}

export default AdminSosmed;
