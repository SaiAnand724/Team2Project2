import React from 'react';
import { ThemeProvider, useTheme } from './Components/UtilityComponents/ThemeProvider';
import Navbar from './Components/UtilityComponents/Navbar';
import Footer from './Components/UtilityComponents/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <Navbar />
      <main className="content">
        {/* Add Components as they are completed */}
      </main>
      <Footer />
    </div>
  );
}

const AppWrapper: React.FC = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWrapper;
