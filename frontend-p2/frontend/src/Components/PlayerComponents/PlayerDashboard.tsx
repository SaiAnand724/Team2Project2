import { useEffect, useState } from "react";
import { userStore } from "../../globalStore/store";
import { PlayerProposalInterface } from "../../Interfaces/PlayerProposalInterface";
import { PlayerCard } from "./PlayerCard";
import { AppBar, Box, Card, Container, Divider, Grid, Toolbar, Typography } from "@mui/material";

export const PlayerDashboard: React.FC = () => {

    const sponsorURL = `${userStore.baseURL}/player`;

    const [proposalsList, setProposalsList] = useState<PlayerProposalInterface[]>([]);


    useEffect(() => {
        const sortedProposals = proposalsList.sort();
        setProposalsList(sortedProposals);
    }, [proposalsList]);

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
                        <PlayerCard proposals={proposalsList} />
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
