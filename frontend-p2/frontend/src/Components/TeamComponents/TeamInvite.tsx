import { IconButton, Menu, MenuItem, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface";
import axios from "axios";
import { userStore } from "../../globalStore/store";
import { toast } from "react-toastify";





  
    export const TeamInvite:React.FC<{invites:TeamInviteProposal[]}> = ({invites}) => {

        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const [selectedInvite, setSelectedInvite] = useState<TeamInviteProposal | null>(null);
        const [inviteList, setInviteList] = useState<TeamInviteProposal[]>(invites);
        const [snackbarOpen, setSnackbarOpen] = useState(false);
        const [snackbarMessage, setSnackbarMessage] = useState("");
        const [tableKey, setTableKey] = useState(0)

        const handleClick = (event: React.MouseEvent<HTMLElement>, invite: TeamInviteProposal) => {
            setAnchorEl(event.currentTarget);
            setSelectedInvite(invite);
        };

        const handleClose = () => {
            setAnchorEl(null);
            setSelectedInvite(null);
         };



        const handleApprove = async () => {
            const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "")

            const token = r.jwt
            try{
                if (selectedInvite) {
                    console.log(selectedInvite.proposalId)

                    const response = await axios.patch("http://localhost:8080/user/teaminvites/accepted?teamInviteId=" + selectedInvite.proposalId,{},{
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })


                    setInviteList((prevList) =>
                    prevList.map((invite) =>
                        invite.proposalId === selectedInvite.proposalId
                        ? { ...invite, status: "Accepted" }
                        : invite
                    )
                    );
                    setTableKey((prevKey) => prevKey + 1)
                    setSnackbarMessage(`Invite for ${selectedInvite.teamName} accepted.`);
                    setSnackbarOpen(true);


                }
                handleClose();
            }
            catch(error) {
                console.log("Couldn't approve invite")
                toast.error("Couldn't approve invite")

            }
        };

        const handleDeny = async () => {
            const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "")

            const token = r.jwt
            try{
            if (selectedInvite) {

                const response = await axios.patch("http://localhost:8080/user/teaminvites/rejected?teamInviteId=" + selectedInvite.proposalId, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    
                })


                setInviteList((prevList) =>
                  prevList.map((invite) =>
                    invite.proposalId === selectedInvite.proposalId
                      ? { ...invite, status: "Rejected" }
                      : invite
                  )
                );
                setTableKey((prevKey) => prevKey + 1)
                setSnackbarMessage(`Invite for ${selectedInvite.teamName} rejected.`);
                setSnackbarOpen(true);


              }
              
              handleClose();
            }
            catch(error) {
                console.log("Couldn't deny invite")
                toast.error("Couldn't reject invite")
            }
        };

        const handleSnackbarClose = () => {
            setSnackbarOpen(false);
        };

        return (
            <>
    
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Team Name</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invites.map((invite) => (
                            <TableRow key={invite.proposalId}>
                                <TableCell>{invite.teamName}</TableCell>
                                <TableCell>{invite.amount}</TableCell>
                                <TableCell>{invite.status}</TableCell>
                                <TableCell>
                                    <IconButton onClick={(event) => handleClick(event, invite)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleApprove}>Approve</MenuItem>
                                        <MenuItem onClick={handleDeny}>Reject</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}/>
        </>
      

    
        );
    };
  
  

