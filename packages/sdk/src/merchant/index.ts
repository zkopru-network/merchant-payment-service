import {OptionMerchantSdk} from "../option";
import {Products} from "./products";
import {Purchases} from "./purchases";
import {DB} from "../db";
import path from "path";

export class Merchant {
    public products: Products;
    public purchases: Purchases;
    private db: DB;

    constructor(option: OptionMerchantSdk) {
        this.db = new DB({
            type: option.databaseType,
            database: option.databaseUrl,
            entities: [path.join(__dirname, "../entities/*.ts")],
            synchronize: true
        } as any);
        this.products = new Products(option, this.db);
        this.purchases = new Purchases(option, this.db);
    }
}