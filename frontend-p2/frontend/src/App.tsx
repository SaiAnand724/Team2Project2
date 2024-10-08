import React from "react";
import { ThemeProvider, useTheme } from "./Components/UtilityComponents/ThemeProvider";
import Navbar from "./Components/UtilityComponents/Navbar";
import Footer from "./Components/UtilityComponents/Footer";
import Sidebar from "./Components/UtilityComponents/Sidebar"; // Import Sidebar
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { RegisterUserForm } from "./Components/AuthenticationComponents/RegisterUserForm";
import { AuthProvider } from "./Components/AuthenticationComponents/AuthProvider";
import AuthSelector from "./Components/AuthenticationComponents/AuthSelector";
import { SponsorDashboard } from "./Components/SponsorComponents/SponsorDashboard";
import { CreateProposalForm } from "./Components/SponsorComponents/SponsorProposal";
import { CreateTeamInviteForm } from "./Components/PlayerComponents/PlayerInvite";
import { PlayerDashboard } from "./Components/PlayerComponents/PlayerDashboard";
import PMLoginPage from "./Components/AuthenticationComponents/PMLoginPage";
import SLoginPage from "./Components/AuthenticationComponents/SLoginPage";
import { SponsorshipList } from "./Components/SponsorComponents/SponsorshipList";
import { SponsorDetails } from "./Components/SponsorComponents/SponsorProposalHist";
import { ManagerDashboard } from "./Components/TeamComponents/ManagerDashboard";
import { TeamInviteContainer } from "./Components/PlayerComponents/TeamInviteContainer";
import { SponsorshipContainer } from "./Components/PlayerComponents/SponsorshipContainer";
import RegisterUserPage from "./Components/AuthenticationComponents/RegisterUserPage";
import RegisterSponsorPage from "./Components/AuthenticationComponents/RegisterSponsorPage";
import { TeamMembersContainer } from "./Components/TeamComponents/TeamMembersContainer";
import { TeamProposalsHist } from "./Components/TeamComponents/TeamProposalsHist";
import { TeamInviteHist } from "./Components/TeamComponents/TeamInviteHist";

const App: React.FC = () => {
  const { darkMode } = useTheme();
  const location = useLocation();

  // Define paths where Navbar, Footer, and Sidebar should not be displayed
  const noNavbarPaths = [
    "/pm-login",
    "/s-login",
    "/sregister",
    "/pmregister",
    "/",
  ];
  const noFooterPaths = [
    "/pm-login",
    "/s-login",
    "/sregister",
    "/pmregister",
    "/",
  ]; // Add paths as needed
  const noSidebarPaths = [
    "/pm-login",
    "/s-login",
    "/sregister",
    "/pmregister",
    "/",
  ]; // Add paths where Sidebar should not be displayed

  // Check if the current route should not have Navbar, Footer, or Sidebar
  const showNavbar = !noNavbarPaths.includes(location.pathname);
  const showFooter = !noFooterPaths.includes(location.pathname);
  const showSidebar = !noSidebarPaths.includes(location.pathname);

  return (
    <div className={`app-container ${darkMode ? "dark-theme" : "light-theme"}`}>
      {showNavbar && <Navbar />}
      {showSidebar && <Sidebar />} {/* Conditionally render Sidebar */}
      <main>
        <Routes>
          <Route path="/" element={<AuthSelector />} />
          <Route path="/pm-login" element={<PMLoginPage />} />
          <Route path="/s-login" element={<SLoginPage />} />
          <Route path="pmregister" element={<RegisterUserPage />} />
          <Route path="sregister" element={<RegisterSponsorPage />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/newproposal" element={<CreateProposalForm />} />
          {/* Sponsor Routes */}
          <Route path="/sponsor" element={<SponsorDashboard />} />
          <Route path="/affiliates" element={<SponsorshipList teams={[]} sponsTeams={[]} />} />
          <Route path="/sponsor/proposals-hist" element={<SponsorDetails proposals={[]} />} />
          <Route path="/newsponsorproposal" element={<CreateProposalForm />} />
          {/* Team Manager Routes */}
          <Route path="/manager/teammembers" element={<TeamMembersContainer />} />
          <Route path="/manager/invites" element={<TeamInviteHist />} />
          <Route path="/manager/proposals-hist" element={<TeamProposalsHist proposals={[]}/>} />
          <Route path="/newteaminv" element={<CreateTeamInviteForm />} />
          {/* Player Routes */}
          <Route path="/player" element={<PlayerDashboard />} />
          <Route path="/player/team/invites" element={<TeamInviteContainer />} />
          <Route path="/player/sponsorships" element={<SponsorshipContainer />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthProvider>
);

export default AppWrapper;
