import { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert, Tabs, Tab, Typography, MenuItem, Avatar } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import CrudModal from '../../components/admin/CrudModal';
import { 
  getAdminEkstrakurikuler, createEkstrakurikuler, updateEkstrakurikuler, deleteEkstrakurikuler,
  getAdminJadwalEkstrakurikuler, createJadwalEkstrakurikuler, updateJadwalEkstrakurikuler, deleteJadwalEkstrakurikuler,
  getAdminStrukturEkstrakurikuler, createStrukturEkstrakurikuler, updateStrukturEkstrakurikuler, deleteStrukturEkstrakurikuler,
  getAdminPrestasiEkstrakurikuler, createPrestasiEkstrakurikuler, updatePrestasiEkstrakurikuler, deletePrestasiEkstrakurikuler,
  getImageUrl
} from '../../services/api';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ paddingTop: '24px' }}>
      {value === index && children}
    </div>
  );
}

const ekskulFormFields = [
  { name: 'nama', label: 'Nama Ekstrakurikuler', required: true },
  { name: 'kategori', label: 'Kategori', required: true },
  { name: 'pembina', label: 'Pembina', required: true },
  { name: 'deskripsi', label: 'Deskripsi', multiline: true, rows: 4, required: false },
  { name: 'icon', label: 'Icon (Sports/MusicNote/Palette/Science/Language)', required: false },
  { name: 'logo', label: 'Logo Ekstrakurikuler', type: 'file', required: false, accept: 'image/*' },
];

