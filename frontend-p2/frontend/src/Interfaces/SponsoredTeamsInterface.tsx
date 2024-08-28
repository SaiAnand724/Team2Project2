import { UUID } from "crypto";

export interface SponsoredTeamsInterface {
    proposalId?: UUID,
    amount: number,
    status: string,
    senderSponsorName: string,
    receiverTeamName: string,
}

export interface AggregateTeamInvestmentsInterface {
    teamId?: UUID,
    teamName: string,
    totalInvestment: number,
}