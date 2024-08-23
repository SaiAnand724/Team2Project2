import React from 'react';
import { Box, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import ThemeSwitcher from '../UtilityComponents/ThemeSwitcher'; // Importing the ThemeSwitcher component
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';

// Styled component for the circular user type box
const UserTypeBox = ({ onClick, imageSrc, label }: { onClick: () => void; imageSrc: string; label: string }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: isMobile ? '200px' : '300px',
        width: isMobile ? '200px' : '300px',
        borderRadius: '10%', // Makes the box circular
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: `0px 4px 6px rgba(0, 0, 0, 0.1)`,
        border: `2px solid ${theme.palette.divider}`,
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <img
        src={imageSrc}
        alt={label}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Ensure image covers the box area
      />
    </Box>
  );
};

const AuthSelector = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        px: 2,
      }}
    >
      {/* ThemeSwitcher positioned in the top-right corner */}
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <ThemeSwitcher />
      </Box>

      {/* Blue border container */}
      <Box
        sx={{
          padding: 2, // Padding around the border
          border: `20px solid blue`, // Blue border
          borderRadius: '8px', // Optional: rounded corners for the border
        }}
      >
        {/* Main Content */}
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant={isMobile ? "h5" : "h4"} component="h1" gutterBottom>
              Log In as:
            </Typography>
          </Grid>
          <Grid item>
            <UserTypeBox onClick={() => navigate('/pm-login')} imageSrc="/images/Player.png" label="Player or Manager" />
            <Typography variant="h6" mt={2}>
              Player or Manager
            </Typography>
          </Grid>
          <Grid item>
            <UserTypeBox onClick={() => navigate('/s-login')} imageSrc="/images/Sponsor.png" label="Sponsor" />
            <Typography variant="h6" mt={2}>
              Sponsor
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AuthSelector;
