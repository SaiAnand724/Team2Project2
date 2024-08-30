import { IconButton, Menu, MenuItem, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem as MuiMenuItem, FormControl, InputLabel } from "@mui/material";
import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface";
import axios from "axios";
import { store } from "../../globalStore/store";
import { toast } from "react-toastify";

export const TeamInvite: React.FC<{ invites: TeamInviteProposal[] }> = ({ invites }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedInvite, setSelectedInvite] = useState<TeamInviteProposal | null>(null);
    const [inviteList, setInviteList] = useState<TeamInviteProposal[]>(invites);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>('All');

    useEffect(() => {
        if (statusFilter === 'All') {
            setInviteList(invites);
        } else {
            setInviteList(invites.filter(invite => invite.status === statusFilter));
        }
    }, [statusFilter, invites]);

    const handleClick = (event: React.MouseEvent<HTMLElement>, invite: TeamInviteProposal) => {
        setAnchorEl(event.currentTarget);
        setSelectedInvite(invite);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedInvite(null);
    };

    const handleApprove = async () => {
        const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "");
        const token = r.jwt;

        try {
            if (selectedInvite) {
                await axios.patch(`${store.backendURL}/user/teaminvites/accepted?teamInviteId=` + selectedInvite.proposalId, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setInviteList(prevList =>
                    prevList.map(invite =>
                        invite.proposalId === selectedInvite.proposalId
                            ? { ...invite, status: "Accepted" }
                            : invite
                    )
                );
                setSnackbarMessage(`Invite for ${selectedInvite.teamName} accepted.`);
                setSnackbarOpen(true);
            }
            handleClose();
        } catch (error) {
            console.log("Couldn't approve invite");
            toast.error("Couldn't approve invite");
        }
    };

    const handleDeny = async () => {
        const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "");
        const token = r.jwt;

        try {
            if (selectedInvite) {
                await axios.patch(`${store.backendURL}/user/teaminvites/rejected?teamInviteId=` + selectedInvite.proposalId, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setInviteList(prevList =>
                    prevList.map(invite =>
                        invite.proposalId === selectedInvite.proposalId
                            ? { ...invite, status: "Rejected" }
                            : invite
                    )
                );
                setSnackbarMessage(`Invite for ${selectedInvite.teamName} rejected.`);
                setSnackbarOpen(true);
            }
            handleClose();
        } catch (error) {
            console.log("Couldn't deny invite");
            toast.error("Couldn't reject invite");
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <FormControl sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as string)}
                    label="Status"
                >
                    <MuiMenuItem value="All">All</MuiMenuItem>
                    <MuiMenuItem value="Pending">Pending</MuiMenuItem>
                    <MuiMenuItem value="Accepted">Accepted</MuiMenuItem>
                    <MuiMenuItem value="Rejected">Rejected</MuiMenuItem>
                </Select>
            </FormControl>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Team Name</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inviteList.map((invite) => (
                            <TableRow key={invite.proposalId}>
                                <TableCell>{invite.teamName}</TableCell>
                                <TableCell>{invite.amount}</TableCell>
                                <TableCell>{invite.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </>
    );
};





  
  

