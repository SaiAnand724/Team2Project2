import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface";
import axios from "axios";
import { userStore } from "../../globalStore/store";





  
    export const TeamInvite:React.FC<{invites:TeamInviteProposal[]}> = ({invites}) => {

        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const [selectedInvite, setSelectedInvite] = useState<TeamInviteProposal | null>(null);
        const [inviteList, setInviteList] = useState<TeamInviteProposal[]>(invites);
        const [snackbarOpen, setSnackbarOpen] = useState(false);
        const [snackbarMessage, setSnackbarMessage] = useState("");

        const handleClick = (event: React.MouseEvent<HTMLElement>, invite: TeamInviteProposal) => {
            setAnchorEl(event.currentTarget);
            setSelectedInvite(invite);
        };

        const handleClose = () => {
            setAnchorEl(null);
            setSelectedInvite(null);
         };

        const handleApprove = async () => {
            const token = userStore.loggedInUser.jwt
            console.log(userStore.loggedInUser.jwt)
            try{
                if (selectedInvite) {

                    const response = await axios.patch("http://localhost:8080/accepted",{},{
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
                    setSnackbarMessage(`Invite for ${selectedInvite.teamName} accepted.`);
                    setSnackbarOpen(true);


                }
                handleClose();
            }
            catch(error) {
                console.log("Couldn't approve invite")
            }
        };

        const handleDeny = async () => {
            const token = userStore.loggedInUser.jwt
            console.log(userStore.loggedInUser.jwt)
            try{
            if (selectedInvite) {

                const response = await axios.patch("http://localhost:8080/rejected", {}, {
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
                setSnackbarMessage(`Invite for ${selectedInvite.teamName} rejected.`);
                setSnackbarOpen(true);


              }
              handleClose();
            }
            catch(error) {
                console.log("Couldn't deny invite")
            }
        };

        return (
    
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
      

    
        );
    };
  
  

{/*Functionality: Allows managers to send team invitations to players.
o	Endpoints:
	POST /team/proposal to send a team invite.

o	Functions:
	sendTeamInvite(playerId, teamId): Sends an invite to a player.
 */}