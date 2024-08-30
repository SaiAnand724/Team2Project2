
import { useEffect, useState } from "react";
import { userStore } from "../../globalStore/store";


import { Divider, Grid } from "@mui/material";
import { ManagerNavbar } from "./ManagerNavbar";
import { TeamCard } from "./TeamCard";
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface";
import { UserInterface } from "../../Interfaces/UserInterface";
import { TeamBalanceInfo } from "./TeamBalance";
import { TeamMembers } from "./TeamList";



export const ManagerDashboard: React.FC = () => {

    const managerURL = `${userStore.baseURL}/user`

    const [proposalsList, setProposalsList] = useState<TeamProposalInterface[]>([]) /**  */
    const [teamMemberList, setTeamMemberList] = useState<UserInterface[]>([]) /** */

    useEffect(() => {
        const sortedProposals = proposalsList.sort();
        setProposalsList(sortedProposals);
    }, []);


  return (
    <div>

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
                            <h2>Team Balance + Manager Salary Info</h2>
                            <TeamBalanceInfo></TeamBalanceInfo>
                        </div>

                        <br />
                        <br />

                        <div style={{ textAlign: 'center', marginRight: '225px' }}>
                            <TeamMembers teamMembers={teamMemberList}></TeamMembers>
                        </div>




                </div>
                

                
            </div>
        </div>
    </div>
  );
};