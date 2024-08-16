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
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2">
        © 2024 SportsManagementApp. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
