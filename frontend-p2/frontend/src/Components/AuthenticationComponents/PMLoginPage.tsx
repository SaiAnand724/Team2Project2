import React from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Carousel from '../UtilityComponents/Carousel'; // Import the Carousel component
import axios from 'axios'; // Import axios for HTTP requests
import { useTheme as useCustomTheme } from '../UtilityComponents/ThemeProvider'; // Import your custom theme hook
import ThemeSwitcher from '../UtilityComponents/ThemeSwitcher';
import { ToastContainer, toast } from 'react-toastify'; // Import toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles
import { store } from '../../globalStore/store';

const PMLoginPage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation
  const { darkMode } = useCustomTheme(); // Use custom theme hook for dark mode
  const [isOverlayVisible, setOverlayVisible] = React.useState(window.innerWidth < 600);
  const [user, setUser] = React.useState({ username: '', password: '' });
  const [loading, setLoading] = React.useState(false);

  // Effect to handle resize event and toggle overlay visibility
  React.useEffect(() => {
    const handleResize = () => {
      setOverlayVisible(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to update user state on input change
  const storeValues = (input: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [input.target.name]: input.target.value }));
  };

  // Function to validate inputs before submission
  const validateInputs = () => {
    if (!user.username || !user.password) {
      toast.error('Username and password are required.');
      return false;
    }
    return true;
  };

  // Function to handle login request
  const login = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${store.backendURL}/auth/user/login`, user, { withCredentials: true });
      const userData = response.data;

      // Store user details in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(response.data));

      toast.success(`Welcome ${userData.username}! Login successful!`);

      setTimeout(() => {
        
      
      // Navigate based on user role
      if (userData.role === 'Manager') {
        navigate('/manager');
      } else if (userData.role === 'Player') {
        navigate('/player');
      } else {
        toast.error('Unknown user role. Please contact support.');
      }}, 1500)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toast.error('Bad Request: Please check your input and try again.');
              break;
            case 401:
              toast.error('Unauthorized: Incorrect username or password.');
              break;
            case 500:
              toast.error('Server Error: Please try again later.');
              break;
            default:
              toast.error('An unexpected error occurred. Please try again.');
          }
        } else if (error.request) {
          toast.error('Network Error: Please check your connection and try again.');
        } else {
          toast.error('Error: ' + error.message);
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login();
  };

  // Function to navigate back to user type selection page
  const handleBackToUserType = () => {
    navigate('/'); // Redirect to select user type page
  };

  const handleRegisterPage = () => {
    navigate('/pmregister');
  };

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } })}>
      <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          md={7}
          sx={{
            position: 'relative',
            height: '100%',
            width: '100%',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
          }}
        >
          <Carousel /> {/* Carousel component for visual effect */}
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
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
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
                  User Login
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
                    onChange={storeValues}
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
                    onChange={storeValues}
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
                        {"Back To User Type Selection"}
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
              User Login
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
                onChange={storeValues}
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
                onChange={storeValues}
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
                    {"Back To User Type Selection"}
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
          <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            p: 2,
          }}
        >
          <ThemeSwitcher /> {/* Theme switcher for toggling between light and dark themes */}
        </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default PMLoginPage;
