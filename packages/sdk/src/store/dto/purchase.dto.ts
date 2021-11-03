export interface PurchaseDto {
    stockId: number;
    receiptHash?: string;
    clientShieldTx: string;
    merchantShieldTx?: string;
    confirmed: boolean;
}