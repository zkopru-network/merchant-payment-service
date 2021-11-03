import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";
import {PurchaseDto, StockDto} from "../../store/dto";
import {Connection, createConnection, FindManyOptions, getConnection, Repository} from "typeorm";
import {Purchase} from "../../entities/pruchase";
import {Stock} from "../../entities/stock";
import {PurchaseSearchOptions} from "../../store/purchases";
import {StockSearchOptions} from "../../store/stocks";


export class StoreRepository {
    private option: ConnectionOptions

    constructor(option: ConnectionOptions) {
        this.option = option;
    }

    async createPurchase(purchaseDto: PurchaseDto): Promise<PurchaseDto> {
        const repository = await this.getPurchaseRepository();
        try {
            await repository.save(this.purchaseDtoToEntity(purchaseDto))
            return purchaseDto;
        } catch (e) {
            throw new Error(`db error:${e}`);
        }
    }

    async getPurchases(searchOption: PurchaseSearchOptions): Promise<PurchaseDto[]> {
        const repository = await this.getPurchaseRepository();
        try {
            return (await repository.find(this.purchaseSearchTOptionToFindManyOptions(searchOption))).map(this.pruchaseEntityToDto);
        } catch (e) {
            throw new Error(`db error:${e}`);
        }
    }

    async updatePurchases(purchaseDto: PurchaseDto): Promise<PurchaseDto> {
        const repository = await this.getPurchaseRepository();
        try {
            return (await repository.save(this.purchaseDtoToEntity(purchaseDto)))
        } catch (e) {
            throw new Error(`db error:${e}`);
        }
    }

    async createStock(stockDto: StockDto): Promise<StockDto> {
        const repository = await this.getStockRepository();
        try {
            await repository.save(this.stockDtoToEntity(stockDto))
            return stockDto;
        } catch (e) {
            throw new Error(`db error:${e}`);
        }
    }

    async deleteStock(stockDto: StockDto): Promise<StockDto> {
        const repository = await this.getStockRepository();
        try {
            await repository.delete({id: stockDto.id})
            return stockDto;
        } catch (e) {
            throw new Error(`db error:${e}`);
        }
    }

    async dropTable() {
        const connection = await this.getConnection();
        await connection.synchronize(true);
    }

    async getStocks(searchOption: StockSearchOptions): Promise<StockDto[]> {
        const repository = await this.getStockRepository();
        try {
            return (await repository.find(this.stockSearchOptionToFindManyOptions(searchOption))).map(this.stockEntityToDto);
        } catch (e) {
            throw new Error(`db error:${e}`);
        }
    }

    private purchaseDtoToEntity(purchaseDto: PurchaseDto): Purchase {
        return (purchaseDto as unknown as Purchase);
    }

    private stockDtoToEntity(stockDto: StockDto): Stock {
        return (stockDto as unknown as Stock);
    }

    private pruchaseEntityToDto(purchase: Purchase): PurchaseDto {
        return (purchase as unknown as PurchaseDto);
    }

    private stockEntityToDto(stock: Stock): StockDto {
        return (stock as unknown as StockDto);
    }

    private stockSearchOptionToFindManyOptions(stockSearchOptions: StockSearchOptions): FindManyOptions {
        if (stockSearchOptions.id) {
            return {where: {id: stockSearchOptions.id}}
        }
        return {take: stockSearchOptions.take ? stockSearchOptions.take : 10};
    }

    private purchaseSearchTOptionToFindManyOptions(purchaseSearchOptions: PurchaseSearchOptions): FindManyOptions {
        if (purchaseSearchOptions.id) {
            return {where: {id: purchaseSearchOptions.id}}
        }
        if (purchaseSearchOptions.id && purchaseSearchOptions.stockId) {
            return {where: {id: purchaseSearchOptions.id, storeId: purchaseSearchOptions.stockId}}
        }
        if (purchaseSearchOptions.stockId) {
            return {where: {stockId: purchaseSearchOptions.stockId}}
        }
        return {take: purchaseSearchOptions.take ? purchaseSearchOptions.take : 10};
    }


    private async getPurchaseRepository(): Promise<Repository<Purchase>> {
        const connection = await this.getConnection();
        return await connection.getRepository(Purchase);
    }

    private async getStockRepository(): Promise<Repository<Stock>> {
        const connection = await this.getConnection();
        return await connection.getRepository(Stock);
    }

    private async getConnection(): Promise<Connection> {
        const currentConnectionName = "default";
        try {
            return getConnection(currentConnectionName);
        } catch (ConnectionNotFoundError) {
            return await createConnection({...this.option, name: currentConnectionName});
        }
    }

}