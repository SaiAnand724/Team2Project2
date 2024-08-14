import React from 'react';
import { useTheme } from './ThemeProvider';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const ThemeSwitcher: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="themeSwitcher"
        checked={darkMode}
        onChange={toggleTheme}
      />
      <label className="form-check-label" htmlFor="themeSwitcher">
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </label>
    </div>
  );
};

export default ThemeSwitcher;
