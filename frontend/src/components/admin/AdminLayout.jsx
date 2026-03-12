import { useState } from 'react';
import { Box, Drawer, AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider } from '@mui/material';
import { Menu as MenuIcon, Dashboard, Article, Photo, People, EmojiEvents, Sports, School, RecordVoiceOver, Info, ContactMail, Settings, ExitToApp, SupervisorAccount, WorkspacePremium } from '@mui/icons-material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import authService from '../../services/authService';

const drawerWidth = 260;

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = authService.getStoredUser();
  const isSuperAdmin = authService.isSuperAdmin();

  // Menu items with conditional Admin Management for superadmin
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    ...(isSuperAdmin ? [{ text: 'Manajemen Admin', icon: <SupervisorAccount />, path: '/admin/admins' }] : []),
    { text: 'Berita', icon: <Article />, path: '/admin/berita' },
    { text: 'Galeri', icon: <Photo />, path: '/admin/galeri' },
    { text: 'Guru', icon: <People />, path: '/admin/guru' },
    { text: 'Prestasi', icon: <EmojiEvents />, path: '/admin/prestasi' },
    { text: 'Ekstrakurikuler', icon: <Sports />, path: '/admin/ekstrakurikuler' },
    { text: 'Course', icon: <School />, path: '/admin/course' },
    { text: 'Sambutan', icon: <RecordVoiceOver />, path: '/admin/sambutan' },
    { text: 'Tentang', icon: <Info />, path: '/admin/tentang' },
    { text: 'Kontak', icon: <ContactMail />, path: '/admin/kontak' },
    { text: 'Siswa PTN', icon: <WorkspacePremium />, path: '/admin/siswa-ptn' },
    { text: 'Pengaturan', icon: <Settings />, path: '/admin/settings' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      navigate('/admin/login');
    }
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          SMAN 1 BANGSRI
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'white' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
