import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { TeamInterface } from "../../Interfaces/TeamInterface";

export const Sponsorships:React.FC<{sponsorships:TeamInterface[]}> = ({sponsorships}) => {

    return(
        <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Team Name</TableCell>
                            <TableCell>Sponsors</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sponsorships.map((sponsorship) => (
                            <TableRow key={sponsorship.TeamSponsorId}>
                                <TableCell>{sponsorship.teamName}</TableCell>
                                <TableCell>{sponsorship.TeamSponsors}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )

}