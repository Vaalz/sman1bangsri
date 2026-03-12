import { Box, Container, Typography, Paper, CircularProgress, Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import smansabaImage from '../assets/image/smansaba.jpg';
import { getTentang } from '../services/api';

const TentangPage = () => {
  const [tentang, setTentang] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTentang();
  }, []);

  const fetchTentang = async () => {
    try {
      const response = await getTentang();
      setTentang(response.data.data || {});
    } catch (error) {
      console.error('Error fetching tentang:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to split text by newlines
  const renderWithLineBreaks = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <Typography
        key={index}
        variant="body1"
        sx={{
          fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
          lineHeight: 1.8,
          color: '#555',
          textAlign: 'justify',
          marginBottom: line.trim() ? '12px' : '0',
        }}
      >
        {line || '\u00A0'}
      </Typography>
    ));
  };

  // Skeleton Loading Component
  const SkeletonSection = ({ borderColor }) => (
    <Paper
      elevation={0}
      sx={{
        padding: { xs: '24px 20px', md: '40px 48px' },
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        margin: '0 auto',
        borderLeft: `4px solid ${borderColor}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      <Skeleton variant="text" width="30%" height={40} sx={{ mb: 3 }} />
      <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1.5 }} />
      <Skeleton variant="text" width="95%" height={24} sx={{ mb: 1.5 }} />
      <Skeleton variant="text" width="98%" height={24} sx={{ mb: 1.5 }} />
      <Skeleton variant="text" width="90%" height={24} sx={{ mb: 1.5 }} />
      <Skeleton variant="text" width="85%" height={24} />
    </Paper>
  );

  return (
    <Box>
      <Navbar />
      
      {/* Hero Image Section */}
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
              TENTANG SMANSABA
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Tentang Kami Section */}
      <Box
        sx={{
          padding: { xs: '40px 16px', md: '60px 0' },
          backgroundColor: '#fafafa',
        }}
      >
        <Container maxWidth="md">
          {loading ? (
            <SkeletonSection borderColor="#1976d2" />
          ) : (
            <Paper
              elevation={0}
              sx={{
                padding: { xs: '24px 20px', md: '40px 48px' },
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                margin: '0 auto',
                borderLeft: '4px solid #1976d2',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'border-left-width 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  borderLeft: '6px solid #1976d2',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  fontWeight: 700,
                  marginBottom: '24px',
                  color: '#1976d2',
                  letterSpacing: '-0.5px',
                }}
              >
                Tentang Kami
              </Typography>
              {tentang?.tentang_kami ? (
                renderWithLineBreaks(tentang.tentang_kami)
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                    lineHeight: 1.8,
                    color: '#999',
                    fontStyle: 'italic',
                  }}
                >
                  Konten akan dikelola melalui sistem admin
                </Typography>
              )}
            </Paper>
          )}
        </Container>
      </Box>

      {/* Visi Section */}
      <Box
        sx={{
          padding: { xs: '40px 16px', md: '60px 0' },
          backgroundColor: '#ffffff',
        }}
      >
        <Container maxWidth="md">
          {loading ? (
            <SkeletonSection borderColor="#2e7d32" />
          ) : (
            <Paper
              elevation={0}
              sx={{
                padding: { xs: '24px 20px', md: '40px 48px' },
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                margin: '0 auto',
                borderLeft: '4px solid #2e7d32',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'border-left-width 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  borderLeft: '6px solid #2e7d32',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' },
                  fontWeight: 700,
                  marginBottom: '24px',
                  color: '#2e7d32',
                  letterSpacing: '-0.5px',
                }}
              >
                Visi
              </Typography>
              {tentang?.visi ? (
                renderWithLineBreaks(tentang.visi)
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                    lineHeight: 1.8,
                    color: '#999',
                    fontStyle: 'italic',
                  }}
                >
                  Konten akan dikelola melalui sistem admin
                </Typography>
              )}
            </Paper>
          )}
        </Container>
      </Box>

      {/* Misi Section */}
      <Box
        sx={{
          padding: { xs: '40px 16px', md: '60px 0' },
          backgroundColor: '#fafafa',
        }}
      >
        <Container maxWidth="md">
          {loading ? (
            <SkeletonSection borderColor="#ed6c02" />
          ) : (
            <Paper
              elevation={0}
              sx={{
                padding: { xs: '24px 20px', md: '40px 48px' },
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                margin: '0 auto',
                borderLeft: '4px solid #ed6c02',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'border-left-width 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  borderLeft: '6px solid #ed6c02',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' },
                  fontWeight: 700,
                  marginBottom: '24px',
                  color: '#ed6c02',
                  letterSpacing: '-0.5px',
                }}
              >
                Misi
              </Typography>
              {tentang?.misi ? (
                renderWithLineBreaks(tentang.misi)
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                    lineHeight: 1.8,
                    color: '#999',
                    fontStyle: 'italic',
                  }}
                >
                  Konten akan dikelola melalui sistem admin
                </Typography>
              )}
            </Paper>
          )}
        </Container>
      </Box>

      {/* Sejarah Section */}
      <Box
        sx={{
          padding: { xs: '40px 16px 60px', md: '60px 0 80px' },
          backgroundColor: '#ffffff',
        }}
      >
        <Container maxWidth="md">
          {loading ? (
            <SkeletonSection borderColor="#9c27b0" />
          ) : (
            <Paper
              elevation={0}
              sx={{
                padding: { xs: '24px 20px', md: '40px 48px' },
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                margin: '0 auto',
                borderLeft: '4px solid #9c27b0',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'border-left-width 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  borderLeft: '6px solid #9c27b0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' },
                  fontWeight: 700,
                  marginBottom: '24px',
                  color: '#9c27b0',
                  letterSpacing: '-0.5px',
                }}
              >
                Sejarah
              </Typography>
              {tentang?.sejarah ? (
                renderWithLineBreaks(tentang.sejarah)
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                    lineHeight: 1.8,
                    color: '#999',
                    fontStyle: 'italic',
                  }}
                >
                  Konten akan dikelola melalui sistem admin
                </Typography>
              )}
            </Paper>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default TentangPage;
