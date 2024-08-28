import { useEffect, useState } from "react"
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface"
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { TeamInvite } from "../TeamComponents/TeamInvite"
import { PlayerNavbar } from "./PlayerNavbar"
import { userStore } from "../../globalStore/store"
import { toast } from "react-toastify"

export const TeamInviteContainer:React.FC = () => {

    const [invites, setInvites] = useState<TeamInviteProposal[]>([])


    useEffect(() => {
        getAllInvites()
        console.log({invites})
    }, [])
    



    const getAllInvites = async () => {
        const token = userStore.loggedInUser.jwt
        console.log(userStore.loggedInUser.jwt)

        try {

            const response = await axios.get("http://localhost:8080/user/teaminvite/received", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            setInvites(response.data)

            console.log(response.data)
        } catch(error) {
            console.log("Error getting invites")
            toast.error("Couldn't get invites")
        }
    }
    
    return (

        <div>
            <div>
                <PlayerNavbar></PlayerNavbar>
            </div>
            
            <TeamInvite invites={invites}></TeamInvite>
        </div>
    )

}