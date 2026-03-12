import { Box, Container, Typography, Paper, Card, CardContent, CardMedia, Chip } from '@mui/material';
import { keyframes } from '@mui/system';
import SchoolIcon from '@mui/icons-material/School';
import { useState, useEffect } from 'react';
import { getSiswaPtnList, getImageUrl } from '../services/api';

// Animasi scroll horizontal
const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const PTNAcceptanceSection = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getSiswaPtnList({ per_page: 100 });
      const data = response.data.data || [];
      setStudents(data);
    } catch (error) {
      console.error('Error fetching siswa PTN:', error);
    } finally {
      setLoading(false);
    }
  };

  // Duplikasi data untuk seamless loop
  const duplicatedStudents = [...students, ...students];

  if (loading || students.length === 0) {
    return null; // Don't show section if loading or no data
  }

  return (
    <Box
      sx={{
        padding: { xs: '60px 0', md: '80px 0' },
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
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
              backgroundColor: '#f39c12',
            },
          }}
        >
          Daftar Siswa diterima Di PTN
        </Typography>
      </Container>

      {/* Container untuk scrolling */}
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          '&:hover .scroll-container': {
            animationPlayState: 'paused',
          },
        }}
      >
        <Box
          className="scroll-container"
          sx={{
            display: 'flex',
            gap: 4,
            animation: `${scroll} 25s linear infinite`,
            width: 'fit-content',
            paddingLeft: '20px',
          }}
        >
          {duplicatedStudents.map((student, index) => (
            <Card
              key={`${student.id}-${index}`}
              sx={{
                minWidth: '300px',
                width: '300px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                '&:hover': {
                  '& .university-badge': {
                    bottom: '16px',
                    left: '16px',
                    top: 'auto',
                    transform: 'translate(0, 0)',
                    textAlign: 'left',
                    textShadow: '3px 3px 8px rgba(0,0,0,0.5)',
                  },
                },
              }}
            >
              {/* Foto Siswa dengan Overlay */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '380px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  className="student-photo"
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#c5b8a5',
                    backgroundImage: student.foto_siswa
                      ? `url(${getImageUrl(student.foto_siswa)})`
                      : 'linear-gradient(135deg, #a8b5a0 0%, #8b9d83 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                {/* Dark Overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
                    opacity: 0.5,
                  }}
                />

                {/* Logo PTN Badge - Top Left */}
                {student.logo_ptn && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      width: '60px',
                      height: '60px',
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      zIndex: 3,
                    }}
                  >
                    <img
                      src={getImageUrl(student.logo_ptn)}
                      alt={student.nama_ptn}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                )}

                {/* University Badge */}
                <Box
                  className="university-badge"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: '#fff',
                    zIndex: 2,
                    transition: 'all 0.4s ease',
                  }}
                >
                  <SchoolIcon
                    sx={{
                      fontSize: '1.8rem',
                      marginBottom: '6px',
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                    }}
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginBottom: '6px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    {student.nama_ptn}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
                    }}
                  >
                    {student.jurusan}
                  </Typography>
                </Box>

                {/* Class Badge - Top Right */}
                <Chip
                  label={student.kelas}
                  sx={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    color: '#667eea',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    zIndex: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                />
              </Box>

              {/* Info Siswa */}
              <CardContent
                className="info-section"
                sx={{
                  padding: '24px',
                  textAlign: 'center',
                  backgroundColor: '#fff',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: '#2c3e50',
                    marginBottom: '8px',
                    minHeight: '28px',
                  }}
                >
                  {student.nama_siswa}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: '30px',
                      height: '2px',
                      backgroundColor: '#f39c12',
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.85rem',
                      color: '#7f8c8d',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Class {student.kelas}
                  </Typography>
                  <Box
                    sx={{
                      width: '30px',
                      height: '2px',
                      backgroundColor: '#f39c12',
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PTNAcceptanceSection;
