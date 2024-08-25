import React, { useState, useEffect } from 'react';
import { Container, Button, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateTeamInviteForm: React.FC = () => {
  const [invite, setInvite] = useState({
    amount: 0,
    userId: ""
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/http://database-1.c7gswqykq3l3.us-east-2.rds.amazonaws.com:5432/user/user')
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
            [name]: value,
          }));
    }
  };

  const handleTeamChange = (event: { target: { value: string; }; }) => {
    setSelectedUser(event.target.value);
    setInvite(prevState => ({
      ...prevState,
      teamId: event.target.value,
    }));
  };

  const sendTeamInvite = async () => {
    try {
      console.log("Sending proposal data: ", invite);
      const response = await axios.post("http://database-1.c7gswqykq3l3.us-east-2.rds.amazonaws.com:5432/user/teaminvite", invite);
      console.log(response.data);
      alert("Invite was created!");
      navigate("/player");
    } catch (error) {
      console.error("Error: ", error);
      alert("Adding Invite Failed! Error message: " + error);
    }
  };

  return (
    <Container className="create-proposal-container">
      <h1> LOGO </h1>
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
        <InputLabel id="team-select-label">Select Team</InputLabel>
        <Select
          labelId="team-select-label"
          id="team-select"
          value={selectedUser}
          onChange={handleTeamChange}
          label="Select Team"
        >
          {users.map((team: any) => (
            <MenuItem key={team.teamId} value={team.teamId}>
              {team.teamName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={sendTeamInvite}>Submit</Button>
    </Container>
  );
};
