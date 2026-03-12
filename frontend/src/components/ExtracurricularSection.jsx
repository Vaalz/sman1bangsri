import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Skeleton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Sports, 
  MusicNote, 
  Palette, 
  Science, 
  Language,
  EmojiEvents,
} from '@mui/icons-material';
import { getEkstrakurikulerList, getImageUrl } from '../services/api';

const ExtracurricularSection = () => {
  const navigate = useNavigate();
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExtracurriculars = async () => {
      try {
        setLoading(true);
        const response = await getEkstrakurikulerList();
        // Ambil hanya 6 ekstrakurikuler untuk landing page (lebih cepat)
        const limitedData = (response.data.data || []).slice(0, 6);
        setExtracurriculars(limitedData);
      } catch (error) {
        console.error('Error fetching extracurriculars:', error);
        setExtracurriculars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExtracurriculars();
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      Sports: Sports,
      MusicNote: MusicNote,
      Palette: Palette,
      Science: Science,
      Language: Language,
      EmojiEvents: EmojiEvents,
    };
    return icons[iconName] || Sports;
  };

  return (
    <Box
      sx={{
        padding: { xs: '60px 0', md: '80px 0' },
        backgroundColor: '#f8f9fa',
      }}
    >
      <Container maxWidth="lg">
        {loading ? (
          <>
            {/* Skeleton Title */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: { xs: '40px', md: '50px' } }}>
              <Skeleton 
                variant="text" 
                width={250} 
                height={60}
                sx={{ 
                  transform: 'none',
                  transformOrigin: '0 0',
                }}
              />
            </Box>
            
            {/* Skeleton Cards */}
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                overflowX: 'auto',
                overflowY: 'hidden',
                paddingBottom: '20px',
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <Card
                  key={index}
                  sx={{
                    minWidth: '220px',
                    maxWidth: '220px',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    padding: '24px',
                  }}
                >
                  {/* Skeleton Logo */}
                  <Skeleton 
                    variant="circular" 
                    width={120} 
                    height={120}
                    sx={{ marginBottom: '20px' }}
                  />
                  
                  {/* Skeleton Nama */}
                  <Skeleton 
                    variant="text" 
                    width="100%" 
                    height={30}
                    sx={{ marginBottom: '8px' }}
                  />
                  <Skeleton 
                    variant="text" 
                    width="80%" 
                    height={30}
                    sx={{ marginBottom: '8px' }}
                  />
                  
                  {/* Skeleton Deskripsi */}
                  <Skeleton 
                    variant="text" 
                    width="90%" 
                    height={20}
                  />
                </Card>
              ))}
            </Box>
          </>
        ) : (
          <>
            <Typography 
              variant="h2"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: { xs: '40px', md: '50px' },
                color: '#333',
                position: 'relative',
                paddingBottom: '15px',
                padding: { xs: '0 16px 15px', md: '0 0 15px' },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  backgroundColor: '#34495e',
                },
              }}
            >
              Ekstrakurikuler
            </Typography>
            
            {extracurriculars.length === 0 ? (
          <Typography sx={{ textAlign: 'center', py: 8, color: '#666' }}>
            Belum ada data ekstrakurikuler
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              overflowY: 'hidden',
              paddingBottom: '20px',
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: '#555',
                },
              },
            }}
          >
            {extracurriculars.map((ekskul) => {
              const IconComponent = getIcon(ekskul.icon);
              
              return (
                <Card
                  key={ekskul.id}
                  onClick={() => navigate(`/ekstrakurikuler/detail-ekstrakurikuler/${ekskul.id}`)}
                  sx={{
                    minWidth: '220px',
                    maxWidth: '220px',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    padding: '24px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      backgroundColor: ekskul.logo ? 'transparent' : '#e0e0e0',
                      backgroundImage: ekskul.logo ? 'none' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {ekskul.logo ? (
                      <img
                        src={getImageUrl(ekskul.logo)}
                        alt={ekskul.nama}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%',
                        }}
                      />
                    ) : (
                      <IconComponent 
                        sx={{
                          fontSize: '64px',
                          color: '#ffffff',
                        }}
                      />
                    )}
                  </Box>
                  
                  <CardContent 
                    sx={{ 
                      textAlign: 'center',
                      padding: 0,
                      width: '100%',
                    }}
                  >
                    <Typography 
                      variant="h4"
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#333',
                        marginBottom: '8px',
                        minHeight: '56px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.4,
                      }}
                    >
                      {ekskul.nama}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{
                        fontSize: '0.85rem',
                        color: '#666',
                        minHeight: '20px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {ekskul.kategori}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
            )}
          </>
        )}

        {!loading && extracurriculars.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: { xs: '30px', md: '40px' },
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate('/ekstrakurikuler')}
              sx={{
                backgroundColor: '#34495e',
                color: '#ffffff',
                padding: { xs: '10px 28px', md: '12px 40px' },
                fontSize: { xs: '14px', md: '16px' },
                fontWeight: 600,
                borderRadius: '4px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#2c3e50',
                },
              }}
            >
              Selengkapnya
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ExtracurricularSection;
