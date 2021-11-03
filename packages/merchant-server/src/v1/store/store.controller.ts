import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {StoreService} from "./store.service";
import {RequestPurchaseDto} from "../../dto/request-purchase.dto";
import {RequestPurchaseResponseDto} from "../../dto/request-purchase-response.dto";
import {PurchaseDto, StockDto} from "@merchant-payment-service/sdk/lib/store/dto";
import {RegisterStockDto} from "../../dto/register-stock.dto";
import {ConfirmPurchaseDto} from "../../dto/confirm-purchase.dto";

@Controller("/store")
export class StoreController {
    private storeService: StoreService;

    constructor(storeService: StoreService) {
        this.storeService = storeService;
    }

    @Get("/purchases")
    async getAllPurchases() {
        // todo: more query
        return await this.storeService.getPurchases({});
    }

    @Get("/purchases/:purchaseId")
    async getPurchase(
        @Query() purchaseId: string
    ) {
        return await this.storeService.getPurchases({id: parseInt(purchaseId)});
    }

    @Post("/purchases/request")
    async requestPurchase(
        @Body() request: RequestPurchaseDto
    ): Promise<RequestPurchaseResponseDto> {
        return await this.storeService.requestPurchases(
            request.stockId,
            request.from,
            request.encodedTx
        );
    }

    @Post("/purchases/confirm")
    async confirmPurchase(
        @Body() request: ConfirmPurchaseDto
    ): Promise<PurchaseDto> {
        return await this.storeService.confirmPurchases(
            request.stockId,
            request.from,
            request.encodedTx,
        );
    }

    @Get("/stocks")
    async getAllStocks(): Promise<StockDto[]> {
        // todo: more query
        return await this.storeService.getStocks({});
    }

    @Get("/stocks/:stockId")
    async getStock(
        @Query() stockId: string
    ): Promise<StockDto> {
        const result = await this.storeService.getStocks({id: parseInt(stockId)});
        return result.length > 0 ? result[0] : {} as StockDto;
    }

    @Post("/stocks")
    async registerStock(
        @Body() request: RegisterStockDto
    ) {
        return await this.storeService.registerStock(
            request.assetType,
            request.address,
            request.ownerAddress,
            request.price,
            request.atomicSwapSalt,
            request.sign
        );
    }

}