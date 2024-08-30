// PlayerDashboard.tsx
import { useEffect, useState } from "react";

import { store } from "../../globalStore/store";

import { PlayerProposalInterface } from "../../Interfaces/PlayerProposalInterface";
import { PlayerCard } from "./PlayerCard";
import { AppBar, Box, Card, Container, Divider, Grid, Toolbar, Typography } from "@mui/material";
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface";
import axios from "axios";
import { toast } from "react-toastify";

export const PlayerDashboard: React.FC = () => {
    const playerURL = `${store.backendURL}/user`;

    const [invites, setInvites] = useState<TeamInviteProposal[]>([]);

    useEffect(() => {
        getAllInvites();
    }, []);

    const getAllInvites = async () => {
        const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "");

        const token = r.jwt;
        console.log("Backend URL:", store.backendURL);

        try {
            const response = await axios.get(`${store.backendURL}/user/teaminvite/received`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setInvites(response.data);
            console.log("Fetched Invites:", response.data);
        } catch (error) {
            console.log("Error getting invites", error);
            toast.error("Couldn't get invites");
        }
    };

    return (
        <Box>
            <AppBar position="static">

            </AppBar>
            <Container>
                <Box sx={{ textAlign: 'center', my: 4 }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Player Dashboard
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                </Box>
                <Grid container spacing={3} sx={{ my: 4 }}>
                    <Grid item xs={12} md={8}>
                        <PlayerCard invites={invites} /> {/* Match prop name */}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Salary
                            </Typography>
                            <Typography variant="h4" color="primary">
                                $$$
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default PlayerDashboard;

