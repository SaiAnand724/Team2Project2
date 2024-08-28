import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useTheme as useCustomTheme } from '../UtilityComponents/ThemeProvider';
import ThemeSwitcher from '../UtilityComponents/ThemeSwitcher';
import { createTheme, ThemeProvider, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SponsorRegisterPage: React.FC = () => {
  const { darkMode } = useCustomTheme(); // Use custom theme hook for dark mode
  const navigate = useNavigate();
  const [sponsor, setSponsor] = useState({
    username: '',
    password: '',
    category: '',
    name: '',
    budget: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSponsor(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/sponsor/create', sponsor);
      console.log('Sponsor registered successfully:', response.data);

      // Show toast and redirect after delay
      toast.success('Registration successful, taking you to login page...');
      setTimeout(() => {
        navigate('/s-login');
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data || 'An unexpected error occurred.';
        setError(message.toString());
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const theme = createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <CssBaseline />
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <ThemeSwitcher />
        </Box>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sponsor Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Sponsor Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={sponsor.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={sponsor.username}
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
                value={sponsor.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="category"
                label="Category"
                id="category"
                value={sponsor.category}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="budget"
                label="Budget"
                type="number"
                id="budget"
                value={sponsor.budget}
                onChange={handleChange}
              />
              {error && <Typography color="error" variant="body2">{error}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={() => navigate('/s-login')}>
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <ToastContainer />
      </Grid>
    </ThemeProvider>
  );
};

export default SponsorRegisterPage;
