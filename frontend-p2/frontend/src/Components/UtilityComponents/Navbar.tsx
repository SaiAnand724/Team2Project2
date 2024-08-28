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
  Menu,
  MenuItem
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
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [firstName, setFirstName] = React.useState<string | null>(null);
  const [lastName, setLastName] = React.useState<string | null>(null);
  const [sponsorName, setSponsorName] = React.useState<string | null>(null);
  const [role, setRole] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8080/auth/user/logout', { withCredentials: true });
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInSponsor');
      setFirstName(null);
      setLastName(null);
      setSponsorName(null);
      setRole(null);
      navigate('/');
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
        setRole(userData.role);
      }

      const storedSponsor = localStorage.getItem('loggedInSponsor');
      if (storedSponsor) {
        const sponsorData = JSON.parse(storedSponsor);
        setSponsorName(sponsorData.name);
        setRole('Sponsor');
      }
      
      setLoading(false);
    };

    fetchUser();
  }, []);

  const navbarBackgroundColor = darkMode ? '#173049' : '#91b8df';
  const drawerBackgroundColor = darkMode ? '#173049' : '#91b8df';
  const linkColor = darkMode ? '#ffffff' : '#000000';

  const renderMenuItems = () => {
    switch (role) {
      case 'Player':
        return [
          <MenuItem key="dashboard" component={Link} to="/player">Dashboard</MenuItem>,
          <MenuItem key="team-invites" component={Link} to="/player/team/invites">Team Invites</MenuItem>,
          <MenuItem key="sponsorships" component={Link} to="/player/sponsorships">Sponsorships</MenuItem>,
          <MenuItem key="show-all" component={Link} to="/show-all">Show All</MenuItem>
        ];
      case 'Manager':
        return [
          <MenuItem key="dashboard" component={Link} to="/manager">Dashboard</MenuItem>,
          <MenuItem key="teams" component={Link} to="/manager/teams">Teams</MenuItem>,
          <MenuItem key="proposals" component={Link} to="/manager/proposals">Proposals</MenuItem>,
          <MenuItem key="players" component={Link} to="/manager/players">Players</MenuItem>
        ];
      case 'Sponsor':
        return [
          <MenuItem key="dashboard" component={Link} to="/sponsor">Dashboard</MenuItem>,
          <MenuItem key="proposal-hist" component={Link} to="proposals-hist">Proposals</MenuItem>,
          <MenuItem key="proposals" component={Link} to="/affiliates">Affiliates - Teams</MenuItem>,
          <MenuItem key="newsponsorproposal" component={Link} to="/newsponsorproposal">Create Proposal</MenuItem>
        ];
      default:
        return [
          <MenuItem key="home" component={Link} to="/">Home</MenuItem>,
          <MenuItem key="register" component={Link} to="/register">Register</MenuItem>,
          <MenuItem key="other" component={Link} to="/other">Other</MenuItem>
        ]; //probably don't need this
    }
  };

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
                <Box sx={{ padding: 2 }}>
                  <Typography variant="h6">
                    {firstName && lastName ? `${firstName} ${lastName}` : sponsorName || 'User'}
                  </Typography>
                </Box>
                <List>
                  {renderMenuItems()}
                  <ListItemButton onClick={handleLogout}>
                    <LogoutIcon />
                    <ListItemText primary="Log Out" />
                  </ListItemButton>
                </List>
                <ThemeSwitcher />
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: linkColor }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SportsIcon fontSize="large" />
                  <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                    {firstName && lastName ? `${firstName} ${lastName}` : sponsorName || 'User'}
                  </Typography>
                </Box>
              </Link>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: 'flex', gap: 2 }}>
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
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
            </Box>
            <ThemeSwitcher />
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: drawerBackgroundColor,
                  color: linkColor,
                },
              }}
            >
              {renderMenuItems()}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
