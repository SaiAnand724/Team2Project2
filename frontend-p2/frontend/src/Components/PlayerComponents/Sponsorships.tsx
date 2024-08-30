import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { SponsoredTeamsInterface } from "../../Interfaces/SponsoredTeamsInterface";
import { useState, useEffect } from "react";

export const Sponsorships: React.FC<{ sponsorships: SponsoredTeamsInterface[] }> = ({ sponsorships }) => {
    const [filteredSponsorships, setFilteredSponsorships] = useState<SponsoredTeamsInterface[]>([]);

    useEffect(() => {
        // Filter the sponsorships by "Accepted" status
        const acceptedSponsorships = sponsorships.filter(sponsorship => sponsorship.status === "Accepted");
        setFilteredSponsorships(acceptedSponsorships);
    }, [sponsorships]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Team Name</TableCell>
                        <TableCell>Sponsors</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredSponsorships.map((sponsorship) => (
                        <TableRow key={sponsorship.proposalId}>
                            <TableCell>{sponsorship.team_name}</TableCell>
                            <TableCell>{sponsorship.sponsor_name}</TableCell>
                            <TableCell>{sponsorship.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
