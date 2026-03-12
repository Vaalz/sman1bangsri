import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Alert,
  Modal,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { getGaleriList, getImageUrl } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import smansabaImage from '../assets/image/smansaba.jpg';

const GaleriPage = () => {
  const [galeriList, setGaleriList] = useState([]);
  const [categories, setCategories] = useState(['ALL']);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleImageClick = (item) => {
    setSelectedImage(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const uniqueCategories = [...new Set(galeriList.map(item => item.kategori).filter(Boolean))];
    setCategories(['ALL', ...uniqueCategories]);
  }, [galeriList]);

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      setLoading(true);
      console.log('Fetching galeri...');
      const response = await getGaleriList({ per_page: 100 });
      
      console.log('API Response:', response);
      
      const data = response?.data?.data || response?.data || [];
      
      setGaleriList(data);
    } catch (error) {
      console.error('Error fetching galeri:', error);
      setGaleriList([]);
      setError('Gagal memuat galeri. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  const filteredGaleri = selectedCategory === 'ALL' 
    ? galeriList 
    : galeriList.filter(item => item.kategori === selectedCategory);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
              color: 'white',
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
              Galeri Foto
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Category Filter */}
      {!loading && !error && categories.length > 1 && (
        <Box
          sx={{
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e0e0e0',
            py: 3,
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'center',
              }}
            >
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  color={selectedCategory === category ? 'primary' : 'default'}
                  sx={{
                    fontWeight: selectedCategory === category ? 600 : 400,
                    fontSize: '0.9rem',
                    px: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 2,
                    },
                  }}
                />
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 6, flex: 1 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={60} />
              <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                Memuat galeri...
              </Typography>
            </Box>
          </Box>
        ) : filteredGaleri.length > 0 ? (
          <Grid 
            container 
            spacing={{ xs: 2, sm: 2.5, md: 3 }}
            justifyContent="center"
          >
            {filteredGaleri.map((item) => {
              const imageUrl = item.foto 
                ? getImageUrl(item.foto)
                : 'https://via.placeholder.com/600x400?text=No+Image';

              return (
                <Grid item xs={12} sm={6} md={4} key={item.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Card
                    sx={{
                      width: '320px',
                      height: { xs: 'auto', sm: '420px' },
                      minHeight: { xs: '380px', sm: '420px' },
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: { xs: '10px', md: '12px' },
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                      border: '1px solid #e0e0e0',
                      '&:hover': {
                        transform: { xs: 'translateY(-4px)', md: 'translateY(-8px)' },
                        boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                        borderColor: '#1976d2',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        height: { xs: 160, sm: 170, md: 180 },
                        minHeight: { xs: 160, sm: 170, md: 180 },
                        maxHeight: { xs: 160, sm: 170, md: 180 },
                        flexShrink: 0,
                      }}
                      onClick={() => handleImageClick(item)}
                    >
                      <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={item.judul || 'Galeri Image'}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                        }}
                        sx={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transition: 'transform 0.3s ease',
                          width: '100%',
                          height: '100%',
                          display: 'block',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    </Box>
                    <Box 
                      sx={{ 
                        height: { xs: 'auto', sm: '240px' },
                        minHeight: { xs: '220px', sm: '240px' },
                        padding: { xs: '16px', sm: '18px', md: '20px' },
                        display: 'flex', 
                        flexDirection: 'column',
                        overflow: 'hidden',
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          color: '#333',
                          marginBottom: { xs: '12px', md: '16px' },
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                          lineHeight: 1.3,
                        }}
                      >
                        {item.judul}
                      </Typography>

                      {item.caption && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            marginBottom: { xs: '12px', md: '16px' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                            lineHeight: 1.5,
                            flexGrow: 1,
                          }}
                        >
                          {item.caption}
                        </Typography>
                      )}

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 'auto',
                          flexWrap: 'wrap',
                          gap: 1,
                        }}
                      >
                        {item.kategori && (
                          <Chip
                            label={item.kategori}
                            size="small"
                            sx={{
                              backgroundColor: '#e3f2fd',
                              color: '#1976d2',
                              fontWeight: 600,
                              fontSize: { xs: '0.7rem', md: '0.75rem' },
                              height: { xs: '22px', md: '24px' },
                            }}
                          />
                        )}
                        {item.tanggal && (
                          <Typography 
                            variant="caption" 
                            color="text.secondary" 
                            sx={{ 
                              fontSize: { xs: '0.7rem', md: '0.75rem' },
                              fontWeight: 500,
                            }}
                          >
                            {new Date(item.tanggal).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Belum ada foto dalam galeri
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedCategory !== 'ALL' 
                ? `Tidak ada foto untuk kategori "${selectedCategory}"`
                : 'Galeri akan segera diperbarui'}
            </Typography>
          </Box>
        )}
      </Container>

      <Footer />

      {/* Modal untuk menampilkan gambar full screen */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
              zIndex: 1,
            }}
          >
            <Close />
          </IconButton>
          {selectedImage && (
            <img
              src={getImageUrl(selectedImage.foto)}
              alt={selectedImage.judul}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default GaleriPage;
