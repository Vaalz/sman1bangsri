import { Box, Container, Typography, Grid, Card, CardContent, Chip, Button, TextField, InputAdornment, IconButton, Skeleton } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { AccountBalance, CalendarMonth, Description, Link as LinkIcon, Search, Clear, PictureAsPdf } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import smansabaImage from '../assets/image/smansaba.jpg';
import { getKeuanganList, getImageUrl } from '../services/api';

const KeuanganPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchReports();
  }, [searchQuery]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = searchQuery ? { search: searchQuery } : {};
      const response = await getKeuanganList(params);
      setReports(response.data.data || []);
    } catch (error) {
      console.error('Error fetching keuangan reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const formatDate = (value) => {
    if (!value) return 'Tanggal';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString('id-ID');
  };

  const sortedReports = useMemo(() => {
    return [...reports].sort((a, b) => {
      const left = a.tanggal ? Date.parse(a.tanggal) : 0;
      const right = b.tanggal ? Date.parse(b.tanggal) : 0;
      return right - left;
    });
  }, [reports]);

  const SkeletonCard = () => (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          width: '100%',
          maxWidth: '360px',
          mx: 'auto',
          height: { xs: 'auto', sm: '360px' },
          minHeight: { xs: '320px', sm: '360px' },
          borderRadius: { xs: '10px', md: '12px' },
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={84} />
        <CardContent sx={{ padding: { xs: '16px', sm: '18px', md: '20px' } }}>
          <Skeleton variant="rectangular" width="35%" height={22} sx={{ mb: 1.5, borderRadius: '12px' }} />
          <Skeleton variant="text" width="90%" height={28} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="95%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="85%" height={20} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={38} sx={{ borderRadius: '8px' }} />
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: '50vh', sm: '60vh', md: '70vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${smansabaImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              color: '#ffffff',
              padding: { xs: '0 20px', md: '0' },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                letterSpacing: { xs: '1px', md: '2px' },
                marginBottom: { xs: '12px', md: '16px' },
                lineHeight: 1.2,
              }}
            >
              LAPORAN KEUANGAN
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '0.9rem', sm: '1.15rem', md: '1.5rem' },
                textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                fontWeight: 400,
                lineHeight: 1.5,
                maxWidth: { xs: '100%', sm: '80%', md: '70%' },
                margin: '0 auto',
              }}
            >
              Transparansi laporan keuangan sekolah setiap tahun
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          padding: { xs: '30px 0 50px', sm: '40px 0 60px', md: '60px 0 80px' },
          backgroundColor: '#fafafa',
          minHeight: '50vh',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.85rem', md: '2.25rem' },
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: { xs: '24px', sm: '28px', md: '30px' },
              color: '#333',
              padding: { xs: '0 16px', sm: '0' },
            }}
          >
            Daftar Laporan Keuangan
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              marginBottom: { xs: '24px', sm: '28px', md: '32px' },
              padding: { xs: '0 16px', sm: '0' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TextField
              fullWidth
              placeholder="Cari laporan berdasarkan judul, tanggal, atau deskripsi..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                maxWidth: '600px',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#34495e',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#34495e',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch} size="small">
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Report Grid */}
          <Box sx={{ padding: { xs: '0 16px', sm: '0' } }}>
            {loading ? (
              <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} justifyContent="center">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <SkeletonCard key={item} />
                ))}
              </Grid>
            ) : sortedReports.length === 0 ? (
              <Typography sx={{ textAlign: 'center', py: 8, color: '#666' }}>
                Belum ada laporan keuangan tersedia
              </Typography>
            ) : (
              <Grid
                container
                spacing={{ xs: 2, sm: 2.5, md: 3 }}
                justifyContent="center"
              >
                {sortedReports.map((report) => {
                  const fileUrl = report.file ? getImageUrl(report.file) : '';
                  const driveLink = report.drive_link || report.link || '';

                  return (
                    <Grid item xs={12} sm={6} md={4} key={report.id}>
                      <Card
                        sx={{
                          width: '100%',
                          maxWidth: '360px',
                          mx: 'auto',
                          height: { xs: 'auto', sm: '360px' },
                          minHeight: { xs: '320px', sm: '360px' },
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: { xs: '10px', md: '12px' },
                          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: { xs: 'translateY(-4px)', md: 'translateY(-8px)' },
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: { xs: '14px 16px', md: '16px 20px' },
                            background: 'linear-gradient(135deg, #1f3c88 0%, #3c6fd1 100%)',
                            color: '#fff',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccountBalance sx={{ fontSize: { xs: 22, md: 26 } }} />
                            <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                              Laporan Tahunan
                            </Typography>
                          </Box>
                          <Chip
                            icon={<CalendarMonth sx={{ color: '#fff' }} />}
                            label={formatDate(report.tanggal)}
                            sx={{
                              backgroundColor: 'rgba(255,255,255,0.18)',
                              color: '#fff',
                              fontWeight: 600,
                              '& .MuiChip-icon': { color: '#fff' },
                            }}
                          />
                        </Box>

                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            flexGrow: 1,
                            padding: { xs: '16px', sm: '18px', md: '20px' },
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{
                              fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                              fontWeight: 700,
                              color: '#333',
                              lineHeight: 1.3,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {report.judul || 'Judul Laporan Keuangan'}
                          </Typography>

                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <Description sx={{ fontSize: 18, color: '#666', mt: '2px' }} />
                            <Typography
                              variant="body2"
                              sx={{
                                color: report.deskripsi ? '#666' : '#ccc',
                                lineHeight: 1.5,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' },
                              }}
                            >
                              {report.deskripsi || 'Deskripsi laporan akan ditampilkan di sini'}
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', gap: 1, mt: 'auto', flexDirection: 'column' }}>
                            <Button
                              variant="outlined"
                              startIcon={<LinkIcon />}
                              component={driveLink ? 'a' : 'button'}
                              href={driveLink || undefined}
                              target={driveLink ? '_blank' : undefined}
                              rel={driveLink ? 'noopener noreferrer' : undefined}
                              disabled={!driveLink}
                              sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '8px',
                              }}
                            >
                              {driveLink ? 'Lihat Drive' : 'Link Drive Belum Ada'}
                            </Button>
                            <Button
                              variant="contained"
                              startIcon={<PictureAsPdf />}
                              component={fileUrl ? 'a' : 'button'}
                              href={fileUrl || undefined}
                              target={fileUrl ? '_blank' : undefined}
                              rel={fileUrl ? 'noopener noreferrer' : undefined}
                              disabled={!fileUrl}
                              sx={{
                                backgroundColor: fileUrl ? '#34495e' : '#ccc',
                                color: '#ffffff',
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '8px',
                                '&:hover': {
                                  backgroundColor: fileUrl ? '#2c3e50' : '#ccc',
                                },
                              }}
                            >
                              {fileUrl ? 'Lihat PDF' : 'PDF Belum Tersedia'}
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default KeuanganPage;
