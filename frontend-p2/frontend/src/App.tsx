import React from 'react';
import { ThemeProvider, useTheme } from './Components/UtilityComponents/ThemeProvider';
import Navbar from './Components/UtilityComponents/Navbar';
import Footer from './Components/UtilityComponents/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { RegisterUserForm } from './Components/AuthenticationComponents/RegisterForm';
import { AuthProvider } from './Components/AuthenticationComponents/AuthProvider';
import { AuthSelector } from './Components/AuthenticationComponents/AuthSelector';
import { CreateProposalForm } from './Components/ProposalComponents/ProposalForm';

const App: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<AuthSelector/>}/>
          <Route path="/register" element={<RegisterUserForm/>}/>
          <Route path="/newproposal" element={<CreateProposalForm/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

const AppWrapper: React.FC = () => (
  <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthProvider>
);

export default AppWrapper;
