import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { store } from "../../globalStore/store";
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface";

export const TeamCard: React.FC<{ proposals: TeamProposalInterface[] }> = ({ proposals }) => {

    const managerURL = `${store.backendURL}/user`;

    const [proposalsList, setProposalsList] = useState<TeamProposalInterface[]>(proposals);
    const [activePropId, setActivePropId] = useState<string | null>(null);

    useEffect(() => {
        fetchReceivedProposals();
    }, []);

    const fetchReceivedProposals = async () => {
        try {
            const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "");
            const response = await axios.get(`${store.backendURL}/sponsor/proposals`, {
                headers: {
                    'Authorization': `Bearer ${r.jwt}`,
                    'Content-Type': 'application/json'
                },
            });

            const filteredProposals = response.data.filter(
                (proposal: { status: string; team_name: string; }) =>
                    proposal.status === 'Pending' && proposal.team_name === `${r.teamName}`
            );

            setProposalsList(filteredProposals);
        } catch (error) {
            console.error("Error getting received proposals", error);
            toast.error("Error getting received proposals");
        }
    };

    const acceptProposal = async (proposalId: string) => {
        try {
            if (!proposalId) {
                toast.error("No proposal selected");
                return;
            }

            const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "");
            console.log(`Sending accept request for proposal ID: ${proposalId}`);
            
            const response = await axios.patch(`${managerURL}/proposal/sponsor/accepted?proposal_ID=${proposalId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${r.jwt}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from accept request: ", response.data);
            toast.success("Proposal accepted successfully");
            fetchReceivedProposals();
        } catch (error) {
            console.error("Error accepting proposal", error);
            toast.error("Error accepting proposal");
        }
    };

    const rejectProposal = async (proposalId: string) => {
        try {
            if (!proposalId) {
                toast.error("No proposal selected");
                return;
            }

            const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "");
            console.log(`Sending reject request for proposal ID: ${proposalId}`);
            
            const response = await axios.patch(`${managerURL}/proposal/sponsor/reject?proposal_ID=${proposalId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${r.jwt}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from reject request: ", response.data);
            toast.success("Proposal rejected successfully");
            fetchReceivedProposals();
        } catch (error) {
            console.error("Error rejecting proposal", error);
            toast.error("Error rejecting proposal");
        }
    };

    const openSponsPropDet = (proposalId: string) => {
        setActivePropId(proposalId);
        alert(`Proposal ${proposalId} selected`);
    };

    return (
        <div style={{ width: "100%" }}>
            <h5 style={{ textAlign: 'center', marginBottom: '25px' }}>Pending Proposals</h5>
            <div className="container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                <TableRow 
                                  key={proposal.proposalId} 
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{proposal.proposalId}</TableCell>
                                    <TableCell align="center">{proposal.sponsor_name}</TableCell>
                                    <TableCell align="center">{proposal.amount}</TableCell>
                                    <TableCell align="center">{proposal.status}</TableCell>
                                    <TableCell align="center">
                                        <Button 
                                          variant="outlined" 
                                          color="success" 
                                          onClick={() => acceptProposal(proposal.proposalId)}
                                        >
                                          Accept
                                        </Button>
                                        <Button 
                                          variant="outlined" 
                                          color="error" 
                                          onClick={() => rejectProposal(proposal.proposalId)}
                                        >
                                          Reject
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <ToastContainer />
        </div>
    );
};
