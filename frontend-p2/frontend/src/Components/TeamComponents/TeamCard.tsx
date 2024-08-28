

import { Box, Button, Card, CardContent, Grid, Tab, Typography } from "@mui/material";
import axios from "axios";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useEffect, useState } from "react";
import { PlayerProposalInterface } from "../../Interfaces/PlayerProposalInterface";
import { userStore } from "../../globalStore/store";
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface";

export const TeamCard: React.FC<{proposals:TeamProposalInterface[]}> = ({proposals}) => {

    const managerURL = `${userStore.baseURL}/user`

    const [proposalsList, setProposalsList] = useState<TeamProposalInterface[]>(proposals) /** */
    const [activePropId, setActivePropId] = useState<number | null>(null);



    useEffect(() => {


    }, []);
 



    const rejectProposals = async () => {
        try {
            let response:any = null;
            //figure out query param logic
            const proposalId = activePropId;
            response = await axios.patch(`${managerURL}/proposal/sponsor/reject?proposal_ID=${proposalId}`)
            setProposalsList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error fetching pending proposals")
        }
    }

    const acceptProposals = async () => {
        try {
            let response:any = null;
            //figure out query param logic
            const proposalId = activePropId;
            response = await axios.patch(`${managerURL}/proposals/accepted?proposal_ID=${proposalId}`)
            setProposalsList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error fetching accepted proposals")
        }
    }



    const openSponsPropDet = () => {
        {/* popover for more card details */} 
        
        alert("Button has been clicked")
    }

    return (
        <Grid item xs="auto">
            {/** 
             * {proposalsList.map((proposal) => (
             * key = {proposal.proposalId}
             * {proposal.proposalId}
            */}
            
            <Card  sx={{ position: 'relative', width: 300, height: 300 }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="h2">
                    Proposal 1
                    </Typography>
                    <Button
                    variant="contained"
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                    onClick={openSponsPropDet}
                    >
                    <SettingsOutlinedIcon />
                    </Button>
                    <Box
                    sx={{
                        backgroundColor: '#f0f0f0', // Grey color
                        padding: '16px',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginTop: '16px', // Margin at the top of the grey box
                    }}
                    >
                        {/** {proposal.amount}
                         * {proposal.senderSponsorName}
                         * {proposal.status}
                        */}
                    <Typography variant="h6">
                        Amount: <span style={{fontStyle: 'italic'}}>$$$</span>
                        <br></br>
                        <br></br>
                        Sender: <span style={{fontStyle: 'italic'}}>Sponsor Name</span>
                        <br></br>
                        <br></br>
                        Status: <span style={{fontStyle: 'italic'}}>Pending</span>
                    </Typography>
                    {/* Additional content can go here */}
                    <Button variant="outlined" color="success" onClick={acceptProposals}> Accept </Button> 
                    <Button variant="outlined" color="error" onClick={rejectProposals}> Reject </Button>
                    </Box>
                </CardContent>
            </Card>

            {/** ))}    */}
            

        </Grid>

    )

}


{/*Functionality: Shows details of a single team.
o	Endpoints:
	GET /team/{teamId} to fetch details of a specific team.

o	Functions:
	fetchTeamDetails(teamId): Fetches details of a specific team.
 */}