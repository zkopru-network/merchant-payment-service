"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const stocks_1 = require("@merchant-payment-service/sdk/src/store/stocks");
const database_1 = require("@merchant-payment-service/sdk/src/infra/database");
const golden_1 = require("./golden/index");
describe('Stocks', () => {
    let stocks;
    let repository;
    beforeAll(async () => {
        await initDb();
        stocks = new stocks_1.Stocks(repository);
    });
    beforeEach(async () => {
        await initDb();
    });
    describe('register', () => {
        it('success register', async () => {
            await stocks.register(golden_1.testStock1, "sign");
            expect((await stocks.getAll({ id: golden_1.testStock1.id }))[0].ownerAddress)
                .toEqual(golden_1.testStock1.ownerAddress);
        });
    });
    describe('delete', () => {
        it('success delete', async () => {
            await stocks.register(golden_1.testStock1, "sign");
            console.log((await stocks.getAll({ id: golden_1.testStock1.id })));
            await stocks.delete(1, "sign");
            expect((await stocks.getAll({ id: golden_1.testStock1.id })).length)
                .toEqual(0);
        });
    });
    describe('get', () => {
        it('success get', async () => {
            await stocks.register(golden_1.testStock1, "sign");
            await stocks.register(golden_1.testStock2, "sign");
            expect((await stocks.getAll({})).length)
                .toEqual(2);
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
//# sourceMappingURL=stocks.test.js.map