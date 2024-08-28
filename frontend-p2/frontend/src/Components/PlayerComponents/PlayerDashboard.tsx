
import { useEffect, useState } from "react";
import { userStore } from "../../globalStore/store";
import { PlayerProposalInterface } from "../../Interfaces/PlayerProposalInterface";
import { PlayerNavbar } from "./PlayerNavbar";
import { Divider, Grid } from "@mui/material";

import { PlayerCard } from "./PlayerCard";
import { Navbar } from "react-bootstrap";

export const PlayerDashboard: React.FC = () => {

    const sponsorURL = `${userStore.baseURL}/player`

    const [proposalsList, setProposalsList] = useState<PlayerProposalInterface[]>([]) /**  */

    useEffect(() => {
        const sortedProposals = proposalsList.sort();
        setProposalsList(sortedProposals);
    }, []);


  return (
    <div>
        <div >
            <Navbar></Navbar>
        </div>
        <div className='app-container'>
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Player Details</h2>
            <Divider/>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '25px' }}>

                <div className='grid-container' style={{ marginLeft: '50px' }}>
                    <Grid container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start" 
                            columns={2}>
                        <PlayerCard proposals={proposalsList}></PlayerCard>
                        
                    </Grid>
                </div>

                <div>




                        <div style={{ textAlign: 'center', marginRight: '225px' }}>
                            <h3 style={{ fontWeight: 'bold' }}>Salary: $$$</h3>
                        </div>     


                </div>
                

                
            </div>
        </div>
    </div>
  );
};

export {}

