import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Skeleton } from '@mui/material';
import { FormatQuote, School, Science, Calculate, Public, LocalLibrary, Biotech } from '@mui/icons-material';
import { getSambutan, getImageUrl } from '../services/api';

const WelcomeSection = () => {
  const [sambutan, setSambutan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSambutan();
  }, []);

  const fetchSambutan = async () => {
    try {
      setLoading(true);
      const response = await getSambutan();
      setSambutan(response.data.data);
    } catch (error) {
      console.error('Error fetching sambutan:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          padding: { xs: '60px 0', md: '80px 0' },
          backgroundColor: '#f8f9fa',
        }}
      >
        <Container maxWidth="lg">
          {/* Skeleton Title */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: { xs: '40px', md: '50px' } }}>
            <Skeleton 
              variant="text" 
              width={300} 
              height={60}
              sx={{ 
                transform: 'none',
                transformOrigin: '0 0',
              }}
            />
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            {/* Skeleton Foto */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: { xs: '100%', md: '280px' },
                maxWidth: { xs: '280px', md: 'none' },
                margin: { xs: '0 auto', md: '0' },
              }}
            >
              <Skeleton 
                variant="rectangular" 
                width={280} 
                height={350}
                sx={{ 
                  borderRadius: '12px',
                  marginBottom: '20px',
                }}
              />
              
              <Box sx={{ textAlign: 'center', width: '100%', paddingTop: '12px' }}>
                <Skeleton 
                  variant="text" 
                  width="80%" 
                  height={40}
                  sx={{ margin: '0 auto 8px' }}
                />
                <Skeleton 
                  variant="text" 
                  width="60%" 
                  height={30}
                  sx={{ margin: '0 auto' }}
                />
              </Box>
            </Box>

            {/* Skeleton Teks Sambutan */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: { xs: '0 16px', md: '0' },
              }}
            >
              <Skeleton 
                variant="circular" 
                width={48} 
                height={48}
                sx={{ marginBottom: '16px' }}
              />
              <Skeleton variant="text" width="100%" height={30} />
              <Skeleton variant="text" width="95%" height={30} />
              <Skeleton variant="text" width="98%" height={30} />
              <Skeleton variant="text" width="100%" height={30} />
              <Skeleton variant="text" width="92%" height={30} />
              <Skeleton variant="text" width="96%" height={30} />
              <Skeleton variant="text" width="100%" height={30} />
              <Skeleton variant="text" width="88%" height={30} />
              <Skeleton variant="text" width="94%" height={30} />
              <Skeleton variant="text" width="70%" height={30} />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

  if (!sambutan) {
    return null; // Don't show section if no data
  }

  return (
    <Box
      sx={{
        padding: { xs: '60px 0', md: '80px 0' },
        backgroundColor: '#f8f9fa',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(52, 73, 94, 0.05) 0%, rgba(52, 73, 94, 0.1) 100%)',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(52, 73, 94, 0.05) 0%, rgba(52, 73, 94, 0.08) 100%)',
          zIndex: 0,
        },
      }}
    >
      {/* Additional School Pattern - Books Stack */}
      <Box
        sx={{
          position: 'absolute',
          top: '400px',
          left: '1%',
          opacity: 0.04,
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ width: '60px', height: '8px', bgcolor: '#34495e', borderRadius: '1px', transform: 'translateX(5px)' }} />
          <Box sx={{ width: '70px', height: '8px', bgcolor: '#34495e', borderRadius: '1px' }} />
          <Box sx={{ width: '65px', height: '8px', bgcolor: '#34495e', borderRadius: '1px', transform: 'translateX(3px)' }} />
          <Box sx={{ width: '72px', height: '8px', bgcolor: '#34495e', borderRadius: '1px', transform: 'translateX(-2px)' }} />
        </Box>
      </Box>

      {/* Decorative Formula Pattern */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '50px',
          right: '10%',
          opacity: 0.04,
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
          fontFamily: 'serif',
          fontSize: '40px',
          color: '#34495e',
          fontStyle: 'italic',
          transform: 'rotate(-5deg)',
        }}
      >
        ax² + bx + c
      </Box>
      {/* Decorative Icons - School Related */}
      <Box
        sx={{
          position: 'absolute',
          top: '80px',
          left: '3%',
          opacity: 0.06,
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <School sx={{ fontSize: '130px', color: '#34495e', transform: 'rotate(-15deg)' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '150px',
          right: '5%',
          opacity: 0.06,
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Science sx={{ fontSize: '110px', color: '#34495e', transform: 'rotate(25deg)' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '200px',
          right: '2%',
          opacity: 0.06,
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Calculate sx={{ fontSize: '95px', color: '#34495e', transform: 'rotate(-20deg)' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '100px',
          left: '4%',
          opacity: 0.05,
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <Public sx={{ fontSize: '100px', color: '#34495e', transform: 'rotate(15deg)' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '300px',
          left: '8%',
          opacity: 0.05,
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <LocalLibrary sx={{ fontSize: '85px', color: '#34495e', transform: 'rotate(-10deg)' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '250px',
          right: '12%',
          opacity: 0.05,
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <Biotech sx={{ fontSize: '90px', color: '#34495e', transform: 'rotate(30deg)' }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
          Sambutan Kepala Sekolah
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: { xs: 'center', md: 'flex-start' },
          }}
        >
          {/* Foto dan Nama Kepala Sekolah */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: { xs: '100%', md: '280px' },
              maxWidth: { xs: '280px', md: 'none' },
              margin: { xs: '0 auto', md: '0' },
              position: 'relative',
            }}
          >
            {/* Decorative Elements Around Photo */}
            <Box
              sx={{
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                width: '60px',
                height: '60px',
                border: '3px solid #34495e',
                borderRadius: '50%',
                opacity: 0.2,
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '30px',
                right: '-20px',
                width: '30px',
                height: '35px',
                border: '2px solid #34495e',
                borderRadius: '3px',
                opacity: 0.15,
                zIndex: 0,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '8px',
                  left: '5px',
                  width: '18px',
                  height: '2px',
                  bgcolor: '#34495e',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '14px',
                  left: '5px',
                  width: '18px',
                  height: '2px',
                  bgcolor: '#34495e',
                },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '80px',
                right: '-10px',
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)',
                borderRadius: '8px',
                opacity: 0.15,
                transform: 'rotate(45deg)',
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '40px',
                left: '-15px',
                width: '25px',
                height: '25px',
                border: '2px solid #34495e',
                borderRadius: '50%',
                opacity: 0.12,
                zIndex: 0,
              }}
            />
            
            <Paper
              elevation={3}
              sx={{
                width: { xs: '240px', sm: '280px' },
                height: { xs: '300px', sm: '350px' },
                overflow: 'hidden',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                position: 'relative',
                backgroundColor: '#e0e0e0',
                backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                marginBottom: '20px',
                zIndex: 1,
                border: '4px solid #ffffff',
              }}
            >
              {sambutan.foto && (
                <Box
                  component="img"
                  src={getImageUrl(sambutan.foto)}
                  alt={sambutan.nama}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </Paper>
            
            <Box
              sx={{
                textAlign: 'center',
                paddingTop: '12px',
                borderTop: '2px solid #34495e',
                width: '100%',
              }}
            >
              <Typography 
                variant="h3"
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.4rem' },
                  fontWeight: 700,
                  color: '#2c3e50',
                  marginBottom: '4px',
                }}
              >
                {sambutan.nama}
              </Typography>
              <Typography 
                variant="subtitle1"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: '#7f8c8d',
                  fontStyle: 'italic',
                }}
              >
                {sambutan.jabatan}
              </Typography>
            </Box>
          </Box>

          {/* Teks Sambutan */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Quote Icon with Background */}
            <Box
              sx={{
                position: 'relative',
                marginBottom: '16px',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-10px',
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, rgba(52, 73, 94, 0.1) 0%, rgba(52, 73, 94, 0.05) 100%)',
                  borderRadius: '50%',
                  zIndex: 0,
                }}
              />
              <FormatQuote 
                sx={{
                  fontSize: '48px',
                  color: '#34495e',
                  opacity: 0.3,
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </Box>

            {/* Decorative Line Pattern */}
            <Box
              sx={{
                position: 'absolute',
                top: '100px',
                right: '-20px',
                width: '100px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(52, 73, 94, 0.2) 50%, transparent 100%)',
                display: { xs: 'none', md: 'block' },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '100px',
                right: '-20px',
                width: '80px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(52, 73, 94, 0.2) 50%, transparent 100%)',
                display: { xs: 'none', md: 'block' },
              }}
            />

            <Typography 
              variant="body1"
              sx={{
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                color: '#555',
                textAlign: 'justify',
                padding: { xs: '0 16px', md: '0' },
                whiteSpace: 'pre-line',
                position: 'relative',
                zIndex: 1,
                '&::first-letter': {
                  fontSize: '2em',
                  fontWeight: 700,
                  color: '#34495e',
                  float: 'left',
                  marginRight: '8px',
                  lineHeight: 1,
                },
              }}
            >
              {sambutan.sambutan}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WelcomeSection;
