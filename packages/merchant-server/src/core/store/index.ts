import {StoreRepository} from "../infra/database/store-repository";
import {Stocks} from "./stocks";
import {Purchases} from "./purchases";

export class Store {
    public purchases:Purchases;
    public stocks:Stocks;
    constructor(repository: StoreRepository, coordinatorUrl:string) {
        this.purchases = new Purchases(repository, coordinatorUrl);
        this.stocks = new Stocks(repository);
    }
}