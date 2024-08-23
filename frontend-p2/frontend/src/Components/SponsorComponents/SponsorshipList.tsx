import { useState } from "react";
import { SponsorInterface } from "../../Interfaces/SponsorInterface";

export const SponsorshipList:React.FC<{sponsors:SponsorInterface[]}> = (sponsors) => {
    
    const [teamsSponsoredList, sendTeamsSponsoredList] = useState([]);


    return (
        <div className="sponsorship-list">

        </div>
    );
}

{/*Functionality: Displays a list of sponsors.
o	Endpoints:
	GET /sponsors to fetch all sponsors.

o	Functions:
	fetchSponsors(): Fetches and displays a list of sponsors.
 */}