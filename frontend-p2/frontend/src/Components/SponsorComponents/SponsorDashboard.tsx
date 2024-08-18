import React, { useState } from 'react';
import { SponsorNavbar } from './SponsorNavbar';
import { Grid } from '@mui/material';
import { SponsorCard } from './SponsorCard';

export const SponsorDashboard: React.FC = () => {

  return (
    <div>
        <div>
            <SponsorNavbar></SponsorNavbar>
        </div>
        <div>
            <h3 style={{textAlign:'center'}}>Sponsor Details</h3>
            <div>
                <Grid>
                    <SponsorCard></SponsorCard>
                </Grid>
                {/** Have this on the right -> <SponsorBudget></SponsorBudget>*/}
                <div> Ya boi </div>
            </div>
        </div>
    </div>
  );
};
