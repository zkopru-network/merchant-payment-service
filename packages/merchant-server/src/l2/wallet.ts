// @ts-ignore
import {ZkTx, ZkAddress} from "@zkopru/transaction";
// @ts-ignore
import {F} from '@zkopru/babyjubjub'
import {StockDto} from "@merchant-payment-service/sdk/lib/store/dto";

export abstract class Wallet {
    abstract depositEther(amount: F, fee: F, toL2Address?: string, salt?: F): Promise<any>;

    abstract depositERC20(eth: F, addr: string, amount: F, fee: F, toL2Address?: string): Promise<any>;

    abstract depositNFT(eth: F, addr: string, nft: F, fee: F, toL2Address?: string): Promise<any>;

    abstract withdrawEther(amount: F, fee: F, toL1Address?: string, salt?: F);

    abstract withdrawERC20(eth: F, addr: string, amount: F, fee: F, toL1Address?: string, salt?: F);

    abstract withdrawNFT(eth: F, addr: string, nft: F, fee: F, toL1Address?: string);

    abstract createMerchantAtomicSwapZkTx(stock: StockDto, pairTx: ZkTx): ZkTx;

    abstract getL1Address():string;

    abstract getL2Address():string;
    abstract getBalances()
}