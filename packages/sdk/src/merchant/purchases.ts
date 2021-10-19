import {OptionMerchantSdk} from "../option";
import {DB} from "../db";

export interface Purchase {
    id: string;

}

export class Purchases {

    private db: DB;
    constructor(option: OptionMerchantSdk, db:DB) {
        this.db = db;
    }

    getAll(): Purchase[] {
        return null;
    }

    get(purchaseId: string): Purchase {
        return null;
    }
}