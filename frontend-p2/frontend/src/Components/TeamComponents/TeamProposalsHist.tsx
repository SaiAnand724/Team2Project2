import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Divider } from '@mui/material';
import axios from 'axios';
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface";
import { store } from "../../globalStore/store";
import { toast, ToastContainer } from "react-toastify";

export const TeamProposalsHist: React.FC<{ proposals: TeamProposalInterface[] }> = ({ proposals }) => {
    const [proposalsList, setProposalsList] = useState<TeamProposalInterface[]>(proposals);
    const [currentTab, setCurrentTab] = useState(0);
    const [activePropId, setActivePropId] = useState<number | null>(null);

    useEffect(() => {
        fetchProposalsByStatus('Pending');
    }, []);

    const fetchProposalsByStatus = async (status: string) => {
        try {
            const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "");
            const response = await axios.get(`${store.backendURL}/sponsor/proposals`, {
                headers: {
                    'Authorization': `Bearer ${r.jwt}`,
                    'Content-Type': 'application/json',
                },
            });
            const filteredProposals = response.data.filter(
                (proposal: { status: string; team_name: string; }) => proposal.status === status && proposal.team_name === `${r.teamName}`
            );
            setProposalsList(filteredProposals);
        } catch (error) {
            console.log(`Error fetching ${status.toLowerCase()} proposals`, error);
            toast.error(`Error fetching ${status.toLowerCase()} proposals`);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
        const status = newValue === 0 ? 'Pending' : newValue === 1 ? 'Accepted' : 'Rejected';
        fetchProposalsByStatus(status);
    };

    const rejectProposal = async () => {
        alert("reject button pressed")
        if (activePropId !== null) {
            try {
                const r = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "");
                const response = await axios.patch(`${store.backendURL}/proposal/sponsor/reject?proposal_ID=${activePropId}`, {
                    headers: {
                        'Authorization': `Bearer ${r.jwt}`,
                        'Content-Type': 'application/json',
                    },
                });
                setProposalsList(response.data);
                console.log("Proposal rejected", response.data);
            } catch (error) {
                console.log("Error rejecting proposal", error);
                toast.error("Error rejecting proposal");
            }
        }
    };

    const acceptProposal = async () => {
        alert("accept button pressed")
        if (activePropId !== null) {
            try {
                const response = await axios.patch(`${store.backendURL}/proposals/accepted?proposal_ID=${activePropId}`);
                setProposalsList(response.data);
                console.log("Proposal accepted", response.data);
            } catch (error) {
                console.log("Error accepting proposal", error);
                toast.error("Error accepting proposal");
            }
        }
    };

    return (
        <div style={{ width: "100%" , marginLeft: '50px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Team Proposals History</h2>
            <Divider/>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs example" centered>
                <Tab 
                        label="Pending Invites" 
                        sx={{
                            backgroundColor: currentTab === 0 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.7)',
                            opacity: 1,
                            borderRadius: '4px',
                            margin: '0 8px',
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            }
                        }}
                    />
                    <Tab 
                        label="Accepted Invites" 
                        sx={{
                            backgroundColor: currentTab === 1 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.7)',
                            opacity: 1,
                            borderRadius: '4px',
                            margin: '0 8px',
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            }
                        }}
                    />
                    <Tab 
                        label="Rejected Invites" 
                        sx={{
                            backgroundColor: currentTab === 2 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.7)',
                            opacity: 1,
                            borderRadius: '4px',
                            margin: '0 8px',
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            }
                        }}
                    />
                </Tabs>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Proposal Id</TableCell>
                            <TableCell align="center">Sponsor Name</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Status</TableCell>
                            {currentTab === 0 && <TableCell align="center">Options</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {proposalsList.map((proposal) => (
                            <TableRow key={proposal.proposalId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{proposal.proposalId}</TableCell>
                                <TableCell align="center">{proposal.sponsor_name}</TableCell>
                                <TableCell align="center">{proposal.amount}</TableCell>
                                <TableCell align="center">{proposal.status}</TableCell>
                                {currentTab === 0 && (
                                    <TableCell align="center">
                                        <Button variant="outlined" color="success" onClick={acceptProposal}>
                                            Accept
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={rejectProposal}>
                                            Reject
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer />
        </div>
    );
};
