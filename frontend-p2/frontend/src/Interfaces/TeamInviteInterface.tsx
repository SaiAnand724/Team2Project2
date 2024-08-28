import { UUID } from "crypto";

export interface TeamInviteProposal {
    proposalId?: UUID,
    status: string,
    teamName: string,
    receiverUsername: string,
    senderUsername:string,
    amount: number
}