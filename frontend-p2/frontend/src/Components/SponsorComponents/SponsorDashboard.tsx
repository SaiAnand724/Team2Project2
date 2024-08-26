import React, { useEffect, useState } from 'react';
import { SponsorNavbar } from './SponsorNavbar';
import { Divider, Grid } from '@mui/material';
import { SponsorCard } from './SponsorCard';
import { sponsorStore } from "../../globalStore/store"
import { SponsoredTeamsInterface } from '../../Interfaces/SponsoredTeamsInterface';
import SponsorBudget from './SponsorBudget';

export const SponsorDashboard:React.FC = () => {

    const sponsorURL = `${sponsorStore.baseURL}/sponsor`

    const [proposalsList, setProposalsList] = useState<SponsoredTeamsInterface[]>([]) /**  */

    useEffect(() => {
        const sortedProposals = proposalsList.sort();
        // 
        setProposalsList(sortedProposals);
    }, []);

  useEffect(() => {
    const sortedProposals = proposalsList.sort();
    setProposalsList(sortedProposals);
  }, []);

  return (
    <div>
      <div>
        <SponsorNavbar></SponsorNavbar>
      </div>
      <div className="app-container">
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          Sponsor Details
        </h2>
        <Divider />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: "25px",
          }}
        >
          <div className="grid-container" style={{ marginLeft: "50px" }}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              columns={2}
            >
              <SponsorCard proposals={proposalsList}></SponsorCard>
            </Grid>
          </div>

          <div>
            <div style={{ textAlign: "center", marginRight: "225px" }}>
              <SponsorBudget proposals={proposalsList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
