import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { UserInterface } from "../../Interfaces/UserInterface";
import { Button } from "@mui/material";
import axios from "axios";

import { store, userStore } from "../../globalStore/store";


import { toast, ToastContainer } from "react-toastify";


export const TeamMembers:React.FC<{teamMembers:UserInterface[]}> = ({teamMembers}) => {
    const [teamMemberList, setTeamMemberList] = useState<UserInterface[]>(teamMembers) /** */

    const managerURL = `${store.backendURL}/user`


    useEffect(() => {
        fetchAllTeamMembers()
    }, [teamMemberList]);

    
    const fetchAllTeamMembers = async () => {
        try {
            let response: any = null;
            const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "")
            console.log(r.jwt)
            response = await axios.get(`${managerURL}/user`, {
              headers: {
                'Authorization': `Bearer ${r.jwt}`,
                'Content-Type': 'application/json'
              },
            })
            setTeamMemberList(response.data)
            console.log(response.data)
            
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
            toast.success("Role changed")
        }
        catch {
            console.log("Error changing member role")
            toast.error("Couldn't change role")
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
            toast.success("Player Removed")
        }
        catch {
            console.log("Error removing member from team")
            toast.error("Couldn't Remove Player")
        }
    }



    return(
        <div style={{ textAlign: 'center', marginLeft: '50px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '25px'}}>Team Members</h2>
            <div className="container" style={{ textAlign: 'center', marginLeft: '50px' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Member ID</TableCell>
                        <TableCell align="center">Member Username</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Salary</TableCell>
                        <TableCell align="center">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teamMemberList.map((teamMember) => (
                    <TableRow key={teamMember.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{teamMember.userId}</TableCell>
                        <TableCell align="center">{teamMember.username}</TableCell>
                        <TableCell align="center">{teamMember.role}</TableCell>
                        <TableCell align="center">${teamMember.salary}</TableCell>
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
            <ToastContainer/>
        </div>
    )
}

{/*Functionality: Displays a list of teams.
o	Endpoints:
	GET /teams to fetch all teams.

o	Functions:
	fetchTeams(): Fetches and displays a list of teams.
 */}