function AdminEkstrakurikuler() {
  const [tabValue, setTabValue] = useState(0);
  const [ekskul, setEkskul] = useState([]);
  const [jadwal, setJadwal] = useState([]);
  const [struktur, setStruktur] = useState([]);
  const [prestasi, setPrestasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [currentTab, setCurrentTab] = useState('ekskul');

  const ekskulColumns = [
    { field: 'nama', headerName: 'Nama' },
    { field: 'kategori', headerName: 'Kategori' },
    { field: 'pembina', headerName: 'Pembina' },
    { 
      field: 'logo', 
      headerName: 'Logo', 
      render: (value) => value ? (
        <Avatar 
          src={getImageUrl(value)} 
          variant="rounded" 
          sx={{ width: 50, height: 50 }}
        />
      ) : '-'
    },
  ];

  const jadwalColumns = [
    { field: 'ekstrakurikuler_nama', headerName: 'Ekstrakurikuler' },
    { field: 'hari', headerName: 'Hari' },
    { field: 'waktu_mulai', headerName: 'Waktu Mulai' },
    { field: 'waktu_selesai', headerName: 'Waktu Selesai' },
    { field: 'tempat', headerName: 'Tempat' },
  ];

  const strukturColumns = [
    { field: 'ekstrakurikuler_nama', headerName: 'Ekstrakurikuler' },
    { field: 'nama', headerName: 'Nama' },
    { field: 'jabatan', headerName: 'Jabatan' },
    { field: 'kelas', headerName: 'Kelas' },
  ];

  const prestasiColumns = [
    { field: 'ekstrakurikuler_nama', headerName: 'Ekstrakurikuler' },
    { field: 'nama_prestasi', headerName: 'Nama Prestasi' },
    { field: 'juara', headerName: 'Juara' },
    { field: 'tingkat', headerName: 'Tingkat' },
    { field: 'tahun', headerName: 'Tahun' },
  ];

  const getJadwalFormFields = () => [
    { name: 'ekstrakurikuler_id', label: 'Ekstrakurikuler', required: true, type: 'select', options: ekskul.map(e => ({ value: e.id, label: e.nama })) },
    { name: 'hari', label: 'Hari', required: true, type: 'select', options: [
      { value: 'Senin', label: 'Senin' },
      { value: 'Selasa', label: 'Selasa' },
      { value: 'Rabu', label: 'Rabu' },
      { value: 'Kamis', label: 'Kamis' },
      { value: 'Jumat', label: 'Jumat' },
      { value: 'Sabtu', label: 'Sabtu' },
      { value: 'Minggu', label: 'Minggu' },
    ]},
    { name: 'waktu_mulai', label: 'Waktu Mulai (HH:MM)', required: true, placeholder: '14:00' },
    { name: 'waktu_selesai', label: 'Waktu Selesai (HH:MM)', required: true, placeholder: '16:00' },
    { name: 'tempat', label: 'Tempat', required: true },
    { name: 'keterangan', label: 'Keterangan', multiline: true, rows: 3, required: false },
  ];

  const getStrukturFormFields = () => [
    { name: 'ekstrakurikuler_id', label: 'Ekstrakurikuler', required: true, type: 'select', options: ekskul.map(e => ({ value: e.id, label: e.nama })) },
    { name: 'nama', label: 'Nama', required: true },
    { name: 'jabatan', label: 'Jabatan', required: true, placeholder: 'Ketua/Wakil Ketua/Sekretaris/dll' },
    { name: 'kelas', label: 'Kelas', required: false, placeholder: 'XII IPA 1' },
    { name: 'foto', label: 'Foto', type: 'file', required: false, accept: 'image/*' },
    { name: 'urutan', label: 'Urutan', type: 'number', required: false, placeholder: '0' },
  ];

  const getPrestasiFormFields = () => [
    { name: 'ekstrakurikuler_id', label: 'Ekstrakurikuler', required: true, type: 'select', options: ekskul.map(e => ({ value: e.id, label: e.nama })) },
    { name: 'nama_prestasi', label: 'Nama Prestasi', required: true },
    { name: 'juara', label: 'Juara', required: false, placeholder: 'Juara 1/Juara 2/dll' },
    { name: 'tingkat', label: 'Tingkat', required: true, type: 'select', options: [
      { value: 'Kecamatan', label: 'Kecamatan' },
      { value: 'Kabupaten', label: 'Kabupaten' },
      { value: 'Provinsi', label: 'Provinsi' },
      { value: 'Nasional', label: 'Nasional' },
      { value: 'Internasional', label: 'Internasional' },
    ]},
    { name: 'tahun', label: 'Tahun', type: 'number', required: true, placeholder: '2026' },
    { name: 'deskripsi', label: 'Deskripsi', multiline: true, rows: 3, required: false },
    { name: 'foto', label: 'Foto', type: 'file', required: false, accept: 'image/*' },
  ];

  const fetchEkskul = async () => {
    try {
      const response = await getAdminEkstrakurikuler();
      setEkskul(response.data.data || []);
    } catch (err) {
      console.error('Gagal memuat ekstrakurikuler', err);
    }
  };

  const fetchJadwal = async () => {
    try {
      const response = await getAdminJadwalEkstrakurikuler();
      const jadwalData = response.data.data || [];
      // Add ekstrakurikuler name to each jadwal
      const jadwalWithEkskul = jadwalData.map(j => ({
        ...j,
        ekstrakurikuler_nama: ekskul.find(e => e.id === j.ekstrakurikuler_id)?.nama || '-'
      }));
      setJadwal(jadwalWithEkskul);
    } catch (err) {
      console.error('Gagal memuat jadwal', err);
    }
  };

  const fetchStruktur = async () => {
    try {
      const response = await getAdminStrukturEkstrakurikuler();
      const strukturData = response.data.data || [];
      const strukturWithEkskul = strukturData.map(s => ({
        ...s,
        ekstrakurikuler_nama: ekskul.find(e => e.id === s.ekstrakurikuler_id)?.nama || '-'
      }));
      setStruktur(strukturWithEkskul);
    } catch (err) {
      console.error('Gagal memuat struktur', err);
    }
  };

  const fetchPrestasi = async () => {
    try {
      const response = await getAdminPrestasiEkstrakurikuler();
      const prestasiData = response.data.data || [];
      const prestasiWithEkskul = prestasiData.map(p => ({
        ...p,
        ekstrakurikuler_nama: ekskul.find(e => e.id === p.ekstrakurikuler_id)?.nama || '-'
      }));
      setPrestasi(prestasiWithEkskul);
    } catch (err) {
      console.error('Gagal memuat prestasi', err);
    }
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      await fetchEkskul();
    } catch (err) {
      setError('Gagal memuat data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    // Fetch related data when ekskul is loaded and tab changes
    if (ekskul.length > 0) {
      if (tabValue === 1) fetchJadwal();
      else if (tabValue === 2) fetchStruktur();
      else if (tabValue === 3) fetchPrestasi();
    }
  }, [tabValue, ekskul]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAdd = (tab) => {
    setCurrentTab(tab);
    setEditingId(null);
    setFormData({});
    setOpenModal(true);
  };

  const handleEdit = (row, tab) => {
    setCurrentTab(tab);
    setEditingId(row.id);
    setFormData(row);
    setOpenModal(true);
  };

  const handleDelete = async (row, tab) => {
    const confirmMsg = tab === 'ekskul' ? `Hapus ekstrakurikuler "${row.nama}"?` :
                       tab === 'jadwal' ? `Hapus jadwal ini?` :
                       tab === 'struktur' ? `Hapus "${row.nama}" dari struktur?` :
                       `Hapus prestasi "${row.nama_prestasi}"?`;
    
    if (window.confirm(confirmMsg)) {
      try {
        if (tab === 'ekskul') await deleteEkstrakurikuler(row.id);
        else if (tab === 'jadwal') await deleteJadwalEkstrakurikuler(row.id);
        else if (tab === 'struktur') await deleteStrukturEkstrakurikuler(row.id);
        else if (tab === 'prestasi') await deletePrestasiEkstrakurikuler(row.id);
        
        // Refresh data
        if (tab === 'ekskul') fetchEkskul();
        else if (tab === 'jadwal') fetchJadwal();
        else if (tab === 'struktur') fetchStruktur();
        else if (tab === 'prestasi') fetchPrestasi();
      } catch (err) {
        alert('Gagal menghapus data');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (currentTab === 'ekskul') {
        if (editingId) await updateEkstrakurikuler(editingId, data);
        else await createEkstrakurikuler(data);
        fetchEkskul();
      } else if (currentTab === 'jadwal') {
        if (editingId) await updateJadwalEkstrakurikuler(editingId, data);
        else await createJadwalEkstrakurikuler(data);
        fetchJadwal();
      } else if (currentTab === 'struktur') {
        if (editingId) await updateStrukturEkstrakurikuler(editingId, data);
        else await createStrukturEkstrakurikuler(data);
        fetchStruktur();
      } else if (currentTab === 'prestasi') {
        if (editingId) await updatePrestasiEkstrakurikuler(editingId, data);
        else await createPrestasiEkstrakurikuler(data);
        fetchPrestasi();
      }
      
      setOpenModal(false);
      setFormData({});
    } catch (err) {
      alert('Gagal menyimpan data');
      console.error(err);
    }
  };

  const getModalTitle = () => {
    const action = editingId ? 'Edit' : 'Tambah';
    if (currentTab === 'ekskul') return `${action} Ekstrakurikuler`;
    if (currentTab === 'jadwal') return `${action} Jadwal`;
    if (currentTab === 'struktur') return `${action} Struktur Organisasi`;
    if (currentTab === 'prestasi') return `${action} Prestasi`;
    return action;
  };

  const getCurrentFields = () => {
    if (currentTab === 'ekskul') return ekskulFormFields;
    if (currentTab === 'jadwal') return getJadwalFormFields();
    if (currentTab === 'struktur') return getStrukturFormFields();
    if (currentTab === 'prestasi') return getPrestasiFormFields();
    return [];
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
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Manajemen Ekstrakurikuler
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Ekstrakurikuler" />
          <Tab label="Jadwal" />
          <Tab label="Struktur Organisasi" />
          <Tab label="Prestasi" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <CrudTable
          title="Data Ekstrakurikuler"
          columns={ekskulColumns}
          data={ekskul}
          onAdd={() => handleAdd('ekskul')}
          onEdit={(row) => handleEdit(row, 'ekskul')}
          onDelete={(row) => handleDelete(row, 'ekskul')}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <CrudTable
          title="Jadwal Ekstrakurikuler"
          columns={jadwalColumns}
          data={jadwal}
          onAdd={() => handleAdd('jadwal')}
          onEdit={(row) => handleEdit(row, 'jadwal')}
          onDelete={(row) => handleDelete(row, 'jadwal')}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <CrudTable
          title="Struktur Organisasi"
          columns={strukturColumns}
          data={struktur}
          onAdd={() => handleAdd('struktur')}
          onEdit={(row) => handleEdit(row, 'struktur')}
          onDelete={(row) => handleDelete(row, 'struktur')}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <CrudTable
          title="Prestasi Ekstrakurikuler"
          columns={prestasiColumns}
          data={prestasi}
          onAdd={() => handleAdd('prestasi')}
          onEdit={(row) => handleEdit(row, 'prestasi')}
          onDelete={(row) => handleDelete(row, 'prestasi')}
        />
      </TabPanel>

      <CrudModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        title={getModalTitle()}
        fields={getCurrentFields()}
        formData={formData}
        setFormData={setFormData}
      />
    </Box>
  );
}

export default AdminEkstrakurikuler;
