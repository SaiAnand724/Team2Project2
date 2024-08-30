import { useEffect, useState } from "react";
import { sponsorStore } from "../../globalStore/store";
import axios from "axios";
import { TeamInterface } from "../../Interfaces/TeamInterface";
import { SponsoredTeamsInterface, AggregateTeamInvestmentsInterface } from "../../Interfaces/SponsoredTeamsInterface";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { SponsorNavbar } from "./SponsorNavbar";
import { toast, ToastContainer } from "react-toastify";

export const SponsorshipList:React.FC<{teams:TeamInterface[], sponsTeams:SponsoredTeamsInterface[], teamInvestments:AggregateTeamInvestmentsInterface[]}> = ({teams, sponsTeams, teamInvestments}) => {
    
    const sponsorURL = `${sponsorStore.baseURL}/sponsor`
    
    const [teamsList, setTeamsList] = useState<TeamInterface[]>(teams);
    const [teamsSponsoredList, setTeamsSponsoredList] = useState<SponsoredTeamsInterface[]>(sponsTeams)

    const [teamInvestmentsList, setTeamInvestsmentsList] = useState<AggregateTeamInvestmentsInterface[]>(teamInvestments)

    useEffect(() => {
        fetchTeamInvestments()
        
    }, [teamInvestmentsList]);

        {/** Sample data for all teams lists and invested teams */}


    
    const fetchTeamslist = async () => {
        try {
            let response:any = null;
            response = await axios.get(`${sponsorStore.baseURL}/team`)
            setTeamsList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error fetching invested teams")
            toast.error("Error fetching invested teams")
        }
    }
    
    const fetchInvestedTeams = async () => {
        try {
            let response:any = null;
            response = await axios.get(`${sponsorURL}/teams`)
            setTeamsSponsoredList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error fetching invested teams")
            toast.error("Error fetching invested teams")
        }
    }

    const fetchTeamInvestments = () => {
        // check the team names from the teams list and group them by proposal amount
        // in the sponsored teams list such that we get the total amount the sponsor has invested
        const investmentMap: Record<string, number> = {};

        teamsSponsoredList.forEach((sponsTeam) => {
            if (investmentMap[sponsTeam.receiverTeamName]) {
                investmentMap[sponsTeam.receiverTeamName] += sponsTeam.amount;
            } else {
                investmentMap[sponsTeam.receiverTeamName] = sponsTeam.amount;
            }
        });

        const aggregatedInvestments: AggregateTeamInvestmentsInterface[] = teamsList.map((team) => ({
            teamId: team.teamId,
            teamName: team.teamName,
            totalInvestment: investmentMap[team.teamName] || 0
        }));

        setTeamInvestsmentsList(aggregatedInvestments);
    };



    return (
        <div >
            <div >
                <SponsorNavbar></SponsorNavbar>
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Sponsored Team Investments</h2>
            <div className="container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Team ID</TableCell>
                        <TableCell align="center">Team Name</TableCell>
                        <TableCell align="center">Aggregate Investment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    Table Data vvv
                    {teamInvestmentsList.map((team) => (
                    <TableRow key={team.teamId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{team.teamId}</TableCell>
                        <TableCell align="center">{team.teamName}</TableCell>
                        <TableCell align="center">${team.totalInvestment}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            </div>

            <ToastContainer/>

        </div>
    );
}