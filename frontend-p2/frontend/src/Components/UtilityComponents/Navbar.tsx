import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
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
  const linkColor = darkMode ? '#ffffff' : '#000000';

  const renderDrawerItems = () => {
    return (
      <>
        <Typography
          onClick={handleLogout}
          variant="body1"
          sx={{
            color: linkColor,
            display: { xs: 'none', lg: 'block' },
            cursor: 'pointer', 
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          LOG OUT
        </Typography>
        <IconButton
          onClick={handleLogout}
          sx={{ display: { xs: 'flex', lg: 'none' } }}
        >
          <LogoutIcon sx={{ color: linkColor }} />
        </IconButton>
      </>
    );
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: navbarBackgroundColor }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
               <SportsIcon fontSize="large" />
                    <Typography variant="h6" component="div" sx={{ ml: 1, color: linkColor }}>
                       {username || 'User'}
                    </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {isMobile ? (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="logout"
                onClick={handleLogout}
                sx={{ ml: 2 }}
              >
                <LogoutIcon sx={{ color: linkColor }} />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {loading ? (
                  <Typography variant="body1" sx={{ color: linkColor }}>
                    Loading...
                  </Typography>
                ) : (
                  renderDrawerItems()
                )}
              </Box>
            )}
          </Box>
          <ThemeSwitcher />
        </Toolbar>
      </AppBar>
      <ToastContainer />
    </>
  );
};

export default Navbar;
