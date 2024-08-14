import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar as BootstrapNavbar, Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from './ThemeProvider';

const Navbar: React.FC = () => {
  const { darkMode } = useTheme();
  const navbarClass = darkMode ? 'navbar-dark-theme' : 'navbar-light-theme';
  const linkColor = darkMode ? '#ffffff' : '#000000';

  return (
    <BootstrapNavbar className={navbarClass} expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" style={{ color: linkColor }}>Name?</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Dashboard" style={{ color: linkColor }}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/other" style={{ color: linkColor }}>Other</Nav.Link>
            <Nav.Link as={Link} to="/other" style={{ color: linkColor }}>Other</Nav.Link>

          </Nav>
    
          <Nav.Link as={Link} to="" style={{ color: linkColor,  marginRight:30}}>Log Out</Nav.Link>
          <ThemeSwitcher />
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
