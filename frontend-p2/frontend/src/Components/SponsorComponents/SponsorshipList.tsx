import { useEffect, useState } from "react";
import axios from "axios";
import { TeamInterface } from "../../Interfaces/TeamInterface";
import { SponsoredTeamsInterface, AggregateTeamInvestmentsInterface } from "../../Interfaces/SponsoredTeamsInterface";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { SponsorNavbar } from "./SponsorNavbar";
import { toast, ToastContainer } from "react-toastify";
import { store } from "../../globalStore/store";

export const SponsorshipList: React.FC<{ teams: TeamInterface[], sponsTeams: SponsoredTeamsInterface[] }> = ({ teams, sponsTeams }) => {

    const sponsorURL = `${store.backendURL}/sponsor`

    const [teamsList, setTeamsList] = useState<TeamInterface[]>(teams);
    const [pendingTeamsSponsoredList, setPendingTeamsSponsoredList] = useState<SponsoredTeamsInterface[]>(sponsTeams);
    const [acceptedTeamsSponsoredList, setAcceptedTeamsSponsoredList] = useState<SponsoredTeamsInterface[]>(sponsTeams);

    const [teamInvestmentsList, setTeamInvestmentsList] = useState<AggregateTeamInvestmentsInterface[]>([]); // Initialize with empty array

    useEffect(() => {
        fetchTeamslist();
        fetchPendingTeamProposals();
        fetchAcceptedTeamProposals();
        //console.log(teamInvestmentsList)
    }, []);

    useEffect(() => {
        // Calculate investments once data is fetched and state is updated
        if (pendingTeamsSponsoredList.length > 0 && teamsList.length > 0) {
            const investmentsList = calculateTotalInvestmentForAllTeams(pendingTeamsSponsoredList, teamsList);
            

            setTeamInvestmentsList(investmentsList);
            console.log(teamInvestmentsList)
        }
    }, [pendingTeamsSponsoredList, teamsList]);

    const fetchTeamslist = async () => {
        try {
            let response: any = null;
            response = await axios.get(`${store.backendURL}/allteams`);
            setTeamsList(response.data);
        } catch {
            console.log("Error fetching all teams");
            toast.error("Error fetching all teams");
        }
    };

    const fetchPendingTeamProposals = async () => {
        try {
            let response: any = null;
            const r = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "");
            response = await axios.get(`${sponsorURL}/proposals/Pending`, {
                headers: {
                    'Authorization': `Bearer ${r.jwt}`,
                    'Content-Type': 'application/json',
                },
            });
            setPendingTeamsSponsoredList(response.data);
        } catch {
            console.log("Error fetching pending team proposals");
            toast.error("Error fetching pending team proposals");
        }
    };

    const fetchAcceptedTeamProposals = async () => {
        try {
            let response: any = null;
            const r = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "");
            response = await axios.get(`${sponsorURL}/proposals/Accepted`, {
                headers: {
                    'Authorization': `Bearer ${r.jwt}`,
                    'Content-Type': 'application/json',
                },
            });
            setAcceptedTeamsSponsoredList(response.data);
        } catch {
            console.log("Error fetching accepted team proposals");
            toast.error("Error fetching accepted team proposals");
        }
    };

    const calculateTotalInvestmentForAllTeams = (
        proposals: SponsoredTeamsInterface[],
        allTeams: TeamInterface[]
    ): AggregateTeamInvestmentsInterface[] => {
        // Create a map to store total investments for each team
        const investmentMap: Record<string, number> = {};

        // Iterate over the proposals to sum up investments for each team
        proposals.forEach(proposal => {
            // Check if the proposal status is 'Pending'
            if (proposal.status === 'Pending') {
                // Initialize the investment amount for the team if not already set
                if (!investmentMap[proposal.team_name]) {
                    investmentMap[proposal.team_name] = 0;
                }
                // Add the current proposal amount to the team's total investment
                investmentMap[proposal.team_name] += proposal.amount;
            }
        });

        // Create a map of teamName to teamId for quick lookup
        const teamIdMap: Record<string, string> = allTeams.reduce((map, team) => {
            map[team.teamName] = team.teamId;
            return map;
        }, {} as Record<string, string>);

        // Convert the investmentMap to an array of AggregateTeamInvestmentsInterface
        const investmentsList: AggregateTeamInvestmentsInterface[] = Object.entries(investmentMap).map(([teamName, totalInvestment]) => ({
            teamId: teamIdMap[teamName] || '', // Default to empty string if teamId not found
            teamName,
            totalInvestment
        }));

        return investmentsList;
    };

    return (
        <div >
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Sponsored Team Investments</h2>
            <div className="container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 600 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Team ID</TableCell>
                                <TableCell align="center">Team Name</TableCell>
                                <TableCell align="center">Only Pending Aggregate Investment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teamInvestmentsList.length > 0 ? (
                                teamInvestmentsList.map((team) => (
                                    <TableRow key={team.teamId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">{team.teamId}</TableCell>
                                        <TableCell align="center">{team.teamName}</TableCell>
                                        <TableCell align="center">${team.totalInvestment}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">No data available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <ToastContainer />
        </div>
    );
}
