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
        <ThemeSwitcher />
      </Box>

      {/* Logo and Brand Name at the top center */}
      <Box
        sx={{
          position: 'absolute',
          top: isMobile ? 16 : 24,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          mb: isMobile ? 8 : 10, // Increased margin on mobile
        }}
      >
        <img 
          src='apple-touch-icon.png' 
          alt="Brand Logo" 
          style={{ 
            width: isMobile ? '80px' : '160px', 
            height: isMobile ? '80px' : '160px' 
          }} 
        />
        <Typography 
          variant={isMobile ? 'h5' : 'h4'} 
          component="div"
          sx={{
            mt: 2, 
            lineHeight: isMobile ? 1.3 : 1.5,
            padding: '0 16px', 
            fontSize: isMobile ? '1.25rem' : '1.75rem', 
            fontWeight: 'bold', 
            whiteSpace: 'nowrap', 
          }}
        >
          Sponsor Sponsorship Management System
        </Typography>
      </Box>

      {/* Blue border container */}
      <Box
        sx={{
          padding: 2, 
          border: `20px solid blue`, 
          borderRadius: '8px', 
          mt: isMobile ? 24 : 32, 
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
                  fontSize: '200px', 
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
              <RequestQuoteOutlined
                sx={{
                  fontSize: '200px'
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
