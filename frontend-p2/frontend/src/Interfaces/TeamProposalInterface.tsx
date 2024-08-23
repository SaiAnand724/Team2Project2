import { UUID } from "crypto";

export interface TeamProposalInterface {
    proposalId?: UUID,
    status: string,
    senderSponsorId?: UUID,
    receiverTeam?: UUID,
    amount: number

}