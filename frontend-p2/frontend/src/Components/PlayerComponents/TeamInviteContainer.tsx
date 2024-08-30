import { useEffect, useState } from "react"
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface"
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { TeamInvite } from "../TeamComponents/TeamInvite"
import './TeamInviteContainer.css';
import { PlayerNavbar } from "./PlayerNavbar"
import { userStore } from "../../globalStore/store"
import { toast, ToastContainer } from "react-toastify"

export const TeamInviteContainer:React.FC = () => {

    const [invites, setInvites] = useState<TeamInviteProposal[]>([])
    const navigate = useNavigate()


    useEffect(() => {
        getAllInvites()
        console.log({invites})
        
    }, [])
    



    const getAllInvites = async () => {
        const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "")

        const token = r.jwt


        try {

            const response = await axios.get(`${userStore.backendURL}/user/teaminvite/received`, {
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
    const refreshInvites = async () => {

        await getAllInvites()
        navigate("/player/team/invites")

    }
    
    return (

        <div className="team-invite-container">            

            <TeamInvite invites={invites}></TeamInvite>
            <ToastContainer/>
        </div>
    )

}