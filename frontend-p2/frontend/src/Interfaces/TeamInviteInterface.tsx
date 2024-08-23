export interface TeamInviteProposal {
    proposalId?: number,
    status: string,
    senderManagerId?: number,
    receiverPlayerId?: number,
    amount: number
}