"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testStock2 = exports.testStock1 = void 0;
const stock_dto_1 = require("../../../src/store/dto/stock.dto");
exports.testStock1 = {
    id: 1,
    address: "0x0",
    ownerAddress: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
    price: '1000000000000',
    type: stock_dto_1.AssetType.ERC721,
    atomicSwapSalt: "1",
    assetId: "111"
};
exports.testStock2 = {
    id: 2,
    address: "0x0",
    ownerAddress: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
    price: '1000000000000',
    type: stock_dto_1.AssetType.ERC721,
    atomicSwapSalt: "2",
    assetId: "111"
};
//# sourceMappingURL=stocks.golden.js.map