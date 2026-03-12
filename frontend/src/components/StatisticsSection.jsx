import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { EmojiEventsOutlined, WorkspacePremiumOutlined, MilitaryTechOutlined } from '@mui/icons-material';
import axios from 'axios';

const StatisticsSection = () => {
  const [stats, setStats] = useState({
    prestasi_nasional: 0,
    prestasi_provinsi: 0,
    prestasi_kabupaten: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Fetch statistics from API
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/public/stats');
        if (response.data.success) {
          setStats({
            prestasi_nasional: response.data.data.prestasi_nasional,
            prestasi_provinsi: response.data.data.prestasi_provinsi,
            prestasi_kabupaten: response.data.data.prestasi_kabupaten,
          });
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
        // Use dummy data if API fails
        setStats({
          prestasi_nasional: 5,
          prestasi_provinsi: 12,
          prestasi_kabupaten: 18,
        });
      }
    };

    fetchStats();

    // Intersection Observer for animation trigger
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const statisticsData = [
    {
      icon: <EmojiEventsOutlined sx={{ fontSize: 50 }} />,
      value: stats.prestasi_nasional,
      label: 'Nasional',
    },
    {
      icon: <WorkspacePremiumOutlined sx={{ fontSize: 50 }} />,
      value: stats.prestasi_provinsi,
      label: 'Provinsi',
    },
    {
      icon: <MilitaryTechOutlined sx={{ fontSize: 50 }} />,
      value: stats.prestasi_kabupaten,
      label: 'Kabupaten/Kota',
    },
  ];

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 6, md: 8 },
        background: '#0f172a',
        minHeight: '300px',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* Left Section - Title */}
          <Box sx={{ maxWidth: { xs: '100%', md: '400px' } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.5rem', md: '2rem' },
                color: '#ffffff',
                mb: 2,
                lineHeight: 1.3,
              }}
            >
              Tingkat Prestasi
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: { xs: '0.9rem', md: '1rem' },
                lineHeight: 1.6,
              }}
            >
              Pencapaian prestasi siswa berdasarkan tingkat kompetisi
            </Typography>
          </Box>

          {/* Right Section - Statistics */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 4, md: 8 },
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-end' },
            }}
          >
            {statisticsData.map((stat, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: 'center',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${index * 0.1}s`,
                }}
              >
                {/* Icon Circle */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    border: '3px solid rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#ffffff',
                    backgroundColor: 'transparent',
                  }}
                >
                  {stat.icon}
                </Box>

                {/* Counter */}
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    color: '#ffffff',
                    mb: 0.5,
                    lineHeight: 1,
                  }}
                >
                  <CountUp end={stat.value} duration={2} isVisible={isVisible} delay={index * 0.1} />
                </Typography>

                {/* Label */}
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 400,
                    fontSize: { xs: '0.95rem', md: '1rem' },
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// CountUp Component
const CountUp = ({ end, duration, isVisible, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp + delay * 1000;
      }

      if (timestamp < startTimeRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * end);

      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [end, duration, isVisible, delay]);

  return <>{count}</>;
};

export default StatisticsSection;
