import { useEffect, useState } from "react"
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface"
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { TeamInterface } from "../../Interfaces/TeamInterface"
import { Sponsorships } from "./Sponsorships"
import './SponsorshipContainer.css'

export const SponsorshipContainer:React.FC = () => {

    const [sponsorships, setSponsorships] = useState<TeamInterface[]>([])

   {/* useEffect(() => {
        getAllSponsorships()
    }, [])
    */}



    const getAllSponsorships = async () => {
        const response = await axios.get("http://localhost:8080/sponsor/teams")

        setSponsorships(response.data)

        console.log(response.data)
    }


    
    return (

        <div className="sponsorhip-container">
            
            <Sponsorships sponsorships={sponsorships}></Sponsorships>
            
        </div>
    )

}