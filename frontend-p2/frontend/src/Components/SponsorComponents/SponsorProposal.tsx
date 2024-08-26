import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SponsorNavbar } from "./SponsorNavbar";


{/*Functionality: Allows sponsors to send proposals to teams.
o	Endpoints:
	POST /sponsor/proposal to send a proposal.

o	Functions:
	sendSponsorProposal(teamId, amount): Sends a proposal to a team.
 */}

 export const CreateProposalForm: React.FC = () => {
    
    const navigate = useNavigate();

    return <Container className="create-proposal-container">
        <div >
            <SponsorNavbar></SponsorNavbar>
        </div>
        <h1> LOGO </h1>
        <input type="number" name="propAmount" placeholder="Amount: "></input>
        <input type="text" name="propTeam" placeholder="Team: "></input>
        <input type="text" name="propCategory" placeholder="Category: "></input>
        <Button variant="contained" onClick={() => {navigate("/")}}>Submit</Button>
    </Container>
}