"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const store_controller_1 = require("../src/v1/store/store.controller");
const store_service_1 = require("../src/v1/store/store.service");
const supertest_1 = __importDefault(require("supertest"));
const jest_mock_1 = require("jest-mock");
const moduleMocker = new jest_mock_1.ModuleMocker(global);
describe('storeController', function () {
    let app;
    let storeController;
    let storeService;
    let purchaseStorage = [{ id: 111 }];
    let stockStorage = [];
    beforeEach(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            controllers: [store_controller_1.StoreController],
            providers: [store_service_1.StoreService]
        }).useMocker((token) => {
            if (token == "STORE") {
                return {
                    purchases: {
                        getAll: () => purchaseStorage,
                        get: (option) => {
                            purchaseStorage.filter(x => option.id == x.id);
                        }
                    }
                };
            }
            if (token == "WALLET") {
                const mockMetadata = moduleMocker.getMetadata(token);
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);
                return Mock;
            }
        })
            .compile();
        storeController = moduleRef.get(store_controller_1.StoreController);
        storeService = moduleRef.get(store_service_1.StoreService);
        app = moduleRef.createNestApplication();
        await app.init();
    });
    describe("purchases", () => {
        it('GET /store/purchases', async () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .get("/store/purchases")
                .expect(200);
        });
        it('GET /store/purchases/:purchaseId', async () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .get("/store/purchases/111")
                .expect(200);
        });
        it('POST /store/purchases', async () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .post("/store/purchases")
                .expect(200);
        });
    });
    describe("stocks", () => {
        it('GET /store/stocks', async () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .get("/store/stocks")
                .expect(200);
        });
        it('POST /store/stocks', async () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .get("/store/stocks")
                .expect(200);
        });
        it('GET /store/stocks/:stockId', async () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .get("/store/purchases/111")
                .expect(200);
        });
    });
});
//# sourceMappingURL=store.controller.test.js.map