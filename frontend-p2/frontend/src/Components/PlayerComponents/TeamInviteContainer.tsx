import { useEffect, useState } from "react"
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface"
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { TeamInvite } from "../TeamComponents/TeamInvite"
import './TeamInviteContainer.css';

export const TeamInviteContainer:React.FC = () => {

    const [invites, setInvites] = useState<TeamInviteProposal[]>([])


   {/* useEffect(() => {
        getAllInvites()
    }, [])
    */}



    const getAllInvites = async () => {
        const response = await axios.get("http://localhost:8080/user/teaminvite/received")

        setInvites(response.data)

        console.log(response.data)
    }
    
    return (

        <div className="team-invite-container">            
            <TeamInvite invites={invites}></TeamInvite>
        </div>
    )

}