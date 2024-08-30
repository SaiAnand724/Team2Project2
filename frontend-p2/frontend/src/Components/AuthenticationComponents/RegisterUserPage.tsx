import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useTheme as useCustomTheme } from '../UtilityComponents/ThemeProvider';
import ThemeSwitcher from '../UtilityComponents/ThemeSwitcher';
import { createTheme, ThemeProvider, Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../../globalStore/store';

const RegisterPage: React.FC = () => {
  const { darkMode } = useCustomTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Separate handlers for TextField and Select components
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${store.backendURL}/user/create`, user);
      console.log('User registered successfully:', response.data);

      toast.success('Registration successful! Taking you to the login page...');
      setTimeout(() => {
        navigate('/pm-login');
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data || 'An unexpected error occurred.';
        setError(message.toString());
        toast.error(message.toString());
      } else {
        setError('An unexpected error occurred.');
        toast.error('An unexpected error occurred.');
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
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={user.firstName}
                onChange={handleTextFieldChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={user.lastName}
                onChange={handleTextFieldChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={user.username}
                onChange={handleTextFieldChange}
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
                onChange={handleTextFieldChange}
              />
              <Select
                fullWidth
                required
                id="role"
                name="role"
                value={user.role}
                onChange={handleSelectChange}
                label="Role"
              >
                <MenuItem value="Player">Player</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
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
                  <Link to="/pm-login" style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default RegisterPage;
