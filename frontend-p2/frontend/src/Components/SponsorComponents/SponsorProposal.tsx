import React, { useState, useEffect } from 'react';
import { Container, Button, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateProposalForm: React.FC = () => {
  const [proposal, setProposal] = useState({
    amount: 0,
    category: "",
    teamId: ""
  });

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/http://database-1.c7gswqykq3l3.us-east-2.rds.amazonaws.com:5432/team')
      .then(response => {
        setTeams(response.data);
      })
      .catch((error: any) => {
        console.error('Error fetching teams: ', error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown; }>) => {
    const { name, value } = e.target;
    if(name) {
        setProposal(prevState => ({
            ...prevState,
            [name]: value,
          }));
    }
  };

  const handleTeamChange = (event: { target: { value: string; }; }) => {
    setSelectedTeam(event.target.value);
    setProposal(prevState => ({
      ...prevState,
      teamId: event.target.value,
    }));
  };

  const sendSponsorProposal = async () => {
    try {
      console.log("Sending proposal data: ", proposal);
      const response = await axios.post("http://database-1.c7gswqykq3l3.us-east-2.rds.amazonaws.com:5432/proposal", proposal);
      console.log(response.data);
      alert("Proposal was created!");
      navigate("/player");
    } catch (error) {
      console.error("Error: ", error);
      alert("Adding Proposal Failed! Error message: " + error);
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
        value={proposal.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Category"
        name="category"
        placeholder="Category"
        value={proposal.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="team-select-label">Select Team</InputLabel>
        <Select
          labelId="team-select-label"
          id="team-select"
          value={selectedTeam}
          onChange={handleTeamChange}
          label="Select Team"
        >
          {teams.map((team: any) => (
            <MenuItem key={team.teamId} value={team.teamId}>
              {team.teamName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={sendSponsorProposal}>Submit</Button>
    </Container>
  );
};