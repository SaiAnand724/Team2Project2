import { UUID } from "crypto";

export interface TeamInviteProposal {
    proposalId: string,
    status: string,
    teamName: string,
    receiverUsername: string,
    senderUsername:string,
    amount: number
}