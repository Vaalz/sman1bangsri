import { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { Article, Photo, People, EmojiEvents, Sports, School, TrendingUp, FiberManualRecord, BarChart } from '@mui/icons-material';
import { getDashboardStats } from '../../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({
    total_berita: 0,
    total_guru: 0,
    total_prestasi: 0,
    total_ekstrakurikuler: 0,
    total_course: 0,
    total_galeri: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getDashboardStats();
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Berita', value: stats.total_berita, icon: <Article />, color: '#1976d2', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { title: 'Total Guru', value: stats.total_guru, icon: <People />, color: '#ed6c02', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { title: 'Total Prestasi', value: stats.total_prestasi, icon: <EmojiEvents />, color: '#9c27b0', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { title: 'Ekstrakurikuler', value: stats.total_ekstrakurikuler, icon: <Sports />, color: '#d32f2f', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { title: 'Total Course', value: stats.total_course, icon: <School />, color: '#0288d1', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  ];

  const recentActivities = [
    { action: 'Berita baru ditambahkan', time: '2 jam yang lalu' },
    { action: 'Data guru ditambahkan', time: '1 hari yang lalu' },
    { action: 'Prestasi baru ditambahkan', time: '2 hari yang lalu' },
  ];

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 5 }}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{ mb: 1, color: '#1a1a1a', letterSpacing: '-0.5px' }}
        >
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
          Selamat datang di Admin Dashboard SMAN 1 BANGSRI
        </Typography>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Statistics Cards */}
          <Grid container spacing={7} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
            <Card
              sx={{
                height: 240,
                width: 300,
                background: card.gradient,
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ p: 4, pb: 3, '&:last-child': { pb: 3 }, flex: 1, display: 'flex' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9, mb: 2.5, fontWeight: 500, fontSize: '0.9375rem' }}>
                        {card.title}
                      </Typography>
                      <Typography variant="h2" fontWeight="700" sx={{ mb: 2.5, fontSize: '3rem', lineHeight: 1 }}>
                        {card.value}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', opacity: 0.85 }}>
                      <FiberManualRecord sx={{ fontSize: 8, mr: 0.75 }} />
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>Data terkini</Typography>
                    </Box>
                  </Box>
                  <Box 
                    sx={{ 
                      width: 72, 
                      height: 72, 
                      borderRadius: 2.5,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)',
                      flexShrink: 0,
                    }}
                  >
                    <Box sx={{ fontSize: 42 }}>
                      {card.icon}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <Box 
                sx={{ 
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: 'rgba(255, 255, 255, 0.25)',
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Section - Activities & Stats */}
      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} lg={6}>
          <Paper 
            sx={{ 
              p: 3.5, 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              height: '100%',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3.5 }}>
              <Box 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                }}
              >
                <TrendingUp sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.25 }}>
                  Aktivitas Terbaru
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Update terakhir sistem
                </Typography>
              </Box>
            </Box>
            <Box>
              {recentActivities.map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    py: 2,
                    px: 2.5,
                    mb: index !== recentActivities.length - 1 ? 2 : 0,
                    borderRadius: 2.5,
                    backgroundColor: '#f8f9fb',
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.main',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5, fontSize: '0.9375rem' }}>
                    {activity.action}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8125rem' }}>
                    {activity.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} lg={6}>
          <Paper 
            sx={{ 
              p: 3.5, 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              height: '100%',
              width: 700,
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3.5 }}>
              <Box 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
                }}
              >
                <BarChart sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.25 }}>
                  Quick Stats
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Statistik persentase data
                </Typography>
              </Box>
            </Box>
            <Box>
              {[
                { label: 'Berita Published', value: 85, color: 'primary.main', bgColor: '#e3f2fd', gradient: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)' },
                { label: 'Data Completion', value: 78, color: 'warning.main', bgColor: '#fff3e0', gradient: 'linear-gradient(90deg, #ed6c02 0%, #ff9800 100%)' },
              ].map((stat, index, array) => (
                <Box key={stat.label} sx={{ mb: index !== array.length - 1 ? 3.5 : 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.9375rem' }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color={stat.color} sx={{ fontSize: '1.125rem' }}>
                      {stat.value}%
                    </Typography>
                  </Box>
                  <Box sx={{ height: 10, backgroundColor: stat.bgColor, borderRadius: 2, overflow: 'hidden' }}>
                    <Box 
                      sx={{ 
                        width: `${stat.value}%`, 
                        height: '100%', 
                        background: stat.gradient,
                        borderRadius: 2,
                        transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      }} 
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
        </>
      )}
    </Box>
  );
}

export default AdminDashboard;
