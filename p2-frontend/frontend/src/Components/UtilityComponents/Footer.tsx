import React from 'react';
import { useTheme } from './ThemeProvider';

const Footer: React.FC = () => {
  const { darkMode } = useTheme();
  const footerClass = darkMode ? 'footer-dark-theme' : 'footer-light-theme';

  return (
    <footer className={`footer ${footerClass}`}>
      <div className="container">
        <span>© 2024 SportsManagementApp. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
