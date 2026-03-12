import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import smansabaImage from '../assets/image/smansaba.jpg';
import { LocationOn, Phone, Email, AccessTime } from '@mui/icons-material';
import { getContact } from '../services/api';

const KontakPage = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await getContact();
        setContact(response.data.data);
      } catch (error) {
        console.error('Error fetching contact:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);
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
              KONTAK KAMI
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          padding: { xs: '40px 16px 60px', md: '60px 0 80px' },
          backgroundColor: '#fafafa',
        }}
      >
        <Container maxWidth="lg">
          {/* Section Title */}
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
            Hubungi Kami
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : contact ? (
            <>
              {/* Informasi Kontak Card */}
              <Paper
                elevation={0}
                sx={{
                  maxWidth: '800px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: { xs: '40px', md: '60px' },
                  padding: { xs: '28px 20px', sm: '36px 28px', md: '48px 40px' },
                  borderRadius: { xs: '12px', md: '16px' },
                  backgroundColor: '#ffffff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
                  {/* Alamat */}
                  <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: { xs: '48px', md: '56px' },
                        height: { xs: '48px', md: '56px' },
                        borderRadius: '50%',
                        backgroundColor: '#e3f2fd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <LocationOn sx={{ fontSize: { xs: 24, md: 28 }, color: '#1976d2' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          fontWeight: 700,
                          color: '#333',
                          marginBottom: '8px',
                        }}
                      >
                        Alamat
                      </Typography>
                      <Typography sx={{ fontSize: { xs: '0.9rem', md: '0.95rem' }, color: '#666', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                        {contact.alamat}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Telepon */}
                  <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: { xs: '48px', md: '56px' },
                        height: { xs: '48px', md: '56px' },
                        borderRadius: '50%',
                        backgroundColor: '#e3f2fd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Phone sx={{ fontSize: { xs: 24, md: 28 }, color: '#1976d2' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          fontWeight: 700,
                          color: '#333',
                          marginBottom: '8px',
                        }}
                      >
                        Telepon
                      </Typography>
                      <Typography sx={{ fontSize: { xs: '0.9rem', md: '0.95rem' }, color: '#666', lineHeight: 1.7 }}>
                        {contact.telepon}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Email */}
                  <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: { xs: '48px', md: '56px' },
                        height: { xs: '48px', md: '56px' },
                        borderRadius: '50%',
                        backgroundColor: '#e3f2fd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Email sx={{ fontSize: { xs: 24, md: 28 }, color: '#1976d2' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          fontWeight: 700,
                          color: '#333',
                          marginBottom: '8px',
                        }}
                      >
                        Email
                      </Typography>
                      <Typography sx={{ fontSize: { xs: '0.9rem', md: '0.95rem' }, color: '#666', lineHeight: 1.7 }}>
                        {contact.email}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Jam Operasional */}
                  <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: { xs: '48px', md: '56px' },
                        height: { xs: '48px', md: '56px' },
                        borderRadius: '50%',
                        backgroundColor: '#e3f2fd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <AccessTime sx={{ fontSize: { xs: 24, md: 28 }, color: '#1976d2' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          fontWeight: 700,
                          color: '#333',
                          marginBottom: '8px',
                        }}
                      >
                        Jam Operasional
                      </Typography>
                      <Typography sx={{ fontSize: { xs: '0.9rem', md: '0.95rem' }, color: '#666', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                        {contact.jam_operasional}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </>
          ) : (
            <Typography align="center" color="text.secondary">
              Data kontak tidak tersedia
            </Typography>
          )}

          {/* Google Maps Embed */}
          {contact && contact.maps_embed_url && (
            <Box 
              sx={{ 
                maxWidth: '1000px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: { xs: '50px', md: '70px' },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  fontWeight: 700,
                  marginBottom: { xs: '30px', md: '40px' },
                  color: '#333',
                  textAlign: 'center',
                }}
              >
                Lokasi Kami
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  borderRadius: { xs: '12px', md: '16px' },
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  height: { xs: '300px', sm: '350px', md: '500px' },
                }}
              >
                <iframe
                  src={contact.maps_embed_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                />
              </Paper>
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default KontakPage;
