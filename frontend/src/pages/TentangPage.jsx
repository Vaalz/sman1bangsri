import { Box, Container, Typography, Paper, CircularProgress, Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import { AutoStories, School, Visibility, Flag, HistoryEdu } from '@mui/icons-material';
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
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-left-width 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  borderLeft: '6px solid #1976d2',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <School
                sx={{
                  position: 'absolute',
                  top: { xs: 10, md: 12 },
                  right: { xs: 10, md: 14 },
                  fontSize: { xs: 52, md: 68 },
                  color: 'rgba(25, 118, 210, 0.09)',
                  pointerEvents: 'none',
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, marginBottom: '24px' }}>
                <Box
                  sx={{
                    width: { xs: 34, md: 38 },
                    height: { xs: 34, md: 38 },
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                    boxShadow: '0 6px 14px rgba(25, 118, 210, 0.22)',
                    flexShrink: 0,
                  }}
                >
                  <AutoStories sx={{ fontSize: 20, color: '#fff' }} />
                </Box>

                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                    fontWeight: 700,
                    color: '#1976d2',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Tentang Kami
                </Typography>
              </Box>
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
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-left-width 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  borderLeft: '6px solid #2e7d32',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Visibility
                sx={{
                  position: 'absolute',
                  top: { xs: 10, md: 12 },
                  right: { xs: 10, md: 14 },
                  fontSize: { xs: 48, md: 64 },
                  color: 'rgba(46, 125, 50, 0.1)',
                  pointerEvents: 'none',
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, marginBottom: '24px' }}>
                <Box
                  sx={{
                    width: { xs: 34, md: 38 },
                    height: { xs: 34, md: 38 },
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #2e7d32, #66bb6a)',
                    boxShadow: '0 6px 14px rgba(46, 125, 50, 0.22)',
                    flexShrink: 0,
                  }}
                >
                  <Visibility sx={{ fontSize: 20, color: '#fff' }} />
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' },
                    fontWeight: 700,
                    color: '#2e7d32',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Visi
                </Typography>
              </Box>
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
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-left-width 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  borderLeft: '6px solid #ed6c02',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Flag
                sx={{
                  position: 'absolute',
                  top: { xs: 10, md: 12 },
                  right: { xs: 10, md: 14 },
                  fontSize: { xs: 48, md: 64 },
                  color: 'rgba(237, 108, 2, 0.1)',
                  pointerEvents: 'none',
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, marginBottom: '24px' }}>
                <Box
                  sx={{
                    width: { xs: 34, md: 38 },
                    height: { xs: 34, md: 38 },
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #ed6c02, #ffb74d)',
                    boxShadow: '0 6px 14px rgba(237, 108, 2, 0.22)',
                    flexShrink: 0,
                  }}
                >
                  <Flag sx={{ fontSize: 20, color: '#fff' }} />
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' },
                    fontWeight: 700,
                    color: '#ed6c02',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Misi
                </Typography>
              </Box>
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
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-left-width 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  borderLeft: '6px solid #9c27b0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <HistoryEdu
                sx={{
                  position: 'absolute',
                  top: { xs: 10, md: 12 },
                  right: { xs: 10, md: 14 },
                  fontSize: { xs: 48, md: 64 },
                  color: 'rgba(156, 39, 176, 0.1)',
                  pointerEvents: 'none',
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, marginBottom: '24px' }}>
                <Box
                  sx={{
                    width: { xs: 34, md: 38 },
                    height: { xs: 34, md: 38 },
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #9c27b0, #ce93d8)',
                    boxShadow: '0 6px 14px rgba(156, 39, 176, 0.22)',
                    flexShrink: 0,
                  }}
                >
                  <HistoryEdu sx={{ fontSize: 20, color: '#fff' }} />
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' },
                    fontWeight: 700,
                    color: '#9c27b0',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Sejarah
                </Typography>
              </Box>
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
