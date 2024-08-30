import { useEffect, useState } from "react"
import { TeamProposalInterface } from "../../Interfaces/TeamProposalInterface"
import { TeamInviteProposal } from "../../Interfaces/TeamInviteInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { TeamInterface } from "../../Interfaces/TeamInterface"
import { Sponsorships } from "./Sponsorships"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import './SponsorshipContainer.css'
import { SponsoredTeamsInterface } from "../../Interfaces/SponsoredTeamsInterface"
import { store } from "../../globalStore/store"


export const SponsorshipContainer:React.FC = () => {

    const [sponsorships, setSponsorships] = useState<SponsoredTeamsInterface[]>([])

    useEffect(() => {
        getAllSponsorships()
    }, [])
    



    const getAllSponsorships = async () => {
        const r = JSON.parse(localStorage.getItem('loggedInUser') ?? "")

        const token = r.jwt

        try {
            const response = await axios.get(`${store.backendURL}/user/sponsors/Accepted`, {
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

        <div className="sponsorhip-container">
            
            <Sponsorships sponsorships={sponsorships}></Sponsorships>
            <ToastContainer/>
            
        </div>
    )

}