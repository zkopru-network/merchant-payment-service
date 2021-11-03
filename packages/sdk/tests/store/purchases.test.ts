import {Stocks} from "../../src/store/stocks";
import {StoreRepository} from "../../src/infra/database";
import path from "path";
import {Purchases} from "../../src/store/purchases";
import {testStock1} from "./golden";
import {ShieldedTxDto} from "../../src/store/dto";
import {zktx_1} from "./golden/zktx.golden";

const mockServer = require("mockttp").getLocal();


describe('Purchases', () => {
    let purchases: Purchases;
    let stocks: Stocks;
    let repository: StoreRepository
    beforeAll(async () => {
        await initDb();
        purchases = new Purchases(repository, "http://localhost:8888");
        stocks = new Stocks(repository);
    })
    beforeEach(async () => {
        await initDb();
        mockServer.start(8888);
    })
    afterEach(() => mockServer.stop());

    describe('request', () => {
        it('success request', async () => {
            await stocks.register(testStock1, "sign");
            const purchase = await purchases.request(1, {} as ShieldedTxDto);

            expect(purchase.stockId).toEqual(testStock1.id);
        })
    })
    describe('confirm', () => {
        jest.setTimeout(50000);
        it('success confirm', async () => {
            await mockServer.post("/txs").thenReply(200, "");

            await stocks.register(testStock1, "sign");
            const purchase = await purchases.request(1, {from:"0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b", encodedTx: ""} as any);
            await purchases.confirm(testStock1.id, new ShieldedTxDto(testStock1.ownerAddress, zktx_1.encode().toString()));

            expect((await purchases.getAll({stockId: testStock1.id}))[0].confirmed)
                .toEqual(true);

        })
    })
    describe('get', () => {
        it('success get', async () => {
            await stocks.register(testStock1, "sign");
            const purchase = await purchases.request(1, {} as ShieldedTxDto);

            expect((await purchases.getAll({stockId: testStock1.id})).length)
                .toEqual(1);
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