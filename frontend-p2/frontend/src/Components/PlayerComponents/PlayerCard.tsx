// PlayerCard.tsx
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { PlayerProposalInterface } from "../../Interfaces/PlayerProposalInterface";
import { store, userStore } from "../../globalStore/store";
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface";

export const PlayerCard: React.FC<{invites: TeamInviteProposal[]}> = ({ invites }) => {
    const [invitesList, setInvitesList] = useState<TeamInviteProposal[]>(invites);

    useEffect(() => {
        console.log("Invites to display:", invitesList);
        
        const pendingInvites = invites.filter(invite => invite.status === "Pending")
        setInvitesList(pendingInvites)
    }, [invitesList]);

    const handleAccept = async (inviteId: any) => {
        const token = JSON.parse(localStorage.getItem('loggedInUser') ?? "").jwt;
        try {
            await axios.patch(`${store.backendURL}/user/teaminvites/accepted?teamInviteId=${inviteId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Update the local state to reflect the change
            setInvitesList(prevList =>
                prevList.map(invite =>
                    invite.proposalId === inviteId ? { ...invite, status: "Accepted" } : invite
                )
            );
        } catch (error) {
            console.log("Error accepting invite", error);
        }
    };

    const handleReject = async (inviteId: any) => {
        const token = JSON.parse(localStorage.getItem('loggedInUser') ?? "").jwt;
        try {
            await axios.patch(`${store.backendURL}/user/teaminvites/rejected?teamInviteId=${inviteId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Update the local state to reflect the change
            setInvitesList(prevList =>
                prevList.map(invite =>
                    invite.proposalId === inviteId ? { ...invite, status: "Rejected" } : invite
                )
            );
        } catch (error) {
            console.log("Error rejecting invite", error);
        }
    };

    return (
        <Grid container spacing={2}>
            {invitesList.length > 0 ? (
                invitesList.map((invite) => (
                    <Grid item xs={12} sm={6} md={4} key={invite.proposalId}>
                        <Card sx={{ position: 'relative', width: '100%', height: 300 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {invite.teamName}
                                </Typography>
                                <Box sx={{ backgroundColor: '#f0f0f0', padding: '16px', marginTop: '16px' }}>
                                    <Typography variant="h6">Amount: ${invite.amount}</Typography>
                                    <Typography>Status: {invite.status}</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            onClick={() => handleAccept(invite.proposalId)}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleReject(invite.proposalId)}
                                        >
                                            Reject
                                        </Button>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography>No invites found</Typography>
            )}
        </Grid>
    );
};





{/*Functionality: Shows individual player details.
o	Endpoints:
	GET /player/{playerId} to fetch details of a specific player.

o	Functions:
	fetchPlayerDetails(playerId): Fetches details of a specific player.
 */}