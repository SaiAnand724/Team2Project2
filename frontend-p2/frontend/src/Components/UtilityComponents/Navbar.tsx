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
  ListItemText,
  Box,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme as useAppTheme } from './ThemeProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import SportsIcon from '@mui/icons-material/Sports';

const Navbar: React.FC = () => {
  const { darkMode } = useAppTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState<string | null>(null);
  const [lastName, setLastName] = React.useState<string | null>(null);
  const [sponsorName, setSponsorName] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8080/auth/user/logout', { withCredentials: true });
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInSponsor'); // Remove sponsor info on logout
      setFirstName(null);
      setLastName(null);
      setSponsorName(null);
      console.log('Logged out successfully!')
      navigate('/'); // Redirect to home or login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  React.useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
      }

      const storedSponsor = localStorage.getItem('loggedInSponsor');
      if (storedSponsor) {
        const sponsorData = JSON.parse(storedSponsor);
        setSponsorName(sponsorData.name);
      }
      
      setLoading(false);
    };

    fetchUser();
  }, []);

  const navbarBackgroundColor = darkMode ? '#173049' : '#91b8df';
  const drawerBackgroundColor = darkMode ? '#173049' : '#91b8df';
  const linkColor = darkMode ? '#ffffff' : '#000000';

  return (
    <AppBar position="static" sx={{ backgroundColor: navbarBackgroundColor }}>
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                sx: {
                  backgroundColor: drawerBackgroundColor,
                  color: linkColor,
                },
              }}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={handleDrawerToggle}
                onKeyDown={handleDrawerToggle}
              >
                <List>
                  <ListItemButton component={Link} to="/" sx={{ color: linkColor }}>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                  <ListItemButton component={Link} to="/register" sx={{ color: linkColor }}>
                    <ListItemText primary="Register" />
                  </ListItemButton>
                  <ListItemButton component={Link} to="/sponsor" sx={{ color: linkColor }}>
                    <ListItemText primary="Sponsor" />
                  </ListItemButton>
                  <ListItemButton component={Link} to="/other" sx={{ color: linkColor }}>
                    <ListItemText primary="Other" />
                  </ListItemButton>
                  <ListItemButton onClick={handleLogout} sx={{ color: linkColor }}>
                    <LogoutIcon />
                    <ListItemText primary="Log Out" />
                  </ListItemButton>
                </List>
              </Box>
              <ThemeSwitcher />
            </Drawer>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 2 }}>
              <Link to="/" style={{ textDecoration: 'none', color: linkColor }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SportsIcon fontSize='large' />
                  <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                    {firstName && lastName ? `${firstName} ${lastName}` : sponsorName || 'User'}
                  </Typography>
                </Box>
              </Link>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button component={Link} to="/" sx={{ color: linkColor }}>
                  Home
                </Button>
                <Button component={Link} to="/register" sx={{ color: linkColor }}>
                  Register
                </Button>
                <Button component={Link} to="/sponsor" sx={{ color: linkColor }}>
                  Sponsor
                </Button>
                {loading ? (
                  <Typography variant="body1" sx={{ color: linkColor }}>
                    Loading...
                  </Typography>
                ) : (
                  <Button onClick={handleLogout} sx={{ color: linkColor }}>
                    <LogoutIcon />
                    Log Out
                  </Button>
                )}
              </Box>
            </Box>
            <ThemeSwitcher />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
