import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"


{/* Functionality: Allows managers to invite players to a team.
o	Endpoints:
	POST /team/proposal to send a team invite.

o	Functions:
	sendPlayerInvite(playerId, teamId): Sends an invite to a player.
*/}

export const CreateTeamInviteForm: React.FC = () => {
    const navigate = useNavigate();

    return <Container className="create-team-invite-container">
        <h1> LOGO </h1>
        <input type="number" name="invAmount" placeholder="Amount: "></input>
        <input type="text" name="invTeam" placeholder="Team: "></input>
        <Button variant="contained" onClick={() => {navigate("/")}}>Send</Button>
    </Container>
}