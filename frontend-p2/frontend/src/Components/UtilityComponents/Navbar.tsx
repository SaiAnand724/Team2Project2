import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme as useAppTheme } from './ThemeProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsIcon from '@mui/icons-material/Sports';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar: React.FC = () => {
  const { darkMode } = useAppTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [username, setUsername] = React.useState<string | null>(null);
  const [role, setRole] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInSponsor');

      toast.success("Logout successful, redirecting you to user selection page.", {
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  React.useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem('loggedInUser');
      const storedSponsor = localStorage.getItem('loggedInSponsor');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUsername(userData.username);
        setRole(userData.role);
      } else if (storedSponsor) {
        const sponsorData = JSON.parse(storedSponsor);
        setUsername(sponsorData.username);
        setRole('Sponsor');
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const navbarBackgroundColor = darkMode ? '#173049' : '#91b8df';
  const drawerBackgroundColor = darkMode ? '#173049' : '#91b8df';
  const linkColor = darkMode ? '#ffffff' : '#000000';

  const renderDrawerItems = () => {
    return (
      <>
        <ListItemButton onClick={handleLogout} sx={{ mt: 2 }}>
          <LogoutIcon />
          <Typography variant="body1" sx={{ ml: 1, display: { xs: 'none', lg: 'block' } }}>
            Log Out
          </Typography>
        </ListItemButton>
      </>
    );
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: navbarBackgroundColor }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Link to="/" style={{ textDecoration: 'none', color: linkColor }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SportsIcon fontSize="large" />
                <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                  {username || 'User'}
                </Typography>
              </Box>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {loading ? (
                  <Typography variant="body1" sx={{ color: linkColor }}>
                    Loading...
                  </Typography>
                ) : (
                  <>
                    {renderDrawerItems()}
                  </>
                )}
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                  sx={{ display: { xs: 'none', lg: 'block' } }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="logout"
                  onClick={handleLogout}
                  sx={{ ml: 2 }}
                >
                  <LogoutIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <ThemeSwitcher />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            backgroundColor: drawerBackgroundColor,
            color: linkColor,
            width: 250,
          },
        }}
        variant="temporary"
      >
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center-align buttons
            padding: 2, // Add padding around the content
          }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">
              {username || 'User'}
            </Typography>
          </Box>
          <List sx={{ padding: 0, width: '100%' }}>
            {renderDrawerItems()}
          </List>
          <ThemeSwitcher />
        </Box>
      </Drawer>
      <ToastContainer />
    </>
  );
};

export default Navbar;
