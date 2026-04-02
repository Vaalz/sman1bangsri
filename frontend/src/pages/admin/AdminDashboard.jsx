import { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, CircularProgress, Button, Stack } from '@mui/material';
import {
  Article,
  Photo,
  People,
  EmojiEvents,
  Sports,
  School,
  WorkspacePremium,
  RecordVoiceOver,
  CalendarMonth,
  History,
  AddPhotoAlternate,
  PostAdd,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../../services/api';

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_berita: 0,
    total_guru: 0,
    total_prestasi: 0,
    total_ekstrakurikuler: 0,
    total_course: 0,
    total_galeri: 0,
    total_jadwal_ekstrakurikuler: 0,
    total_prestasi_ekstrakurikuler: 0,
    total_siswa_ptn: 0,
    prestasi_nasional: 0,
    prestasi_provinsi: 0,
    prestasi_kabupaten: 0,
    recent_activities: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getDashboardStats();
        if (response.data.success) {
          setStats((prev) => ({ ...prev, ...response.data.data }));
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const gradients = {
    blue: 'linear-gradient(135deg, #2457d6 0%, #2d8cff 100%)',
    green: 'linear-gradient(135deg, #1f9d55 0%, #2fbf71 100%)',
    orange: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    gray: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
  };

  const statCards = [
    {
      title: 'Total Berita',
      value: stats.total_berita,
      note: 'Konten informasi sekolah',
      icon: <Article />,
      gradient: gradients.blue,
    },
    {
      title: 'Total Galeri',
      value: stats.total_galeri,
      note: 'Dokumentasi kegiatan',
      icon: <Photo />,
      gradient: gradients.blue,
    },
    {
      title: 'Total Guru',
      value: stats.total_guru,
      note: 'Data SDM aktif',
      icon: <People />,
      gradient: gradients.blue,
    },
    {
      title: 'Total Course',
      value: stats.total_course,
      note: 'Materi pembelajaran',
      icon: <School />,
      gradient: gradients.blue,
    },
    {
      title: 'Total Prestasi',
      value: stats.total_prestasi,
      note: 'Prestasi akademik',
      icon: <EmojiEvents />,
      gradient: gradients.green,
    },
    {
      title: 'Prestasi Ekskul',
      value: stats.total_prestasi_ekstrakurikuler,
      note: 'Prestasi non-akademik',
      icon: <EmojiEvents />,
      gradient: gradients.green,
    },
    {
      title: 'Ekstrakurikuler',
      value: stats.total_ekstrakurikuler,
      note: 'Kegiatan aktif siswa',
      icon: <Sports />,
      gradient: gradients.orange,
    },
    {
      title: 'Jadwal Ekskul',
      value: stats.total_jadwal_ekstrakurikuler,
      note: 'Jadwal yang terdata',
      icon: <CalendarMonth />,
      gradient: gradients.orange,
    },
    {
      title: 'Siswa PTN',
      value: stats.total_siswa_ptn,
      note: 'Riwayat lolos PTN',
      icon: <WorkspacePremium />,
      gradient: gradients.gray,
    },
  ];

  const maxPrestasiLevel = Math.max(1, stats.prestasi_nasional, stats.prestasi_provinsi, stats.prestasi_kabupaten);
  const maxKonten = Math.max(1, stats.total_berita, stats.total_galeri, stats.total_course);

  const prestasiChartData = [
    { label: 'Nasional', value: stats.prestasi_nasional, color: '#16a34a' },
    { label: 'Provinsi', value: stats.prestasi_provinsi, color: '#22c55e' },
    { label: 'Kabupaten/Kota', value: stats.prestasi_kabupaten, color: '#4ade80' },
  ];

  const kontenChartData = [
    { label: 'Berita', value: stats.total_berita, color: '#2563eb' },
    { label: 'Galeri', value: stats.total_galeri, color: '#3b82f6' },
    { label: 'Course', value: stats.total_course, color: '#60a5fa' },
  ];

  const quickActions = [
    { label: 'Tambah Berita', path: '/admin/berita', icon: <PostAdd />, color: 'primary' },
    { label: 'Tambah Galeri', path: '/admin/galeri', icon: <AddPhotoAlternate />, color: 'info' },
    { label: 'Tambah Guru', path: '/admin/guru', icon: <People />, color: 'secondary' },
    { label: 'Tambah Prestasi', path: '/admin/prestasi', icon: <EmojiEvents />, color: 'success' },
    { label: 'Tambah Ekskul', path: '/admin/ekstrakurikuler', icon: <Sports />, color: 'warning' },
    { label: 'Tambah Course', path: '/admin/course', icon: <School />, color: 'primary' },
    { label: 'Tambah Sambutan', path: '/admin/sambutan', icon: <RecordVoiceOver />, color: 'secondary' },
    { label: 'Tambah Siswa PTN', path: '/admin/siswa-ptn', icon: <WorkspacePremium />, color: 'success' },
  ];

  const renderBarDiagram = (data, maxValue) => (
    <Box
      sx={{
        height: 220,
        px: 1,
        pb: 1,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 2,
        borderBottom: '2px solid #cbd5e1',
      }}
    >
      {data.map((item) => {
        const barHeight = Math.max((item.value / maxValue) * 150, 8);

        return (
          <Box key={item.label} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" fontWeight={700} sx={{ color: '#0f172a' }}>
              {item.value}
            </Typography>
            <Box
              sx={{
                width: '100%',
                maxWidth: 88,
                height: barHeight,
                backgroundColor: item.color,
                borderRadius: '10px 10px 4px 4px',
                boxShadow: '0 4px 10px rgba(15, 23, 42, 0.16)',
                transition: 'height 0.35s ease',
              }}
            />
            <Typography variant="caption" sx={{ color: '#475569', textAlign: 'center', minHeight: 30 }}>
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} sx={{ color: '#0f172a', mb: 0.75 }}>
          Selamat datang, Admin
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Ringkasan aktivitas website hari ini
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 280 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Paper
            sx={{
              p: { xs: 2, md: 2.5 },
              borderRadius: 2,
              mb: 3,
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
            }}
          >
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5, color: '#0f172a' }}>
              Quick Actions
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} useFlexGap flexWrap="wrap">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="contained"
                  color={action.color}
                  startIcon={action.icon}
                  onClick={() => navigate(action.path)}
                  sx={{ minWidth: 180 }}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </Paper>

          <Box
            sx={{
              mb: 3,
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
              },
            }}
          >
            {statCards.map((card) => (
              <Box key={card.title}>
                <Card
                  sx={{
                    minHeight: 190,
                    borderRadius: 2,
                    background: card.gradient,
                    color: 'white',
                    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.14)',
                  }}
                >
                  <CardContent sx={{ p: 2.75, '&:last-child': { pb: 2.75 }, display: 'flex', flexDirection: 'column', gap: 1.75 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, opacity: 0.95 }}>{card.title}</Typography>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1.5,
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0.85,
                          '& svg': { fontSize: 24 },
                        }}
                      >
                        {card.icon}
                      </Box>
                    </Box>
                    <Typography sx={{ fontSize: '2.25rem', lineHeight: 1, fontWeight: 800 }}>
                      {card.value}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', opacity: 0.9 }}>{card.note}</Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              mb: 3,
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, minmax(0, 1fr))',
              },
              alignItems: 'stretch',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  minHeight: 260,
                  width: '100%',
                  height: '100%',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
                }}
              >
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2, color: '#0f172a' }}>
                  Grafik Konten
                </Typography>
                {renderBarDiagram(kontenChartData, maxKonten)}
              </Paper>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  minHeight: 260,
                  width: '100%',
                  height: '100%',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
                }}
              >
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2, color: '#0f172a' }}>
                  Grafik Prestasi per Tingkat
                </Typography>
                {renderBarDiagram(prestasiChartData, maxPrestasiLevel)}
              </Paper>
            </Box>
          </Box>

          <Paper
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <History sx={{ color: '#f59e0b' }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Aktivitas Terbaru
              </Typography>
            </Box>
            <Stack spacing={1.25}>
              {stats.recent_activities?.length ? stats.recent_activities.map((activity) => (
                <Box
                  key={activity.id}
                  sx={{
                    p: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: '#f8fafc',
                    borderLeft: '4px solid #f59e0b',
                  }}
                >
                  <Typography variant="body2" fontWeight={600} sx={{ color: '#0f172a' }}>
                    {activity.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    {activity.admin_name} • {activity.time_ago || '-'}
                  </Typography>
                </Box>
              )) : (
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: '#f8fafc',
                    borderLeft: '4px solid #cbd5e1',
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Belum ada aktivitas admin terbaru.
                  </Typography>
                </Box>
              )}
            </Stack>
          </Paper>
        </>
      )}
    </Box>
  );
}

export default AdminDashboard;
