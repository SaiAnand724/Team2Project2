import { useEffect, useState } from "react"
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface"
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { PlayerNavbar } from "./PlayerNavbar"
import { TeamInterface } from "../../Interfaces/TeamInterface"
import { Sponsorships } from "./Sponsorships"

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

        <div>
            <div>
                <PlayerNavbar></PlayerNavbar>
            </div>
            
            <Sponsorships sponsorships={sponsorships}></Sponsorships>
            
        </div>
    )

}