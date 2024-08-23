import { UUID } from "crypto";

// Sponsor Model
export interface SponsorInterface {
    sponsorId?: UUID,
    username: string,
    password: string,
    category: string,
    name: string,
    budget: number,
    proposalsId?: number
}