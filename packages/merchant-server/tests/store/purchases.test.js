"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stocks_1 = require("@merchant-payment-service/sdk/src/store/stocks");
const database_1 = require("@merchant-payment-service/sdk/src/infra/database");
const path_1 = __importDefault(require("path"));
const purchases_1 = require("@merchant-payment-service/sdk/src/store/purchases");
const golden_1 = require("./golden/index");
const dto_1 = require("@merchant-payment-service/sdk/src/store/dto");
const zktx_golden_1 = require("./golden/zktx.golden");
const mockServer = require("mockttp").getLocal();
describe('Purchases', () => {
    let purchases;
    let stocks;
    let repository;
    beforeAll(async () => {
        await initDb();
        purchases = new purchases_1.Purchases(repository, "http://localhost:8888");
        stocks = new stocks_1.Stocks(repository);
    });
    beforeEach(async () => {
        await initDb();
        mockServer.start(8888);
    });
    afterEach(() => mockServer.stop());
    describe('request', () => {
        it('success request', async () => {
            await stocks.register(golden_1.testStock1, "sign");
            const purchase = await purchases.request(1, {});
            expect(purchase.stockId).toEqual(golden_1.testStock1.id);
        });
    });
    describe('confirm', () => {
        jest.setTimeout(50000);
        it('success confirm', async () => {
            await mockServer.post("/txs").thenReply(200, "");
            await stocks.register(golden_1.testStock1, "sign");
            const purchase = await purchases.request(1, { from: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b", encodedTx: "" });
            await purchases.confirm(golden_1.testStock1.id, new dto_1.ShieldedTxDto(golden_1.testStock1.ownerAddress, zktx_golden_1.zktx_1.encode().toString()));
            expect((await purchases.getAll({ stockId: golden_1.testStock1.id }))[0].confirmed)
                .toEqual(true);
        });
    });
    describe('get', () => {
        it('success get', async () => {
            await stocks.register(golden_1.testStock1, "sign");
            const purchase = await purchases.request(1, {});
            expect((await purchases.getAll({ stockId: golden_1.testStock1.id })).length)
                .toEqual(1);
        });
    });
    async function initDb() {
        repository = new database_1.StoreRepository({
            type: "sqlite",
            database: "/tmp/dev.sqlite",
            entities: [path_1.default.join(__dirname, "../../src/entities/*.ts")],
            synchronize: true
        });
        await repository.dropTable();
    }
});
//# sourceMappingURL=purchases.test.js.map