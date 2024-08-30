import { UUID } from "crypto";

export interface TeamProposalInterface {
    proposalId: string,
    status: string,
    sponsor_name: string,
    team_name: string,
    amount: number

}