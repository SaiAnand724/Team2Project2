export interface TeamInviteProposal {
    proposalId?: number,
    status: string,
    teamName: string,
    receiverUsername: string,
    senderUsername:string,
    amount: number
}