import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { SponsorInterface } from "../../Interfaces/SponsorInterface"
import axios from "axios"
import { sponsorStore } from "../../globalStore/store"
import { useEffect, useState } from "react"
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface";

export const SponsorCard: React.FC<{proposals:TeamProposalInterface[]}> = ({proposals}) => {

    const sponsorURL = `${sponsorStore.baseURL}/sponsor`

    const [proposalsList, setProposalsList] = useState<TeamProposalInterface[]>(proposals) /** */
    const [activePropId, setActivePropId] = useState<number | null>(null);
{/** 
        const [sponsorLoginCreds, setSponsorLoginCreds] = useState([sponsorStore.username, sponsorStore.password]) 
            
        sponsorLoginTemp()
        fetchPendingProposals()

            const sponsorLoginTemp = async () => {
        try {
            let response:any = null;
            response = await axios.post(`${sponsorStore.baseURL}/auth/sponsor/login`, sponsorLoginCreds ,{
                headers: { 'Content-Type': 'text/plain' },
            })
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    */}


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

    const fetchInvestedTeams = async () => {
        try {
            let response:any = null;
            response = await axios.get(`${sponsorURL}/teams`)
            console.log(response.data)
        }
        catch {
            console.log("Error fetching invested teams")
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
                        Recipient: <span style={{fontStyle: 'italic'}}>Team Name</span>
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

{/*Endpoints:
	GET /sponsor/{sponsorId} to fetch details of a specific sponsor.

o	Functions:
	fetchSponsorDetails(sponsorId): Fetches details of a specific sponsor.
*/}