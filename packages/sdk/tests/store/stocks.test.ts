import path from "path";
import {Stocks} from "../../src/store/stocks";
import {StoreRepository} from "../../src/infra/database";
import {testStock1, testStock2} from "./golden";

describe('Stocks', () => {
    let stocks: Stocks;
    let repository: StoreRepository
    beforeAll(async () => {
        await initDb();
        stocks = new Stocks(repository);
    })
    beforeEach(async () => {
        await initDb();
    })
    describe('register', () => {
        it('success register', async () => {
            await stocks.register(testStock1, "sign");

            expect((await stocks.getAll({id: testStock1.id}))[0].ownerAddress)
                .toEqual(testStock1.ownerAddress);
        })
    })
    describe('delete', () => {
        it('success delete', async () => {
            await stocks.register(testStock1, "sign");
            console.log((await stocks.getAll({id: testStock1.id})));
            await stocks.delete(1, "sign");

            expect((await stocks.getAll({id: testStock1.id})).length)
                .toEqual(0)
        })
    })
    describe('get', () => {
        it('success get', async () => {
            await stocks.register(testStock1, "sign");
            await stocks.register(testStock2, "sign");

            expect((await stocks.getAll({})).length)
                .toEqual(2);
        })
    })

    async function initDb() {
        repository = new StoreRepository({
            type: "sqlite",
            database: "/tmp/dev.sqlite",
            entities: [path.join(__dirname, "../../src/entities/*.ts")],
            synchronize: true
        })
        await repository.dropTable();
    }
})