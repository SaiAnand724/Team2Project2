import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Tooltip,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SportsIcon from '@mui/icons-material/Sports';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MailIcon from '@mui/icons-material/Mail';
import { useTheme as useAppTheme } from './ThemeProvider';

const Sidebar: React.FC = () => {
  const { darkMode } = useAppTheme();
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [role, setRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUserRole = () => {
      const storedUser = localStorage.getItem('loggedInUser');
      const storedSponsor = localStorage.getItem('loggedInSponsor');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setRole(userData.role);
      } else if (storedSponsor) {
        setRole('Sponsor');
      }
    };

    fetchUserRole();
  }, []);

  const sidebarBackgroundColor = darkMode ? '#173049' : '#91b8df';
  const iconColor = darkMode ? '#ffffff' : '#000000';

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: role === 'Player' ? '/player' : role === 'Manager' ? '/manager' : '/sponsor' },
    { text: 'Invite History', icon: <GroupIcon />, link: '/manager/invites', visible: role === 'Manager' },
    { text: 'Proposals', icon: <MailIcon />, link: role === 'Player' ? '/user/teaminvites' : role === 'Manager' ? '/manager/proposals-hist' : '/sponsor/proposals-hist' },
    { text: 'Team Members', icon: <GroupIcon />, link: '/manager/teammembers', visible: role === 'Manager' },
    { text: 'Sponsorships', icon: <AttachMoneyIcon />, link: '/player/sponsorships', visible: role === 'Player' },
    { text: 'Create Proposal', icon: <MailIcon />, link: '/newsponsorproposal', visible: role === 'Sponsor' },
    { text: 'Create Invite', icon: <MailIcon />, link: '/newteaminv', visible: role === 'Manager' },
    { text: 'Show All', icon: <GroupIcon />, link: '/show-all', visible: role === 'Player' },
    { text: 'Affiliates - Teams', icon: <GroupIcon />, link: '/affiliates', visible: role === 'Sponsor' },
  ];

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      PaperProps={{
        sx: {
          backgroundColor: sidebarBackgroundColor,
          color: iconColor,
          overflowX: 'hidden',
          transition: 'width 0.3s',
          width: expanded ? 200 : 60,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '64px',
          backgroundColor: sidebarBackgroundColor,
          color: iconColor,
        }}
      >
        <SportsIcon fontSize="large" />
      </Box>
      <List>
        {menuItems.map(
          (item, index) =>
            item.visible !== false && (
              <Tooltip title={expanded ? '' : item.text} placement="right" key={index}>
                <ListItemButton 
                  component={Link} 
                  to={item.link} 
                  sx={{ 
                    px: 2, 
                    my: 1, // Added vertical margin for spacing
                  }}
                >
                  <ListItemIcon sx={{ color: iconColor }}>
                    {item.icon}
                  </ListItemIcon>
                  {expanded && <ListItemText primary={item.text} />}
                </ListItemButton>
              </Tooltip>
            )
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
