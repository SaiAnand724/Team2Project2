import { useEffect, useState } from "react";
import { Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from "@mui/material";
import axios from "axios";
import { store } from "../../globalStore/store";
import { ToastContainer, toast } from "react-toastify";
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface";

export const TeamInviteHist: React.FC = () => {
    const [teamInviteHist, setTeamInviteHist] = useState<TeamInviteProposal[]>([]);
    const [currentTab, setCurrentTab] = useState(0);
    const managerURL = `${store.backendURL}/user`;

    useEffect(() => {
        fetchInvitesByStatus('Accepted');
    }, []);

    const fetchInvitesByStatus = async (status: string) => {
        try {
            const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "");
            const response = await axios.get(`${managerURL}/teaminvite/sent`, {
                headers: {
                    'Authorization': `Bearer ${r.jwt}`,
                    'Content-Type': 'application/json',
                },
            });
            const filteredInvites = response.data.filter(
                (invite: TeamInviteProposal) => invite.status === status
            );
            setTeamInviteHist(filteredInvites);
        } catch (error) {
            console.log(`Unable to fetch ${status.toLowerCase()} invites`, error);
            toast.error(`Unable to fetch ${status.toLowerCase()} invites`);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
        const status = newValue === 0 ? 'Accepted' : newValue === 1 ? 'Pending' : 'Rejected';
        fetchInvitesByStatus(status);
    };

    return (
        <div className="team-invite-hist">
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Team Invite History</h2>
            <Divider />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs example" centered>
                <Tab 
                        label="Accepted Invites" 
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
                        label="Pending Invites" 
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
                            <TableCell align="center">Player Username</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamInviteHist.map((invite) => (
                            <TableRow key={invite.proposalId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{invite.proposalId}</TableCell>
                                <TableCell align="center">{invite.receiverUsername}</TableCell>
                                <TableCell align="center">{invite.amount}</TableCell>
                                <TableCell align="center">{invite.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer />
        </div>
    );
};
