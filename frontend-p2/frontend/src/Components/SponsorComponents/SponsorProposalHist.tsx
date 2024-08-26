import { useEffect, useState } from "react";
import axios from "axios";
import { sponsorStore } from "../../globalStore/store";
import { SponsorNavbar } from "./SponsorNavbar";
import { SponsoredTeamsInterface } from "../../Interfaces/SponsoredTeamsInterface";
import Table from "@mui/material/Table";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const SponsorDetails:React.FC<{proposals:SponsoredTeamsInterface[]}> = ({proposals}) => {

    const sponsorURL = `${sponsorStore.baseURL}/sponsor`
    const [proposalsList, setProposalsList] = useState<SponsoredTeamsInterface[]>(proposals) /** */

    useEffect(() => {
        const sortedProposals = proposalsList.sort();
        // 
        setProposalsList(sortedProposals);
    }, []);

    const fetchAcceptedProposals = async () => {
        try {
            let response:any = null;
            response = await axios.get(`${sponsorURL}/proposals/Accepted`)
            setProposalsList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error fetching accepted proposals")
        }
    }
    
    const fetchPendingProposals = async () => {
        try {
            let response:any = null;
            response = await axios.get(`${sponsorURL}/proposals/Pending`)
            setProposalsList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error fetching pending proposals")
        }
    }

    const fetchRejectedProposals = async () => {
        try {
            let response:any = null;
            response = await axios.get(`${sponsorURL}/proposals/Rejected`)
            setProposalsList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error fetching accepted proposals")
        }
    }
    return (
        <div >
            <div >
                <SponsorNavbar></SponsorNavbar>
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Sponsor Proposal History</h2>
            <div className="container">
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table ">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Proposal Id</TableCell>
                        <TableCell align="center">Team Name</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    Table Data
                    {proposalsList.map((proposal) => (
                    <TableRow key = {proposal.proposalId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{proposal.proposalId}</TableCell>
                        <TableCell align="center">{proposal.receiverTeamName}</TableCell>
                        <TableCell align="center">{proposal.amount}</TableCell>
                        <TableCell align="center">{proposal.status}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                
            </Table>
            </TableContainer>
            </div>

        </div>
    );
}

{/*Functionality: Displays detailed information about a specific sponsor.
o	Endpoints:
	GET /sponsor/{sponsorId} to fetch sponsor details.

o	Functions:
	fetchSponsorDetails(sponsorId): Fetches detailed information about a sponsor.
 */}