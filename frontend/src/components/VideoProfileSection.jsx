import { Box, Container, Typography, Paper } from '@mui/material';
import { PlayCircleOutline } from '@mui/icons-material';
import smansabaImage from '../assets/image/smansaba.jpg';

const VideoProfileSection = () => {
  // URL Video YouTube - Video profil SMAN 1 Bangsri
  const videoId = '4mYtsKfgdpM';
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${smansabaImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(26, 35, 50, 0.85)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <PlayCircleOutline sx={{ color: '#ffffff', fontSize: 32 }} />
            <Typography
              variant="overline"
              sx={{
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '2px',
              }}
            >
              VIDEO PROFIL
            </Typography>
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              color: '#ffffff',
              mb: 2,
              letterSpacing: '-0.5px',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            Profil SMAN 1 Bangsri
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '1rem', md: '1.125rem' },
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            Lihat video profil sekolah kami untuk mengetahui lebih dalam tentang SMANSABA
          </Typography>
        </Box>

        {/* Video Container */}
        <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              paddingTop: '56.25%', // 16:9 Aspect Ratio
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              border: '4px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4)',
              },
            }}
          >
            <iframe
              src={videoUrl}
              title="Video Profil SMAN 1 Bangsri"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default VideoProfileSection;
