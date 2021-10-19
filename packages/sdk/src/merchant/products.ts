import {OptionMerchantSdk} from "../option";
import {DB} from "../db";
import {Product} from "../entities/product";
import {Repository} from "typeorm";

export interface AtomicSwapInformation {

}
export interface AtomicZkTx {

}
export interface Receipt {

}
export class Products {
    private db:DB;
    constructor(option: OptionMerchantSdk, db:DB) {
        this.db = db;
    }

    async register(product: Product): Promise<Product> {
        const repository = await this.getRepository();
        return await repository.save(product);
    }

    async unregister(productId: number): Promise<Product> {
        const repository = await this.getRepository();
        const product = await repository.findOne(productId);
        return await repository.remove(product);
    }

    async atomicSwapInformation(productId: number): Promise<AtomicSwapInformation> {
        return null;
    }

    async broadcastAtomicSwapTx(productId: number, atomicZkTx: AtomicZkTx): Promise<Receipt> {
        // check this tx is pair of the product id
        return null;
    }

    // todo: pagination
    async getAll(): Promise<Product[]> {
        const repository = await this.getRepository();
        return await repository.find();
    }

    async get(productId: number) {
        const repository = await this.getRepository();
        return await repository.findOne(productId);
    }

    private async getRepository(): Promise<Repository<Product>> {
        const connection = await this.db.connection();
        return connection.getRepository(Product);
    }

}