import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Button, CircularProgress, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Star, MilitaryTech, Grade, WorkspacePremium, EmojiEvents } from '@mui/icons-material';
import { getPrestasiList } from '../services/api';

const AchievementSection = () => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await getPrestasiList();
      // Ambil 3 prestasi terbaru
      const top3 = response.data.data.slice(0, 3);
      
      // Map data dengan medal color berdasarkan juara field atau fallback ke index
      const achievementsWithMedal = top3.map((prestasi, index) => {
        let rank = prestasi.juara || (index === 0 ? 'JUARA 1' : index === 1 ? 'JUARA 2' : 'JUARA 3');
        let medalColor;
        
        // Determine medal color based on juara field or index
        if (prestasi.juara) {
          const juaraLower = prestasi.juara.toLowerCase();
          if (juaraLower.includes('juara 1') || juaraLower === '1') {
            medalColor = '#FFD700'; // Gold
          } else if (juaraLower.includes('juara 2') || juaraLower === '2') {
            medalColor = '#C0C0C0'; // Silver
          } else if (juaraLower.includes('juara 3') || juaraLower === '3') {
            medalColor = '#CD7F32'; // Bronze
          } else {
            medalColor = '#757575'; // Gray for other rankings
          }
        } else {
          // Fallback to index-based coloring
          medalColor = index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32';
        }
        
        return {
          ...prestasi,
          rank: rank.toUpperCase(),
          medalColor,
        };
      });
      
      setAchievements(achievementsWithMedal);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <Card
      sx={{
        minWidth: { xs: '280px', sm: '320px' },
        minHeight: { xs: '340px', sm: '360px' },
        width: { xs: '100%', sm: '320px' },
        maxWidth: { xs: '320px', sm: 'none' },
        backgroundColor: 'transparent',
        border: '2px solid rgba(255,255,255,0.2)',
        borderRadius: '16px',
      }}
    >
      <CardContent sx={{ padding: '32px 24px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Skeleton variant="circular" width={70} height={70} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
        </Box>
        <Skeleton variant="text" width="60%" height={36} sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
        <Skeleton variant="text" width="80%" height={28} sx={{ mx: 'auto', mb: 1, bgcolor: 'rgba(255,255,255,0.1)' }} />
        <Skeleton variant="text" width="90%" height={24} sx={{ mx: 'auto', mb: 1, bgcolor: 'rgba(255,255,255,0.1)' }} />
        <Skeleton variant="text" width="50%" height={24} sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2, borderRadius: '8px', bgcolor: 'rgba(255,255,255,0.1)' }} />
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        padding: { xs: '60px 0', md: '80px 0' },
        backgroundColor: '#1a2332',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%)',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.06) 0%, transparent 70%)',
          zIndex: 0,
        },
      }}
    >
      {/* Decorative Trophy Icons */}
      <Box
        sx={{
          position: 'absolute',
          top: '100px',
          left: '5%',
          opacity: 0.08,
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <EmojiEvents sx={{ fontSize: '140px', color: '#FFD700', transform: 'rotate(-20deg)' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '150px',
          right: '8%',
          opacity: 0.08,
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <WorkspacePremium sx={{ fontSize: '120px', color: '#C0C0C0', transform: 'rotate(25deg)' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '100px',
          right: '3%',
          opacity: 0.08,
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <MilitaryTech sx={{ fontSize: '110px', color: '#CD7F32', transform: 'rotate(-15deg)' }} />
      </Box>

      {/* Decorative Stars */}
      <Box
        sx={{
          position: 'absolute',
          top: '200px',
          left: '15%',
          opacity: 0.06,
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <Star sx={{ fontSize: '80px', color: '#FFD700', transform: 'rotate(15deg)' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '150px',
          left: '10%',
          opacity: 0.06,
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <Grade sx={{ fontSize: '70px', color: '#FFD700', transform: 'rotate(-30deg)' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '300px',
          right: '12%',
          opacity: 0.06,
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <Star sx={{ fontSize: '65px', color: '#C0C0C0', transform: 'rotate(45deg)' }} />
      </Box>

      {/* Decorative Number Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: '400px',
          left: '2%',
          opacity: 0.05,
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
          fontSize: '120px',
          fontWeight: 900,
          color: '#FFD700',
          fontFamily: 'Arial Black, sans-serif',
        }}
      >
        #1
      </Box>

      {/* Podium Pattern */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '50px',
          right: '5%',
          opacity: 0.04,
          zIndex: 0,
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5 }}>
          <Box sx={{ width: '30px', height: '50px', bgcolor: '#C0C0C0', borderRadius: '4px 4px 0 0' }} />
          <Box sx={{ width: '30px', height: '70px', bgcolor: '#FFD700', borderRadius: '4px 4px 0 0' }} />
          <Box sx={{ width: '30px', height: '40px', bgcolor: '#CD7F32', borderRadius: '4px 4px 0 0' }} />
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '12px',
            color: '#fff',
            padding: { xs: '0 16px', md: '0' },
          }}
        >
          Prestasi
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
            textAlign: 'center',
            marginBottom: { xs: '40px', md: '50px' },
            color: '#b8c5d6',
            padding: { xs: '0 16px', md: '0' },
          }}
        >
          Prestasi Siswa SMA Negeri 1 Bangsri terbaru di bawah ini
        </Typography>
      </Container>

      {/* Achievement Cards Container */}
      <Container maxWidth="lg">
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: { xs: 2, md: 3 },
              flexWrap: 'wrap',
              padding: { xs: '0 16px', md: '0' },
            }}
          >
            {[1, 2, 3].map((item) => (
              <SkeletonCard key={item} />
            ))}
          </Box>
        ) : achievements.length === 0 ? (
          <Typography sx={{ textAlign: 'center', py: 8, color: '#b8c5d6' }}>
            Belum ada data prestasi
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: { xs: 2, md: 3 },
              flexWrap: 'wrap',
              padding: { xs: '0 16px', md: '0' },
            }}
          >
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                onClick={() => navigate(`/prestasi/detail-prestasi/${achievement.id}`)}
                sx={{
                  minWidth: { xs: '280px', sm: '320px' },
                  minHeight: { xs: '340px', sm: '360px' },
                  width: { xs: '100%', sm: '320px' },
                  maxWidth: { xs: '320px', sm: 'none' },
                  backgroundColor: 'transparent',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'rgba(255,255,255,0.4)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                    '& .medal-icon': {
                      transform: 'scale(1.15) rotate(10deg)',
                    },
                  },
                }}
              >
                <CardContent
                  sx={{
                    padding: '32px 24px',
                    color: '#fff',
                  }}
                >
                  {/* Medal Icon with Rank */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '24px',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: '70px',
                          height: '70px',
                          borderRadius: '50%',
                          backgroundColor: achievement.medalColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 4px 16px ${achievement.medalColor}40`,
                        }}
                      >
                        <EmojiEventsIcon
                          className="medal-icon"
                          sx={{
                            fontSize: '2.5rem',
                            color: '#1a2332',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* Rank Badge */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      marginBottom: '16px',
                      color: '#fff',
                      minHeight: '40px',
                    }}
                  >
                    {achievement.rank}
                  </Typography>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: '#fff',
                      textTransform: 'uppercase',
                      minHeight: '66px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: 1.5,
                    }}
                  >
                    {achievement.judul}
                  </Typography>

                  {/* Nama Siswa */}
                  {achievement.nama_siswa && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.95rem',
                        marginBottom: '12px',
                        color: '#ffd700',
                        fontWeight: 500,
                      }}
                    >
                      {achievement.nama_siswa}
                    </Typography>
                  )}

                  {/* Category */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1rem',
                      marginBottom: '12px',
                      color: '#e8eef5',
                      fontWeight: 500,
                      minHeight: '28px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {achievement.kategori} • {achievement.tingkat}
                  </Typography>

                  {/* Divider */}
                  <Box
                    sx={{
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      marginY: '16px',
                    }}
                  />

                  {/* Year */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#fff',
                      textAlign: 'center',
                    }}
                  >
                    Tahun {achievement.tahun}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>

      {/* Button Lihat Prestasi Lainnya */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate('/prestasi')}
          sx={{
            color: '#fff',
            borderColor: 'rgba(255,255,255,0.3)',
            borderWidth: '2px',
            padding: '12px 40px',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '8px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: '#fff',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderWidth: '2px',
              transform: 'translateY(-2px)',
            },
          }}
        >
          LIHAT PRESTASI LAINNYA
        </Button>
      </Box>
    </Box>
  );
};

export default AchievementSection;
