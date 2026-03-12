import { Box, Container, Typography, Paper, Chip, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowBack, Person, CalendarToday } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { getBeritaBySlug, getImageUrl } from '../services/api';

const DetailBeritaPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBerita();
  }, [slug]);

  const fetchBerita = async () => {
    try {
      const response = await getBeritaBySlug(slug);
      setBerita(response.data.data);
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

  if (loading) {
    return (
      <Box>
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}>
          <CircularProgress />
        </Box>
        <Footer />
      </Box>
    );
  }

  if (!berita) {
    return (
      <Box>
        <Navbar />
        <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Berita tidak ditemukan</Typography>
          <IconButton onClick={() => navigate('/berita')}>
            <ArrowBack /> Kembali
          </IconButton>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      
      {/* Header with Back Button */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          padding: { xs: '100px 16px 20px', md: '120px 0 30px' },
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <IconButton
            onClick={() => navigate('/berita')}
            sx={{
              position: 'absolute',
              top: { xs: '80px', md: '100px' },
              left: { xs: '16px', md: '24px' },
              color: '#333',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ArrowBack />
          </IconButton>

          {/* Kategori Badge */}
          <Chip
            label={berita.kategori || 'Berita'}
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              fontWeight: 600,
              marginBottom: '16px',
              fontSize: '0.85rem',
            }}
          />

          {/* Judul Berita */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              fontWeight: 700,
              marginBottom: '20px',
              color: '#333',
              lineHeight: 1.3,
            }}
          >
            {berita.judul}
          </Typography>

          {/* Meta Info */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              alignItems: 'center',
              paddingBottom: '20px',
              borderBottom: '2px solid #e0e0e0',
            }}
          >
            {/* Penulis */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person sx={{ fontSize: 20, color: '#666' }} />
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  color: '#666',
                  fontWeight: 500,
                }}
              >
                {berita.penulis}
              </Typography>
            </Box>

            {/* Tanggal */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday sx={{ fontSize: 20, color: '#666' }} />
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  color: '#666',
                  fontWeight: 500,
                }}
              >
                {formatDate(berita.tanggal)}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Box sx={{ backgroundColor: '#fafafa', padding: { xs: '40px 16px 60px', md: '60px 0 80px' } }}>
        <Container maxWidth="md">
          {/* Foto Berita */}
          {berita.foto ? (
            <Box
              component="img"
              src={getImageUrl(berita.foto)}
              alt={berita.judul}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '40px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '400px',
                backgroundColor: '#e0e0e0',
                borderRadius: '12px',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: '#999', fontSize: '1.1rem' }}>
                Foto Berita
              </Typography>
            </Box>
          )}

          {/* Konten Berita */}
          <Paper
            elevation={0}
            sx={{
              padding: { xs: '24px 20px', md: '40px 48px' },
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                color: '#333',
                whiteSpace: 'pre-line',
                textAlign: 'justify',
              }}
            >
              {berita.konten}
            </Typography>
          </Paper>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default DetailBeritaPage;
