import { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, Dialog, IconButton } from '@mui/material';
import { Close, ZoomIn } from '@mui/icons-material';

const FacilitiesGallerySection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Data fasilitas - bisa diganti dengan data dari API
  const facilities = [
    {
      id: 1,
      title: 'Laboratorium Komputer',
      image: 'https://via.placeholder.com/600x400/667eea/ffffff?text=Lab+Komputer',
      description: 'Laboratorium komputer modern dengan perangkat terkini',
    },
    {
      id: 2,
      title: 'Perpustakaan',
      image: 'https://via.placeholder.com/600x400/4facfe/ffffff?text=Perpustakaan',
      description: 'Perpustakaan lengkap dengan koleksi buku ribuan judul',
    },
    {
      id: 3,
      title: 'Laboratorium IPA',
      image: 'https://via.placeholder.com/600x400/43e97b/ffffff?text=Lab+IPA',
      description: 'Laboratorium IPA dengan peralatan praktikum lengkap',
    },
    {
      id: 4,
      title: 'Lapangan Olahraga',
      image: 'https://via.placeholder.com/600x400/fa709a/ffffff?text=Lapangan+Olahraga',
      description: 'Lapangan olahraga untuk berbagai aktivitas',
    },
    {
      id: 5,
      title: 'Ruang Kelas',
      image: 'https://via.placeholder.com/600x400/30cfd0/ffffff?text=Ruang+Kelas',
      description: 'Ruang kelas nyaman dengan fasilitas AC',
    },
    {
      id: 6,
      title: 'Aula Serbaguna',
      image: 'https://via.placeholder.com/600x400/a8edea/ffffff?text=Aula',
      description: 'Aula untuk berbagai kegiatan dan acara',
    },
  ];

  const handleOpenDialog = (facility) => {
    setSelectedImage(facility);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedImage(null);
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="overline"
            sx={{
              color: '#667eea',
              fontWeight: 700,
              fontSize: '0.875rem',
              letterSpacing: '2px',
              mb: 2,
              display: 'block',
            }}
          >
            FASILITAS SEKOLAH
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              color: '#1a1a1a',
              mb: 2,
              letterSpacing: '-0.5px',
            }}
          >
            Fasilitas Terbaik untuk Pembelajaran
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              fontSize: { xs: '1rem', md: '1.125rem' },
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            Berbagai fasilitas modern dan lengkap untuk mendukung kegiatan belajar mengajar
          </Typography>
        </Box>

        {/* Gallery Grid */}
        <Grid container spacing={3}>
          {facilities.map((facility, index) => (
            <Grid item xs={12} sm={6} md={4} key={facility.id}>
              <Card
                sx={{
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    '& .overlay': {
                      opacity: 1,
                    },
                    '& .zoom-icon': {
                      transform: 'scale(1)',
                      opacity: 1,
                    },
                  },
                }}
                onClick={() => handleOpenDialog(facility)}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={facility.image}
                  alt={facility.title}
                  sx={{
                    transition: 'transform 0.4s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                
                {/* Overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 3,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    {facility.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '0.875rem',
                    }}
                  >
                    {facility.description}
                  </Typography>
                </Box>

                {/* Zoom Icon */}
                <Box
                  className="zoom-icon"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 0,
                    transition: 'all 0.3s ease',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <ZoomIn sx={{ fontSize: 32, color: '#667eea' }} />
                </Box>

                {/* Card Title (Always visible) */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 2,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%)',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 600,
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {facility.title}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Image Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
          },
        }}
      >
        <IconButton
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#ffffff',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.7)',
            },
          }}
        >
          <Close />
        </IconButton>
        
        {selectedImage && (
          <Box>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {selectedImage.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {selectedImage.description}
              </Typography>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};

export default FacilitiesGallerySection;
