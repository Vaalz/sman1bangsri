import { Box, Container, Typography, Card, CardContent, CircularProgress, Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import smansabaImage from '../assets/image/smansaba.jpg';
import { Sports, MusicNote, Palette, Science, MenuBook, Group, EmojiEvents, Language } from '@mui/icons-material';
import { getEkstrakurikulerList, getImageUrl } from '../services/api';

const EkstrakurikulerPage = () => {
  const navigate = useNavigate();
  const [ekstrakurikulerList, setEkstrakurikulerList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEkstrakurikuler();
  }, []);

  const fetchEkstrakurikuler = async () => {
    try {
      const response = await getEkstrakurikulerList();
      console.log('API Response:', response);
      console.log('Ekstrakurikuler Data:', response.data.data);
      setEkstrakurikulerList(response.data.data || []);
    } catch (error) {
      console.error('Error fetching ekstrakurikuler:', error);
      console.error('Error details:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to get icon component based on icon name
  const getIcon = (iconName) => {
    const icons = {
      Sports: Sports,
      MusicNote: MusicNote,
      Palette: Palette,
      Science: Science,
      MenuBook: MenuBook,
      Group: Group,
      EmojiEvents: EmojiEvents,
      Language: Language,
    };
    return icons[iconName] || Sports;
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
        <Skeleton variant="rectangular" width="60%" height={24} sx={{ mx: 'auto', mb: 1.25, borderRadius: '20px' }} />
        <Skeleton variant="text" width="90%" height={28} sx={{ mx: 'auto', mb: 1 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mx: 'auto', mb: 0.5 }} />
        <Skeleton variant="text" width="95%" height={20} sx={{ mx: 'auto' }} />
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
              EKSTRAKURIKULER SMANSABA
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Ekstrakurikuler Content Section */}
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
            Daftar Ekstrakurikuler
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
          ) : ekstrakurikulerList.length === 0 ? (
            <Typography sx={{ textAlign: 'center', py: 8, color: '#666' }}>
              Belum ada data ekstrakurikuler
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
            {ekstrakurikulerList.map((ekskul) => {
              const IconComponent = getIcon(ekskul.icon);
              
              return (
                <Card
                  key={ekskul.id}
                  onClick={() => navigate(`/ekstrakurikuler/detail-ekstrakurikuler/${ekskul.id}`)}
                  sx={{
                    minWidth: { xs: '180px', sm: '230px' },
                    minHeight: { xs: '300px', sm: '320px' },
                    width: { xs: '100%', sm: '230px' },
                    maxWidth: { xs: '230px', sm: 'none' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: { xs: '20px 12px', md: '24px 16px' },
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e0e0e0',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                      borderColor: '#1976d2',
                    },
                  }}
                >
                  {/* Logo Ekstrakurikuler */}
                  {ekskul.logo ? (
                    <Box
                      sx={{
                        width: { xs: 80, md: 100 },
                        height: { xs: 80, md: 100 },
                        borderRadius: '50%',
                        overflow: 'hidden',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        border: '3px solid #f5f5f5',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <img
                        src={getImageUrl(ekskul.logo)}
                        alt={`Logo ${ekskul.nama}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <svg style="width: 50px; height: 50px; fill: #757575;">
                              <use href="#fallback-icon" />
                            </svg>
                          `;
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: { xs: 80, md: 100 },
                        height: { xs: 80, md: 100 },
                        borderRadius: '50%',
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        border: '3px solid #f5f5f5',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <IconComponent 
                        sx={{ 
                          fontSize: { xs: 40, md: 50 }, 
                          color: '#999',
                        }} 
                      />
                    </Box>
                  )}

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
                    {/* Badge Kategori */}
                    <Box
                      sx={{
                        backgroundColor: '#e0e0e0',
                        color: '#555',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'inline-block',
                      }}
                    >
                      {ekskul.kategori}
                    </Box>

                    {/* Nama Ekstrakurikuler */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        fontWeight: 700,
                        color: '#333',
                        marginBottom: '8px',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {ekskul.nama}
                    </Typography>

                    {/* Deskripsi */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.85rem',
                        color: '#666',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {ekskul.deskripsi}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default EkstrakurikulerPage;
