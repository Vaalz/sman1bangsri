import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import smansabaImage from '../assets/image/smansaba.jpg';

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation setelah component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: { xs: '0 16px', md: '0' },
        overflow: 'hidden',
        '@keyframes zoomIn': {
          from: {
            transform: 'scale(1.1)',
          },
          to: {
            transform: 'scale(1)',
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${smansabaImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          animation: 'zoomIn 1.5s ease-out',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            textAlign: 'center',
            color: '#ffffff',
            padding: { xs: '20px', md: '40px' },
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1s ease-out, transform 1s ease-out',
          }}
        >
          <Typography 
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.75rem', md: '4rem' },
              fontWeight: 800,
              marginBottom: { xs: '24px', md: '32px' },
              textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
              lineHeight: 1.2,
              letterSpacing: { xs: '-0.5px', md: '-1px' },
              fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 1.2s ease-out 0.2s, transform 1.2s ease-out 0.2s',
            }}
          >
            Selamat Datang di SMANSABA
          </Typography>
          
          <Typography 
            variant="body1"
            sx={{
              fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' },
              fontWeight: 500,
              lineHeight: { xs: 1.8, md: 2 },
              letterSpacing: '0.3px',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
              color: '#ffffff',
              maxWidth: '900px',
              margin: '0 auto 40px',
              padding: { xs: '0 10px', md: '0' },
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 1.2s ease-out 0.4s, transform 1.2s ease-out 0.4s',
            }}
          >
            TERWUJUDNYA LULUSAN YANG SANTUN, BERIMAN, BERTAQWA, BERAKHLAK MULIA. MANDIRI, BERTANGGUNG JAWAB, PARTISIPATIF, BERGOTONG ROYONG, TOLERANSI, BERKEBHINEKAAN GLOBAL, INTELEK, BERNALAR KRITIS, KREATIF, DAN BERWAWASAN LINGKUNGAN
          </Typography>

          <Button 
            variant="contained"
            onClick={() => navigate('/tentang')}
            sx={{
              backgroundColor: '#ffffff',
              color: '#1a1a1a',
              padding: { xs: '12px 32px', md: '14px 48px' },
              fontSize: { xs: '14px', md: '16px' },
              fontWeight: 700,
              borderRadius: '50px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
              transition: 'opacity 1.2s ease-out 0.6s, transform 1.2s ease-out 0.6s, background-color 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                transform: 'translateY(-2px) scale(1.05)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
              },
            }}
          >
            Lihat Selengkapnya
          </Button>
        </Box>
      </Container>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1.5s ease-out 1s',
          '@keyframes bounce': {
            '0%, 20%, 50%, 80%, 100%': {
              transform: 'translateY(0)',
            },
            '40%': {
              transform: 'translateY(-10px)',
            },
            '60%': {
              transform: 'translateY(-5px)',
            },
          },
        }}
      >
        <Box
          sx={{
            width: '30px',
            height: '50px',
            border: '2px solid rgba(255, 255, 255, 0.7)',
            borderRadius: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '8px',
            animation: 'bounce 2s infinite',
          }}
        >
          <Box
            sx={{
              width: '6px',
              height: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '3px',
              '@keyframes scroll': {
                '0%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
                '100%': {
                  opacity: 0,
                  transform: 'translateY(15px)',
                },
              },
              animation: 'scroll 1.5s infinite',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
