import { useEffect, useState } from "react"
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface"
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { PlayerNavbar } from "./PlayerNavbar"
import { TeamInterface } from "../../Interfaces/TeamInterface"
import { Sponsorships } from "./Sponsorships"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export const SponsorshipContainer:React.FC = () => {

    const [sponsorships, setSponsorships] = useState<TeamInterface[]>([])

    useEffect(() => {
        getAllSponsorships()
    }, [])
    



    const getAllSponsorships = async () => {
        const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "")

        const token = r.jwt

        try {
            const response = await axios.get("http://localhost:8080/user/sponsors/Accepted", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            setSponsorships(response.data)

            console.log(response.data)
        }
        catch(error) {
            console.log("Can't get sponsors")
            toast.error("Couldn't display sponsors")
        }
    }


    
    return (

        <div>

            
            <Sponsorships sponsorships={sponsorships}></Sponsorships>
            <ToastContainer/>
            
        </div>
    )

}