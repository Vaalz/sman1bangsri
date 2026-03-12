import { Box, Container, Typography, Card, CardContent, Grid, CircularProgress, Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import smansabaImage from '../assets/image/smansaba.jpg';
import { EmojiEvents } from '@mui/icons-material';
import { getPrestasiList } from '../services/api';

const PrestasiPage = () => {
  const [prestasiList, setPrestasiList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrestasi();
  }, []);

  const fetchPrestasi = async () => {
    try {
      const response = await getPrestasiList();
      setPrestasiList(response.data.data || []);
    } catch (error) {
      console.error('Error fetching prestasi:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to get color based on tingkat
  const getTingkatColor = (tingkat) => {
    switch (tingkat.toLowerCase()) {
      case 'nasional':
        return '#d32f2f'; // Red
      case 'provinsi':
        return '#1976d2'; // Blue
      case 'kabupaten':
        return '#2e7d32'; // Green
      default:
        return '#757575'; // Gray
    }
  };

  // Function to get medal color based on juara
  const getJuaraColor = (juara) => {
    if (!juara) return null;
    const juaraLower = juara.toLowerCase();
    if (juaraLower.includes('juara 1') || juaraLower === '1') {
      return '#FFD700'; // Gold
    } else if (juaraLower.includes('juara 2') || juaraLower === '2') {
      return '#C0C0C0'; // Silver
    } else if (juaraLower.includes('juara 3') || juaraLower === '3') {
      return '#CD7F32'; // Bronze
    }
    return '#757575'; // Gray for other rankings
  };

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <Card
      sx={{
        minWidth: { xs: '280px', sm: '320px' },
        minHeight: '420px',
        width: { xs: '100%', sm: '320px' },
        maxWidth: { xs: '320px', sm: 'none' },
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Skeleton variant="circular" width={70} height={70} sx={{ mb: 3 }} />
        <Skeleton variant="text" width="60%" height={36} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="90%" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="50%" height={24} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2, borderRadius: '8px' }} />
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Navbar />
      
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: '60vh', md: '70vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${smansabaImage})`,
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
              padding: { xs: '0 16px', md: '0' },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                fontWeight: 700,
                textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                letterSpacing: '2px',
              }}
            >
              PRESTASI SMANSABA
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Prestasi Content Section */}
      <Box
        sx={{
          padding: { xs: '40px 16px 60px', md: '60px 0 80px' },
          backgroundColor: '#fafafa',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: { xs: '40px', md: '50px' },
              color: '#333',
            }}
          >
            Daftar Prestasi
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
                gap: { xs: 2, md: 3 },
                flexWrap: 'wrap',
                padding: { xs: '0 16px', md: '0' },
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <SkeletonCard key={item} />
              ))}
            </Box>
          ) : prestasiList.length === 0 ? (
            <Typography sx={{ textAlign: 'center', py: 8, color: '#666' }}>
              Belum ada data prestasi
            </Typography>
          ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: { xs: 2, md: 3 },
              flexWrap: 'wrap',
              padding: { xs: '0 16px', md: '0' },
            }}
          >
            {prestasiList.map((prestasi) => (
                <Card
                  key={prestasi.id}
                  sx={{
                    minWidth: { xs: '280px', sm: '320px' },
                    minHeight: '420px',
                    width: { xs: '100%', sm: '320px' },
                    maxWidth: { xs: '320px', sm: 'none' },
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    border: '1px solid #e0e0e0',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                      borderColor: '#1976d2',
                      '& .trophy-icon': {
                        transform: 'scale(1.15) rotate(10deg)',
                      },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      padding: '32px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      flexGrow: 1,
                    }}
                  >
                    {/* Icon Piala */}
                    <Box
                      sx={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        backgroundColor: getJuaraColor(prestasi.juara) || getTingkatColor(prestasi.tingkat),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px',
                        boxShadow: `0 4px 16px ${(getJuaraColor(prestasi.juara) || getTingkatColor(prestasi.tingkat))}40`,
                      }}
                    >
                      <EmojiEvents 
                        className="trophy-icon"
                        sx={{ 
                          fontSize: '2.5rem',
                          color: '#fff',
                          transition: 'transform 0.3s ease',
                        }} 
                      />
                    </Box>

                    {/* Badge Juara (if exists) */}
                    {prestasi.juara && (
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          textAlign: 'center',
                          marginBottom: '16px',
                          color: '#333',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {prestasi.juara}
                      </Typography>
                    )}

                    {/* Badge Tingkat - removed, shown in Category section below */}

                    {/* Judul Prestasi */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#333',
                        marginBottom: '8px',
                        lineHeight: 1.5,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        minHeight: '66px',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {prestasi.judul}
                    </Typography>

                    {/* Nama Siswa */}
                    {prestasi.nama_siswa && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.95rem',
                          color: '#1976d2',
                          marginBottom: '12px',
                          fontWeight: 500,
                          textAlign: 'center',
                        }}
                      >
                        {prestasi.nama_siswa}
                      </Typography>
                    )}

                    {/* Kategori */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '1rem',
                        color: '#666',
                        marginBottom: '12px',
                        fontWeight: 500,
                        textAlign: 'center',
                        minHeight: '28px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {prestasi.kategori} • {prestasi.tingkat}
                    </Typography>

                    {/* Divider */}
                    <Box
                      sx={{
                        width: '100%',
                        height: '1px',
                        backgroundColor: '#e0e0e0',
                        marginY: '16px',
                      }}
                    />

                    {/* Tahun */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#333',
                        textAlign: 'center',
                      }}
                    >
                      Tahun {prestasi.tahun}
                    </Typography>
                  </CardContent>
                </Card>
            ))}
          </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default PrestasiPage;
