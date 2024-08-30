import { UUID } from "crypto";

export interface PlayerProposalInterface {
    proposalId?: UUID,
    status: string,
    senderSponsorId?: UUID,
    receiverPlayer?: UUID,
    amount: number

}