export class WithdrawNftDto {
    eth: string;
    addr: string;
    nft: string;
    amount: string;
    fee: string;
    toL1Address?: string
}