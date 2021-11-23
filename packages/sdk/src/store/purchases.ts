import {PurchaseDto, ShieldedTxDto} from "./dto";
import {StoreRepository} from "../infra/database/store-repository";
// @ts-ignore
import {ZkTx} from "@zkopru/transaction";
import axios, {Axios, AxiosResponse} from 'axios';

export interface PurchaseSearchOptions {
    id?: number;
    stockId?: number;
    take?: number;
}

export class Purchases {
    private repository: StoreRepository;
    private coordinatorUrl: string;
    private client: Axios;

    constructor(repository: StoreRepository, coordinatorUrl: string) {
        this.repository = repository;
        this.coordinatorUrl = coordinatorUrl;
        this.client = axios.create({
            baseURL: coordinatorUrl,
            headers: {
                "Content-type": "application/json"
            }
        });
    }

    /**
     * customer requests for purchasing.
     * @param stockId
     * @param shieldedTx
     */
    async request(stockId: number, shieldedTx: ShieldedTxDto): Promise<PurchaseDto> {
        const stocks = await this.repository.getStocks({id: stockId});
        if (stocks.length == 0) {
            throw new Error(`stock id:${stockId} not exists`);
        }
        // todo: check shieldedTx from. with sign
        const purchases = await this.repository.getPurchases({stockId});
        if (purchases.length > 0) {
            throw new Error(`purchase request already exists`);
        }
        return await this.repository.createPurchase({
            stockId,
            clientShieldTx: JSON.stringify(shieldedTx),
            confirmed: false
        })
    }

    /**
     * merchant confirms for purchasing
     * @param stockId
     * @param shieldedTx
     */
    async confirm(purchaseId: number, merchantZkTx: ShieldedTxDto): Promise<PurchaseDto> {
        const purchases = await this.repository.getPurchases({id: purchaseId})
        if (purchases.length == 0) {
            throw new Error(`purchase doesn't exists`);
        }
        const purchase = purchases[0]
        const stock = (await this.repository.getStocks({id: purchase.stockId}))[0];
        if (purchases.length == 0) {
            throw new Error(`purchase doesn't exists`);
        }
        if (merchantZkTx.from != stock.ownerAddress) {
            throw new Error(`owner doesn't match`);
        }
        await this.sendLayer2Tx([await ShieldedTxDto.fromString(purchase.clientShieldTx).toZkTx(), await merchantZkTx.toZkTx()])
        return await this.repository.updatePurchases({
            ...purchase,
            merchantShieldTx: merchantZkTx.toString(),
            confirmed: true
        })
    }

    /**
     * search purchases
     * @param searchOptions
     */
    async getAll(searchOptions: PurchaseSearchOptions): Promise<PurchaseDto[]> {
        return await this.repository.getPurchases(searchOptions);
    }

    private async sendLayer2Tx(zkTx:ZkTx|ZkTx[]): Promise<AxiosResponse> {
        const txs = [zkTx].flat()
        const response = await this.client.post("/txs",
            JSON.stringify(txs.map(tx => tx.encode().toString('hex'))))
        return response
    }
}