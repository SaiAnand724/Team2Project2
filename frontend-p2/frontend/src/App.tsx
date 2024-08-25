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

import { SponsorDashboard } from './Components/SponsorComponents/SponsorDashboard';
import { CreateProposalForm } from './Components/SponsorComponents/SponsorProposal';
import { CreateTeamInviteForm } from './Components/PlayerComponents/PlayerInvite';
import { PlayerDashboard } from './Components/PlayerComponents/PlayerDashboard';


const App: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <Navbar />
      <main className="">
        <Routes>
          <Route path="/" element={<AuthSelector/>}/>
          <Route path="/register" element={<RegisterUserForm/>}/>

          <Route path="/sponsor" element={<SponsorDashboard/>}/>
          <Route path='/player' element={<PlayerDashboard/>}/>
          {/* Sponsor Routes
        <Route path="/proposals" element={<SponsorProposals />} />
        <Route path="/affiliates" element={<Affiliates />} />
        <Route path="/show-all" element={<ShowAll />} />
        <Route path="/send-proposals" element={<SponsorProposal />} />
        <Route path="/profile" element={<SponsorDetails />} />

          */}
          {/* Team Manager Routes
          
          */}
          {/* Player Routes
          
          */}

          <Route path="/newsponsorproposal" element={<CreateProposalForm/>}/>
          <Route path="/newteaminv" element={<CreateTeamInviteForm/>}/>

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
