import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom"


{/*•ProposalForm
o	Functionality: Form for creating and submitting new proposals.

o	Endpoints: May need a Post Request for this
Function: addProposal: fill out form for adding new proposal

.
 */}

export const CreateProposalForm: React.FC = () => {
    const navigate = useNavigate();

    return <Container>
        <h1> LOGO </h1>
        <input type="number" name="propAmount" placeholder="Amount: "></input>
        <input type="text" name="propTeam" placeholder="Team: "></input>
        <input type="text" name="propCategory" placeholder="Category: "></input>
    </Container>
}