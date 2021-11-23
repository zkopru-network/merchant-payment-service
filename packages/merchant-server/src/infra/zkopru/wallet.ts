import {Wallet} from "../../l2/wallet";
// @ts-ignore
import {FullNode, ZkopruNode} from "@zkopru/core";
// @ts-ignore
import {DB} from "@zkopru/database";
// @ts-ignore
import {ZkAccount} from "@zkopru/account";
// @ts-ignore
import {ZkTx} from "@zkopru/transaction";
import {WebsocketProvider, IpcProvider, Account} from 'web3-core'
import {StockDto} from "@merchant-payment-service/sdk/lib/store/dto";

type provider = WebsocketProvider | IpcProvider

interface FullNodeConfig {
    provider: provider
    address: string
    db: DB
    slasher?: Account
    accounts?: ZkAccount[]
}

export class ZkopruWalletImpl implements Wallet {
    private node: ZkopruNode;
    private nodeConfig: FullNodeConfig;

    constructor(nodeConfig: FullNodeConfig) {
        this.nodeConfig = nodeConfig;
    }

    async init() {
        this.node = await FullNode.new({...this.nodeConfig});
    }

    async createMerchantAtomicSwapZkTx(stock: StockDto, pairTx): ZkTx {
        return undefined;
    }

    async depositERC20(eth, addr: string, amount, fee, to?): Promise<any> {
        return this.node.w
        return Promise.resolve(undefined);
    }

    async depositEther(amount, fee, to?: string, salt?): Promise<any> {
        return Promise.resolve(undefined);
    }

    async depositNFT(id: number, address: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    async withdrawERC20(amount, fee, to?: string, salt?) {
    }

    async withdrawEther(amount, fee, to?: string, salt?) {
    }

    async withdrawNFT() {
    }

    getL1Address(): string {
        return "";
    }

    getL2Address(): string {
        return "";
    }
}