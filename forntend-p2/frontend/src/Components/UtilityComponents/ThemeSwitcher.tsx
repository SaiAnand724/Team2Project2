import React from 'react';
import { useTheme as useAppTheme } from './ThemeProvider';
import { Switch, FormControlLabel, useTheme, Typography, Box } from '@mui/material';

const ThemeSwitcher: React.FC = () => {
  const { darkMode, toggleTheme } = useAppTheme();
  const theme = useTheme();
  
  // Define colors based on the theme
  const switchColor = darkMode ? '#ffffff' : '#000000';
  const labelColor = darkMode ? '#ffffff' : '#000000';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={toggleTheme}
            sx={{
              '& .MuiSwitch-thumb': {
                backgroundColor: switchColor,
              },
              '& .MuiSwitch-track': {
                backgroundColor: switchColor,
              },
            }}
          />
        }
        label={<Typography style={{ color: labelColor }}>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</Typography>}
        sx={{ marginLeft: 2 }}
      />
    </Box>
  );
};

export default ThemeSwitcher;
