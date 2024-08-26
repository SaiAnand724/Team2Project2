import React from 'react';
import { Box, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PersonOutlined, RequestQuoteOutlined } from '@mui/icons-material';
import ThemeSwitcher from '../UtilityComponents/ThemeSwitcher';

const AuthSelector: React.FC = () => {
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
        {/* Ensure ThemeSwitcher is working correctly */}
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
            <Typography variant={isMobile ? 'h5' : 'h4'} component="h1" gutterBottom>
              Log In as:
            </Typography>
          </Grid>
          <Grid item>
            <Box
              onClick={() => navigate('/pm-login')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: isMobile ? '200px' : '300px',
                width: isMobile ? '200px' : '300px',
                borderRadius: '8px',
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
              <PersonOutlined
                sx={{
                  fontSize: '200px', // Adjust icon size as needed
                }}
              />
            </Box>
            <Typography variant="h6" mt={2}>
              Player or Manager
            </Typography>
          </Grid>
          <Grid item>
            <Box
              onClick={() => navigate('/s-login')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: isMobile ? '200px' : '300px',
                width: isMobile ? '200px' : '300px',
                borderRadius: '8px', // Makes the box circular
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
              <RequestQuoteOutlined
                sx={{
                  fontSize: '200px'// Adjust icon size as needed
                }}
              />
            </Box>
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
