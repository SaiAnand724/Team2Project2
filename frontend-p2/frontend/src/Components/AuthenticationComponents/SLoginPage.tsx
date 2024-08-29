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
import { ToastContainer, toast } from 'react-toastify'; // Import toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import default styles

export default function SLoginPage() {
  const navigate = useNavigate();
  const [isOverlayVisible, setOverlayVisible] = React.useState(window.innerWidth < 600);
  const [user, setUser] = React.useState({ username: '', password: '' });
  const [loading, setLoading] = React.useState(false);
  const { darkMode } = useCustomTheme();

  React.useEffect(() => {
    const handleResize = () => setOverlayVisible(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/auth/sponsor/login', user, { withCredentials: true });
      const { userId, username, name, role } = response.data;

      localStorage.setItem('loggedInSponsor', JSON.stringify({ userId, username, name, role }));
      toast.success(`Welcome ${username}! Login successful!`);

      setTimeout(() => {
        navigate('/sponsor');
      }, 3000);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login();
  };

  const handleBackToUserType = () => {
    navigate('/');
  };

  const handleRegisterPage = () => {
    navigate('/sregister');
  };

  const theme = createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden' }}>
        <CssBaseline />
        <Grid item xs={12} sm={6} md={7} sx={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
          <Carousel />
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
              Sponsor Sign In
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
          <ThemeSwitcher />
        </Box>
      </Grid>
      <ToastContainer /> {/* Include ToastContainer to display toast notifications */}
    </ThemeProvider>
  );
}
