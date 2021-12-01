import {Test} from '@nestjs/testing';
import {StoreController} from "../src/v1/store/store.controller";
import {StoreService} from "../src/v1/store/store.service";
import request from 'supertest';
import {INestApplication} from "@nestjs/common";
import {MockFunctionMetadata, ModuleMocker} from 'jest-mock';
import {PurchaseSearchOptions} from "@merchant-payment-service/sdk/lib/store/purchases";

const moduleMocker = new ModuleMocker(global);

describe('storeController', function () {
    let app:INestApplication;
    let storeController: StoreController;
    let storeService: StoreService;

    let purchaseStorage = [ {id: 111}]
    let stockStorage = []
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule(
            {
                controllers: [StoreController],
                providers: [StoreService]
            }
        ).useMocker((token) => {
            if (token == "STORE") {
                return {
                    purchases: {
                        getAll: () => purchaseStorage,
                        get: (option:PurchaseSearchOptions) => {purchaseStorage.filter(
                            x => option.id == x.id
                        )}
                    }
                }
            }
            if (token == "WALLET") {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);
                return Mock;
            }
        })
        .compile()
        storeController = moduleRef.get<StoreController>(StoreController);
        storeService = moduleRef.get<StoreService>(StoreService);
        app = moduleRef.createNestApplication();
        await app.init();
    })
    describe("purchases", () => {
        it('GET /store/purchases', async () => {
            return request(app.getHttpServer())
                .get("/store/purchases")
                .expect(200)

        })
        it('GET /store/purchases/:purchaseId', async () => {
            return request(app.getHttpServer())
                .get("/store/purchases/111")
                .expect(200)
        })
        it('POST /store/purchases', async () => {
            return request(app.getHttpServer())
                .post("/store/purchases")
                .expect(200)
        })
    })
    describe("stocks", () => {
        it('GET /store/stocks', async () => {
            return request(app.getHttpServer())
                .get("/store/stocks")
                .expect(200)
        })
        it('POST /store/stocks', async () => {
            return request(app.getHttpServer())
                .get("/store/stocks")
                .expect(200)
        })
        it('GET /store/stocks/:stockId', async () => {
            return request(app.getHttpServer())
                .get("/store/purchases/111")
                .expect(200)
        })
    })
});