import { UUID } from "crypto";

// Team model
export interface TeamInterface {
    teamId: string,
    teamName: string,
    TeamSponsorId?: number,
    TeamSponsors?: string,
    teamMembers?: string,
    balance: number
}