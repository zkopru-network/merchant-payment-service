import {Merchant, OptionMerchantSdk} from "../../src";
import {AssetType, Product} from "../../src/entities/product";
import {DB} from "../../src/db";
import path from "path";

describe('Products', () => {
    const merchant = new Merchant({ databaseType: "sqlite", databaseUrl: "/tmp/dev.sqlite"} as OptionMerchantSdk)
    const testProduct1 = {
        id: 1,
        address: "0x0",
        createdAt: new Date(),
        paymentType: AssetType.ERC20,
        price: '1000000000000',
        type: AssetType.ERC721,
        assetId: "111"
    } as unknown as Product
    const testProduct2 = {
        id: 2,
        address: "0x0",
        createdAt: new Date(),
        paymentType: AssetType.ERC20,
        price: '1000000000000',
        type: AssetType.ERC721,
        assetId: "111"
    } as unknown as Product
    beforeEach(async () =>{
        const db = new DB({
                    type: "sqlite",
            database: "/tmp/dev.sqlite",
            entities: [path.join(__dirname, "../../src/entities/*.ts")],
            synchronize: true
        } as any);
        const connection = await db.connection("test");
        await connection.synchronize(true)
    })
    describe('Register', () => {
        it('Success register products', async () => {
            await merchant.products.register(testProduct1)
            expect(await merchant.products.get(testProduct1.id)).toEqual(testProduct1)
        })
    })
    describe('Unregister', () => {
        it('Success unregister products', async () => {
            await merchant.products.register(testProduct1)
            expect(await merchant.products.get(testProduct1.id)).toEqual(testProduct1)

            await merchant.products.unregister(testProduct1.id);
            expect(await merchant.products.get(testProduct1.id)).toEqual(undefined)
        })
    })
    describe('getAll', () => {
        it('success get all registered product', async () => {
            await merchant.products.register(testProduct1)
            await merchant.products.register(testProduct2)

            expect(await merchant.products.getAll()).toEqual(
                [testProduct1, testProduct2]
            )
        })
    })
    describe('atomicSwapInformation', function () {
        it('',async () => {

        })
    });
    describe('broadcastAtomicSwapTx', function () {
        it('',async () => {

        })
    });
})