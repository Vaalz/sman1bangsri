import { Box, Container, Typography, Grid, IconButton, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import PhoneIcon from '@mui/icons-material/Phone';
import logo from '../assets/image/logo.png';

const Footer = () => {
  const menuItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang', href: '/tentang' },
    { label: 'Guru', href: '/guru' },
    { label: 'Prestasi', href: '/prestasi' },
    { label: 'Radar Ekstrakurikuler', href: '/ekstrakurikuler' },
    { label: 'Kontak', href: '/kontak' },
  ];

  const otherItems = [
    { label: 'Berita', href: '/berita' },
    { label: 'Galeri', href: '/galeri' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f9fa',
        borderTop: '3px solid #34495e',
        paddingTop: { xs: '40px', md: '60px' },
        paddingBottom: '20px',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="space-between">
          {/* Logo and School Info */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: { xs: '0 16px', md: '0' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{
                    height: '70px',
                    width: 'auto',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#2c3e50',
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    lineHeight: 1.3,
                  }}
                >
                  SMA Negeri 1 Bangsri
                </Typography>
              </Box>
              
              <Typography
                variant="body2"
                sx={{
                  color: '#555',
                  fontSize: { xs: '0.9rem', md: '0.95rem' },
                  lineHeight: 1.6,
                }}
              >
                Jl. Jerukwangi, Bangsri, Krajan, Jerukwangi, <br/>Kec. Jepara, Jawa Tengah, 59453
              </Typography>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#555',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}
                >
                  No Telp
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <PhoneIcon sx={{ fontSize: '1.2rem', color: '#34495e' }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#2c3e50',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                    }}
                  >
                    (0291) 771186
                  </Typography>
                </Box>
              </Box>

              {/* Social Media Icons */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  marginTop: '8px',
                }}
              >
                <IconButton
                  component="a"
                  href="https://www.instagram.com/smansatubangsri?igsh=dWJmNHg5dHhreXE3"
                  target="_blank"
                  sx={{
                    backgroundColor: '#fff',
                    border: '2px solid #ddd',
                    width: '40px',
                    height: '40px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#E4405F',
                      borderColor: '#E4405F',
                      color: '#fff',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <InstagramIcon sx={{ fontSize: '1.3rem' }} />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.youtube.com/@sman1bangsriofficial881"
                  target="_blank"
                  sx={{
                    backgroundColor: '#fff',
                    border: '2px solid #ddd',
                    width: '40px',
                    height: '40px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#FF0000',
                      borderColor: '#FF0000',
                      color: '#fff',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <YouTubeIcon sx={{ fontSize: '1.3rem' }} />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.facebook.com/smansatubangsri"
                  target="_blank"
                  sx={{
                    backgroundColor: '#fff',
                    border: '2px solid #ddd',
                    width: '40px',
                    height: '40px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#1877F2',
                      borderColor: '#1877F2',
                      color: '#fff',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <FacebookIcon sx={{ fontSize: '1.3rem' }} />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://x.com/sman_bangsri"
                  target="_blank"
                  sx={{
                    backgroundColor: '#fff',
                    border: '2px solid #ddd',
                    width: '40px',
                    height: '40px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#000',
                      borderColor: '#000',
                      color: '#fff',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <XIcon sx={{ fontSize: '1.3rem' }} />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Menu Utama */}
          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ padding: { xs: '0 16px', md: '0' } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#2c3e50',
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  marginBottom: { xs: '16px', md: '20px' },
                }}
              >
                Menu Utama
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                }}
              >
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={item.href}
                    underline="none"
                    sx={{
                      color: '#555',
                      fontSize: { xs: '0.9rem', md: '0.95rem' },
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#34495e',
                        fontWeight: 600,
                        paddingLeft: '8px',
                      },
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Lain - Lain */}
          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ padding: { xs: '0 16px', md: '0' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#2c3e50',
                fontSize: { xs: '1.1rem', md: '1.2rem' },
                marginBottom: { xs: '16px', md: '20px' },
              }}
            >
              Lain - Lain
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              {otherItems.map((item, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={item.href}
                  underline="none"
                  sx={{
                    color: '#555',
                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#34495e',
                      fontWeight: 600,
                      paddingLeft: '8px',
                    },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>
            </Box>
          </Grid>

          {/* Maps */}
          <Grid item xs={12} md={5}>
            <Box sx={{ padding: { xs: '0 16px', md: '0' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#2c3e50',
                fontSize: { xs: '1.1rem', md: '1.2rem' },
                marginBottom: { xs: '16px', md: '20px' },
              }}
            >
              Maps
            </Typography>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '200px', sm: '250px' },
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '3px solid #e0e0e0',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.1899876543!2d110.75476931477444!3d-6.513164095315428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e711e9b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sSMA%20Negeri%201%20Bangsri!5e0!3m2!1sid!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              />
              {/* Button to enlarge map */}
              <Link
                href="https://www.google.com/maps/place/-6.513164,110.757258/@-6.513164,110.757258,15z"
                target="_blank"
                sx={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: '#fff',
                  padding: { xs: '6px 12px', sm: '8px 16px' },
                  borderRadius: '6px',
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  fontWeight: 600,
                  color: '#34495e',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#34495e',
                    color: '#fff',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Lihat peta lebih besar
              </Link>
            </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box
          sx={{
            marginTop: { xs: '40px', md: '50px' },
            paddingTop: '24px',
            borderTop: '1px solid #ddd',
            textAlign: 'center',
            padding: { xs: '24px 16px 0', md: '24px 0 0' },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#7f8c8d',
              fontSize: { xs: '0.85rem', md: '0.9rem' },
            }}
          >
            2026 © SMA Negeri 1 Bangsri, All Right Reserved. dikembangkan oleh:{' '}
            <Link
              href="https://www.instagram.com/valz.codes?igsh=bHVoZWN0YXdrbnk3"
              sx={{
                color: '#34495e',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Muhammad Reval Fahrizal Akbar
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
