import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Carousel from '../UtilityComponents/Carousel';
import ThemeSwitcher from '../UtilityComponents/ThemeSwitcher';
import { useTheme as useCustomTheme } from '../UtilityComponents/ThemeProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function SLoginPage() {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [isOverlayVisible, setOverlayVisible] = React.useState(window.innerWidth < 600); // State to control overlay visibility
  const [user, setUser] = React.useState({ username: '', password: '' }); // State to store login credentials
  const [loading, setLoading] = React.useState(false); // State to manage loading state
  const { darkMode } = useCustomTheme(); // Custom hook to get current theme mode

  // Effect to handle window resize for responsive design
  React.useEffect(() => {
    const handleResize = () => setOverlayVisible(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle input field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // Function to handle login request
  const login = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post('http://localhost:8080/auth/sponsor/login', user, { withCredentials: true });

      // Store user details in localStorage upon successful login
      localStorage.setItem('loggedInSponsor', JSON.stringify(response.data));
      console.log(`Welcome ${response.data.name}! Login successful!`);
      navigate('/sponsor'); // Redirect to sponsor page
    } catch (error) {
      // Error handling
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400: console.log('Bad Request: Please check your input and try again.'); break;
            case 401: console.log('Unauthorized: Incorrect username or password.'); break;
            case 500: console.log('Server Error: Please try again later.'); break;
            default: console.log('An unexpected error occurred. Please try again.');
          }
        } else if (error.request) {
          console.log('Network Error: Please check your connection and try again.');
        } else {
          console.log('Error: ' + error.message);
        }
      } else {
        console.log('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(); // Call login function on form submit
  };

  // Function to navigate back to user type selection page
  const handleBackToUserType = () => {
    navigate('/'); // Redirect to select user type page
  };

  const handleRegisterPage = () => {
    navigate('/sregister');
  };

  // Create theme based on current darkMode state
  const theme = createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } });

  return (
    <ThemeProvider theme={theme}> {/* Provide theme to the component tree */}
      <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden' }}>
        <CssBaseline /> {/* Normalize CSS */}
        <Grid item xs={12} sm={6} md={7} sx={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
          <Carousel /> {/* Carousel component */}
          {isOverlayVisible && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                pointerEvents: 'none',
              }}
            >
              <Box
                component={Paper}
                elevation={6}
                square
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 4,
                  mx: 2,
                  maxWidth: 400,
                  width: '100%',
                  pointerEvents: 'auto',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sponsor Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={user.username}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={user.password}
                    onChange={handleChange}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2" onClick={handleBackToUserType}>
                        Back To User Type Selection
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2" onClick={handleRegisterPage}>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sponsor Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={user.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={handleBackToUserType}>
                    Back To User Type Selection
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleRegisterPage}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            p: 2,
          }}
        >
          <ThemeSwitcher /> {/* Component to switch between light and dark modes */}
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
