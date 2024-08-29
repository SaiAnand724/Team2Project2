import React, { useState, useEffect } from 'react';
import { Container, Button, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const CreateProposalForm: React.FC = () => {
  const [proposal, setProposal] = useState({
    receiverTeam: {teamId: ""},
    amount: 0,
    status: "Pending"
  });

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const r = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "")
    console.log(r.jwt)
    axios.get('http://localhost:8080/allteams', {
      headers: {
        'Authorization': `Bearer ${r.jwt}`,
        'Content-Type': 'application/json'
      },
    })
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
            [name]: name === "amount" ? parseFloat(value as string): value,
          }));
    }
  };

  const handleTeamChange = (event: { target: { value: string; }; }) => {
    const selectedTeamId = event.target.value;
    setSelectedTeam(event.target.value);
    setProposal(prevState => ({
      ...prevState,
      receiverTeam: {teamId: selectedTeamId}
    }));
  };

  const sendSponsorProposal = async () => {
    try {
      const proposalToSend= {
        ...proposal,
        amount: Number(proposal.amount),
      }
      console.log("Sending proposal data: ", proposalToSend);
      const r = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "")
      console.log(r.jwt)
      const response = await axios.post("http://localhost:8080/sponsor/proposal", proposalToSend, {
        headers: {
          'Authorization': `Bearer ${r.jwt}`,
          'Content-Type': 'application/json'
        }
      });
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

