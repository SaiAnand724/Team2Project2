import React from 'react';
import { useTheme as useAppTheme } from './ThemeProvider';
import { Switch, FormControlLabel, Typography, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeSwitcher: React.FC = () => {
  const { darkMode, toggleTheme } = useAppTheme();
  
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
        label={<Typography style={{ color: labelColor }}>{darkMode ? <LightModeIcon /> : <DarkModeIcon />}</Typography>}
        sx={{ marginLeft: 2 }}
      />
    </Box>
  );
};

export default ThemeSwitcher;
