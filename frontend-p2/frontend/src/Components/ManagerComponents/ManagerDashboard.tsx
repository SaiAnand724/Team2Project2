import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Paper,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Placeholder components for recent activities and notifications
const PlaceholderCard: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <Paper sx={{ p: 2, mb: 2 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1">{content}</Typography>
  </Paper>
);

const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Retrieve logged-in user information from localStorage
  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

  // Guard to ensure only "Manager" role users can access this component
  if (user.role !== 'Manager') {
    // Optionally, navigate to a different page if the user is not a "Manager"
    navigate('/'); // Redirect to home or another page
    return null; // Prevent rendering the component
  }

  // Concatenate first and last names
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`;

  return (
    <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* Replace with your own icon */}
            <Typography variant="h4">{user.username.charAt(0)}</Typography>
          </Avatar>
          <Typography component="h1" variant="h5">
            <strong>Name:</strong> {fullName}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {user.role}
          </Typography>
          <Typography variant="body1">
            <strong>Team:</strong> {user.team || 'Not assigned'}
          </Typography>
          <Typography variant="body1">
            <strong>Salary:</strong> ${user.salary || 'Not available'}
          </Typography>

          <Box sx={{ mt: 4, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <PlaceholderCard
              title="Recent Activities"
              content="You have no recent activities."
            />

            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <PlaceholderCard
              title="Notifications"
              content="You have no new notifications."
            />
          </Box>

        </Box>
      </Grid>
    </Grid>
  );
};

export default ManagerDashboard;
