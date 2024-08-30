import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { UserInterface } from "../../Interfaces/UserInterface";
import { Button } from "@mui/material";
import axios from "axios";
import { store, userStore } from "../../globalStore/store";

export const TeamMembers:React.FC<{teamMembers:UserInterface[]}> = ({teamMembers}) => {
    const [teamMemberList, setTeamMemberList] = useState<UserInterface[]>(teamMembers) /** */

    const managerURL = `${store.backendURL}/user`


    useEffect(() => {

    }, []);

    
    const fetchAllTeamMembers = async () => {
        try {
            
        }
        catch (error) {
        }
    }
    

    const changeRole = async () => {
        alert("Change Role button clicked")
        try {
            let response:any = null;
            //figure out query param logic
            const memberId = "UUID";
            response = await axios.patch(`${managerURL}/role/Manager?player_id=${memberId}`)
            setTeamMemberList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error changing member role")
        }
    }

    const fireUser = async () => {
        alert("Fire user button clicked")
        try {
            let response:any = null;
            //figure out query param logic
            const memberId = "UUID";
            response = await axios.patch(`${managerURL}/users/${memberId}`)
            setTeamMemberList(response.data)
            console.log(response.data)
        }
        catch {
            console.log("Error removing member from team")
        }
    }



    return(
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Team Members</h2>
            <div className="container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Member ID</TableCell>
                        <TableCell align="center">Member Name</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    Table Data vvv
                    {teamMemberList.map((teamMember) => (
                    <TableRow key={teamMember.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{teamMember.userId}</TableCell>
                        <TableCell align="center">{teamMember.firstName + " " + teamMember.lastName}</TableCell>
                        <TableCell align="center">{teamMember.role}</TableCell>
                        <TableCell align="center">
                        <Button variant="outlined" color="secondary" onClick={changeRole}> Change Role </Button> 
                        <Button variant="outlined" color="error" onClick={fireUser}> Fire </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            </div>
        </div>
    )
}

{/*Functionality: Displays a list of teams.
o	Endpoints:
	GET /teams to fetch all teams.

o	Functions:
	fetchTeams(): Fetches and displays a list of teams.
 */}