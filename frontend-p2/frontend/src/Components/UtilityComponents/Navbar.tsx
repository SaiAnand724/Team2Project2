import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, useTheme, useMediaQuery, Drawer, List, ListItem, ListItemText, Box, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme as useAppTheme } from './ThemeProvider';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar: React.FC = () => {
  const { darkMode } = useAppTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navbarBackgroundColor = darkMode ? '#173049' : '#91b8df';
  const drawerBackgroundColor = darkMode ? '#173049' : '#91b8df'; // Match Drawer with AppBar
  const linkColor = darkMode ? '#ffffff' : '#000000';

  return (
    <>
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
                    backgroundColor: drawerBackgroundColor, // Set Drawer background
                    color: linkColor, // Set Drawer text color
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
                    <ListItemButton component={Link} to="" sx={{ color: linkColor }}>
                      <LogoutIcon />
                    </ListItemButton>
                  </List>
                </Box>
                <ThemeSwitcher />
              </Drawer>

            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 2 }}>
                <Typography variant="h6" component="div">
                  <Link to="/" style={{ textDecoration: 'none', color: linkColor }}>MyApp</Link>
                </Typography>
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
                  <Button component={Link} to="/Other" sx={{ color: linkColor }}>
                    Other
                  </Button>
                  <Button component={Link} to="" sx={{ color: linkColor }}>
                    Log Out
                  </Button>
                </Box>
              </Box>
              <ThemeSwitcher />
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
