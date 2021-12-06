export interface PurchaseDto {
    id?: number;
    stockId: number;
    receiptHash?: string;
    clientShieldTx: string;
    merchantShieldTx?: string;
    confirmed: boolean;
}