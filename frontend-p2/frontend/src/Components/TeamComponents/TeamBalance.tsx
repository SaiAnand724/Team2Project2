import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { store, userStore } from "../../globalStore/store";
import axios from "axios";
import { TeamInterface } from "../../Interfaces/TeamInterface";

export const TeamBalanceInfo:React.FC = ({}) => {

    const [teamBalance, setTeamBalance] = useState(0)
    const [inviteAmountSpent, setinviteAmountSpent] = useState(0)
    const [managerSalary, setManagerSalary] = useState<number>(JSON.parse(localStorage.getItem('loggedInUser') ?? "").salary)

    const getTeamsURL = `${store.backendURL}/allteams`
    const managerInvitesURL = `${store.backendURL}/user/teaminvite/sent`


    useEffect(() => {
        //setManagerSalary()
        axios.get(getTeamsURL, {
            headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedInUser') ?? "").jwt}`
            }
          })
          .then(response => {
            const teams = response.data;
            teams.forEach((team:TeamInterface) => {
                if (team.teamName === JSON.parse(localStorage.getItem('loggedInUser') ?? "").teamName) {
                    setTeamBalance(team.balance)
                }
            })
            console.log(response.data);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });

          axios.get(managerInvitesURL, {
            headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedInUser') ?? "").jwt}`
            }
          })
          .then(response => {
            const invites: any[] = response.data
            const inviteSpent = invites.reduce((acc, invite) => acc + invite.amount, 0)
            setinviteAmountSpent(inviteSpent)
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
    }, []);
    
    return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Card>
        <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
            Overall Team Balance Info
            </Typography>
            <Typography variant="h6">
            Team Balance: <span style={{ fontStyle: 'italic' }}>${teamBalance}</span>
            </Typography>
            <Typography variant="h6">
            Invite Amount Spent: <span style={{ fontStyle: 'italic' }}>${inviteAmountSpent}</span>
            </Typography>

            <Typography variant="h5" component="div" gutterBottom mt={2}>
            Manager Salary
            </Typography>
            <Typography variant="h6">
            Salary: <span style={{ fontStyle: 'italic' }}>${managerSalary}</span>
            </Typography>
        </CardContent>
        </Card>
    </Box>
    );
}

{/*Functionality: Allows managers to send team invitations to players.
o	Endpoints:
	POST /team/proposal to send a team invite.

o	Functions:
	sendTeamInvite(playerId, teamId): Sends an invite to a player.
 */}