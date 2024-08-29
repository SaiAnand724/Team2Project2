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
    const r = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "")
    console.log(r.jwt)

    useEffect(() => {
        const sortedProposals = proposalsList.sort();
        // 
        setProposalsList(sortedProposals);
    }, []);

  return (
    <div>
    
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
          }}>
        
          <div className="grid-container" style={{ display: "flex", marginLeft: "50px" }} >
              <SponsorCard proposals={proposalsList}></SponsorCard>
          </div>

          <div>
            <div style={{ display: "flex", textAlign: "center", marginRight: "140px", marginLeft: "100px", paddingLeft: "20px" }}>
              <SponsorBudget proposals={proposalsList} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
