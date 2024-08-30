import React, { useState, useEffect } from 'react';
import { Container, Button, MenuItem, Select, FormControl, InputLabel, TextField, Card, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateTeamInviteForm: React.FC = () => {
  const [invite, setInvite] = useState({
    amount: 100,
    receiverPlayer: { userId: "" }
    }
  );

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "")
    axios.get('http://localhost:8080/user/all', {
      headers: {
        'Authorization': `Bearer ${r.jwt}`
      }
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch((error: any) => {
        console.error('Error fetching users: ', error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown; }>) => {
    const { name, value } = e.target;
    if(name) {
        setInvite(prevState => ({
            ...prevState,
            [name]: name === "amount" ? parseFloat(value as string): value,
          }));
    }
  };

  const handlePlayerChange = (event: { target: { value: string; }; }) => {
    const selectedUserId = event.target.value;
    setSelectedUser(event.target.value);
    setInvite(prevState => ({
      ...prevState,
      receiverPlayer: {userId: selectedUserId},
    }));
  };

  const sendTeamInvite = async () => {
    try {
      const inviteToSend = {
        ...invite,
        amount: Number(invite.amount),
      }
      console.log("Sending proposal data: ", inviteToSend);
      const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "")
      const response = await axios.post("http://localhost:8080/user/teaminvite", {"amount": 200, 
            "receiverPlayer" :{
                "userId": "8f34bf3f-0b4a-4ae5-a60a-106ac9429e41"
            }}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${r.jwt}`
        },
      });
      console.log(response.data);
      alert("Invite was created!");
      navigate("/player");
    } catch (error) {
      console.error("Error: ", error);
      alert("Adding Invite Failed! Error message: " + error);
    }
  };

  return (
    <Container>
    <Card  sx={{ margin: '20px', padding: '20px', paddingBottom: '30px'}}>
      <Container className="create-proposal-container" sx={{ mb: 2 }}>
      <Box margin="5%" display="flex" justifyContent="center" alignItems="center" mb={2}>
        <img 
          src="../../../apple-touch-icon.png" 
          alt="Logo" 
          style={{ width: '100px', height: 'auto' }} 
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Typography variant="h5" component="h2" align="center">
            Team Invite Form
          </Typography>
      </Box>
      <TextField
        type="number"
        label="Amount"
        name="amount"
        placeholder="Amount"
        value={invite.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="team-select-label">Select Player</InputLabel>
        <Select
          labelId="team-select-label"
          id="team-select"
          value={selectedUser}
          onChange={handlePlayerChange}
          label="Select User"
        >
          {users.map((user: any) => (
            <MenuItem key={user.userId} value={user.userId}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={sendTeamInvite} sx={{ mt: '20px' }}>Submit</Button>
    </Container>
    </Card>
    </Container>
  );
};
