import {Wallet} from "../../l2/wallet";
import {Account, IpcProvider, WebsocketProvider} from 'web3-core'
import {StockDto} from "@merchant-payment-service/sdk/lib/store/dto";
import {Address} from "soltypes";
import {AssetType} from "@merchant-payment-service/sdk/lib/store/dto/stock.dto";
import {ZkWalletAccount, ZkWalletAccountConfig} from "@zkopru/zk-wizard";
import {DB} from "@zkopru/database";
// @ts-ignore
import {ZkAccount} from "@zkopru/account"
// @ts-ignore
import {FullNode, ZkopruNode} from "@zkopru/core"
import {ZkAddress, TxBuilder} from "@zkopru/transaction";
import {ZkTx} from "@zkopru/transaction";
type provider = WebsocketProvider | IpcProvider

interface FullNodeConfig {
    provider: provider
    address: string
    db: DB
    slasher?: Account
    accounts?: ZkAccount[]
}


export class ZkopruWalletImpl implements Wallet {
    private static DEFAULT_FEE = 0.1;
    private account: ZkWalletAccount;
    private node: ZkopruNode;
    private nodeConfig: FullNodeConfig;
    private walletAccountConfig: ZkWalletAccountConfig;

    constructor(provider: provider,
                address: string,
                db: DB, privateKey: Buffer | string,
                erc20: Address[],
                erc721: Address[],
                snarkKeyPath: string,
                snarkKeyCid: string
    ) {
        this.nodeConfig = {
            provider,
            address,
            db
        }
        this.walletAccountConfig = {
            privateKey,
            node: this.node,
            erc20,
            erc721,
            snarkKeyPath,
            snarkKeyCid
        }
    }

    async init() {
        this.node = await FullNode.new({...this.nodeConfig});
        this.account = new ZkWalletAccount(this.walletAccountConfig);
    }

    async createMerchantAtomicSwapZkTx(stock: StockDto, pairTx, to: string): Promise<ZkTx> {
        let rawTx;
        const txBuilder = new TxBuilder(this.account.account.zkAddress as any);
        switch (stock.assetType) {
            case AssetType.ERC20:
                rawTx = txBuilder.sendERC20({
                    tokenAddr: stock.address,
                    erc20Amount: stock.price,
                    to: ZkAddress.fromBuffer(Buffer.from(to, "utf-8")) as any
                })
                return await this.account.shieldTx({tx: rawTx, from: this.account.account})
            case AssetType.ERC721:
                rawTx = txBuilder.sendNFT({
                    tokenAddr: stock.address,
                    nft: stock.assetId,
                    to: ZkAddress.fromBuffer(Buffer.from(to, "utf-8")) as any
                })
                return await this.account.shieldTx({tx: rawTx, from: this.account.account.zkAddress as any})

        }
        return undefined;
    }

    async depositERC20(eth, addr: string, amount, to?): Promise<any> {
        return await this.account.depositERC20(eth, addr, amount, ZkopruWalletImpl.DEFAULT_FEE);
    }

    async depositEther(amount, to?: string, salt?): Promise<any> {
        return await this.account.depositEther(amount, ZkopruWalletImpl.DEFAULT_FEE, ZkAddress.fromBuffer(Buffer.from(to,'utf-8')), salt);
    }

    async depositNFT(id: number, address: string): Promise<any> {
        return await this.account.depositERC721("", address, id, ZkopruWalletImpl.DEFAULT_FEE);
    }

    async withdrawERC20(addr: string, to?: string, salt?) {
        const withdrawal = (await this.account.getWithdrawables(this.account.account.zkAddress as any))
            .filter(
                withdrawal => withdrawal.tokenAddr == addr
            )
            .at(0);

        return await this.account.withdraw(withdrawal);
    }

    async withdrawEther(fee, to?: string, salt?) {
        const withdrawal = (await this.account.getWithdrawables(this.account.account.zkAddress as any))
            .filter(
                withdrawal => Number(withdrawal.eth) != 0
            )
            .at(0);

        return await this.account.withdraw(withdrawal);
    }

    async withdrawNFT(nftId: string, to?: string, salt?) {
        const withdrawal = (await this.account.getWithdrawables(this.account.account.zkAddress as any))
            .filter(
                withdrawal => withdrawal.nft == nftId
            )
            .at(0);
        return await this.account.withdraw(withdrawal);
    }

    getL1Address(): string {
        return this.account.account.ethAddress;
    }

    getL2Address(): ZkAddress {
        return this.account.account.zkAddress as any;
    }

    async getBalances() {
        return await this.account.getSpendableAmount(this.account.account.zkAddress as any);
    }
}