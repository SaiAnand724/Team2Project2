import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { store } from '../../globalStore/store';

type Team = {
  teamId: string;
  teamName: string;
};

const TeamCreate: React.FC = () => {


  const playerURL = `${store.backendURL}/user`;


  const [team, setTeam] = useState<Team | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamBalance, setNewTeamBalance] = useState(1000); // Balance state with a default value
  const [updateTeamName, setUpdateTeamName] = useState('');
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeamFromLocalStorage();
  }, []);

  const fetchTeamFromLocalStorage = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user.teamName === "None") {
        setTeam(null);
      } else if (user.teamName) {
        setTeam({ teamId: user.userId, teamName: user.teamName });
        setUpdateTeamName(user.teamName);
      }
    }
  };

  const getToken = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser).jwt : '';
  };

  const createTeam = async () => {
    try {
      console.log('Creating team with:', {
        teamName: newTeamName,
        balance: newTeamBalance
      });


      const response = await axios.post(`${store.backendURL}/team`, {

        teamName: newTeamName,
        balance: newTeamBalance
      }, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Team created:', response.data);

      const newTeam = response.data;
      setTeam(newTeam);
      updateLocalStorageTeam(newTeam);
      setCreateMode(false);
    } catch (error) {
      console.error('Error creating team:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert('Bad Request: Ensure the team name is unique and valid.');
        } else if (error.response?.status === 403) {
          alert('You are not authorized to create this team. Please log in.');
        } else {
          alert(error.response?.data || 'An error occurred while creating the team.');
        }
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  const updateTeam = async () => {
    try {
      if (team) {

        const response = await axios.patch(`${store.backendURL}/team/name/${updateTeamName}`, {}, {

          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          }
        });

        const updatedTeam = { ...team, teamName: updateTeamName };
        setTeam(updatedTeam);
        updateLocalStorageTeam(updatedTeam);
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error updating team:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert('Bad Request: Ensure the team name is unique and valid.');
        } else if (error.response?.status === 403) {
          alert('You are not authorized to update this team. Please log in.');
        } else {
          alert(error.response?.data || 'An error occurred while updating the team.');
        }
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  const updateLocalStorageTeam = (team: Team) => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      user.teamName = team.teamName;
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    }
  };

  return (
    <div>

      <Paper style={{width: 250, height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>

          <img
            src='images/team.png' 
            alt="Team Logo"
            style={{
              marginRight: 16,
              width: 120, 
              height: 120, 
              borderRadius: '10%', 
              border: '5px solid #3f51b5',
              padding:'8px' 

            }}
          />
    
        {team ? (
          <div>
            <Typography variant="h6" style={{ marginBottom: 16 }}>
              Current Team: {team.teamName}
            </Typography>

            {!editMode && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditMode(true)}

                style={{ marginBottom: 16, textAlign: 'center' }}

              >
                Update Team Name
              </Button>
            )}

            {editMode && (
              <div style={{ marginBottom: 16 }}>
                <TextField
                  label="New Team Name"
                  value={updateTeamName}
                  onChange={(e) => setUpdateTeamName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}

                  style={{ marginBottom: 16, textAlign: 'center' }}

                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={updateTeam}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setEditMode(false)}
                  style={{ marginLeft: 8 }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        ) : (
          !createMode && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCreateMode(true)}

              style={{ marginBottom: 16, textAlign: 'center' }}

            >
              Create Team
            </Button>
          )
        )}

        {createMode && (
          <div style={{ marginBottom: 16 }}>
            <TextField
              label="Team Name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}

              style={{ marginBottom: 16, textAlign: 'center' }}

            />
            <TextField
              label="Initial Balance"
              type="number"
              value={newTeamBalance}
              onChange={(e) => setNewTeamBalance(Number(e.target.value))}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: 16 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={createTeam}
            >
              Create
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setCreateMode(false)}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </Button>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default TeamCreate;
