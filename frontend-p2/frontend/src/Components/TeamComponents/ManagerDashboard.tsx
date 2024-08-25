
import { useEffect, useState } from "react";
import { userStore } from "../../globalStore/store";


import { Divider, Grid } from "@mui/material";
import { ManagerNavbar } from "./ManagerNavbar";
import { TeamCard } from "./TeamCard";
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface";



export const ManagerDashboard: React.FC = () => {

    const sponsorURL = `${userStore.baseURL}/`

    const [proposalsList, setProposalsList] = useState<TeamProposalInterface[]>([]) /**  */

    useEffect(() => {
        const sortedProposals = proposalsList.sort();
        setProposalsList(sortedProposals);
    }, []);


  return (
    <div>
        <div >
            <ManagerNavbar></ManagerNavbar>
        </div>
        <div className='app-container'>
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Manager Details</h2>
            <Divider/>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '25px' }}>

                <div className='grid-container' style={{ marginLeft: '50px' }}>
                    <Grid container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start" 
                            columns={2}>
                        <TeamCard proposals={proposalsList}></TeamCard>
                        
                    </Grid>
                </div>

                <div>

                        <div style={{ textAlign: 'center', marginRight: '225px' }}>
                            <h3 style={{ fontWeight: 'bold' }}>Team balance: $$$</h3>
                        </div>

                        <br />




                        <div style={{ textAlign: 'center', marginRight: '225px' }}>
                            <h3 style={{ fontWeight: 'bold' }}>Salary: $$$</h3>
                        </div>

                        <br />
                        <br />

                        <div style={{ textAlign: 'center', marginRight: '225px' }}>
                            <h3 style={{ fontWeight: 'bold' }}>Team Members:</h3>
                        </div>




                </div>
                

                
            </div>
        </div>
    </div>
  );
};