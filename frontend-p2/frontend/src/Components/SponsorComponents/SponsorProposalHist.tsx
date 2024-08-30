import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { SponsoredTeamsInterface } from "../../Interfaces/SponsoredTeamsInterface";
import { store } from '../../globalStore/store';

export const SponsorDetails: React.FC<{ proposals: SponsoredTeamsInterface[] }> = ({ proposals }) => {

    const sponsorURL = `${store.backendURL}/sponsor`;
    const [proposalsList, setProposalsList] = useState<SponsoredTeamsInterface[]>(proposals);
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        fetchProposalsByStatus('Pending');
    }, []);

    const fetchProposalsByStatus = async (status: string) => {
        try {
            const r = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "");
            const response = await axios.get(`${sponsorURL}/proposals/${status}`, {
                headers: {
                    'Authorization': `Bearer ${r.jwt}`,
                    'Content-Type': 'application/json',
                },
            });
            setProposalsList(response.data);
            console.log(response.data);
        } catch {
            console.log(`Error fetching ${status.toLowerCase()} proposals`);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
        const status = newValue === 0 ? 'Pending' : newValue === 1 ? 'Accepted' : 'Rejected';
        fetchProposalsByStatus(status);
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Sponsor Proposal History</h2>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs example" centered>
                    <Tab label="Pending Proposals" />
                    <Tab label="Accepted Proposals" />
                    <Tab label="Rejected Proposals" />
                </Tabs>
            </Box>
            <div className="container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Proposal Id</TableCell>
                                <TableCell align="center">Team Name</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {proposalsList.map((proposal) => (
                                <TableRow key={proposal.proposalId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{proposal.proposalId}</TableCell>
                                    <TableCell align="center">{proposal.team_name}</TableCell>
                                    <TableCell align="center">{proposal.amount}</TableCell>
                                    <TableCell align="center">{proposal.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};
