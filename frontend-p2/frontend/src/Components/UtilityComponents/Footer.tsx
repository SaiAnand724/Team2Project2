import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTheme as useAppTheme } from './ThemeProvider';

const Footer: React.FC = () => {
  const { darkMode } = useAppTheme();
  const theme = useTheme();
  const backgroundColor = darkMode ? '#173049' : '#91b8df';
  const color = darkMode ? '#fff' : '#000';

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: backgroundColor,
        color: color,
        textAlign: 'center',
        padding: '1rem',
        position: 'relative',
        width: '100%',
        mt: 'auto', // Ensures footer stays at the bottom of the page content
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: {
            xs: '0.75rem', // Small font size for extra-small screens
            sm: '0.875rem', // Slightly larger for small screens
            md: '1rem', // Default font size for medium and larger screens
          },
        }}
      >
        © 2024 Sports Sponsorship Management System. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
