import React from 'react';
import { ThemeProvider, useTheme } from './Components/UtilityComponents/ThemeProvider';
import Navbar from './Components/UtilityComponents/Navbar';
import Footer from './Components/UtilityComponents/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { RegisterUserForm } from './Components/AuthenticationComponents/RegisterUserForm';
import { AuthProvider } from './Components/AuthenticationComponents/AuthProvider';
import AuthSelector from "./Components/AuthenticationComponents/AuthSelector";

import { SponsorDashboard } from './Components/SponsorComponents/SponsorDashboard';
import { CreateProposalForm } from './Components/SponsorComponents/SponsorProposal';
import { CreateTeamInviteForm } from './Components/PlayerComponents/PlayerInvite';
import { PlayerDashboard } from './Components/PlayerComponents/PlayerDashboard';

//import PlayerDashboard from './Components/PlayerComponents/PlayerDashboard'

import PMLoginPage from './Components/AuthenticationComponents/PMLoginPage';
import SLoginPage from './Components/AuthenticationComponents/SLoginPage';

const App: React.FC = () => {
  const { darkMode } = useTheme();
  const location = useLocation();

  // Define paths where Navbar and Footer should not be displayed
  const noNavbarPaths = ['/pm-login', '/s-login', '/register', '/'];
  const noFooterPaths = ['/pm-login', '/s-login', '/register', '/']; // Add paths as needed

  // Check if the current route should not have Navbar or Footer
  const showNavbar = !noNavbarPaths.includes(location.pathname);
  const showFooter = !noFooterPaths.includes(location.pathname);

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      {showNavbar && <Navbar />}
      <main > {/*keeps the footer on the bottom of the page*/}
        <Routes>

          <Route path="/" element={<AuthSelector />} />
          <Route path="/register" element={<RegisterUserForm />} />
          <Route path="/pm-login" element={<PMLoginPage />} />
          <Route path="/s-login" element={<SLoginPage />} />
          <Route path="/sponsor" element={<SponsorDashboard />} />
          {/*<Route path="/player" element={<PlayerDashboard/>}/>*/}
          <Route path="/newproposal" element={<CreateProposalForm />} />
          {/* Additional routes can be added here */}

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
      {showFooter && <Footer />}
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
