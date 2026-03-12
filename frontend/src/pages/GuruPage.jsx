import { Box, Container, Typography, Card, CardContent, Avatar, CircularProgress, Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import smansabaImage from '../assets/image/smansaba.jpg';
import { Person } from '@mui/icons-material';
import { getGuruList, getImageUrl } from '../services/api';

const GuruPage = () => {
  const [guruList, setGuruList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuru();
  }, []);

  const fetchGuru = async () => {
    try {
      const response = await getGuruList();
      setGuruList(response.data.data || []);
    } catch (error) {
      console.error('Error fetching guru:', error);
    } finally {
      setLoading(false);
    }
  };

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <Card
      sx={{
        minWidth: { xs: '180px', sm: '230px' },
        minHeight: { xs: '300px', sm: '320px' },
        width: { xs: '100%', sm: '230px' },
        maxWidth: { xs: '230px', sm: 'none' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: '20px 12px', md: '24px 16px' },
        borderRadius: '12px',
      }}
    >
      <Skeleton variant="circular" width={{ xs: 80, md: 100 }} height={{ xs: 80, md: 100 }} sx={{ mb: 2 }} />
      <CardContent sx={{ padding: 0, textAlign: 'center', width: '100%' }}>
        <Skeleton variant="text" width="80%" height={28} sx={{ mx: 'auto', mb: 0.75 }} />
        <Skeleton variant="text" width="60%" height={20} sx={{ mx: 'auto', mb: 0.5 }} />
        <Skeleton variant="text" width="50%" height={18} sx={{ mx: 'auto' }} />
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Navbar />
      
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: '50vh', md: '60vh' },
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
              GURU & TENAGA KEPENDIDIKAN
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Guru Cards Section */}
      <Box
        sx={{
          padding: { xs: '60px 16px', md: '80px 32px' },
          backgroundColor: '#ffffff',
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: { xs: '40px', md: '50px' },
              color: '#333',
            }}
          >
            Daftar Guru
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
                gap: { xs: 2, md: 2 },
                flexWrap: 'wrap',
                padding: { xs: '0 16px', md: '0' },
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <SkeletonCard key={item} />
              ))}
            </Box>
          ) : guruList.length === 0 ? (
            <Typography sx={{ textAlign: 'center', py: 8, color: '#666' }}>
              Belum ada data guru
            </Typography>
          ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: { xs: 2, md: 2 },
              flexWrap: 'wrap',
              padding: { xs: '0 16px', md: '0' },
            }}
          >
            {guruList.map((guru) => (
                <Card
                  key={guru.id}
                  sx={{
                    minWidth: { xs: '180px', sm: '230px' },
                    minHeight: { xs: '300px', sm: '320px' },
                    width: { xs: '100%', sm: '230px' },
                    maxWidth: { xs: '230px', sm: 'none' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: '20px 12px', md: '24px 16px' },
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e0e0e0',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                      borderColor: '#1976d2',
                    },
                  }}
                >
                  {/* Foto Guru */}
                  <Avatar
                    src={getImageUrl(guru.foto)}
                    sx={{
                      width: { xs: 80, md: 100 },
                      height: { xs: 80, md: 100 },
                      marginBottom: '16px',
                      backgroundColor: '#e0e0e0',
                      border: '3px solid #f5f5f5',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Person sx={{ fontSize: { xs: 40, md: 50 }, color: '#999' }} />
                  </Avatar>

                  <CardContent
                    sx={{
                      padding: 0,
                      textAlign: 'center',
                      width: '100%',
                      '&:last-child': {
                        paddingBottom: 0,
                      },
                    }}
                  >
                    {/* Nama Guru */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        fontWeight: 700,
                        color: '#333',
                        marginBottom: '4px',
                        lineHeight: 1.3,
                        minHeight: '42px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {guru.nama}
                    </Typography>

                    {/* NIP */}
                    {guru.nip && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.75rem', md: '0.78rem' },
                          color: '#1976d2',
                          fontWeight: 500,
                          marginBottom: '8px',
                          letterSpacing: '0.3px',
                        }}
                      >
                        NIP: {guru.nip}
                      </Typography>
                    )}

                    {/* Jabatan */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: '0.8rem', md: '0.85rem' },
                        color: '#666',
                        fontWeight: 600,
                        marginBottom: '4px',
                        minHeight: '20px',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {guru.jabatan}
                    </Typography>

                    {/* Mapel */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: '0.75rem', md: '0.8rem' },
                        color: '#888',
                        fontStyle: 'italic',
                        minHeight: '18px',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {guru.mapel || '-'}
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

export default GuruPage;
