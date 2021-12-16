export enum AssetType {
    ERC20 = "ERC20",
    ERC721 = "ERC721"
}

export interface StockDto {
    id?: number;
    assetType: AssetType;
    address: string;
    ownerAddress: string;
    assetId?: string;
    price: string;
    createdAt: Date;
    atomicSwapSalt: string;
}