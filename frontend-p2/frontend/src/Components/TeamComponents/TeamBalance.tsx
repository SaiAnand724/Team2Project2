import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { userStore } from "../../globalStore/store";

export const TeamBalanceInfo:React.FC = ({}) => {

    const [teamBalance, setTeamBalance] = useState(40000)
    const [inviteAmountSpent, setinviteAmountSpent] = useState(500)
    const [managerSalary, setManagerSalary] = useState<number>(10000)


    useEffect(() => {
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