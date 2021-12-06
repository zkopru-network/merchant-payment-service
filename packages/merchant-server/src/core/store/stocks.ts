import {StockDto} from "./dto";
import {StoreRepository} from "../infra/database/store-repository";

export interface StockSearchOptions {
    id?: number;
    take?: number;
}
export class Stocks {
    private repository: StoreRepository;
    constructor(repository: StoreRepository) {
        this.repository = repository;
    }
    /**
     * register stocks
     * @param stock
     */
    async register(stock: StockDto, sign: string): Promise<StockDto> {
        // todo: should be register by owner
        return await this.repository.createStock(stock);
    }

    /**
     * delete stocks
     * @param stockId
     */
    async delete(stockId: number, sign: string): Promise<StockDto> {
        //todo: delete sign is made by stock registrator. please check delete sign is valid stock register.
        const stocks = await this.repository.getStocks({id:stockId});
        return await this.repository.deleteStock(stocks[0])
    }

    /**
     * get stocks.
     * @param searchOptions
     */
    async getAll(searchOptions: StockSearchOptions): Promise<StockDto[]> {
        return await this.repository.getStocks(searchOptions);
    }

    async get(stockId: number): Promise<StockDto> {
        return (await this.getAll({id:stockId}))[0]
    }
}