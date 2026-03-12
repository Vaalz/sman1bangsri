import { Box, Container, Typography, Card, CardMedia, CardContent, Grid, CircularProgress, Chip, Skeleton, Pagination } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import smansabaImage from '../assets/image/smansaba.jpg';
import { Person, CalendarToday, FiberNew } from '@mui/icons-material';
import { getBeritaList, getImageUrl } from '../services/api';

const BeritaPage = () => {
  const navigate = useNavigate();
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const response = await getBeritaList();
      setBeritaList(response.data.data || []);
    } catch (error) {
      console.error('Error fetching berita:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // Parse tanggal dan handle berbagai format
    const date = new Date(dateString);
    
    // Cek apakah date valid
    if (isNaN(date.getTime())) return dateString;
    
    // Format tanggal ke Indonesia
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const isNewBerita = (dateString) => {
    const beritaDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - beritaDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Berita baru jika kurang dari 7 hari
  };

  // Pagination
  const totalPages = Math.ceil(beritaList.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentBerita = beritaList.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <Card sx={{ 
      minWidth: { xs: '280px', sm: '320px' },
      width: { xs: '100%', sm: '320px' },
      maxWidth: { xs: '320px', sm: 'none' },
      borderRadius: '16px', 
      overflow: 'hidden',
    }}>
      <Skeleton variant="rectangular" width="100%" height={180} />
      <CardContent sx={{ padding: '16px' }}>
        <Skeleton variant="text" height={28} width="90%" sx={{ mb: 1 }} />
        <Skeleton variant="text" height={28} width="85%" sx={{ mb: 1 }} />
        <Skeleton variant="text" height={28} width="80%" sx={{ mb: 2 }} />
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="35%" height={20} />
        </Box>
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
              BERITA SMANSABA
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Berita Content Section */}
      <Box
        sx={{
          padding: { xs: '40px 0 60px', md: '60px 0 80px' },
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
            Berita Terbaru
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
          ) : beritaList.length === 0 ? (
            <Typography sx={{ textAlign: 'center', py: 8, color: '#666' }}>
              Belum ada berita
            </Typography>
          ) : (
            <>
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
              {currentBerita.map((berita) => (
                <Card
                  key={berita.id}
                  onClick={() => navigate(`/detail-berita/${berita.slug}`)}
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
                    cursor: 'pointer',
                    border: '1px solid #e0e0e0',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                      borderColor: '#1976d2',
                      '& .card-image': {
                        transform: 'scale(1.08)',
                      },
                      '& .gradient-overlay': {
                        opacity: 0.7,
                      },
                    },
                  }}
                >
                  {/* Foto Berita dengan Hover Zoom */}
                  <Box sx={{ 
                    position: 'relative', 
                    overflow: 'hidden', 
                    height: { xs: 180, sm: 190, md: 200 },
                    flexShrink: 0,
                  }}>
                    <CardMedia
                      component="img"
                      image={berita.foto ? getImageUrl(berita.foto) : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225"%3E%3Crect width="400" height="225" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="%23999"%3EFoto Berita%3C/text%3E%3C/svg%3E'}
                      alt={berita.judul}
                      className="card-image"
                      sx={{
                        width: '100%',
                        height: { xs: 180, sm: 190, md: 200 },
                        objectFit: 'cover',
                        objectPosition: 'center',
                        backgroundColor: '#e0e0e0',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <Box
                      className="gradient-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
                        opacity: 0.5,
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                    
                    {/* Badge Kategori */}
                    <Chip
                      label={berita.kategori || 'Umum'}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: { xs: 10, md: 12 },
                        left: { xs: 10, md: 12 },
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        color: '#1976d2',
                        fontWeight: 600,
                        fontSize: { xs: '0.7rem', md: '0.75rem' },
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        zIndex: 1,
                      }}
                    />
                    
                    {/* Badge Berita Baru */}
                    {isNewBerita(berita.tanggal) && (
                      <Chip
                        icon={<FiberNew sx={{ fontSize: { xs: 16, md: 18 } }} />}
                        label="Baru"
                        size="small"
                        color="error"
                        sx={{
                          position: 'absolute',
                          top: { xs: 10, md: 12 },
                          right: { xs: 10, md: 12 },
                          fontWeight: 600,
                          fontSize: { xs: '0.7rem', md: '0.75rem' },
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          zIndex: 1,
                        }}
                      />
                    )}
                  </Box>

                  {/* Content */}
                  <CardContent
                    sx={{
                      padding: { xs: '16px', md: '20px' },
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      {/* Judul */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: '1rem', md: '1.05rem' },
                          fontWeight: 700,
                          color: '#333',
                          marginBottom: { xs: '10px', md: '12px' },
                          lineHeight: 1.4,
                          minHeight: { xs: '56px', md: '63px' },
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: '#1976d2',
                          },
                        }}
                      >
                        {berita.judul}
                      </Typography>
                    </Box>

                    {/* Meta Info */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: { xs: '10px', md: '12px' },
                        marginTop: 'auto',
                        borderTop: '1px solid #e0e0e0',
                      }}
                    >
                      {/* Penulis */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          maxWidth: '50%',
                        }}
                      >
                        <Person sx={{ fontSize: { xs: 16, md: 18 }, color: '#999', flexShrink: 0 }} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: '0.8rem', md: '0.85rem' },
                            color: '#666',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {berita.penulis}
                        </Typography>
                      </Box>

                      {/* Tanggal */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          flexShrink: 0,
                        }}
                      >
                        <CalendarToday sx={{ fontSize: { xs: 14, md: 16 }, color: '#999' }} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: '0.8rem', md: '0.85rem' },
                            color: '#666',
                          }}
                        >
                          {formatDate(berita.tanggal)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
            ))}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: { xs: '40px', md: '50px' },
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontSize: '1rem',
                    fontWeight: 600,
                  },
                }}
              />
            </Box>
          )}
          </>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default BeritaPage;
