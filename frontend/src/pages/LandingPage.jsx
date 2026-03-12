import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WelcomeSection from '../components/WelcomeSection';
import StatisticsSection from '../components/StatisticsSection';
import ArticleSection from '../components/ArticleSection';
import VideoProfileSection from '../components/VideoProfileSection';
import ExtracurricularSection from '../components/ExtracurricularSection';
import PTNAcceptanceSection from '../components/PTNAcceptanceSection';
import AchievementSection from '../components/AchievementSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <Box>
      <Navbar />
      <Hero />
      <WelcomeSection />
      <VideoProfileSection />
      <StatisticsSection />
      <ArticleSection />
      <ExtracurricularSection />
      <AchievementSection />
      <PTNAcceptanceSection />
      <Footer />
    </Box>
  );
};

export default LandingPage;
