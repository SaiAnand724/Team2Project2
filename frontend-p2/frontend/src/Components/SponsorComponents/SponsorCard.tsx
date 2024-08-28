import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { SponsorInterface } from "../../Interfaces/SponsorInterface";
import axios from "axios";
import { sponsorStore } from "../../globalStore/store";
import { useEffect, useState } from "react";
import { SponsoredTeamsInterface } from "../../Interfaces/SponsoredTeamsInterface";

export const SponsorCard: React.FC<{
  proposals: SponsoredTeamsInterface[];
}> = ({ proposals }) => {
  const sponsorURL = `${sponsorStore.baseURL}/sponsor`;

  const [proposalsList, setProposalsList] =
    useState<SponsoredTeamsInterface[]>(proposals); /** */
  {
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
    //fetchPendingProposals()
  }, []);

  const fetchPendingProposals = async () => {
    try {
      let response: any = null;
      response = await axios.get(`${sponsorURL}/proposals/Pending`);
      setProposalsList(response.data);
      console.log(response.data);
    } catch {
      console.log("Error fetching pending proposals");
    }
  };

  const fetchInvestedTeams = async () => {
    try {
      let response: any = null;
      response = await axios.get(`${sponsorURL}/teams`);
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
             *             <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              columns={2}
              spacing={3}
            >
             */
  }
  return (
    <div style={{ width: "100%" }}>
      <Grid container spacing={3}>
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

        {/* Additional Grid items go here */}


      </Grid>
    </div>
  );
};

{
  /**
            ))}
             */
}
{
  /*Endpoints:
	GET /sponsor/{sponsorId} to fetch details of a specific sponsor.

o	Functions:
	fetchSponsorDetails(sponsorId): Fetches details of a specific sponsor.
*/
}
