import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { SponsorInterface } from "../../Interfaces/SponsorInterface";
import axios from "axios";
import { sponsorStore } from "../../globalStore/store";
import { useEffect, useState } from "react";
import { SponsoredTeamsInterface } from "../../Interfaces/SponsoredTeamsInterface";

export const SponsorCard: React.FC<{proposals: SponsoredTeamsInterface[];}> = ({ proposals }) => {
  const sponsorURL = `http://localhost:8080/sponsor`;

  const [proposalsList, setProposalsList] = useState<SponsoredTeamsInterface[]>(proposals); /** */{
    /** 
        const [activePropId, setActivePropId] = useState<number | null>(null);

        const [sponsorLoginCreds, setSponsorLoginCreds] = useState([sponsorStore.username, sponsorStore.password]) 
            
        sponsorLoginTemp()
        fetchPendingProposals()

            const sponsorLoginTemp = async () => {
        try {
            let response:any = null;
            response = await axios.post(`${sponsorStore.baseURL}/auth/sponsor/login`, sponsorLoginCreds ,{
                headers: { 'Content-Type': 'text/plain' },
            })
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    */
  }

  useEffect(() => {
    fetchPendingProposals()
  }, []);

  const fetchPendingProposals = async () => {
    try {
      let response: any = null;
      const r = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "")
      console.log(r.jwt)
      response = await axios.get(`${sponsorURL}/proposals/Pending`, {
        headers: {
          'Authorization': `Bearer ${r.jwt}`,
          'Content-Type': 'application/json'
        },
      })
      setProposalsList(response.data);
      console.log(response.data);
    } catch {
      console.log("Error fetching pending proposals");
    }
  };

  const fetchInvestedTeams = async () => {
    try {
      let response: any = null;
      const r = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "")
      console.log(r.jwt)
      response = await axios.get(`${sponsorURL}/teams`, {
        headers: {
          'Authorization': `Bearer ${r.jwt}`,
          'Content-Type': 'application/json'
        },
      })
      console.log(response.data);
    } catch {
      console.log("Error fetching invested teams");
    }
  };

  const openSponsPropDet = () => {
    {
      /* popover for more card details */
    }

    alert("Button has been clicked");
  };
  {
    /**
             * 
             * {proposalsList.map((proposal) => (
             * 
             * key = {proposal.proposalId}
             * 
             * 
             * <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: 300, width: 300 }}>
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" component="div">
                {" "}
                Placeholder{" "}
              </Typography>
              <Button variant="contained" onClick={openSponsPropDet}>
                <SettingsOutlinedIcon />
              </Button>
              <Box
                sx={{
                  backgroundColor: "#f0f0f0",
                  padding: "16px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "16px",
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ height: 300, width: 300 }}>
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" component="div">
                {" "}
                Placeholder{" "}
              </Typography>
              <Button variant="contained" onClick={openSponsPropDet}>
                <SettingsOutlinedIcon />
              </Button>
              <Box
                sx={{
                  backgroundColor: "#f0f0f0",
                  padding: "16px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "16px",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        </Grid>
        /* Additional Grid items go here */

  /**
            ))}
             */
  }
  return (
    <div style={{ width: "100%" }}>
        <h5 style={{ textAlign: 'center', marginBottom: '25px' }}>Pending Proposals</h5>
            <div className="container">
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table ">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Proposal Id</TableCell>
                        <TableCell align="center">Team Name</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {proposalsList.map((proposal) => (
                    <TableRow key = {proposal.proposalId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{proposal.proposalId}</TableCell>
                        <TableCell align="center">{proposal.team_name}</TableCell>
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
};

{

}
{
  /*Endpoints:
	GET /sponsor/{sponsorId} to fetch details of a specific sponsor.

o	Functions:
	fetchSponsorDetails(sponsorId): Fetches details of a specific sponsor.
*/
}
