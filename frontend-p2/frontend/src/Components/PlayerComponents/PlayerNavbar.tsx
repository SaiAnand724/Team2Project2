import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, List, ListItemText, IconButton, ListItemButton, Divider, Container} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import styled from '@mui/material/styles/styled';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 290;

const DrawerContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `calc(100% - ${drawerWidth}px)`,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `0%`,
    height: `40%`,
    marginRight: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const PlayerNavbar: React.FC = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
    {/* CSSBaseLine      
    <CssBaseline /> 
    */}


      {/* AppBar */}
      <AppBar position="static" open={drawerOpen}>
        <Toolbar sx={{mr: 0}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 0, ...(drawerOpen && { display: 'none' }) }}
          >
            <MenuOpenIcon />
            <h4 style={{ marginLeft: "10px" }}>Player Dashboard</h4>
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '64px', // Adjust according to your Navbar height
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItemButton component={Link} to="/player">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component={Link} to="/team/invites">
            <ListItemText primary="Team Invites" />
          </ListItemButton>
          <ListItemButton component={Link} to="/playersponsorships">
            <ListItemText primary="Sponsorships" />
          </ListItemButton>
          <ListItemButton component={Link} to="/show-all">
            <ListItemText primary="Show All" />
          </ListItemButton>

        </List>
      </Drawer>

      {/* Main Content */}
      <DrawerContent open={drawerOpen} >
      </DrawerContent>
    </Box>          
  );
};

