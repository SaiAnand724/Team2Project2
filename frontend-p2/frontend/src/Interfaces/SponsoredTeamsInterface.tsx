import { UUID } from "crypto";

export interface SponsoredTeamsInterface {
    proposalId: string,
    amount: number,
    status: string,
    sponsor_name: string,
    team_name: string,
}

export interface AggregateTeamInvestmentsInterface {
    teamId?: UUID,
    teamName: string,
    totalInvestment: number,
}