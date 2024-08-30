

import { Box, Button, Card, CardContent, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useEffect, useState } from "react";
import { PlayerProposalInterface } from "../../Interfaces/PlayerProposalInterface";
import { store, userStore } from "../../globalStore/store";
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface";

export const TeamCard: React.FC<{proposals:TeamProposalInterface[]}> = ({proposals}) => {

    const managerURL = `${store.backendURL}/user`

    const [proposalsList, setProposalsList] = useState<TeamProposalInterface[]>(proposals) /** */
    const [activePropId, setActivePropId] = useState<number | null>(null);



    useEffect(() => {

        fetchRecievedProposals()
    }, []);

    const fetchRecievedProposals = async () => {
        try {
            let response: any = null;
            const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "")
            console.log(r.jwt)
            response = await axios.get(`${store.backendURL}/sponsor/proposals`, {
              headers: {
                'Authorization': `Bearer ${r.jwt}`,
                'Content-Type': 'application/json'
              },
            })
            console.log(response.data)
            const proposalFilter = response.data
            const filteredProposals = proposalFilter.filter(
                (proposalFilter: { status: string; team_name: string; }) => proposalFilter.status === 'Pending' && proposalFilter.team_name === 'BobMangTeam'
              );

            console.log(filteredProposals)
            setProposalsList(filteredProposals)
        }
        catch (error) {
        }
    }


    const rejectProposals = async () => {
        alert("reject proposal ?")
        try {
            let response:any = null;
            //figure out query param logic
            const proposalId = activePropId;
            const r = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "")
            response = await axios.patch(`${managerURL}/proposal/sponsor/reject?proposal_ID=${proposalId}`, {
                headers: {
                    'Authorization': `Bearer ${r.jwt}`,
                    'Content-Type': 'application/json',
                },
            });
            setProposalsList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error removing proposal")
        }
    }

    const acceptProposals = async () => {
        alert("accept proposal ?")
        try {
            let response:any = null;
            //figure out query param logic
            const proposalId = activePropId;
            response = await axios.patch(`${managerURL}/proposals/accepted?proposal_ID=${proposalId}`)
            setProposalsList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error accepting proposals")
        }
    }



    const openSponsPropDet = () => {
        {/* popover for more card details */} 
        
        alert("Button has been clicked")
    }

    /** 
             * {proposalsList.map((proposal) => (
             * key = {proposal.proposalId}
             * {proposal.proposalId}
             * 
             * {/** {proposal.amount}
                         * {proposal.senderSponsorName}
                         * {proposal.status}
                         * 
                         *         <Grid item xs="auto">
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
                        
                    <Typography variant="h6">
                        Amount: <span style={{fontStyle: 'italic'}}>$$$</span>
                        <br></br>
                        <br></br>
                        Sender: <span style={{fontStyle: 'italic'}}>Sponsor Name</span>
                        <br></br>
                        <br></br>
                        Status: <span style={{fontStyle: 'italic'}}>Pending</span>
                    </Typography>
                    {/* Additional content can go here 
                    <Button variant="outlined" color="success" onClick={acceptProposals}> Accept </Button> 
                    <Button variant="outlined" color="error" onClick={rejectProposals}> Reject </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
                         * 
                        */

    return (
        <div style={{ width: "100%" }}>
            <h5 style={{ textAlign: 'center', marginBottom: '25px' }}>Pending Proposals</h5>
            <div className="container">
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table ">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Proposal Id</TableCell>
                        <TableCell align="center">Sponsor Name</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {proposalsList.map((proposal) => (
                    <TableRow key = {proposal.proposalId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{proposal.proposalId}</TableCell>
                        <TableCell align="center">{proposal.sponsor_name}</TableCell>
                        <TableCell align="center">{proposal.amount}</TableCell>
                        <TableCell align="center">{proposal.status}</TableCell>
                        <TableCell align="center">
                        <Button variant="outlined" color="success" onClick={acceptProposals}> Accept </Button> 
                        <Button variant="outlined" color="error" onClick={rejectProposals}> Reject </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                
            </Table>
            </TableContainer>
            </div>
        </div>
    )

}
            {/** ))}    */}
            


{/*Functionality: Shows details of a single team.
o	Endpoints:
	GET /team/{teamId} to fetch details of a specific team.

o	Functions:
	fetchTeamDetails(teamId): Fetches details of a specific team.
 */}