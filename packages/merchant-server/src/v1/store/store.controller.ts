import {Body, Controller, Get, Post, Query, UseGuards} from "@nestjs/common";
import {StoreService} from "./store.service";
import {RequestPurchaseDto} from "./dto/request-purchase.dto";
import {RequestPurchaseResponseDto} from "./dto/request-purchase-response.dto";
import {PurchaseDto, StockDto} from "@merchant-payment-service/sdk/lib/store/dto";
import {RegisterStockDto} from "./dto/register-stock.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller("/store")
@ApiTags("store")
export class StoreController {
    private storeService: StoreService;

    constructor(storeService: StoreService) {
        this.storeService = storeService;
    }

    @Get("/purchases")
    @ApiOperation({
        description: "get purchases"
    })
    async getAllPurchases() {
        // todo: more query
        return await this.storeService.getPurchases({});
    }

    @Get("/purchases/:purchaseId")
    @ApiOperation({
        description: "get specific purchases"
    })
    async getPurchase(
        @Query() purchaseId: string
    ) {
        return await this.storeService.getPurchases({id: parseInt(purchaseId)});
    }

    @Post("/purchases")
    @ApiOperation({
        description: "request purchase"
    })
    async requestPurchase(
        @Body() request: RequestPurchaseDto
    ): Promise<RequestPurchaseResponseDto> {
        return await this.storeService.requestAndConfirmPurchases(
            request.stockId,
            request.from,
            request.encodedTx
        );
    }

    @Get("/stocks")
    @ApiOperation({
        description: "get all stocks"
    })
    async getAllStocks(): Promise<StockDto[]> {
        // todo: more query
        return await this.storeService.getStocks({});
    }

    @Get("/stocks/:stockId")
    @ApiOperation({
        description: "get specific stock"
    })
    async getStock(
        @Query() stockId: string
    ): Promise<StockDto> {
        const result = await this.storeService.getStocks({id: parseInt(stockId)});
        return result.length > 0 ? result[0] : {} as StockDto;
    }

    @UseGuards(JwtAuthGuard)
    @Post("/stocks")
    @ApiOperation({
        description: "register a stock"
    })
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