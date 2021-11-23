import {AssetType} from "@merchant-payment-service/sdk/lib/store/dto/stock.dto";


export interface RegisterStockDto {
    assetType: AssetType;
    address: string;
    ownerAddress: string;
    price: string;
    atomicSwapSalt: string;
    sign: string;
}