import React, { useState, useEffect } from 'react';
import { Container, Button, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateTeamInviteForm: React.FC = () => {
  const [invite, setInvite] = useState({
    amount: 0,
    receiverPlayerId: {userId: ""}
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/user/all')
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
      receiverPlayerId: {userId: selectedUserId},
    }));
  };

  const sendTeamInvite = async () => {
    try {
      const jwt = JSON.parse(localStorage.getItem('loggedInUser') ?? "")
      const userResponse = await axios.get(`http://localhost:8080/user/${invite.receiverPlayerId.userId}`, {
        headers: {
          Authorization: `${jwt.jwt}`
        }
      });
      const receiverPlayer = userResponse.data; // Full User object
      const inviteToSend = {
        ...invite,
        receiverPlayerId: receiverPlayer,
        amount: Number(invite.amount),
      }
      console.log("Sending invite data: ", inviteToSend);
      const response = await axios.post("http://localhost:8080/user/teaminvite", inviteToSend, {
        headers: {
          Authorization: `${jwt.jwt}`,
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
      <Button variant="contained" onClick={sendTeamInvite}>Submit</Button>
    </Container>
  );
};
