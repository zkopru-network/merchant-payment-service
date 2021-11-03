import {StockDto} from "../../../src/store/dto";
import {AssetType} from "../../../src/store/dto/stock.dto";

export const testStock1 = {
    id: 1,
    address: "0x0",
    ownerAddress: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
    price: '1000000000000',
    type: AssetType.ERC721,
    atomicSwapSalt: "1",
    assetId: "111"
} as unknown as StockDto
export const testStock2 = {
    id: 2,
    address: "0x0",
    ownerAddress: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
    price: '1000000000000',
    type: AssetType.ERC721,
    atomicSwapSalt: "2",
    assetId: "111"
} as unknown as StockDto