import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useEffect, useState } from "react";
import { PlayerProposalInterface } from "../../Interfaces/PlayerProposalInterface";
import { sponsorStore } from "../../globalStore/store";

export const PlayerCard: React.FC<{proposals:PlayerProposalInterface[]}> = ({proposals}) => {

    const sponsorURL = `${sponsorStore.baseURL}/player`

    const [proposalsList, setProposalsList] = useState<PlayerProposalInterface[]>(proposals) /** */
    const [activePropId, setActivePropId] = useState<number | null>(null);



    useEffect(() => {


    }, []);
 



    const fetchPendingProposals = async () => {
        try {
            let response:any = null;
            response = await axios.get(`${sponsorURL}/proposals/Pending`)
            setProposalsList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error fetching pending proposals")
        }
    }

    const fetchAcceptedProposals = async () => {
        try {
            let response:any = null;
            response = await axios.get(`${sponsorURL}/proposals/Accepted`)
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
                         * {proposal.receiverTeam}
                         * {proposal.status}
                        */}
                    <Typography variant="h6">
                        Amount: <span style={{fontStyle: 'italic'}}>$$$</span>
                        <br></br>
                        <br></br>
                        Team: <span style={{fontStyle: 'italic'}}>Team Name</span>
                        <br></br>
                        <br></br>
                        Status: <span style={{fontStyle: 'italic'}}>Pending</span>
                    </Typography>
                    {/* Additional content can go here */}
                    </Box>
                </CardContent>
            </Card>

            {/** ))}    */}
            

        </Grid>

    )

}



{/*Functionality: Shows individual player details.
o	Endpoints:
	GET /player/{playerId} to fetch details of a specific player.

o	Functions:
	fetchPlayerDetails(playerId): Fetches details of a specific player.
 */}