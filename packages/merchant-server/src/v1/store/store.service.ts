import {Inject, Injectable} from "@nestjs/common";
import {Stock, Store} from "@merchant-payment-service/sdk";
import {PurchaseSearchOptions} from "@merchant-payment-service/sdk/lib/store/purchases";
import {PurchaseDto, ShieldedTxDto, StockDto} from "@merchant-payment-service/sdk/lib/store/dto";
import {StockSearchOptions} from "@merchant-payment-service/sdk/lib/store/stocks";
import {AssetType} from "@merchant-payment-service/sdk/lib/store/dto/stock.dto";
import {Wallet} from "../../l2/wallet";
// @ts-ignore
import {ZkTx} from "@zkopru/transaction";

@Injectable()
export class StoreService {
    private store: Store
    private wallet: Wallet

    constructor(@Inject("STORE") store: Store, @Inject("WALLET") wallet: Wallet) {
        this.store = store;
        this.wallet = wallet;
    }

    async getPurchases(options: PurchaseSearchOptions): Promise<PurchaseDto[]> {
        return await this.store.purchases.getAll(options);
    }

    async getStocks(options: StockSearchOptions): Promise<StockDto[]> {
        return await this.store.stocks.getAll(options);
    }

    async registerStock(
        assetType: AssetType,
        address: string,
        ownerAddress: string,
        price: string,
        atomicSwapSalt: string,
        sign: string
    ): Promise<StockDto> {
        return await this.store.stocks.register(
            {assetType, address, ownerAddress, price, atomicSwapSalt} as StockDto, sign
        )
    }

    // todo: validate from by signing?
    async requestPurchases(stockId: number, from: string, encodedTx: string): Promise<PurchaseDto> {
        return await this.store.purchases.request(
            stockId, new ShieldedTxDto(from, encodedTx)
        );
    }

    async requestAndConfirmPurchases(stockId: number, from: string, encodedTx: string): Promise<PurchaseDto> {
        const purchase: PurchaseDto = await this.store.purchases.request(stockId, new ShieldedTxDto(from, encodedTx));
        const stock: StockDto = (await this.store.stocks.getAll({id:stockId}))[0];
        const zkTx:ZkTx = await this.wallet.createMerchantAtomicSwapZkTx(stock, (new ShieldedTxDto(from, encodedTx)).toZkTx());
        return await this.confirmPurchases(purchase.id, this.wallet.getL2Address(), zkTx.encode().toString())
    }


    async confirmPurchases(purchaseId: number, from: string, encodedTx: string): Promise<PurchaseDto> {
        return await this.store.purchases.confirm(purchaseId, new ShieldedTxDto(from, encodedTx));
    }
}