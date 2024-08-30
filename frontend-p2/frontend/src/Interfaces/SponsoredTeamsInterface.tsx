import { UUID } from "crypto";

export interface SponsoredTeamsInterface {
    proposalId: string,
    amount: number,
    status: string,
    sponsor_name: string,
    team_name: string,
}

export interface AggregateTeamInvestmentsInterface {
    teamId?: string,
    teamName: string,
    totalInvestment: number,
}